"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const AboutAlRahmaniah = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: "mission",
      title: "Our Mission",
      content:
        "To deliver top-quality car parts and accessories with honesty, reliability, and unmatched customer service, ensuring every vehicle runs safely and efficiently.",
    },
    {
      id: "vision",
      title: "Our Vision",
      content:
        "To become the leading automotive parts provider recognized for quality, innovation, and customer satisfaction, empowering car owners to drive with confidence.",
    },
    {
      id: "values",
      title: "Our Values",
      content: [
        "Quality: We provide only genuine, high-performance car parts.",
        "Integrity: Honest service and transparent pricing are our core principles.",
        "Customer Satisfaction: Your trust and happiness are our top priorities.",
        "Innovation: We continually adopt the latest technologies and products in the automotive industry.",
        "Reliability: Count on us for timely delivery and consistent support.",
      ],
    },
  ];

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-16 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Title */}
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About <span className="text-red-500">Al Rahmaniah</span> Auto
              Accessories
            </motion.h2>

            {/* Description */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                Al Rahmaniah Auto Accessories is your ultimate destination for
                premium car parts and accessories, trusted by car enthusiasts
                and professionals alike. We are committed to delivering
                high-quality, durable, and reliable solutions for every vehicle,
                from daily commuters to high-performance cars.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                With years of experience in the automotive industry, our team
                understands the importance of genuine parts and precision
                engineering. We carefully source and offer only the
                best-in-class products, ensuring your car performs at its peak.
              </p>
            </motion.div>

            {/* Expandable Sections */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {sections.map((section, index) => (
                <div key={section.id} className="space-y-3">
                  {/* Button - Always rounded full */}
                  <motion.button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#E9292A] to-[#d12621] text-white font-semibold text-left flex items-center justify-between hover:from-[#d12621] hover:to-[#b91c1c] transition-all duration-300 cursor-pointer rounded-full shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="text-lg">{section.title}</span>
                    <motion.div
                      animate={{
                        rotate: expandedSection === section.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </motion.button>

                  {/* Content - Separate rounded container */}
                  <AnimatePresence>
                    {expandedSection === section.id && (
                      <motion.div
                        className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {section.id === "values" ? (
                          <ul className="space-y-3">
                            {(section.content as string[]).map(
                              (value, valueIndex) => (
                                <motion.li
                                  key={valueIndex}
                                  className="text-gray-600 leading-relaxed flex items-start gap-3"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: valueIndex * 0.1,
                                  }}
                                >
                                  <span className="w-2 h-2 bg-[#E9292A] rounded-full mt-2 flex-shrink-0"></span>
                                  {value}
                                </motion.li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="text-gray-600 leading-relaxed">
                            {section.content as string}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Images */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Top Image */}
            <motion.div
              className="relative h-64 md:h-80 xl:h-96 rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/about/spare-parts-warehouse-6.webp"
                alt="Auto parts warehouse with organized inventory"
                fill
                className="object-cover shadow hover:scale-105 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* Bottom Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="relative h-48 md:h-56 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/about/spare-parts-warehouse-2.webp"
                  alt="Modern auto parts showroom"
                  fill
                  className="object-cover shadow hover:scale-105 transition-all duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
              <motion.div
                className="relative h-48 md:h-56 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/about/spare-parts-warehouse-3.webp"
                  alt="Professional customer service and consultation"
                  fill
                  className="object-cover shadow hover:scale-105 transition-all duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutAlRahmaniah;
