"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Calculator, ShieldCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactApi } from "@/services/api/contactApi";

const FACILITY_TYPES = [
  { id: "residential", label: "Residential / Society", multiplier: 1.0 },
  { id: "commercial", label: "Commercial Office / Mall", multiplier: 1.4 },
  { id: "industrial", label: "Industrial / Factory / Warehouse", multiplier: 1.8 },
  { id: "institution", label: "School / Hospital / Govt", multiplier: 1.5 },
];

const SECURITY_NEEDS = [
  { id: "cctv", label: "CCTV Surveillance", estPrice: 25000 },
  { id: "fire", label: "Fire Alarm System", estPrice: 35000 },
  { id: "access", label: "Access Control / Biometric", estPrice: 20000 },
  { id: "pa", label: "Public Address System", estPrice: 18000 },
  { id: "guards", label: "24x7 Security Guards", estPrice: 45000 },
];

export function InteractiveQuoteCalculator() {
  const [step, setStep] = useState(1);
  const [selectedFacility, setSelectedFacility] = useState<string>("commercial");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(["cctv"]);
  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    email: "",
    city: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleNeed = (id: string) => {
    if (selectedNeeds.includes(id)) {
      if (selectedNeeds.length > 1) {
        setSelectedNeeds(selectedNeeds.filter(item => item !== id));
      }
    } else {
      setSelectedNeeds([...selectedNeeds, id]);
    }
  };

  // Estimate Calculation
  const facilityObj = FACILITY_TYPES.find(f => f.id === selectedFacility);
  const baseCost = selectedNeeds.reduce((acc, needId) => {
    const need = SECURITY_NEEDS.find(n => n.id === needId);
    return acc + (need ? need.estPrice : 0);
  }, 0);
  const totalEstimate = Math.round(baseCost * (facilityObj?.multiplier || 1.0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await contactApi.submitEnquiry({
        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email,
        subject: `Interactive Quote Estimate - ₹${totalEstimate.toLocaleString("en-IN")}`,
        service: selectedNeeds.join(", "),
        message: `Facility Type: ${selectedFacility}\nSelected Needs: ${selectedNeeds.join(", ")}\nEstimated Cost: ₹${totalEstimate.toLocaleString("en-IN")}`
      });
    } catch (err) {
      console.error("Failed to submit quote estimate to API:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div>
      {/* Step Progress Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bebas tracking-widest text-[#0284C7] uppercase block">
            Instant Cost Estimator
          </span>
          <h3 className="text-2xl md:text-3xl font-bebas text-slate-900 tracking-wide">
            Interactive Quote Calculator
          </h3>
        </div>

        <div className="flex items-center gap-1.5 font-bebas text-sm">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-[#0284C7] text-white" : "bg-slate-200 text-slate-600"}`}>1</span>
          <span className="text-slate-300">—</span>
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-[#0284C7] text-white" : "bg-slate-200 text-slate-600"}`}>2</span>
          <span className="text-slate-300">—</span>
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-[#0284C7] text-white" : "bg-slate-200 text-slate-600"}`}>3</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Select Facility Type */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <label className="block text-sm font-bebas tracking-wider text-slate-700 uppercase font-semibold">
              Step 1: Select Facility Type
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FACILITY_TYPES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFacility(f.id)}
                  className={`p-4 rounded-2xl border-2 text-left font-inter transition-all flex items-center justify-between ${
                    selectedFacility === f.id
                      ? "border-[#0284C7] bg-sky-50/80 text-[#0284C7] font-bold shadow-md"
                      : "border-slate-200 bg-slate-50 text-slate-800 hover:border-sky-300"
                  }`}
                >
                  <span className="text-sm font-medium">{f.label}</span>
                  {selectedFacility === f.id && <Check className="w-5 h-5 text-[#0284C7]" />}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                onClick={() => setStep(2)}
                className="bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-lg tracking-wider uppercase px-8 py-3 rounded-full flex items-center gap-2"
              >
                <span>Next: Select Services</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Select Security Needs */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <label className="block text-sm font-bebas tracking-wider text-slate-700 uppercase font-semibold">
              Step 2: Select Security Requirements (Multiple)
            </label>

            <div className="space-y-3">
              {SECURITY_NEEDS.map((n) => {
                const isSelected = selectedNeeds.includes(n.id);
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => toggleNeed(n.id)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-inter transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-[#0284C7] bg-sky-50/80 text-[#0284C7] font-bold shadow-md"
                        : "border-slate-200 bg-slate-50 text-slate-800 hover:border-sky-300"
                    }`}
                  >
                    <span className="text-sm font-medium">{n.label}</span>
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${isSelected ? "bg-[#0284C7] border-[#0284C7] text-white" : "border-slate-300"}`}>
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Real-time Calculation Badge */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between shadow-lg">
              <span className="text-xs font-bebas tracking-wider text-sky-400 uppercase">Estimated Budget</span>
              <span className="text-xl font-poppins font-bold text-amber-400">
                ₹{totalEstimate.toLocaleString("en-IN")}*
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-600 hover:text-slate-900 font-bebas text-base flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <Button
                onClick={() => setStep(3)}
                className="bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-lg tracking-wider uppercase px-8 py-3 rounded-full flex items-center gap-2"
              >
                <span>Get Full Proposal</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Instant Estimate & Contact Details */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Instant Calculated Summary Box */}
                <div className="p-5 bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-2xl shadow-xl border border-sky-400/40 text-center">
                  <span className="text-xs font-bebas tracking-widest text-sky-400 uppercase block mb-1">
                    Estimated Project Cost
                  </span>
                  <div className="text-3xl md:text-4xl font-poppins font-extrabold text-amber-400 mb-1">
                    ₹{totalEstimate.toLocaleString("en-IN")}
                  </div>
                  <span className="text-[11px] text-slate-300 font-inter">
                    Includes equipment, deployment & initial setup briefing
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0284C7] text-slate-900 font-inter"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0284C7] text-slate-900 font-inter"
                  />
                </div>

                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0284C7] text-slate-900 font-inter"
                />

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-slate-600 hover:text-slate-900 font-bebas text-base flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>

                  <Button
                    type="submit"
                    className="bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bebas text-xl tracking-wider uppercase px-8 py-3 rounded-full flex items-center gap-2 shadow-xl font-bold"
                  >
                    <span>Request Formal Quote</span>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h4 className="font-bebas text-3xl text-slate-900">Quote Estimate Sent!</h4>
                <p className="text-slate-600 text-sm font-inter leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{contactData.name}</strong>! Our security engineers will review your estimated requirement of <strong>₹{totalEstimate.toLocaleString("en-IN")}</strong> and contact you at <strong>{contactData.phone}</strong> shortly.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                  }}
                  className="bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-base tracking-wider uppercase px-6 py-2 rounded-full"
                >
                  Recalculate Estimate
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
