"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Shield,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Home,
  Factory,
  GraduationCap,
  HeartPulse,
  Warehouse,
  ChevronDown,
  HelpCircle,
  Award,
  Clock,
  Check,
  Wrench,
  Headset,
  Sparkles,
  Hotel,
  Landmark,
  ShoppingBag,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { servicesApi } from "@/services/api/servicesApi";
import { devicesApi } from "@/services/api/devicesApi";
import { getMediaUrl } from "@/lib/axios";

// ─── Image Slider ───────────────────────────────────────────────────────────────
function CardSlider({ images, categoryTitle }: { images: string[]; categoryTitle: string }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const safeIndex = images.length > 0 ? current % images.length : 0;

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;
    const t = setInterval(() => {
      setCurrent((p) => (p === images.length - 1 ? 0 : p + 1));
    }, 3000);
    return () => clearInterval(t);
  }, [images.length, isPaused]);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-[340px] md:h-full min-h-[340px] bg-slate-100 flex items-center justify-center border-b border-slate-100 md:border-b-0 md:border-r border-slate-200">
        <Shield className="w-20 h-20 text-slate-300" />
      </div>
    );
  }

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

      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((p) => (p === 0 ? images.length - 1 : p - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-[#0284C7] text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent((p) => (p === images.length - 1 ? 0 : p + 1))}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-[#0284C7] text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

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
    </div>
  );
}

// ─── Housekeeping & Facility Management Static Customizations ───
const HOUSEKEEPING_BENEFITS = [
  "Experienced & Verified Professionals",
  "Skilled Technical Workforce",
  "Modern Equipment & Tools",
  "Timely Service Delivery",
  "Flexible Staffing Solutions",
  "Quality Assurance Inspections",
  "Affordable Service Packages",
  "24×7 Customer Support",
  "Customized Facility Plans",
  "Reliable Maintenance Services"
];

const HOUSEKEEPING_INDUSTRIES = [
  { title: "Residential Societies", desc: "Cleanliness and maintenance for apartments, villas, and gated communities.", icon: <Home className="w-6 h-6 text-[#0284C7]" /> },
  { title: "Commercial Buildings", desc: "Daily cleaning and technical upkeep for office towers and business parks.", icon: <Building2 className="w-6 h-6 text-[#0284C7]" /> },
  { title: "Corporate Offices", desc: "Professional housekeeping, pantry support, and desk sanitization.", icon: <Building2 className="w-6 h-6 text-[#0284C7]" /> },
  { title: "Hospitals & Healthcare", desc: "Strict hygiene, sanitization, and specialized medical facility cleaning.", icon: <HeartPulse className="w-6 h-6 text-[#0284C7]" /> },
  { title: "Educational Institutions", desc: "Safe, clean, and disciplined environments for schools and universities.", icon: <GraduationCap className="w-6 h-6 text-[#0284C7]" /> },
  { title: "Hotels & Hospitality", desc: "High-standard housekeeping, guest support, and kitchen hygiene.", icon: <Hotel className="w-6 h-6 text-[#0284C7]" /> },
  { title: "Shopping Malls", desc: "Continuous floor maintenance, washroom sanitation, and trash management.", icon: <ShoppingBag className="w-6 h-6 text-[#0284C7]" /> },
  { title: "Warehouses & Logistics", desc: "Industrial cleaning, debris management, and facility maintenance.", icon: <Warehouse className="w-6 h-6 text-[#0284C7]" /> },
  { title: "Manufacturing Industries", desc: "Plant cleaning, technical maintenance, and skilled worker support.", icon: <Factory className="w-6 h-6 text-[#0284C7]" /> },
  { title: "Government Organizations", desc: "Reliable facility management for administrative complexes and public hubs.", icon: <Landmark className="w-6 h-6 text-[#0284C7]" /> }
];

const HOUSEKEEPING_PROCESS = [
  { step: "01", title: "Requirement Assessment", desc: "Understanding facility size, operational needs, and specific staffing requirements." },
  { step: "02", title: "Site Inspection", desc: "Evaluating premises layout, hygiene standards, and technical maintenance needs." },
  { step: "03", title: "Customized Service Planning", desc: "Designing a tailored facility management schedule and manpower deployment." },
  { step: "04", title: "Professional Staff Deployment", desc: "Deploying trained, uniformed, and background-verified professionals." },
  { step: "05", title: "Quality Monitoring", desc: "Routine field audits, supervisor checks, and performance reviews." },
  { step: "06", title: "Regular Reporting & Support", desc: "Delivering continuous reporting, client feedback updates, and 24/7 assistance." }
];

const HOUSEKEEPING_WHY_FAF = [
  { title: "Experienced & Verified Personnel", desc: "All staff members are background checked, police verified, and trained." },
  { title: "Skilled Technical Workforce", desc: "Certified electricians, plumbers, carpenters, and pantry professionals." },
  { title: "Modern Equipment & Supplies", desc: "Eco-friendly cleaning materials and modern tools for superior results." },
  { title: "Timely & Flexible Delivery", desc: "Flexible shift coverage and prompt response to urgent maintenance calls." },
  { title: "Affordable Custom Packages", desc: "Cost-effective facility management plans tailored to your budget." },
  { title: "24/7 Dedicated Support", desc: "Round-the-clock assistance and regular supervisor inspections on site." }
];

const HOUSEKEEPING_FAQS = [
  {
    q: "What types of facility management services do you provide?",
    a: "We offer comprehensive Housekeeping, Electrician, Plumber, Carpenter, Pantry Staff, and Office Support staff for commercial, residential, and industrial properties."
  },
  {
    q: "Are all your housekeeping and technical staff background verified?",
    a: "Yes. 100% of our staff undergo thorough background verification, identity checks, and professional training before deployment."
  },
  {
    q: "Can we request customized shift timings and staffing levels?",
    a: "Absoluty. We tailor shift coverage, daily/weekly maintenance schedules, and staffing numbers based on your facility's operational hours."
  },
  {
    q: "Do you supply cleaning equipment and eco-friendly materials?",
    a: "Yes. We provide modern cleaning machinery and high-grade, safe, eco-friendly cleaning supplies as part of our package."
  }
];

function parseJsonField(val: any): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return val.split(",").map((s: string) => s.trim()).filter(Boolean); }
  }
  return [];
}

// ─── Dynamic Service Slug Page ───────────────────────────────────────────────────
export default function DynamicServicePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [service, setService] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingService, setLoadingService] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Fetch service details by slug
  useEffect(() => {
    if (!slug) return;
    setLoadingService(true);
    setNotFound(false);

    servicesApi.getServices({ status: "active", limit: 50 })
      .then((res: any) => {
        const list: any[] = res?.data?.services ?? res?.data ?? [];
        const found = list.find((s: any) => s.slug === slug);
        if (!found) {
          setNotFound(true);
        } else {
          setService(found);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoadingService(false));
  }, [slug]);

  // Fetch service categories (devices) for this slug
  useEffect(() => {
    if (!slug) return;
    devicesApi.getDevices({ serviceSlug: slug, limit: 100 })
      .then((res: any) => {
        if (res?.success && res.data?.devices) {
          const sorted = [...res.data.devices].sort((a: any, b: any) => {
            const oA = a.displayOrder > 0 ? a.displayOrder : 999;
            const oB = b.displayOrder > 0 ? b.displayOrder : 999;
            if (oA !== oB) return oA - oB;
            return (a.id || 0) - (b.id || 0);
          });
          setCategories(sorted);
        }
      })
      .catch(() => {});
  }, [slug]);

  const isHousekeeping = slug === "house-keeping-and-other-services";

  if (loadingService) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-[#38BDF8] animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (notFound || !service) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-32 px-4">
          <Shield className="w-20 h-20 text-[#0284C7] opacity-50" />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white text-center">
            Service Not Found
          </h1>
          <p className="text-slate-400 font-inter text-lg text-center max-w-md">
            The service you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-lg tracking-wider uppercase px-8 py-3 rounded-full shadow-lg transition-all hover:scale-105"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const bannerImg = service?.bannerImage ? getMediaUrl(service.bannerImage) : null;

  const keyBenefits = isHousekeeping ? HOUSEKEEPING_BENEFITS : [
    "24×7 Professional Service Execution",
    "Trained & Vetted Personnel",
    "High-Quality Certified Equipment",
    "Customized Operational Solutions",
    "On-Site Quality Audits & Inspections",
    "Rapid Emergency Response",
    "Transparent SLA Tracking",
    "Safety & Regulatory Compliance",
    "Annual Maintenance Contracts (AMC)",
    "24×7 Technical Assistance"
  ];

  const industries = isHousekeeping ? HOUSEKEEPING_INDUSTRIES : [
    { title: "Residential & Societies", desc: "Tailored services for residential complexes and gated societies.", icon: <Home className="w-6 h-6 text-[#0284C7]" /> },
    { title: "Commercial Buildings", desc: "Operational support for corporate towers and retail hubs.", icon: <Building2 className="w-6 h-6 text-[#0284C7]" /> },
    { title: "Industrial & Factories", desc: "Heavy-duty solutions for manufacturing plants and logistics hubs.", icon: <Factory className="w-6 h-6 text-[#0284C7]" /> },
    { title: "Educational Institutions", desc: "Safe, disciplined environments for schools and universities.", icon: <GraduationCap className="w-6 h-6 text-[#0284C7]" /> },
    { title: "Healthcare Facilities", desc: "Sanitized and round-the-clock management for hospitals.", icon: <HeartPulse className="w-6 h-6 text-[#0284C7]" /> },
    { title: "Warehouses & Logistics", desc: "Perimeter and facility management for distribution centers.", icon: <Warehouse className="w-6 h-6 text-[#0284C7]" /> }
  ];

  const processSteps = isHousekeeping ? HOUSEKEEPING_PROCESS : [
    { step: "01", title: "Requirement Assessment", desc: "Understanding facility size and operational scope." },
    { step: "02", title: "Site Inspection", desc: "Evaluating premises layout and technical needs." },
    { step: "03", title: "Customized Service Planning", desc: "Designing a tailored service deployment schedule." },
    { step: "04", title: "Professional Deployment", desc: "Deploying certified personnel and equipment on site." },
    { step: "05", title: "Quality Monitoring", desc: "Routine field audits and supervisor checks." },
    { step: "06", title: "Continuous Support", desc: "Delivering ongoing reporting and 24/7 assistance." }
  ];

  const whyChoosePillars = isHousekeeping ? HOUSEKEEPING_WHY_FAF : [
    { title: "Experienced Professionals", desc: "Certified and thoroughly vetted personnel dedicated to high service standards." },
    { title: "Skilled Technical Workforce", desc: "Top-grade equipment and industry-tested procedures." },
    { title: "Customized Solutions", desc: "Tailored operational strategies aligned specifically to your site." },
    { title: "End-to-End Execution", desc: "From assessment to deployment and maintenance, we handle everything." },
    { title: "24/7 Dedicated Support", desc: "Round-the-clock helpdesk and routine supervisor audits." }
  ];

  const faqs = isHousekeeping ? HOUSEKEEPING_FAQS : [
    {
      q: "How quickly can services be deployed at our facility?",
      a: "We conduct a rapid site survey and deploy trained personnel and equipment within 24 to 48 hours."
    },
    {
      q: "Are the deployed personnel background verified?",
      a: "Yes. 100% of our personnel undergo thorough background checks, police verification, and training."
    },
    {
      q: "Do you offer customized service plans and AMCs?",
      a: "Yes. We tailor customized service packages and Annual Maintenance Contracts (AMC) to suit your layout."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0284C7] selection:text-white">
      <Navbar />

      {/* ── 1. Hero Section (DARK TEXTURE ONLY - NO BACKGROUND IMAGE - MATCHING FIRE SERVICE PAGE) ── */}
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
              <span>{service.title}</span>
            </div>

            <span className="text-[#38BDF8] font-bebas text-2xl tracking-widest uppercase mb-3 block">
              {service.title}
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6 leading-tight">
              {isHousekeeping ? "Professional Housekeeping & Facility Management Services" : service.title}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto font-medium">
              {service.shortDescription || service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Overview Section (TEXT ON LEFT, IMAGE ON RIGHT) ── */}
      {service.description && (
        <section className="py-20 bg-white text-slate-900 border-b border-sky-100">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className={bannerImg ? "grid md:grid-cols-2 gap-12 items-center" : "max-w-4xl mx-auto text-center"}>
              {/* Left Side: Text */}
              <div className="space-y-4 text-left">
                <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase block font-bold">
                  Overview & Scope
                </span>
                <h2 className="text-3xl md:text-5xl font-bebas tracking-wide text-slate-900 leading-tight">
                  Complete Facility & Maintenance Support
                </h2>
                <p className="text-slate-700 text-base md:text-lg leading-relaxed font-inter font-medium whitespace-pre-line">
                  {service.description}
                </p>
              </div>

              {/* Right Side: Image */}
              {bannerImg && (
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-sky-200 aspect-[4/3] group">
                  <img
                    src={bannerImg}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. Key Benefits Section ── */}
      <section className="py-16 bg-sky-50/70 text-slate-900 border-b border-sky-200">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#0284C7] font-bebas text-lg tracking-widest uppercase mb-1 block font-bold">
              Why Choose FAF
            </span>
            <h2 className="text-3xl md:text-5xl font-bebas tracking-wide text-slate-900">
              Key Benefits & Service Standards
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {keyBenefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
                className="bg-white p-4 rounded-2xl border border-sky-200 shadow-sm flex items-center gap-3"
              >
                <div className="p-2 bg-sky-100 rounded-xl text-[#0284C7] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="font-inter text-xs md:text-sm font-semibold text-slate-800 leading-snug">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Service Categories / Sub-Services Cards (Matching Fire Service Cards Layout) ── */}
      {categories.length > 0 && (
        <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
                Our Offerings
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
                {service.title} Services
              </h2>
              <p className="text-blue-100/80 font-inter text-lg mt-4">
                Explore our professional solutions for {service.title.toLowerCase()}.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto">
              {categories.map((cat: any, idx: number) => {
                const cardImages = (Array.isArray(cat.images) && cat.images.length > 0)
                  ? cat.images
                  : cat.imagePath ? [cat.imagePath] : [];
                const bestFor = parseJsonField(cat.bestFor);
                const features = parseJsonField(cat.keyFeatures);

                return (
                  <motion.div
                    key={cat.id ?? idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04, duration: 0.5 }}
                    className="group bg-white text-slate-900 rounded-[32px] overflow-hidden border-4 border-sky-300 shadow-2xl hover:border-[#0284C7] transition-all grid md:grid-cols-2 md:h-[420px]"
                  >
                    {/* Left: Image Slider */}
                    <CardSlider images={cardImages} categoryTitle={cat.name} />

                    {/* Right: Details */}
                    <div className="p-6 md:p-8 flex flex-col justify-between bg-white overflow-hidden">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <h3 className="font-bebas text-3xl md:text-4xl tracking-wide text-slate-900 group-hover:text-[#0284C7] transition-colors leading-tight">
                            {cat.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs font-bebas tracking-wider uppercase text-[#0284C7] font-bold bg-sky-50 border border-sky-200 px-3 py-1 rounded-full shrink-0">
                            <Shield className="w-4 h-4 text-[#0284C7]" />
                            <span>Professional</span>
                          </div>
                        </div>

                        {cat.description && (
                          <p className="text-slate-600 text-xs md:text-sm font-inter leading-relaxed mb-4 line-clamp-3">
                            {cat.description}
                          </p>
                        )}

                        {bestFor.length > 0 && (
                          <div className="mb-4">
                            <span className="font-bebas text-xs tracking-wider uppercase text-[#0284C7] block mb-1.5 font-bold">
                              Best For:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {bestFor.map((bf: string, bIdx: number) => (
                                <span key={bIdx} className="bg-sky-50 text-slate-800 font-inter text-[11px] px-2.5 py-0.5 rounded-full border border-sky-200 font-medium">
                                  {bf}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {features.length > 0 && (
                          <div>
                            <span className="font-bebas text-xs tracking-wider uppercase text-[#0284C7] block mb-1.5 font-bold">
                              Key Features:
                            </span>
                            <ul className="grid grid-cols-2 gap-1.5 font-inter text-xs text-slate-700">
                              {features.map((ft: string, fIdx: number) => (
                                <li key={fIdx} className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                                  <span className="truncate">{ft}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Industries We Serve Grid ── */}
      <section className="py-20 bg-white text-slate-900 border-b border-sky-100">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Sectors Covered
            </span>
            <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900">
              Industries We Serve
            </h2>
            <p className="text-slate-600 font-inter text-lg mt-3">
              We provide tailored operational support for diverse sectors across Delhi NCR.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="p-6 bg-sky-50/70 rounded-3xl border border-sky-200 hover:border-[#0284C7] transition-all shadow-sm hover:shadow-md flex flex-col gap-3"
              >
                <div className="p-3 bg-white rounded-2xl w-fit border border-sky-100 shadow-sm">
                  {ind.icon}
                </div>
                <h3 className="font-bebas text-2xl text-slate-900 tracking-wide">
                  {ind.title}
                </h3>
                <p className="text-slate-600 text-sm font-inter leading-relaxed">
                  {ind.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Service Execution Process (6 Steps) ── */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-b border-zinc-800">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Step-By-Step Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white">
              Our Service Process
            </h2>
            <p className="text-slate-400 font-inter text-lg mt-3">
              A structured methodology ensuring consistent quality, compliance, and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((proc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="p-6 bg-zinc-900/90 rounded-3xl border border-zinc-800 relative group hover:border-[#38BDF8] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-bebas text-5xl text-[#38BDF8]/30 group-hover:text-[#38BDF8] transition-colors block mb-2 font-bold">
                    {proc.step}
                  </span>
                  <h3 className="font-bebas text-2xl text-white tracking-wide mb-2">
                    {proc.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-inter leading-relaxed">
                    {proc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Why Choose Family Anchor Facilities ── */}
      <section className="py-20 bg-white text-slate-900 border-b border-sky-100">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Trusted Excellence
            </span>
            <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900">
              Why Choose Family Anchor Facilities Pvt. Ltd.?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoosePillars.map((why, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                className="p-6 bg-sky-50/80 rounded-3xl border border-sky-200 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center font-bebas text-xl font-bold shadow-md">
                  ✓
                </div>
                <h3 className="font-bebas text-2xl text-slate-900 tracking-wide">
                  {why.title}
                </h3>
                <p className="text-slate-600 text-sm font-inter leading-relaxed">
                  {why.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Frequently Asked Questions ── */}
      <section className="py-20 bg-sky-50/60 text-slate-900 border-b border-sky-200">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Got Questions?
            </span>
            <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-sky-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bebas text-xl text-slate-900 tracking-wide hover:text-[#0284C7] transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#0284C7] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#0284C7]" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5 pt-0 font-inter text-sm text-slate-600 leading-relaxed border-t border-sky-100"
                      >
                        <p className="pt-3">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. Call to Action (CTA) ── */}
      <section className="py-20 bg-gradient-to-r from-sky-50 via-slate-50 to-sky-50 text-slate-900">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block font-bold">
            Keep Your Facility Clean, Safe & Efficient
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Trusted Partner For Manpower & Maintenance Solutions
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8 font-medium">
            Whether you require <strong className="text-slate-900">Housekeeping Staff</strong>, <strong className="text-slate-900">Electricians</strong>, <strong className="text-slate-900">Plumbers</strong>, <strong className="text-slate-900">Carpenters</strong>, or complete <strong className="text-slate-900">Facility Management Services</strong>, Family Anchor Facilities Pvt. Ltd. is your trusted partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all font-bold"
            >
              <span>Contact Us Today</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 border-2 border-[#0284C7] text-[#0284C7] hover:bg-[#0284C7] hover:text-white font-bebas text-xl tracking-wider uppercase px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all font-bold"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
