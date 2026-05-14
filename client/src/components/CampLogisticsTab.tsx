// Camp & Logistics Tab — Permits, camping, shuttle options, parking, Phantom Ranch
// Design: Dark topographic brutalism, orange/amber accents
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus, Tent, ParkingCircle, FileText, Coffee, ChevronDown, ChevronUp,
  Phone, Globe, Clock, DollarSign, AlertTriangle, CheckCircle2, MapPin, Compass
} from "lucide-react";
import {
  SHUTTLE_OPTIONS, CAMP_INFO, PERMIT_INFO, PARKING_INFO, PHANTOM_RANCH, DAY_HIKES
} from "@/lib/logistics-data";

export default function CampLogisticsTab() {
  const [prepChecked, setPrepChecked] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("gc-prep-checklist");
    return saved ? JSON.parse(saved) : {};
  });
  const togglePrep = (id: string) => {
    const next = { ...prepChecked, [id]: !prepChecked[id] };
    setPrepChecked(next);
    localStorage.setItem("gc-prep-checklist", JSON.stringify(next));
  };
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    shuttles: true,
    camping: true,
    permit: false,
    parking: false,
    phantom: false,
    dayhikes: false,
    prep: false,
  });

  const toggle = (key: string) =>
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Hero Image */}
      <div className="relative rounded-lg overflow-hidden h-40">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663340412157/T6pzEvKjVsBAVih68eJefw/gc-bright-angel-creek-bTTRTrma48iMpTEjhynYSV.webp"
          alt="Bright Angel Creek"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <h2 className="display-text text-lg text-white">Camp & Logistics</h2>
          <p className="text-xs text-zinc-300 mt-0.5">Everything you need for the canyon</p>
        </div>
      </div>

      {/* Shuttle Options */}
      <Section
        title="Shuttle Options"
        icon={<Bus size={16} className="text-primary" />}
        expanded={expandedSections.shuttles}
        onToggle={() => toggle("shuttles")}
        count={SHUTTLE_OPTIONS.length}
      >
        <div className="space-y-3">
          {SHUTTLE_OPTIONS.map((s) => (
            <div
              key={s.id}
              className={`p-3 rounded-md border ${
                s.recommended
                  ? "border-primary/50 bg-primary/5"
                  : "border-border bg-background"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{s.name}</span>
                    {s.recommended && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.route}</div>
                </div>
                <span className="text-sm font-bold data-mono text-primary">{s.price}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock size={10} /> {s.departures.join(", ")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={10} /> {s.duration}
                </span>
              </div>
              <ul className="mt-2 space-y-0.5">
                {s.notes.map((note, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">·</span>
                    {note}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 mt-2 pt-2 border-t border-border">
                {s.phone && (
                  <a href={`tel:${s.phone}`} className="text-xs text-primary flex items-center gap-1">
                    <Phone size={10} /> {s.phone}
                  </a>
                )}
                {s.website && (
                  <a href={s.website} target="_blank" rel="noopener" className="text-xs text-primary flex items-center gap-1">
                    <Globe size={10} /> Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Camping */}
      <Section
        title="Camping"
        icon={<Tent size={16} className="text-emerald-400" />}
        expanded={expandedSections.camping}
        onToggle={() => toggle("camping")}
        count={CAMP_INFO.length}
      >
        <div className="space-y-3">
          {CAMP_INFO.map((camp) => (
            <div key={camp.id} className="p-3 rounded-md border border-border bg-background">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm font-medium">{camp.name}</span>
                  <span className="text-xs text-muted-foreground ml-2 capitalize">({camp.type})</span>
                </div>
                <span className="text-sm font-bold data-mono text-emerald-400">{camp.cost}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{camp.description}</p>
              {camp.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {camp.amenities.map((a) => (
                    <span key={a} className="text-[10px] px-1.5 py-0.5 rounded bg-card border border-border text-muted-foreground">
                      {a}
                    </span>
                  ))}
                </div>
              )}
              <ul className="mt-2 space-y-0.5">
                {camp.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-emerald-400 mt-0.5">·</span>
                    {tip}
                  </li>
                ))}
              </ul>
              {camp.reservationUrl && (
                <a href={camp.reservationUrl} target="_blank" rel="noopener" className="text-xs text-primary flex items-center gap-1 mt-2">
                  <Globe size={10} /> Book on recreation.gov
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Permit */}
      <Section
        title="Backcountry Permit"
        icon={<FileText size={16} className="text-amber-400" />}
        expanded={expandedSections.permit}
        onToggle={() => toggle("permit")}
      >
        <div className="p-3 rounded-md border border-border bg-background">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Entry</div>
              <div className="text-sm font-bold data-mono">{PERMIT_INFO.entryDate}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Exit</div>
              <div className="text-sm font-bold data-mono">{PERMIT_INFO.exitDate}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Cost</div>
              <div className="text-sm font-bold data-mono text-emerald-400">{PERMIT_INFO.cost}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Check-in</div>
              <div className="text-xs text-muted-foreground">{PERMIT_INFO.checkIn}</div>
            </div>
          </div>
          <div className="border-t border-border pt-2">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Rules</div>
            <ul className="space-y-0.5">
              {PERMIT_INFO.rules.map((rule, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <CheckCircle2 size={10} className="text-emerald-400 mt-0.5 shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Parking */}
      <Section
        title="Parking"
        icon={<ParkingCircle size={16} className="text-blue-400" />}
        expanded={expandedSections.parking}
        onToggle={() => toggle("parking")}
      >
        <div className="p-3 rounded-md border border-border bg-background">
          <div className="text-sm font-medium">{PARKING_INFO.location}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{PARKING_INFO.address}</div>
          <div className="flex gap-3 mt-2">
            <span className="text-xs data-mono text-emerald-400">{PARKING_INFO.cost}</span>
            <span className="text-xs text-muted-foreground">Overnight: {PARKING_INFO.overnight ? "Yes" : "No"}</span>
          </div>
          <ul className="mt-2 space-y-0.5">
            {PARKING_INFO.notes.map((note, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-blue-400 mt-0.5">·</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Phantom Ranch Canteen */}
      <Section
        title="Phantom Ranch Canteen"
        icon={<Coffee size={16} className="text-amber-400" />}
        expanded={expandedSections.phantom}
        onToggle={() => toggle("phantom")}
      >
        <div className="p-3 rounded-md border border-border bg-background space-y-3">
          <div className="text-xs text-muted-foreground">{PHANTOM_RANCH.distance}</div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Hours (May)</div>
            <div className="space-y-0.5 text-xs">
              <div><span className="text-muted-foreground">Canteen Window:</span> <span className="data-mono">{PHANTOM_RANCH.hours.canteenWindow}</span></div>
              <div><span className="text-muted-foreground">Breakfast:</span> <span className="data-mono">{PHANTOM_RANCH.hours.breakfast}</span></div>
              <div><span className="text-muted-foreground">Dinner:</span> <span className="data-mono">{PHANTOM_RANCH.hours.dinner}</span></div>
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Available Without Reservation</div>
            <div className="flex flex-wrap gap-1">
              {PHANTOM_RANCH.availableWithoutReservation.map((item) => (
                <span key={item} className="text-[10px] px-1.5 py-0.5 rounded bg-card border border-border text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Pro Tips</div>
            <ul className="space-y-0.5">
              {PHANTOM_RANCH.tips.map((tip, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-amber-400 mt-0.5">·</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Day Hikes */}
      <Section
        title="Day Hikes (South Rim)"
        icon={<Compass size={16} className="text-emerald-400" />}
        expanded={expandedSections.dayhikes}
        onToggle={() => toggle("dayhikes")}
        count={DAY_HIKES.length}
      >
        <div className="space-y-2">
          {DAY_HIKES.map((hike) => (
            <div key={hike.id} className="p-3 rounded-md border border-border bg-background">
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium">{hike.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  hike.difficulty === "easy" ? "bg-emerald-500/20 text-emerald-400" :
                  hike.difficulty === "moderate" ? "bg-amber-500/20 text-amber-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {hike.difficulty}
                </span>
              </div>
              <div className="flex gap-3 mt-1 text-xs text-muted-foreground data-mono">
                <span>{hike.distance}</span>
                <span>{hike.elevChange}</span>
                <span>{hike.duration}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{hike.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pre-Trip Downloads & Prep */}
      <Section
        title="Pre-Trip Downloads & Prep"
        icon={<Globe size={16} className="text-blue-400" />}
        expanded={expandedSections.prep}
        onToggle={() => toggle("prep")}
      >
        <div className="space-y-3">
          <p className="text-[10px] text-muted-foreground">Download these before you leave. Check items off as you go — your progress is saved.</p>
          {[
            { cat: "Google Maps Offline Areas", items: [
              { id: "gm-1", label: "I-80 Nebraska corridor (Omaha → North Platte)" },
              { id: "gm-2", label: "Central Colorado (Denver → Buena Vista → Montrose)" },
              { id: "gm-3", label: "Southwest Colorado (Montrose → Cortez/Dolores)" },
              { id: "gm-4", label: "Navajo Nation / NE Arizona (Cortez → Flagstaff) — CRITICAL" },
              { id: "gm-5", label: "Grand Canyon area (Flagstaff → GC Village → Page)" },
              { id: "gm-6", label: "Southern Utah (Bryce Canyon → I-70 corridor)" },
              { id: "gm-7", label: "Central Colorado return (Grand Junction → Buena Vista)" },
            ]},
            { cat: "MVUM / Avenza Maps (for dispersed camping)", items: [
              { id: "av-1", label: "Kaibab National Forest MVUM — legal roads near FR 302" },
              { id: "av-2", label: "San Juan National Forest MVUM — Boggy Draw area" },
              { id: "av-3", label: "Dixie National Forest MVUM — Tom's Best Spring / FR-117" },
              { id: "av-4", label: "San Isabel National Forest MVUM — Fourmile Creek area" },
            ]},
            { cat: "NPS Apps (download offline content)", items: [
              { id: "nps-1", label: "Grand Canyon NPS app — trail maps, shuttle schedules, water status" },
              { id: "nps-2", label: "Bryce Canyon NPS app — trail maps" },
              { id: "nps-3", label: "Black Canyon NPS app — South Rim trails" },
            ]},
            { cat: "AllTrails Offline Maps", items: [
              { id: "at-1", label: "North Kaibab Trail" },
              { id: "at-2", label: "Bright Angel Trail" },
              { id: "at-3", label: "South Kaibab Trail" },
              { id: "at-4", label: "Bryce Canyon — Navajo Loop + Queen's Garden + Peek-a-Boo" },
              { id: "at-5", label: "Black Canyon — Warner Point, Oak Flat" },
            ]},
            { cat: "Bookings & Permits", items: [
              { id: "bk-1", label: "Print backcountry permit from recreation.gov" },
              { id: "bk-2", label: "Book Trans-Canyon Shuttle (928-638-2820 / trans-canyonshuttle.com)" },
              { id: "bk-3", label: "Check Grand Canyon corridor closures / water status" },
              { id: "bk-4", label: "Check fire restrictions for each NF/BLM area" },
            ]},
            { cat: "Van Prep", items: [
              { id: "vp-1", label: "Fill water tanks" },
              { id: "vp-2", label: "Propane topped off" },
              { id: "vp-3", label: "Oil change / tire check" },
              { id: "vp-4", label: "Portable battery / solar charged" },
              { id: "vp-5", label: "First aid kit stocked" },
            ]},
          ].map((group) => (
            <div key={group.cat}>
              <h4 className="text-[10px] text-primary uppercase tracking-wider font-medium mb-1">{group.cat}</h4>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => togglePrep(item.id)}
                    className="w-full flex items-center gap-2 py-1 px-1 rounded hover:bg-background text-left"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      prepChecked[item.id] ? "bg-emerald-500/20 border-emerald-500" : "border-border"
                    }`}>
                      {prepChecked[item.id] && <CheckCircle2 size={12} className="text-emerald-400" />}
                    </div>
                    <span className={`text-xs ${prepChecked[item.id] ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="text-[10px] text-muted-foreground pt-2 border-t border-border">
            {Object.values(prepChecked).filter(Boolean).length} / {26} items checked
          </div>
        </div>
      </Section>
    </div>
  );
}

// Reusable collapsible section
function Section({
  title, icon, expanded, onToggle, count, children,
}: {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <button onClick={onToggle} className="w-full flex items-center justify-between mb-0">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="section-header">{title}</h3>
          {count !== undefined && (
            <span className="text-xs text-muted-foreground">({count})</span>
          )}
        </div>
        {expanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
