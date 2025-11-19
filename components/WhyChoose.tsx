"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Clock, Award, Users, Wrench, CheckCircle } from "lucide-react";

const WhyChooseAlRehmaniah = () => {
  const features = [
    {
      icon: Shield,
      title: "Genuine Quality Parts",
      description:
        "Only authentic, OEM and premium aftermarket parts from trusted manufacturers worldwide.",
    },
    {
      icon: Award,
      title: "Expert Knowledge",
      description:
        "Our automotive specialists provide professional guidance for perfect part compatibility.",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description:
        "Quick turnaround times with same-day delivery available for urgent requirements.",
    },
    {
      icon: Users,
      title: "Trusted by Professionals",
      description:
        "Preferred supplier for leading garages, mechanics, and automotive professionals across UAE.",
    },
    {
      icon: Wrench,
      title: "Installation Support",
      description:
        "Technical assistance and installation guidance to ensure perfect fitment every time.",
    },
    {
      icon: CheckCircle,
      title: "Warranty Assurance",
      description:
        "Comprehensive warranty coverage on all parts with hassle-free replacement guarantee.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
        {/* Single Card Container */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Image (30% width, full height) */}
            <motion.div
              className="relative lg:w-[45%] h-64 lg:h-auto"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <Image
                src="/landing/spare-parts-15.jpg"
                alt="Al Rehmaniah Auto Accessories - Premium car parts and professional service"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />

              {/* Overlay with brand badge */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              <motion.div
                className="absolute bottom-6 left-6 bg-[#E9292A] text-white px-6 py-3 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="text-sm font-medium">Trusted Since</div>
                <div className="text-2xl font-bold">2015</div>
              </motion.div>
            </motion.div>

            {/* Right Side - Content (70% width) */}
            <motion.div
              className="flex-1 p-8 lg:p-12 space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              {/* Title Section */}
              <div className="space-y-4">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-gray-700 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Why Choose{" "}
                  <span className="text-[#E9292A]">Al Rehmaniah</span>?
                </motion.h2>

                <motion.p
                  className="text-xl text-gray-700 leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Your trusted partner for premium auto parts and exceptional
                  service in the UAE. We deliver quality, reliability, and
                  expertise that keeps your vehicle running at its best.
                </motion.p>
              </div>

              {/* Features Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300 border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    whileHover={{
                      y: -5,
                      backgroundColor: "#f9fafb",
                      boxShadow: "0 10px 30px rgba(233, 41, 42, 0.1)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#E9292A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-[#E9292A]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Call to Action */}
              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <motion.button
                  className="bg-[#E9292A] hover:bg-[#d12621] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Our Parts Now
                </motion.button>

                <p className="text-sm text-gray-500 mt-3">
                  Join thousands of satisfied customers who trust Al Rehmaniah
                  for their automotive needs.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseAlRehmaniah;
