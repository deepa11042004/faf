"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  CheckCircle2, 
  ChevronRight, 
  Sliders, 
  Cpu, 
  Award, 
  Wrench, 
  Headset, 
  Shield,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProcessSection } from "@/components/sections/Process";
import { IndustriesSection } from "@/components/sections/Industries";
import { servicesApi } from "@/services/api/servicesApi";
import { getMediaUrl } from "@/lib/axios";

const WHY_CHOOSE_SERVICES = [
  {
    title: "Customized Security Solutions",
    desc: "Every client has unique security requirements. We design solutions tailored to your property, industry, and operational needs.",
    icon: <Sliders className="w-7 h-7 text-[#0070c0]" />
  },
  {
    title: "Advanced Technology",
    desc: "We use modern security equipment and industry-leading technologies to deliver reliable, efficient, and future-ready security systems.",
    icon: <Cpu className="w-7 h-7 text-[#0070c0]" />
  },
  {
    title: "Professional Expertise",
    desc: "Our experienced technicians and trained security personnel ensure every project is completed with professionalism, precision, and attention to detail.",
    icon: <Award className="w-7 h-7 text-[#0070c0]" />
  },
  {
    title: "End-to-End Service",
    desc: "From consultation and system design to installation, maintenance, and ongoing support, we provide complete security solutions under one roof.",
    icon: <Wrench className="w-7 h-7 text-[#0070c0]" />
  },
  {
    title: "Quality & Reliability",
    desc: "We prioritize quality products, industry best practices, and dependable service to ensure long-term performance and customer satisfaction.",
    icon: <Shield className="w-7 h-7 text-[#0070c0]" />
  },
  {
    title: "24×7 Support",
    desc: "Our dedicated support team is always available to assist with technical issues, maintenance, and emergency service requirements.",
    icon: <Headset className="w-7 h-7 text-[#0070c0]" />
  }
];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    servicesApi.getServices({ status: "active", limit: 50 })
      .then((res: any) => {
        const list = res?.data?.services ?? res?.data ?? [];
        if (Array.isArray(list)) {
          setServices(
            [...list].sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
          );
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
              <span>Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Comprehensive Security Solutions for <span className="text-[#38BDF8]">Every Environment</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto">
              At Family Anchor Facilities Pvt. Ltd., we deliver integrated security and facility management solutions designed to protect people, property, and business operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            End-To-End Protection
          </span>
          <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900 mb-6">
            Tailored Security Infrastructure & Management
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-4">
            Our services combine advanced technology, professional expertise, and industry best practices to provide reliable protection across residential, commercial, industrial, and institutional sectors.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed font-inter">
            Whether you need a single security system or a complete security infrastructure, our experienced team ensures seamless planning, installation, maintenance, and ongoing support.
          </p>
        </div>
      </section>

      {/* Detailed Services Listing Section */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Explore Our Core Offerings
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-10 h-10 text-[#38BDF8] animate-spin" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center text-slate-300 py-16 font-inter text-lg">
              No services available at the moment.
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              {services.map((srv, idx) => {
                const isEven = idx % 2 === 0;
                const serviceHref = `/services/${srv.slug}`;
                // Use bannerImage from API, fallback to placeholder
                const imgSrc = srv.bannerImage
                  ? getMediaUrl(srv.bannerImage)
                  : "/images/legacy/about-cctv.png";
                return (
                  <motion.div
                    id={srv.slug}
                    key={srv.id ?? srv.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className={`bg-white/95 backdrop-blur-xl rounded-[32px] border-4 border-sky-300 shadow-2xl p-8 md:p-12 text-slate-900 grid lg:grid-cols-2 gap-10 items-center ${
                      isEven ? "" : "lg:grid-flow-dense"
                    }`}
                  >
                    {/* Text Details */}
                    <div className={isEven ? "" : "lg:col-start-2"}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 shadow-sm">
                          <Shield className="w-10 h-10 text-[#0284C7]" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bebas tracking-wide text-slate-900">
                          {srv.title}
                        </h3>
                      </div>

                      {/* Mobile Image */}
                      <div className="lg:hidden relative h-[240px] rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg mb-6 group">
                        <img
                          src={imgSrc}
                          alt={srv.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      <p className="text-slate-600 text-base md:text-lg leading-relaxed font-inter mb-6">
                        {srv.shortDescription || srv.description || "Professional security and facility management services tailored to your needs."}
                      </p>

                      {/* Dedicated Service Page Link */}
                      <Link
                        href={serviceHref}
                        className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-lg tracking-wider uppercase px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all"
                      >
                        <span>Explore {srv.title} Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Desktop Visual Image */}
                    <div className={`hidden lg:block relative h-[360px] md:h-[420px] rounded-[24px] overflow-hidden border-2 border-slate-200 shadow-xl group ${isEven ? "" : "lg:col-start-1"}`}>
                      <img
                        src={imgSrc}
                        alt={srv.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Services Section */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Service Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Why Choose Our Services?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_SERVICES.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-[#0070c0] text-white p-8 rounded-[28px] border-2 border-[#38BDF8]/40 hover:border-white shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="p-4 rounded-2xl bg-white text-[#0070c0] w-fit mb-6 shadow-md border border-white/50 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bebas text-2xl tracking-wide text-white mb-3">{item.title}</h3>
                <p className="text-blue-100/90 text-sm leading-relaxed font-inter">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Service Process Section */}
      <ProcessSection />

      {/* Industries We Serve Section */}
      <IndustriesSection />

      {/* Call to Action Banner */}
      <section className="py-20 bg-gradient-to-r from-sky-50 via-slate-50 to-sky-50 text-slate-900 border-t border-sky-100">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            Take Action Today
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Secure Your Business with Confidence
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8">
            Whether you're looking for advanced surveillance systems, fire safety solutions, access control, professional security guards, or integrated security services, <strong>Family Anchor Facilities Pvt. Ltd.</strong> is your trusted partner for reliable protection and long-term peace of mind.
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
