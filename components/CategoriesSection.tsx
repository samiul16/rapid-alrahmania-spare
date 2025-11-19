"use client";

import React from "react";
import { motion } from "framer-motion";
import { Disc, Car, Thermometer, Cog, Fuel, Lightbulb } from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      name: "Brake System",
      icon: Disc,
      description: "Brake pads, discs, drums & more",
    },
    {
      id: 2,
      name: "Body Parts",
      icon: Car,
      description: "Panels, mirrors, bumpers & accessories",
    },
    {
      id: 3,
      name: "Cooling System",
      icon: Thermometer,
      description: "Radiators, coolants, thermostats",
    },
    {
      id: 4,
      name: "Engine Parts",
      icon: Cog,
      description: "Pistons, belts, filters & components",
    },
    {
      id: 5,
      name: "Fuel System",
      icon: Fuel,
      description: "Pumps, injectors, tanks & filters",
    },
    {
      id: 6,
      name: "Light Systems",
      icon: Lightbulb,
      description: "Headlights, taillights, bulbs & LEDs",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Explore Our <span className="text-[#E9292A]">Categories</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-5xl mx-auto">
            Find every car part you need in one place. Browse by category and
            discover quality products for your vehicle.
          </p>
        </motion.div>

        {/* Horizontal Rectangle Container */}
        <motion.div
          className="bg-gradient-to-b from-[#E9292A] to-red-700 rounded-4xl shadow-[10px_10px_30px_0_rgba(233,41,42,0.5)] overflow-hidden py-8 sm:py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Categories Row - Responsive Layout */}
          <div className="flex flex-col sm:flex-row">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className={`group cursor-pointer flex-1 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-all duration-300 ${
                  // Mobile: bottom border except for last item
                  // Desktop: right border except for last item
                  index !== categories.length - 1
                    ? "border-b sm:border-b-0 sm:border-r border-white/50"
                    : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Icon */}
                <motion.div
                  className="mb-3 sm:mb-4"
                  whileHover={{
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                >
                  <category.icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 text-white" />
                </motion.div>

                {/* Category Name */}
                <motion.h3
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white leading-tight px-2"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  {category.name}
                </motion.h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Button */}
        {/* <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="bg-[#E9292A] hover:bg-[#d12621] text-white font-bold py-4 px-8 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Products
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default CategoriesSection;
