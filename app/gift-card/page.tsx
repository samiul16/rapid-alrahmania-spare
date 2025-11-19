"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import CommonHeader from "@/components/Common/CommonHeader";
import {
  Gift,
  Building,
  Sparkles,
  Calendar,
  Users,
  CreditCard,
  Mail,
  Bell,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // Here you would typically send the email to your backend
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const features = [
    {
      icon: CreditCard,
      title: "Buy gift card vouchers for companies",
      description:
        "Purchase flexible vouchers that businesses can use for their uniform needs",
      color: "blue",
    },
    {
      icon: Gift,
      title: "Gift an embroidery service to another business",
      description:
        "Share the gift of professional embroidery services with partner companies",
      color: "purple",
    },
    {
      icon: Calendar,
      title: "Preload amount for monthly uniform orders",
      description:
        "Set up convenient prepaid accounts for recurring uniform requirements",
      color: "green",
    },
  ];

  const useCases = [
    { icon: Building, text: "Corporate gifting", color: "blue" },
    { icon: Sparkles, text: "Business birthdays", color: "pink" },
    { icon: Calendar, text: "Events", color: "purple" },
    { icon: Users, text: "Team uniform support", color: "green" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div data-aos="fade-up">
        <CommonHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Gift Cards", isActive: true },
          ]}
        />
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-24 py-12">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#E9292A] to-[#E9292A] rounded-full mb-8"
          >
            <Gift className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            Gift Cards
            <span className="block text-3xl md:text-4xl text-[#E9292A] mt-2">
              Coming Soon!
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Get ready for a revolutionary way to share the gift of professional
            uniforms and embroidery services with businesses you care about.
          </motion.p>
        </motion.div>

        {/* Coming Soon Badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex justify-center mb-16"
        >
          <motion.div
            variants={cardVariants}
            className="bg-gradient-to-r from-[#E9292A] to-[#E9292A] text-white px-8 py-4 rounded-full shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6" />
              <span className="text-lg font-semibold">
                Gift Card Program Launching Soon
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          >
            What You&apos;ll Be Able To Do
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div
                  className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-6`}
                >
                  <feature.icon
                    className={`w-8 h-8 text-${feature.color}-600`}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8"
            >
              Perfect For
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div
                    className={`w-16 h-16 bg-${useCase.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <useCase.icon
                      className={`w-8 h-8 text-${useCase.color}-600`}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    {useCase.text}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
