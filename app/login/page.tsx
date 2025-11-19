"use client";

import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast } from "react-hot-toast";
import CommonHeader from "@/components/Common/CommonHeader";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: rememberMe,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful! Redirecting...");
        setSubmitStatus({
          type: "success",
          message: "Login successful! You will be redirected shortly.",
        });

        // Reset form
        setFormData({
          email: "",
          password: "",
        });

        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        toast.error(data.error || "Login failed. Please try again.");
        setSubmitStatus({
          type: "error",
          message: data.error || "Invalid email or password. Please try again.",
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
          { label: "Login", isActive: true },
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
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-red-100">Sign in to continue your journey</p>
              </div>
            </div>

            {/* Login Form Card */}
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#E9292A] border-gray-300 rounded focus:ring-[#E9292A] focus:ring-2 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#E9292A] hover:text-red-600 font-semibold transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 bg-gradient-to-r from-[#E9292A] to-red-600 hover:bg-red-600 rounded-[84px] text-white text-xl font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
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
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <LogIn className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Register Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="text-[#E9292A] font-semibold hover:text-red-600 transition-colors"
                    >
                      Create Account
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
