"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Fingerprint, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck, 
  Lock,
  Zap,
  Sparkles,
  ChevronDown,
  HelpCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getMediaUrl } from "@/lib/axios";
import { devicesApi } from "@/services/api/devicesApi";
import { ProcessSection } from "@/components/sections/Process";

// Local Public Image Folders for each Access Control Hardware Category
const ACCESS_EQUIPMENT_IMAGES: Record<string, string[]> = {
  "Biometric Fingerprint Reader": [
    "/images/services/access-control/biometric-fingerprint-reader/img-7yp7vslh.jpg",
    "/images/services/access-control/biometric-fingerprint-reader/img-bkmdwe3r.jpg",
    "/images/services/access-control/biometric-fingerprint-reader/img-ca4ktm90.jpg",
    "/images/services/access-control/biometric-fingerprint-reader/img-evjfo4u8.jpg",
    "/images/services/access-control/biometric-fingerprint-reader/img-wc3gqes6.jpg"
  ],
  "Facial Recognition Terminal": [
    "/images/services/access-control/facial-recognition-terminal/img-8gta2svs.jpg",
    "/images/services/access-control/facial-recognition-terminal/img-9ui2qmn2.jpg"
  ],
  "RFID Card Reader": [
    "/images/services/access-control/rfid-card-reader/img-7pp9r2b0.jpg",
    "/images/services/access-control/rfid-card-reader/img-phvquhjz.jpg"
  ],
  "Keypad Access Control": [
    "/images/services/access-control/keypad-access-control/img-mrjk6rat.jpg",
    "/images/services/access-control/keypad-access-control/img-uak61dl1.jpg"
  ],
  "Smart Door Lock": [
    "/images/services/access-control/smart-door-lock/img-hhd2fcx6.jpg",
    "/images/services/access-control/smart-door-lock/img-rexrg6qb.jpg",
    "/images/services/access-control/smart-door-lock/img-wf6ikwg8.jpg"
  ],
  "Electromagnetic Lock (Maglock)": [
    "/images/services/access-control/electromagnetic-lock-maglock/img-sya1h93d.jpg",
    "/images/services/access-control/electromagnetic-lock-maglock/img-xf2p23z2.jpg"
  ],
  "Electric Bolt Lock": [
    "/images/services/access-control/electric-bolt-lock/img-bxxbrn4m.jpg",
    "/images/services/access-control/electric-bolt-lock/img-v1tnsaaz.jpg"
  ],
  "Electric Strike Lock": [
    "/images/services/access-control/electric-strike-lock/img-bpvjxswg.jpg",
    "/images/services/access-control/electric-strike-lock/img-d813e77i.jpg"
  ],
  "Access Control Controller": [
    "/images/services/access-control/access-control-controller/img-1uy66gux.jpg",
    "/images/services/access-control/access-control-controller/img-gq7fpc50.jpg",
    "/images/services/access-control/access-control-controller/img-miat06ox.jpg",
    "/images/services/access-control/access-control-controller/img-vsdn8e9p.jpg"
  ],
  "Exit Push Button": [
    "/images/services/access-control/exit-push-button/img-425b0u2h.jpg",
    "/images/services/access-control/exit-push-button/img-cnxvcik7.jpg",
    "/images/services/access-control/exit-push-button/img-qtvsupgz.jpg"
  ],
  "Exit Motion Sensor": [
    "/images/services/access-control/exit-motion-sensor/img-j8g3i1ou.jpg",
    "/images/services/access-control/exit-motion-sensor/img-qjuqrola.jpg"
  ],
  "Door Exit Release Button": [
    "/images/services/access-control/door-exit-release-button/img-4tsn27pa.jpg",
    "/images/services/access-control/door-exit-release-button/img-unjw6ose.jpg",
    "/images/services/access-control/door-exit-release-button/img-vvf3dr5c.jpg"
  ],
  "Boom Barrier": [
    "/images/services/access-control/boom-barrier/img-azeb8r5k.jpg",
    "/images/services/access-control/boom-barrier/img-h4wiwmwp.jpg"
  ],
  "Video Door Phone (VDP)": [
    "/images/services/access-control/video-door-phone-vdp/img-0xtgtvic.jpg",
    "/images/services/access-control/video-door-phone-vdp/img-9uu3gur7.jpg",
    "/images/services/access-control/video-door-phone-vdp/img-qfcmpudc.jpg"
  ]
};

// Automatic Photo Slider Component for Access Control Cards
function AccessCardSlider({ images, cardIndex, categoryTitle }: { images: string[]; cardIndex: number; categoryTitle: string }) {
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
          alt={`${categoryTitle} - Image ${safeIndex + 1}`}
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

      <div className="absolute bottom-3 left-4 z-20 text-xs text-slate-800 font-inter bg-sky-50 border border-sky-200 px-3 py-1 rounded-md shadow-sm font-semibold">
        {categoryTitle} • {safeIndex + 1} / {images.length}
      </div>
    </div>
  );
}

const ACCESS_CONTROL_EQUIPMENT = [
  {
    title: "Biometric Fingerprint Reader",
    desc: "A biometric fingerprint reader authenticates users using their unique fingerprints, providing secure and fast access to restricted areas.",
    bestFor: ["Corporate Offices", "Server Rooms", "Executive Suites", "Research Labs"],
    features: [
      "Fingerprint Authentication",
      "Fast Recognition",
      "High Security",
      "Attendance Integration",
      "Access Logs",
      "Touch Sensor Technology"
    ]
  },
  {
    title: "Facial Recognition Terminal",
    desc: "A facial recognition terminal uses AI-powered facial recognition technology to grant secure, contactless access.",
    bestFor: ["Hospitals", "Corporate Lobbies", "High-Security Gates", "Factories"],
    features: [
      "Contactless Authentication",
      "AI Face Recognition",
      "Fast Verification",
      "Mask Detection Support",
      "Visitor Management",
      "Attendance Tracking"
    ]
  },
  {
    title: "RFID Card Reader",
    desc: "RFID card readers allow authorized users to unlock doors using RFID cards or key fobs.",
    bestFor: ["Commercial Buildings", "Hotels", "Residential Towers", "Staff Entrances"],
    features: [
      "Contactless Card Access",
      "Fast Authentication",
      "Multiple Card Support",
      "Durable Design",
      "Secure Entry Logs"
    ]
  },
  {
    title: "Keypad Access Control",
    desc: "A keypad access control system grants entry using a secure PIN code without requiring physical keys.",
    bestFor: ["Store Rooms", "Utility Areas", "Residential Gates", "Server Racks"],
    features: [
      "PIN Authentication",
      "Password Protection",
      "Multiple User Codes",
      "Indoor & Outdoor Models",
      "Easy Installation"
    ]
  },
  {
    title: "Smart Door Lock",
    desc: "A smart door lock combines fingerprint, PIN, RFID, and mobile app access for enhanced security.",
    bestFor: ["Private Offices", "Luxury Apartments", "Boutique Hotels", "Conference Rooms"],
    features: [
      "Fingerprint Unlock",
      "PIN Code Access",
      "Mobile App Control",
      "RFID Card Support",
      "Emergency Key Backup"
    ]
  },
  {
    title: "Electromagnetic Lock (Maglock)",
    desc: "An electromagnetic lock secures doors using a powerful magnetic force and integrates with access control systems.",
    bestFor: ["Glass Doors", "Emergency Exit Doors", "High-Traffic Gates", "Office Main Entrances"],
    features: [
      "High Holding Force",
      "Silent Operation",
      "Automatic Locking",
      "Long Service Life",
      "Easy Integration"
    ]
  },
  {
    title: "Electric Bolt Lock",
    desc: "An electric bolt lock provides secure locking by automatically extending or retracting a steel bolt.",
    bestFor: ["Double-Swing Doors", "Wooden Doors", "Heavy Metal Doors", "Secure Vaults"],
    features: [
      "Automatic Locking",
      "Stainless Steel Bolt",
      "Fail-Safe / Fail-Secure Options",
      "Low Power Consumption"
    ]
  },
  {
    title: "Electric Strike Lock",
    desc: "An electric strike lock works with existing door latches to allow remote unlocking through an access control system.",
    bestFor: ["Office Doors", "Intercom Systems", "Commercial Suites", "Reception Entrances"],
    features: [
      "Remote Door Release",
      "Easy Installation",
      "Secure Access",
      "Compatible with Existing Locks"
    ]
  },
  {
    title: "Access Control Controller",
    desc: "The access control controller is the central processing unit that manages readers, locks, and user permissions.",
    bestFor: ["Multi-Door Networks", "Enterprise Buildings", "Industrial Facilities", "Campus Infrastructure"],
    features: [
      "Multi-Door Management",
      "User Database",
      "Event Logging",
      "Remote Monitoring",
      "Network Connectivity"
    ]
  },
  {
    title: "Exit Push Button",
    desc: "An exit push button allows occupants to unlock doors safely when exiting a secured area.",
    bestFor: ["Interior Doors", "Reception Exits", "Staff Exits", "Office Corridors"],
    features: [
      "One-Touch Exit",
      "Durable Design",
      "Easy Installation",
      "LED Indicator"
    ]
  },
  {
    title: "Exit Motion Sensor",
    desc: "An exit motion sensor automatically unlocks doors when someone approaches from inside.",
    features: [
      "Hands-Free Operation",
      "Motion Detection",
      "Automatic Door Release",
      "Adjustable Detection Range"
    ],
    bestFor: ["High-Traffic Corridors", "Glass Door Entrances", "Hospital Hallways", "Cleanrooms"]
  },
  {
    title: "Door Exit Release Button",
    desc: "A break-glass emergency release unit immediately unlocks access-controlled doors during emergencies.",
    bestFor: ["Emergency Exits", "Fire Escape Routes", "Stairwell Doors", "Hazardous Areas"],
    features: [
      "Emergency Door Release",
      "Break Glass Design",
      "High Reliability",
      "Safety Compliance"
    ]
  },
  {
    title: "Boom Barrier",
    desc: "Boom barriers control vehicle entry and exit in parking lots, residential complexes, and industrial premises.",
    bestFor: ["Gated Communities", "Toll Plazas", "Commercial Parking", "Factory Gates"],
    features: [
      "Automatic Vehicle Control",
      "RFID Integration",
      "Fast Opening",
      "Weather Resistant",
      "Heavy Duty Motor"
    ]
  },
  {
    title: "Video Door Phone (VDP)",
    desc: "A video door phone enables audio and video communication with visitors before granting access.",
    bestFor: ["Villas", "Apartments", "Corporate Reception", "Executive Offices"],
    features: [
      "HD Video Calling",
      "Two-Way Audio",
      "Remote Door Unlock",
      "Mobile App Support",
      "Night Vision"
    ]
  }
];

// 1. Key Benefits
const KEY_BENEFITS = [
  "Biometric & Facial Authentication",
  "Contactless RFID & Mobile Access",
  "Centralized Door Controller Network",
  "Automated Attendance Logging",
  "Time & Visitor Management",
  "Anti-Passback & Tailgating Control",
  "Emergency Door Release Integration",
  "Professional Installation & Setup",
  "Annual Maintenance Contracts (AMC)",
  "24×7 Technical Emergency Support"
];

// 2. Access Control Technologies & Protocols
const ACCESS_TECHNOLOGIES = [
  "Optical & Capacitive Fingerprint Sensing",
  "AI Deep Learning Face Recognition",
  "13.56MHz Mifare & 125kHz RFID Cards",
  "Bluetooth & NFC Mobile Credentials",
  "Wiegand & OSDP Controller Protocols",
  "Multi-Door TCP/IP Network Controllers",
  "Fail-Safe & Fail-Secure Electric Locks",
  "Infrared Exit Motion Sensor Detection",
  "High-Torque Vehicle Boom Barrier Motors",
  "SIP Video Intercom Integration"
];

// 3. Intelligent Access Control & Smart Security Features
const ACCESS_SMART_FEATURES = [
  "Real-Time Door Access Monitoring",
  "Anti-Passback Enforcement Rules",
  "Multi-Factor Authentication (PIN + Finger)",
  "Automated Time & Attendance Sync",
  "Visitor Badge Printing & QR Pass",
  "Fire Alarm Auto-Unlock Integration",
  "Tailgating Detection & Video Snapshots",
  "Remote Door Lock & Release via App",
  "Cloud-Based User Permission Matrix",
  "Instant Tamper & Door-Ajar Alerts"
];

// 4. Access Control Solutions by Industry
const ACCESS_INDUSTRIES = [
  { 
    title: "Residential Access Control", 
    desc: "Protect apartment complexes, villas, and gated communities with smart door locks, RFID gate barriers, and video intercoms.",
    recommendedEquipment: ["Smart Door Lock", "RFID Card Reader", "Boom Barrier", "Video Door Phone (VDP)"],
    images: [
      "/images/services/access-control/smart-door-lock/img-wf6ikwg8.jpg",
      "/images/services/access-control/rfid-card-reader/img-7pp9r2b0.jpg",
      "/images/services/access-control/video-door-phone-vdp/img-0xtgtvic.jpg"
    ]
  },
  { 
    title: "Commercial Access Control", 
    desc: "Manage staff entry, turnstiles, and restricted executive suites with biometric fingerprint and card readers.",
    recommendedEquipment: ["Biometric Fingerprint Reader", "Facial Recognition Terminal", "RFID Card Reader", "Access Control Controller"],
    images: [
      "/images/services/access-control/biometric-fingerprint-reader/img-7yp7vslh.jpg",
      "/images/services/access-control/facial-recognition-terminal/img-8gta2svs.jpg",
      "/images/services/access-control/access-control-controller/img-1uy66gux.jpg"
    ]
  },
  { 
    title: "Industrial Access Control", 
    desc: "Heavy-duty perimeter vehicle barriers, factory turnstiles, and maglock door controls for industrial plants.",
    recommendedEquipment: ["Boom Barrier", "Electromagnetic Lock (Maglock)", "Biometric Fingerprint Reader", "Exit Push Button"],
    images: [
      "/images/services/access-control/boom-barrier/img-azeb8r5k.jpg",
      "/images/services/access-control/electromagnetic-lock-maglock/img-sya1h93d.jpg",
      "/images/services/access-control/exit-push-button/img-425b0u2h.jpg"
    ]
  },
  { 
    title: "Educational Institutions", 
    desc: "Ensure campus safety with contactless facial recognition attendance, library card readers, and emergency exit push buttons.",
    recommendedEquipment: ["Facial Recognition Terminal", "RFID Card Reader", "Door Exit Release Button", "Access Control Controller"],
    images: [
      "/images/services/access-control/facial-recognition-terminal/img-9ui2qmn2.jpg",
      "/images/services/access-control/rfid-card-reader/img-phvquhjz.jpg",
      "/images/services/access-control/door-exit-release-button/img-4tsn27pa.jpg"
    ]
  },
  { 
    title: "Healthcare Facilities", 
    desc: "Touchless hygienic door entry, ICU access restriction, and emergency break-glass exit controls for hospitals.",
    recommendedEquipment: ["Exit Motion Sensor", "Facial Recognition Terminal", "Electromagnetic Lock (Maglock)", "Door Exit Release Button"],
    images: [
      "/images/services/access-control/exit-motion-sensor/img-j8g3i1ou.jpg",
      "/images/services/access-control/facial-recognition-terminal/img-8gta2svs.jpg",
      "/images/services/access-control/electromagnetic-lock-maglock/img-xf2p23z2.jpg"
    ]
  },
  { 
    title: "Hospitality", 
    desc: "Seamless keycard room entry, elevator access restriction, and VIP lounge smart door controllers for hotels.",
    recommendedEquipment: ["Smart Door Lock", "RFID Card Reader", "Access Control Controller", "Video Door Phone (VDP)"],
    images: [
      "/images/services/access-control/smart-door-lock/img-hhd2fcx6.jpg",
      "/images/services/access-control/rfid-card-reader/img-7pp9r2b0.jpg",
      "/images/services/access-control/video-door-phone-vdp/img-9uu3gur7.jpg"
    ]
  },
  { 
    title: "Warehouses & Logistics", 
    desc: "Automated truck boom barriers, loading bay keypad locks, and heavy-duty electric bolt locks for warehouses.",
    recommendedEquipment: ["Boom Barrier", "Keypad Access Control", "Electric Bolt Lock", "Exit Motion Sensor"],
    images: [
      "/images/services/access-control/boom-barrier/img-h4wiwmwp.jpg",
      "/images/services/access-control/keypad-access-control/img-mrjk6rat.jpg",
      "/images/services/access-control/electric-bolt-lock/img-bxxbrn4m.jpg"
    ]
  },
  { 
    title: "Government & Public", 
    desc: "High-security biometric authentication, multi-factor controllers, and full event logging for public infrastructure.",
    recommendedEquipment: ["Biometric Fingerprint Reader", "Facial Recognition Terminal", "Access Control Controller", "Electric Strike Lock"],
    images: [
      "/images/services/access-control/biometric-fingerprint-reader/img-evjfo4u8.jpg",
      "/images/services/access-control/access-control-controller/img-gq7fpc50.jpg",
      "/images/services/access-control/electric-strike-lock/img-bpvjxswg.jpg"
    ]
  }
];

// 5. Core Services Workflow
const CORE_SERVICES = [
  { step: "01", title: "Site Assessment & Wiring", desc: "Comprehensive door layout audit, cabling run planning, and controller location selection by access security engineers." },
  { step: "02", title: "Installation & Hardware Mounting", desc: "Precision mounting of readers, electromagnetic locks, exit sensors, controllers, and emergency break-glass buttons." },
  { step: "03", title: "Software Configuration & AMC", desc: "User database enrolment, time-zone permission setup, attendance software integration, and preventive maintenance checks." },
  { step: "04", title: "24×7 Technical Support", desc: "Round-the-clock technical emergency helpline for lock troubleshooting, permission updates, and hardware replacement." }
];

// 6. FAQ Section
const FAQS = [
  {
    q: "How does a biometric access control system work?",
    a: "Biometric access control systems scan unique biological traits—such as fingerprints or facial geometry—and compare them against registered templates in a secure database to grant or deny door access within milliseconds."
  },
  {
    q: "What happens to access control doors during a power failure?",
    a: "Our access control installations include 24/7 battery backup power supplies. Fail-safe locks (such as maglocks) automatically unlock upon emergency signals or complete power loss to ensure safe evacuation."
  },
  {
    q: "Can access control systems integrate with payroll and attendance software?",
    a: "Yes. All our biometric fingerprint and facial recognition terminals seamlessly synchronize entry/exit timestamps with HR payroll and time-attendance software platforms."
  },
  {
    q: "Can we manage access permissions for multiple doors remotely?",
    a: "Yes. Our IP-networked access control controllers allow administrators to manage user access rights, view live access logs, and issue temporary visitor passes from a centralized desktop or mobile dashboard."
  }
];

function parseJsonField(val: any): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return val.split(" ").filter(Boolean); }
  }
  return [];
}

export default function AccessControlServicePage() {
  const [selectedIndustry, setSelectedIndustry] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [dbDevices, setDbDevices] = useState<any[]>([]);

  useEffect(() => {
    devicesApi.getDevices({ serviceSlug: "access-control-system", limit: 100 })
      .then(res => { if (res.success && res.data?.devices) setDbDevices(res.data.devices); })
      .catch(err => console.error("Failed to fetch access control devices:", err));
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
    : ACCESS_CONTROL_EQUIPMENT.map(e => ({ ...e, dbImages: ACCESS_EQUIPMENT_IMAGES[e.title] || [] }));

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
              <span>Access Control System</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Smart Access Management for <span className="text-[#38BDF8]">Secure Premises</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto">
              Intelligent biometric, facial recognition, and RFID card access control solutions that help protect restricted areas while streamlining workforce entry.
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
                Digital Authentication
              </span>
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900 leading-tight">
                Complete Control Over Property Entry & Attendance
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                Control who enters your premises with our intelligent access control solutions. <strong className="text-slate-900">Family Anchor Facilities Pvt. Ltd.</strong> provides modern access management systems that help organizations protect restricted areas while improving operational efficiency.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                Our systems replace traditional locks with secure digital authentication methods such as biometric verification, RFID cards, PIN codes, and facial recognition technologies.
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
                src="/images/legacy/about-access-control.png" 
                alt="Biometric Fingerprint Access Control Door Reader" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-zinc-900/90 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 text-white">
                <div className="flex items-center gap-3 text-[#38BDF8] mb-1">
                  <Fingerprint className="w-7 h-7" />
                  <span className="font-bebas text-2xl tracking-wide text-white">Biometric & RFID Readers</span>
                </div>
                <p className="text-xs text-slate-300 font-inter">
                  Instant verification, door controller integration, and live access logs.
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
              Security Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Why Choose Our Access Control Systems?
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

      {/* Solutions Grid */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Equipment Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Access Control Hardware & Locks
            </h2>
            <p className="text-blue-100 text-lg font-inter mt-3">
              Explore our comprehensive range of certified biometric readers, facial recognition terminals, smart locks, and exit controls.
            </p>
          </div>

          {/* 1 Card Per Row Layout with Solid White Background & Photo Sliders */}
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
                <AccessCardSlider 
                  images={(eq as any).dbImages?.length > 0 ? (eq as any).dbImages : (ACCESS_EQUIPMENT_IMAGES[(eq as any).title] || [])} 
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

      {/* Access Control Technologies & Smart Security Features Grid */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Modern Equipment / Access Technologies */}
            <div className="bg-sky-50/80 rounded-[32px] p-8 md:p-10 border-2 border-sky-200">
              <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
                Modern Equipment
              </span>
              <h3 className="text-4xl font-bebas tracking-wide text-slate-900 mb-6">Access Control Technologies</h3>
              <p className="text-slate-600 text-sm font-inter mb-6">
                We install advanced door access systems equipped with state-of-the-art biometric hardware, Wiegand/OSDP controller protocols, and smart lock assemblies.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {ACCESS_TECHNOLOGIES.map((tech, tIdx) => (
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
              <h3 className="text-4xl font-bebas tracking-wide text-white mb-6">Smart Security & Alerting Features</h3>
              <p className="text-blue-100 text-sm font-inter mb-6">
                Modern access control management systems include intelligent automation features designed to prevent tailgating, track live attendance, and trigger instant security alerts.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {ACCESS_SMART_FEATURES.map((ai, aIdx) => (
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

      {/* Access Control Solutions by Industry - Interactive Rectangular Tiles */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white border-t border-sky-400/40">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Sector Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight mb-4">
              Access Control Solutions by Industry
            </h2>
            <p className="text-blue-100 font-inter text-base">
              Click on any industry tile below to view specialized door access requirements and recommended hardware.
            </p>
          </div>

          {/* Rectangular Industry Selection Tiles without Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mb-12">
            {ACCESS_INDUSTRIES.map((ind, idx) => {
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
                    Industry Access Requirement
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bebas tracking-wide text-slate-900 mb-2">
                    {ACCESS_INDUSTRIES[selectedIndustry].title} Setup
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base font-inter leading-relaxed max-w-3xl">
                    {ACCESS_INDUSTRIES[selectedIndustry].desc}
                  </p>
                </div>

                {/* Recommended Equipment Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bebas text-sm text-slate-500 uppercase tracking-wider block w-full lg:w-auto">
                    Recommended Equipment:
                  </span>
                  {ACCESS_INDUSTRIES[selectedIndustry].recommendedEquipment.map((eq, rIdx) => (
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
                {ACCESS_INDUSTRIES[selectedIndustry].images.map((imgUrl, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`${ACCESS_INDUSTRIES[selectedIndustry].title} Photo ${imgIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-inter opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      {ACCESS_INDUSTRIES[selectedIndustry].recommendedEquipment[imgIdx % ACCESS_INDUSTRIES[selectedIndustry].recommendedEquipment.length]} Deployment
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
              Our Access Control Services
            </h2>
            <p className="text-slate-600 text-lg font-inter mt-3">
              From initial site audit and cable installation to software setup and 24/7 technical support.
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
            Smart Door Security
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Upgrade Your Facility Access Control Today
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8">
            Speak with our system engineers today for site surveys, biometric hardware installation, software configuration, and AMC plans.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              <span>Schedule Access Control Survey</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
