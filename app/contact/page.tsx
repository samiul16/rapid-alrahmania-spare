"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast } from "react-hot-toast";
import CommonHeader from "@/components/Common/CommonHeader";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  description: string;
  message: string;
}

interface ContactCard {
  id: number;
  icon: React.ElementType;
  title: string;
  content: string;
  link?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    description: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const contactInfo: ContactCard[] = [
    {
      id: 1,
      icon: Phone,
      title: "Phone",
      content: "+971 54 324 7559",
      link: "tel:+971543247559",
    },
    {
      id: 2,
      icon: Mail,
      title: "Email",
      content: "marium.marufa@gmail.com",
      link: "mailto:marium.marufa@gmail.com",
    },
    {
      id: 3,
      icon: MapPin,
      title: "Location",
      content: "Al Rashidiya 1 - Ajman - United Arab Emirates",
      link: "https://maps.google.com/?q=Al+Rashidiya+1+Ajman+United+Arab+Emirates",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          description: "",
          message: "",
        });

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <CommonHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", isActive: true },
        ]}
      />
      <div className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          {/* Page Title */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-500 mb-4">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Side - Contact Info Cards */}
            <motion.div
              className="flex flex-col justify-between gap-6 order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {contactInfo.map((info) => {
                const Icon = info.icon;

                return (
                  <motion.div
                    key={info.id}
                    className="group flex-1"
                    variants={cardVariants}
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  >
                    <div className="bg-white rounded-[32px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)] p-6 md:p-8 h-full flex flex-col hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center group-hover:bg-sky-500 transition-colors duration-300"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-7 h-7 text-sky-500 group-hover:text-white transition-colors duration-300" />
                        </motion.div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-sky-500">
                          {info.title}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex items-center">
                        {info.link ? (
                          <a
                            href={info.link}
                            target={
                              info.title === "Location" ? "_blank" : undefined
                            }
                            rel={
                              info.title === "Location"
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-lg sm:text-xl font-bold text-sky-600 hover:text-sky-500 transition-colors duration-300 block"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-lg sm:text-xl font-bold text-sky-500 leading-relaxed">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              className="bg-white rounded-[32px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)] p-6 sm:p-8 lg:p-10 order-1 lg:order-2 flex flex-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={formVariants}
            >
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-bold text-sky-500 mb-6">
                  Send us a Message
                </h2>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className={`mb-5 p-4 rounded-lg flex items-start gap-3 ${
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

                {/* Form Fields Container */}
                <div className="space-y-5 flex-1">
                  {/* Name Field */}
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
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

                  {/* Phone Field */}
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
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

                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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

                  {/* Message Textarea */}
                  <div className="relative flex-1">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      required
                      className="w-full h-full min-h-[120px] px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-sky-500 transition-all resize-none peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    />
                    <label
                      className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                        formData.message || focusedField === "message"
                          ? "-translate-y-1/2 text-xs text-sky-500"
                          : "translate-y-3 text-base text-gray-500"
                      }`}
                    >
                      Message *
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 bg-sky-500 hover:bg-sky-600 rounded-[84px] text-white text-xl font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-lg"
                    }`}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
