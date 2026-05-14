// GPS Tracker — Uses device GPS (works offline, no cell signal needed)
// Snaps position to nearest trail point for distance tracking

export interface GpsPosition {
  lat: number;
  lng: number;
  accuracy: number; // meters
  timestamp: number;
}

export function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function metersToMiles(m: number): number {
  return m * 0.000621371;
}

let watchId: number | null = null;

export function watchPosition(
  onPosition: (pos: GpsPosition) => void,
  onError?: (err: GeolocationPositionError) => void
): void {
  if (!navigator.geolocation) {
    onError?.({ code: 2, message: "Geolocation not supported", PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 } as any);
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      onPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      });
    },
    onError,
    {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 5000,
    }
  );
}

export function clearWatch(): void {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}

// Snap a GPS position to the nearest point on a trail
export function snapToTrail(
  pos: GpsPosition,
  trailPoints: { dist: number; lat: number; lng: number }[]
): { dist: number; distanceFromTrail: number } | null {
  if (!trailPoints.length) return null;

  let minDist = Infinity;
  let nearestIdx = 0;

  for (let i = 0; i < trailPoints.length; i++) {
    const d = haversineMeters(pos.lat, pos.lng, trailPoints[i].lat, trailPoints[i].lng);
    if (d < minDist) {
      minDist = d;
      nearestIdx = i;
    }
  }

  return {
    dist: trailPoints[nearestIdx].dist,
    distanceFromTrail: minDist, // meters off-trail
  };
}
