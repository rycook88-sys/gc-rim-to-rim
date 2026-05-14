// Road Trip Tab — Driving route, stops, food/resupply, timeline
// Design: Dark topographic brutalism, orange/amber accents
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car, MapPin, ShoppingCart, Calendar, ChevronDown, ChevronUp,
  Mountain, Utensils, Camera, TreePine, Star
} from "lucide-react";
import { ROAD_TRIP_STOPS, GROCERY_STOPS, TRIP_TIMELINE, BACKUP_CAMPS } from "@/lib/logistics-data";
import { Tent } from "lucide-react";

const STOP_ICONS: Record<string, typeof Mountain> = {
  scenic: Camera,
  food: Utensils,
  outdoor: Mountain,
  quirky: Star,
  camping: TreePine,
  resupply: ShoppingCart,
  town: MapPin,
};

export default function RoadTripTab() {
  const [selectedDay, setSelectedDay] = useState<number>(0); // 0 = all
  const [showGrocery, setShowGrocery] = useState(false);
  const [showBackupCamps, setShowBackupCamps] = useState(false);

  const filteredStops = selectedDay === 0
    ? ROAD_TRIP_STOPS
    : ROAD_TRIP_STOPS.filter((s) => s.day === selectedDay);

  // Daily summary data
  const DAY_SUMMARIES: Record<number, { miles: string; drive: string; activity: string }> = {
    1: { miles: "660 mi", drive: "9.5-10 hrs", activity: "—" },
    2: { miles: "275 mi", drive: "5.5 hrs", activity: "2-3 hrs (Black Canyon)" },
    3: { miles: "430 mi", drive: "7 hrs", activity: "2-3 hrs (Petrified Forest + Meteor Crater)" },
    4: { miles: "10 mi", drive: "0.5 hr", activity: "All day (rest + day hike)" },
    5: { miles: "0", drive: "Shuttle 5 hrs", activity: "6-9 hrs hiking" },
    6: { miles: "10 mi", drive: "0.5 hr", activity: "6-8 hrs hiking" },
    7: { miles: "0", drive: "—", activity: "All day (chill)" },
    8: { miles: "340 mi", drive: "6 hrs", activity: "2-3 hrs (Horseshoe Bend + sunset walk)" },
    9: { miles: "0", drive: "—", activity: "6-8 hrs hiking (Bryce)" },
    10: { miles: "470 mi", drive: "7.5-8 hrs", activity: "1.5-2 hrs (hot springs)" },
    11: { miles: "660 mi", drive: "9.5-10 hrs", activity: "—" },
  };

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Hero Image */}
      <div className="relative rounded-lg overflow-hidden h-40">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663340412157/T6pzEvKjVsBAVih68eJefw/gc-campervan-road-CpHPFUNoxjo7pLEAkMW2YQ.webp"
          alt="Campervan on desert highway"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <h2 className="display-text text-lg text-white">Road Trip</h2>
          <p className="text-xs text-zinc-300 mt-0.5">Bellevue → Black Canyon → Petrified Forest → GC → Bryce → Home · ~2,830 mi</p>
        </div>
      </div>

      {/* Google Maps full route link */}
      <a
        href="https://www.google.com/maps/dir/Bellevue,+NE/38.8971,-106.1295/37.5086,-108.4580/35.9681,-112.1185/37.7280,-112.2487/38.8971,-106.1295/Bellevue,+NE"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full p-3 rounded-lg border border-blue-500/30 bg-blue-500/5 text-center"
      >
        <span className="text-sm font-medium text-blue-400">🗺️ Open Full Route in Google Maps</span>
        <span className="block text-[10px] text-muted-foreground mt-0.5">5 camping stops · Bellevue → Fourmile → Boggy Draw → FR 302 → Tom's Best Spring → Fourmile → Home</span>
      </a>

      {/* Trip Timeline */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} className="text-primary" />
          <h3 className="section-header">Trip Timeline</h3>
        </div>
        <div className="space-y-2">
          {TRIP_TIMELINE.map((day, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="text-xs data-mono text-muted-foreground w-14 shrink-0 pt-0.5">
                {day.date}
              </div>
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium">{day.label}</div>
                <div className="text-xs text-muted-foreground">{day.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Day Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`shrink-0 py-1.5 px-2 rounded-md text-[10px] font-medium uppercase tracking-wider border transition-all ${
              selectedDay === day
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {day === 0 ? "All" : `${day}`}
          </button>
        ))}
      </div>

      {/* Road Trip Stops */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Car size={16} className="text-primary" />
          <h3 className="section-header">Stops & Highlights</h3>
          <span className="text-xs text-muted-foreground">({filteredStops.length})</span>
        </div>
        <div className="space-y-2">
          {filteredStops.map((stop, idx) => {
            // Show day header before first stop of each day
            const prevStop = filteredStops[idx - 1];
            const showDayHeader = idx === 0 || stop.day !== prevStop?.day;
            const daySummary = DAY_SUMMARIES[stop.day];
            const dayHeader = showDayHeader && daySummary ? (
              <div key={`day-header-${stop.day}`} className="flex items-center gap-2 py-1.5 px-2 rounded bg-primary/5 border border-primary/20 mb-1">
                <span className="text-[10px] font-bold text-primary data-mono">DAY {stop.day}</span>
                <span className="text-[10px] text-muted-foreground data-mono">{daySummary.miles}</span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[10px] text-muted-foreground data-mono">🚗 {daySummary.drive}</span>
                {daySummary.activity !== "—" && (
                  <>
                    <span className="text-[10px] text-muted-foreground">·</span>
                    <span className="text-[10px] text-muted-foreground data-mono">🦶 {daySummary.activity}</span>
                  </>
                )}
              </div>
            ) : null;
            const Icon = STOP_ICONS[stop.type] || MapPin;
            return (
              <div key={stop.id}>
                {dayHeader}
                <div
                  className={`p-3 rounded-md border ${
                    stop.highlight
                      ? "border-primary/40 bg-primary/5"
                      : "border-border bg-background"
                  }`}
                >
                <div className="flex items-start gap-2">
                  <Icon size={14} className={stop.highlight ? "text-primary mt-0.5" : "text-muted-foreground mt-0.5"} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{stop.name}</span>
                      {stop.highlight && (
                        <Star size={10} className="text-primary fill-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{stop.description}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-[10px] text-muted-foreground data-mono">
                      <span>Day {stop.day}</span>
                      <span>~{stop.mileFromStart} mi</span>
                      <span>{stop.duration}</span>
                      {stop.cost && <span className="text-emerald-400">{stop.cost}</span>}
                      {stop.hours && <span>{stop.hours}</span>}
                    </div>
                    {/* GPS link + address */}
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-[10px]">
                      <a
                        href={`https://maps.google.com/?q=${stop.lat},${stop.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        📍 Open in Maps
                      </a>
                      {stop.address && <span className="text-muted-foreground">{stop.address}</span>}
                    </div>
                  </div>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grocery / Resupply */}
      <div className="bg-card border border-border rounded-lg p-4">
        <button onClick={() => setShowGrocery(!showGrocery)} className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart size={16} className="text-emerald-400" />
            <h3 className="section-header">Grocery & Resupply</h3>
            <span className="text-xs text-muted-foreground">({GROCERY_STOPS.length})</span>
          </div>
          {showGrocery ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
        </button>
        <AnimatePresence>
          {showGrocery && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3 space-y-2"
            >
              {GROCERY_STOPS.map((g) => (
                <div key={g.id} className="flex items-start gap-3 p-2 rounded-md bg-background border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{g.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        g.type === "full" ? "bg-emerald-500/20 text-emerald-400" :
                        g.type === "limited" ? "bg-amber-500/20 text-amber-400" :
                        "bg-zinc-500/20 text-zinc-400"
                      }`}>
                        {g.type}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{g.town}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{g.notes}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Backup / Alternative Camping */}
      <div className="bg-card border border-border rounded-lg p-4">
        <button onClick={() => setShowBackupCamps(!showBackupCamps)} className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tent size={16} className="text-amber-400" />
            <h3 className="section-header">Backup Camping Spots</h3>
            <span className="text-xs text-muted-foreground">({BACKUP_CAMPS.length})</span>
          </div>
          {showBackupCamps ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
        </button>
        <AnimatePresence>
          {showBackupCamps && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3 space-y-2"
            >
              <p className="text-[10px] text-muted-foreground mb-2">Alternative dispersed camping for when you want to push ahead or cut a day short.</p>
              {BACKUP_CAMPS.map((bc) => (
                <div key={bc.id} className="p-3 rounded-md bg-background border border-border">
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-medium">{bc.name}</span>
                    <span className="text-[10px] text-amber-400 data-mono shrink-0 ml-2">{bc.applicableDays}</span>
                  </div>
                  <div className="text-[10px] text-primary data-mono mt-0.5">{bc.betweenStops}</div>
                  <p className="text-xs text-muted-foreground mt-1">{bc.description}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-[10px] text-muted-foreground data-mono">
                    <span>{bc.landManager}</span>
                    <span className="text-emerald-400">{bc.cost}</span>
                  </div>
                  {bc.notes && <p className="text-[10px] text-zinc-500 mt-1">{bc.notes}</p>}
                  <a
                    href={`https://maps.google.com/?q=${bc.lat},${bc.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-blue-400 underline mt-1 inline-block"
                  >
                    📍 Open in Maps
                  </a>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Driving Tips */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Car size={16} className="text-primary" />
          <h3 className="section-header">Campervan Tips</h3>
        </div>
        <ul className="space-y-1">
          {[
            "Fill up gas in Flagstaff or Williams — limited options near the canyon",
            "FR 302 is dirt/gravel but campervan-accessible in dry conditions",
            "Park entry is $35/vehicle (7-day pass) — pay at entrance station",
            "Overnight parking allowed in any park lot with backcountry permit",
            "Dump station available at Mather Campground (South Rim)",
            "Cell service: Verizon works at South Rim village, nothing in the canyon",
            "Fill water tanks in Flagstaff — limited fill stations at the canyon",
          ].map((tip, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <span className="text-primary mt-0.5">·</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
