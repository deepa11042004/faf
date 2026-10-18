"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Navigation, 
  Headset, 
  Building2 
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { contactApi } from "@/services/api/contactApi";
import { settingsApi } from "@/services/api/settingsApi";
import { WebsiteSettingItem } from "@/types/admin";

const SERVICES_OPTIONS = [
  "CCTV Installation",
  "Fire Alarm System",
  "Access Control System",
  "Public Address (PA) System",
  "Security Guard Services",
  "Integrated Security Solutions",
  "Other"
];

const WHY_CONTACT_REASONS = [
  "Free Security Consultation",
  "Site Survey & Risk Assessment",
  "Customized Security Solutions",
  "Project Cost Estimation",
  "Product Recommendations",
  "Technical Support",
  "Annual Maintenance Contracts (AMC)",
  "Security Guard Deployment",
  "Existing System Upgrades"
];

const SERVICE_AREAS = [
  "Delhi",
  "Noida",
  "Greater Noida",
  "Gurugram",
  "Ghaziabad",
  "Faridabad",
  "Sonipat",
  "Bahadurgarh",
  "Nearby industrial areas"
];

const MAP_FEATURES = [
  "Accurate Office Location",
  "One-Click Navigation",
  "Nearby Landmarks",
  "Live Directions",
  "Street View",
  "Mobile-Friendly Navigation"
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [siteSettings, setSiteSettings] = useState<WebsiteSettingItem | null>(null);

  useEffect(() => {
    settingsApi.getSettings()
      .then((res) => {
        if (res.success && res.data) {
          setSiteSettings(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    mobile: "",
    city: "",
    service: "CCTV Installation",
    subject: "",
    projectLocation: "",
    projectSize: "",
    message: "",
    preferredMethod: "Phone Call",
    privacyConsent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await contactApi.submitEnquiry({
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobile,
        subject: formData.subject || `Enquiry for ${formData.service}`,
        service: formData.service,
        message: `Company: ${formData.companyName || 'N/A'}\nCity: ${formData.city || 'N/A'}\nProject Location: ${formData.projectLocation || 'N/A'}\nProject Size: ${formData.projectSize || 'N/A'}\nPreferred Method: ${formData.preferredMethod}\n\nMessage:\n${formData.message}`
      });
    } catch (err) {
      console.error("Failed to submit contact enquiry:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
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
              <span>Contact Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Let's Connect and <span className="text-[#38BDF8]">Secure What Matters Most</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto">
              At Family Anchor Facilities Pvt. Ltd., we're committed to providing reliable security and facility management solutions tailored to your unique requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            Dedicated Customer Support
          </span>
          <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-slate-900 mb-6">
            Expert Guidance & Prompt Response
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter">
            Whether you're looking to install a CCTV surveillance system, fire alarm system, access control solution, public address system, or require professional security guard services, our team is ready to assist you.
          </p>
        </div>
      </section>

      {/* Main Contact Form & Company Info Grid */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Form Left Column */}
            <div className="lg:col-span-7 bg-white text-slate-900 rounded-[32px] p-8 md:p-12 shadow-2xl border-4 border-sky-300">
              <div className="mb-8">
                <span className="text-[#0284C7] font-bebas text-lg tracking-widest uppercase block mb-1">Inquiry Portal</span>
                <h3 className="text-3xl md:text-4xl font-bebas tracking-wide text-slate-900">Get in Touch</h3>
              </div>

              {submitted ? (
                <div className="bg-sky-50 border-2 border-sky-300 p-8 rounded-2xl text-center shadow-md">
                  <div className="w-14 h-14 bg-[#0284C7] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-bebas text-2xl text-slate-900 mb-2">Inquiry Submitted Successfully!</h4>
                  <p className="text-slate-600 font-inter text-sm max-w-md mx-auto mb-5">
                    Thank you for reaching out. One of our security consultants will contact you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="bg-[#0284C7] text-white font-bebas text-base tracking-wider uppercase px-6 py-2.5 rounded-full"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Personal Info */}
                  <div>
                    <h4 className="font-bebas text-xl tracking-wide text-[#0284C7] uppercase mb-3">Personal Information</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-1">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Your Name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-1">Company Name (Optional)</label>
                        <input 
                          type="text" 
                          placeholder="Your Organization"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-1">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-1">Mobile Number *</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="+91 98765 43210"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-1">City / Location *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Noida / Gurugram"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Requirement */}
                  <div>
                    <h4 className="font-bebas text-xl tracking-wide text-[#0284C7] uppercase mb-3">Service Requirement</h4>
                    <div>
                      <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-1">Select Service *</label>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-sm"
                      >
                        {SERVICES_OPTIONS.map((srv, sIdx) => (
                          <option key={sIdx} value={srv}>{srv}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h4 className="font-bebas text-xl tracking-wide text-[#0284C7] uppercase mb-3">Project Details</h4>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-1">Subject *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. CCTV System Installation Quote"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-1">Project Location</label>
                        <input 
                          type="text" 
                          placeholder="Site Address / City"
                          value={formData.projectLocation}
                          onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-1">Estimated Project Size (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 16 Cameras / 5 Security Guards / 10000 sq ft Office"
                        value={formData.projectSize}
                        onChange={(e) => setFormData({ ...formData, projectSize: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-1">Message / Requirements *</label>
                      <textarea 
                        rows={4}
                        required
                        placeholder="Describe your security requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-sm"
                      />
                    </div>
                  </div>

                  {/* Preferred Contact Method & Consent */}
                  <div>
                    <h4 className="font-bebas text-xl tracking-wide text-[#0284C7] uppercase mb-2">Preferred Contact Method</h4>
                    <div className="flex gap-6 mb-4 font-inter text-sm">
                      {["Phone Call", "Email", "WhatsApp"].map((method) => (
                        <label key={method} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="preferredMethod"
                            checked={formData.preferredMethod === method}
                            onChange={() => setFormData({ ...formData, preferredMethod: method })}
                            className="text-[#0284C7]"
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>

                    <div className="flex items-start gap-3 bg-sky-50 p-3 rounded-xl border border-sky-200">
                      <input 
                        type="checkbox" 
                        required
                        id="privacyConsent"
                        checked={formData.privacyConsent}
                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                        className="mt-0.5 text-[#0284C7]"
                      />
                      <label htmlFor="privacyConsent" className="text-xs text-slate-700 font-inter">
                        I agree to the Privacy Policy and authorize Family Anchor Facilities Pvt. Ltd. to contact me regarding my inquiry.
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-2xl tracking-wider uppercase py-4 rounded-full shadow-xl hover:scale-[1.02] transition-all"
                  >
                    <Send className="w-5 h-5" />
                    <span>Submit Inquiry</span>
                  </button>

                </form>
              )}
            </div>

            {/* Company Info & Visit Office Right Column */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Company Details Card */}
              <div className="bg-white/95 backdrop-blur-xl text-slate-900 rounded-[32px] p-8 md:p-10 border-4 border-sky-300 shadow-2xl">
                <span className="text-[#0284C7] font-bebas text-lg tracking-widest uppercase block mb-1">Corporate Details</span>
                <h3 className="text-3xl font-bebas tracking-wide text-slate-900 mb-1">{siteSettings?.companyName || "Family Anchor Facilities Pvt. Ltd."}</h3>
                <p className="text-xs text-slate-500 font-inter font-medium mb-6">Your Trusted Security & Facility Management Partner</p>

                <div className="space-y-5 font-inter text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-sky-50 rounded-xl text-[#0284C7] border border-sky-200 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 font-bold mb-0.5">Office Address</strong>
                      <span>{siteSettings?.address || "A-8A & A-8B, First Floor, Vishwakarma Colony, Pul Pehladpur, M.B Road, New Delhi 110044, India"}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-sky-50 rounded-xl text-[#0284C7] border border-sky-200 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 font-bold mb-0.5">Phone Numbers</strong>
                      <div className="flex flex-col">
                        <a href={`tel:${siteSettings?.phone || "8826632363"}`} className="hover:text-[#0284C7] transition-colors">{siteSettings?.phone || "+91 8826632363"}</a>
                        {siteSettings?.alternatePhone && (
                          <a href={`tel:${siteSettings.alternatePhone}`} className="hover:text-[#0284C7] transition-colors text-xs text-slate-600 font-medium">{siteSettings.alternatePhone}</a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-sky-50 rounded-xl text-[#0284C7] border border-sky-200 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 font-bold mb-0.5">Email Address</strong>
                      <a href={`mailto:${siteSettings?.email || "familyanchorfacilities@gmail.com"}`} className="hover:text-[#0284C7] transition-colors">{siteSettings?.email || "familyanchorfacilities@gmail.com"}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-sky-50 rounded-xl text-[#0284C7] border border-sky-200 shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 font-bold mb-0.5">Website</strong>
                      <a href="https://www.familyanchor.com" target="_blank" rel="noreferrer" className="hover:text-[#0284C7] transition-colors">www.familyanchor.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                    <div className="p-2.5 bg-sky-50 rounded-xl text-[#0284C7] border border-sky-200 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 font-bold mb-0.5">Business Hours</strong>
                      <p className="text-xs">{siteSettings?.workingHours || "24/7 Active Operations & Customer Support"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Areas Card */}
              <div className="bg-white/95 backdrop-blur-xl text-slate-900 rounded-[32px] p-8 border-4 border-sky-300 shadow-2xl">
                <span className="text-[#0284C7] font-bebas text-lg tracking-widest uppercase block mb-1">Regional Coverage</span>
                <h3 className="text-2xl font-bebas tracking-wide text-slate-900 mb-4">Service Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_AREAS.map((area, aIdx) => (
                    <span 
                      key={aIdx}
                      className="bg-sky-50 border border-sky-200 text-slate-800 font-bebas text-sm tracking-wider uppercase px-3.5 py-1.5 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Office Location
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Find Us on Google Maps
            </h2>
            <p className="text-slate-600 text-lg font-inter mt-3">
              Our office location is easily accessible through Google Maps, making it convenient for clients, partners, and visitors to reach us.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Embed Map Frame */}
            <div className="lg:col-span-8 h-[320px] md:h-[420px] rounded-[32px] overflow-hidden border-4 border-sky-300 shadow-2xl relative">
              <iframe 
                title="Family Anchor Facilities Google Map Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2586428043096!2d77.2847185740884!3d28.501865090004955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce6d2c5bd20a7%3A0xb409b585583d1769!2sLight%20N%20Light%20Delhi!5e0!3m2!1sen!2sin!4v1786690272512!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Map Features List */}
            <div className="lg:col-span-4 bg-sky-50/90 p-8 rounded-[32px] border-2 border-sky-200 shadow-xl">
              <div className="flex items-center gap-2 text-[#0284C7] mb-4">
                <Navigation className="w-6 h-6" />
                <h3 className="font-bebas text-2xl tracking-wide uppercase">Navigation Highlights</h3>
              </div>
              <ul className="space-y-3 font-inter text-sm text-slate-700">
                {MAP_FEATURES.map((feat, mfIdx) => (
                  <li key={mfIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Consultation Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Why Contact Us?
            </h2>
            <p className="text-slate-300 text-lg font-inter mt-3">
              Our experts are available to help you with comprehensive security planning and system execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {WHY_CONTACT_REASONS.map((reason, rIdx) => (
              <motion.div
                key={rIdx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: rIdx * 0.05, duration: 0.4 }}
                className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex items-center gap-3 text-slate-200 font-inter font-medium"
              >
                <ShieldCheck className="w-5 h-5 text-[#38BDF8] shrink-0" />
                <span className="text-sm">{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-gradient-to-r from-sky-50 via-slate-50 to-sky-50 text-slate-900 border-t border-sky-100">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            Immediate Assistance
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Need Immediate Assistance?
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8">
            Whether you're planning a new security installation, upgrading an existing system, or require professional security personnel, our team is just a call or message away.
          </p>
          <div className="flex justify-center">
            {(() => {
              const rawPhone = siteSettings?.phone || "+91 9324831576";
              const cleanPhone = rawPhone.replace(/[^\d+]/g, "");

              return (
                <a 
                  href={`tel:${cleanPhone}`} 
                  className="inline-flex items-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call {rawPhone}</span>
                </a>
              );
            })()}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
