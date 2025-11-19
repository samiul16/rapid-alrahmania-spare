"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  FileText,
  Send,
  Award,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

interface Job {
  id: number;
  title: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  jobType: string;
  location: string;
  experience: string;
  deadline: string;
  salary?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  cv: File | null;
}

const JobApplicationPage = () => {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId as string;

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    cv: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Auto parts job data
  const jobs: Job[] = [
    {
      id: 1,
      title: "Auto Parts Sales Manager",
      fullDescription:
        "Al Rahmaniah Auto Accessories is seeking an experienced Auto Parts Sales Manager to lead our sales team and develop customer relationships in the automotive industry. The ideal candidate should have strong leadership skills and extensive knowledge of automotive parts. This role involves managing the sales team, achieving sales targets, and ensuring excellent customer service in our showroom and online platform.",
      responsibilities: [
        "Lead and manage the auto parts sales team",
        "Develop and maintain customer relationships with garages and mechanics",
        "Achieve monthly and quarterly sales targets",
        "Provide technical guidance on auto parts compatibility",
        "Manage inventory levels and coordinate with suppliers",
        "Train sales staff on new products and automotive technology",
        "Handle major customer accounts and negotiations",
        "Prepare sales reports and performance analysis",
        "Ensure excellent customer service standards",
        "Stay updated with automotive industry trends and new products",
      ],
      requirements: [
        "Bachelor's degree in Business Administration or Automotive Engineering",
        "5+ years of experience in auto parts sales management",
        "Strong knowledge of automotive parts and systems",
        "Excellent leadership and team management skills",
        "Good understanding of automotive industry trends",
        "Strong communication and negotiation abilities",
        "Experience with automotive inventory management systems",
        "Ability to work under pressure and meet sales targets",
        "Customer service orientation and relationship building skills",
        "Knowledge of both OEM and aftermarket parts",
      ],
      benefits: [
        "Competitive salary package with commission",
        "Health and medical insurance coverage",
        "Performance-based bonuses and incentives",
        "Company vehicle allowance",
        "Professional development and training opportunities",
        "Annual leave and holidays",
        "Career advancement prospects in automotive industry",
        "Team building activities and company events",
      ],
      jobType: "Full Time",
      location: "On-site",
      experience: "5 Years",
      deadline: "30 December 2025",
      salary: "Competitive with commission structure",
    },
    {
      id: 2,
      title: "Inventory Control Specialist",
      fullDescription:
        "Join Al Rehmaniah Auto Accessories as an Inventory Control Specialist to manage our extensive auto parts inventory. The ideal candidate should have excellent organizational skills and attention to detail. This role involves managing stock levels, coordinating with suppliers, maintaining accurate inventory records, and ensuring optimal stock availability for all auto parts categories.",
      responsibilities: [
        "Monitor and manage auto parts inventory levels",
        "Coordinate with suppliers for timely stock replenishment",
        "Maintain accurate inventory records and documentation",
        "Conduct regular stock audits and cycle counts",
        "Optimize inventory turnover and reduce dead stock",
        "Implement inventory control procedures and protocols",
        "Track fast-moving and slow-moving parts",
        "Coordinate with sales team for stock availability",
        "Manage warehouse organization and part categorization",
        "Generate inventory reports and analysis",
      ],
      requirements: [
        "Bachelor's degree in Supply Chain Management or related field",
        "3+ years of experience in automotive inventory management",
        "Strong knowledge of auto parts categorization",
        "Experience with inventory management software",
        "Excellent organizational and analytical skills",
        "Attention to detail and accuracy in record keeping",
        "Good communication and coordination abilities",
        "Understanding of automotive supply chain processes",
        "Ability to work independently and manage priorities",
        "Knowledge of parts numbering systems and cross-referencing",
      ],
      benefits: [
        "Attractive salary package",
        "Medical insurance and health benefits",
        "Performance-based incentives",
        "Professional development support",
        "Modern inventory management tools",
        "Paid annual leave and holidays",
        "Career growth opportunities",
        "Collaborative work environment",
      ],
      jobType: "Full Time",
      location: "On-site",
      experience: "3 Years",
      deadline: "30 December 2025",
      salary: "Competitive based on experience",
    },
    {
      id: 3,
      title: "Automotive Technician",
      fullDescription:
        "Al Rehmaniah Auto Accessories is looking for a skilled Automotive Technician to provide technical support and installation guidance to our customers. The ideal candidate should be technically skilled with hands-on automotive experience. Responsibilities include parts installation guidance, technical customer support, quality inspection of auto parts, and assisting customers with part selection and compatibility.",
      responsibilities: [
        "Provide technical guidance on auto parts installation",
        "Assist customers with part compatibility and selection",
        "Conduct quality inspections of incoming auto parts",
        "Troubleshoot automotive issues and recommend solutions",
        "Support installation services and technical consultations",
        "Maintain technical documentation and service records",
        "Train sales staff on technical aspects of auto parts",
        "Handle warranty claims and technical disputes",
        "Stay updated with automotive technology advancements",
        "Coordinate with suppliers on technical specifications",
      ],
      requirements: [
        "Diploma in Automotive Technology or Mechanical Engineering",
        "4+ years of hands-on automotive repair experience",
        "Strong knowledge of automotive systems and components",
        "Experience with diagnostic tools and equipment",
        "Excellent problem-solving and troubleshooting skills",
        "Good customer service and communication abilities",
        "Knowledge of both petrol and diesel engine systems",
        "Understanding of automotive electrical systems",
        "Ability to read technical diagrams and manuals",
        "Professional certifications in automotive technology preferred",
      ],
      benefits: [
        "Competitive monthly salary",
        "Health insurance coverage",
        "Technical training and certification support",
        "Tool allowance and equipment access",
        "Performance bonuses",
        "Career development in automotive field",
        "Paid time off and holidays",
        "Professional networking opportunities",
      ],
      jobType: "Full Time",
      location: "On-site",
      experience: "4 Years",
      deadline: "30 December 2025",
    },
    {
      id: 4,
      title: "Procurement Officer",
      fullDescription:
        "Al Rehmaniah Auto Accessories seeks an experienced Procurement Officer to manage our supplier relationships and sourcing activities. The ideal candidate should have strong negotiation skills and supplier management experience. This role involves sourcing quality auto parts, negotiating with vendors, maintaining supplier relationships, and ensuring cost-effective procurement processes.",
      responsibilities: [
        "Source and evaluate new suppliers for auto parts",
        "Negotiate prices, terms, and contracts with vendors",
        "Maintain strong relationships with existing suppliers",
        "Ensure quality standards in all procured parts",
        "Monitor market trends and pricing fluctuations",
        "Coordinate with inventory team for procurement planning",
        "Handle supplier performance evaluations",
        "Manage procurement documentation and contracts",
        "Implement cost reduction and efficiency initiatives",
        "Resolve supplier-related issues and disputes",
      ],
      requirements: [
        "Bachelor's degree in Business Administration or Supply Chain Management",
        "6+ years of experience in automotive procurement",
        "Strong negotiation and vendor management skills",
        "Knowledge of automotive parts market and suppliers",
        "Understanding of quality standards and certifications",
        "Excellent analytical and cost management abilities",
        "Good communication and relationship building skills",
        "Experience with procurement software and systems",
        "Ability to travel for supplier visits and negotiations",
        "Knowledge of international trade and import procedures",
      ],
      benefits: [
        "Competitive salary with performance incentives",
        "Comprehensive medical insurance",
        "Travel allowances for supplier visits",
        "Professional development opportunities",
        "Bonus structure based on cost savings achieved",
        "Annual leave entitlement",
        "Career advancement in procurement field",
        "Modern procurement tools and systems",
      ],
      jobType: "Full Time",
      location: "On-site",
      experience: "6 Years",
      deadline: "30 December 2025",
    },
    {
      id: 5,
      title: "Customer Service Representative",
      fullDescription:
        "Join our customer service team at Al Rehmaniah Auto Accessories to provide exceptional support to our automotive customers. The ideal candidate should be customer-focused with excellent communication skills. This role involves handling customer inquiries, processing orders, providing product information, and ensuring customer satisfaction with our auto parts and services.",
      responsibilities: [
        "Handle customer inquiries via phone, email, and in-person",
        "Process orders and coordinate with warehouse for fulfillment",
        "Provide detailed product information and specifications",
        "Assist customers with part identification and compatibility",
        "Handle complaints and resolve customer issues",
        "Maintain customer database and interaction records",
        "Coordinate with technical team for complex inquiries",
        "Follow up on orders and ensure timely delivery",
        "Support warranty claims and return processes",
        "Participate in customer satisfaction improvement initiatives",
      ],
      requirements: [
        "High school diploma or Bachelor's degree preferred",
        "2+ years of experience in customer service",
        "Basic knowledge of automotive parts and systems",
        "Excellent verbal and written communication skills",
        "Strong problem-solving and patience abilities",
        "Computer literacy and database management skills",
        "Ability to multitask and work in fast-paced environment",
        "Customer service orientation and positive attitude",
        "Flexibility to work shifts and handle peak periods",
        "Bilingual abilities (Arabic/English) preferred",
      ],
      benefits: [
        "Competitive starting salary",
        "Health insurance benefits",
        "Customer service training and development",
        "Performance-based incentives",
        "Career growth opportunities in automotive industry",
        "Paid training period",
        "Annual leave and holidays",
        "Team recognition programs",
      ],
      jobType: "Full Time",
      location: "On-site",
      experience: "2 Years",
      deadline: "30 December 2025",
    },
    {
      id: 6,
      title: "Warehouse Supervisor",
      fullDescription:
        "Al Rehmaniah Auto Accessories is seeking a Warehouse Supervisor to oversee our auto parts storage and distribution operations. The ideal candidate should have strong leadership and logistics management skills. This role involves managing warehouse operations, inventory storage, coordinating shipments, and ensuring efficient parts distribution and delivery processes.",
      responsibilities: [
        "Supervise daily warehouse operations and staff",
        "Manage inventory storage and organization systems",
        "Coordinate incoming and outgoing shipments",
        "Ensure efficient parts picking and packing processes",
        "Maintain warehouse safety and security protocols",
        "Optimize warehouse layout and storage efficiency",
        "Manage delivery scheduling and logistics coordination",
        "Train warehouse staff on procedures and safety",
        "Prepare operational reports and performance metrics",
        "Implement process improvements and cost reductions",
      ],
      requirements: [
        "Bachelor's degree in Logistics or Operations Management",
        "4+ years of experience in warehouse supervision",
        "Strong leadership and team management skills",
        "Knowledge of automotive parts handling and storage",
        "Experience with warehouse management systems",
        "Understanding of inventory management principles",
        "Good organizational and problem-solving abilities",
        "Knowledge of safety regulations and procedures",
        "Ability to work in physically demanding environment",
        "Forklift operation certification preferred",
      ],
      benefits: [
        "Competitive salary package",
        "Medical and health insurance",
        "Leadership development programs",
        "Performance-based bonuses",
        "Safety training and equipment provided",
        "Career advancement opportunities",
        "Paid annual leave",
        "Employee recognition programs",
      ],
      jobType: "Full Time",
      location: "On-site",
      experience: "4 Years",
      deadline: "30 December 2025",
    },
  ];

  const job = jobs.find((j) => j.id === parseInt(jobId));

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#E9292A] mb-4">
            Job Not Found
          </h1>
          <button
            onClick={() => router.push("/careers")}
            className="text-[#E9292A] hover:text-[#d12621] font-medium"
          >
            ← Back to Careers
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a PDF or Word document");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, cv: file }));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, cv: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("experience", formData.experience);
      submitData.append("coverLetter", formData.coverLetter);
      submitData.append("jobTitle", job.title);
      submitData.append("jobId", jobId);
      if (formData.cv) {
        submitData.append("cv", formData.cv);
      }

      const response = await fetch("/api/job-application", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Application submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          experience: "",
          coverLetter: "",
          cv: null,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(
          data.error || "Failed to submit application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8  pt-30">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push("/career")}
          className="flex items-center gap-2 text-[#E9292A] hover:text-[#d12621] mb-6 group font-medium cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Careers</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side - Job Details (2 columns) */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Job Header */}
            <div className="bg-white rounded-[32px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)] p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[#E9292A] mb-6">
                {job.title}
              </h1>

              {/* Job Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-[#E9292A]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Job Type
                    </p>
                    <p className="font-bold text-gray-900">{job.jobType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Location
                    </p>
                    <p className="font-bold text-gray-900">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Experience
                    </p>
                    <p className="font-bold text-gray-900">{job.experience}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Deadline
                    </p>
                    <p className="font-bold text-gray-900">{job.deadline}</p>
                  </div>
                </div>
              </div>

              {job.salary && (
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl mt-6 border border-green-200">
                  <Award className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm text-green-700 font-medium">Salary</p>
                    <p className="text-green-900 font-bold">{job.salary}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-[32px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)] p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#E9292A] mb-4">
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {job.fullDescription}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-[32px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)] p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#E9292A] mb-6">
                Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="w-6 h-6 bg-green-600 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-[32px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)] p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#E9292A] mb-6">
                Requirements & Qualifications
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CheckCircle className="w-5 h-5 text-[#E9292A] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-[32px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)] p-6 md:p-8 border border-red-200">
              <h2 className="text-2xl font-bold text-[#E9292A] mb-6 flex items-center gap-2">
                <Award className="w-7 h-7 text-[#E9292A]" />
                What We Offer
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="w-2 h-2 bg-green-600 rounded-sm flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Application Form (1 column) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-[32px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)] p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-[#E9292A] mb-6">
                Apply for this Position
              </h2>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                      submitStatus.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-medium leading-relaxed">
                      {submitStatus.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-[#E9292A] transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.fullName || focusedField === "fullName"
                        ? "-translate-y-1/2 text-xs text-[#E9292A]"
                        : "translate-y-3 text-base text-gray-500"
                    }`}
                  >
                    Full Name *
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-[#E9292A] transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.email || focusedField === "email"
                        ? "-translate-y-1/2 text-xs text-[#E9292A]"
                        : "translate-y-3 text-base text-gray-500"
                    }`}
                  >
                    Email Address *
                  </label>
                </div>

                {/* Phone */}
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-[#E9292A] transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.phone || focusedField === "phone"
                        ? "-translate-y-1/2 text-xs text-[#E9292A]"
                        : "translate-y-3 text-base text-gray-500"
                    }`}
                  >
                    Phone Number *
                  </label>
                </div>

                {/* Years of Experience */}
                <div className="relative">
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("experience")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-[#E9292A] transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.experience || focusedField === "experience"
                        ? "-translate-y-1/2 text-xs text-[#E9292A]"
                        : "translate-y-3 text-base text-gray-500"
                    }`}
                  >
                    Years of Experience *
                  </label>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Upload CV/Resume *
                  </label>
                  {!formData.cv ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#E9292A] transition-colors bg-gray-50 hover:bg-red-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 text-center">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF or Word (Max 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        disabled={isSubmitting}
                        required
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#E9292A]" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formData.cv.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(formData.cv.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        disabled={isSubmitting}
                        className="p-1 hover:bg-red-100 rounded-full transition-colors disabled:opacity-50"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Cover Letter */}
                <div className="relative">
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("coverLetter")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-[#E9292A] transition-all resize-none peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.coverLetter || focusedField === "coverLetter"
                        ? "-translate-y-1/2 text-xs text-[#E9292A]"
                        : "translate-y-3 text-base text-gray-500"
                    }`}
                  >
                    Cover Letter (Optional)
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#E9292A] hover:bg-[#d12621] disabled:bg-red-300 text-white font-bold rounded-[84px] transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  By submitting this form, you agree to our privacy policy and
                  terms of service.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
