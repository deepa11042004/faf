"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  UserCheck, 
  Shield,
  Zap,
  Sparkles,
  ChevronDown,
  HelpCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getMediaUrl } from "@/lib/axios";
import { devicesApi } from "@/services/api/devicesApi";

// Local Public Image Folders for Security Guard Categories
const SECURITY_GUARD_IMAGES: Record<string, string[]> = {
  "Residential Security Guards": [
    "/images/services/security-guards/residential-security-guards/img-exiamctq.jpg",
    "/images/services/security-guards/residential-security-guards/img-llicgcl7.jpg"
  ],
  "Commercial Security Guards": [
    "/images/services/security-guards/commercial-security-guards/img-0qqf0rjg.jpg",
    "/images/services/security-guards/commercial-security-guards/img-kdtedybx.jpg"
  ],
  "Industrial Security Guards": [
    "/images/services/security-guards/industrial-security-guards/img-a76ntaw8.jpg",
    "/images/services/security-guards/industrial-security-guards/img-io25lm2p.jpg"
  ],
  "Corporate Office Security": [
    "/images/services/security-guards/corporate-office-security/img-jhz9bsil.jpg",
    "/images/services/security-guards/corporate-office-security/img-xvzjl7vc.jpg"
  ],
  "Hotel Security": [
    "/images/services/security-guards/hotel-security/img-2lpwrhv1.jpg",
    "/images/services/security-guards/hotel-security/img-qrx0x7n6.jpg"
  ],
  "Hospital Security": [
    "/images/services/security-guards/hospital-security/img-0hi8skoy.jpg",
    "/images/services/security-guards/hospital-security/img-sk51hm5s.jpg"
  ],
  "School & College Security": [
    "/images/services/security-guards/school-college-security/img-0c4i3bfk.jpg",
    "/images/services/security-guards/school-college-security/img-apy5p9sz.jpg"
  ],
  "Warehouse Security": [
    "/images/services/security-guards/warehouse-security/img-pvqpmuq0.jpg",
    "/images/services/security-guards/warehouse-security/img-yis98onh.jpg"
  ],
  "Event Security": [
    "/images/services/security-guards/event-security/img-53jld5id.jpg",
    "/images/services/security-guards/event-security/img-stn2yv8t.jpg"
  ],
  "VIP Protection": [
    "/images/services/security-guards/vip-protection/img-6095veu5.jpg",
    "/images/services/security-guards/vip-protection/img-zllz3u2j.jpg"
  ],
  "Bouncer Services": [
    "/uploads/devices/1785680616395-868619263.jpg"
  ],
  "Gunman Services": [
    "/uploads/devices/1785656802928-251719565.png",
    "/uploads/devices/1785656802936-990891824.jpg"
  ]
};


// Automatic Photo Slider Component for Security Guard Cards
function GuardCardSlider({ images, cardIndex, categoryTitle, dbImages }: { images?: string[]; cardIndex: number; categoryTitle: string; dbImages?: string[] }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  let finalImages: string[] = [];
  if (dbImages && Array.isArray(dbImages) && dbImages.length > 0) {
    finalImages = dbImages;
  } else if (images && Array.isArray(images) && images.length > 0) {
    finalImages = images;
  }

  useEffect(() => {
    if (isPaused || !finalImages || finalImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % finalImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, finalImages?.length]);

  if (!finalImages || finalImages.length === 0) {
    return (
      <div className="relative w-full h-[340px] md:h-full min-h-[340px] bg-slate-900 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
        <ShieldCheck className="w-16 h-16 text-slate-700" />
      </div>
    );
  }

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? finalImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrent((prev) => (prev === finalImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[340px] md:h-full min-h-[340px] overflow-hidden bg-white border-b border-slate-100 md:border-b-0 md:border-r border-slate-200 group/slider flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        <motion.img 
          key={current}
          src={(() => {
            const url = getMediaUrl(finalImages[current]);
            return url ? (url.includes("?") ? `${url}&v=2` : `${url}?v=2`) : "";
          })()} 
          alt={`${categoryTitle} - Image ${current + 1}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-contain object-center absolute inset-0 p-6 z-10" 
        />
      </AnimatePresence>

      {/* Prev / Next Control Arrows */}
      {finalImages.length > 1 && (
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
      {finalImages.length > 1 && (
        <div className="absolute bottom-3 right-4 z-30 flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {finalImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === idx ? "w-6 bg-[#38BDF8]" : "w-2 bg-white/60"
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
        {categoryTitle} • {current + 1} / {finalImages.length}
      </div>
    </div>
  );
}

// 10 Full Security Guard Services Data
const SECURITY_GUARD_SERVICES = [
  {
    title: "Residential Security Guards",
    desc: "Our Residential Security Guards provide reliable protection for apartments, gated communities, villas, and residential complexes. They ensure the safety of residents by monitoring entrances, conducting regular patrols, verifying visitors, and responding promptly to security incidents.",
    bestFor: ["Apartment Complexes", "Gated Communities", "Villas & Estates", "Residential Towers"],
    features: [
      "24×7 Security Coverage",
      "Visitor Verification",
      "Entry & Exit Monitoring",
      "Regular Patrolling",
      "Emergency Response",
      "Incident Reporting"
    ]
  },
  {
    title: "Commercial Security Guards",
    desc: "Our Commercial Security Guards safeguard offices, retail stores, shopping complexes, and business establishments by managing access, monitoring activities, and maintaining a secure environment for employees and customers.",
    bestFor: ["Retail Malls", "Business Hubs", "Commercial Buildings", "Showrooms"],
    features: [
      "Access Control",
      "Reception Security",
      "Visitor Management",
      "CCTV Monitoring",
      "Theft Prevention",
      "Professional Customer Assistance"
    ]
  },
  {
    title: "Industrial Security Guards",
    desc: "Our Industrial Security Guards protect factories, manufacturing plants, warehouses, and industrial facilities through continuous surveillance, perimeter security, and strict access control to prevent theft and unauthorized entry.",
    bestFor: ["Factories", "Manufacturing Plants", "Industrial Parks", "Chemical Plants"],
    features: [
      "Factory & Plant Security",
      "Vehicle Inspection",
      "Material Gate Pass Verification",
      "Perimeter Patrolling",
      "Shift Monitoring",
      "Asset Protection"
    ]
  },
  {
    title: "Corporate Office Security",
    desc: "Our Corporate Office Security Guards ensure a safe and professional workplace by managing visitor access, monitoring office premises, and providing security support for employees, executives, and business operations.",
    bestFor: ["Corporate HQs", "IT Parks", "Executive Towers", "Financial Institutions"],
    features: [
      "Reception & Lobby Security",
      "Employee Verification",
      "Visitor Management",
      "Access Control",
      "CCTV Surveillance",
      "Emergency Assistance"
    ]
  },
  {
    title: "Hotel Security",
    desc: "Our Hotel Security Guards provide comprehensive security services for hotels and resorts, ensuring guest safety, protecting property, and maintaining a welcoming environment through continuous monitoring and professional assistance.",
    bestFor: ["Luxury Hotels", "Resorts", "Boutique Hotels", "Event Banquets"],
    features: [
      "Guest Safety",
      "Lobby Security",
      "Access Control",
      "Parking Security",
      "Emergency Response",
      "24×7 Surveillance"
    ]
  },
  {
    title: "Hospital Security",
    desc: "Our Hospital Security Guards maintain a secure healthcare environment by protecting patients, staff, visitors, and medical facilities while assisting during emergencies and controlling access to restricted areas.",
    bestFor: ["Multi-Specialty Hospitals", "Clinics", "Medical Institutes", "Trauma Centers"],
    features: [
      "Patient & Staff Safety",
      "Visitor Management",
      "Emergency Assistance",
      "Restricted Area Security",
      "Parking Management",
      "Continuous Monitoring"
    ]
  },
  {
    title: "School & College Security",
    desc: "Our School & College Security Guards help create a safe learning environment by monitoring campus entrances, verifying visitors, patrolling educational premises, and supporting emergency preparedness.",
    bestFor: ["Schools", "Colleges", "Universities", "Educational Campuses"],
    features: [
      "Student Safety",
      "Visitor Verification",
      "Campus Patrolling",
      "Access Control",
      "Emergency Response",
      "Event Security Support"
    ]
  },
  {
    title: "Warehouse Security",
    desc: "Our Warehouse Security Guards secure warehouses and logistics facilities by preventing theft, monitoring inventory movement, controlling vehicle access, and conducting regular security patrols.",
    bestFor: ["Logistics Centers", "Warehouses", "Fulfillment Hubs", "Cargo Yards"],
    features: [
      "Inventory Protection",
      "Gate & Vehicle Control",
      "Loading Dock Monitoring",
      "CCTV Surveillance",
      "Theft Prevention",
      "24×7 Patrolling"
    ]
  },
  {
    title: "Event Security",
    desc: "Our Event Security Guards ensure the safety of guests, organizers, and staff during corporate events, exhibitions, conferences, concerts, weddings, and public gatherings through effective crowd management and access control.",
    bestFor: ["Corporate Events", "Exhibitions & Expos", "Concerts & Shows", "Weddings & Parties"],
    features: [
      "Crowd Management",
      "Entry Screening",
      "Access Control",
      "VIP Assistance",
      "Emergency Handling",
      "Incident Response"
    ]
  },
  {
    title: "VIP Protection",
    desc: "Where applicable and within the scope of client requirements, our trained security personnel provide professional protection services for executives, dignitaries, business leaders, and special guests during meetings, events, and travel.",
    bestFor: ["Executives", "Dignitaries", "Business Leaders", "VIP Guests"],
    features: [
      "Executive Protection",
      "Threat Assessment",
      "Secure Escort Services",
      "Event Security",
      "Confidential Operations",
      "Emergency Response"
    ]
  },
  {
    title: "Bouncer Services",
    desc: "Our Professional Bouncers are trained to maintain order, manage crowds, and ensure the safety of guests at events and commercial venues. They provide effective access control, handle conflicts professionally, and create a secure environment while maintaining excellent customer service.",
    bestFor: ["Events & Concerts", "Hotels & Restaurants", "Clubs & Bars", "Weddings & Private Functions"],
    features: [
      "Crowd Management",
      "Entry & Exit Control",
      "Conflict Resolution",
      "Guest Safety",
      "Emergency Response",
      "Professional Conduct"
    ]
  },
  {
    title: "Gunman Services",
    desc: "Our Licensed Gunmen provide advanced security for high-risk locations, valuable assets, and VIP protection assignments. Every deployment is carried out in compliance with applicable laws and regulations by trained professionals who are prepared to respond effectively to security threats while ensuring public safety.",
    bestFor: ["Banks & ATMs", "VIP Protection", "Industrial Facilities", "High-Risk Locations"],
    features: [
      "Licensed Personnel",
      "Asset Protection",
      "High-Risk Security",
      "Armed Escort",
      "Threat Response",
      "24/7 Deployment"
    ]
  }
];

// 1. Key Benefits
const KEY_BENEFITS = [
  "Rigorous Background Verification",
  "Trained & Uniformed Officers",
  "24×7 On-Site Supervision",
  "Rapid Emergency Response",
  "Visitor & Gate Pass Logging",
  "Perimeter Patrol & Guard Check-ins",
  "Crowd & Access Management",
  "Customized Post Instructions",
  "Annual Guarding Contracts",
  "24×7 Operation Command Desk"
];

// 2. Security Personnel Protocols
const SECURITY_PROTOCOLS = [
  "Strict Visitor Verification & Digital Logs",
  "Material Gate Pass & Vehicle Inspection",
  "Perimeter Night Patrolling & Torch Audits",
  "Fire Safety & Emergency Evacuation Training",
  "CCTV Monitoring Room Coordination",
  "First-Aid & Medical Emergency Assists",
  "Conflict De-escalation & Public Relations",
  "Key Management & Restricted Area Audits",
  "Shift Handover Logs & Supervisor Audits",
  "VIP Escort & Special Detail Management"
];

// 3. Intelligent Operations & Supervisor Checks
const SMART_GUARDING_FEATURES = [
  "QR-Code Guard Patrol Tour Tracking",
  "Real-Time Mobile Incident Reporting",
  "Supervisor Mobile Check-in Audits",
  "24/7 Central Operations Command Center",
  "Automated Attendance & Shift Sync",
  "Immediate Threat & Intrusion Escalation",
  "Biometric & RFID Access Assist",
  "Emergency Panic Button Relay",
  "Daily Operations Log Digitization",
  "Client Feedback & Service Audits"
];

// 4. Guard Deployment Solutions by Sector
const SECTOR_COVERAGE = [
  { 
    title: "Residential Sector", 
    desc: "Vigilant perimeter gating, visitor verification, and night patrol for housing societies and villas.",
    recommendedServices: ["Residential Security Guards", "Visitor Verification", "Entry & Exit Monitoring"],
    images: [
      "/images/services/security-guards/residential-security-guards/img-exiamctq.jpg",
      "/images/services/security-guards/residential-security-guards/img-llicgcl7.jpg"
    ]
  },
  { 
    title: "Commercial & Corporate", 
    desc: "Professional lobby security officers, badge verification, and executive desk assistance.",
    recommendedServices: ["Corporate Office Security", "Commercial Security Guards", "Access Control"],
    images: [
      "/images/services/security-guards/commercial-security-guards/img-0qqf0rjg.jpg",
      "/images/services/security-guards/corporate-office-security/img-jhz9bsil.jpg"
    ]
  },
  { 
    title: "Industrial & Manufacturing", 
    desc: "Perimeter check posts, truck loading dock inspections, and asset theft prevention.",
    recommendedServices: ["Industrial Security Guards", "Vehicle Inspection", "Material Gate Pass Verification"],
    images: [
      "/images/services/security-guards/industrial-security-guards/img-a76ntaw8.jpg",
      "/images/services/security-guards/industrial-security-guards/img-io25lm2p.jpg"
    ]
  },
  { 
    title: "Educational Campuses", 
    desc: "Student protection, visitor screening, and campus traffic safety management.",
    recommendedServices: ["School & College Security", "Student Safety", "Campus Patrolling"],
    images: [
      "/images/services/security-guards/school-college-security/img-0c4i3bfk.jpg",
      "/images/services/security-guards/school-college-security/img-apy5p9sz.jpg"
    ]
  },
  { 
    title: "Healthcare Facilities", 
    desc: "24/7 hospital lobby control, emergency room security support, and parking management.",
    recommendedServices: ["Hospital Security", "Patient & Staff Safety", "Restricted Area Security"],
    images: [
      "/images/services/security-guards/hospital-security/img-0hi8skoy.jpg",
      "/images/services/security-guards/hospital-security/img-sk51hm5s.jpg"
    ]
  },
  { 
    title: "Hospitality & Tourism", 
    desc: "Discreet luxury hotel guarding, guest assistance, and 24/7 CCTV coordination.",
    recommendedServices: ["Hotel Security", "Guest Safety", "Parking Security"],
    images: [
      "/images/services/security-guards/hotel-security/img-2lpwrhv1.jpg",
      "/images/services/security-guards/hotel-security/img-qrx0x7n6.jpg"
    ]
  },
  { 
    title: "Logistics & Warehouses", 
    desc: "Inventory protection, container seal inspection, and round-the-clock perimeter patrols.",
    recommendedServices: ["Warehouse Security", "Inventory Protection", "Loading Dock Monitoring"],
    images: [
      "/images/services/security-guards/warehouse-security/img-pvqpmuq0.jpg",
      "/images/services/security-guards/warehouse-security/img-yis98onh.jpg"
    ]
  },
  { 
    title: "Public Events & VIP", 
    desc: "Crowd control barriers, VIP escort details, and access point screening.",
    recommendedServices: ["Event Security", "VIP Protection", "Crowd Management"],
    images: [
      "/images/services/security-guards/event-security/img-53jld5id.jpg",
      "/images/services/security-guards/vip-protection/img-6095veu5.jpg"
    ]
  }
];

// 5. Core Workflow
const CORE_SERVICES = [
  { step: "01", title: "Site Risk & Security Audit", desc: "Comprehensive vulnerability assessment, entry/exit point analysis, and post deployment planning." },
  { step: "02", title: "Guard Selection & Briefing", desc: "Deployment of background-verified, uniformed guards briefed on site-specific Post Orders." },
  { step: "03", title: "Supervisor Audits & QR Patrols", desc: "Nightly surprise audits, QR-code patrol verification, and digital daily log updates." },
  { step: "04", title: "24×7 Operations Support", desc: "Round-the-clock control room assistance for quick guard replacements and emergency response." }
];

// 6. FAQ Section
const FAQS = [
  {
    q: "How are your security guards trained and verified?",
    a: "All security personnel undergo mandatory police background verification, physical fitness assessments, and specialized training in access control, fire safety, visitor etiquette, emergency evacuation, and incident reporting."
  },
  {
    q: "Do you provide 24/7 security guard deployments?",
    a: "Yes. We provide 24/7 guarding solutions organized into 8-hour or 12-hour shifts with dedicated field supervisors conducting regular day and night audits."
  },
  {
    q: "Can we get customized security guard duties (Post Orders)?",
    a: "Absolutely. Before deployment, our operations team aligns with your facility manager to draft custom Post Orders covering gate pass checks, visitor logs, vehicle registration, and emergency contacts."
  },
  {
    q: "What happens if a security guard is absent or takes leave?",
    a: "We maintain a dedicated reliever pool. In the event of an emergency leave or absence, an equivalent trained guard is immediately deployed to ensure zero gap in site protection."
  }
];

export default function SecurityGuardsServicePage() {
  const [selectedSector, setSelectedSector] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [dbDevices, setDbDevices] = useState<any[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await devicesApi.getDevices({ category: "Security Guard Services" });
        if (res.success && res.data && Array.isArray(res.data.devices)) {
          setDbDevices(res.data.devices);
        }
      } catch (err) {
        console.error("Failed to fetch security guard devices:", err);
      }
    };
    fetchDevices();
  }, []);

  // Merge static list with DB devices sorted by displayOrder
  const allServices = [...SECURITY_GUARD_SERVICES];
  const sortedDbDevices = dbDevices.slice().sort((a, b) => {
    const orderA = (a.displayOrder && a.displayOrder > 0) ? a.displayOrder : 999;
    const orderB = (b.displayOrder && b.displayOrder > 0) ? b.displayOrder : 999;
    if (orderA !== orderB) return orderA - orderB;
    return (a.id || 0) - (b.id || 0);
  });
  sortedDbDevices.forEach((device) => {
    const existingIndex = allServices.findIndex(
      (s) => s.title.toLowerCase().trim() === device.name.toLowerCase().trim()
    );
    const dbImgs = (Array.isArray(device.images) && device.images.length > 0)
      ? device.images
      : (device.imagePath ? [device.imagePath] : []);

    if (existingIndex !== -1) {
      if (dbImgs.length > 0) {
        (allServices[existingIndex] as any).dbImages = dbImgs;
      }
      if (device.description) {
        allServices[existingIndex].desc = device.description;
      }
    } else {
      allServices.push({
        title: device.name,
        desc: device.description || "",
        bestFor: Array.isArray(device.bestFor) ? device.bestFor : [],
        features: Array.isArray(device.keyFeatures) ? device.keyFeatures : [],
        ...(dbImgs.length > 0 ? { dbImages: dbImgs } : {})
      } as any);
    }
  });

  const getSectorImages = (sectorIdx: number) => {
    const sector = SECTOR_COVERAGE[sectorIdx];
    if (!sector) return [];
    
    // Check if any matching dbDevice has uploaded images
    const matchingDevice = dbDevices.find(d => 
      sector.recommendedServices.some(rec => rec.toLowerCase().trim() === d.name?.toLowerCase().trim()) ||
      d.name?.toLowerCase().includes(sector.title.toLowerCase().split(' ')[0])
    );
    
    const dbImgs = (matchingDevice && Array.isArray(matchingDevice.images) && matchingDevice.images.length > 0)
      ? matchingDevice.images
      : (matchingDevice?.imagePath ? [matchingDevice.imagePath] : []);
      
    if (dbImgs.length > 0) {
      return dbImgs;
    }
    
    return sector.images || [];
  };

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
              <span>Security Guard Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Professional Security Personnel for <span className="text-[#38BDF8]">Complete Protection</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto">
              Trained, disciplined, and reliable security guards providing 24/7 physical protection, patrol surveillance, and rapid incident response.
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
                On-Site Protection
              </span>
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900 leading-tight">
                Vigilant Monitoring & Professional Integrity
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                At <strong className="text-slate-900">Family Anchor Facilities Pvt. Ltd.</strong>, we provide trained, disciplined, and reliable security personnel to protect people, property, and business operations. Our security guards are selected through a structured recruitment process and receive training in surveillance, access control, emergency response, visitor management, and professional conduct.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                Whether you require security for residential communities, commercial establishments, industrial facilities, or special events, our personnel deliver dependable protection with professionalism and integrity.
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
                src="/images/about/about-security.png" 
                alt="Uniformed Security Guard Officer" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-zinc-900/90 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 text-white">
                <div className="flex items-center gap-3 text-[#38BDF8] mb-1">
                  <UserCheck className="w-7 h-7" />
                  <span className="font-bebas text-2xl tracking-wide text-white">Trained & Uniformed Officers</span>
                </div>
                <p className="text-xs text-slate-300 font-inter">
                  24/7 site supervision, patrol logs, and emergency response readiness.
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
              Guarding Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Why Choose Our Security Guards?
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

      {/* Hardware Portfolio (10 Cards matching Access Control layout) */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Our Security Services
            </h2>
            <p className="text-blue-100 text-lg font-inter mt-3">
              Explore our range of professional security guard services tailored for every sector and property type.
            </p>
          </div>

          {/* 1 Card Per Row Layout matching Access Control Page */}
          <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto">
            {allServices.map((eq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="group bg-white text-slate-900 rounded-[32px] overflow-hidden border-4 border-sky-300 shadow-2xl hover:border-[#0284C7] transition-all grid md:grid-cols-2 min-h-[360px]"
              >
                {/* Left Side 50%: Image Slider from Category Public Folder */}
                <GuardCardSlider 
                  images={SECURITY_GUARD_IMAGES[eq.title] || []} 
                  dbImages={(eq as any).dbImages}
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

      {/* Protocols & Operations Grid */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Field Protocols */}
            <div className="bg-sky-50/80 rounded-[32px] p-8 md:p-10 border-2 border-sky-200">
              <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
                Standard Protocols
              </span>
              <h3 className="text-4xl font-bebas tracking-wide text-slate-900 mb-6">Guard Operational Standards</h3>
              <p className="text-slate-600 text-sm font-inter mb-6">
                Our personnel adhere to strict site Post Orders covering entry logs, night patrols, emergency alerts, and visitor screening.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {SECURITY_PROTOCOLS.map((tech, tIdx) => (
                  <div key={tIdx} className="bg-white p-3.5 rounded-xl border border-sky-200 flex items-center gap-2.5 shadow-sm text-slate-800 font-inter text-xs font-semibold">
                    <Zap className="w-4 h-4 text-[#0284C7] shrink-0" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Supervision */}
            <div className="bg-[#0070c0] text-white rounded-[32px] p-8 md:p-10 border-2 border-[#38BDF8]/40 shadow-2xl">
              <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block">
                Command Supervision
              </span>
              <h3 className="text-4xl font-bebas tracking-wide text-white mb-6">Smart Audits & Operations</h3>
              <p className="text-blue-100 text-sm font-inter mb-6">
                We combine physical guarding with QR-code patrol tracking, mobile check-ins, and 24/7 central operations command support.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {SMART_GUARDING_FEATURES.map((ai, aIdx) => (
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

      {/* Sector Coverage - Interactive Rectangular Tiles */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white border-t border-sky-400/40">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Sector Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight mb-4">
              Security Guard Solutions by Sector
            </h2>
            <p className="text-blue-100 font-inter text-base">
              Click on any sector tile below to view specialized guarding deployments and post requirements.
            </p>
          </div>

          {/* Rectangular Sector Selection Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mb-12">
            {SECTOR_COVERAGE.map((ind, idx) => {
              const isSelected = selectedSector === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSector(idx)}
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

          {/* Expanded Showcase View for Selected Sector */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSector}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white text-slate-900 rounded-[32px] p-8 md:p-12 border-4 border-sky-300 shadow-2xl max-w-7xl mx-auto"
            >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-6 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-[#0284C7] font-bebas text-lg tracking-widest uppercase block mb-1">
                    Sector Guarding Requirement
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bebas tracking-wide text-slate-900 mb-2">
                    {SECTOR_COVERAGE[selectedSector].title} Guard Force
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base font-inter leading-relaxed max-w-3xl">
                    {SECTOR_COVERAGE[selectedSector].desc}
                  </p>
                </div>

                {/* Recommended Services Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bebas text-sm text-slate-500 uppercase tracking-wider block w-full lg:w-auto">
                    Recommended Coverage:
                  </span>
                  {SECTOR_COVERAGE[selectedSector].recommendedServices.map((eq, rIdx) => (
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
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                {getSectorImages(selectedSector).map((imgUrl: string, imgIdx: number) => {
                  const mediaUrl = getMediaUrl(imgUrl);
                  const cacheBustedUrl = mediaUrl ? (mediaUrl.includes('?') ? `${mediaUrl}&v=2` : `${mediaUrl}?v=2`) : '';
                  return (
                    <div 
                      key={imgIdx} 
                      className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all"
                    >
                      <img 
                        src={cacheBustedUrl || imgUrl} 
                        alt={`${SECTOR_COVERAGE[selectedSector].title} Photo ${imgIdx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-inter opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                        {SECTOR_COVERAGE[selectedSector].recommendedServices[imgIdx % SECTOR_COVERAGE[selectedSector].recommendedServices.length]} Deployment
                      </div>
                    </div>
                  );
                })}
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
              Our Security Deployment Process
            </h2>
            <p className="text-slate-600 text-lg font-inter mt-3">
              From initial risk audit and guard selection to QR patrol audits and 24/7 command support.
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
            Deploy Guard Forces
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Hire Professional Security Guards Today
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8">
            Speak with our security operations team today for site risk audits, supervisor deployment, and customized physical guarding proposals.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              <span>Schedule Guarding Survey</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
