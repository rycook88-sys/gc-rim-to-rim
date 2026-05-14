// Offline Map Tile Caching for Grand Canyon area
// Pre-downloads OpenTopoMap tiles for the GC region so the map works without internet
const CACHE_NAME = "gc-map-tiles-v1";

// Grand Canyon bounding box (covers North Rim to South Rim + surrounding area)
const BOUNDS = {
  minLat: 35.95,
  maxLat: 36.25,
  minLng: -112.20,
  maxLng: -111.90,
};

// Zoom levels to cache (11 = overview, 14 = trail detail)
const ZOOM_LEVELS = [11, 12, 13, 14];
const TILE_URL_TEMPLATE = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
const SUBDOMAINS = ["a", "b", "c"];

// Convert lat/lng to tile coordinates
function latLngToTile(lat: number, lng: number, zoom: number): { x: number; y: number } {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n);
  return { x, y };
}

// Get all tile URLs for the GC area at all zoom levels
export function getTileList(): string[] {
  const tiles: string[] = [];
  let subIdx = 0;
  for (const zoom of ZOOM_LEVELS) {
    const topLeft = latLngToTile(BOUNDS.maxLat, BOUNDS.minLng, zoom);
    const bottomRight = latLngToTile(BOUNDS.minLat, BOUNDS.maxLng, zoom);
    for (let x = topLeft.x; x <= bottomRight.x; x++) {
      for (let y = topLeft.y; y <= bottomRight.y; y++) {
        const s = SUBDOMAINS[subIdx % SUBDOMAINS.length];
        subIdx++;
        const url = TILE_URL_TEMPLATE
          .replace("{s}", s)
          .replace("{z}", zoom.toString())
          .replace("{x}", x.toString())
          .replace("{y}", y.toString());
        tiles.push(url);
      }
    }
  }
  return tiles;
}

// Get total tile count for progress display
export function getTileCount(): number {
  return getTileList().length;
}

// Check if tiles are already cached
export async function isCached(): Promise<boolean> {
  try {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    const tileCount = getTileCount();
    return keys.length >= tileCount * 0.9;
  } catch {
    return false;
  }
}

// Get cached tile count
export async function getCachedCount(): Promise<number> {
  try {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    return keys.length;
  } catch {
    return 0;
  }
}

// Download and cache all tiles with progress callback
export async function cacheTiles(
  onProgress?: (cached: number, total: number) => void
): Promise<void> {
  const tiles = getTileList();
  const total = tiles.length;
  const cache = await caches.open(CACHE_NAME);
  let cached = 0;

  // Download in batches of 6
  const BATCH_SIZE = 6;
  for (let i = 0; i < tiles.length; i += BATCH_SIZE) {
    const batch = tiles.slice(i, i + BATCH_SIZE);
    await Promise.allSettled(
      batch.map(async (url) => {
        try {
          const existing = await cache.match(url);
          if (!existing) {
            const response = await fetch(url);
            if (response.ok) {
              await cache.put(url, response);
            }
          }
        } catch {
          // Skip failed tiles
        }
        cached++;
        onProgress?.(cached, total);
      })
    );
  }
}

// Clear cached tiles
export async function clearCache(): Promise<void> {
  await caches.delete(CACHE_NAME);
}
