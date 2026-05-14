// Hero Section — Canyon image + trip summary + weather in top-right
import { useState, useEffect } from "react";
import { Mountain, ArrowDown } from "lucide-react";

interface LocationWeather {
  temp: number;
  high: number;
  low: number;
}

export default function HeroSection() {
  const daysUntil = Math.max(0, Math.ceil((new Date("2026-05-21").getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const [weather, setWeather] = useState<{ rim: LocationWeather | null; canyon: LocationWeather | null }>(() => {
    // Load from localStorage cache for offline
    const cached = localStorage.getItem("gc-weather-cache");
    if (cached) {
      try { return JSON.parse(cached); } catch { /* ignore */ }
    }
    return { rim: null, canyon: null };
  });

  useEffect(() => {
    async function fetchWeather() {
      try {
        const [rimRes, canyonRes] = await Promise.all([
          fetch("https://api.open-meteo.com/v1/forecast?latitude=36.06&longitude=-112.14&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America/Phoenix"),
          fetch("https://api.open-meteo.com/v1/forecast?latitude=36.13&longitude=-112.09&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America/Phoenix"),
        ]);
        const [rimData, canyonData] = await Promise.all([rimRes.json(), canyonRes.json()]);
        const result = {
          rim: {
            temp: Math.round(rimData.current.temperature_2m),
            high: Math.round(rimData.daily.temperature_2m_max[0]),
            low: Math.round(rimData.daily.temperature_2m_min[0]),
          },
          canyon: {
            temp: Math.round(canyonData.current.temperature_2m),
            high: Math.round(canyonData.daily.temperature_2m_max[0]),
            low: Math.round(canyonData.daily.temperature_2m_min[0]),
          },
        };
        setWeather(result);
        localStorage.setItem("gc-weather-cache", JSON.stringify(result));
      } catch { /* use cached data */ }
    }
    fetchWeather();
  }, []);

  return (
    <div className="relative rounded-lg overflow-hidden h-44 mb-4">
      <img
        src="https://d2xsxph8kpxj0f.cloudfront.net/310519663340412157/T6pzEvKjVsBAVih68eJefw/gc-hero-canyon-dawn-iSbhqJ5Lfpiavu5XmjEczX.webp"
        alt="Grand Canyon at dawn"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      {/* Weather — top right corner, big and bright */}
      {(weather.rim || weather.canyon) && (
        <div className="absolute top-2 right-3 text-right bg-black/60 rounded-md px-2.5 py-1.5 backdrop-blur-sm">
          {weather.rim && (
            <div className="text-xs data-mono leading-relaxed">
              <span className="text-amber-400 font-semibold">Rim </span>
              <span className="text-white font-bold">{weather.rim.temp}°F</span>
              <span className="text-zinc-200"> H:{weather.rim.high}° L:{weather.rim.low}°</span>
            </div>
          )}
          {weather.canyon && (
            <div className="text-xs data-mono leading-relaxed">
              <span className="text-amber-400 font-semibold">Canyon </span>
              <span className="text-white font-bold">{weather.canyon.temp}°F</span>
              <span className="text-zinc-200"> H:{weather.canyon.high}° L:{weather.canyon.low}°</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-3 left-4 right-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="display-text text-xl text-white leading-tight">Rim-to-Rim</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-zinc-300 flex items-center gap-1">
                <ArrowDown size={10} /> 5,771 ft descent
              </span>
              <span className="text-xs text-zinc-300 flex items-center gap-1">
                <Mountain size={10} /> 15 + 7–9.5 mi
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold data-mono text-primary">{daysUntil}</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider">days</div>
          </div>
        </div>
      </div>
    </div>
  );
}
