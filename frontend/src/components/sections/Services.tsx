"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cctv, Flame, Fingerprint, Mic, Shield, Sparkles } from "lucide-react";
import { servicesApi } from "@/services/api/servicesApi";
import { getMediaUrl } from "@/lib/axios";

const FALLBACK_BENTO_SERVICES = [
  {
    id: "cctv",
    icon: <Cctv className="w-10 h-10" />,
    title: "CCTV Surveillance Systems",
    subtitle: "AI Live Analytics & HD Monitoring",
    description: "High-definition surveillance systems with 24/7 AI-powered video analytics, motion detection, and remote mobile monitoring capabilities across all facilities.",
    image: "/images/services/cctv-service.png",
    href: "/services/cctv-installation",
    gridClass: "lg:col-span-2 lg:row-span-1",
    isLarge: true
  },
  {
    id: "fire",
    icon: <Flame className="w-10 h-10" />,
    title: "Fire Alarm Systems",
    subtitle: "Early Sensor Detection & Rapid Alerts",
    description: "Advanced smoke detectors, heat sensors, addressable control panels, and automated emergency alert systems.",
    image: "/images/services/fire-alarm-service.png",
    href: "/services/fire-alarm-system",
    gridClass: "lg:col-span-1 lg:row-span-1",
    isLarge: false
  },
  {
    id: "access",
    icon: <Fingerprint className="w-10 h-10" />,
    title: "Access Control Systems",
    subtitle: "Biometrics & Smart Cards",
    description: "Touchless biometric, facial recognition, and card-based access control for high-security areas.",
    image: "/images/services/access-control-service.png",
    href: "/services/access-control-system",
    gridClass: "lg:col-span-1",
    isLarge: false
  },
  {
    id: "guards",
    icon: <Shield className="w-10 h-10" />,
    title: "Security Guard Services",
    subtitle: "Trained & Vetted Personnel",
    description: "Highly trained, uniformed security personnel for industrial, commercial, and residential protection.",
    image: "/images/services/guards-service.png",
    href: "/services/security-guard-services",
    gridClass: "lg:col-span-1",
    isLarge: false
  },
  {
    id: "pa",
    icon: <Mic className="w-10 h-10" />,
    title: "Public Address Systems",
    subtitle: "Clear Zone Intercom & Paging",
    description: "Multi-zone PA and emergency voice evacuation systems for clear facility-wide communication.",
    image: "/images/services/pa-system-service.png",
    href: "/services/public-address-system",
    gridClass: "lg:col-span-1",
    isLarge: false
  }
];

export function ServicesSection() {
  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    servicesApi.getServices({ status: "active", limit: 50 })
      .then((res: any) => {
        const list = res?.data?.services ?? res?.data ?? [];
        if (Array.isArray(list) && list.length > 0) {
          const sorted = [...list].sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
          setDbServices(sorted);
        }
      })
      .catch((err) => console.error("Failed to fetch home services:", err));
  }, []);

  const displayServices = dbServices.length > 0
    ? dbServices.map((svc, idx) => ({
        id: svc.id || svc.slug,
        icon: <Shield className="w-10 h-10 text-[#0284C7]" />,
        title: svc.title,
        subtitle: "Certified Hardware & Services",
        description: svc.shortDescription || svc.description || "Professional security & facility management solution.",
        image: svc.bannerImage ? getMediaUrl(svc.bannerImage) : "/images/services/cctv-service.png",
        href: `/services/${svc.slug}`,
        gridClass: idx === 0 ? "lg:col-span-2 lg:row-span-1" : "lg:col-span-1",
        isLarge: idx === 0
      }))
    : FALLBACK_BENTO_SERVICES;

  return (
    <section id="services" className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
            Our Core Services
          </span>
          <h2 className="text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight mb-6">
            Comprehensive Security & Facility Management
          </h2>
          <p className="text-blue-100/90 text-lg md:text-xl font-inter">
            We provide end-to-end security solutions tailored to meet the unique challenges of your environment.
          </p>
        </div>

        {/* Asymmetrical Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className={`group relative bg-white/95 backdrop-blur-xl text-slate-900 rounded-[28px] overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 border-2 border-transparent hover:shadow-[0_10px_30px_rgba(245,158,11,0.25)] flex flex-col justify-between ${service.gridClass}`}
            >
              <div className="flex flex-col h-full justify-between p-6 md:p-8">
                <div>
                  {/* Top Badge & Header Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 bg-[#0284C7]/10 text-[#0284C7] rounded-2xl border border-[#0284C7]/20 shadow-sm">
                      {service.icon}
                    </div>
                    <span className="text-xs font-bebas tracking-widest uppercase px-3 py-1 bg-sky-50 text-[#0284C7] rounded-full border border-sky-200 font-bold">
                      {service.subtitle}
                    </span>
                  </div>

                  {/* Content & Image Layout */}
                  <div className={service.isLarge ? "grid md:grid-cols-2 gap-6 items-center" : "space-y-4"}>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-poppins font-bold text-slate-900 mb-3 group-hover:text-[#0284C7] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-inter mb-4">
                        {service.description}
                      </p>
                    </div>

                    {/* Image Preview Container */}
                    <div className={`relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center ${service.isLarge ? "h-64" : "h-52"}`}>
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                          service.image.includes('service.png') || service.image.includes('cctv-service') || service.image.includes('access-control-service') || service.image.includes('pa-system-service') || service.image.includes('fire-alarm-service')
                            ? 'object-contain p-4' 
                            : 'object-cover p-0'
                        }`} 
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link href={service.href} className="inline-flex items-center gap-2 text-[#0284C7] font-bebas text-lg tracking-wider uppercase font-semibold group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 text-[#0284C7]" />
                  </Link>

                  <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#F59E0B] text-slate-700 group-hover:text-slate-950 flex items-center justify-center transition-all shadow-sm">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
