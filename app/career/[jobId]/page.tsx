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

  // Job data - In production, fetch from API/database
  const jobs: Job[] = [
    {
      id: 1,
      title: "Production Supervisor",
      fullDescription:
        "Al Buraq Garments is seeking an experienced Production Supervisor to lead our production teams and ensure smooth workflow on the factory floor. The ideal candidate should have strong leadership skills, the ability to manage production teams, and ensure smooth workflow on the factory floor. Responsibilities include overseeing daily operations, maintaining production targets, and ensuring product quality and efficiency.",
      responsibilities: [
        "Supervise and coordinate daily production activities",
        "Manage production teams and ensure optimal workflow",
        "Monitor production targets and ensure timely completion",
        "Maintain quality standards throughout the production process",
        "Implement efficiency improvements and cost reduction measures",
        "Ensure compliance with safety regulations and protocols",
        "Train and mentor production staff members",
        "Coordinate with other departments for smooth operations",
        "Prepare production reports and performance metrics",
        "Handle production-related issues and troubleshooting",
      ],
      requirements: [
        "Bachelor's degree in Textile Engineering or related field",
        "3+ years of experience in garment production supervision",
        "Strong leadership and team management skills",
        "Knowledge of garment manufacturing processes",
        "Understanding of quality control procedures",
        "Excellent problem-solving and decision-making abilities",
        "Good communication and interpersonal skills",
        "Ability to work under pressure and meet deadlines",
        "Knowledge of production planning and scheduling",
        "Familiarity with safety regulations in manufacturing",
      ],
      benefits: [
        "Competitive salary package",
        "Health and medical insurance",
        "Performance-based bonuses",
        "Professional development opportunities",
        "Transportation allowance",
        "Annual leave and holidays",
        "Career advancement prospects",
        "Team building activities",
      ],
      jobType: "Full Time",
      location: "On-site",
      experience: "3 Years",
      deadline: "30 November 2025",
      salary: "Competitive based on experience",
    },
    {
      id: 2,
      title: "Quality Assurance Officer",
      fullDescription:
        "Al Buraq Garments is looking for a dedicated Quality Assurance Officer with a keen eye for detail and a commitment to excellence. The ideal candidate should have a keen eye for detail and a commitment to excellence. Responsibilities include monitoring garment quality at every stage, identifying defects, and ensuring all products meet company and buyer standards.",
      responsibilities: [
        "Monitor garment quality at all production stages",
        "Conduct thorough inspections of raw materials and finished products",
        "Identify defects and quality issues promptly",
        "Ensure compliance with company and buyer quality standards",
        "Implement quality control procedures and protocols",
        "Maintain detailed quality reports and documentation",
        "Coordinate with production teams to resolve quality issues",
        "Train staff on quality standards and procedures",
        "Conduct final inspections before shipment",
        "Work with buyers to understand specific quality requirements",
      ],
      requirements: [
        "Bachelor's degree in Textile Engineering or Quality Management",
        "6+ years of experience in garment quality assurance",
        "Strong knowledge of garment construction and defects",
        "Understanding of international quality standards",
        "Excellent attention to detail and analytical skills",
        "Good communication and reporting skills",
        "Ability to work independently and make decisions",
        "Knowledge of quality control tools and techniques",
        "Experience with buyer quality requirements",
        "Proficiency in quality management software",
      ],
      benefits: [
        "Attractive salary package",
        "Medical insurance coverage",
        "Performance-based incentives",
        "Professional certification support",
        "Career advancement opportunities",
        "Paid time off and holidays",
        "Modern work environment",
        "Continuous learning opportunities",
      ],
      jobType: "Full Time",
      location: "On-site",
      experience: "6 Years",
      deadline: "30 November 2025",
      salary: "Negotiable based on qualifications",
    },
    {
      id: 3,
      title: "Merchandiser",
      fullDescription:
        "Al Buraq Garments is seeking a highly organized Merchandiser with excellent communication and negotiation skills. The ideal candidate should be highly organized with excellent communication and negotiation skills. Responsibilities include managing buyer correspondence, following up on orders, coordinating with production teams, and ensuring timely delivery.",
      responsibilities: [
        "Manage buyer correspondence and communication",
        "Follow up on orders and ensure timely delivery",
        "Coordinate with production teams for order execution",
        "Negotiate prices and terms with buyers",
        "Prepare and maintain order documentation",
        "Monitor production schedules and delivery timelines",
        "Handle sample development and approval processes",
        "Resolve any order-related issues or disputes",
        "Maintain strong relationships with existing buyers",
        "Identify and develop new business opportunities",
      ],
      requirements: [
        "Bachelor's degree in Business Administration or Textile Management",
        "7+ years of experience in garment merchandising",
        "Excellent communication and negotiation skills",
        "Strong organizational and time management abilities",
        "Knowledge of garment costing and pricing",
        "Understanding of international trade procedures",
        "Proficiency in MS Office and merchandising software",
        "Ability to handle multiple orders simultaneously",
        "Good relationship management skills",
        "Knowledge of fabric and garment specifications",
      ],
      benefits: [
        "Competitive monthly salary",
        "Health insurance benefits",
        "Performance bonuses and incentives",
        "International travel opportunities",
        "Career growth prospects",
        "Paid annual leave",
        "Professional networking opportunities",
        "Commission-based rewards",
      ],
      jobType: "Full Time",
      location: "On-site",
      experience: "7 Years",
      deadline: "30 November 2025",
    },
    {
      id: 4,
      title: "HR & Compliance Executive",
      fullDescription:
        "Join Al Buraq Garments as an HR & Compliance Executive. The ideal candidate should be people-oriented and detail-focused. Responsibilities include managing HR activities, maintaining compliance with labor laws and factory regulations, and supporting employee welfare and engagement programs.",
      responsibilities: [
        "Manage recruitment, selection, and onboarding processes",
        "Maintain compliance with labor laws and regulations",
        "Ensure adherence to factory compliance standards",
        "Develop and implement HR policies and procedures",
        "Handle employee relations and grievance management",
        "Coordinate employee welfare and engagement programs",
        "Manage payroll processing and benefits administration",
        "Conduct training and development programs",
        "Maintain employee records and documentation",
        "Support performance management and appraisal processes",
      ],
      requirements: [
        "Bachelor's degree in Human Resources or related field",
        "8+ years of experience in HR and compliance",
        "Strong knowledge of labor laws and regulations",
        "Understanding of factory compliance requirements",
        "Excellent interpersonal and communication skills",
        "Experience in employee relations and conflict resolution",
        "Knowledge of HR software and management systems",
        "Strong organizational and administrative skills",
        "Ability to handle confidential information",
        "Professional HR certification preferred",
      ],
      benefits: [
        "Competitive starting salary",
        "Comprehensive medical insurance",
        "Professional development support",
        "Flexible working arrangements",
        "Employee welfare programs",
        "Annual leave entitlement",
        "Modern HR tools and systems",
        "Collaborative work environment",
      ],
      jobType: "Full Time",
      location: "On-site",
      experience: "8 Years",
      deadline: "30 November 2025",
    },
  ];

  const job = jobs.find((j) => j.id === parseInt(jobId));

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cyan-900 mb-4">
            Job Not Found
          </h1>
          <button
            onClick={() => router.push("/careers")}
            className="text-sky-500 hover:text-sky-600 font-medium"
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
          className="flex items-center gap-2 text-sky-500 hover:text-sky-600 mb-6 group font-medium cursor-pointer"
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
              <h1 className="text-3xl md:text-4xl font-bold text-sky-500 mb-6">
                {job.title}
              </h1>

              {/* Job Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Job Type
                    </p>
                    <p className="font-bold text-cyan-900">{job.jobType}</p>
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
                    <p className="font-bold text-cyan-900">{job.location}</p>
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
                    <p className="font-bold text-cyan-900">{job.experience}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Deadline
                    </p>
                    <p className="font-bold text-cyan-900">{job.deadline}</p>
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
              <h2 className="text-2xl font-bold text-sky-500 mb-4">
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {job.fullDescription}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-[32px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)] p-6 md:p-8">
              <h2 className="text-2xl font-bold text-sky-500 mb-6">
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
              <h2 className="text-2xl font-bold text-sky-500 mb-6">
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
                    <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-[32px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)] p-6 md:p-8 border border-cyan-200">
              <h2 className="text-2xl font-bold text-sky-500 mb-6 flex items-center gap-2">
                <Award className="w-7 h-7 text-sky-500" />
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
              <h2 className="text-2xl font-bold text-sky-500 mb-6">
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
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-sky-500 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.fullName || focusedField === "fullName"
                        ? "-translate-y-1/2 text-xs text-sky-500"
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
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-sky-500 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.email || focusedField === "email"
                        ? "-translate-y-1/2 text-xs text-sky-500"
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
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-sky-500 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.phone || focusedField === "phone"
                        ? "-translate-y-1/2 text-xs text-sky-500"
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
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-sky-500 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.experience || focusedField === "experience"
                        ? "-translate-y-1/2 text-xs text-sky-500"
                        : "translate-y-3 text-base text-gray-500"
                    }`}
                  >
                    Years of Experience *
                  </label>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-semibold text-cyan-900 mb-2">
                    Upload CV/Resume *
                  </label>
                  {!formData.cv ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-sky-500 transition-colors bg-gray-50 hover:bg-sky-50">
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
                        <FileText className="w-5 h-5 text-sky-500" />
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
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-sky-500 transition-all resize-none peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.coverLetter || focusedField === "coverLetter"
                        ? "-translate-y-1/2 text-xs text-sky-500"
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
                  className="w-full py-4 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-bold rounded-[84px] transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
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
