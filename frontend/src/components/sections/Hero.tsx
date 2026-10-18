"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { settingsApi } from "@/services/api/settingsApi";

export function Hero() {
  const [settings, setSettings] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  useEffect(() => {
    settingsApi.getSettings()
      .then((res: any) => {
        if (res?.data) {
          setSettings(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const rawWhatsapp = settings?.whatsapp || settings?.phone || "9324831576";
  const cleanWhatsapp = rawWhatsapp.replace(/\D/g, "");
  const formattedWhatsapp = cleanWhatsapp.length === 10 ? `91${cleanWhatsapp}` : cleanWhatsapp;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-slate-900 bg-white">
      {/* Full Header Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/new%20header.mp4" type="video/mp4" />
        </video>
        {/* Subtle Dark Overlay for high contrast without white blur */}
        <div className="absolute inset-0 bg-slate-950/45 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-36 lg:pt-40 pb-20">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-white/20 backdrop-blur-md shadow-md w-fit"
          >
            <Shield className="text-[#0284C7] w-4 h-4" />
            <span className="font-bebas text-sm tracking-widest uppercase text-slate-900 font-semibold">
              Top Rated Security Agency
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-poppins font-extrabold text-white leading-tight drop-shadow-md">
            Protecting <br />
            What <br />
            <span className="text-[#38BDF8] drop-shadow-md">
              Matters Most
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-100 max-w-xl font-inter leading-relaxed font-medium drop-shadow-sm">
            Delivering advanced surveillance systems, fire safety solutions,
            access control and professional security services for homes, businesses,
            industries and institutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a 
              href={`https://wa.me/${formattedWhatsapp}?text=Hello%20Family%20Anchor%20Facilities,%20I%20would%20like%20to%20get%20a%20free%20quote%20for%20security%20services.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase shadow-2xl hover:scale-105 transition-all w-full sm:w-auto px-8 py-6 rounded-full font-bold">
                Get a Free Quote
              </Button>
            </a>
            <Link href="/services">
              <Button size="lg" className="bg-white hover:bg-slate-50 text-slate-900 font-bebas text-xl tracking-wider uppercase border-2 border-slate-200 shadow-xl hover:scale-105 transition-all w-full sm:w-auto px-8 py-6 rounded-full font-bold">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 24/7 Active Security Badge Overlay positioned at absolute bottom right edge of Hero section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-6 right-3 md:bottom-8 md:right-5 lg:right-6 z-20 hidden md:flex items-center justify-end"
      >
        <div className="bg-white/80 backdrop-blur-md p-5 md:p-6 rounded-3xl border border-slate-300 shadow-xl max-w-xs md:max-w-sm text-slate-900">
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#10B981]"></span>
            </span>
            <span className="font-bebas text-xl md:text-2xl tracking-wider uppercase text-slate-900">24/7 Active Security</span>
          </div>
          <p className="text-slate-700 text-xs md:text-sm font-inter leading-relaxed">
            Real-time monitoring, rapid emergency dispatch, and field-tested security personnel protecting assets around the clock.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
