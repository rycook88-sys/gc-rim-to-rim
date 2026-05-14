// Grand Canyon Rim-to-Rim Logistics Data
// Shuttle options, camping, parking, permits, road trip stops

export interface ShuttleOption {
  id: string;
  name: string;
  type: "rim-to-rim" | "trailhead" | "free-nps";
  route: string;
  departures: string[];
  duration: string;
  price: string;
  phone: string;
  website: string;
  bookingRequired: boolean;
  notes: string[];
  recommended?: boolean;
}

export interface CampInfo {
  id: string;
  name: string;
  type: "backcountry" | "dispersed" | "developed";
  lat: number;
  lng: number;
  description: string;
  amenities: string[];
  cost: string;
  reservationRequired: boolean;
  reservationUrl?: string;
  tips: string[];
}

export interface RoadTripStop {
  id: string;
  day: number;
  name: string;
  type: "scenic" | "food" | "outdoor" | "quirky" | "camping" | "resupply" | "town";
  lat: number;
  lng: number;
  description: string;
  duration: string;       // suggested time to spend
  address?: string;
  hours?: string;
  cost?: string;
  highlight: boolean;     // featured stop
  mileFromStart: number;  // approximate miles from Bellevue
}

export interface GroceryStop {
  id: string;
  name: string;
  town: string;
  lat: number;
  lng: number;
  type: "full" | "limited" | "convenience";
  notes: string;
}

// ═══════════════════════════════════════════════════════════
// SHUTTLE OPTIONS
// ═══════════════════════════════════════════════════════════
export const SHUTTLE_OPTIONS: ShuttleOption[] = [
  {
    id: "trans-canyon-am",
    name: "Trans-Canyon Shuttle (Morning)",
    type: "rim-to-rim",
    route: "South Rim (Bright Angel Lodge) → North Kaibab Trailhead",
    departures: ["8:00 AM"],
    duration: "4-5 hours",
    price: "$120/person",
    phone: "928-638-2820",
    website: "https://www.trans-canyonshuttle.com",
    bookingRequired: true,
    notes: [
      "The original rim-to-rim shuttle service (35+ years)",
      "Picks up at Bright Angel Lodge on South Rim",
      "Drops at North Kaibab Trailhead",
      "Also offers luggage transport to South Rim",
      "Arrives at trailhead ~12:00-1:00 PM",
      "Late start means hiking in afternoon heat — plan accordingly",
    ],
  },
  {
    id: "trans-canyon-pm",
    name: "Trans-Canyon Shuttle (Afternoon)",
    type: "rim-to-rim",
    route: "South Rim (Bright Angel Lodge) → North Kaibab Trailhead",
    departures: ["1:30 PM"],
    duration: "4-5 hours",
    price: "$120/person",
    phone: "928-638-2820",
    website: "https://www.trans-canyonshuttle.com",
    bookingRequired: true,
    notes: [
      "Afternoon departure — arrives at trailhead ~5:30-6:30 PM",
      "Only viable if you plan to camp at Cottonwood (6.8 mi in) and split descent over 2 days",
      "Not recommended for single-day descent to Bright Angel CG",
    ],
  },
  {
    id: "trans-canyon-trailhead",
    name: "Trans-Canyon Trailhead Shuttle",
    type: "trailhead",
    route: "South Rim area → North Kaibab Trailhead (via Kaibab Lodge)",
    departures: ["Sunrise shuttle", "Later morning shuttle"],
    duration: "~4.5 hours",
    price: "$90-120/person",
    phone: "928-638-2820",
    website: "https://www.trans-canyonshuttle.com",
    bookingRequired: true,
    recommended: true,
    notes: [
      "Trailhead-specific shuttle designed for hikers",
      "Scheduled to arrive at North Kaibab Trailhead at sunrise",
      "Best option for an early start on the descent",
      "Call to confirm exact pickup time and location",
    ],
  },
  {
    id: "hikers-express",
    name: "Hikers' Express (NPS Free Shuttle)",
    type: "free-nps",
    route: "Grand Canyon Village → South Kaibab Trailhead",
    departures: ["6:00 AM", "7:00 AM", "8:00 AM"],
    duration: "30 minutes",
    price: "FREE",
    phone: "928-638-7888",
    website: "https://www.nps.gov/grca/planyourvisit/hiker-express-shuttle.htm",
    bookingRequired: false,
    notes: [
      "FREE NPS shuttle — no reservation needed",
      "Goes to South Kaibab Trailhead ONLY (South Rim)",
      "Does NOT go to North Rim / North Kaibab Trailhead",
      "Useful for Day 2 exit if taking South Kaibab down",
      "Stops: Bright Angel Lodge → Backcountry Info Center → Visitor Center → S. Kaibab TH",
      "One-way only — does not return hikers from trailhead",
    ],
  },
  {
    id: "kaibab-orange",
    name: "Kaibab Rim (Orange) Route",
    type: "free-nps",
    route: "Visitor Center → South Kaibab Trailhead",
    departures: ["First bus 6:00 AM", "Every 15-30 min", "Last bus 1hr after sunset"],
    duration: "9 minutes",
    price: "FREE",
    phone: "928-638-7888",
    website: "https://www.nps.gov/grca/planyourvisit/kaibab-orange-route.htm",
    bookingRequired: false,
    notes: [
      "Runs all day from Visitor Center to South Kaibab Trailhead",
      "Road to South Kaibab TH is CLOSED to private vehicles",
      "This shuttle (or Hikers' Express) is the only way to reach S. Kaibab TH",
      "Also stops at Yaki Point (great sunrise viewpoint)",
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// CAMPING INFO
// ═══════════════════════════════════════════════════════════
export const CAMP_INFO: CampInfo[] = [
  {
    id: "bright-angel-cg",
    name: "Bright Angel Campground",
    type: "backcountry",
    lat: 36.1210, lng: -112.0180,
    description: "Your permitted campsite at the bottom of the Grand Canyon, along Bright Angel Creek near Phantom Ranch.",
    amenities: ["Treated water spigots", "Flush toilets", "Picnic tables", "Food storage boxes", "Pack poles for hanging gear"],
    cost: "$25 (permit fee via recreation.gov)",
    reservationRequired: true,
    reservationUrl: "https://www.recreation.gov",
    tips: [
      "33 tent-only sites shaded by cottonwood trees",
      "Pack in / pack out — no trash service",
      "No fires allowed",
      "0.3 mi walk to Phantom Ranch canteen for lemonade/beer",
      "Creek is great for soaking tired feet",
      "Ranger station nearby for emergencies",
      "Permit: Entry May 21, Exit May 22",
    ],
  },
  {
    id: "fr-302",
    name: "Forest Road 302 (Dispersed)",
    type: "dispersed",
    lat: 35.88, lng: -111.98,
    description: "Free dispersed camping in Kaibab National Forest, just south of Grand Canyon National Park. Perfect for the campervan the night before.",
    amenities: ["None — bring everything"],
    cost: "FREE",
    reservationRequired: false,
    tips: [
      "Turn south off AZ-64 onto FR 302",
      "~50 individual sites along dirt roads",
      "Must camp within 30 ft of road",
      "Road is firm packed dirt/gravel — campervan accessible",
      "No water, no toilets, no trash — pack everything",
      "14-day stay limit",
      "Gets quieter the further you drive from the highway",
      "Cell service: spotty to none",
      "Arrive before dark to find a good spot",
    ],
  },
  {
    id: "mather-cg",
    name: "Mather Campground (South Rim)",
    type: "developed",
    lat: 36.0485, lng: -112.1185,
    description: "Developed NPS campground on the South Rim. Backup option if you want hookups or facilities.",
    amenities: ["Water", "Flush toilets", "Dump station", "Coin laundry", "Showers nearby"],
    cost: "$18/night",
    reservationRequired: true,
    reservationUrl: "https://www.recreation.gov",
    tips: [
      "327 sites, some suitable for RVs/vans",
      "Walking distance to rim and village",
      "Book well in advance for May dates",
      "Market Plaza nearby for supplies",
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// ROAD TRIP — Full 12-night itinerary
// Time zones: NE=CDT(UTC-5), CO=MDT(UTC-6), AZ=MST(UTC-7 no DST), UT=MDT(UTC-6)
// ═══════════════════════════════════════════════════════════
export const ROAD_TRIP_STOPS: RoadTripStop[] = [
  // DAY 1 (Sun May 17): Bellevue → Buena Vista. Drive ~660 mi, 9.5-10 hrs. Leave 5 AM CDT.
  { id: "rt-1", day: 1, name: "Lake McConaughy", type: "scenic", lat: 41.2150, lng: -101.9500, description: "Nebraska's largest lake — 'Big Mac.' White sand beaches, turquoise water. Quick leg stretch ~3 hrs in.", duration: "15-20 min", highlight: false, mileFromStart: 280 },
  { id: "rt-2", day: 1, name: "Fourmile Creek / CR-375 (overnight)", type: "camping", lat: 38.8971, lng: -106.1295, description: "Free dispersed camping in San Isabel NF. Take FR 371 (Colorado Ave) from Buena Vista, turn right onto FR 375 before the railroad tunnels. Multiple established sites along the creek. No water/toilets — pack everything.", duration: "Overnight", highlight: true, mileFromStart: 660, cost: "Free" },
  // DAY 2 (Mon May 18): Black Canyon + Cortez. Drive ~275 mi, 5.5 hrs + 2-3 hrs at park. Leave 7 AM MDT.
  { id: "rt-3", day: 2, name: "Black Canyon of the Gunnison NP", type: "outdoor", lat: 38.5754, lng: -107.7416, description: "Sheer 2,000 ft vertical walls — narrower and steeper than the Grand Canyon. HIKES: Warner Point Nature Trail (1.6 mi RT, 1 hr, moderately strenuous — best panoramic views of the canyon, San Juan Mtns, and Uncompahgre Valley). Oak Flat Loop (1.6 mi RT, 1.5 hrs — descends below the rim into scrub oak forest, unique perspective). Rim Rock Trail (2 mi RT, 1 hr — follows the rim with continuous canyon views). Cedar Point Nature Trail (0.4 mi RT, 30 min — quick overlook of Painted Wall, tallest cliff in CO at 2,250 ft). Also stop at Painted Wall View and Chasm View overlooks.", duration: "2-3 hrs (full morning)", highlight: true, mileFromStart: 790, cost: "$30/vehicle", hours: "Visitor Center 8 AM - 6 PM" },
  { id: "rt-4", day: 2, name: "Boggy Draw — San Juan NF (overnight)", type: "camping", lat: 37.5086, lng: -108.4580, description: "Free dispersed camping in San Juan NF near Dolores. From Dolores, go north on Hwy 145, turn onto FR 526. Ponderosa pine forest. Check road conditions — can be muddy in May. No services.", duration: "Overnight", highlight: true, mileFromStart: 935, cost: "Free" },
  // DAY 3 (Tue May 19): Cortez → Petrified Forest → Meteor Crater → FR 302. Drive ~430 mi, 7 hrs. Leave 7 AM MDT. AZ is 1 hr behind.
  { id: "rt-5", day: 3, name: "Navajo Nation (US-160 / US-491)", type: "scenic", lat: 36.7500, lng: -109.5000, description: "Vast open desert, red mesas. RULES: Stay on paved roads. No camping without tribal permit. No alcohol. No photography of people/homes. Gas up in Cortez — stations 50+ mi apart. Watch for livestock at dusk.", duration: "Drive-through (~3 hrs)", highlight: false, mileFromStart: 1050 },
  { id: "rt-6", day: 3, name: "Petrified Forest National Park", type: "outdoor", lat: 34.9100, lng: -109.7880, description: "225-million-year-old petrified logs in painted desert badlands. BEST SHORT HIKES: Crystal Forest Trail (0.75 mi loop — highest concentration of petrified wood, some with quartz crystals visible). Blue Mesa Trail (1 mi loop — descends into blue-gray bentonite badlands, otherworldly landscape). Painted Desert Rim Trail (1 mi RT — panoramic views of the Painted Desert from Tawa Point to Kachina Point). Drive the 28-mile park road north to south. Enter from I-40 Exit 311.", duration: "1-1.5 hrs", highlight: true, mileFromStart: 1160, cost: "$25/vehicle", hours: "8 AM - 5 PM MST" },
  { id: "rt-7", day: 3, name: "Meteor Crater", type: "scenic", lat: 35.0275, lng: -111.0228, description: "50,000-year-old impact crater — nearly a mile wide, 550 ft deep. Viewing platforms and museum. I-40 Exit 233.", duration: "45 min", highlight: false, mileFromStart: 1260, cost: "$25 adult" },
  { id: "rt-8", day: 3, name: "Flagstaff — Grocery Resupply", type: "resupply", lat: 35.2010, lng: -111.6310, description: "Last full grocery before the canyon. Safeway, Walmart, or Natural Grocers. Stock up on trail food, electrolytes, water for 3+ days.", duration: "30-45 min", highlight: false, mileFromStart: 1300 },
  { id: "rt-9", day: 3, name: "FR 302 / Long Jim — Kaibab NF (overnight)", type: "camping", lat: 35.9681, lng: -112.1185, description: "Free dispersed camping in Kaibab NF south of Tusayan. Firm packed dirt/gravel — campervan OK. No water/toilets/trash. 14-day limit. Arrive before dark. Cell: spotty to none. Camp here 3 nights (May 19, 20, 22).", duration: "Overnight", highlight: true, mileFromStart: 1380, cost: "Free" },
  // DAY 4 (Wed May 20): Rest/Setup Day. No driving.
  { id: "rt-10", day: 4, name: "Grand Canyon South Rim — Explore", type: "outdoor", lat: 36.0544, lng: -112.1401, description: "Rest day. Mather Point, Yavapai Museum, Rim Trail. Short day hike (South Kaibab to Cedar Ridge, 3 mi RT). Check Lot D. Organize gear. Nap at FR 302.", duration: "All day", highlight: false, mileFromStart: 1380, cost: "$35/vehicle (7-day pass)" },
  { id: "rt-11", day: 4, name: "Move van to Lot D — 11 PM MST", type: "town", lat: 36.0575, lng: -112.1430, description: "Drive van from FR 302 to Lot D by 11 PM MST. Park and sleep in van until shuttle pickup at 12:26 AM. DO NOT camp at Lot D — just parking + sleep.", duration: "11 PM → shuttle", highlight: false, mileFromStart: 1380 },
  // DAY 5 (Thu May 21): HIKE DAY 1. Shuttle pickup 12:26 AM.
  { id: "rt-12", day: 5, name: "Trans-Canyon Shuttle → North Kaibab TH", type: "town", lat: 36.2141, lng: -112.0566, description: "MIDNIGHT SHUTTLE: Pickup 12:26 AM Bright Angel Lodge (12:33 AM Yavapai). Arrive North Kaibab TH 5:13 AM. Reservation required — trans-canyonshuttle.com / 928-638-2820. $120/person. Bring headlamp.", duration: "12:26 AM → 5:13 AM", highlight: true, mileFromStart: 1380, cost: "$120/person" },
  { id: "rt-13", day: 5, name: "Hike: North Kaibab → Bright Angel CG", type: "outdoor", lat: 36.0948, lng: -112.0972, description: "15 mi descent, 5,771 ft loss. Start at first light (~5:30 AM). Carry 3-4L water. Refill: Supai Tunnel (mi 1.7), Roaring Springs (mi 4.7), Manzanita (mi 6.8), Cottonwood (mi 6.9), Phantom Ranch (mi 14).", duration: "6-9 hrs hiking", highlight: true, mileFromStart: 1380 },
  // DAY 6 (Fri May 22): HIKE DAY 2.
  { id: "rt-14", day: 6, name: "Hike out: Bright Angel Trail to South Rim", type: "outdoor", lat: 36.0575, lng: -112.1430, description: "9.5 mi ascent, 4,380 ft gain. Start at dawn (~5:30 AM). Water: Indian Garden (mi 4.6), 3-Mile Resthouse (mi 6.4), 1.5-Mile Resthouse (mi 8). 6-8 hrs. OR South Kaibab (7 mi, steeper, NO water).", duration: "6-8 hrs hiking", highlight: true, mileFromStart: 1380 },
  { id: "rt-15", day: 6, name: "FR 302 — Recovery night", type: "camping", lat: 35.9681, lng: -112.1185, description: "Back to FR 302. Eat, hydrate, sleep. You earned it.", duration: "Overnight", highlight: false, mileFromStart: 1380, cost: "Free" },
  // DAY 7 (Sat May 23): Chill Day.
  { id: "rt-16", day: 7, name: "Chill Day — South Rim", type: "outdoor", lat: 36.0544, lng: -112.1401, description: "Sleep in. Hermit Road shuttle (free, 7 viewpoints), El Tovar bar, Rim Trail, gift shops, or just stare at the canyon. Camp at FR 302.", duration: "All day", highlight: false, mileFromStart: 1380 },
  // DAY 8 (Sun May 24): GC → Horseshoe Bend → Bryce. Drive ~340 mi, 6 hrs + stop. Leave 8 AM MST. Gain 1 hr entering UT.
  { id: "rt-17a", day: 8, name: "Horseshoe Bend", type: "outdoor", lat: 36.8791, lng: -111.5104, description: "Iconic 1,000-ft drop to the Colorado River's horseshoe meander. 1.5 mi RT paved walk (15-20 min each way). No guardrails at overlook. Best light: morning or late afternoon. Right on your route through Page, AZ. $10 parking. Bring water — exposed, no shade, 80-90°F in May.", duration: "45 min", highlight: true, mileFromStart: 1530, cost: "$10 parking" },
  { id: "rt-17", day: 8, name: "Drive to Bryce Canyon", type: "scenic", lat: 37.5930, lng: -112.1871, description: "AZ-64 N → US-89 N → US-89A → UT-12 E. Vermilion Cliffs, Red Canyon. GAIN 1 hour crossing into Utah (AZ=MST, UT=MDT). Arrive mid-afternoon.", duration: "5.5 hrs", highlight: false, mileFromStart: 1680 },
  { id: "rt-18", day: 8, name: "Bryce Canyon — Sunset rim walk", type: "outdoor", lat: 37.6283, lng: -112.1671, description: "Sunset Point and Bryce Point for first hoodoo views. Sunset is incredible — amphitheater glows orange/pink.", duration: "2-3 hrs", highlight: true, mileFromStart: 1680, cost: "$35/vehicle (7-day pass)" },
  { id: "rt-19", day: 8, name: "Tom's Best Spring Rd / FR-117 (overnight)", type: "camping", lat: 37.7280, lng: -112.2487, description: "Free dispersed in Dixie NF. FR-117 north of Hwy 12, ~6 mi west of Bryce turnoff. Elevation 7,700 ft (cold at night — layers!). Popular — arrive before dark. 2 nights.", duration: "Overnight", highlight: true, mileFromStart: 1690, cost: "Free" },
  // DAY 9 (Mon May 25): Full Day at Bryce.
  { id: "rt-20", day: 9, name: "Bryce Canyon — Full day hiking", type: "outdoor", lat: 37.6228, lng: -112.1666, description: "THE day. Start 7 AM. MORNING: Navajo Loop + Queen's Garden combo (2.9 mi, 550 ft gain, 2 hrs) — descend through Wall Street's narrow slot canyon with towering walls, loop through Queen's Garden hoodoo formations, climb back to rim. The #1 must-do. MIDDAY: Peek-a-Boo Loop (5.5 mi, 1,560 ft gain, 3-4 hrs, strenuous) — the best trail in the park. Drops below the rim into a maze of hoodoos, arches, and fins. Steep switchbacks but incredible at every turn. AFTERNOON: Figure-8 Combo (6.4 mi, 1,575 ft, 4-5 hrs) connects all three trails if you want the full experience. VIEWPOINTS: Bryce Point (best overall), Inspiration Point (amphitheater panorama), Sunset Point (classic hoodoo view). Elevation 8,000+ ft — bring layers and sunscreen.", duration: "Full day (6-8 hrs)", highlight: true, mileFromStart: 1690 },
  // DAY 10 (Tue May 26): Bryce → BV + hot springs. Drive ~470 mi, 7.5-8 hrs. Leave 7 AM MDT.
  { id: "rt-21", day: 10, name: "Drive: Bryce → Buena Vista", type: "scenic", lat: 38.8420, lng: -106.1311, description: "UT-12 through Red Canyon, I-70 through CO canyon country, US-50/285 to BV. Optional: Colorado National Monument (Rim Rock Drive, 23 mi scenic loop near Grand Junction).", duration: "7.5-8 hrs", highlight: false, mileFromStart: 2160 },
  { id: "rt-22", day: 10, name: "Cottonwood Hot Springs", type: "outdoor", lat: 38.8420, lng: -106.2500, description: "Rustic natural hot springs — 5 outdoor stone pools. Small, quiet, not commercialized. Perfect post-trip recovery. 5 mi west of BV on CR 306.", duration: "1.5-2 hrs", highlight: true, mileFromStart: 2165, cost: "$30 weekday / $35 weekend", hours: "8 AM - 10:30 PM daily", address: "18999 County Road 306, Buena Vista, CO 81211" },
  { id: "rt-23", day: 10, name: "Fourmile Creek / CR-375 (overnight)", type: "camping", lat: 38.8971, lng: -106.1295, description: "Back to Day 1 camp spot. Full circle. Free dispersed in San Isabel NF.", duration: "Overnight", highlight: false, mileFromStart: 2170, cost: "Free" },
  // DAY 11 (Wed May 27): Home. Drive ~660 mi, 9.5-10 hrs. Leave 5 AM MDT. Gain 1 hr entering NE.
  { id: "rt-24", day: 11, name: "Drive home: Buena Vista → Bellevue", type: "town", lat: 41.1544, lng: -95.9146, description: "US-24 E → I-70 E → I-76 E → I-80 E → home. Leave 5 AM MDT. GAIN 1 hour entering Nebraska. Arrive ~5 PM CDT.", duration: "9.5-10 hrs", highlight: false, mileFromStart: 2830 },
];

export const GROCERY_STOPS: GroceryStop[] = [
  { id: "g1", name: "Safeway", town: "Flagstaff", lat: 35.2010, lng: -111.6310, type: "full", notes: "Full grocery. Best selection before the canyon." },
  { id: "g2", name: "Walmart Supercenter", town: "Flagstaff", lat: 35.2115, lng: -111.5985, type: "full", notes: "Cheapest option. Camping supplies too." },
  { id: "g3", name: "Natural Grocers", town: "Flagstaff", lat: 35.1950, lng: -111.6480, type: "full", notes: "Organic/health food. Good trail mix and bars." },
  { id: "g4", name: "City Market", town: "Cortez", lat: 37.3489, lng: -108.5859, type: "full", notes: "Last full grocery before Navajo Nation. Gas up here too." },
  { id: "g5", name: "General Store", town: "Tusayan", lat: 35.9745, lng: -112.1450, type: "limited", notes: "Limited and expensive. Last chance before park." },
];

export const PERMIT_INFO = {
  type: "Backcountry Camping Permit", campground: "Bright Angel Campground",
  entryDate: "May 21, 2026", exitDate: "May 22, 2026", cost: "$25", source: "recreation.gov",
  checkIn: "Self-register at trailhead (no office visit needed for corridor camping)",
  rules: ["Camp only in designated sites", "Pack in / pack out all trash", "No fires — stoves only", "Store food in ammo cans or on pack poles", "Quiet hours 10 PM - 6 AM", "Permit must be carried at all times"],
};

export const PARKING_INFO = {
  location: "Backcountry Information Center Lot (Lot D)", address: "Near Bright Angel Trailhead, Grand Canyon Village",
  cost: "Free (with park entry)", overnight: true,
  notes: ["Lot D is closest to Bright Angel Trailhead — your exit point", "Park entry: $35/vehicle (7-day pass)", "No special permit needed for overnight parking with backcountry permit"],
};

export const PHANTOM_RANCH = {
  name: "Phantom Ranch Canteen", distance: "0.3 mi from Bright Angel Campground",
  hours: { breakfast: "5:00 AM & 6:30 AM (reservation required)", canteenWindow: "8:00 AM - 4:00 PM & 8:00 PM - 9:30 PM", dinner: "5:00 PM & 6:30 PM (reservation required)" },
  availableWithoutReservation: ["Lemonade (famous — $5.50)", "Hot chocolate, coffee", "Beer & wine (limit 3/person)", "Snacks, candy bars", "Postcards (mailed by mule!)"],
  tips: ["Canteen opens 8 AM — get there early for lemonade", "Beer limit 3/person — enforced", "Postcards go by mule — unique souvenir", "Dinner reservations likely sold out — bring your own food"],
};

export interface DayHike { id: string; name: string; distance: string; elevChange: string; difficulty: "easy" | "moderate" | "strenuous"; duration: string; description: string; highlights: string[]; }
export const DAY_HIKES: DayHike[] = [
  { id: "dh-1", name: "Rim Trail (Mather Point to Bright Angel Lodge)", distance: "2.8 mi one-way", elevChange: "Minimal", difficulty: "easy", duration: "1-1.5 hrs", description: "Paved rim-top walk with continuous canyon views.", highlights: ["Continuous views", "Paved", "Multiple viewpoints", "Free shuttle back"] },
  { id: "dh-2", name: "South Kaibab to Cedar Ridge", distance: "3 mi RT", elevChange: "1,140 ft", difficulty: "moderate", duration: "2-3 hrs", description: "Descend to Cedar Ridge for 360° views. Classic day hike. Exposed — go early.", highlights: ["Ooh Aah Point", "360° panorama", "See Colorado River", "Toilet at Cedar Ridge"] },
  { id: "dh-3", name: "Bright Angel to 1.5-Mile Resthouse", distance: "3 mi RT", elevChange: "1,131 ft", difficulty: "moderate", duration: "2-3 hrs", description: "Switchbacks with seasonal water and shade. Good rim-to-rim training.", highlights: ["Shaded switchbacks", "Seasonal water", "Tunnel at 0.5 mi"] },
  { id: "dh-4", name: "Shoshone Point Trail", distance: "2 mi RT", elevChange: "Minimal", difficulty: "easy", duration: "45 min", description: "Hidden gem — flat walk to secluded viewpoint. Far fewer crowds.", highlights: ["Secluded viewpoint", "Flat easy walk", "Ponderosa pines"] },
  { id: "dh-5", name: "Hermit Trail to Santa Maria Spring", distance: "5 mi RT", elevChange: "1,680 ft", difficulty: "strenuous", duration: "4-5 hrs", description: "Less-traveled trail with historic stone shelter at the spring.", highlights: ["Far fewer people", "Historic shelter", "Year-round spring"] },
];

export const TRIP_TIMELINE = [
  { date: "May 17", day: "Sun", label: "Drive Day 1", description: "Bellevue → Buena Vista, CO (~10 hrs). Leave 5 AM CDT. Camp at Fourmile Creek." },
  { date: "May 18", day: "Mon", label: "Black Canyon Day", description: "Full morning at Black Canyon NP. Drive to Cortez/Dolores (~5.5 hrs). Camp at Boggy Draw." },
  { date: "May 19", day: "Tue", label: "Drive Day 3", description: "Cortez → Petrified Forest → Meteor Crater → FR 302 (~7 hrs). Gas up in Cortez! AZ is 1 hr behind." },
  { date: "May 20", day: "Wed", label: "Rest & Setup", description: "Explore South Rim, day hike, check gear. Nap at FR 302. Move van to Lot D by 11 PM MST." },
  { date: "May 21", day: "Thu", label: "HIKE DAY 1", description: "Shuttle 12:26 AM → North Kaibab TH 5:13 AM. Hike 15 mi to Bright Angel CG." },
  { date: "May 22", day: "Fri", label: "HIKE DAY 2", description: "Bright Angel Trail out (9.5 mi, 4,380 ft gain). Start at dawn. Recover at FR 302." },
  { date: "May 23", day: "Sat", label: "Chill Day", description: "Sleep in. Explore South Rim at leisure. No driving. Camp at FR 302." },
  { date: "May 24", day: "Sun", label: "Drive to Bryce", description: "Grand Canyon → Bryce (~5.5 hrs). Gain 1 hr entering UT. Sunset rim walk. Camp at Tom's Best Spring." },
  { date: "May 25", day: "Mon", label: "Bryce Day", description: "Full day hiking: Navajo Loop + Queen's Garden, Peek-a-Boo Loop. Camp at Tom's Best Spring." },
  { date: "May 26", day: "Tue", label: "Drive to BV", description: "Bryce → Buena Vista (~8 hrs). Cottonwood Hot Springs. Camp at Fourmile Creek." },
  { date: "May 27", day: "Wed", label: "Home", description: "Buena Vista → Bellevue (~10 hrs). Leave 5 AM MDT. Gain 1 hr entering NE. Home by dinner." },
];


// ═══════════════════════════════════════════════════════════
// BACKUP / ALTERNATIVE DISPERSED CAMPING
// For when you want to push ahead or cut a day short
// ═══════════════════════════════════════════════════════════
export interface BackupCamp {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  betweenStops: string;  // e.g. "Buena Vista → Cortez"
  applicableDays: string; // e.g. "Day 2"
  landManager: string;
  cost: string;
  notes: string;
}

export const BACKUP_CAMPS: BackupCamp[] = [
  // Between Bellevue and Buena Vista (Day 1 — if you want to split the 10-hr drive)
  { id: "bc-1", name: "FR 130 near Leadville", lat: 39.1593, lng: -106.3632, description: "Dispersed camping on Forest Road 130 in San Isabel NF near Leadville. Open spaces surrounded by pine forest. About 2 hrs short of Buena Vista if coming from Denver via I-70.", betweenStops: "Denver → Buena Vista", applicableDays: "Day 1", landManager: "San Isabel National Forest", cost: "Free", notes: "Road generally accessible but can be rutted. No water or trash. High clearance helpful." },
  { id: "bc-2", name: "Twin Lakes View Dispersed", lat: 39.1016, lng: -106.3499, description: "Dispersed camping near Twin Lakes with mountain views. San Isabel NF. Only 30 min north of Buena Vista — good if you arrive late and don't want to search for Fourmile in the dark.", betweenStops: "Denver → Buena Vista", applicableDays: "Day 1", landManager: "San Isabel National Forest", cost: "Free", notes: "Road can be rough after rain. Beautiful lake views. Popular on weekends." },
  // Between Buena Vista and Cortez (Day 2 — if Black Canyon takes longer)
  { id: "bc-3", name: "Uncompahgre Valley BLM near Montrose", lat: 38.416, lng: -107.9892, description: "BLM camping near Montrose, about halfway between Black Canyon and Cortez. Wooded, relatively quiet. Good if you spend too long at Black Canyon and don't want to push to Cortez in the dark.", betweenStops: "Black Canyon → Cortez", applicableDays: "Day 2", landManager: "BLM", cost: "Free", notes: "Access loop is rugged — high clearance recommended. No 4WD needed." },
  { id: "bc-4", name: "Last Dollar Road Dispersed", lat: 38.006, lng: -107.9599, description: "Free primitive camping between Ridgway and Telluride with exceptional mountain views. On the way to Cortez via the scenic route. Stunning at sunset.", betweenStops: "Black Canyon → Cortez", applicableDays: "Day 2", landManager: "Uncompahgre National Forest", cost: "Free", notes: "Seasonal road — check conditions in May. May still have snow at higher elevations." },
  // Between Cortez and FR 302 (Day 3 — if Navajo Nation driving takes longer)
  { id: "bc-5", name: "BLM near Petrified Forest", lat: 34.8404, lng: -110.1877, description: "BLM dispersed camping about 25 mi from Petrified Forest NP. Good quality dirt road, accessible by all vehicles. 14-day limit. If you're running late after Petrified Forest, camp here instead of pushing to FR 302 in the dark.", betweenStops: "Petrified Forest → FR 302", applicableDays: "Day 3", landManager: "BLM", cost: "Free", notes: "Dirt road, open year-round. No amenities." },
  { id: "bc-6", name: "Six Mile Canyon near Gallup", lat: 35.4622, lng: -108.4612, description: "Dispersed camping in Cibola National Forest near Fort Wingate, NM — just off I-40. Ponderosa pines, junipers, and oaks. Roughly halfway between Cortez and Flagstaff. Good bailout if you get a late start or want to split the Navajo Nation drive.", betweenStops: "Cortez → Flagstaff", applicableDays: "Day 3", landManager: "Cibola National Forest", cost: "Free", notes: "Easy to find off I-40. Dirt road, several sites available. Can be muddy after rain." },
  // Between Grand Canyon and Bryce (Day 8 — if you want to stop near Page/Kanab)
  { id: "bc-7", name: "Glen Canyon BLM near Page", lat: 36.9847, lng: -111.5588, description: "BLM dispersed camping minutes from Page, AZ and Lake Powell. Sandy landscape. Great if you want to do Horseshoe Bend in the evening and camp nearby instead of pushing all the way to Bryce.", betweenStops: "Grand Canyon → Bryce", applicableDays: "Day 8", landManager: "BLM", cost: "Free", notes: "Gravel road, 2 mi from pavement. 14-day limit. Unlimited RV length." },
  { id: "bc-8", name: "Paria Contact Station Dispersed", lat: 37.1066, lng: -111.8997, description: "Free dispersed camping near Kanab, UT on BLM land. About 2 hrs short of Bryce. Near the Paria Canyon-Vermilion Cliffs Wilderness. Beautiful red rock country.", betweenStops: "Page → Bryce", applicableDays: "Day 8", landManager: "BLM", cost: "Free", notes: "No amenities. Accessible via dirt road." },
  // Between Bryce and Buena Vista (Day 10 — the long drive home)
  { id: "bc-9", name: "San Rafael Swell (I-70 Exit 131)", lat: 38.8793, lng: -110.6576, description: "BLM dispersed camping in the San Rafael Swell near Green River, UT. Right off I-70. About 3 hrs into the Bryce→BV drive. Good bailout if you want to split the 8-hr drive into two shorter days.", betweenStops: "Bryce → Buena Vista", applicableDays: "Day 10", landManager: "BLM Green River District", cost: "Free", notes: "Primitive conditions. No amenities. Stunning desert landscape." },
  { id: "bc-10", name: "21 Road Dispersed near Grand Junction", lat: 39.2114, lng: -108.6533, description: "BLM dispersed camping near Grand Junction, CO. About 5 hrs from Bryce, 3 hrs from Buena Vista. Good midpoint if you want to do Colorado National Monument in the morning and push to BV after.", betweenStops: "Bryce → Buena Vista", applicableDays: "Day 10", landManager: "BLM", cost: "Free", notes: "Free dispersed on BLM land. Primitive." },
];

// ═══════════════════════════════════════════════════════════
// HORSESHOE BEND (Day 8 stop on the way to Bryce)
// ═══════════════════════════════════════════════════════════
export const HORSESHOE_BEND = {
  name: "Horseshoe Bend",
  lat: 36.8791,
  lng: -111.5104,
  description: "Iconic 1,000-ft drop to the Colorado River's horseshoe-shaped meander. One of the most photographed spots in the Southwest.",
  trail: "1.5 mi round-trip, 15-20 min each way. Paved path with slight descent to the overlook.",
  elevation: "4,300 ft at parking, 4,200 ft at overlook",
  cost: "$10 parking fee",
  hours: "Open sunrise to sunset daily. Best light: morning or late afternoon.",
  parking: "36.8753, -111.5104 — large paved lot off US-89, 5 mi south of Page, AZ.",
  tips: [
    "Go early morning or late afternoon for best light and fewer crowds",
    "No guardrails at the overlook — be careful near the edge",
    "Bring water — exposed walk with no shade",
    "May temps in Page: 80-90°F — it's hot",
    "Right on your route from GC to Bryce (US-89 through Page)",
    "Takes about 45 min total including the walk",
  ],
};
