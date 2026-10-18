"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Shield, 
  ShieldCheck, 
  UserCheck, 
  Users, 
  ChevronRight, 
  HeartHandshake, 
  Zap, 
  Wrench, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  BrainCircuit, 
  Eye, 
  FolderGit2,
  Hammer,
  User as UserIcon
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { teamApi, TeamMember } from "@/services/api/teamApi";
import { settingsApi } from "@/services/api/settingsApi";
import { getMediaUrl } from "@/lib/axios";

const LEADERSHIP_RESPONSIBILITIES = [
  "Strategic planning and service management",
  "Client relationship management",
  "Workforce planning and deployment",
  "Quality and performance monitoring",
  "Operational supervision",
  "Compliance and safety management"
];

const SECURITY_PROFESSIONALS = [
  {
    title: "Security Guards",
    desc: "Professional guards responsible for access control, visitor verification, regular patrolling, surveillance, and maintaining a secure environment.",
    icon: <Shield className="w-8 h-8 text-[#38BDF8]" />
  },
  {
    title: "Supervisors",
    desc: "Experienced supervisors who coordinate security teams, monitor personnel performance, maintain discipline, and ensure that assigned duties are properly carried out.",
    icon: <UserCheck className="w-8 h-8 text-[#38BDF8]" />
  },
  {
    title: "Bouncers",
    desc: "Professionally presented personnel trained to manage access, crowd movement, event security, and maintain a safe environment at venues and special events.",
    icon: <Users className="w-8 h-8 text-[#38BDF8]" />
  },
  {
    title: "Armed Security Personnel",
    desc: "Qualified personnel deployed for assignments requiring enhanced security measures, subject to applicable legal and regulatory requirements.",
    icon: <ShieldCheck className="w-8 h-8 text-[#38BDF8]" />
  }
];

const FACILITY_SERVICES = [
  { name: "Housekeeping Staff", icon: <Sparkles className="w-5 h-5" /> },
  { name: "Electricians", icon: <Zap className="w-5 h-5" /> },
  { name: "Plumbers", icon: <Wrench className="w-5 h-5" /> },
  { name: "Carpenters", icon: <Hammer className="w-5 h-5" /> },
  { name: "Maintenance Technicians", icon: <Wrench className="w-5 h-5" /> },
  { name: "Facility Supervisors", icon: <UserCheck className="w-5 h-5" /> },
  { name: "General Support Staff", icon: <Users className="w-5 h-5" /> }
];

const WHY_OUR_TEAM = [
  {
    number: "01",
    title: "Professional",
    desc: "We maintain professional standards in appearance, conduct, communication, and service delivery.",
    icon: <UserCheck className="w-6 h-6 text-[#38BDF8]" />
  },
  {
    number: "02",
    title: "Trained",
    desc: "Our personnel are prepared to perform their assigned responsibilities with discipline and awareness.",
    icon: <BrainCircuit className="w-6 h-6 text-[#38BDF8]" />
  },
  {
    number: "03",
    title: "Reliable",
    desc: "We focus on consistent service and dependable manpower deployment.",
    icon: <Clock className="w-6 h-6 text-[#38BDF8]" />
  },
  {
    number: "04",
    title: "Vigilant",
    desc: "Our security personnel remain alert and attentive to potential risks and unusual situations.",
    icon: <Eye className="w-6 h-6 text-[#38BDF8]" />
  },
  {
    number: "05",
    title: "Team-Oriented",
    desc: "Effective security requires coordination. Our guards, supervisors, management, and facility teams work together.",
    icon: <Users className="w-6 h-6 text-[#38BDF8]" />
  },
  {
    number: "06",
    title: "Client-Focused",
    desc: "We understand that every client has different requirements and tailor our deployment and services accordingly.",
    icon: <HeartHandshake className="w-6 h-6 text-[#38BDF8]" />
  }
];

export default function OurTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    settingsApi.getSettings()
      .then((res: any) => {
        if (res?.data) {
          setSettings(res.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await teamApi.getMembers({ status: "active" });
        if (res.success && res.data) {
          setMembers(res.data.rows);
        }
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const leadershipMembers = members.filter(m => m.category === "leadership");
  const securityMembers = members.filter(m => m.category === "security");
  const facilityMembers = members.filter(m => m.category === "facility");
  const generalMembers = members.filter(m => m.category === "general" || !m.category);

  const renderMemberGrid = (filteredMembers: TeamMember[], darkTheme: boolean = false) => {
    if (filteredMembers.length === 0) return null;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative rounded-3xl overflow-hidden border transition-all shadow-lg hover:shadow-2xl ${
              darkTheme 
                ? "bg-zinc-900/80 border-zinc-800/80 hover:border-[#38BDF8]/40" 
                : "bg-slate-50 border-slate-200/80 hover:border-[#0284C7]/50"
            }`}
          >
            <div className="aspect-[4/5] relative bg-slate-100/50">
              {member.photo ? (
                <img
                  src={getMediaUrl(member.photo)}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${darkTheme ? 'bg-zinc-950' : 'bg-slate-100'}`}>
                  <UserIcon className="w-16 h-16 text-slate-400/80 animate-pulse" />
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bebas tracking-wide text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-[#38BDF8] font-bebas tracking-widest text-lg mb-3 uppercase">
                  {member.role}
                </p>
                
                {member.description && (
                  <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <p className="text-slate-200 text-sm font-inter leading-relaxed line-clamp-4">
                      {member.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0284C7] selection:text-white">
      <Navbar />

      {/* Hero Section */}
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
              <span>Our Team</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Our Team & <span className="text-[#38BDF8]">Leadership</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto">
              Dedicated professionals working together to deliver reliable protection, vigilance, and comprehensive facility services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meet the People & Commitment Section */}
      <section className="py-24 bg-white text-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase block">
                Meet The People Behind Your Security
              </span>
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900 leading-tight">
                Strength In Discipline, Training & Teamwork
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                At <strong className="text-slate-900">Family Anchor Facilities Pvt. Ltd.</strong>, our strength lies in our people. Our team brings together trained security professionals, experienced supervisors, facility specialists, and dedicated management personnel who work together to deliver reliable protection and professional facility services.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-inter">
                We believe that effective security is built on <strong className="text-[#0284C7]">discipline, vigilance, training, teamwork, and responsibility</strong>. Every member of our team is committed to maintaining high standards and ensuring the safety, security, and smooth operation of the facilities we serve.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-slate-50 border border-slate-200 rounded-[32px] p-8 md:p-10 shadow-lg relative"
            >
              <div className="absolute top-6 right-6 text-slate-200 pointer-events-none hidden sm:block">
                <HeartHandshake className="w-24 h-24 stroke-[1]" />
              </div>
              <span className="text-[#0284C7] font-bebas text-lg tracking-widest uppercase block mb-3">
                Our Commitment
              </span>
              <h3 className="text-3xl font-bebas tracking-wide text-slate-900 mb-4">
                Dependable Service Quality
              </h3>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-inter mb-6">
                From frontline security personnel to our management team, every member plays an important role in delivering dependable services to our clients. We continuously focus on professional conduct, proper training, effective supervision, and prompt response to ensure consistent service quality.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Professional Conduct",
                  "Proper Training",
                  "Effective Supervision",
                  "Prompt Response"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 font-inter font-medium text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#0284C7] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Leadership & Dynamic Team Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden border-t border-zinc-800">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/dark-waves.png')] bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase block">
                OUR LEADERSHIP
              </span>
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-white leading-tight">
                Experienced Leadership. Stronger Security.
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed font-inter">
                Our leadership team provides strategic direction, operational oversight, and quality management across all our services. With a strong focus on client satisfaction and operational excellence, our management ensures that every project receives the attention and support it deserves.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-zinc-900/60 border border-zinc-800 backdrop-blur-md p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-bebas tracking-wide text-white mb-6 flex items-center gap-3">
                <FolderGit2 className="text-[#38BDF8] w-6 h-6" />
                Key Management Responsibilities
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {LEADERSHIP_RESPONSIBILITIES.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm md:text-base font-inter leading-tight">{resp}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Dynamic Active Leadership Portfolio */}
          {leadershipMembers.length > 0 && (
            <div className="mt-16 border-t border-zinc-800/80 pt-16">
              <h3 className="text-2xl font-bebas tracking-wide text-slate-400 mb-6 uppercase">Our Executive Leadership Team</h3>
              {renderMemberGrid(leadershipMembers, true)}
            </div>
          )}

          {/* Dynamic Active General Portfolio (fallback for general / uncategorized active members) */}
          {generalMembers.length > 0 && (
            <div className="mt-16 border-t border-zinc-800/80 pt-16">
              <h3 className="text-2xl font-bebas tracking-wide text-slate-400 mb-2 uppercase">Our Active Officers & Team</h3>
              <p className="text-slate-400 text-sm font-inter mb-8">Meet the professional guards, technicians, and specialists serving our clients.</p>
              {renderMemberGrid(generalMembers, true)}
            </div>
          )}

        </div>
      </section>

      {/* Security Professionals & Facility Services Team */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Security Professionals */}
          <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
                OUR SECURITY PROFESSIONALS
              </span>
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900 leading-tight">
                Trained Personnel. Professional Service.
              </h2>
              <p className="text-slate-600 text-base md:text-lg font-inter mt-3">
                Our security teams are selected and prepared to handle a wide range of security requirements across residential, commercial, corporate, industrial, institutional, and other environments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SECURITY_PROFESSIONALS.map((prof, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-slate-50 border border-slate-200/80 p-8 rounded-[28px] hover:border-[#0284C7]/50 shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="p-4 rounded-2xl bg-[#0284C7]/10 text-[#0284C7] w-fit mb-6 group-hover:bg-[#0284C7] group-hover:text-white transition-all shadow-sm">
                    {prof.icon}
                  </div>
                  <h3 className="font-bebas text-2xl tracking-wide text-slate-900 mb-3">{prof.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-inter">{prof.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Dynamic Active Security Guards & Officers */}
            {securityMembers.length > 0 && (
              <div className="mt-20 border-t border-slate-100 pt-16">
                <h3 className="text-2xl font-bebas tracking-wide text-slate-500 mb-2 uppercase">Deployed Security Specialists</h3>
                <p className="text-slate-600 text-sm font-inter mb-8">Trained security guards, supervisors, and bouncers currently active in the field.</p>
                {renderMemberGrid(securityMembers, false)}
              </div>
            )}
          </div>

          {/* Facility Services Team */}
          <div className="border-t border-slate-100 pt-20">
            <div className="grid lg:grid-cols-12 gap-16 items-center mb-16">
              
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 space-y-6"
              >
                <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase block">
                  OUR FACILITY SERVICES TEAM
                </span>
                <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900 leading-tight">
                  Beyond Security — Complete Facility Support
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed font-inter">
                  Our team also supports clients with professional facility and maintenance services designed to keep their premises safe, clean, functional, and well maintained.
                </p>
                <p className="text-slate-500 text-base leading-relaxed font-inter italic">
                  Each professional is assigned according to the specific requirements of the client's facility.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 bg-slate-50 border border-slate-200 p-8 rounded-[32px] shadow-inner"
              >
                <h3 className="font-bebas text-2xl text-slate-800 mb-6 border-b border-slate-200 pb-3">Available Support Professionals</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {FACILITY_SERVICES.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-150 p-4 rounded-2xl flex items-center gap-3 hover:shadow-md transition-shadow group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] border border-sky-100 flex items-center justify-center shrink-0 group-hover:bg-[#0284C7] group-hover:text-white transition-all">
                        {item.icon}
                      </div>
                      <span className="font-inter font-medium text-slate-700 text-base">{item.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Dynamic Active Facility Support Specialists */}
            {facilityMembers.length > 0 && (
              <div className="mt-16 border-t border-slate-100 pt-16">
                <h3 className="text-2xl font-bebas tracking-wide text-slate-500 mb-2 uppercase">Deployed Facility Specialists</h3>
                <p className="text-slate-600 text-sm font-inter mb-8">Housekeeping, maintenance technicians, and plumbers active in the field.</p>
                {renderMemberGrid(facilityMembers, false)}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Why Our Team Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden border-t border-zinc-800">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/dark-waves.png')] bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block">
              OUR ATTRIBUTES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Why Our Team?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_OUR_TEAM.map((attr, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-zinc-900/80 border border-zinc-800/80 p-8 rounded-[28px] hover:border-[#38BDF8]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[#38BDF8] font-bebas text-4xl tracking-wide opacity-50 group-hover:opacity-100 transition-opacity">
                      {attr.number}
                    </span>
                    <div className="p-3 rounded-xl bg-zinc-800 border border-zinc-700/60 text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-black transition-all">
                      {attr.icon}
                    </div>
                  </div>
                  <h3 className="font-bebas text-2xl tracking-wide text-white mb-3">{attr.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-inter">{attr.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Banner / CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0284C7] to-[#0369a1] text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/10 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl space-y-6">
          <span className="font-bebas text-2xl tracking-widest text-sky-200 block uppercase">
            OUR PEOPLE. YOUR SAFETY.
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-none">
            A Strong Team Creates A Secure Environment.
          </h2>
          <p className="text-sky-100 text-lg md:text-xl font-inter max-w-2xl mx-auto">
            At Family Anchor Facilities Pvt. Ltd., we are committed to building long-term relationships through professional people, dependable services, and responsible security management.
          </p>
          <div className="font-bebas text-xl md:text-2xl text-amber-300 tracking-wider">
            Your safety is our responsibility.
          </div>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            {(() => {
              const rawWhatsapp = settings?.whatsapp || settings?.phone || "9324831576";
              const cleanWhatsapp = rawWhatsapp.replace(/\D/g, "");
              const formattedWhatsapp = cleanWhatsapp.length === 10 ? `91${cleanWhatsapp}` : cleanWhatsapp;

              return (
                <a 
                  href={`https://wa.me/${formattedWhatsapp}?text=Hello%20Family%20Anchor%20Facilities,%20I%20would%20like%20to%20inquire%20about%20your%20security%20services.`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="bg-white hover:bg-slate-100 text-[#0284C7] font-bebas text-lg tracking-wider uppercase px-8 py-6 rounded-2xl shadow-xl transition-all">
                    Contact Our Team
                  </Button>
                </a>
              );
            })()}
            <Link href="/contact">
              <Button variant="ghost" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0284C7] font-bebas text-lg tracking-wider uppercase px-8 py-6 rounded-2xl transition-all">
                Submit Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
