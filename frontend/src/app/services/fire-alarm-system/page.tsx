"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Flame, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck, 
  Bell, 
  Zap, 
  Sparkles, 
  Building2, 
  Home, 
  Factory, 
  HeartPulse, 
  Landmark, 
  Wrench, 
  Headset, 
  HelpCircle, 
  ChevronDown, 
  Phone, 
  Send 
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getMediaUrl } from "@/lib/axios";
import { devicesApi } from "@/services/api/devicesApi";

// Local Public Image Folders for each Fire Alarm Equipment Category
const FIRE_EQUIPMENT_IMAGES: Record<string, string[]> = {
  "Fire Alarm Control Panel": [
    "/images/services/fire-alarm/fire-alarm-control-panel-facp/img-41gyjfrk.jpg",
    "/images/services/fire-alarm/fire-alarm-control-panel-facp/img-5gpw193z.jpg",
    "/images/services/fire-alarm/fire-alarm-control-panel-facp/img-c88ktkga.jpg",
    "/images/services/fire-alarm/fire-alarm-control-panel-facp/img-io8y8i6a.jpg",
    "/images/services/fire-alarm/fire-alarm-control-panel-facp/img-uoyog4st.jpg"
  ],
  "Smoke Detectors": [
    "/images/services/fire-alarm/smoke-detector/img-4soj8cqs.jpg",
    "/images/services/fire-alarm/smoke-detector/img-bhq2vety.jpg",
    "/images/services/fire-alarm/smoke-detector/img-dzobf4pq.jpg",
    "/images/services/fire-alarm/smoke-detector/img-o4ku020g.jpg"
  ],
  "Heat Detectors": [
    "/images/services/fire-alarm/heat-detector/img-empzt0kh.jpg",
    "/images/services/fire-alarm/heat-detector/img-ersyneux.jpg",
    "/images/services/fire-alarm/heat-detector/img-t7w9sjqv.jpg",
    "/images/services/fire-alarm/heat-detector/img-t8o0axlu.jpg",
    "/images/services/fire-alarm/heat-detector/img-yakn9l6m.jpg"
  ],
  "Flame Detectors": [
    "/images/services/fire-alarm/flame-detector/img-0z408d2t.jpg",
    "/images/services/fire-alarm/flame-detector/img-9dwugq0j.jpg",
    "/images/services/fire-alarm/flame-detector/img-ee1f44fq.jpg",
    "/images/services/fire-alarm/flame-detector/img-i3olvw1i.jpg",
    "/images/services/fire-alarm/flame-detector/img-s81idmtv.jpg",
    "/images/services/fire-alarm/flame-detector/img-t8g9ly23.jpg"
  ],
  "Beam Smoke Detector": [
    "/images/services/fire-alarm/beam-smoke-detector/img-66ftinii.jpg",
    "/images/services/fire-alarm/beam-smoke-detector/img-cawgt6ke.jpg",
    "/images/services/fire-alarm/beam-smoke-detector/img-gme3yogg.jpg",
    "/images/services/fire-alarm/beam-smoke-detector/img-i7ovgson.jpg"
  ],
  "Fire Alarm Bell": [
    "/images/services/fire-alarm/fire-alarm-bell/img-47awgded.jpg",
    "/images/services/fire-alarm/fire-alarm-bell/img-9utuguz7.jpg",
    "/images/services/fire-alarm/fire-alarm-bell/img-fzgfv5s3.jpg",
    "/images/services/fire-alarm/fire-alarm-bell/img-nwvpj1cm.jpg",
    "/images/services/fire-alarm/fire-alarm-bell/img-wwfmslxi.jpg"
  ],
  "Fire Alarm Sounder & Strobe": [
    "/images/services/fire-alarm/fire-alarm-sounder-strobe/img-8hrwvuu6.jpg",
    "/images/services/fire-alarm/fire-alarm-sounder-strobe/img-bxc7yxvh.jpg",
    "/images/services/fire-alarm/fire-alarm-sounder-strobe/img-chluzw72.jpg",
    "/images/services/fire-alarm/fire-alarm-sounder-strobe/img-pwwn119m.jpg",
    "/images/services/fire-alarm/fire-alarm-sounder-strobe/img-zdd7y8ke.jpg"
  ],
  "Emergency Exit Signs": [
    "/images/services/fire-alarm/emergency-exit-sign/img-0aryxuoh.jpg",
    "/images/services/fire-alarm/emergency-exit-sign/img-60h93n9j.jpg",
    "/images/services/fire-alarm/emergency-exit-sign/img-s0c1gg3p.jpg",
    "/images/services/fire-alarm/emergency-exit-sign/img-s25ilc45.jpg",
    "/images/services/fire-alarm/emergency-exit-sign/img-uhv504sk.jpg"
  ],
  "Emergency Lights": [
    "/images/services/fire-alarm/emergency-light/img-3i14ar2g.jpg",
    "/images/services/fire-alarm/emergency-light/img-cyxj4mh7.jpg",
    "/images/services/fire-alarm/emergency-light/img-kvmq57qz.jpg",
    "/images/services/fire-alarm/emergency-light/img-lp1ckgxh.jpg",
    "/images/services/fire-alarm/emergency-light/img-x74ms5cw.jpg"
  ],
  "Fire Extinguishers": [
    "/images/services/fire-alarm/fire-extinguisher/img-cd8qwitk.jpg",
    "/images/services/fire-alarm/fire-extinguisher/img-ik5yha5h.jpg",
    "/images/services/fire-alarm/fire-extinguisher/img-tc46gomn.jpg",
    "/images/services/fire-alarm/fire-extinguisher/img-vt197jth.jpg",
    "/images/services/fire-alarm/fire-extinguisher/img-wa4or9me.jpg"
  ],
  "Fire Sprinkler System": [
    "/images/services/fire-alarm/fire-sprinkler-system/img-ehndt9ph.jpg",
    "/images/services/fire-alarm/fire-sprinkler-system/img-eslesg89.jpg",
    "/images/services/fire-alarm/fire-sprinkler-system/img-gybl7tvs.jpg",
    "/images/services/fire-alarm/fire-sprinkler-system/img-jsm7wz2o.jpg",
    "/images/services/fire-alarm/fire-sprinkler-system/img-jxt44wqk.jpg"
  ],
  "Fire Hydrant System": [
    "/images/services/fire-alarm/fire-hydrant-system/img-2ya0vqyi.jpg",
    "/images/services/fire-alarm/fire-hydrant-system/img-gpw6n0xl.jpg",
    "/images/services/fire-alarm/fire-hydrant-system/img-i57z0cn5.jpg",
    "/images/services/fire-alarm/fire-hydrant-system/img-n4ui3wde.jpg",
    "/images/services/fire-alarm/fire-hydrant-system/img-nzao6ejw.jpg"
  ],
  "Hose Reel System": [
    "/images/services/fire-alarm/fire-hose-reel/img-ac9cs52h.jpg",
    "/images/services/fire-alarm/fire-hose-reel/img-ctwn12tm.jpg",
    "/images/services/fire-alarm/fire-hose-reel/img-f600vdcq.jpg",
    "/images/services/fire-alarm/fire-hose-reel/img-jxg2uym7.jpg",
    "/images/services/fire-alarm/fire-hose-reel/img-ylaq3ozo.jpg"
  ],
  "FM-200 System": [
    "/images/services/fire-alarm/fm-200-fire-suppression-system/img-8emira6q.jpg",
    "/images/services/fire-alarm/fm-200-fire-suppression-system/img-k2nr9vht.jpg",
    "/images/services/fire-alarm/fm-200-fire-suppression-system/img-k64ize9f.jpg",
    "/images/services/fire-alarm/fm-200-fire-suppression-system/img-o4pl3ju1.jpg",
    "/images/services/fire-alarm/fm-200-fire-suppression-system/img-pehbfomp.jpg"
  ]
};

// Automatic Photo Slider Component for Equipment Cards
function EquipmentCardSlider({ images, cardIndex, categoryTitle }: { images: string[]; cardIndex: number; categoryTitle: string }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (current >= (images?.length || 0)) {
      setCurrent(0);
    }
  }, [images, current]);

  useEffect(() => {
    if (isPaused || !images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, images?.length]);

  if (!images || images.length === 0) return null;

  const safeIndex = current < images.length ? current : 0;

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[340px] md:h-full min-h-[340px] overflow-hidden bg-white border-b border-slate-100 md:border-b-0 md:border-r border-slate-200 group/slider"
    >
      <AnimatePresence mode="wait">
        <motion.img 
          key={safeIndex}
          src={getMediaUrl(images[safeIndex])} 
          alt={`${categoryTitle} - Photo ${safeIndex + 1}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-contain object-center absolute inset-0 p-6 z-10" 
        />
      </AnimatePresence>

      {/* Prev / Next Control Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-[#0284C7] text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-[#0284C7] text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      <div className="absolute bottom-3 right-4 z-30 flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              safeIndex === idx ? "w-6 bg-[#38BDF8]" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Card Index Badge */}
      <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bebas text-lg text-[#0284C7] font-bold shadow-md border-2 border-sky-200">
        {cardIndex + 1}
      </div>

      <div className="absolute bottom-3 left-4 z-20 text-xs text-slate-800 font-inter bg-white/90 backdrop-blur-md border border-sky-200 px-3 py-1 rounded-md shadow-sm font-semibold">
        {categoryTitle} • {safeIndex + 1} / {images.length}
      </div>
    </div>
  );
}

// Fire Safety Technologies & Protocols
const FIRE_TECHNOLOGIES = [
  "Addressable Fire Loop Wiring",
  "Conventional Zone Signaling",
  "Photoelectric Smoke Sensing",
  "Rate-of-Rise Heat Sensing",
  "UV/IR Optical Flame Sensing",
  "Infrared Beam Smoke Detection",
  "FM-200 Clean Gas Suppression",
  "Dry & Wet Pipe Sprinkler Systems",
  "Pressurized Fire Hydrant Ring",
  "Emergency Dialer Integration"
];

// Intelligent Fire Safety & Smart Alerting Features
const FIRE_SMART_FEATURES = [
  "Pinpoint Sensor Addressing",
  "Multi-Sensor Smoke & Heat Fusion",
  "False Alarm Suppression Logic",
  "Auto-Strobe & Siren Sync",
  "HVAC Emergency Shutoff Control",
  "Elevator Auto-Recall Integration",
  "Gas Suppression Release Delay",
  "24/7 Battery Backup Supervision",
  "Central Monitoring Station Relay",
  "Smart Phone Push Alerts"
];

// 1. Key Benefits
const KEY_BENEFITS = [
  "Early Smoke & Heat Detection",
  "Central Control Panel Integration",
  "High-Decibel Sirens & Strobes",
  "Automated Emergency Alerting",
  "FM-200 & Clean Agent Suppression",
  "Fire Sprinkler & Hydrant Integration",
  "NFPA & Local Code Compliance",
  "Professional Testing & Commissioning",
  "Annual Maintenance Contracts (AMC)",
  "24×7 Technical Emergency Support"
];

// 2. Comprehensive Fire Alarm & Fire Safety Equipment Hierarchy Data
const FIRE_EQUIPMENT_CATEGORIES = [
  {
    title: "Fire Alarm Control Panel",
    desc: "The central brain of the fire protection system, receiving signals from sensors and activating alarms, sprinklers, and emergency notifications.",
    bestFor: ["Commercial Towers", "Hospitals", "Industrial Facilities", "Hotels"],
    features: ["Addressable & Conventional", "Battery Backup", "LCD Display", "Zone Monitoring", "Emergency Dialer Integration"]
  },
  {
    title: "Smoke Detectors",
    desc: "Optical and ionization sensors that detect combustion particles at the earliest stage to trigger pre-alarm notifications.",
    bestFor: ["Offices", "Bedrooms", "Server Rooms", "Corridors", "Libraries"],
    features: ["Photoelectric Optics", "360° Smoke Entry", "Dust Resistance", "Built-in LED Indicator", "Low Power Consumption"]
  },
  {
    title: "Heat Detectors",
    desc: "Fixed temperature and rate-of-rise thermal sensors ideal for dusty or smoky environments where smoke detectors might false alarm.",
    bestFor: ["Kitchens", "Boiler Rooms", "Garages", "Manufacturing Plants"],
    features: ["Rate-of-Rise Sensing", "Fixed Temp (57°C - 90°C)", "High Humidity Tolerant", "Vandal Resistant"]
  },
  {
    title: "Flame Detectors",
    desc: "Advanced optical sensors responding to infrared (IR) or ultraviolet (UV) radiation emitted by open flames within milliseconds.",
    bestFor: ["Oil & Gas Refineries", "Chemical Plants", "Fuel Depots", "Aircraft Hangars"],
    features: ["UV/IR Optical Dual Sensor", "Millisecond Trigger Time", "Solar Radiation Blind", "Explosion-Proof Housing"]
  },
  {
    title: "Beam Smoke Detector",
    desc: "Beam smoke detectors project an infrared beam across large open spaces. Smoke interrupting the beam triggers the fire alarm system.",
    bestFor: ["Warehouses", "Atriums", "Shopping Malls", "Aircraft Hangars", "Auditoriums"],
    features: ["Long Detection Range", "Ideal for High Ceilings", "Low Maintenance", "Accurate Detection"]
  },
  {
    title: "Fire Alarm Bell",
    desc: "Fire alarm bells provide a traditional audible warning when the fire alarm system is activated.",
    bestFor: ["School Corridors", "Commercial Buildings", "Industrial Warehouses", "Residential Buildings"],
    features: ["High Sound Output", "Durable Metal Construction", "Reliable Operation"]
  },
  {
    title: "Fire Alarm Sounder & Strobe",
    desc: "Sounders emit loud alarm tones while strobe lights provide visual warnings, ensuring that all occupants—including those with hearing impairments—are alerted during emergencies.",
    bestFor: ["Noisy Factories", "Hospitals", "Public Venues", "Shopping Centers", "Commercial Buildings"],
    features: ["Loud Audible Alarm", "Bright LED Flash", "Indoor & Outdoor Models", "Low Power Consumption"]
  },
  {
    title: "Emergency Exit Signs",
    desc: "Illuminated photoluminescent and battery-backed direction signs marking designated egress paths during power outages.",
    bestFor: ["Stairways", "Corridors", "Fire Doors", "Basement Parking"],
    features: ["LED Edge-Lit", "3-Hour Battery Backup", "Double-Sided Directional", "Energy Efficient"]
  },
  {
    title: "Emergency Lights",
    desc: "Automatic battery-operated backup luminaires providing essential pathway lighting when main electrical power fails.",
    bestFor: ["Escape Routes", "Electrical Rooms", "Control Centers", "Hallways"],
    features: ["Auto-Power Transfer", "Dual Adjustable Heads", "Long-Life Lithium Battery", "Self-Testing Feature"]
  },
  {
    title: "Fire Extinguishers",
    desc: "Portable first-response fire suppression cylinders for Class A, B, C, D, and Electrical fire hazards.",
    bestFor: ["Offices", "Vehicles", "Kitchens", "Electrical Panels"],
    features: ["ABC Dry Powder / CO2 / Clean Agent", "Pressure Gauge", "Discharge Hose", "Wall Mounting Bracket"]
  },
  {
    title: "Fire Sprinkler System",
    desc: "Automated heat-activated water distribution piping system suppressing fires directly over the source.",
    bestFor: ["High-Rise Buildings", "Warehouses", "Shopping Malls", "Hotels"],
    features: ["Glass Bulb Sprinkler Heads", "Wet / Dry Pipe Systems", "Flow Switches", "Alarm Valve Assembly"]
  },
  {
    title: "Fire Hydrant System",
    desc: "Heavy-duty pressurized water ring network and outdoor pillar hydrants supplying water for municipal fire brigades.",
    bestFor: ["Industrial Parks", "Commercial Complexes", "Factories", "Residential Townships"],
    features: ["High Pressure Water Mains", "Landed Valves", "Canvas Hose Pipe & Nozzles", "Diesel & Electric Fire Pumps"]
  },
  {
    title: "Hose Reel System",
    desc: "First-aid manual firefighting water hose reels permanently connected to pressurized water supply.",
    bestFor: ["Building Landing Areas", "Commercial Corridors", "Schools"],
    features: ["30m Rubber Hose Pipe", "Shut-Off Jet Nozzle", "Swivel Drum Mounting", "Red Polyester Coating"]
  },
  {
    title: "FM-200 System",
    desc: "Waterless gaseous fire suppression system discharging within 10 seconds to extinguish fires without damaging electronics.",
    bestFor: ["Data Centers", "Server Rooms", "Telecommunication Hubs", "Control Rooms"],
    features: ["Zero Ozone Depletion", "Fast 10s Discharge", "Electrically Non-Conductive", "No Residue Cleanup"]
  }
];

// 3. Fire Safety Solutions by Industry
const FIRE_INDUSTRIES = [
  { 
    title: "Residential Fire Safety", 
    desc: "Protect homes, villas, apartments, and gated communities with reliable smoke detection and escape route lighting.",
    recommendedEquipment: ["Smoke Detectors", "Fire Extinguishers", "Emergency Lights", "Hose Reel System"],
    images: [
      "/images/services/fire-alarm/smoke-detector/img-4soj8cqs.jpg",
      "/images/services/fire-alarm/fire-extinguisher/img-cd8qwitk.jpg",
      "/images/services/fire-alarm/emergency-light/img-3i14ar2g.jpg"
    ]
  },
  { 
    title: "Commercial Fire Safety", 
    desc: "Protect office buildings, retail malls, IT parks, and hotels with addressable fire alarm panels and sprinkler systems.",
    recommendedEquipment: ["Fire Alarm Control Panel", "Smoke Detectors", "Fire Sprinkler System", "Emergency Exit Signs"],
    images: [
      "/images/services/fire-alarm/fire-alarm-control-panel-facp/img-41gyjfrk.jpg",
      "/images/services/fire-alarm/smoke-detector/img-bhq2vety.jpg",
      "/images/services/fire-alarm/fire-sprinkler-system/img-ehndt9ph.jpg"
    ]
  },
  { 
    title: "Industrial Fire Safety", 
    desc: "Heavy-duty fire detection, flame sensors, deluge systems, and hydrant networks for factories and chemical plants.",
    recommendedEquipment: ["Flame Detectors", "Fire Hydrant System", "Heat Detectors", "Fire Alarm Sounder & Strobe"],
    images: [
      "/images/services/fire-alarm/flame-detector/img-0z408d2t.jpg",
      "/images/services/fire-alarm/fire-hydrant-system/img-2ya0vqyi.jpg",
      "/images/services/fire-alarm/heat-detector/img-empzt0kh.jpg"
    ]
  },
  { 
    title: "Educational Institutions", 
    desc: "Ensure campus safety with centralized fire alarm panels, emergency exit signs, and evacuation sounders.",
    recommendedEquipment: ["Fire Alarm Control Panel", "Emergency Exit Signs", "Fire Alarm Sounder & Strobe", "Fire Extinguishers"],
    images: [
      "/images/services/fire-alarm/fire-alarm-control-panel-facp/img-5gpw193z.jpg",
      "/images/services/fire-alarm/emergency-exit-sign/img-0aryxuoh.jpg",
      "/images/services/fire-alarm/fire-alarm-sounder-strobe/img-8hrwvuu6.jpg"
    ]
  },
  { 
    title: "Healthcare Facilities", 
    desc: "Specialized early warning smoke detection, strobe visual alerts, and clean agent suppression for hospitals and clinics.",
    recommendedEquipment: ["Smoke Detectors", "Fire Alarm Sounder & Strobe", "FM-200 System", "Fire Alarm Control Panel"],
    images: [
      "/images/services/fire-alarm/smoke-detector/img-dzobf4pq.jpg",
      "/images/services/fire-alarm/fire-alarm-sounder-strobe/img-8hrwvuu6.jpg",
      "/images/services/fire-alarm/fm-200-fire-suppression-system/img-8emira6q.jpg"
    ]
  },
  { 
    title: "Hospitality", 
    desc: "Comprehensive fire detection and automated sprinklers for hotels, resorts, and event banquet halls.",
    recommendedEquipment: ["Smoke Detectors", "Fire Sprinkler System", "Emergency Exit Signs", "Fire Alarm Control Panel"],
    images: [
      "/images/services/fire-alarm/smoke-detector/img-o4ku020g.jpg",
      "/images/services/fire-alarm/fire-sprinkler-system/img-eslesg89.jpg",
      "/images/services/fire-alarm/emergency-exit-sign/img-60h93n9j.jpg"
    ]
  },
  { 
    title: "Warehouses & Logistics", 
    desc: "High-ceiling beam smoke detectors, flame sensors, and pressurized fire hydrant networks for logistics centers.",
    recommendedEquipment: ["Beam Smoke Detector", "Fire Hydrant System", "Flame Detectors", "Fire Hose Reel"],
    images: [
      "/images/services/fire-alarm/beam-smoke-detector/img-66ftinii.jpg",
      "/images/services/fire-alarm/fire-hydrant-system/img-gpw6n0xl.jpg",
      "/images/services/fire-alarm/flame-detector/img-9dwugq0j.jpg"
    ]
  },
  { 
    title: "Government & Public", 
    desc: "Code-compliant fire protection installations for public infrastructure, administrative centers, and heritage buildings.",
    recommendedEquipment: ["FM-200 System", "Fire Alarm Control Panel", "Emergency Exit Signs", "Fire Hydrant System"],
    images: [
      "/images/services/fire-alarm/fm-200-fire-suppression-system/img-k2nr9vht.jpg",
      "/images/services/fire-alarm/fire-alarm-control-panel-facp/img-5gpw193z.jpg",
      "/images/services/fire-alarm/emergency-exit-sign/img-0aryxuoh.jpg"
    ]
  }
];

// 4. Core Services Workflow
const CORE_SERVICES = [
  { step: "01", title: "Installation", desc: "Turnkey installation of control panels, detectors, cabling, hydrants, and suppression systems by certified fire safety engineers." },
  { step: "02", title: "Testing & Commissioning", desc: "Rigorous pressure testing, smoke response simulation, panel zoning audits, and official safety certification." },
  { step: "03", title: "Annual Maintenance (AMC)", desc: "Scheduled preventive health checks, battery replacements, sensor calibration, and nozzle inspections to guarantee 100% readiness." },
  { step: "04", title: "24×7 Technical Support", desc: "Round-the-clock emergency technical response team for troubleshooting, false alarm resolution, and urgent repairs." }
];

// 5. FAQ Section
const FAQS = [
  {
    q: "What is the difference between conventional and addressable fire alarm systems?",
    a: "Conventional systems divide a building into broad zones, whereas addressable systems assign a unique digital address to every individual detector, allowing exact pinpointing of the fire location on the control panel."
  },
  {
    q: "How often should fire alarm systems be tested and maintained?",
    a: "Fire safety codes recommend quarterly inspection of detectors and control panels, along with comprehensive annual testing of battery backups, sounders, hydrants, and sprinkler flow valves under an AMC."
  },
  {
    q: "What is FM-200 and clean agent fire suppression?",
    a: "FM-200 and Clean Agent systems use waterless, electrically non-conductive gases that extinguish fires in 10 seconds without leaving any liquid residue, protecting sensitive server rooms and data centers from water damage."
  },
  {
    q: "Does Family Anchor Facilities assist with fire safety compliance certification?",
    a: "Yes. We design and install all fire safety systems strictly according to National Building Code (NBC) and local fire department standards, facilitating smooth safety audits and NOC approvals."
  }
];

function parseJsonField(val: any): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return val.split(" ").filter(Boolean); }
  }
  return [];
}

export default function FireAlarmSystemPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [dbDevices, setDbDevices] = useState<any[]>([]);

  useEffect(() => {
    devicesApi.getDevices({ serviceSlug: "fire-alarm-system", limit: 100 })
      .then(res => { if (res.success && res.data?.devices) setDbDevices(res.data.devices); })
      .catch(err => console.error("Failed to fetch fire alarm devices:", err));
  }, []);

  // Merge: DB devices take precedence; static is fallback
  const allEquipment = dbDevices.length > 0
    ? dbDevices
        .slice()
        .sort((a, b) => {
          const orderA = (a.displayOrder && a.displayOrder > 0) ? a.displayOrder : 999;
          const orderB = (b.displayOrder && b.displayOrder > 0) ? b.displayOrder : 999;
          if (orderA !== orderB) return orderA - orderB;
          return (a.id || 0) - (b.id || 0);
        })
        .map(d => ({
          title: d.name,
          desc: d.description || "",
          bestFor: parseJsonField(d.bestFor),
          features: parseJsonField(d.keyFeatures),
          dbImages: (Array.isArray(d.images) && d.images.length > 0)
            ? d.images
            : d.imagePath ? [d.imagePath] : []
        }))
    : FIRE_EQUIPMENT_CATEGORIES.map(e => ({ ...e, dbImages: FIRE_EQUIPMENT_IMAGES[e.title] || [] }));

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0284C7] selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-black overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/dark-waves.png')] bg-cover bg-center bg-no-repeat opacity-45 pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-[#38BDF8] font-bebas tracking-widest uppercase mb-4">
              <Link href="/" className="hover:underline">Home</Link>
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <Link href="/services" className="hover:underline">Services</Link>
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <span>Fire Alarm & Protection System</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Intelligent Fire Alarm & <span className="text-[#38BDF8]">Fire Protection Systems</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto">
              Protect your life, property, and business with end-to-end fire detection, emergency alerting, automatic suppression, and code-compliant safety solutions from <strong>Family Anchor Facilities Pvt. Ltd.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase block">
                Fire Safety & Early Warning
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
                Complete Fire Protection Infrastructure
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                Early fire detection and rapid suppression are critical to safeguarding lives and preventing catastrophic property loss. <strong className="text-slate-900">Family Anchor Facilities Pvt. Ltd.</strong> provides comprehensive fire alarm systems, smoke & heat detection networks, fire hydrants, automatic sprinklers, FM-200 clean agent systems, and 24/7 technical AMC support.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-inter border-l-4 border-[#0284C7] pl-4 italic bg-sky-50/80 py-3 rounded-r-xl">
                From high-rise commercial complexes to specialized industrial plants, we engineer fully compliant fire safety solutions tailored to your building requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[320px] sm:h-[400px] md:h-[480px] rounded-[32px] overflow-hidden border-4 border-sky-300 shadow-2xl group"
            >
              <img 
                src="/images/legacy/about-fire-alarm.jpg" 
                alt="Fire Protection System Infrastructure" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-zinc-900/90 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 text-white">
                <div className="flex items-center gap-3 text-[#38BDF8] mb-1">
                  <Flame className="w-7 h-7" />
                  <span className="font-bebas text-2xl tracking-wide text-white">Fire Alarm & Suppression</span>
                </div>
                <p className="text-xs text-slate-300 font-inter">
                  Instant smoke sensing, high-decibel siren alerts, and automated gas/water suppression.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white text-slate-900 relative border-t border-sky-100">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Safety Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Why Choose Our Fire Safety Systems?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {KEY_BENEFITS.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.4 }}
                className="bg-sky-50/80 p-5 rounded-2xl border border-sky-200 flex items-center gap-3 text-slate-800 font-inter font-medium shadow-sm hover:shadow-md transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0284C7] shrink-0" />
                <span className="text-sm font-semibold">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fire Equipment & Alarm Categories Section */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Equipment Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Fire Alarm & Suppression Systems
            </h2>
            <p className="text-blue-100 text-lg font-inter mt-3">
              Explore our comprehensive range of certified fire detection hardware and automatic suppression equipment.
            </p>
          </div>

          {/* 1 Card Per Row Layout with Solid White Background & Photo Sliders */}
          <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto">
            {allEquipment.map((eq, idx) => {
              const cardImages = (eq as any).dbImages?.length > 0
                ? (eq as any).dbImages
                : FIRE_EQUIPMENT_IMAGES[(eq as any).title] || [];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04, duration: 0.5 }}
                  className="group bg-white text-slate-900 rounded-[32px] overflow-hidden border-4 border-sky-300 shadow-2xl hover:border-[#0284C7] transition-all grid md:grid-cols-2 md:h-[420px]"
                >
                  {/* Left Side 50%: Image Slider */}
                  <EquipmentCardSlider 
                    images={cardImages} 
                    cardIndex={idx} 
                    categoryTitle={eq.title} 
                  />

                  {/* Right Side 50%: Details & Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between bg-white overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <h3 className="font-bebas text-3xl md:text-4xl tracking-wide text-slate-900 group-hover:text-[#0284C7] transition-colors leading-tight">
                          {eq.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs font-bebas tracking-wider uppercase text-[#0284C7] font-bold bg-sky-50 border border-sky-200 px-3 py-1 rounded-full shrink-0">
                          <Flame className="w-4 h-4 text-[#0284C7]" />
                          <span>Certified Hardware</span>
                        </div>
                      </div>

                      <p className="text-slate-600 text-xs md:text-sm font-inter leading-relaxed mb-4 line-clamp-3">
                        {eq.desc}
                      </p>

                      {/* Best For Pills */}
                      <div className="mb-4">
                        <span className="font-bebas text-xs tracking-wider uppercase text-[#0284C7] block mb-1.5 font-bold">
                          Best For:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {eq.bestFor.map((bf, bIdx) => (
                            <span key={bIdx} className="bg-sky-50 text-slate-800 font-inter text-[11px] px-2.5 py-0.5 rounded-full border border-sky-200 font-medium">
                              {bf}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      <div>
                        <span className="font-bebas text-xs tracking-wider uppercase text-[#0284C7] block mb-1.5 font-bold">
                          Key Features:
                        </span>
                        <ul className="grid grid-cols-2 gap-1.5 font-inter text-xs text-slate-700">
                          {eq.features.map((ft, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                              <span className="truncate">{ft}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fire Safety Technologies & Smart AI Features Grid */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Modern Equipment / Fire Technologies */}
            <div className="bg-sky-50/80 rounded-[32px] p-8 md:p-10 border-2 border-sky-200">
              <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
                Modern Equipment
              </span>
              <h3 className="text-4xl font-bebas tracking-wide text-slate-900 mb-6">Fire Safety Technologies</h3>
              <p className="text-slate-600 text-sm font-inter mb-6">
                We install advanced fire detection systems equipped with state-of-the-art sensing hardware, addressable loop protocols, and clean agent suppression.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {FIRE_TECHNOLOGIES.map((tech, tIdx) => (
                  <div key={tIdx} className="bg-white p-3.5 rounded-xl border border-sky-200 flex items-center gap-2.5 shadow-sm text-slate-800 font-inter text-xs font-semibold">
                    <Zap className="w-4 h-4 text-[#0284C7] shrink-0" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Intelligent Security / Smart AI Features */}
            <div className="bg-[#0070c0] text-white rounded-[32px] p-8 md:p-10 border-2 border-[#38BDF8]/40 shadow-2xl">
              <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block">
                Intelligent Security
              </span>
              <h3 className="text-4xl font-bebas tracking-wide text-white mb-6">Smart AI & Alerting Features</h3>
              <p className="text-blue-100 text-sm font-inter mb-6">
                Modern fire protection systems include intelligent automation features designed to improve early warning accuracy and execute automated life safety controls.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {FIRE_SMART_FEATURES.map((ai, aIdx) => (
                  <div key={aIdx} className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20 flex items-center gap-2.5 text-blue-100 font-inter text-xs font-medium">
                    <Sparkles className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>{ai}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Fire Safety Solutions by Industry - Interactive Rectangular Tiles */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white border-t border-sky-400/40">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Sector Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight mb-4">
              Fire Safety Solutions by Industry
            </h2>
            <p className="text-blue-100 font-inter text-base">
              Click on any industry tile below to view specialized fire safety requirements and recommended protection equipment.
            </p>
          </div>

          {/* Rectangular Industry Selection Tiles without Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mb-12">
            {FIRE_INDUSTRIES.map((ind, idx) => {
              const isSelected = selectedIndustry === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIndustry(idx)}
                  className={`w-full py-4 px-4 rounded-xl font-bebas text-lg md:text-xl tracking-wider uppercase text-center transition-all duration-300 shadow-md ${
                    isSelected 
                      ? "bg-white text-[#0070c0] shadow-xl scale-105 ring-4 ring-[#38BDF8]" 
                      : "bg-white/90 text-slate-900 hover:bg-white hover:scale-102 border border-sky-200"
                  }`}
                >
                  {ind.title}
                </button>
              );
            })}
          </div>

          {/* Expanded Showcase View for Selected Industry */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndustry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white text-slate-900 rounded-[32px] p-8 md:p-12 border-4 border-sky-300 shadow-2xl max-w-7xl mx-auto"
            >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-6 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-[#0284C7] font-bebas text-lg tracking-widest uppercase block mb-1">
                    Industry Safety Requirement
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bebas tracking-wide text-slate-900 mb-2">
                    {FIRE_INDUSTRIES[selectedIndustry].title} Setup
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base font-inter leading-relaxed max-w-3xl">
                    {FIRE_INDUSTRIES[selectedIndustry].desc}
                  </p>
                </div>

                {/* Recommended Equipment Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bebas text-sm text-slate-500 uppercase tracking-wider block w-full lg:w-auto">
                    Recommended Equipment:
                  </span>
                  {FIRE_INDUSTRIES[selectedIndustry].recommendedEquipment.map((eq, rIdx) => (
                    <span 
                      key={rIdx}
                      className="bg-[#0284C7] text-white font-bebas text-sm tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Photo Showcase Grid */}
              <div className="grid sm:grid-cols-3 gap-6 pt-2">
                {FIRE_INDUSTRIES[selectedIndustry].images.map((imgUrl, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`${FIRE_INDUSTRIES[selectedIndustry].title} Photo ${imgIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-inter opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      {FIRE_INDUSTRIES[selectedIndustry].recommendedEquipment[imgIdx % FIRE_INDUSTRIES[selectedIndustry].recommendedEquipment.length]} Deployment
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Core Services Workflow */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Turnkey Execution
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Our Core Fire Safety Services
            </h2>
            <p className="text-slate-600 text-lg font-inter mt-3">
              From initial installation and compliance testing to annual maintenance and emergency repairs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_SERVICES.map((proc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-sky-50/80 rounded-[28px] p-8 border-2 border-sky-200 relative group hover:border-[#0284C7] transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="font-bebas text-5xl text-[#0284C7] mb-4 font-bold">
                    {proc.step}
                  </div>
                  <h3 className="font-bebas text-2xl text-slate-900 mb-3">{proc.title}</h3>
                  <p className="text-slate-600 text-xs font-inter leading-relaxed">{proc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 bg-sky-50/80 text-slate-900 relative border-t border-sky-200">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-sky-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bebas text-2xl text-slate-900 hover:text-[#0284C7] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-[#0284C7] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-[#0284C7]" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-600 font-inter text-sm md:text-base leading-relaxed border-t border-sky-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-gradient-to-r from-sky-50 via-white to-sky-50 text-slate-900 border-t border-sky-200">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            Fire Safety Compliance
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Ensure Complete Fire Safety Compliance For Your Building
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8">
            Speak with our certified fire protection engineers today for site surveys, system installation, testing, and Annual Maintenance Contracts (AMC).
          </p>
          <div className="flex justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              <span>Schedule Fire Safety Survey</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
