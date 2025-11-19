"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast } from "react-hot-toast";

import Link from "next/link";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Redirecting to login...");
        setSubmitStatus({
          type: "success",
          message:
            "Account created successfully! You will be redirected to login page.",
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        toast.error(data.error || "Registration failed. Please try again.");
        setSubmitStatus({
          type: "error",
          message: data.error || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      {/* <CommonHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Register", isActive: true },
        ]}
      /> */}
      <div className="w-full bg-gray-50 py-12 md:py-16 lg:py-20 min-h-screen flex items-center mt-4">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full">
          <motion.div
            className="max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Header */}
            <div className="bg-[#E9292A] text-white text-center py-8 mb-4 rounded-[32px]">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-2"> Create Account</h1>
                <p className="text-red-100">
                  Join us today and start your journey
                </p>
              </div>
            </div>
            {/* Page Title */}
            {/* <motion.div
                className="w-20 h-20 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <UserPlus className="w-10 h-10 text-white" />
              </motion.div> */}
            {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-500 mb-4">
                Create Account
              </h1> */}
            {/* <p className="text-xl text-sky-500">
                Join us today and start your journey
              </p> */}

            {/* Registration Form Card */}
            <div className="bg-white rounded-[32px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)] p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className={`p-4 rounded-lg flex items-start gap-3 ${
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

                {/* Full Name Field */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5 text-[#E9292A]" />
                  </div>
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
                    className={`w-full pl-12 pr-4 py-3 bg-white border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-[#E9292A] transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                      focusedField === "fullName"
                        ? "rounded-lg"
                        : "rounded-full"
                    }`}
                  />
                  <label
                    className={`absolute left-12 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.fullName || focusedField === "fullName"
                        ? "-translate-y-1/2 text-xs text-[#E9292A]"
                        : "translate-y-3 text-base text-gray-500"
                    }`}
                  >
                    Full Name *
                  </label>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-5 h-5 text-[#E9292A]" />
                  </div>
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
                    className={`w-full pl-12 pr-4 py-3 bg-white border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-[#E9292A] transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                      focusedField === "email" ? "rounded-lg" : "rounded-full"
                    }`}
                  />
                  <label
                    className={`absolute left-12 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.email || focusedField === "email"
                        ? "-translate-y-1/2 text-xs text-[#E9292A]"
                        : "translate-y-3 text-base text-gray-500"
                    }`}
                  >
                    Email Address *
                  </label>
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone className="w-5 h-5 text-[#E9292A]" />
                  </div>
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
                    className={`w-full pl-12 pr-4 py-3 bg-white border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-[#E9292A] transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                      focusedField === "phone" ? "rounded-lg" : "rounded-full"
                    }`}
                  />
                  <label
                    className={`absolute left-12 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.phone || focusedField === "phone"
                        ? "-translate-y-1/2 text-xs text-[#E9292A]"
                        : "translate-y-3 text-base text-gray-500"
                    }`}
                  >
                    Phone Number *
                  </label>
                </div>

                {/* Password Field */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5 text-[#E9292A]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                    className={`w-full pl-12 pr-12 py-3 bg-white border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-[#E9292A] transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                      focusedField === "password"
                        ? "rounded-lg"
                        : "rounded-full"
                    }`}
                  />
                  <label
                    className={`absolute left-12 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.password || focusedField === "password"
                        ? "-translate-y-1/2 text-xs text-[#E9292A]"
                        : "translate-y-3 text-base text-gray-500"
                    }`}
                  >
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E9292A] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5 text-[#E9292A]" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                    className={`w-full pl-12 pr-12 py-3 bg-white border border-gray-300 text-gray-900 text-base font-normal focus:outline-none focus:border-[#E9292A] transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                      focusedField === "confirmPassword"
                        ? "rounded-lg"
                        : "rounded-full"
                    }`}
                  />
                  <label
                    className={`absolute left-12 top-0 bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.confirmPassword ||
                      focusedField === "confirmPassword"
                        ? "-translate-y-1/2 text-xs text-[#E9292A]"
                        : "translate-y-3 text-base text-gray-500"
                    }`}
                  >
                    Confirm Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E9292A] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {/* <div className="bg-sky-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2 font-medium">
                    Password must contain:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          formData.password.length >= 8
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          formData.password === formData.confirmPassword &&
                          formData.password.length > 0
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      Passwords match
                    </li>
                  </ul>
                </div> */}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 bg-[#E9292A] hover:bg-red-700 rounded-[84px] text-white text-xl font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-lg cursor-pointer"
                  }`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <UserPlus className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-[#E9292A] font-semibold hover:text-red-700 transition-colors"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
