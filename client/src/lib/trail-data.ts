// Grand Canyon Rim-to-Rim Trail Data
// Elevation profiles from real GPX data, water sources from NPS
// All distances in miles, elevations in feet

export interface TrailPoint {
  dist: number;   // distance from start in miles
  ele: number;    // elevation in feet
  lat: number;
  lng: number;
}

export interface WaterSource {
  id: string;
  name: string;
  trail: "north-kaibab" | "bright-angel" | "south-kaibab";
  dist: number;
  ele: number;
  lat: number;
  lng: number;
  type: "spigot" | "creek" | "spring" | "seasonal";
  reliable: boolean;
  seasonal: string;
  lastBeforeDry: boolean;
  distToNext: number;
  note: string;
}

export interface Waypoint {
  id: string;
  name: string;
  trail: "north-kaibab" | "bright-angel" | "south-kaibab";
  dist: number;
  ele: number;
  lat: number;
  lng: number;
  type: "trailhead" | "rest-area" | "campground" | "junction" | "viewpoint" | "landmark";
  facilities: string[];
  description: string;
}

export interface Hazard {
  id: string;
  trail: "north-kaibab" | "bright-angel" | "south-kaibab";
  distStart: number;
  distEnd: number;
  latStart: number;
  lngStart: number;
  latEnd: number;
  lngEnd: number;
  type: "heat" | "exposure" | "steep" | "rockfall" | "no-water" | "narrow";
  severity: "caution" | "warning" | "danger";
  title: string;
  description: string;
}

export interface Trail {
  id: string;
  name: string;
  color: string;
  distance: number;
  elevGain: number;
  elevLoss: number;
  startEle: number;
  endEle: number;
  direction: "descent" | "ascent";
  points: TrailPoint[];
}

// ═══════════════════════════════════════════════════════════
// NORTH KAIBAB TRAIL — Day 1 Descent (15 mi, ~5770 ft loss)
// From real GPX: North Kaibab TH → Bright Angel Campground
// ═══════════════════════════════════════════════════════════
const NORTH_KAIBAB_POINTS: TrailPoint[] = [
  { dist: 0, ele: 8340, lat: 36.211498, lng: -112.057686 },
  { dist: 0.37, ele: 8392, lat: 36.21545, lng: -112.060235 },
  { dist: 0.57, ele: 8323, lat: 36.216503, lng: -112.057908 },
  { dist: 0.78, ele: 8163, lat: 36.214942, lng: -112.056649 },
  { dist: 0.97, ele: 8035, lat: 36.215259, lng: -112.055527 },
  { dist: 1.14, ele: 7877, lat: 36.215705, lng: -112.053956 },
  { dist: 1.28, ele: 7736, lat: 36.21537, lng: -112.053101 },
  { dist: 1.44, ele: 7582, lat: 36.214389, lng: -112.053185 },
  { dist: 1.58, ele: 7523, lat: 36.214408, lng: -112.052674 },
  { dist: 1.74, ele: 7359, lat: 36.213668, lng: -112.052643 },
  { dist: 1.93, ele: 7182, lat: 36.211883, lng: -112.051522 },
  { dist: 2.08, ele: 7077, lat: 36.212081, lng: -112.050881 },
  { dist: 2.25, ele: 7028, lat: 36.211639, lng: -112.050087 },
  { dist: 2.42, ele: 6913, lat: 36.210857, lng: -112.047982 },
  { dist: 2.55, ele: 6791, lat: 36.210781, lng: -112.048737 },
  { dist: 2.68, ele: 6745, lat: 36.210346, lng: -112.048028 },
  { dist: 2.88, ele: 6486, lat: 36.209445, lng: -112.048127 },
  { dist: 3.07, ele: 6230, lat: 36.207843, lng: -112.046334 },
  { dist: 3.25, ele: 6138, lat: 36.206375, lng: -112.046456 },
  { dist: 3.41, ele: 6191, lat: 36.205047, lng: -112.046143 },
  { dist: 3.53, ele: 5988, lat: 36.204582, lng: -112.045044 },
  { dist: 3.71, ele: 6181, lat: 36.202484, lng: -112.043992 },
  { dist: 3.89, ele: 5679, lat: 36.200847, lng: -112.042023 },
  { dist: 4.07, ele: 5830, lat: 36.198818, lng: -112.042061 },
  { dist: 4.25, ele: 5561, lat: 36.197467, lng: -112.041039 },
  { dist: 4.44, ele: 5594, lat: 36.19548, lng: -112.040215 },
  { dist: 4.66, ele: 5374, lat: 36.193668, lng: -112.037827 },
  { dist: 4.88, ele: 5217, lat: 36.192276, lng: -112.034989 },
  { dist: 5.07, ele: 5062, lat: 36.192531, lng: -112.034066 },
  { dist: 5.37, ele: 4741, lat: 36.189296, lng: -112.032174 },
  { dist: 5.56, ele: 4636, lat: 36.187385, lng: -112.032403 },
  { dist: 5.8, ele: 4541, lat: 36.184333, lng: -112.031922 },
  { dist: 6.01, ele: 4462, lat: 36.183635, lng: -112.034577 },
  { dist: 6.35, ele: 4367, lat: 36.179023, lng: -112.03415 },
  { dist: 6.61, ele: 4314, lat: 36.176307, lng: -112.037056 },
  { dist: 6.91, ele: 4193, lat: 36.172481, lng: -112.038735 },
  { dist: 7.24, ele: 4104, lat: 36.168975, lng: -112.042489 },
  { dist: 7.44, ele: 4045, lat: 36.16761, lng: -112.045029 },
  { dist: 7.6, ele: 4003, lat: 36.16592, lng: -112.04535 },
  { dist: 7.82, ele: 3950, lat: 36.163299, lng: -112.046975 },
  { dist: 8.17, ele: 3776, lat: 36.159877, lng: -112.051255 },
  { dist: 8.33, ele: 3881, lat: 36.158386, lng: -112.05201 },
  { dist: 8.51, ele: 3793, lat: 36.156681, lng: -112.053551 },
  { dist: 8.87, ele: 3642, lat: 36.152606, lng: -112.056565 },
  { dist: 9.24, ele: 3547, lat: 36.149116, lng: -112.06115 },
  { dist: 9.66, ele: 3435, lat: 36.143791, lng: -112.06424 },
  { dist: 10.03, ele: 3412, lat: 36.139537, lng: -112.066094 },
  { dist: 10.25, ele: 3346, lat: 36.138317, lng: -112.068787 },
  { dist: 10.51, ele: 3376, lat: 36.136207, lng: -112.071793 },
  { dist: 10.72, ele: 3383, lat: 36.13388, lng: -112.07235 },
  { dist: 10.97, ele: 3373, lat: 36.131683, lng: -112.075257 },
  { dist: 11.17, ele: 3255, lat: 36.129352, lng: -112.076806 },
  { dist: 11.36, ele: 3074, lat: 36.127418, lng: -112.076272 },
  { dist: 11.55, ele: 3235, lat: 36.125545, lng: -112.076111 },
  { dist: 11.73, ele: 3127, lat: 36.125358, lng: -112.078621 },
  { dist: 11.99, ele: 3153, lat: 36.122032, lng: -112.080102 },
  { dist: 12.19, ele: 3025, lat: 36.120456, lng: -112.082154 },
  { dist: 12.37, ele: 2972, lat: 36.119693, lng: -112.083321 },
  { dist: 12.57, ele: 3212, lat: 36.117496, lng: -112.084092 },
  { dist: 12.73, ele: 2907, lat: 36.1184, lng: -112.085953 },
  { dist: 12.95, ele: 3018, lat: 36.115943, lng: -112.087075 },
  { dist: 13.12, ele: 2907, lat: 36.114288, lng: -112.086281 },
  { dist: 13.37, ele: 2936, lat: 36.111839, lng: -112.088372 },
  { dist: 13.6, ele: 2713, lat: 36.110717, lng: -112.091446 },
  { dist: 13.91, ele: 2703, lat: 36.107166, lng: -112.093422 },
  { dist: 14.19, ele: 2618, lat: 36.103752, lng: -112.095452 },
  { dist: 14.42, ele: 2615, lat: 36.100605, lng: -112.095116 },
  { dist: 14.59, ele: 2510, lat: 36.098876, lng: -112.094155 },
  { dist: 14.8, ele: 2572, lat: 36.096771, lng: -112.096055 },
  { dist: 15.05, ele: 2569, lat: 36.096691, lng: -112.098694 },
];

// ═══════════════════════════════════════════════════════════
// BRIGHT ANGEL TRAIL — Day 2 Exit Option 1 (9.5 mi ascent)
// From real GPX with Plateau Point pigtail removed, scaled to NPS 9.5 mi
// ═══════════════════════════════════════════════════════════
const BRIGHT_ANGEL_POINTS: TrailPoint[] = [
  { dist: 0.0, ele: 2545, lat: 36.09585, lng: -112.0981 },
  { dist: 0.49, ele: 2474, lat: 36.09864, lng: -112.10205 },
  { dist: 0.77, ele: 2450, lat: 36.09985, lng: -112.10456 },
  { dist: 1.05, ele: 2427, lat: 36.09904, lng: -112.1075 },
  { dist: 1.29, ele: 2423, lat: 36.09845, lng: -112.11 },
  { dist: 1.42, ele: 2525, lat: 36.09751, lng: -112.11069 },
  { dist: 1.62, ele: 2538, lat: 36.0963, lng: -112.1122 },
  { dist: 2.06, ele: 2680, lat: 36.09269, lng: -112.11117 },
  { dist: 2.29, ele: 2775, lat: 36.09065, lng: -112.11152 },
  { dist: 2.61, ele: 2804, lat: 36.08783, lng: -112.11174 },
  { dist: 2.73, ele: 2856, lat: 36.08707, lng: -112.11097 },
  { dist: 2.83, ele: 2996, lat: 36.0872, lng: -112.11198 },
  { dist: 3.03, ele: 3149, lat: 36.08726, lng: -112.1141 },
  { dist: 3.23, ele: 3388, lat: 36.08897, lng: -112.1147 },
  { dist: 3.31, ele: 3362, lat: 36.08907, lng: -112.11561 },
  { dist: 3.65, ele: 3461, lat: 36.0869, lng: -112.11794 },
  { dist: 3.96, ele: 3544, lat: 36.08544, lng: -112.12075 },
  { dist: 4.3, ele: 3607, lat: 36.08355, lng: -112.12355 },
  { dist: 4.72, ele: 3704, lat: 36.0802, lng: -112.12548 },
  { dist: 4.95, ele: 3789, lat: 36.07874, lng: -112.12723 },
  { dist: 5.3, ele: 3848, lat: 36.07616, lng: -112.12908 },
  { dist: 5.57, ele: 3920, lat: 36.07384, lng: -112.12971 },
  { dist: 5.9, ele: 4007, lat: 36.07121, lng: -112.13116 },
  { dist: 6.19, ele: 4093, lat: 36.06939, lng: -112.13305 },
  { dist: 6.51, ele: 4213, lat: 36.06667, lng: -112.13388 },
  { dist: 6.76, ele: 4280, lat: 36.06649, lng: -112.13661 },
  { dist: 6.86, ele: 4366, lat: 36.06586, lng: -112.13728 },
  { dist: 6.92, ele: 4470, lat: 36.06538, lng: -112.13739 },
  { dist: 6.96, ele: 4527, lat: 36.06513, lng: -112.13718 },
  { dist: 7.01, ele: 4668, lat: 36.06467, lng: -112.13695 },
  { dist: 7.11, ele: 4783, lat: 36.06432, lng: -112.13797 },
  { dist: 7.19, ele: 4898, lat: 36.06382, lng: -112.13846 },
  { dist: 7.34, ele: 4991, lat: 36.06301, lng: -112.13983 },
  { dist: 7.46, ele: 5142, lat: 36.06231, lng: -112.14068 },
  { dist: 7.53, ele: 5269, lat: 36.06182, lng: -112.14122 },
  { dist: 7.68, ele: 5532, lat: 36.06118, lng: -112.1426 },
  { dist: 7.98, ele: 5443, lat: 36.06122, lng: -112.1395 },
  { dist: 8.03, ele: 5594, lat: 36.0608, lng: -112.13973 },
  { dist: 8.35, ele: 5751, lat: 36.05985, lng: -112.14286 },
  { dist: 8.46, ele: 5878, lat: 36.05984, lng: -112.14417 },
  { dist: 8.51, ele: 6003, lat: 36.05941, lng: -112.14454 },
  { dist: 8.56, ele: 6038, lat: 36.05919, lng: -112.14421 },
  { dist: 8.7, ele: 6394, lat: 36.05809, lng: -112.14477 },
  { dist: 8.88, ele: 6705, lat: 36.05832, lng: -112.14676 },
  { dist: 9.03, ele: 6477, lat: 36.05782, lng: -112.14536 },
  { dist: 9.25, ele: 6637, lat: 36.05795, lng: -112.14294 },
  { dist: 9.33, ele: 6723, lat: 36.05792, lng: -112.14211 },
  { dist: 9.5, ele: 6854, lat: 36.05677, lng: -112.14116 },
];

// ═══════════════════════════════════════════════════════════
// SOUTH KAIBAB TRAIL — Day 2 Exit Option 2 (~7.1 mi ascent)
// From real GPX: Bright Angel CG → South Kaibab Trailhead
// ═══════════════════════════════════════════════════════════
const SOUTH_KAIBAB_POINTS: TrailPoint[] = [
  { dist: 0, ele: 2545, lat: 36.09585, lng: -112.0981 },
  { dist: 0.13, ele: 2435, lat: 36.09662, lng: -112.09686 },
  { dist: 0.36, ele: 2488, lat: 36.09853, lng: -112.09434 },
  { dist: 0.51, ele: 2605, lat: 36.09995, lng: -112.09453 },
  { dist: 0.73, ele: 2513, lat: 36.10126, lng: -112.09553 },
  { dist: 0.93, ele: 2580, lat: 36.10004, lng: -112.09289 },
  { dist: 1.11, ele: 2619, lat: 36.10146, lng: -112.0904 },
  { dist: 1.28, ele: 2559, lat: 36.09986, lng: -112.08855 },
  { dist: 1.36, ele: 2575, lat: 36.09939, lng: -112.0885 },
  { dist: 1.44, ele: 2567, lat: 36.09934, lng: -112.08875 },
  { dist: 1.52, ele: 2662, lat: 36.09897, lng: -112.0889 },
  { dist: 1.66, ele: 2859, lat: 36.09877, lng: -112.0871 },
  { dist: 1.76, ele: 2940, lat: 36.09762, lng: -112.08733 },
  { dist: 1.85, ele: 3025, lat: 36.09728, lng: -112.08702 },
  { dist: 1.98, ele: 3167, lat: 36.09654, lng: -112.08781 },
  { dist: 2.09, ele: 3210, lat: 36.0968, lng: -112.0862 },
  { dist: 2.27, ele: 3354, lat: 36.09502, lng: -112.08764 },
  { dist: 2.44, ele: 3528, lat: 36.09545, lng: -112.0899 },
  { dist: 2.61, ele: 3724, lat: 36.09411, lng: -112.08998 },
  { dist: 2.77, ele: 3754, lat: 36.0924, lng: -112.08853 },
  { dist: 2.9, ele: 3579, lat: 36.09194, lng: -112.0903 },
  { dist: 3.04, ele: 3985, lat: 36.09054, lng: -112.08913 },
  { dist: 3.22, ele: 4087, lat: 36.08816, lng: -112.08823 },
  { dist: 3.34, ele: 4217, lat: 36.087, lng: -112.0873 },
  { dist: 3.48, ele: 4264, lat: 36.08551, lng: -112.08657 },
  { dist: 3.61, ele: 4295, lat: 36.08417, lng: -112.08521 },
  { dist: 3.77, ele: 4610, lat: 36.08225, lng: -112.08539 },
  { dist: 3.88, ele: 4692, lat: 36.08144, lng: -112.08675 },
  { dist: 4.0, ele: 5000, lat: 36.0819, lng: -112.08744 },
  { dist: 4.12, ele: 5107, lat: 36.08209, lng: -112.08793 },
  { dist: 4.19, ele: 5088, lat: 36.08197, lng: -112.08883 },
  { dist: 4.29, ele: 5036, lat: 36.08157, lng: -112.08963 },
  { dist: 4.38, ele: 5026, lat: 36.08159, lng: -112.08998 },
  { dist: 4.56, ele: 5244, lat: 36.07928, lng: -112.09112 },
  { dist: 5.01, ele: 5309, lat: 36.07335, lng: -112.09087 },
  { dist: 5.2, ele: 5475, lat: 36.07162, lng: -112.08849 },
  { dist: 5.41, ele: 5650, lat: 36.06906, lng: -112.08977 },
  { dist: 5.53, ele: 5742, lat: 36.06824, lng: -112.09089 },
  { dist: 5.72, ele: 5840, lat: 36.06562, lng: -112.09025 },
  { dist: 5.91, ele: 6062, lat: 36.06375, lng: -112.08942 },
  { dist: 6.0, ele: 6133, lat: 36.06308, lng: -112.0891 },
  { dist: 6.14, ele: 6184, lat: 36.06284, lng: -112.08864 },
  { dist: 6.25, ele: 6315, lat: 36.0618, lng: -112.08796 },
  { dist: 6.41, ele: 6638, lat: 36.06083, lng: -112.08642 },
  { dist: 6.56, ele: 6867, lat: 36.05918, lng: -112.0853 },
  { dist: 6.68, ele: 6704, lat: 36.05771, lng: -112.08492 },
  { dist: 6.83, ele: 6891, lat: 36.05583, lng: -112.08399 },
  { dist: 6.96, ele: 6909, lat: 36.05404, lng: -112.0839 },
  { dist: 7.02, ele: 7004, lat: 36.05372, lng: -112.08384 },
  { dist: 7.13, ele: 7197, lat: 36.05287, lng: -112.08383 },
];

// ═══════════════════════════════════════════════════════════
// WATER SOURCES
// ═══════════════════════════════════════════════════════════
export const WATER_SOURCES: WaterSource[] = [
  // North Kaibab (distances from trailhead descending) — positions from GPX
  { id: "nk-w1", name: "Supai Tunnel Spigot", trail: "north-kaibab", dist: 1.74, ele: 7359, lat: 36.213668, lng: -112.052643, type: "spigot", reliable: true, seasonal: "On mid-May to mid-Oct", lastBeforeDry: false, distToNext: 2.9, note: "Reliable spigot at rest area. Fill up — next water is Roaring Springs (3 mi)." },
  { id: "nk-w2", name: "Roaring Springs", trail: "north-kaibab", dist: 4.66, ele: 5374, lat: 36.193668, lng: -112.037827, type: "spring", reliable: true, seasonal: "Year-round flow", lastBeforeDry: false, distToNext: 0.7, note: "Massive spring from cliff face. 20-min detour off main trail. Reliable year-round." },
  { id: "nk-w3", name: "Manzanita Rest Area", trail: "north-kaibab", dist: 5.37, ele: 4741, lat: 36.189296, lng: -112.032174, type: "spigot", reliable: true, seasonal: "On mid-May to mid-Oct", lastBeforeDry: false, distToNext: 1.5, note: "Spigot at rest area with shade. Emergency phone available." },
  { id: "nk-w4", name: "Cottonwood Campground", trail: "north-kaibab", dist: 6.91, ele: 4193, lat: 36.172481, lng: -112.038735, type: "spigot", reliable: true, seasonal: "On mid-May to mid-Oct", lastBeforeDry: false, distToNext: 1.6, note: "Campground spigots. Good extended break spot. Shade and toilets." },
  { id: "nk-w5", name: "Bright Angel Creek", trail: "north-kaibab", dist: 8.51, ele: 3793, lat: 36.156681, lng: -112.053551, type: "creek", reliable: true, seasonal: "Year-round", lastBeforeDry: false, distToNext: 6.5, note: "Trail follows creek from here to bottom. Filter required but always flowing." },
  { id: "nk-w6", name: "Bright Angel CG", trail: "north-kaibab", dist: 15.05, ele: 2569, lat: 36.096691, lng: -112.098694, type: "spigot", reliable: true, seasonal: "Year-round", lastBeforeDry: false, distToNext: 0, note: "Treated water spigots at campground. Your destination." },
  // Bright Angel Trail (distances from BA CG ascending) — positions from GPX
  { id: "ba-w1", name: "Bright Angel CG Spigots", trail: "bright-angel", dist: 0, ele: 2545, lat: 36.09585, lng: -112.0981, type: "spigot", reliable: true, seasonal: "Year-round", lastBeforeDry: false, distToNext: 1.55, note: "Fill up before starting ascent. Treated water." },
  { id: "ba-w2", name: "River Resthouse", trail: "bright-angel", dist: 1.5, ele: 2680, lat: 36.09269, lng: -112.11117, type: "spigot", reliable: true, seasonal: "Year-round", lastBeforeDry: false, distToNext: 3.5, note: "Last guaranteed water before the long climb to Havasupai Gardens." },
  { id: "ba-w3", name: "Havasupai Gardens", trail: "bright-angel", dist: 4.95, ele: 3789, lat: 36.07874, lng: -112.12723, type: "spigot", reliable: true, seasonal: "Year-round", lastBeforeDry: false, distToNext: 2.0, note: "Major rest stop. Shade, toilets, ranger station. Crucial refill point." },
  { id: "ba-w4", name: "Three-Mile Resthouse", trail: "bright-angel", dist: 6.96, ele: 4527, lat: 36.06513, lng: -112.13718, type: "spigot", reliable: true, seasonal: "On mid-May to mid-Oct", lastBeforeDry: false, distToNext: 1.0, note: "Seasonal water. Should be on in late May. Shaded rest area." },
  { id: "ba-w5", name: "1.5-Mile Resthouse", trail: "bright-angel", dist: 8.03, ele: 5594, lat: 36.0608, lng: -112.13973, type: "spigot", reliable: true, seasonal: "On mid-May to mid-Oct", lastBeforeDry: true, distToNext: 1.5, note: "Last water before the rim. 1.5 mi to go. Should be on in late May." },
  // South Kaibab - NO WATER
  { id: "sk-w1", name: "Bright Angel CG (start)", trail: "south-kaibab", dist: 0, ele: 2545, lat: 36.09585, lng: -112.0981, type: "spigot", reliable: true, seasonal: "Year-round", lastBeforeDry: true, distToNext: 7.13, note: "⚠️ LAST WATER. There is NO water on the entire South Kaibab Trail. Carry all you need for 7 mi and 4,650 ft of climbing." },
];

// ═══════════════════════════════════════════════════════════
// WAYPOINTS
// ═══════════════════════════════════════════════════════════
export const WAYPOINTS: Waypoint[] = [
  // North Kaibab — positions from GPX
  { id: "nk-1", name: "North Kaibab Trailhead", trail: "north-kaibab", dist: 0, ele: 8340, lat: 36.211498, lng: -112.057686, type: "trailhead", facilities: ["parking", "toilet", "trail-register"], description: "Starting point. Shuttle drops you here. Signed trailhead with info kiosk." },
  { id: "nk-2", name: "Supai Tunnel", trail: "north-kaibab", dist: 1.74, ele: 7359, lat: 36.213668, lng: -112.052643, type: "rest-area", facilities: ["water", "toilet", "shade"], description: "Rest area in a natural tunnel. Good first break. Seasonal water spigot." },
  { id: "nk-3", name: "Roaring Springs", trail: "north-kaibab", dist: 4.66, ele: 5374, lat: 36.193668, lng: -112.037827, type: "landmark", facilities: ["water"], description: "Spectacular spring bursting from cliff. 20-min side trip. Provides water for both rims." },
  { id: "nk-4", name: "Manzanita Rest Area", trail: "north-kaibab", dist: 5.37, ele: 4741, lat: 36.189296, lng: -112.032174, type: "rest-area", facilities: ["water", "toilet", "emergency-phone", "shade"], description: "Shaded rest area with emergency phone. Good lunch spot." },
  { id: "nk-5", name: "Cottonwood Campground", trail: "north-kaibab", dist: 6.91, ele: 4193, lat: 36.172481, lng: -112.038735, type: "campground", facilities: ["water", "toilet", "camping", "shade"], description: "Campground in cottonwood grove. Roughly halfway. Seasonal ranger." },
  { id: "nk-6", name: "Ribbon Falls Junction", trail: "north-kaibab", dist: 8.51, ele: 3793, lat: 36.156681, lng: -112.053551, type: "landmark", facilities: [], description: "Bridge removed due to damage. Stay on North Kaibab Trail." },
  { id: "nk-7", name: "Phantom Ranch", trail: "north-kaibab", dist: 13.6, ele: 2713, lat: 36.110717, lng: -112.091446, type: "landmark", facilities: ["water", "toilet", "food", "phone"], description: "Historic ranch. Canteen sells lemonade, snacks, beer (8AM-4PM window)." },
  { id: "nk-8", name: "Bright Angel Campground", trail: "north-kaibab", dist: 15.05, ele: 2569, lat: 36.096691, lng: -112.098694, type: "campground", facilities: ["water", "toilet", "camping", "ranger-station"], description: "Your camp. 33 sites, cottonwood shade, flush toilets, treated water." },
  // Bright Angel — positions from GPX
  { id: "ba-1", name: "River Resthouse", trail: "bright-angel", dist: 1.5, ele: 2680, lat: 36.09269, lng: -112.11117, type: "rest-area", facilities: ["water", "toilet"], description: "Rest area near the Colorado River crossing." },
  { id: "ba-2", name: "Havasupai Gardens", trail: "bright-angel", dist: 4.95, ele: 3789, lat: 36.07874, lng: -112.12723, type: "rest-area", facilities: ["water", "toilet", "ranger-station", "shade"], description: "Major oasis. Year-round water, ranger station. Rest before the final 4.5 mi climb." },
  { id: "ba-3", name: "Three-Mile Resthouse", trail: "bright-angel", dist: 6.96, ele: 4527, lat: 36.06513, lng: -112.13718, type: "rest-area", facilities: ["water", "toilet", "shade"], description: "Covered rest area. ~2.5 mi from the rim. Seasonal water." },
  { id: "ba-4", name: "1.5-Mile Resthouse", trail: "bright-angel", dist: 8.03, ele: 5594, lat: 36.0608, lng: -112.13973, type: "rest-area", facilities: ["water", "toilet", "shade"], description: "Final rest stop. ~1.5 mi to the rim. Last water." },
  { id: "ba-5", name: "Bright Angel Trailhead", trail: "bright-angel", dist: 9.5, ele: 6854, lat: 36.05677, lng: -112.14116, type: "trailhead", facilities: ["water", "toilet", "parking", "shuttle"], description: "South Rim! Near Kolb Studio and Bright Angel Lodge." },
  // South Kaibab — positions from GPX
  { id: "sk-1", name: "Tip Off", trail: "south-kaibab", dist: 2.6, ele: 3724, lat: 36.09411, lng: -112.08998, type: "junction", facilities: ["toilet", "emergency-phone"], description: "Tonto Trail junction. Emergency phone. Last toilet until rim." },
  { id: "sk-2", name: "Skeleton Point", trail: "south-kaibab", dist: 4.0, ele: 5000, lat: 36.0819, lng: -112.08744, type: "viewpoint", facilities: [], description: "Dramatic viewpoint. Can see the Colorado River. Exposed — no shade." },
  { id: "sk-3", name: "Cedar Ridge", trail: "south-kaibab", dist: 5.72, ele: 5840, lat: 36.06562, lng: -112.09025, type: "viewpoint", facilities: ["toilet"], description: "Broad flat area with panoramic views. Toilet available. ~1.4 mi to rim." },
  { id: "sk-4", name: "South Kaibab Trailhead", trail: "south-kaibab", dist: 7.13, ele: 7197, lat: 36.05287, lng: -112.08383, type: "trailhead", facilities: ["toilet", "shuttle"], description: "South Rim! Take Kaibab Rim (Orange) shuttle back to village. No private vehicle access." },
];

// ═══════════════════════════════════════════════════════════
// HAZARDS
// ═══════════════════════════════════════════════════════════
export const HAZARDS: Hazard[] = [
  // North Kaibab — coordinates verified from GPX
  { id: "h1", trail: "north-kaibab", distStart: 0, distEnd: 1.74, latStart: 36.211498, lngStart: -112.057686, latEnd: 36.213668, lngEnd: -112.052643, type: "steep", severity: "caution", title: "Steep Switchbacks", description: "~1,500 ft descent in 1.7 mi. Loose gravel on switchbacks. Trekking poles recommended." },
  { id: "h2", trail: "north-kaibab", distStart: 8.51, distEnd: 8.51, latStart: 36.156681, lngStart: -112.053551, latEnd: 36.156681, lngEnd: -112.053551, type: "narrow", severity: "warning", title: "Ribbon Falls Bridge Removed", description: "Bridge removed due to damage. Stay on the North Kaibab Trail. Do not attempt to cross." },
  { id: "h3", trail: "north-kaibab", distStart: 10.03, distEnd: 15.05, latStart: 36.139537, lngStart: -112.066094, latEnd: 36.096691, lngEnd: -112.098694, type: "heat", severity: "warning", title: "Inner Gorge Heat", description: "Temperatures 20-30°F hotter than the rim. Can exceed 100°F in May. Carry extra water." },
  // Bright Angel — coordinates verified from GPX
  { id: "h4", trail: "bright-angel", distStart: 0, distEnd: 2.06, latStart: 36.09585, lngStart: -112.0981, latEnd: 36.09269, lngEnd: -112.11117, type: "heat", severity: "warning", title: "Box Canyon Heat Trap", description: "Narrow canyon walls trap heat. Start before 6 AM to avoid worst heat on the climb out." },
  { id: "h5", trail: "bright-angel", distStart: 4.95, distEnd: 9.5, latStart: 36.07874, lngStart: -112.12723, latEnd: 36.05677, lngEnd: -112.14116, type: "exposure", severity: "caution", title: "Sun Exposure Above Havasupai Gardens", description: "Limited shade above Havasupai Gardens. Afternoon sun is brutal. Start early." },
  // South Kaibab — coordinates verified from GPX
  { id: "h6", trail: "south-kaibab", distStart: 0, distEnd: 7.13, latStart: 36.09585, lngStart: -112.0981, latEnd: 36.05287, lngEnd: -112.08383, type: "no-water", severity: "danger", title: "NO WATER — Entire Trail", description: "Zero water on the South Kaibab Trail. Carry ALL water for 7 mi and 4,650 ft of climbing. Minimum 3-4 liters." },
  { id: "h7", trail: "south-kaibab", distStart: 0, distEnd: 7.13, latStart: 36.09585, lngStart: -112.0981, latEnd: 36.05287, lngEnd: -112.08383, type: "exposure", severity: "warning", title: "Fully Exposed Ridge", description: "Trail follows an exposed ridge with no shade. Zero escape from sun. Start at first light." },
  { id: "h8", trail: "south-kaibab", distStart: 0, distEnd: 4.0, latStart: 36.09585, lngStart: -112.0981, latEnd: 36.0819, lngEnd: -112.08744, type: "steep", severity: "caution", title: "Steep Sustained Climb", description: "Steeper grade than Bright Angel. ~660 ft/mi average. Relentless switchbacks." },
];

// ═══════════════════════════════════════════════════════════
// TRAIL DEFINITIONS
// ═══════════════════════════════════════════════════════════
export const TRAILS: Trail[] = [
  {
    id: "north-kaibab",
    name: "North Kaibab Trail",
    color: "#f97316",   // orange
    distance: 15.05,
    elevGain: 0,
    elevLoss: 5771,
    startEle: 8340,
    endEle: 2569,
    direction: "descent",
    points: NORTH_KAIBAB_POINTS,
  },
  {
    id: "bright-angel",
    name: "Bright Angel Trail",
    color: "#10b981",   // emerald
    distance: 9.5,
    elevGain: 4309,
    elevLoss: 0,
    startEle: 2545,
    endEle: 6854,
    direction: "ascent",
    points: BRIGHT_ANGEL_POINTS,
  },
  {
    id: "south-kaibab",
    name: "South Kaibab Trail",
    color: "#ef4444",   // red
    distance: 7.13,
    elevGain: 4652,
    elevLoss: 0,
    startEle: 2545,
    endEle: 7197,
    direction: "ascent",
    points: SOUTH_KAIBAB_POINTS,
  },
];

// Trail color map for quick lookup
export const TRAIL_COLORS: Record<string, string> = {
  "north-kaibab": "#f97316",
  "bright-angel": "#10b981",
  "south-kaibab": "#ef4444",
};
