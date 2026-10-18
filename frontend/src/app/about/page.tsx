"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  CheckCircle2, 
  HeartHandshake, 
  Award, 
  Users, 
  Lightbulb, 
  Clock, 
  UserCheck, 
  Building2, 
  ChevronRight 
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StatsSection } from "@/components/sections/Stats";
import { IndustriesSection } from "@/components/sections/Industries";

const CORE_VALUES = [
  {
    title: "Integrity",
    description: "We conduct every project with honesty, transparency, and ethical business practices, building trust with every client.",
    icon: <HeartHandshake className="w-8 h-8 text-[#38BDF8]" />,
  },
  {
    title: "Excellence",
    description: "We maintain the highest standards in service delivery, ensuring quality, professionalism, and customer satisfaction.",
    icon: <Award className="w-8 h-8 text-[#38BDF8]" />,
  },
  {
    title: "Customer Commitment",
    description: "Our clients are at the center of everything we do. We focus on understanding their unique security requirements and delivering tailored solutions.",
    icon: <Users className="w-8 h-8 text-[#38BDF8]" />,
  },
  {
    title: "Innovation",
    description: "We embrace modern technologies and continuously improve our services to provide smarter, more efficient security solutions.",
    icon: <Lightbulb className="w-8 h-8 text-[#38BDF8]" />,
  },
  {
    title: "Reliability",
    description: "Our clients depend on us for uninterrupted security services, timely support, and dependable system performance.",
    icon: <Clock className="w-8 h-8 text-[#38BDF8]" />,
  },
  {
    title: "Professionalism",
    description: "Our team follows disciplined work practices, maintains professional conduct, and delivers services with dedication and accountability.",
    icon: <UserCheck className="w-8 h-8 text-[#38BDF8]" />,
  },
  {
    title: "Safety First",
    description: "Every decision we make is guided by our commitment to protecting lives, assets, and business operations.",
    icon: <ShieldCheck className="w-8 h-8 text-[#38BDF8]" />,
  },
];

const WHY_CHOOSE_POINTS = [
  "Comprehensive security and facility management solutions.",
  "Experienced and professionally trained security personnel.",
  "Advanced CCTV, fire alarm, access control, and public address systems.",
  "Customized security solutions for every industry.",
  "High-quality products and installation standards.",
  "Prompt technical support and maintenance services.",
  "Customer-focused approach with transparent communication.",
  "Scalable solutions for small businesses, enterprises, and institutions.",
  "Commitment to quality, safety, and continuous improvement.",
  "Long-term partnerships built on trust, reliability, and exceptional service."
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0284C7] selection:text-white">
      <Navbar />

      {/* Page Header / Hero Banner */}
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
              <span>About Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Protecting People, Property & <span className="text-[#38BDF8]">Peace of Mind</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto">
              Family Anchor Facilities Pvt. Ltd. is a trusted provider of integrated security and facility management solutions, committed to delivering reliable, professional, and technology-driven services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="py-24 bg-white text-slate-900 relative overflow-hidden">
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
                Company Introduction
              </span>
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900 leading-tight">
                Your Trusted Partner in Integrated Security
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                <strong className="text-slate-900">Family Anchor Facilities Pvt. Ltd.</strong> is a trusted provider of integrated security and facility management solutions, committed to delivering reliable, professional, and technology-driven services across residential, commercial, industrial, and institutional sectors. We specialize in creating safe and secure environments through advanced security systems and highly trained security personnel.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                With a customer-centric approach, we offer end-to-end security solutions tailored to the unique requirements of each client. Our expertise includes CCTV surveillance systems, fire alarm systems, access control solutions, public address systems, and professional security guard services. From consultation and system design to installation, monitoring, and ongoing maintenance, we ensure the highest standards of quality and reliability at every stage.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                Our team combines industry expertise with modern technology to help businesses, housing societies, educational institutions, healthcare facilities, retail spaces, warehouses, and government organizations protect their assets, employees, and visitors. Every project is executed with a focus on quality, transparency, timely delivery, and long-term customer satisfaction.
              </p>
              <p className="text-slate-700 text-lg leading-relaxed font-inter border-l-4 border-[#0284C7] pl-4 italic bg-sky-50/80 py-3 rounded-r-xl">
                At Family Anchor Facilities Pvt. Ltd., security is more than a service—it is a responsibility. We strive to build lasting relationships by providing dependable solutions that inspire confidence and peace of mind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative h-[380px] sm:h-[460px] md:h-[540px] w-full rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 group">
                <img 
                  src="/images/about/about-security.png" 
                  alt="Family Anchor Facilities Officer" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 bg-zinc-900/90 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 text-white">
                  <div className="flex items-center gap-3 text-[#38BDF8] mb-2">
                    <ShieldCheck className="w-8 h-8" />
                    <span className="font-bebas text-2xl tracking-wide text-white">Full-Spectrum Protection</span>
                  </div>
                  <p className="text-sm text-slate-300 font-inter">
                    Combining field-tested security personnel with smart surveillance technology nationwide.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <StatsSection />

      {/* Vision & Mission Section */}
      <section className="py-24 bg-black relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/dark-waves.png')] bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-zinc-900/80 backdrop-blur-md p-10 rounded-[32px] border border-zinc-800 hover:border-[#38BDF8]/50 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#38BDF8]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block">
                  Future Direction
                </span>
                <h3 className="text-4xl font-bebas tracking-wide text-white mb-6">Our Vision</h3>
                <p className="text-slate-300 text-lg leading-relaxed font-inter mb-4">
                  To become one of India's most trusted and preferred security and facility management companies by delivering innovative, technology-driven, and customer-focused solutions that create safer environments for businesses, institutions, and communities.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed font-inter">
                  We envision a future where every organization has access to reliable security systems and professional services that ensure complete protection while adapting to evolving technological advancements.
                </p>
              </div>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-zinc-900/80 backdrop-blur-md p-10 rounded-[32px] border border-zinc-800 hover:border-[#38BDF8]/50 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#38BDF8]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block">
                  Our Purpose
                </span>
                <h3 className="text-4xl font-bebas tracking-wide text-white mb-4">Our Mission</h3>
                <p className="text-slate-300 text-lg leading-relaxed font-inter mb-6">
                  Our mission is to provide comprehensive, reliable, and cost-effective security solutions that protect people, property, and business operations. We are committed to:
                </p>
                <ul className="space-y-3">
                  {[
                    "Delivering high-quality security and surveillance solutions.",
                    "Providing professionally trained and disciplined security personnel.",
                    "Implementing modern technologies for enhanced safety and monitoring.",
                    "Building long-term relationships through trust, integrity, and excellent customer service.",
                    "Continuously improving our services through innovation and industry best practices.",
                    "Ensuring timely installation, proactive maintenance, and responsive support."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 font-inter">
                      <CheckCircle2 className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_VALUES.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-[#0070c0] text-white p-8 rounded-[28px] border-2 border-[#38BDF8]/40 hover:border-white shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 w-fit mb-6 text-[#38BDF8] group-hover:bg-white group-hover:text-[#0070c0] transition-all shadow-sm">
                  {val.icon}
                </div>
                <h3 className="font-bebas text-2xl tracking-wide text-white mb-3">{val.title}</h3>
                <p className="text-blue-100/90 text-sm leading-relaxed font-inter">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/dark-waves.png')] bg-cover bg-center bg-no-repeat opacity-45 pointer-events-none z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Competitive Edge
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Why Choose Family Anchor Facilities Pvt. Ltd.?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {WHY_CHOOSE_POINTS.map((pt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-md p-6 rounded-2xl flex items-center gap-4 hover:border-[#38BDF8]/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0 font-bebas text-lg">
                  {idx + 1}
                </div>
                <p className="text-slate-200 font-inter text-base leading-relaxed">{pt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <IndustriesSection />

      <Footer />
    </main>
  );
}
