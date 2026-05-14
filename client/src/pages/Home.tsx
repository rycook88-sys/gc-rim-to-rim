// Grand Canyon Rim-to-Rim — Main Dashboard
// No sticky header — hero card first, then tabs below it
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mountain, MapPin, Car } from "lucide-react";
import TrailTab from "@/components/TrailTab";
import CampLogisticsTab from "@/components/CampLogisticsTab";
import RoadTripTab from "@/components/RoadTripTab";
import HeroSection from "@/components/HeroSection";

type Tab = "trail" | "camp" | "roadtrip";

const TABS: { id: Tab; label: string; icon: typeof Mountain }[] = [
  { id: "trail", label: "Trail", icon: Mountain },
  { id: "camp", label: "Camp & Logistics", icon: MapPin },
  { id: "roadtrip", label: "Road Trip", icon: Car },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("trail");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero card at the top */}
      <div className="px-4 pt-4">
        <HeroSection />
      </div>

      {/* Tab Navigation — below hero */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors relative ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <main className="pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "trail" && <TrailTab />}
            {activeTab === "camp" && <CampLogisticsTab />}
            {activeTab === "roadtrip" && <RoadTripTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
