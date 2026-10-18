"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Cctv, 
  Flame, 
  Fingerprint, 
  Mic, 
  Shield, 
  Building2, 
  Home, 
  Factory, 
  GraduationCap, 
  HeartPulse, 
  Warehouse, 
  Landmark, 
  ChevronRight, 
  X, 
  ChevronLeft, 
  ZoomIn, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getMediaUrl } from "@/lib/axios";
import { galleryApi } from "@/services/api/galleryApi";

const GALLERY_HIGHLIGHTS = [
  "CCTV Camera Installations",
  "Fire Alarm System Projects",
  "Access Control System Installations",
  "Public Address (PA) System Deployments",
  "Security Guard Services",
  "Commercial Security Projects",
  "Residential Security Solutions",
  "Industrial Security Installations",
  "Educational Institution Security",
  "Healthcare Facility Security",
  "Warehouse & Logistics Security",
  "Government Project Installations"
];

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "cctv", label: "CCTV Installation" },
  { id: "fire", label: "Fire Alarm Systems" },
  { id: "access", label: "Access Control Systems" },
  { id: "pa", label: "Public Address (PA) Systems" },
  { id: "guards", label: "Security Guard Services" },
  { id: "commercial", label: "Commercial Projects" },
  { id: "residential", label: "Residential Projects" },
  { id: "industrial", label: "Industrial Projects" },
  { id: "education", label: "Educational Institutions" },
  { id: "healthcare", label: "Healthcare Facilities" },
  { id: "warehouse", label: "Warehouses & Logistics" },
  { id: "government", label: "Government Projects" }
];

const GALLERY_ITEMS = [
  {
    id: 1,
    category: "cctv",
    title: "High-Definition Outdoor PTZ CCTV Installation",
    desc: "24/7 active perimeter surveillance with night vision capabilities.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    tag: "CCTV Installation"
  },
  {
    id: 2,
    category: "cctv",
    title: "Central Security Control Room Console",
    desc: "Multi-screen monitor matrix for real-time facility video monitoring.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    tag: "Control Room Setup"
  },
  {
    id: 3,
    category: "fire",
    title: "Commercial Optical Smoke Detector Deployment",
    desc: "Early hazard smoke & heat sensor system connected to master panel.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    tag: "Fire Alarm System"
  },
  {
    id: 4,
    category: "access",
    title: "Biometric Facial Recognition Access Door Controller",
    desc: "Touchless entry access control system integrated with attendance logs.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    tag: "Access Control Systems"
  },
  {
    id: 5,
    category: "pa",
    title: "Multi-Zone Public Address Speaker Console",
    desc: "Ceiling speaker system for crystal-clear emergency broadcasting.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    tag: "Public Address Systems"
  },
  {
    id: 6,
    category: "guards",
    title: "Uniformed Guard Deployment at Corporate Reception",
    desc: "Trained security officers performing visitor verification and access checks.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    tag: "Security Guard Services"
  },
  {
    id: 7,
    category: "commercial",
    title: "Corporate Tech Park Integrated Security",
    desc: "Turnkey security architecture covering entrance turnstiles and CCTV.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    tag: "Commercial Projects"
  },
  {
    id: 8,
    category: "residential",
    title: "Luxury Housing Society Gatehouse Security",
    desc: "Automated boom barrier and visitor log management for gated community.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    tag: "Residential Projects"
  },
  {
    id: 9,
    category: "industrial",
    title: "Manufacturing Plant Perimeter Security",
    desc: "Thermal imaging cameras and patrol guards securing factory boundaries.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    tag: "Industrial Projects"
  },
  {
    id: 10,
    category: "education",
    title: "University Campus Comprehensive CCTV Network",
    desc: "Indoor and outdoor surveillance protecting students across 15 campus zones.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    tag: "Educational Institutions"
  },
  {
    id: 11,
    category: "healthcare",
    title: "Hospital Critical Ward Access Control",
    desc: "Restricted door access systems for ICUs, pharmacies, and lab rooms.",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
    tag: "Healthcare Facilities"
  },
  {
    id: 12,
    category: "warehouse",
    title: "Logistics Hub Loading Dock Surveillance",
    desc: "High-speed camera monitoring for inventory loading & unloading docks.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    tag: "Warehouses & Logistics"
  },
  {
    id: 13,
    category: "government",
    title: "Government Administrative Complex Security",
    desc: "High-security barrier gates, X-ray scanners, and 24/7 patrol guards.",
    image: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&w=1200&q=80",
    tag: "Government Projects"
  }
];

const LIGHTBOX_FEATURES = [
  "High-resolution image preview",
  "Full-screen viewing experience",
  "Previous & Next image navigation",
  "Smooth zoom & focus functionality",
  "Image captions and project details",
  "Category-based filter browsing",
  "Mobile-friendly responsive viewing",
  "Fast loading performance"
];

const WHY_EXPLORE = [
  "View real project installations",
  "Discover our range of security solutions",
  "Explore industry-specific projects",
  "See the quality of our workmanship",
  "Understand our installation standards",
  "Gain confidence in our expertise and experience"
];

function mapCategoryToId(cat: string): string {
  if (!cat) return "all";
  const lower = cat.toLowerCase();
  if (lower.includes("cctv") || lower.includes("camera") || lower.includes("control room")) return "cctv";
  if (lower.includes("fire") || lower.includes("smoke")) return "fire";
  if (lower.includes("access") || lower.includes("biometric") || lower.includes("door")) return "access";
  if (lower.includes("pa") || lower.includes("public address") || lower.includes("speaker")) return "pa";
  if (lower.includes("guard") || lower.includes("security") || lower.includes("vip")) return "guards";
  if (lower.includes("house") || lower.includes("clean") || lower.includes("facility")) return "housekeeping";
  if (lower.includes("commercial")) return "commercial";
  if (lower.includes("residential")) return "residential";
  if (lower.includes("industrial")) return "industrial";
  if (lower.includes("education") || lower.includes("school")) return "education";
  if (lower.includes("health") || lower.includes("hospital")) return "healthcare";
  if (lower.includes("warehouse") || lower.includes("logistics")) return "warehouse";
  if (lower.includes("government")) return "government";
  return "cctv";
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dbGallery, setDbGallery] = useState<any[]>([]);

  useEffect(() => {
    galleryApi.getGallery({ status: "active", limit: 100 })
      .then(res => { if (res.success && res.data?.gallery) setDbGallery(res.data.gallery); })
      .catch(err => console.error("Failed to fetch gallery:", err));
  }, []);

  // Map DB gallery items to the same shape as GALLERY_ITEMS
  const allGalleryItems = dbGallery.length > 0
    ? dbGallery.map((item, i) => ({
        id: item.id || i + 1,
        category: mapCategoryToId(item.category),
        title: item.title || "",
        desc: item.description || "",
        image: getMediaUrl(item.imagePath || item.image || ""),
        tag: item.category || ""
      }))
    : GALLERY_ITEMS;

  const filteredItems = activeCategory === "all" 
    ? allGalleryItems 
    : allGalleryItems.filter(item => item.category === activeCategory);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredItems.length);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0284C7] selection:text-white">
      <Navbar />

      {/* Hero Header Banner */}
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
              <span>Gallery</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Explore Our Work in <span className="text-[#38BDF8]">Security & Facility Management</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto">
              Welcome to the Gallery of Family Anchor Facilities Pvt. Ltd., where we showcase our successfully completed security projects and service deployments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            Quality Workmanship
          </span>
          <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900 mb-6">
            Dedication to Excellence Across Every Sector
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-4">
            From CCTV surveillance installations and fire alarm systems to access control solutions, public address systems, and professional security guard services, each project reflects our dedication to excellence and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Interactive Gallery & Category Filters */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Project Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Our Gallery
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14 max-w-5xl mx-auto">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`font-bebas text-base md:text-lg tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 shadow-md ${
                    isActive 
                      ? "bg-white text-[#0070c0] shadow-xl scale-105" 
                      : "bg-white/15 text-white hover:bg-white/30 border border-white/20"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedIndex(idx)}
                  className="group relative h-72 rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200/80 hover:border-white cursor-pointer bg-slate-900"
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-between">
                    <div className="flex justify-end">
                      <span className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-5 h-5" />
                      </span>
                    </div>
                    <div>
                      <span className="inline-block bg-[#0284C7] text-white font-bebas text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-2 shadow-sm">
                        {item.tag}
                      </span>
                      <h3 className="font-bebas text-xl tracking-wide text-white leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Interactive Lightbox View Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Left Prev Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 z-50 p-3.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Modal Image Content */}
            <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
              <img 
                src={filteredItems[selectedIndex].image} 
                alt={filteredItems[selectedIndex].title}
                className="max-h-[68vh] w-auto object-contain rounded-2xl border-2 border-white/20 shadow-2xl"
              />
              <div className="mt-5 text-center max-w-2xl px-4">
                <span className="inline-block bg-[#38BDF8] text-slate-900 font-bebas text-sm tracking-widest uppercase px-4 py-1 rounded-full mb-2 font-bold">
                  {filteredItems[selectedIndex].tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-bebas tracking-wide text-white mb-2">
                  {filteredItems[selectedIndex].title}
                </h3>
                <p className="text-slate-300 text-sm md:text-base font-inter">
                  {filteredItems[selectedIndex].desc}
                </p>
              </div>
            </div>

            {/* Right Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 z-50 p-3.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Features & Our Commitment */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Lightbox Features */}
            <div className="bg-sky-50/80 rounded-[32px] p-10 border-2 border-sky-200">
              <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
                Interactive Viewing
              </span>
              <h3 className="text-4xl font-bebas tracking-wide text-slate-900 mb-6">Lightbox View Features</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {LIGHTBOX_FEATURES.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700 font-inter text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Explore Our Gallery */}
            <div className="bg-[#0070c0] text-white rounded-[32px] p-10 border-2 border-[#38BDF8]/40 shadow-2xl">
              <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block">
                Value Assurance
              </span>
              <h3 className="text-4xl font-bebas tracking-wide text-white mb-6">Why Explore Our Gallery?</h3>
              <div className="space-y-4">
                {WHY_EXPLORE.map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-blue-100 font-inter text-base">
                    <ShieldCheck className="w-5 h-5 text-[#38BDF8] shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-sky-50 via-slate-50 to-sky-50 text-slate-900 border-t border-sky-100">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            See Security in Action
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Ready to Build Your Custom Security Setup?
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8">
            Interested in a similar security solution for your organization? Contact us today to discuss your requirements and receive a tailored quotation.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/#contact" 
              className="inline-flex items-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              <span>Contact Us Today</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
