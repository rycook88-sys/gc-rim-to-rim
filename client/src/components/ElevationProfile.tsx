// Elevation Profile — Using exact TMB app touch interaction pattern
// Key: touchAction:"none" + onClick toggle + Recharts position={x:0,y:0}
import { useState, useMemo, useRef, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceDot, ResponsiveContainer,
} from "recharts";
import type { Trail, WaterSource, Waypoint } from "@/lib/trail-data";

interface Props {
  trail: Trail;
  waterSources: WaterSource[];
  waypoints: Waypoint[];
  showWater: boolean;
  gpsPosition?: number | null;
}

type ViewMode = "elevation" | "steepness";

const CHART_HEIGHT = 200;

const STEEPNESS_SCALE = [
  { min: 0, max: 300, color: "#4ade80", label: "0" },
  { min: 300, max: 600, color: "#facc15", label: "300" },
  { min: 600, max: 900, color: "#fb923c", label: "600" },
  { min: 900, max: 1200, color: "#ef4444", label: "900" },
  { min: 1200, max: Infinity, color: "#f0f0f0", label: "1200" },
];

function lerpColor(c1: string, c2: string, t: number): string {
  const hex = (c: string) => {
    const h = c.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };
  const [r1, g1, b1] = hex(c1);
  const [r2, g2, b2] = hex(c2);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function getBlendedSteepnessColor(ftPerMile: number): string {
  const abs = Math.abs(ftPerMile);
  for (let i = 0; i < STEEPNESS_SCALE.length - 1; i++) {
    const curr = STEEPNESS_SCALE[i];
    const next = STEEPNESS_SCALE[i + 1];
    if (abs >= curr.min && abs < curr.max) {
      const t = (abs - curr.min) / (curr.max - curr.min);
      return lerpColor(curr.color, next.color, t);
    }
  }
  return STEEPNESS_SCALE[STEEPNESS_SCALE.length - 1].color;
}

// SmartTooltip — positioned on opposite side from finger
// Also detects when cursor is near a water source and calls onNearWater
function SmartTooltip({ active, payload, coordinate, viewBox, mode, waterSources, onNearWater }: any) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;

  const chartWidth = viewBox?.width || 800;
  const cx = coordinate?.x || 0;
  const fingerOnLeft = cx < chartWidth / 2;

  // Check if we're near a water source (within 0.3 mi)
  if (waterSources && onNearWater) {
    const nearWater = waterSources.find((ws: WaterSource) => Math.abs(ws.dist - d.dist) < 0.3);
    // Use setTimeout to avoid setState during render
    setTimeout(() => onNearWater(nearWater || null), 0);
  }

  const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    top: 8,
    pointerEvents: "none",
    zIndex: 50,
    ...(fingerOnLeft
      ? { right: 8, left: "auto" }
      : { left: 8, right: "auto" }),
  };

  const steepColor = mode === "steepness" && d.steepness !== undefined
    ? getBlendedSteepnessColor(d.steepness) : undefined;

  return (
    <div style={tooltipStyle}>
      <div className="bg-zinc-900/95 border border-zinc-700 rounded-lg px-3 py-2 text-xs shadow-xl">
        <div className="text-white font-mono text-sm">
          {d.ele.toLocaleString()} ft
        </div>
        <div className="text-zinc-500 font-mono" style={{ fontSize: "0.65rem" }}>
          Mile {d.dist.toFixed(1)}
        </div>
        {mode === "steepness" && d.steepness !== undefined && (
          <div className="mt-1 pt-1 border-t border-zinc-700 font-mono" style={{ fontSize: "0.65rem", color: steepColor }}>
            {Math.round(Math.abs(d.steepness))} ft/mi
            <span className="text-zinc-500 ml-1">
              ({d.steepness > 50 ? "climb" : d.steepness < -50 ? "descent" : "flat"})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ElevationProfile({ trail, waterSources, waypoints, showWater, gpsPosition }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("elevation");
  // THE KEY STATE: toggles tooltip on/off via click
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  // Selected water source (tap a blue dot to see details)
  const [selectedWater, setSelectedWater] = useState<WaterSource | null>(null);

  // Scroll lock: prevent page scroll while finger is in chart
  useEffect(() => {
    const el = chartContainerRef.current;
    if (!el) return;
    const preventScroll = (e: TouchEvent) => { e.preventDefault(); };
    // MUST use { passive: false } otherwise preventDefault is ignored
    el.addEventListener("touchmove", preventScroll, { passive: false });
    return () => el.removeEventListener("touchmove", preventScroll);
  }, []);

  // Compute steepness + gradient
  const { chartData, gradientStops } = useMemo(() => {
    const pts = trail.points;
    const data = pts.map((p, i) => {
      let steepness = 0;
      if (i > 0 && i < pts.length - 1) {
        const prev = pts[Math.max(0, i - 1)];
        const next = pts[Math.min(pts.length - 1, i + 1)];
        const distDiff = next.dist - prev.dist;
        if (distDiff > 0.01) steepness = (next.ele - prev.ele) / distDiff;
      } else if (i === 0 && pts.length > 1) {
        const distDiff = pts[1].dist - pts[0].dist;
        if (distDiff > 0.01) steepness = (pts[1].ele - pts[0].ele) / distDiff;
      }
      return { ...p, steepness };
    });
    const totalDist = pts[pts.length - 1].dist;
    const stops = data.map((p) => ({
      offset: `${((p.dist / totalDist) * 100).toFixed(1)}%`,
      color: getBlendedSteepnessColor(p.steepness),
    }));
    return { chartData: data, gradientStops: stops };
  }, [trail.points]);

  // GPS data point
  const gpsDataPoint = useMemo(() => {
    if (gpsPosition == null) return null;
    return chartData.reduce((best, p) =>
      Math.abs(p.dist - gpsPosition!) < Math.abs(best.dist - gpsPosition!) ? p : best
    );
  }, [gpsPosition, chartData]);

  const avatar = typeof window !== "undefined" ? localStorage.getItem("gc-gps-avatar") : null;

  return (
    <div className="w-full">
      {/* View mode toggle */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <button
          onClick={() => setViewMode("elevation")}
          className={`text-[10px] px-2 py-1 rounded border uppercase tracking-wider font-medium ${
            viewMode === "elevation" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
          }`}
        >Elevation</button>
        <button
          onClick={() => setViewMode("steepness")}
          className={`text-[10px] px-2 py-1 rounded border uppercase tracking-wider font-medium ${
            viewMode === "steepness" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
          }`}
        >Steepness</button>
        {viewMode === "steepness" && (
          <div className="flex items-center gap-1 ml-auto text-[9px] text-muted-foreground data-mono">
            <span>FT/MI</span>
            {STEEPNESS_SCALE.slice(0, -1).map((s, i) => (
              <div key={i} className="flex items-center gap-0.5">
                <div className="w-2.5 h-2 rounded-sm" style={{ background: s.color }} />
                <span>{s.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-0.5">
              <div className="w-2.5 h-2 rounded-sm" style={{ background: "#f0f0f0" }} />
              <span>1200+</span>
            </div>
          </div>
        )}
      </div>

      {/* Chart container — THE KEY: touchAction:"none" + onClick toggle */}
      <div
        ref={chartContainerRef}
        style={{ width: "100%", height: CHART_HEIGHT, touchAction: "none", position: "relative", userSelect: "none", WebkitUserSelect: "none" } as React.CSSProperties}
        onClick={() => {
          // Small delay so Recharts processes the touch position first
          setTimeout(() => setTooltipDismissed(prev => !prev), 50);
        }}
      >
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <AreaChart data={chartData} margin={{ top: 10, right: 5, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id={`grad-${trail.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={trail.color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={trail.color} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id={`steep-grad-${trail.id}`} x1="0" y1="0" x2="1" y2="0">
                {gradientStops.map((s, i) => (
                  <stop key={i} offset={s.offset} stopColor={s.color} stopOpacity={0.5} />
                ))}
              </linearGradient>
              <linearGradient id={`steep-stroke-${trail.id}`} x1="0" y1="0" x2="1" y2="0">
                {gradientStops.map((s, i) => (
                  <stop key={i} offset={s.offset} stopColor={s.color} stopOpacity={1} />
                ))}
              </linearGradient>
            </defs>
            <XAxis
              dataKey="dist"
              tick={{ fontSize: 10, fill: "#666", fontFamily: "'JetBrains Mono', monospace" }}
              axisLine={{ stroke: "#333" }}
              tickLine={{ stroke: "#333" }}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "#555", fontFamily: "'JetBrains Mono', monospace" }}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
              axisLine={{ stroke: "#333" }}
              tickLine={{ stroke: "#333" }}
              width={35}
              domain={["dataMin - 200", "dataMax + 200"]}
            />
            {/* Only render Tooltip when not dismissed */}
            {!tooltipDismissed && (
              <Tooltip
                content={<SmartTooltip mode={viewMode} waterSources={showWater ? waterSources : []} onNearWater={setSelectedWater} />}
                wrapperStyle={{ pointerEvents: "none", position: "absolute", top: 0, left: 0, right: 0 }}
                position={{ x: 0, y: 0 }}
                allowEscapeViewBox={{ x: true, y: true }}
                isAnimationActive={false}
              />
            )}
            <Area
              type="monotone"
              dataKey="ele"
              stroke={viewMode === "steepness" ? `url(#steep-stroke-${trail.id})` : trail.color}
              strokeWidth={2}
              fill={viewMode === "steepness" ? `url(#steep-grad-${trail.id})` : `url(#grad-${trail.id})`}
              fillOpacity={0.3}
              dot={false}
              activeDot={tooltipDismissed ? false : { r: 4, fill: "#f59e0b", stroke: "#1c1917", strokeWidth: 2 }}
              isAnimationActive={false}
            />
            {/* Water source markers */}
            {showWater && waterSources.map((ws) => (
              <ReferenceDot
                key={ws.id}
                x={ws.dist}
                y={ws.ele}
                r={0}
                shape={(dotProps: any) => {
                  const { cx, cy } = dotProps;
                  if (!cx || !cy) return <g />;
                  const isSelected = selectedWater?.id === ws.id;
                  return (
                    <g
                      style={{ cursor: "pointer" }}
                      onClick={(e) => { e.stopPropagation(); setSelectedWater(isSelected ? null : ws); }}
                      onTouchEnd={(e) => { e.stopPropagation(); setSelectedWater(isSelected ? null : ws); }}
                    >
                      {/* Large invisible hit area */}
                      <circle cx={cx} cy={cy} r={24} fill="transparent" />
                      {/* Visible dot */}
                      <circle cx={cx} cy={cy} r={isSelected ? 9 : 7} fill={isSelected ? "#60a5fa" : "#3b82f6"} stroke={isSelected ? "#fff" : "#1e3a5f"} strokeWidth={isSelected ? 2 : 1.5} />
                      {ws.lastBeforeDry && (
                        <circle cx={cx} cy={cy} r={12} fill="none" stroke="#ef4444" strokeWidth={1.5} />
                      )}
                    </g>
                  );
                }}
              />
            ))}
            {/* GPS position */}
            {gpsDataPoint && (
              <ReferenceDot
                x={gpsDataPoint.dist}
                y={gpsDataPoint.ele}
                r={0}
                shape={(props: any) => {
                  const { cx, cy } = props;
                  if (!cx || !cy) return <g />;
                  const avatarSize = 28;
                  const avatarHalf = avatarSize / 2;
                  const floatHeight = 35;
                  const avatarCy = cy - floatHeight;
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={4} fill="#10b981" stroke="#065f46" strokeWidth={1.5} />
                      <line x1={cx} y1={cy - 5} x2={cx} y2={avatarCy + avatarHalf + 2} stroke="#f97316" strokeWidth={1.5} strokeDasharray="3 2" opacity={0.6} />
                      <circle cx={cx} cy={avatarCy} r={avatarHalf + 2} fill="#f97316" />
                      <defs>
                        <clipPath id="gps-avatar-clip-ep">
                          <circle cx={cx} cy={avatarCy} r={avatarHalf} />
                        </clipPath>
                      </defs>
                      {avatar ? (
                        <image href={avatar} x={cx - avatarHalf} y={avatarCy - avatarHalf} width={avatarSize} height={avatarSize} clipPath="url(#gps-avatar-clip-ep)" preserveAspectRatio="xMidYMid slice" />
                      ) : (
                        <>
                          <circle cx={cx} cy={avatarCy} r={avatarHalf} fill="#f97316" />
                          <text x={cx} y={avatarCy + 3} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">GPS</text>
                        </>
                      )}
                      <circle cx={cx} cy={cy} r={4} fill="none" stroke="#10b981" strokeWidth={1} opacity={0.5}>
                        <animate attributeName="r" from="4" to="12" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  );
                }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Water source info card */}
      {selectedWater && (
        <div className="mt-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-sm font-medium text-blue-300">{selectedWater.name}</span>
            </div>
            <button onClick={() => setSelectedWater(null)} className="text-zinc-500 text-xs">✕</button>
          </div>
          <p className="text-xs text-zinc-400 mt-1">{selectedWater.note}</p>
          <div className="flex gap-3 mt-1.5 text-[10px] text-zinc-500 data-mono">
            <span>{selectedWater.ele.toLocaleString()} ft</span>
            <span>mi {selectedWater.dist.toFixed(1)}</span>
            <span>{selectedWater.seasonal}</span>
          </div>
          {gpsPosition != null && (
            <div className="mt-1.5 text-xs font-medium text-primary data-mono">
              {Math.abs(selectedWater.dist - gpsPosition).toFixed(1)} mi from you
            </div>
          )}
          {selectedWater.lastBeforeDry && (
            <div className="mt-1 text-xs text-red-400 font-medium">⚠️ Last water before dry stretch</div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-3 mt-2 px-1 flex-wrap">
        {showWater && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[10px] text-muted-foreground">Water</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 rounded" style={{ background: trail.color }} />
          <span className="text-[10px] text-muted-foreground">{trail.name}</span>
        </div>
        {gpsPosition != null && (
          <div className="flex items-center gap-1">
            {avatar ? (
              <img src={avatar} alt="" className="w-3 h-3 rounded-full border border-primary" />
            ) : (
              <div className="w-3 h-3 rounded-full bg-primary border border-white" />
            )}
            <span className="text-[10px] text-muted-foreground">You</span>
          </div>
        )}
      </div>
    </div>
  );
}
