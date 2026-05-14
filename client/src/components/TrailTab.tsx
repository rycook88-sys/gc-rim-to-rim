// Trail Tab — Elevation profiles, water sources, hazards, interactive map
// Design: Dark topographic brutalism, orange/amber accents
import { useState, useCallback, useRef, useEffect } from "react";
import { Mountain, Droplets, AlertTriangle, ChevronDown, ChevronUp, Navigation, Play, Square, Camera, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TRAILS, WATER_SOURCES, WAYPOINTS, HAZARDS, TRAIL_COLORS, type Trail } from "@/lib/trail-data";
import { watchPosition, clearWatch, snapToTrail } from "@/lib/gps-tracker";
import ElevationProfile from "./ElevationProfile";
import TrailMap from "./TrailMap";
import WeatherWidget from "./WeatherWidget";
import OfflineMapManager from "./OfflineMapManager";

type TrailId = "north-kaibab" | "bright-angel" | "south-kaibab";

// GPS Start/Stop button — compact, sits next to Profile/Map
function GpsStartButton({ trail, onPositionChange, gpsPosition }: { trail: Trail; onPositionChange: (d: number | null) => void; gpsPosition: number | null }) {
  const [tracking, setTracking] = useState(false);

  const startGps = () => {
    setTracking(true);
    watchPosition(
      (pos) => {
        const snap = snapToTrail(pos, trail.points);
        // Only show position if within 2 miles of the trail
        if (snap && snap.distanceFromTrail < 3219) { // 3219 meters = 2 miles
          onPositionChange(snap.dist);
        } else {
          onPositionChange(null); // too far from trail, don't show
        }
      },
      () => setTracking(false)
    );
  };
  const stopGps = () => {
    clearWatch();
    setTracking(false);
    onPositionChange(null);
  };

  return tracking ? (
    <button
      onClick={stopGps}
      className="flex items-center gap-1 text-[10px] px-2 py-1 rounded border border-red-500/50 bg-red-500/10 text-red-400 font-medium"
    >
      <Square size={8} /> Stop
    </button>
  ) : (
    <button
      onClick={startGps}
      className="flex items-center gap-1 text-[10px] px-2 py-1 rounded border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-medium"
    >
      <Navigation size={9} /> GPS
    </button>
  );
}

// More menu (⋯) — Simulate + Photo upload
function GpsMoreButton({ trail, onPositionChange }: { trail: Trail; onPositionChange: (d: number | null) => void }) {
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(() => localStorage.getItem("gc-gps-avatar"));
  const [simulating, setSimulating] = useState(false);
  const simInterval = useRef<number | null>(null);
  const simDist = useRef(0);

  const startSim = () => {
    setSimulating(true);
    setOpen(false);
    simDist.current = 0;
    const maxDist = trail.points[trail.points.length - 1].dist;
    simInterval.current = window.setInterval(() => {
      simDist.current += 0.05;
      if (simDist.current >= maxDist) simDist.current = 0;
      onPositionChange(simDist.current);
    }, 500);
  };
  const stopSim = () => {
    if (simInterval.current) { clearInterval(simInterval.current); simInterval.current = null; }
    setSimulating(false);
    onPositionChange(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => { if (simInterval.current) clearInterval(simInterval.current); };
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext("2d")!;
        ctx.beginPath(); ctx.arc(32, 32, 32, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(img, 0, 0, 64, 64);
        const small = canvas.toDataURL("image/jpeg", 0.7);
        setAvatar(small);
        localStorage.setItem("gc-gps-avatar", small);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-[10px] px-1.5 py-1 rounded border border-border text-muted-foreground font-medium"
      >
        <MoreHorizontal size={12} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-50 bg-zinc-900 border border-zinc-700 rounded-lg p-2 shadow-xl min-w-[150px]">
          {!simulating ? (
            <button
              onClick={startSim}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800 w-full text-left text-xs text-muted-foreground"
            >
              <Play size={12} /> Simulate Trail
            </button>
          ) : (
            <button
              onClick={stopSim}
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800 w-full text-left text-xs text-red-400"
            >
              <Square size={12} /> Stop Simulate
            </button>
          )}
          <label className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800 cursor-pointer text-xs text-muted-foreground">
            <Camera size={12} />
            {avatar ? "Change Photo" : "Set Photo"}
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </label>
          {avatar && (
            <div className="flex items-center gap-2 px-2 py-1">
              <img src={avatar} alt="" className="w-5 h-5 rounded-full border border-primary" />
              <span className="text-[10px] text-muted-foreground">Avatar set</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrailTab() {
  const [selectedTrail, setSelectedTrail] = useState<TrailId>("north-kaibab");
  const [showWater, setShowWater] = useState(false);  // controls dots on chart/map
  const [showWaterList, setShowWaterList] = useState(false);  // controls expandable card below
  const [showHazards, setShowHazards] = useState(false);
  const [showWaypoints, setShowWaypoints] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [gpsPosition, setGpsPosition] = useState<number | null>(null);

  const handleGpsPosition = useCallback((dist: number | null) => {
    setGpsPosition(dist);
  }, []);

  const trail = TRAILS.find((t) => t.id === selectedTrail)!;
  const trailWater = WATER_SOURCES.filter((w) => w.trail === selectedTrail);
  const trailHazards = HAZARDS.filter((h) => h.trail === selectedTrail);
  const trailWaypoints = WAYPOINTS.filter((w) => w.trail === selectedTrail);

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Trail Selector */}
      <div className="flex gap-2">
        {TRAILS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTrail(t.id as TrailId)}
            className={`flex-1 py-2 px-2 rounded-md text-xs font-medium uppercase tracking-wider border transition-all ${
              selectedTrail === t.id
                ? "border-current bg-current/10"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
            style={selectedTrail === t.id ? { color: t.color, borderColor: t.color } : {}}
          >
            {t.name.replace(" Trail", "")}
          </button>
        ))}
      </div>

      {/* Trail Stats */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Mountain size={16} style={{ color: trail.color }} />
          <h2 className="text-sm font-semibold" style={{ color: trail.color }}>
            {trail.name}
          </h2>
          <span className="text-xs text-muted-foreground ml-auto uppercase">
            {trail.direction === "descent" ? "Day 1 — Descent" : "Day 2 — Ascent"}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Distance</div>
            <div className="text-lg font-bold data-mono">{trail.distance} <span className="text-xs text-muted-foreground">mi</span></div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              {trail.direction === "descent" ? "Elev Loss" : "Elev Gain"}
            </div>
            <div className="text-lg font-bold data-mono">
              {trail.direction === "descent" ? trail.elevLoss.toLocaleString() : trail.elevGain.toLocaleString()} <span className="text-xs text-muted-foreground">ft</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              {trail.direction === "descent" ? "Start" : "End"} Elev
            </div>
            <div className="text-lg font-bold data-mono">
              {trail.direction === "descent" ? trail.startEle.toLocaleString() : trail.endEle.toLocaleString()} <span className="text-xs text-muted-foreground">ft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Elevation Profile / Map — toggled in same card */}
      <div className="bg-card border border-border rounded-lg p-4">
        {/* Toggle row: Profile | Map | GPS on left, H2O | ⋯ on right */}
        <div className="flex items-center gap-1.5 mb-3">
          <button
            onClick={() => setMapExpanded(false)}
            className={`text-[10px] px-2 py-1 rounded border uppercase tracking-wider font-medium ${
              !mapExpanded
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setMapExpanded(true)}
            className={`text-[10px] px-2 py-1 rounded border uppercase tracking-wider font-medium ${
              mapExpanded
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground"
            }`}
          >
            Map
          </button>
          <GpsStartButton trail={trail} onPositionChange={handleGpsPosition} gpsPosition={gpsPosition} />
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={() => setShowWater(!showWater)}
              className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded border font-medium transition-all ${
                showWater
                  ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                  : "border-border text-muted-foreground"
              }`}
            >
              <Droplets size={10} />
              H₂O
            </button>
            <GpsMoreButton trail={trail} onPositionChange={handleGpsPosition} />
          </div>
        </div>

        {/* Content */}
        {!mapExpanded ? (
          <ElevationProfile trail={trail} waterSources={trailWater} waypoints={trailWaypoints} showWater={showWater} gpsPosition={gpsPosition} />
        ) : (
          <div style={{ height: 350 }}>
            <TrailMap selectedTrail={selectedTrail} showWater={showWater} gpsPosition={gpsPosition} />
          </div>
        )}
      </div>

      {/* Water Sources */}
      <div className="bg-card border border-border rounded-lg p-4">
        <button
          onClick={() => setShowWaterList(!showWaterList)}
          className="w-full flex items-center justify-between mb-3"
        >
          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-blue-400" />
            <h3 className="section-header">Water Sources</h3>
            <span className="text-xs text-muted-foreground">({trailWater.length})</span>
          </div>
          {showWaterList ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
        </button>
        <AnimatePresence>
          {showWaterList && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 overflow-hidden"
            >
              {trailWater.map((w) => (
                <div
                  key={w.id}
                  className={`p-3 rounded-md border ${
                    w.lastBeforeDry ? "border-red-500/50 bg-red-500/5" : "border-border bg-background"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets size={12} className={w.lastBeforeDry ? "text-red-400" : "text-blue-400"} />
                      <span className="text-sm font-medium">{w.name}</span>
                    </div>
                    <span className="text-xs data-mono text-muted-foreground">
                      mi {w.dist.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-5">{w.note}</p>
                  <div className="flex gap-3 mt-1.5 ml-5">
                    <span className="text-xs data-mono text-muted-foreground">
                      {w.ele.toLocaleString()} ft
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {w.seasonal}
                    </span>
                    {w.distToNext > 0 && (
                      <span className="text-xs data-mono text-muted-foreground">
                        → {w.distToNext} mi to next
                      </span>
                    )}
                  </div>
                  {w.lastBeforeDry && (
                    <div className="mt-2 ml-5 text-xs text-red-400 font-medium">
                      ⚠️ Last water before dry stretch
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hazards */}
      <div className="bg-card border border-border rounded-lg p-4">
        <button
          onClick={() => setShowHazards(!showHazards)}
          className="w-full flex items-center justify-between mb-3"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-400" />
            <h3 className="section-header">Hazards & Warnings</h3>
            <span className="text-xs text-muted-foreground">({trailHazards.length})</span>
          </div>
          {showHazards ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
        </button>
        <AnimatePresence>
          {showHazards && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 overflow-hidden"
            >
              {trailHazards.map((h) => (
                <div
                  key={h.id}
                  className={`p-3 rounded-md border ${
                    h.severity === "danger"
                      ? "border-red-500/50 bg-red-500/5"
                      : h.severity === "warning"
                      ? "border-amber-500/50 bg-amber-500/5"
                      : "border-yellow-500/30 bg-yellow-500/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle
                      size={12}
                      className={
                        h.severity === "danger"
                          ? "text-red-400"
                          : h.severity === "warning"
                          ? "text-amber-400"
                          : "text-yellow-400"
                      }
                    />
                    <span className="text-sm font-medium">{h.title}</span>
                    <span className="text-xs data-mono text-muted-foreground ml-auto">
                      mi {h.distStart.toFixed(1)}-{h.distEnd.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-5">{h.description}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3-Day Forecast (collapsible, cached for offline) */}
      <WeatherWidget />

      {/* Offline Map Tiles */}
      <OfflineMapManager />

      {/* Waypoints / Mile-by-Mile */}
      <div className="bg-card border border-border rounded-lg p-4">
        <button
          onClick={() => setShowWaypoints(!showWaypoints)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Mountain size={16} style={{ color: trail.color }} />
            <h3 className="section-header">Waypoints</h3>
            <span className="text-xs text-muted-foreground">({trailWaypoints.length})</span>
          </div>
          {showWaypoints ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
        </button>
        <AnimatePresence>
          {showWaypoints && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 overflow-hidden mt-3"
            >
              {trailWaypoints.map((wp) => (
                <div key={wp.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-background transition-colors">
                  <div className="text-xs data-mono text-muted-foreground w-12 pt-0.5 text-right shrink-0">
                    {wp.dist.toFixed(1)} mi
                  </div>
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: trail.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{wp.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{wp.description}</div>
                    {wp.facilities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {wp.facilities.map((f) => (
                          <span key={f} className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-xs data-mono text-muted-foreground shrink-0">
                    {wp.ele.toLocaleString()} ft
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
