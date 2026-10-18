"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Send, 
  Upload, 
  UserCheck, 
  Award, 
  TrendingUp, 
  Shield, 
  FileText,
  DollarSign,
  HeartPulse,
  GraduationCap,
  Users,
  Gift,
  PlusCircle,
  Quote
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { applicationsApi } from "@/services/api/applicationsApi";
import { jobsApi } from "@/services/api/jobsApi";

// Employee Benefits & Facilities Data
const BENEFITS_CATEGORIES = [
  {
    title: "Financial Benefits",
    icon: <DollarSign className="w-6 h-6 text-[#0284C7]" />,
    items: [
      "Provident Fund (PF)",
      "Employees' State Insurance (ESI)",
      "Competitive Salary",
      "Overtime (OT) Payment",
      "Performance-Based Incentives",
      "Annual Performance Bonus",
      "Festival Bonus",
      "Attendance Bonus",
      "Referral Bonus",
      "Salary on Time"
    ]
  },
  {
    title: "Health & Wellness",
    icon: <HeartPulse className="w-6 h-6 text-[#0284C7]" />,
    items: [
      "ESI Medical Benefits",
      "Medical Assistance",
      "Accident & Emergency Support",
      "Health & Safety Training",
      "Personal Protective Equipment (PPE)",
      "Safe Working Environment",
      "First Aid Support"
    ]
  },
  {
    title: "Career Growth",
    icon: <GraduationCap className="w-6 h-6 text-[#0284C7]" />,
    items: [
      "Professional Training Programs",
      "Security Skills Development",
      "Fire & Safety Training",
      "Soft Skills Development",
      "Promotion Opportunities",
      "Leadership Development",
      "Performance Recognition"
    ]
  },
  {
    title: "Employee Support",
    icon: <Users className="w-6 h-6 text-[#0284C7]" />,
    items: [
      "Uniform Provided",
      "Identity Card",
      "Employee Helpline",
      "HR Assistance",
      "Transparent Company Policies",
      "Grievance Support",
      "Friendly Work Environment"
    ]
  },
  {
    title: "Rewards & Recognition",
    icon: <Gift className="w-6 h-6 text-[#0284C7]" />,
    items: [
      "Employee of the Month",
      "Outstanding Performance Awards",
      "Long Service Recognition",
      "Appreciation Certificates",
      "Team Achievement Awards"
    ]
  },
  {
    title: "Additional Facilities",
    icon: <PlusCircle className="w-6 h-6 text-[#0284C7]" />,
    items: [
      "Duty Transportation (where applicable)",
      "Accommodation Support (for selected projects)",
      "Meal Allowance (where applicable)",
      "Mobile Allowance (for eligible roles)",
      "Night Shift Allowance",
      "Travel Reimbursement (for field staff)",
      "Joining Kit & Uniform",
      "Refreshment Breaks",
      "Regular Team Meetings & Engagement Activities"
    ]
  }
];

const WHY_JOIN_REASONS = [
  "Stable & Long-Term Career Opportunities",
  "Supportive and Professional Work Culture",
  "Equal Opportunity Employer",
  "Timely Salary & Employee Benefits",
  "Opportunities to Work on Diverse Projects",
  "Continuous Learning & Career Advancement",
  "Employee Safety as a Top Priority",
  "Recognition for Hard Work & Dedication"
];

const WHAT_WE_OFFER = [
  "Professional and Respectful Work Environment",
  "Career Growth Opportunities",
  "Skill Development & Training Programs",
  "Performance-Based Recognition",
  "Competitive Salary Packages",
  "Job Stability",
  "Team-Oriented Culture",
  "Safe and Secure Working Environment",
  "Opportunities to Work on Diverse Projects"
];

const OPENINGS = [
  {
    id: "security-guard",
    title: "Security Guard",
    location: "Delhi NCR",
    type: "Full-Time",
    responsibilities: [
      "Monitor premises and ensure safety.",
      "Control entry and exit points.",
      "Conduct regular patrols.",
      "Respond to emergencies.",
      "Maintain security logs and reports."
    ],
    requirements: [
      "Minimum 10th/12th Pass (preferred)",
      "Physically fit and disciplined",
      "Good communication skills",
      "Prior experience preferred (Freshers may also apply)"
    ]
  },
  {
    id: "cctv-technician",
    title: "CCTV Installation Technician",
    location: "Delhi NCR",
    type: "Full-Time",
    responsibilities: [
      "Install and configure CCTV systems.",
      "Troubleshoot technical issues.",
      "Perform maintenance and servicing.",
      "Test and commission security equipment."
    ],
    requirements: [
      "ITI/Diploma or relevant technical experience",
      "Knowledge of CCTV and networking",
      "Basic electrical knowledge",
      "Problem-solving skills"
    ]
  },
  {
    id: "fire-alarm-technician",
    title: "Fire Alarm System Technician",
    location: "Delhi NCR",
    type: "Full-Time",
    responsibilities: [
      "Install and maintain fire alarm systems.",
      "Conduct testing and inspections.",
      "Troubleshoot system issues.",
      "Ensure compliance with safety standards."
    ],
    requirements: [
      "Technical background",
      "Experience with fire alarm systems preferred",
      "Basic electrical knowledge"
    ]
  },
  {
    id: "access-control-technician",
    title: "Access Control & Security System Technician",
    location: "Delhi NCR",
    type: "Full-Time",
    responsibilities: [
      "Install biometric and access control systems.",
      "Configure devices and software.",
      "Perform maintenance and troubleshooting."
    ],
    requirements: [
      "Knowledge of access control systems",
      "Networking basics",
      "Technical troubleshooting skills"
    ]
  },
  {
    id: "field-service-engineer",
    title: "Field Service Engineer",
    location: "Delhi NCR",
    type: "Full-Time",
    responsibilities: [
      "Visit client locations for installation and support.",
      "Perform preventive maintenance.",
      "Resolve technical issues.",
      "Coordinate with the technical team."
    ],
    requirements: [
      "Technical qualification",
      "Good communication skills",
      "Willingness to travel locally"
    ]
  },
  {
    id: "bde-executive",
    title: "Sales & Business Development Executive",
    location: "Delhi NCR",
    type: "Full-Time",
    responsibilities: [
      "Generate new business opportunities.",
      "Meet prospective clients.",
      "Prepare quotations and proposals.",
      "Maintain customer relationships."
    ],
    requirements: [
      "Excellent communication skills",
      "Sales experience preferred",
      "Customer-focused attitude"
    ]
  }
];

const ROLES_TREE = [
  {
    category: "Technical Roles",
    roles: ["CCTV Installation Engineer", "Fire Alarm Technician", "Access Control Engineer", "Networking Technician", "Service Engineer", "Maintenance Technician"]
  },
  {
    category: "Security Services",
    roles: ["Security Guard", "Security Supervisor", "Site In-Charge", "Security Officer", "Control Room Operator"]
  },
  {
    category: "Corporate Roles",
    roles: ["Sales Executive", "Business Development Executive", "Customer Support Executive", "HR Executive", "Operations Coordinator", "Administrative Executive"]
  },
  {
    category: "Leadership Roles",
    roles: ["Project Manager", "Operations Manager", "Technical Manager", "Branch Manager"]
  }
];

const HIRING_STEPS = [
  { step: "Step 1", title: "Application Submission", desc: "Submit your application and resume through our online career portal." },
  { step: "Step 2", title: "Application Review", desc: "Our HR team reviews your qualifications and experience based on the job requirements." },
  { step: "Step 3", title: "Interview", desc: "Shortlisted candidates are invited for a technical and HR interview." },
  { step: "Step 4", title: "Assessment (if applicable)", desc: "Certain technical roles may include a practical or skill-based assessment." },
  { step: "Step 5", title: "Offer & Onboarding", desc: "Successful candidates receive an offer letter and complete the onboarding process before joining." }
];

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [dbJobs, setDbJobs] = useState<any[]>([]);

  useEffect(() => {
    jobsApi.getJobs({ status: "active", limit: 50 })
      .then(res => { if (res.success && res.data?.jobs) setDbJobs(res.data.jobs); })
      .catch(err => console.error("Failed to fetch jobs:", err));
  }, []);

  // Helper to split text into bullet points
  const parseBulletPoints = (val: any): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      return val
        .split(/\r?\n|\. /)
        .map((s) => s.trim().replace(/^[-•*]\s*/, ""))
        .filter((s) => s.length > 0);
    }
    return [];
  };

  // Merge: DB jobs first, static OPENINGS as fallback
  const allJobs = dbJobs.length > 0
    ? dbJobs.map((j) => ({
        id: String(j.id),
        title: j.jobTitle || j.title || "Job Position",
        location: j.location || "Delhi NCR",
        type: j.employmentType || j.jobType || "Full-Time",
        responsibilities: parseBulletPoints(j.responsibilities),
        requirements: parseBulletPoints(j.requirements)
      }))
    : OPENINGS;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    currentCity: "",
    dob: "",
    position: "Security Guard",
    totalExp: "",
    currentEmployer: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    highestQual: "",
    institution: "",
    passingYear: "",
    skills: "",
    certifications: "",
    coverLetter: "",
    declaration: false,
    resumeFile: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.resumeFile) {
      alert("Please select and upload your resume.");
      return;
    }

    try {
      const data = new FormData();
      
      // Map frontend fields to backend expected fields
      data.append("applicantName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.mobile);
      data.append("appliedJob", formData.position);
      
      // Serialize additional fields as JSON for structured rendering in Admin Panel
      const additionalDetails = {
        City: formData.currentCity,
        "Date of Birth": formData.dob,
        "Total Experience": formData.totalExp,
        "Current Employer": formData.currentEmployer,
        "Notice Period": formData.noticePeriod,
        "Highest Qualification": formData.highestQual,
        "Institution": formData.institution,
        "Passing Year": formData.passingYear
      };
      data.append("message", JSON.stringify(additionalDetails));

      if (formData.resumeFile) {
        data.append("resume", formData.resumeFile as Blob);
      }

      await applicationsApi.submitApplication(data);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit application", error);
      alert("Failed to submit your application. Please try again later.");
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
              <span>Careers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wide text-white mb-6">
              Build a Rewarding Career with <span className="text-[#38BDF8]">Family Anchor Facilities</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-inter max-w-3xl mx-auto">
              At Family Anchor Facilities Pvt. Ltd., we believe our people are the foundation of our success. Join our team and grow in a supportive, professional environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Family Anchor Facilities Section */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Employer Value Proposition
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight mb-4">
              Why Join Family Anchor Facilities Pvt. Ltd.?
            </h2>
            <p className="text-blue-100/90 text-base md:text-lg font-inter leading-relaxed">
              At <strong>Family Anchor Facilities Pvt. Ltd.</strong>, we believe that our employees are our greatest asset. We are committed to providing a safe, supportive, and rewarding work environment where every team member can grow professionally while enjoying comprehensive employee benefits and welfare programs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {WHY_JOIN_REASONS.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border-2 border-sky-300 text-slate-900 flex items-center gap-3 shadow-lg hover:shadow-2xl hover:border-white transition-all font-bebas text-xl tracking-wide"
              >
                <ShieldCheck className="w-6 h-6 text-[#0284C7] shrink-0" />
                <span>{reason}</span>
              </motion.div>
            ))}
          </div>

          {/* Highlight Quote Block */}
          <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-[32px] p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative">
            <Quote className="w-12 h-12 text-[#38BDF8] opacity-40 mx-auto mb-4" />
            <p className="text-lg md:text-xl font-inter text-blue-100 italic leading-relaxed">
              "Grow your career with Family Anchor Facilities Pvt. Ltd. and become part of a team dedicated to delivering trusted security and facility management solutions while building a secure future for our employees."
            </p>
          </div>
        </div>
      </section>

      {/* Employee Benefits & Facilities Section */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Workforce Welfare
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight mb-4">
              Employee Benefits & Facilities
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-inter leading-relaxed">
              Explore our comprehensive range of employee perks, health insurance coverage, financial incentives, and professional development programs designed to support your career and well-being.
            </p>
          </div>

          {/* 6 Category Benefit Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="bg-sky-50/80 rounded-[28px] p-8 border-2 border-sky-200 shadow-md hover:shadow-xl hover:border-[#0284C7] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sky-200">
                    <div className="p-3 bg-white rounded-2xl border border-sky-100 shadow-sm">
                      {cat.icon}
                    </div>
                    <h3 className="font-bebas text-2xl tracking-wide text-slate-900">
                      {cat.title}
                    </h3>
                  </div>

                  <ul className="space-y-2.5 font-inter text-xs md:text-sm text-slate-700 font-semibold">
                    {cat.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="py-24 pt-36 scroll-mt-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 pt-4">
            <span className="text-[#38BDF8] font-bebas text-xl md:text-2xl tracking-widest uppercase mb-2 block drop-shadow font-semibold">
              Join Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight drop-shadow-md">
              Current Openings
            </h2>
            <p className="text-blue-100 text-base md:text-lg font-inter mt-3 max-w-xl mx-auto">
              Explore active job opportunities and join Family Anchor Facilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {allJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white text-slate-900 rounded-[28px] border-4 border-sky-300 shadow-xl p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                    <span className="font-bebas text-xs tracking-wider uppercase px-3 py-1 bg-sky-100 text-[#0284C7] rounded-full font-bold">
                      {job.type}
                    </span>
                    <div className="flex items-center gap-1 text-slate-500 text-xs font-inter">
                      <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <h3 className="font-bebas text-2xl md:text-3xl tracking-wide text-slate-900 mb-4">
                    {job.title}
                  </h3>

                  <div className="mb-4">
                    <h4 className="font-bebas text-base tracking-wider text-[#0284C7] uppercase mb-2">Responsibilities</h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 font-inter">
                      {job.responsibilities.map((res, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-1.5 shrink-0" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bebas text-base tracking-wider text-[#0284C7] uppercase mb-2">Requirements</h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 font-inter">
                      {job.requirements.map((req, qIdx) => (
                        <li key={qIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a 
                  href="#apply-form"
                  onClick={() => setFormData({ ...formData, position: job.title })}
                  className="w-full text-center bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-lg tracking-wider uppercase py-3 rounded-full shadow-md transition-all inline-block"
                >
                  Apply For This Position
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Application Form */}
      <section id="apply-form" className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Online Portal
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Apply Now
            </h2>
            <p className="text-slate-600 text-lg font-inter mt-3">
              Fill in your personal, professional, and educational details below to submit your job application.
            </p>
          </div>

          {submitted ? (
            <div className="bg-sky-50 border-2 border-sky-300 p-10 rounded-[32px] text-center shadow-xl">
              <div className="w-16 h-16 bg-[#0284C7] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-bebas text-3xl text-slate-900 mb-2">Application Submitted Successfully!</h3>
              <p className="text-slate-600 font-inter text-base max-w-lg mx-auto mb-6">
                Thank you for applying. Our recruitment team is reviewing your details and will get in touch with you shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-[#0284C7] text-white font-bebas text-lg tracking-wider uppercase px-8 py-3 rounded-full shadow-md"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-sky-50/70 p-8 md:p-12 rounded-[32px] border-2 border-sky-200 shadow-2xl space-y-10">
              
              {/* Personal Information */}
              <div>
                <h3 className="font-bebas text-2xl tracking-wide text-[#0284C7] uppercase mb-6 pb-2 border-b border-sky-200 flex items-center gap-2">
                  <UserCheck className="w-6 h-6" /> Personal Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      minLength={2}
                      maxLength={50}
                      pattern="^[A-Za-z .]+$"
                      title="Please enter a valid name (letters and spaces only)"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      maxLength={100}
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Mobile Number *</label>
                    <input 
                      type="tel" 
                      required
                      pattern="^\+?[0-9 -()]{7,15}$"
                      title="Please enter a valid phone number (7-15 digits)"
                      placeholder="+91 98765 43210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Current City *</label>
                    <input 
                      type="text" 
                      required
                      minLength={2}
                      maxLength={50}
                      pattern="^[A-Za-z -]+$"
                      title="Please enter a valid city name"
                      placeholder="e.g. New Delhi"
                      value={formData.currentCity}
                      onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Date of Birth *</label>
                    <input 
                      type="date" 
                      required
                      max="2008-12-31"
                      title="You must be at least 18 years old to apply"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="font-bebas text-2xl tracking-wide text-[#0284C7] uppercase mb-6 pb-2 border-b border-sky-200 flex items-center gap-2">
                  <Briefcase className="w-6 h-6" /> Professional Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Position Applying For *</label>
                    <select 
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    >
                      {allJobs.map(j => (
                        <option key={j.id} value={j.title}>{j.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Total Experience *</label>
                    <input 
                      type="text" 
                      required
                      maxLength={30}
                      placeholder="e.g. 2 Years / Fresher"
                      value={formData.totalExp}
                      onChange={(e) => setFormData({ ...formData, totalExp: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Current Employer</label>
                    <input 
                      type="text" 
                      maxLength={100}
                      placeholder="Company Name (if employed)"
                      value={formData.currentEmployer}
                      onChange={(e) => setFormData({ ...formData, currentEmployer: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Notice Period</label>
                    <input 
                      type="text" 
                      maxLength={50}
                      placeholder="e.g. Immediate / 15 Days"
                      value={formData.noticePeriod}
                      onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Educational Qualification */}
              <div>
                <h3 className="font-bebas text-2xl tracking-wide text-[#0284C7] uppercase mb-6 pb-2 border-b border-sky-200 flex items-center gap-2">
                  <Award className="w-6 h-6" /> Educational Qualification
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Highest Qualification *</label>
                    <input 
                      type="text" 
                      required
                      minLength={2}
                      maxLength={100}
                      placeholder="e.g. 12th / ITI / Diploma"
                      value={formData.highestQual}
                      onChange={(e) => setFormData({ ...formData, highestQual: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Institution Name *</label>
                    <input 
                      type="text" 
                      required
                      minLength={2}
                      maxLength={150}
                      placeholder="School / College Name"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Year of Passing *</label>
                    <input 
                      type="text" 
                      required
                      pattern="^(19|20)[0-9]{2}$"
                      title="Please enter a valid 4-digit year (e.g., 2021)"
                      placeholder="e.g. 2021"
                      value={formData.passingYear}
                      onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0284C7] bg-white font-inter text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Resume Upload & Declaration */}
              <div>
                <h3 className="font-bebas text-2xl tracking-wide text-[#0284C7] uppercase mb-6 pb-2 border-b border-sky-200 flex items-center gap-2">
                  <FileText className="w-6 h-6" /> Resume & Declaration
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-inter font-bold uppercase text-slate-700 mb-2">Upload Resume (PDF / DOC / DOCX - Max 5MB) *</label>
                    <label className="border-2 border-dashed border-sky-300 rounded-2xl p-6 bg-white text-center cursor-pointer hover:border-[#0284C7] block">
                      <Upload className="w-8 h-8 text-[#0284C7] mx-auto mb-2" />
                      <span className="text-sm font-inter text-slate-600 block">
                        {formData.resumeFile ? formData.resumeFile.name : "Click to select resume file"}
                      </span>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setFormData({ ...formData, resumeFile: e.target.files[0] });
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200">
                    <input 
                      type="checkbox" 
                      required
                      id="declaration"
                      checked={formData.declaration}
                      onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                      className="mt-1 w-4 h-4 text-[#0284C7] rounded border-slate-300"
                    />
                    <label htmlFor="declaration" className="text-xs text-slate-700 font-inter leading-relaxed">
                      I confirm that the information provided is true and accurate to the best of my knowledge.
                    </label>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-2xl tracking-wider uppercase px-12 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Application</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </section>

      {/* Career Opportunities Categories Tree */}
      <section className="py-24 bg-[url('/images/backgrounds/services-blue-bg.png')] bg-cover bg-center bg-no-repeat relative text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#38BDF8] font-bebas text-xl tracking-widest uppercase mb-2 block drop-shadow">
              Role Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-white leading-tight">
              Career Opportunities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ROLES_TREE.map((tree, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-white text-slate-900 p-8 rounded-[28px] border-4 border-sky-300 shadow-xl"
              >
                <h3 className="font-bebas text-2xl tracking-wide text-[#0284C7] mb-4 pb-2 border-b border-sky-200">
                  {tree.category}
                </h3>
                <ul className="space-y-2 font-inter text-sm text-slate-700">
                  {tree.roles.map((r, rIdx) => (
                    <li key={rIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Hiring Process */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
              Transparent Selection
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 leading-tight">
              Our Hiring Process
            </h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {HIRING_STEPS.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="bg-sky-50/80 p-6 rounded-2xl border border-sky-200 text-center flex flex-col justify-between"
              >
                <div>
                  <span className="font-bebas text-xs tracking-wider uppercase px-3 py-1 bg-[#0284C7] text-white rounded-full font-bold mb-3 inline-block">
                    {st.step}
                  </span>
                  <h4 className="font-bebas text-lg tracking-wide text-slate-900 mb-2">{st.title}</h4>
                  <p className="text-slate-600 text-xs font-inter leading-relaxed">{st.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="py-20 bg-sky-50/80 text-slate-900 border-t border-sky-200">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="text-[#0284C7] font-bebas text-xl tracking-widest uppercase mb-2 block">
            Future-Ready Growth
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bebas tracking-wide text-slate-900 mb-6">
            Grow Your Career with Us
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-inter mb-8">
            At <strong>Family Anchor Facilities Pvt. Ltd.</strong>, we are committed to building a team of dedicated professionals who share our passion for safety, innovation, and excellence.
          </p>
          <div className="flex justify-center">
            <a 
              href="#apply-form" 
              className="inline-flex items-center gap-3 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bebas text-xl tracking-wider uppercase px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              <span>Apply Online Today</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
