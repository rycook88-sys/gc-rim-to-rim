// Trail Map — Leaflet + OpenTopoMap
// GPS marker updates are in a separate layer group so they don't close water/hazard popups
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TRAILS, WATER_SOURCES } from "@/lib/trail-data";

interface Props {
  selectedTrail: string;
  showWater: boolean;
  gpsPosition?: number | null;
}

const GC_CENTER: [number, number] = [36.10, -112.03];
const GC_ZOOM = 12;

export default function TrailMap({ selectedTrail, showWater, gpsPosition }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  // Separate layer groups so updating one doesn't affect the other
  const trailLayerGroup = useRef<L.LayerGroup | null>(null);
  const gpsLayerGroup = useRef<L.LayerGroup | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, {
      center: GC_CENTER,
      zoom: GC_ZOOM,
      zoomControl: true,
      attributionControl: true,
    });
    L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
      attribution: '&copy; OpenTopoMap',
      subdomains: ["a", "b", "c"],
    }).addTo(map);

    trailLayerGroup.current = L.layerGroup().addTo(map);
    gpsLayerGroup.current = L.layerGroup().addTo(map);
    mapInstance.current = map;

    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  // Update trails, water, hazards (NOT triggered by gpsPosition changes)
  useEffect(() => {
    const map = mapInstance.current;
    const layers = trailLayerGroup.current;
    if (!map || !layers) return;

    layers.clearLayers();

    // Draw all trails
    TRAILS.forEach((trail) => {
      const coords: [number, number][] = trail.points.map((p) => [p.lat, p.lng]);
      const isSelected = trail.id === selectedTrail;
      L.polyline(coords, {
        color: trail.color,
        weight: isSelected ? 4 : 2,
        opacity: isSelected ? 1 : 0.3,
      }).addTo(layers);
    });

    // Water source markers
    if (showWater) {
      const trailWater = WATER_SOURCES.filter((w) => w.trail === selectedTrail);
      trailWater.forEach((ws) => {
        const marker = L.circleMarker([ws.lat, ws.lng], {
          radius: 8,
          fillColor: ws.lastBeforeDry ? "#ef4444" : "#3b82f6",
          color: ws.lastBeforeDry ? "#ef4444" : "#1e40af",
          weight: 2,
          fillOpacity: 0.8,
        }).addTo(layers);
        // Distance from GPS shown in popup
        const distFromGps = gpsPosition != null
          ? `<br/><span style="color:#f97316;font-weight:600;font-size:12px;">${Math.abs(ws.dist - gpsPosition).toFixed(1)} mi from you</span>`
          : "";
        marker.bindPopup(`
          <div style="font-size:12px;max-width:220px;">
            <strong>${ws.name}</strong>${distFromGps}<br/>
            <span style="color:#666;">${ws.type} · ${ws.ele.toLocaleString()} ft · mi ${ws.dist.toFixed(1)}</span><br/>
            <span style="font-size:11px;">${ws.note}</span>
          </div>
        `);
      });
    }

    // Fit to selected trail
    const selectedTrailData = TRAILS.find((t) => t.id === selectedTrail);
    if (selectedTrailData) {
      const bounds = L.latLngBounds(selectedTrailData.points.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [selectedTrail, showWater]);

  // GPS avatar marker — separate layer group, doesn't touch water/hazard popups
  useEffect(() => {
    const map = mapInstance.current;
    const gpsLayers = gpsLayerGroup.current;
    if (!map || !gpsLayers) return;

    gpsLayers.clearLayers();

    if (gpsPosition == null) return;

    const trail = TRAILS.find(t => t.id === selectedTrail);
    if (!trail) return;
    const closest = trail.points.reduce((best, p) =>
      Math.abs(p.dist - gpsPosition) < Math.abs(best.dist - gpsPosition) ? p : best
    );

    const avatar = localStorage.getItem("gc-gps-avatar");

    const icon = avatar
      ? L.divIcon({
          className: "",
          html: `<div style="width:32px;height:32px;border-radius:50%;border:3px solid #f97316;overflow:hidden;box-shadow:0 0 10px rgba(249,115,22,0.5);"><img src="${avatar}" style="width:100%;height:100%;object-fit:cover;" /></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        })
      : L.divIcon({
          className: "",
          html: `<div style="width:24px;height:24px;border-radius:50%;background:#f97316;border:3px solid #fff;box-shadow:0 0 10px rgba(249,115,22,0.5);"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

    L.marker([closest.lat, closest.lng], { icon, zIndexOffset: 1000 }).addTo(gpsLayers);
  }, [gpsPosition, selectedTrail]);

  return (
    <div ref={mapRef} className="w-full h-full" style={{ minHeight: 350 }} />
  );
}
