"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Volume2, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck, 
  Mic,
  Zap,
  Sparkles,
  ChevronDown,
  HelpCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getMediaUrl } from "@/lib/axios";
import { devicesApi } from "@/services/api/devicesApi";

// Local Public Image Folders for PA System Hardware Categories
const PA_EQUIPMENT_IMAGES: Record<string, string[]> = {
  "PA System Amplifier": [
    "/images/services/pa-system/pa-system-amplifier/img-43bln0p3.jpg",
    "/images/services/pa-system/pa-system-amplifier/img-i0d6mrex.jpg",
    "/images/services/pa-system/pa-system-amplifier/img-wb2iarh3.jpg"
  ],
  "Ceiling Speaker": [
    "/images/services/pa-system/ceiling-speaker/img-avkv7ivs.jpg",
    "/images/services/pa-system/ceiling-speaker/img-lr7ewign.jpg",
    "/images/services/pa-system/ceiling-speaker/img-uw08hnc8.jpg",
    "/images/services/pa-system/ceiling-speaker/img-ypnczo6v.jpg"
  ],
  "Wall Mount Speaker": [
    "/images/services/pa-system/wall-mount-speaker/img-acyt9i6l.jpg",
    "/images/services/pa-system/wall-mount-speaker/img-uh1z6nku.jpg"
  ],
  "Horn Speaker": [
    "/images/services/pa-system/horn-speaker/img-8g9t83g3.jpg",
    "/images/services/pa-system/horn-speaker/img-ekqzqnle.jpg"
  ],
  "Column Speaker": [
    "/images/services/pa-system/column-speaker/img-izc93tf7.jpg",
    "/images/services/pa-system/column-speaker/img-s2w1gf1f.jpg",
    "/images/services/pa-system/column-speaker/img-srq4uzmb.jpg"
  ],
  "Paging Microphone": [
    "/images/services/pa-system/paging-microphone/img-7bgfz11d.jpg",
    "/images/services/pa-system/paging-microphone/img-z6da1vz6.jpg"
  ],
  "Wireless Microphone": [
    "/images/services/pa-system/wireless-microphone/img-4gftnrvq.jpg",
    "/images/services/pa-system/wireless-microphone/img-gavfmjx1.jpg"
  ],
  "Audio Mixer": [
    "/images/services/pa-system/audio-mixer/img-3j0ngnza.jpg",
    "/images/services/pa-system/audio-mixer/img-y76chrrz.jpg"
  ],
  "Zone Controller": [
    "/images/services/pa-system/zone-controller/img-51dztxol.jpg",
    "/images/services/pa-system/zone-controller/img-qqsx4dbe.jpg",
    "/images/services/pa-system/zone-controller/img-xi50ws9h.jpg"
  ],
  "PA System Controller": [
    "/images/services/pa-system/pa-system-controller/img-kwugwbmc.jpg",
    "/images/services/pa-system/pa-system-controller/img-qoteph1h.jpg"
  ],
  "Network Audio Controller": [
    "/images/services/pa-system/network-audio-controller/img-hl0gt0ig.jpg",
    "/images/services/pa-system/network-audio-controller/img-th46dda6.jpg"
  ],
  "Rack Cabinet": [
    "/images/services/pa-system/rack-cabinet/img-2yjii6qa.jpg",
    "/images/services/pa-system/rack-cabinet/img-r8m1hy97.jpg"
  ],
  "Power Supply Unit (PSU)": [
    "/images/services/pa-system/power-supply-unit-psu/img-1wwq7yib.jpg",
    "/images/services/pa-system/power-supply-unit-psu/img-93ib1fqo.jpg"
  ],
  "Emergency Voice Evacuation System (EVAC)": [
    "/images/services/pa-system/emergency-voice-evacuation-system-evac/img-1qhyd12o.jpg",
    "/images/services/pa-system/emergency-voice-evacuation-system-evac/img-31eb2qi2.jpg"
  ],
  "Network IP Speaker": [
    "/images/services/pa-system/network-ip-speaker/img-fdjhmlum.jpg",
    "/images/services/pa-system/network-ip-speaker/img-kfnxl94y.jpg"
  ],
  "Volume Controller": [
    "/images/services/pa-system/volume-controller/img-cnc7w59b.jpg",
    "/images/services/pa-system/volume-controller/img-djleys61.jpg"
  ]
};

// Automatic Photo Slider Component for PA System Cards
function PACardSlider({ images, cardIndex, categoryTitle }: { images: string[]; cardIndex: number; categoryTitle: string }) {
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

  const hasImages = images && images.length > 0;
  const safeIndex = (hasImages && current < images.length) ? current : 0;

  const prevImage = () => {
    if (!hasImages) return;
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    if (!hasImages) return;
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[340px] md:h-full min-h-[340px] overflow-hidden bg-white border-b border-slate-100 md:border-b-0 md:border-r border-slate-200 group/slider flex items-center justify-center"
    >
      {hasImages ? (
        <AnimatePresence mode="wait">
          <motion.img 
            key={safeIndex}
            src={getMediaUrl(images[safeIndex])}  
            alt={`${categoryTitle} - Image ${safeIndex + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-contain object-center absolute inset-0 p-6 z-10" 
          />
        </AnimatePresence>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 p-8 text-center text-slate-400">
          <div className="w-16 h-16 rounded-2xl bg-white border-2 border-sky-200 flex items-center justify-center text-[#0284C7] shadow-sm">
            <Volume2 className="w-8 h-8 text-[#0284C7]" />
          </div>
          <span className="font-bebas text-lg tracking-wider uppercase text-slate-600 font-bold">
            {categoryTitle}
          </span>
          <span className="text-xs font-inter text-slate-400">Commercial Grade Hardware</span>
        </div>
      )}

      {/* Prev / Next Control Arrows */}
      {hasImages && images.length > 1 && (
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
      {hasImages && (
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
      )}

      {/* Card Index Badge */}
      <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bebas text-lg text-[#0284C7] font-bold shadow-md border-2 border-sky-200">
        {cardIndex + 1}
      </div>

      <div className="absolute bottom-3 left-4 z-20 text-xs text-slate-800 font-inter bg-sky-50 border border-sky-200 px-3 py-1 rounded-md shadow-sm font-semibold">
        {categoryTitle} • {hasImages ? `${safeIndex + 1} / ${images.length}` : "No Images"}
      </div>
    </div>
  );
}

// 16 Full PA System Hardware Categories
const PA_SYSTEM_EQUIPMENT = [
  {
    title: "PA System Amplifier",
    desc: "The amplifier is the heart of a Public Address System. It amplifies audio signals from microphones and media sources, ensuring clear sound distribution across all connected speakers.",
    bestFor: ["Commercial Towers", "Schools & Colleges", "Auditoriums", "Factories"],
    features: [
      "High Power Output",
      "Multiple Audio Inputs",
      "Volume Control",
      "Zone Control",
      "Rack Mount Design",
      "Overload Protection"
    ]
  },
  {
    title: "Ceiling Speaker",
    desc: "Ceiling speakers provide clear and evenly distributed sound for announcements and background music in offices, schools, hospitals, and commercial buildings.",
    bestFor: ["Offices", "Corridors", "Hospitals", "Shopping Malls"],
    features: [
      "Clear Audio Quality",
      "Flush Mount Design",
      "Wide Sound Coverage",
      "Easy Installation",
      "Low Power Consumption"
    ]
  },
  {
    title: "Wall Mount Speaker",
    desc: "Wall-mounted speakers are ideal for indoor public announcement systems where clear voice communication is required.",
    bestFor: ["Conference Rooms", "Classrooms", "Retail Stores", "Lobbies"],
    features: [
      "Compact Design",
      "High Speech Clarity",
      "Wide Coverage",
      "Durable Construction"
    ]
  },
  {
    title: "Horn Speaker",
    desc: "Horn speakers deliver loud and clear audio over long distances, making them ideal for factories, warehouses, outdoor areas, and industrial sites.",
    bestFor: ["Warehouses", "Factories", "Outdoor Parking", "Sports Stadiums"],
    features: [
      "High Sound Output",
      "Weatherproof Design",
      "Long-Distance Coverage",
      "Outdoor Installation"
    ]
  },
  {
    title: "Column Speaker",
    desc: "Column speakers provide excellent speech intelligibility in auditoriums, conference halls, churches, and large indoor spaces.",
    bestFor: ["Auditoriums", "Churches", "Conference Halls", "Exhibition Centers"],
    features: [
      "Wide Sound Dispersion",
      "Elegant Design",
      "Clear Voice Projection",
      "Indoor Applications"
    ]
  },
  {
    title: "Paging Microphone",
    desc: "Paging microphones allow operators to make live announcements to selected zones or the entire building.",
    bestFor: ["Reception Desks", "Control Rooms", "Security Cabins", "Administration Offices"],
    features: [
      "Push-to-Talk Button",
      "Zone Selection",
      "Noise Reduction",
      "Flexible Gooseneck Design"
    ]
  },
  {
    title: "Wireless Microphone",
    desc: "Wireless microphones provide mobility and convenience for presentations, events, classrooms, and conferences.",
    bestFor: ["Events & Stage", "Seminars", "Classrooms", "Boardrooms"],
    features: [
      "Wireless Operation",
      "Long Battery Life",
      "High Audio Quality",
      "Easy Connectivity"
    ]
  },
  {
    title: "Audio Mixer",
    desc: "An audio mixer combines multiple audio sources such as microphones, music players, and computers, allowing operators to control sound levels efficiently.",
    bestFor: ["Event Venues", "Recording Studios", "Auditoriums", "Broadcasting Booths"],
    features: [
      "Multiple Input Channels",
      "Independent Volume Control",
      "Equalizer",
      "Audio Effects Support"
    ]
  },
  {
    title: "Zone Controller",
    desc: "Zone controllers enable announcements to specific areas without broadcasting throughout the entire building.",
    bestFor: ["Multi-Story Offices", "Hospitals", "Airports", "Shopping Malls"],
    features: [
      "Multi-Zone Control",
      "Independent Volume Adjustment",
      "Easy Operation",
      "Centralized Management"
    ]
  },
  {
    title: "PA System Controller",
    desc: "The PA system controller manages all connected audio devices and distributes announcements across different zones.",
    bestFor: ["Enterprise Facilities", "Commercial Complexes", "Universities", "Industrial Parks"],
    features: [
      "Centralized Control",
      "Zone Management",
      "Emergency Broadcasting",
      "Audio Routing"
    ]
  },
  {
    title: "Network Audio Controller",
    desc: "Network audio controllers allow centralized audio management over IP networks, making them ideal for large campuses and enterprise facilities.",
    bestFor: ["Smart Campuses", "Multi-Building Facilities", "Airports", "Railway Stations"],
    features: [
      "IP-Based Audio Distribution",
      "Remote Management",
      "Multi-Building Support",
      "High Reliability"
    ]
  },
  {
    title: "Rack Cabinet",
    desc: "A rack cabinet houses amplifiers, controllers, mixers, power supplies, and other PA system equipment in a secure and organized manner.",
    bestFor: ["Server Rooms", "Control Rooms", "AV Equipment Hubs"],
    features: [
      "Equipment Protection",
      "Cable Management",
      "Ventilation",
      "Lockable Design"
    ]
  },
  {
    title: "Power Supply Unit (PSU)",
    desc: "The power supply unit provides stable power to all PA system components for uninterrupted operation.",
    bestFor: ["Continuous 24/7 Audio", "Emergency Evacuation Hubs", "Industrial Racks"],
    features: [
      "Stable Power Output",
      "Surge Protection",
      "High Efficiency",
      "Reliable Performance"
    ]
  },
  {
    title: "Emergency Voice Evacuation System (EVAC)",
    desc: "Voice evacuation systems broadcast emergency instructions during fire alarms and other emergencies, helping occupants evacuate safely.",
    bestFor: ["High-Rise Towers", "Hospitals", "Public Venues", "Airports"],
    features: [
      "Emergency Voice Messages",
      "Fire Alarm Integration",
      "Automatic Announcements",
      "Multi-Zone Broadcasting"
    ]
  },
  {
    title: "Network IP Speaker",
    desc: "IP speakers receive audio over an Ethernet network, eliminating the need for traditional audio cabling and enabling scalable installations.",
    bestFor: ["Smart Offices", "IP-Based Infrastructure", "Logistics Hubs"],
    features: [
      "Ethernet Connectivity",
      "Remote Configuration",
      "Crystal-Clear Audio",
      "Scalable Deployment"
    ]
  },
  {
    title: "Volume Controller",
    desc: "Volume controllers allow users to adjust speaker output levels in individual rooms or zones without affecting the rest of the system.",
    bestFor: ["Executive Offices", "Conference Rooms", "Hotel Rooms", "Classrooms"],
    features: [
      "Local Volume Adjustment",
      "Wall-Mounted Design",
      "Easy Operation",
      "Zone Control"
    ]
  }
];

// 1. Key Benefits
const KEY_BENEFITS = [
  "High Speech Intelligibility",
  "Multi-Zone Audio Matrix",
  "Fire Alarm EVAC Integration",
  "Automated Background Music",
  "IP-Based Networked Audio",
  "Weatherproof Horn Speakers",
  "Wireless & Paging Microphones",
  "Turnkey Acoustics Installation",
  "Annual Maintenance Contracts (AMC)",
  "24×7 Emergency Technical Support"
];

// 2. PA System Technologies & Protocols
const PA_TECHNOLOGIES = [
  "100V & 70V High-Impedance Line Audio",
  "Class-D Digital Energy-Efficient Amps",
  "Dante & AES67 IP Audio Networking",
  "SIP Protocol Intercom Integration",
  "EN54-16 Certified Voice Evacuation",
  "Active Acoustic Echo Cancellation",
  "Multi-Zone Audio Routing Matrices",
  "Noise-Canceling Gooseneck Paging",
  "Auto-Override Emergency Priority Relays",
  "Automatic Gain Control (AGC) Processing"
];

// 3. Intelligent PA & Smart Alerting Features
const PA_SMART_FEATURES = [
  "Automated Scheduled Chimes & Bells",
  "Zone-Specific Targeted Paging",
  "Pre-Recorded Emergency Evacuation Prompts",
  "Ambient Noise Sensing Auto-Volume",
  "Web Console & Mobile Remote Paging",
  "Centralized IP Audio Stream Distribution",
  "24/7 Amplifier & Line Supervision",
  "Battery Backup Power Transfer Relay",
  "Multi-Channel Background Music (BGM)",
  "Seamless Fire Alarm Panel Interlock"
];

// 4. PA System Solutions by Industry
const PA_INDUSTRIES = [
  { 
    title: "Educational Institutions", 
    desc: "Campus-wide bell schedules, auditorium column speakers, and administrator paging microphones for schools and universities.",
    recommendedEquipment: ["Paging Microphone", "Column Speaker", "Ceiling Speaker", "PA System Controller"],
    images: [
      "/images/services/pa-system/paging-microphone/img-7bgfz11d.jpg",
      "/images/services/pa-system/column-speaker/img-izc93tf7.jpg",
      "/images/services/pa-system/ceiling-speaker/img-avkv7ivs.jpg"
    ]
  },
  { 
    title: "Commercial & Corporate", 
    desc: "Background music, meeting room volume controllers, and multi-zone office paging systems.",
    recommendedEquipment: ["Ceiling Speaker", "PA System Amplifier", "Volume Controller", "Audio Mixer"],
    images: [
      "/images/services/pa-system/ceiling-speaker/img-lr7ewign.jpg",
      "/images/services/pa-system/pa-system-amplifier/img-43bln0p3.jpg",
      "/images/services/pa-system/volume-controller/img-cnc7w59b.jpg"
    ]
  },
  { 
    title: "Industrial & Manufacturing", 
    desc: "High-decibel weatherproof horn speakers and emergency evacuation controllers for noisy factory floors and outdoor yards.",
    recommendedEquipment: ["Horn Speaker", "PA System Amplifier", "Emergency Voice Evacuation System (EVAC)", "Rack Cabinet"],
    images: [
      "/images/services/pa-system/horn-speaker/img-8g9t83g3.jpg",
      "/images/services/pa-system/pa-system-amplifier/img-i0d6mrex.jpg",
      "/images/services/pa-system/emergency-voice-evacuation-system-evac/img-1qhyd12o.jpg"
    ]
  },
  { 
    title: "Healthcare Facilities", 
    desc: "Quiet soothing background music, doctor call paging, and emergency code evacuation alerts for hospitals.",
    recommendedEquipment: ["Ceiling Speaker", "Paging Microphone", "Zone Controller", "Network Audio Controller"],
    images: [
      "/images/services/pa-system/ceiling-speaker/img-uw08hnc8.jpg",
      "/images/services/pa-system/paging-microphone/img-z6da1vz6.jpg",
      "/images/services/pa-system/zone-controller/img-51dztxol.jpg"
    ]
  },
  { 
    title: "Hospitality & Hotels", 
    desc: "High-fidelity audio distribution for lobbies, banquet halls, poolside areas, and guest room corridors.",
    recommendedEquipment: ["Ceiling Speaker", "Column Speaker", "Audio Mixer", "Wireless Microphone"],
    images: [
      "/images/services/pa-system/ceiling-speaker/img-ypnczo6v.jpg",
      "/images/services/pa-system/column-speaker/img-s2w1gf1f.jpg",
      "/images/services/pa-system/audio-mixer/img-3j0ngnza.jpg"
    ]
  },
  { 
    title: "Retail & Malls", 
    desc: "Background music streaming, promotional announcements, and multi-floor zone audio management.",
    recommendedEquipment: ["Ceiling Speaker", "PA System Controller", "Network IP Speaker", "Volume Controller"],
    images: [
      "/images/services/pa-system/ceiling-speaker/img-avkv7ivs.jpg",
      "/images/services/pa-system/pa-system-controller/img-kwugwbmc.jpg",
      "/images/services/pa-system/network-ip-speaker/img-fdjhmlum.jpg"
    ]
  },
  { 
    title: "Transportation & Hubs", 
    desc: "High speech clarity announcements for railway stations, bus terminals, and airport boarding gates.",
    recommendedEquipment: ["Network Audio Controller", "Horn Speaker", "Emergency Voice Evacuation System (EVAC)", "Paging Microphone"],
    images: [
      "/images/services/pa-system/network-audio-controller/img-hl0gt0ig.jpg",
      "/images/services/pa-system/horn-speaker/img-ekqzqnle.jpg",
      "/images/services/pa-system/emergency-voice-evacuation-system-evac/img-31eb2qi2.jpg"
    ]
  },
  { 
    title: "Government & Public Infrastructure", 
    desc: "Code-compliant voice evacuation, multi-building IP audio distribution, and secure rack cabinet management.",
    recommendedEquipment: ["Emergency Voice Evacuation System (EVAC)", "Network Audio Controller", "Rack Cabinet", "Power Supply Unit (PSU)"],
    images: [
      "/images/services/pa-system/emergency-voice-evacuation-system-evac/img-1qhyd12o.jpg",
      "/images/services/pa-system/rack-cabinet/img-2yjii6qa.jpg",
      "/images/services/pa-system/power-supply-unit-psu/img-1wwq7yib.jpg"
    ]
  }
];

// 5. Core Services Workflow
const CORE_SERVICES = [
  { step: "01", title: "Acoustic Site Audit & Design", desc: "Speaker placement mapping, sound pressure level (SPL) calculations, and zone layout planning by audio engineers." },
  { step: "02", title: "Wiring & Hardware Mounting", desc: "Precision ceiling flush-mounting, horn bracket installation, amp rack assembly, and fire-rated audio cabling." },
  { step: "03", title: "Tuning & Fire EVAC Interlock", desc: "Equalizer calibration, microphone gain tuning, multi-zone testing, and seamless fire panel evacuation interlock." },
  { step: "04", title: "24×7 AMC & Support", desc: "Regular speaker line impedance checks, amplifier health monitoring, and round-the-clock emergency technical support." }
];

// 6. FAQ Section
const FAQS = [
  {
    q: "What is the difference between 100V line PA systems and low-impedance systems?",
    a: "100V line PA systems use step-up transformers that allow audio signals to travel long distances over thin wiring without power loss, enabling dozens of ceiling or horn speakers to connect to a single amplifier."
  },
  {
    q: "How does a Public Address System integrate with the Fire Alarm System?",
    a: "Our PA controllers feature emergency priority override relays connected to the Fire Alarm Control Panel. When a fire alarm triggers, the PA system automatically overrides background music and broadcasts voice evacuation instructions."
  },
  {
    q: "Can we make announcements to specific rooms or zones only?",
    a: "Yes. Using multi-zone controllers and paging microphones, operators can select individual zones (e.g., Floor 1, Cafeteria, Warehouse) or broadcast to the entire building simultaneously."
  },
  {
    q: "What are Network IP Speakers and why are they used?",
    a: "Network IP speakers connect directly to Ethernet LAN switches. They eliminate traditional audio wiring, receive power over Ethernet (PoE), and can be configured and managed remotely via web software."
  }
];

function parseJsonField(val: any): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return val.split(" ").filter(Boolean); }
  }
  return [];
}

export default function PASystemServicePage() {
  const [selectedIndustry, setSelectedIndustry] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [dbDevices, setDbDevices] = useState<any[]>([]);

  useEffect(() => {
    devicesApi.getDevices({ serviceSlug: "public-address-system", limit: 100 })
      .then(res => { if (res.success && res.data?.devices) setDbDevices(res.data.devices); })
      .catch(err => console.error("Failed to fetch PA system devices:", err));
  }, []);

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
    : PA_SYSTEM_EQUIPMENT.map(e => ({ ...e, dbImages: PA_EQUIPMENT_IMAGES[e.title] || [] }));

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0284C7] selection:text-white">
      <Navbar />

      {/* Header Banner */}
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
              <span>Public Address System</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Reliable Communication During <span className="text-[#38BDF8]">Everyday Operations & Emergencies</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto">
              Professionally designed Public Address Systems for routine voice communication, emergency evacuation broadcasting, and multi-zone audio management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
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
                Audio Distribution
              </span>
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900 leading-tight">
                Crystal Clear Audio & Emergency Broadcast Console
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                A Public Address (PA) System plays a vital role in delivering clear voice announcements across large facilities. <strong className="text-slate-900">Family Anchor Facilities Pvt. Ltd.</strong> provides professionally designed PA systems for routine communication, emergency evacuation, public announcements, and event management.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                We design customized audio distribution systems that ensure clear sound quality, wide coverage, and dependable performance.
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
                src="/images/legacy/about-pa-system.jpg" 
                alt="PA System Console Microphones" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-zinc-900/90 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 text-white">
                <div className="flex items-center gap-3 text-[#38BDF8] mb-1">
                  <Mic className="w-7 h-7" />
                  <span className="font-bebas text-2xl tracking-wide text-white">Multi-Zone Audio System</span>
                </div>
                <p className="text-xs text-slate-300 font-inter">
                  High-fidelity ceiling speakers, horn speakers, and digital amplifiers.
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
              Audio Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Why Choose Our Public Address Systems?
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

      {/* Hardware Portfolio (16 Cards) */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Equipment Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Public Address Hardware & Speakers
            </h2>
            <p className="text-blue-100 text-lg font-inter mt-3">
              Explore our complete range of certified amplifiers, ceiling/horn speakers, microphones, and EVAC controllers.
            </p>
          </div>

          {/* 1 Card Per Row Layout matching Access Control Page */}
          <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto">
            {allEquipment.map((eq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="group bg-white text-slate-900 rounded-[32px] overflow-hidden border-4 border-sky-300 shadow-2xl hover:border-[#0284C7] transition-all grid md:grid-cols-2 min-h-[360px]"
              >
                {/* Left Side 50%: Image Slider — DB images take priority */}
                <PACardSlider 
                  images={(eq as any).dbImages?.length > 0 ? (eq as any).dbImages : (PA_EQUIPMENT_IMAGES[(eq as any).title] || [])} 
                  cardIndex={idx} 
                  categoryTitle={eq.title} 
                />

                {/* Right Side 50%: Solid White Content Container */}
                <div className="p-8 md:p-10 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-bebas text-3xl md:text-4xl tracking-wide text-slate-900 mb-2 group-hover:text-[#0284C7] transition-colors leading-tight">
                      {eq.title}
                    </h3>

                    <p className="text-slate-600 text-xs md:text-sm font-inter leading-relaxed mb-4">
                      {eq.desc}
                    </p>

                    {/* Best For Pills */}
                    {eq.bestFor && (
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
                    )}

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
            ))}
          </div>
        </div>
      </section>

      {/* PA Technologies & Smart Features Grid */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Modern Equipment / PA Technologies */}
            <div className="bg-sky-50/80 rounded-[32px] p-8 md:p-10 border-2 border-sky-200">
              <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
                Modern Equipment
              </span>
              <h3 className="text-4xl font-bebas tracking-wide text-slate-900 mb-6">PA System Technologies</h3>
              <p className="text-slate-600 text-sm font-inter mb-6">
                We install advanced audio distribution systems equipped with high-impedance 100V line transformers, Class-D digital amplifiers, and IP audio controllers.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {PA_TECHNOLOGIES.map((tech, tIdx) => (
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
                Intelligent Sound
              </span>
              <h3 className="text-4xl font-bebas tracking-wide text-white mb-6">Smart AI & Alerting Features</h3>
              <p className="text-blue-100 text-sm font-inter mb-6">
                Modern Public Address systems include automated bell scheduling, emergency EVAC override relays, and ambient noise sensing auto-volume adjustment.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {PA_SMART_FEATURES.map((ai, aIdx) => (
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

      {/* PA System Solutions by Industry - Interactive Rectangular Tiles */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white border-t border-sky-400/40">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Sector Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight mb-4">
              PA System Solutions by Industry
            </h2>
            <p className="text-blue-100 font-inter text-base">
              Click on any industry tile below to view specialized audio requirements and recommended PA hardware.
            </p>
          </div>

          {/* Rectangular Industry Selection Tiles without Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mb-12">
            {PA_INDUSTRIES.map((ind, idx) => {
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
                    Industry Audio Requirement
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bebas tracking-wide text-slate-900 mb-2">
                    {PA_INDUSTRIES[selectedIndustry].title} Setup
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base font-inter leading-relaxed max-w-3xl">
                    {PA_INDUSTRIES[selectedIndustry].desc}
                  </p>
                </div>

                {/* Recommended Equipment Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bebas text-sm text-slate-500 uppercase tracking-wider block w-full lg:w-auto">
                    Recommended Equipment:
                  </span>
                  {PA_INDUSTRIES[selectedIndustry].recommendedEquipment.map((eq, rIdx) => (
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
                {PA_INDUSTRIES[selectedIndustry].images.map((imgUrl, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`${PA_INDUSTRIES[selectedIndustry].title} Photo ${imgIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-inter opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      {PA_INDUSTRIES[selectedIndustry].recommendedEquipment[imgIdx % PA_INDUSTRIES[selectedIndustry].recommendedEquipment.length]} Deployment
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
              Our Public Address Services
            </h2>
            <p className="text-slate-600 text-lg font-inter mt-3">
              From initial acoustic audit and cabling to fire EVAC integration and 24/7 technical AMC.
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
            Clear Sound Design
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Design Your Commercial PA Audio System Today
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8">
            Speak with our audio engineers today for acoustics site surveys, speaker placement mapping, emergency EVAC interlock setup, and AMC plans.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              <span>Schedule PA System Survey</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
