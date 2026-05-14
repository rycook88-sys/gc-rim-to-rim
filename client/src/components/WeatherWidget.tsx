// Weather Widget — 3-day forecast, collapsible, cached to localStorage for offline
import { useState, useEffect } from "react";
import { Cloud, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DayForecast {
  date: string;
  rimHigh: number;
  rimLow: number;
  canyonHigh: number;
  canyonLow: number;
  rimCondition: string;
  canyonCondition: string;
}

function getCondition(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code >= 95) return "Thunderstorm";
  return "—";
}

export default function WeatherWidget() {
  const [expanded, setExpanded] = useState(false);
  const [forecast, setForecast] = useState<DayForecast[]>(() => {
    const cached = localStorage.getItem("gc-weather-3day");
    if (cached) try { return JSON.parse(cached); } catch { /* ignore */ }
    return [];
  });
  const [lastUpdated, setLastUpdated] = useState<string>(() => {
    return localStorage.getItem("gc-weather-3day-time") || "";
  });

  useEffect(() => {
    async function fetchForecast() {
      try {
        const [rimRes, canyonRes] = await Promise.all([
          fetch("https://api.open-meteo.com/v1/forecast?latitude=36.06&longitude=-112.14&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit&timezone=America/Phoenix&forecast_days=3"),
          fetch("https://api.open-meteo.com/v1/forecast?latitude=36.13&longitude=-112.09&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit&timezone=America/Phoenix&forecast_days=3"),
        ]);
        const [rimData, canyonData] = await Promise.all([rimRes.json(), canyonRes.json()]);

        const days: DayForecast[] = [];
        for (let i = 0; i < 3; i++) {
          days.push({
            date: rimData.daily.time[i],
            rimHigh: Math.round(rimData.daily.temperature_2m_max[i]),
            rimLow: Math.round(rimData.daily.temperature_2m_min[i]),
            canyonHigh: Math.round(canyonData.daily.temperature_2m_max[i]),
            canyonLow: Math.round(canyonData.daily.temperature_2m_min[i]),
            rimCondition: getCondition(rimData.daily.weather_code[i]),
            canyonCondition: getCondition(canyonData.daily.weather_code[i]),
          });
        }
        setForecast(days);
        const now = new Date().toLocaleString();
        setLastUpdated(now);
        localStorage.setItem("gc-weather-3day", JSON.stringify(days));
        localStorage.setItem("gc-weather-3day-time", now);
      } catch { /* use cached */ }
    }
    fetchForecast();
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud size={16} className="text-amber-400" />
          <h3 className="section-header">3-Day Forecast</h3>
          {lastUpdated && <span className="text-[9px] text-muted-foreground">({lastUpdated})</span>}
        </div>
        {expanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-3"
          >
            {forecast.length > 0 ? (
              <div className="space-y-2">
                {/* Header */}
                <div className="grid grid-cols-4 gap-2 text-[9px] text-muted-foreground uppercase tracking-wider px-1">
                  <span>Date</span>
                  <span>Rim</span>
                  <span>Canyon</span>
                  <span>Condition</span>
                </div>
                {forecast.map((day) => (
                  <div key={day.date} className="grid grid-cols-4 gap-2 text-xs data-mono p-2 rounded bg-background border border-border">
                    <span className="text-muted-foreground">{new Date(day.date + "T12:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
                    <span>H:{day.rimHigh}° L:{day.rimLow}°</span>
                    <span>H:{day.canyonHigh}° L:{day.canyonLow}°</span>
                    <span className="text-muted-foreground text-[10px]">{day.rimCondition}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">No data — connect to internet to fetch forecast</div>
            )}
            <div className="text-[9px] text-muted-foreground mt-2">Cached for offline use. Updates when signal available.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
