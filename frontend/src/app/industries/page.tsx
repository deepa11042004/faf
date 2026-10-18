"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Building2, 
  Factory, 
  GraduationCap, 
  HeartPulse, 
  Hotel, 
  Warehouse, 
  Landmark, 
  Home, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  Award, 
  Wrench, 
  Headset, 
  Sliders 
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProcessSection } from "@/components/sections/Process";

const INDUSTRIES_DATA = [
  {
    id: "residential",
    title: "Residential",
    tagline: "Safe Homes, Secure Communities",
    description: "We provide comprehensive security solutions for apartments, villas, gated communities, and residential complexes to ensure the safety of residents and their properties. Our services combine modern surveillance technology with professional security personnel to create a secure living environment.",
    icon: <Home className="w-8 h-8 text-[#0284C7]" />,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    solutions: [
      "CCTV Surveillance Systems",
      "Security Guard Services",
      "Visitor Management",
      "Access Control Systems",
      "Fire Alarm Systems",
      "Public Address Systems",
      "Society Entrance Security",
      "Parking Area Monitoring"
    ],
    idealFor: "Apartments • Villas • Housing Societies • Residential Complexes • Gated Communities"
  },
  {
    id: "commercial",
    title: "Commercial",
    tagline: "Smart Security for Growing Businesses",
    description: "Commercial properties require continuous monitoring and controlled access to protect employees, customers, and valuable business assets. We provide integrated security solutions that help businesses maintain a safe, secure, and productive working environment.",
    icon: <Building2 className="w-8 h-8 text-[#0284C7]" />,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    solutions: [
      "Office CCTV Monitoring",
      "Access Control Systems",
      "Reception Security",
      "Visitor Management",
      "Fire Alarm Systems",
      "Public Address Systems",
      "Security Guard Deployment",
      "Emergency Response Planning"
    ],
    idealFor: "Office Buildings • Shopping Complexes • Retail Stores • Business Centers • Financial Institutions"
  },
  {
    id: "industrial",
    title: "Industrial",
    tagline: "Advanced Protection for Industrial Operations",
    description: "Industrial facilities require specialized security due to large premises, valuable equipment, and operational risks. Our industrial security solutions help protect assets, monitor critical areas, and ensure uninterrupted business operations.",
    icon: <Factory className="w-8 h-8 text-[#0284C7]" />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    solutions: [
      "Factory Surveillance",
      "Perimeter Security",
      "Warehouse Monitoring",
      "Employee Access Control",
      "Fire Detection Systems",
      "Security Patrol Services",
      "Vehicle Entry Management",
      "Emergency Response Support"
    ],
    idealFor: "Manufacturing Units • Production Plants • Industrial Parks • Logistics Centers • Processing Facilities"
  },
  {
    id: "educational",
    title: "Educational",
    tagline: "Creating Safe Learning Environments",
    description: "Educational institutions need reliable security to protect students, faculty, visitors, and campus infrastructure. We provide modern security systems and trained personnel to maintain a safe and secure educational environment.",
    icon: <GraduationCap className="w-8 h-8 text-[#0284C7]" />,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    solutions: [
      "Campus CCTV Surveillance",
      "Entry & Exit Monitoring",
      "Student Safety Solutions",
      "Fire Alarm Systems",
      "Public Address Systems",
      "Visitor Management",
      "Security Guard Services",
      "Emergency Communication"
    ],
    idealFor: "Schools • Colleges • Universities • Coaching Institutes • Training Centers"
  },
  {
    id: "healthcare",
    title: "Healthcare",
    tagline: "Protecting Healthcare Facilities with Reliable Security",
    description: "Healthcare institutions require continuous security to ensure the safety of patients, medical staff, visitors, and critical infrastructure. Our specialized healthcare security solutions support uninterrupted medical operations while maintaining a secure environment.",
    icon: <HeartPulse className="w-8 h-8 text-[#0284C7]" />,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    solutions: [
      "Hospital CCTV Systems",
      "Access Control",
      "Emergency Communication Systems",
      "Fire Detection & Alarm Systems",
      "Visitor Management",
      "Security Guard Services",
      "Pharmacy & Critical Area Security",
      "24×7 Surveillance"
    ],
    idealFor: "Hospitals • Clinics • Medical Centers • Diagnostic Laboratories • Nursing Homes"
  },
  {
    id: "hospitality",
    title: "Hospitality",
    tagline: "Delivering Safety with Exceptional Guest Experience",
    description: "Hotels and hospitality businesses require professional security that protects guests while maintaining a welcoming atmosphere. Our integrated solutions ensure secure operations without compromising customer comfort.",
    icon: <Hotel className="w-8 h-8 text-[#0284C7]" />,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    solutions: [
      "Hotel CCTV Surveillance",
      "Reception Security",
      "Fire Alarm Systems",
      "Public Address Systems",
      "Event Security",
      "Parking Security",
      "Emergency Response Planning"
    ],
    idealFor: "Hotels • Resorts • Banquet Halls • Convention Centers • Guest Houses"
  },
  {
    id: "warehouses",
    title: "Warehouses & Logistics",
    tagline: "Securing Inventory and Supply Chains",
    description: "Warehouses and logistics facilities store valuable inventory and operate around the clock. Our security solutions help prevent theft, unauthorized access, and operational disruptions while ensuring complete visibility across the facility.",
    icon: <Warehouse className="w-8 h-8 text-[#0284C7]" />,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    solutions: [
      "Warehouse CCTV Monitoring",
      "Access Control Systems",
      "Loading Dock Surveillance",
      "Security Guard Services",
      "Vehicle Entry Management",
      "Fire Detection Systems",
      "Perimeter Security",
      "Inventory Protection"
    ],
    idealFor: "Warehouses • Distribution Centers • Cold Storage Facilities • Logistics Parks • Supply Chain Hubs"
  },
  {
    id: "government",
    title: "Government",
    tagline: "Trusted Security Solutions for Public Infrastructure",
    description: "Government organizations require dependable security systems that meet high standards of safety, reliability, and operational efficiency. We provide customized solutions for public institutions, administrative offices, and government facilities.",
    icon: <Landmark className="w-8 h-8 text-[#0284C7]" />,
    image: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&w=800&q=80",
    solutions: [
      "CCTV Surveillance",
      "Access Control Systems",
      "Security Guard Deployment",
      "Fire Alarm Systems",
      "Public Address Systems",
      "Visitor Management",
      "Perimeter Security",
      "Emergency Communication Systems"
    ],
    idealFor: "Government Offices • Administrative Buildings • Public Service Centers • Municipal Facilities • Infrastructure Projects"
  }
];

const WHY_TRUST_US = [
  {
    title: "Industry-Specific Security Solutions",
    desc: "We understand the operational requirements of different industries and deliver customized security strategies that address their unique challenges.",
    icon: <Sliders className="w-7 h-7 text-[#0070c0]" />
  },
  {
    title: "Advanced Security Technology",
    desc: "Our solutions integrate the latest surveillance systems, access control technologies, fire safety equipment, and communication systems for comprehensive protection.",
    icon: <Cpu className="w-7 h-7 text-[#0070c0]" />
  },
  {
    title: "Experienced Professionals",
    desc: "Our skilled technicians and trained security personnel ensure every project is executed with professionalism, precision, and adherence to industry standards.",
    icon: <Award className="w-7 h-7 text-[#0070c0]" />
  },
  {
    title: "End-to-End Services",
    desc: "From consultation and risk assessment to installation, maintenance, and ongoing support, we provide complete security solutions under one roof.",
    icon: <Wrench className="w-7 h-7 text-[#0070c0]" />
  },
  {
    title: "Reliable Support",
    desc: "Our dedicated support team ensures prompt assistance, preventive maintenance, and long-term system reliability, helping clients maintain a safe and secure environment at all times.",
    icon: <Headset className="w-7 h-7 text-[#0070c0]" />
  }
];

export default function IndustriesPage() {
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
              <span>Industries We Serve</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Security Solutions Tailored for <span className="text-[#38BDF8]">Every Industry</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto">
              At Family Anchor Facilities Pvt. Ltd., we deliver specialized physical and technological protection across residential, commercial, industrial, and institutional environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            Specialized Protection
          </span>
          <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900 mb-6">
            Customized Strategies for Unique Sector Operational Risks
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-4">
            Whether it's safeguarding residential communities, protecting industrial facilities, or securing commercial establishments, our experienced team delivers customized solutions that enhance safety, improve operational efficiency, and provide complete peace of mind.
          </p>
        </div>
      </section>

      {/* Detailed Industry Sections Listing */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Sectors We Secure
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Comprehensive Sector Coverage
            </h2>
          </div>

          <div className="flex flex-col gap-16">
            {INDUSTRIES_DATA.map((ind, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  id={ind.id}
                  key={ind.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className={`bg-white/95 backdrop-blur-xl rounded-[32px] border-4 border-sky-300 shadow-2xl p-8 md:p-12 text-slate-900 grid lg:grid-cols-2 gap-10 items-center ${
                    isEven ? "" : "lg:grid-flow-dense"
                  }`}
                >
                  {/* Content Left */}
                  <div className={isEven ? "" : "lg:col-start-2"}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200 shadow-sm">
                        {ind.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bebas tracking-wide text-slate-900 leading-none">
                          {ind.title}
                        </h3>
                        <span className="text-[#0284C7] font-bebas text-lg tracking-wider block mt-1">
                          {ind.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Image (Placed directly below title/tagline header) */}
                    <div className="lg:hidden relative h-[240px] rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg mb-6 group">
                      <img 
                        src={ind.image} 
                        alt={ind.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Description Paragraph (Placed below mobile image) */}
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-inter mb-6">
                      {ind.description}
                    </p>

                    {/* Solutions List */}
                    <div className="mb-6">
                      <h4 className="font-bebas text-xl tracking-wide text-[#0284C7] mb-3 uppercase">Key Solutions</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {ind.solutions.map((sol, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-slate-700 text-sm font-inter">
                            <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                            <span>{sol}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ideal For Badge */}
                    <div className="bg-sky-50/90 border border-sky-200/80 p-4 rounded-2xl">
                      <span className="font-bebas text-sm tracking-wider uppercase text-[#0284C7] block mb-1">Ideal For</span>
                      <p className="text-slate-700 text-xs md:text-sm font-inter font-medium leading-relaxed">
                        {ind.idealFor}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Image Right */}
                  <div className={`hidden lg:block relative h-[360px] md:h-[420px] rounded-[24px] overflow-hidden border-2 border-slate-200 shadow-xl group ${isEven ? "" : "lg:col-start-1"}`}>
                    <img 
                      src={ind.image} 
                      alt={ind.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Industries Trust Us */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Proven Trust
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Why Industries Trust Family Anchor Facilities Pvt. Ltd.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_TRUST_US.map((item, idx) => (
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

      <ProcessSection />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-sky-50 via-slate-50 to-sky-50 text-slate-900 border-t border-sky-100">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            Partner With Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Building Safer Environments Across Every Industry
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8">
            No matter your industry, <strong>Family Anchor Facilities Pvt. Ltd.</strong> is committed to delivering dependable, technology-driven security solutions that protect people, property, and business operations.
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
