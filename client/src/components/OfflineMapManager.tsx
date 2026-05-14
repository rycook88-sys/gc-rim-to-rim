// Offline Map Manager — Download/manage cached map tiles
import { useState, useEffect } from "react";
import { Download, Check, Trash2, Wifi, WifiOff } from "lucide-react";
import { isCached, getCachedCount, getTileCount, cacheTiles, clearCache } from "@/lib/offline-tiles";

export default function OfflineMapManager() {
  const [cached, setCached] = useState(false);
  const [cachedCount, setCachedCount] = useState(0);
  const [totalCount] = useState(getTileCount());
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    const c = await isCached();
    setCached(c);
    const count = await getCachedCount();
    setCachedCount(count);
  }

  async function handleDownload() {
    setDownloading(true);
    setProgress(0);
    await cacheTiles((done, total) => {
      setProgress(Math.round((done / total) * 100));
    });
    await checkStatus();
    setDownloading(false);
  }

  async function handleClear() {
    await clearCache();
    setCached(false);
    setCachedCount(0);
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        {cached ? <WifiOff size={16} className="text-emerald-400" /> : <Wifi size={16} className="text-muted-foreground" />}
        <h3 className="section-header">Offline Map Tiles</h3>
      </div>
      <div className="text-xs text-muted-foreground mb-3">
        {cached
          ? `✓ ${cachedCount}/${totalCount} tiles cached — map works offline`
          : `Download ${totalCount} tiles for offline use (~15 MB)`}
      </div>
      {downloading ? (
        <div className="space-y-2">
          <div className="w-full h-2 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground data-mono text-center">{progress}%</div>
        </div>
      ) : cached ? (
        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          <Trash2 size={12} /> Clear cached tiles
        </button>
      ) : (
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/30 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
        >
          <Download size={12} /> Download for Offline Use
        </button>
      )}
    </div>
  );
}
