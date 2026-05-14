// GPS Tracker — Live position on trail with avatar, simulate mode
// Works offline using device GPS chip (no cell signal needed)
import { useState, useEffect, useCallback, useRef } from "react";
import { Navigation, Play, Square, Camera, MapPin } from "lucide-react";
import { watchPosition, clearWatch, snapToTrail, type GpsPosition } from "@/lib/gps-tracker";
import type { Trail } from "@/lib/trail-data";

interface Props {
  trail: Trail;
  onPositionChange: (dist: number | null) => void;
}

export default function GpsTracker({ trail, onPositionChange }: Props) {
  const [tracking, setTracking] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [position, setPosition] = useState<GpsPosition | null>(null);
  const [trailDist, setTrailDist] = useState<number | null>(null);
  const [offTrailMeters, setOffTrailMeters] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(() => localStorage.getItem("gc-gps-avatar"));
  const simInterval = useRef<number | null>(null);
  const simDist = useRef(0);

  // Start GPS tracking
  const startTracking = useCallback(() => {
    setError(null);
    setTracking(true);
    watchPosition(
      (pos) => {
        setPosition(pos);
        const snap = snapToTrail(pos, trail.points);
        if (snap) {
          setTrailDist(snap.dist);
          setOffTrailMeters(snap.distanceFromTrail);
          onPositionChange(snap.dist);
        }
      },
      (err) => {
        setError(err.message || "GPS error");
        setTracking(false);
      }
    );
  }, [trail.points, onPositionChange]);

  // Stop GPS tracking
  const stopTracking = useCallback(() => {
    clearWatch();
    setTracking(false);
    setPosition(null);
    setTrailDist(null);
    onPositionChange(null);
  }, [onPositionChange]);

  // Simulate trail (for testing)
  const startSimulation = useCallback(() => {
    setSimulating(true);
    simDist.current = 0;
    const maxDist = trail.points[trail.points.length - 1].dist;
    simInterval.current = window.setInterval(() => {
      simDist.current += 0.05; // advance 0.05 mi every 500ms
      if (simDist.current >= maxDist) {
        simDist.current = 0; // loop
      }
      setTrailDist(simDist.current);
      onPositionChange(simDist.current);
    }, 500);
  }, [trail.points, onPositionChange]);

  const stopSimulation = useCallback(() => {
    if (simInterval.current) {
      clearInterval(simInterval.current);
      simInterval.current = null;
    }
    setSimulating(false);
    setTrailDist(null);
    onPositionChange(null);
  }, [onPositionChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearWatch();
      if (simInterval.current) clearInterval(simInterval.current);
    };
  }, []);

  // Avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Resize to small thumbnail
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d")!;
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, 0, 0, 64, 64);
        const small = canvas.toDataURL("image/jpeg", 0.7);
        setAvatar(small);
        localStorage.setItem("gc-gps-avatar", small);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Navigation size={16} className="text-primary" />
        <h3 className="section-header">GPS Tracker</h3>
        <span className="text-[10px] text-muted-foreground ml-auto">Works offline</span>
      </div>

      {/* Status readout */}
      {(tracking || simulating) && trailDist !== null && (
        <div className="bg-background border border-primary/30 rounded-md p-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium">
              {simulating ? "Simulating" : "Tracking"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <div className="text-[10px] text-muted-foreground">Mile</div>
              <div className="text-sm font-bold data-mono">{trailDist.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">Remaining</div>
              <div className="text-sm font-bold data-mono">
                {(trail.distance - trailDist).toFixed(1)} mi
              </div>
            </div>
            {!simulating && (
              <div>
                <div className="text-[10px] text-muted-foreground">Accuracy</div>
                <div className="text-sm font-bold data-mono">
                  ±{Math.round(position?.accuracy || 0)}m
                </div>
              </div>
            )}
          </div>
          {!simulating && offTrailMeters > 50 && (
            <div className="text-[10px] text-amber-400 mt-1">
              ⚠️ {Math.round(offTrailMeters)}m off trail
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="text-xs text-red-400 mb-2">{error}</div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
        {!tracking && !simulating ? (
          <>
            <button
              onClick={startTracking}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/30 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
            >
              <Navigation size={12} /> Start GPS
            </button>
            <button
              onClick={startSimulation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted border border-border text-muted-foreground text-xs font-medium hover:text-foreground transition-colors"
            >
              <Play size={12} /> Simulate
            </button>
          </>
        ) : (
          <button
            onClick={tracking ? stopTracking : stopSimulation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
          >
            <Square size={12} /> Stop
          </button>
        )}

        {/* Avatar */}
        <div className="ml-auto flex items-center gap-2">
          <label className="cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-primary object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center">
                <Camera size={12} className="text-muted-foreground" />
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}
