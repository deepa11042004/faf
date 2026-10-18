"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Cctv, 
  Flame, 
  Fingerprint, 
  Mic, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Building2,
  Users,
  Award,
  Clock,
  ThumbsUp,
  Briefcase,
  Layers,
  ArrowRight,
  Quote,
  Sliders,
  Check,
  X,
  ZoomIn
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getMediaUrl } from "@/lib/axios";
import { projectsApi } from "@/services/api/projectsApi";

// 1. Project Statistics Data
const PROJECT_STATS = [
  { value: "100+", label: "Running Projects", icon: <Briefcase className="w-7 h-7 text-[#0284C7]" /> },
  { value: "100+", label: "Happy Clients", icon: <Users className="w-7 h-7 text-[#0284C7]" /> },
  { value: "10+", label: "Industries Served", icon: <Building2 className="w-7 h-7 text-[#0284C7]" /> },
  { value: "24×7", label: "Support & Maintenance", icon: <Clock className="w-7 h-7 text-[#0284C7]" /> },
  { value: "100%", label: "Satisfaction Focus", icon: <ThumbsUp className="w-7 h-7 text-[#0284C7]" /> }
];

// 2. Featured Projects Data
const FEATURED_PROJECTS = [
  {
    title: "Corporate Office CCTV Surveillance",
    category: "CCTV Installation",
    location: "Noida, Uttar Pradesh",
    status: "Completed",
    desc: "Designed and installed a high-definition IP CCTV surveillance system covering office entrances, workstations, parking areas, and common spaces. The system includes remote monitoring, mobile access, and 24×7 video recording to enhance workplace security.",
    servicesDelivered: ["IP Cameras", "Control Room Setup", "Mobile Live View", "Night Vision IR"],
    images: [
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Fire Alarm System Installation",
    category: "Fire Safety System",
    location: "Gurugram, Haryana",
    status: "Completed",
    desc: "Installed an addressable fire alarm system featuring smoke detectors, heat detectors, manual call points, emergency sounders, and a centralized fire alarm control panel to ensure early fire detection and rapid emergency response.",
    servicesDelivered: ["Addressable Smoke Detectors", "Central Control Panel", "Emergency Sounders", "Fire Audit Briefing"],
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Biometric Access Control Solution",
    category: "Access Control System",
    location: "Delhi NCR",
    status: "Completed",
    desc: "Implemented a biometric access control system with fingerprint and facial recognition devices integrated with electromagnetic locks and attendance management software for secure employee access.",
    servicesDelivered: ["Facial Recognition Terminals", "Maglocks & Brackets", "Attendance Software Sync", "Exit Motion Sensors"],
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Public Address System Installation",
    category: "Public Address System",
    location: "Ghaziabad, Uttar Pradesh",
    status: "Completed",
    desc: "Installed a multi-zone Public Address System with ceiling speakers, horn speakers, amplifiers, paging microphones, and emergency voice announcement capabilities for effective communication across the facility.",
    servicesDelivered: ["100V Line Amplifiers", "Ceiling & Horn Speakers", "Zone Paging Consoles", "EVAC Interlock"],
    images: [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Industrial Security Guard Deployment",
    category: "Security Guard Services",
    location: "Faridabad, Haryana",
    status: "Completed",
    desc: "Deployed professionally trained security personnel for 24×7 industrial security, including gate management, visitor verification, vehicle inspection, and regular perimeter patrols to safeguard assets and operations.",
    servicesDelivered: ["24×7 Guard Forces", "Visitor & Vehicle Checks", "QR Patrol Audits", "Command Supervisor Checks"],
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

// 3. Industries Served List
const INDUSTRIES_SERVED = [
  "Residential Communities",
  "Commercial Buildings",
  "Corporate Offices",
  "Manufacturing Industries",
  "Educational Institutions",
  "Hospitals & Healthcare Facilities",
  "Hotels & Hospitality",
  "Warehouses & Logistics",
  "Government Organizations",
  "Retail & Shopping Complexes"
];

// 4. Execution Methodology Steps
const EXECUTION_PROCESS = [
  { step: "01", title: "Requirement Analysis", desc: "Understanding the client's security challenges, objectives, and operational requirements." },
  { step: "02", title: "Site Survey", desc: "Conducting a detailed inspection to identify risks and determine the optimal system layout." },
  { step: "03", title: "Solution Design", desc: "Preparing a customized security solution with appropriate products and technologies." },
  { step: "04", title: "Professional Installation", desc: "Installing all equipment following industry standards and best practices." },
  { step: "05", title: "Testing & Commissioning", desc: "Verifying system performance, functionality, and reliability before handover." },
  { step: "06", title: "Client Training", desc: "Providing operational training and system documentation for efficient day-to-day management." },
  { step: "07", title: "Maintenance & Support", desc: "Offering preventive maintenance, troubleshooting, and Annual Maintenance Contracts (AMC) for long-term performance." }
];

// 5. Why Clients Trust Us List
const WHY_CLIENTS_TRUST_US = [
  "Experienced Installation Team",
  "High-Quality Security Equipment",
  "Customized Security Solutions",
  "On-Time Project Delivery",
  "Transparent Communication",
  "Competitive Pricing",
  "Reliable After-Sales Support",
  "Annual Maintenance Contracts (AMC)",
  "24×7 Technical Assistance"
];

// 6. Image Gallery Elements Showcase
const GALLERY_SECTIONS = [
  { title: "Project Images", subtitle: "Full Overview", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80" },
  { title: "Before & After Photos", subtitle: "Site Transformation", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80" },
  { title: "Equipment Close-Ups", subtitle: "Hardware Precision", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" },
  { title: "Installation Process", subtitle: "Field Execution", image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80" },
  { title: "Final Completed Site", subtitle: "Ready For Handover", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" }
];

// 7. Client Testimonials
const TESTIMONIALS = [
  {
    quote: "Family Anchor Facilities delivered our CCTV and Access Control project on time with excellent professionalism. The installation quality and after-sales support have been outstanding.",
    client: "Corporate Client",
    location: "Noida"
  },
  {
    quote: "Their team installed our Fire Alarm System efficiently and provided complete training. We are highly satisfied with their service.",
    client: "Facility Manager",
    location: "Gurugram"
  }
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [dbProjects, setDbProjects] = useState<any[]>([]);

  useEffect(() => {
    projectsApi.getProjects({ status: "active", limit: 50 })
      .then(res => { if (res.success && res.data?.projects) setDbProjects(res.data.projects); })
      .catch(err => console.error("Failed to fetch projects:", err));
  }, []);

  // Build unified list: DB projects first (if available), fallback to static
  const allProjects = dbProjects.length > 0
    ? dbProjects.map(p => ({
        title: p.title,
        category: p.category || "",
        location: p.location || "",
        status: p.status === "active" ? "Completed" : p.status,
        desc: p.description || "",
        servicesDelivered: Array.isArray(p.tags) ? p.tags : [],
        images: [
          ...(p.images || []).map((img: any) => getMediaUrl(img.imagePath || img)),
          ...(p.imagePath ? [getMediaUrl(p.imagePath)] : [])
        ].filter(Boolean)
      }))
    : FEATURED_PROJECTS;
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0284C7] selection:text-white">
      <Navbar />

      {/* 1. Hero Section */}
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
              <span>Our Projects</span>
            </div>
            
            <span className="text-[#38BDF8] font-bebas text-2xl tracking-widest uppercase mb-3 block">
              Our Projects
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Delivering Trusted Security Solutions <span className="text-[#38BDF8]">Across Industries</span>
            </h1>
            
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-inter max-w-3xl mx-auto mb-8">
              At <strong>Family Anchor Facilities Pvt. Ltd.</strong>, we take pride in delivering reliable and customized security solutions for residential, commercial, industrial, educational, healthcare, hospitality, government sectors and many more sectors. Every project is executed with careful planning, professional installation, and strict adherence to quality and safety standards.
            </p>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-inter max-w-3xl mx-auto mb-8">
              From CCTV surveillance and fire alarm systems to access control, public address systems, and security guard services, our experienced team ensures every solution is designed to meet the unique security requirements of our clients.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#featured-projects" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
              >
                <span>View Projects</span>
                <ChevronRight className="w-5 h-5" />
              </a>
              <Link 
                href="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bebas text-xl tracking-wider uppercase px-8 py-4 rounded-full border border-white/20 backdrop-blur-md transition-all"
              >
                <span>Request a Consultation</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Project Statistics */}
      <section className="py-16 bg-white text-slate-900 border-b border-sky-100">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {PROJECT_STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="bg-sky-50/80 p-6 rounded-2xl border border-sky-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center"
              >
                <div className="mb-3 p-3 bg-white rounded-xl shadow-sm border border-sky-100">
                  {stat.icon}
                </div>
                <div className="font-bebas text-4xl md:text-5xl text-[#0284C7] font-bold mb-1">
                  {stat.value}
                </div>
                <div className="font-inter text-xs md:text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Showcase */}
      <section id="featured-projects" className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Featured Projects
            </h2>
            <p className="text-blue-100 text-lg font-inter mt-3">
              Explore key security deployments completed for leading organizations across NCR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {allProjects.map((proj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="group bg-white text-slate-900 rounded-[32px] overflow-hidden border-4 border-sky-300 shadow-2xl flex flex-col justify-between hover:border-[#0284C7] transition-all"
              >
                {/* Top Image Section - Shows Single Cover Image */}
                <div 
                  onClick={() => setSelectedProject(proj)}
                  className="relative bg-slate-900 h-64 w-full p-2 overflow-hidden cursor-pointer group/img"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <img 
                      src={proj.images[0] || ""} 
                      alt={`${proj.title} Cover`}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bebas text-lg tracking-wider">
                      <div className="w-10 h-10 rounded-full bg-[#0284C7] flex items-center justify-center shadow-lg transform scale-90 group-hover/img:scale-100 transition-transform">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                      <span>View All Photos ({proj.images.length})</span>
                    </div>
                  </div>



                  <div className="absolute bottom-4 right-4 z-20 bg-black/80 backdrop-blur-md text-white font-bebas text-xs tracking-wider uppercase px-3 py-1 rounded-md border border-white/20">
                    Click to Open Project Gallery
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="bg-sky-50 text-[#0284C7] font-bebas text-xs tracking-wider uppercase px-3 py-1 rounded-full border border-sky-200 font-bold">
                        {proj.category}
                      </span>
                      <div className="flex items-center gap-1 text-slate-500 font-inter text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>{proj.location}</span>
                      </div>
                    </div>

                    <h3 className="font-bebas text-2xl md:text-3xl tracking-wide text-slate-900 mb-3 leading-tight group-hover:text-[#0284C7] transition-colors">
                      {proj.title}
                    </h3>

                    <p className="text-slate-600 text-xs md:text-sm font-inter leading-relaxed mb-5 line-clamp-3">
                      {proj.desc}
                    </p>


                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Industries We Have Served */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Diverse Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Industries We Have Served
            </h2>
            <p className="text-slate-600 text-lg font-inter mt-3">
              Providing specialized security engineering and guard deployments across multiple market sectors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {INDUSTRIES_SERVED.map((ind, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.4 }}
                className="bg-sky-50/80 p-5 rounded-2xl border border-sky-200 text-center font-bebas text-xl tracking-wide text-slate-900 shadow-sm hover:shadow-md hover:bg-white hover:border-[#0284C7] transition-all flex items-center justify-center min-h-[90px]"
              >
                {ind}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Project Execution Process */}
      <section className="py-24 bg-sky-50/80 text-slate-900 relative border-t border-sky-200">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Standardized Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Our Project Execution Process
            </h2>
            <p className="text-slate-600 text-lg font-inter mt-3">
              A systematic 7-step approach ensuring high quality, safety compliance, and on-time project completion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXECUTION_PROCESS.map((proc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="bg-white p-6 rounded-2xl border border-sky-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-bebas text-4xl text-[#0284C7] font-bold mb-3">
                    {proc.step}
                  </div>
                  <h3 className="font-bebas text-2xl tracking-wide text-slate-900 mb-2">{proc.title}</h3>
                  <p className="text-slate-600 text-xs font-inter leading-relaxed">{proc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Clients Trust Us */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Reliable Partner
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Why Clients Trust Us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {WHY_CLIENTS_TRUST_US.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="bg-sky-50/80 p-6 rounded-2xl border border-sky-200 flex items-center gap-4 text-slate-900 shadow-sm hover:shadow-md transition-all"
              >
                <ShieldCheck className="w-6 h-6 text-[#0284C7] shrink-0" />
                <span className="font-bebas text-xl tracking-wide">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Image Gallery Showcase Section */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Site Handover Standards
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Project Image Gallery
            </h2>
            <p className="text-blue-100 text-lg font-inter mt-3">
              Each completed project features meticulous documentation from before & after photos to equipment close-ups.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {GALLERY_SECTIONS.map((gal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 hover:border-white transition-all"
              >
                <img 
                  src={gal.image} 
                  alt={gal.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end">
                  <span className="text-[#38BDF8] font-bebas text-xs tracking-widest uppercase mb-1">
                    {gal.subtitle}
                  </span>
                  <span className="font-bebas text-xl tracking-wide text-white drop-shadow">
                    {gal.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Client Testimonials */}
      <section className="py-24 bg-black text-white relative overflow-hidden border-t border-zinc-800">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/dark-waves.png')] bg-cover bg-center bg-no-repeat opacity-45 pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#38BDF8]/10 rounded-full blur-[130px] pointer-events-none z-0" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-zinc-900/90 backdrop-blur-md rounded-[32px] p-8 md:p-10 border-2 border-zinc-800 hover:border-[#38BDF8]/60 shadow-2xl relative flex flex-col justify-between transition-all"
              >
                <Quote className="w-10 h-10 text-[#38BDF8] opacity-30 mb-4" />
                <p className="text-slate-300 font-inter text-base md:text-lg italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <span className="font-bebas text-2xl tracking-wide text-white">{t.client}</span>
                  <span className="bg-zinc-800 text-[#38BDF8] font-inter text-xs px-3.5 py-1 rounded-full border border-zinc-700 font-semibold">
                    {t.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Call to Action */}
      <section className="py-24 bg-gradient-to-r from-sky-50 via-white to-sky-50 text-slate-900 border-t border-sky-200">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            Partner With Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Let's Secure Your Next Project
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8">
            Whether you're planning a new installation or upgrading your existing security infrastructure, <strong>Family Anchor Facilities Pvt. Ltd.</strong> is ready to deliver reliable, scalable, and cost-effective security solutions tailored to your needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              <span>Get a Free Consultation</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-50 font-bebas text-xl tracking-wider uppercase px-8 py-4 rounded-full border-2 border-slate-300 shadow-md transition-all"
            >
              <span>Request a Project Quote</span>
            </Link>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-900 text-white hover:bg-black font-bebas text-xl tracking-wider uppercase px-8 py-4 rounded-full shadow-lg transition-all"
            >
              <span>Contact Our Experts</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Pop-up Window Gallery Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 text-white rounded-[32px] border-4 border-sky-400 max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
                <div>
                  <span className="text-[#38BDF8] font-bebas text-sm tracking-wider uppercase block mb-1">
                    {selectedProject.category} • {selectedProject.location}
                  </span>
                  <h3 className="font-bebas text-2xl md:text-4xl text-white tracking-wide">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-11 h-11 rounded-full bg-zinc-800 hover:bg-[#0284C7] text-white flex items-center justify-center transition-all shadow-lg shrink-0"
                  aria-label="Close Pop-up"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* All Project Images Showcase Grid inside Pop-up Window */}
              <div className="p-6 md:p-8 flex-1 overflow-y-auto max-h-[70vh] bg-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedProject.images.map((imgUrl: string, iIdx: number) => (
                    <div key={iIdx} className="group relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-zinc-800 shadow-xl">
                      <img
                        src={imgUrl}
                        alt={`${selectedProject.title} Photo ${iIdx + 1}`}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white font-bebas text-xs tracking-wider uppercase px-3 py-1 rounded-md border border-white/20">
                        {selectedProject.title} • Photo {iIdx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer Meta */}
              <div className="p-6 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-300 font-inter font-medium">
                  Total {selectedProject.images.length} high-resolution project site photos available
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/contact"
                    className="bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-sm tracking-wider uppercase px-6 py-3 rounded-full transition-all shadow-lg inline-flex items-center gap-2"
                  >
                    <span>Inquire About This Project</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
