"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { servicesApi } from "@/services/api/servicesApi";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
];

export function Footer() {
  const [serviceLinks, setServiceLinks] = useState<{ label: string; href: string }[]>([
    { label: "CCTV Installation", href: "/services/cctv-installation" },
    { label: "Fire Alarm Systems", href: "/services/fire-alarm-system" },
    { label: "Access Control", href: "/services/access-control-system" },
    { label: "Security Guards", href: "/services/security-guard-services" },
    { label: "Public Address System", href: "/services/public-address-system" },
  ]);

  useEffect(() => {
    servicesApi.getServices({ status: "active", limit: 50 })
      .then((res: any) => {
        const list = res?.data?.services ?? res?.data ?? [];
        if (Array.isArray(list) && list.length > 0) {
          const links = list
            .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
            .map((svc: any) => ({
              label: svc.title,
              href: `/services/${svc.slug}`,
            }));
          setServiceLinks(links);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-zinc-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & About */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="bg-white p-2 md:p-2.5 rounded-2xl shadow-md flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Family Anchor Facilities"
                  width={140}
                  height={140}
                  className="h-14 md:h-18 lg:h-20 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-2xl md:text-3xl tracking-widest leading-none text-white drop-shadow-sm">
                  FAMILY ANCHOR
                </span>
                <span className="font-bebas text-base md:text-lg tracking-[0.15em] leading-none mt-1 text-[#38BDF8] drop-shadow-sm">
                  FACILITIES
                </span>
              </div>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed pr-4">
              Your Trusted Partner in Comprehensive Security & Facilities. Delivering advanced solutions for over a decade.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {SOCIAL_LINKS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <a 
                    key={idx} 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#0284C7] hover:border-[#0284C7] hover:scale-110 transition-all duration-300"
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Services", href: "/services" },
                { label: "Industries", href: "/industries" },
                { label: "Featured Projects", href: "/projects" },
                { label: "Contact Us", href: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-zinc-400 hover:text-[#38BDF8] transition-colors text-sm font-inter">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Our Services</h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-zinc-400 hover:text-[#38BDF8] transition-colors text-sm font-inter">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Newsletter</h4>
            <p className="text-zinc-400 text-sm mb-4">
              Subscribe to our newsletter for the latest security updates and offers.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4338CA] transition-colors text-white w-full"
              />
              <button 
                type="button" 
                className="bg-[#0070c0] hover:bg-[#005ba3] text-white font-semibold rounded-xl py-3 transition-colors text-sm w-full shadow-md font-bebas uppercase tracking-wider text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Family Anchor Facilities Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/privacy-policy" className="hover:text-[#38BDF8] transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[#38BDF8] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
