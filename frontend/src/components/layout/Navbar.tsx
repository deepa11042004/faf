"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Layers, Shield, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { servicesApi } from "@/services/api/servicesApi";
import { settingsApi } from "@/services/api/settingsApi";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/our-team" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const FALLBACK_VIEW_ALL = {
  label: "All Services Overview",
  href: "/services",
  desc: "Explore Our Full Range of Solutions",
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [serviceItems, setServiceItems] = useState<{ label: string; href: string; desc: string }[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    settingsApi.getSettings()
      .then((res: any) => {
        if (res?.data) {
          setSiteSettings(res.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    servicesApi.getServices({ status: "active", limit: 50 })
      .then((res: any) => {
        const list = res?.data?.services ?? res?.data ?? [];
        if (Array.isArray(list) && list.length > 0) {
          const items = list
            .sort((a: any, b: any) => {
              if (a.displayOrder !== b.displayOrder) {
                return (a.displayOrder ?? 0) - (b.displayOrder ?? 0);
              }
              const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return timeA - timeB;
            })
            .map((svc: any) => ({
              label: svc.title,
              href: `/services/${svc.slug}`,
              desc: svc.shortDescription ?? "",
            }));
          setServiceItems([...items, FALLBACK_VIEW_ALL]);
        }
      })
      .catch(() => {
        // Keep empty; fallback will show "All Services Overview" link only
      });
  }, []);

  const navServiceItems = serviceItems.length > 0
    ? serviceItems
    : [FALLBACK_VIEW_ALL];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800 shadow-2xl py-3 text-white"
          : "bg-transparent py-5 border-b border-transparent text-slate-900"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white p-1 rounded-2xl shadow-md border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                src="/logo.png"
                alt="Family Anchor Facilities"
                width={180}
                height={90}
                className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col mt-1">
              <span className="font-bebas text-2xl sm:text-3xl md:text-4xl tracking-widest leading-none text-white drop-shadow-sm">
                FAMILY ANCHOR
              </span>
              <span className="font-bebas text-sm sm:text-base md:text-xl tracking-[0.15em] leading-none mt-0.5 text-[#38BDF8] drop-shadow-sm">
                FACILITIES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className={cn(
              "flex items-center gap-6 px-7 py-2 rounded-full border transition-all duration-500 shadow-md backdrop-blur-md relative",
              isScrolled 
                ? "border-slate-700/70 bg-slate-800/80 text-white" 
                : "border-slate-300/80 bg-white/90 text-slate-900"
            )}>
              {NAV_LINKS.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <li
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setIsServicesHovered(true)}
                      onMouseLeave={() => setIsServicesHovered(false)}
                    >
                      <div className="flex items-center gap-1 cursor-pointer py-1">
                        <Link
                          href={link.href}
                          className={cn(
                            "font-bebas text-lg tracking-wider uppercase transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 hover:after:w-full after:transition-all font-medium flex items-center gap-1",
                            isScrolled ? "text-slate-100 hover:text-[#38BDF8] after:bg-[#38BDF8]" : "text-slate-900 hover:text-[#0284C7] after:bg-[#0284C7]"
                          )}
                        >
                          {link.label}
                          <ChevronDown className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            isServicesHovered ? "rotate-180 text-[#38BDF8]" : ""
                          )} />
                        </Link>
                      </div>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isServicesHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.96 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full -left-20 pt-4 w-96 z-50"
                          >
                            <div className="bg-[#0284C7]/95 backdrop-blur-2xl border-2 border-sky-300/40 shadow-[0_20px_50px_rgba(2,132,199,0.4)] rounded-2xl p-3 grid grid-cols-1 gap-1 text-white">
                              {navServiceItems.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/15 transition-all duration-200 group"
                                  onClick={() => setIsServicesHovered(false)}
                                >
                                  <div className="p-2.5 bg-white/20 text-white rounded-xl border border-white/30 group-hover:bg-white group-hover:text-[#0284C7] transition-all shrink-0">
                                    {item.href === "/services"
                                      ? <Layers className="w-5 h-5" />
                                      : <Shield className="w-5 h-5" />
                                    }
                                  </div>
                                  <div>
                                    <div className="font-bebas text-lg tracking-wider text-white group-hover:text-amber-300 transition-colors leading-none">
                                      {item.label}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "font-bebas text-lg tracking-wider uppercase transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 hover:after:w-full after:transition-all font-medium",
                        isScrolled ? "text-slate-100 hover:text-[#38BDF8] after:bg-[#38BDF8]" : "text-slate-900 hover:text-[#0284C7] after:bg-[#0284C7]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTAs */}
          {(() => {
            const rawWhatsapp = siteSettings?.whatsapp || siteSettings?.phone || "9324831576";
            const cleanWhatsapp = rawWhatsapp.replace(/\D/g, "");
            const formattedWhatsapp = cleanWhatsapp.length === 10 ? `91${cleanWhatsapp}` : cleanWhatsapp;
            const rawPhone = siteSettings?.phone || "9324831576";
            const cleanPhone = rawPhone.replace(/[^\d+]/g, "");

            return (
              <div className="hidden lg:flex items-center gap-4">
                <a
                  href={`tel:${cleanPhone}`}
                  className="w-10 h-10 rounded-full bg-[#0284C7] hover:bg-[#0369a1] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all border border-white/40 group"
                  aria-label="Call Direct"
                  title={`Call ${rawPhone}`}
                >
                  <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </a>
                <a
                  href={`https://wa.me/${formattedWhatsapp}?text=Hello%20Family%20Anchor%20Facilities,%20I%20would%20like%20to%20get%20a%20quote%20for%20security%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0284C7] hover:bg-[#0369a1] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all border border-white/40 group"
                  aria-label="Contact on WhatsApp"
                >
                  <svg 
                    className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                  </svg>
                </a>
              </div>
            );
          })()}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white hover:text-[#38BDF8] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl p-6 lg:hidden max-h-[85vh] overflow-y-auto"
          >
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <li key={link.label} className="border-b border-slate-800/60 pb-2">
                      <div className="flex items-center justify-between py-2">
                        <Link
                          href={link.href}
                          className="font-bebas text-xl tracking-wider uppercase text-slate-100 hover:text-[#38BDF8]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                        <button
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className="p-1 text-slate-400 hover:text-[#38BDF8]"
                        >
                          <ChevronDown className={cn(
                            "w-5 h-5 transition-transform duration-300",
                            isMobileServicesOpen ? "rotate-180 text-[#38BDF8]" : ""
                          )} />
                        </button>
                      </div>

                      <AnimatePresence>
                        {isMobileServicesOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 flex flex-col gap-2 border-l-2 border-[#0284C7] my-2"
                          >
                            {navServiceItems.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className="block font-bebas text-lg tracking-wider text-slate-300 hover:text-[#38BDF8] py-1"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <li key={link.label} className="border-b border-slate-800/40 pb-1">
                    <Link
                      href={link.href}
                      className="block font-bebas text-xl tracking-wider uppercase text-slate-100 hover:text-[#38BDF8] py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {(() => {
              const rawWhatsapp = siteSettings?.whatsapp || siteSettings?.phone || "9324831576";
              const cleanWhatsapp = rawWhatsapp.replace(/\D/g, "");
              const formattedWhatsapp = cleanWhatsapp.length === 10 ? `91${cleanWhatsapp}` : cleanWhatsapp;
              const rawPhone = siteSettings?.phone || "9324831576";
              const cleanPhone = rawPhone.replace(/[^\d+]/g, "");

              return (
                <div className="flex justify-center gap-6 mt-6 pb-4">
                  <a
                    href={`tel:${cleanPhone}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-14 h-14 rounded-full bg-[#0284C7] hover:bg-[#0369a1] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all border border-white/40 group"
                    aria-label="Call Direct"
                    title={`Call ${rawPhone}`}
                  >
                    <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  </a>
                  <a
                    href={`https://wa.me/${formattedWhatsapp}?text=Hello%20Family%20Anchor%20Facilities,%20I%20would%20like%20to%20get%20a%20quote%20for%20security%20services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-14 h-14 rounded-full bg-[#0284C7] hover:bg-[#0369a1] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all border border-white/40 group"
                    aria-label="Contact on WhatsApp"
                  >
                    <svg 
                      className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                    </svg>
                  </a>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
