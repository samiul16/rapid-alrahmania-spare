import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingCart } from "lucide-react";

const ExclusiveDeals = () => {
  const deals = [
    {
      id: 1,
      title: "Hydraulic Suspension",
      image: "/Exclusive-Deals/1.png",
      rating: 5,
      orderText: "Order Now",
      hasDiscount: false,
      buttonStyle: "outline",
      reviews: 24,
      price: 180,
      originalPrice: 200,
    },
    {
      id: 2,
      title: "Hydraulic Brake",
      image: "/Exclusive-Deals/2.png",
      rating: 5,
      orderText: "Order Now",
      hasDiscount: true,
      discountText: "30% Off",
      buttonStyle: "filled",
      reviews: 24,
      price: 180,
      originalPrice: 200,
    },
    {
      id: 3,
      title: "Turbo Charger",
      image: "/Exclusive-Deals/3.png",
      rating: 5,
      orderText: "Order Now",
      hasDiscount: false,
      buttonStyle: "outline",
      reviews: 24,
      price: 180,
      originalPrice: 200,
    },
    {
      id: 4,
      title: "Alloy Wheel Rim",
      image: "/Exclusive-Deals/4.png",
      rating: 5,
      orderText: "Order Now",
      hasDiscount: false,
      buttonStyle: "outline",
      reviews: 24,
      price: 180,
      originalPrice: 200,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-5xl text-shadow-md font-bold text-[#E9292A] mb-4">
            Exclusive Deals{" "}
            <span className="text-gray-700">Across All Parts</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get premium car parts at special prices. Only for our valued
            customers
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative border border-gray-100/50 hover:border-[#E9292A]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(233, 41, 42, 0.25)",
                transition: { duration: 0.3 },
              }}
            >
              {/* Gradient Overlay Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Discount Badge */}
              {deal.hasDiscount && (
                <motion.div
                  className="absolute top-4 right-4 bg-gradient-to-r from-[#E9292A] to-[#d12621] text-white px-4 py-2 rounded-full text-sm font-bold z-20 shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {deal.discountText}
                </motion.div>
              )}

              {/* Wishlist Button */}
              <motion.button
                className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.1, backgroundColor: "#fef2f2" }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5 text-[#E9292A]" />
              </motion.button>

              {/* Product Image Container - Made Bigger */}
              <div className="relative p-4 pb-2">
                <motion.div
                  className="w-full h-64 relative bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl overflow-hidden group-hover:shadow-inner transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-brake.png";
                    }}
                  />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="px-6 pb-6 relative z-10">
                {/* Title and Rating Section - Side by Side */}
                <div className="flex items-start justify-between mb-4 gap-3">
                  {/* Product Title - Left Aligned */}
                  <motion.h3
                    className="text-2xl font-bold text-gray-800 leading-tight group-hover:text-[#E9292A] transition-colors duration-300 flex-1 text-left"
                    whileHover={{ scale: 1.02 }}
                  >
                    {deal.title}
                  </motion.h3>

                  {/* Rating Section - Right Aligned */}
                  <motion.div
                    className="flex items-center gap-1 flex-shrink-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {renderStars(deal.rating)}
                  </motion.div>
                </div>

                {/* Price Section - Made Bigger */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#E9292A] mb-2 leading-none">
                    AED {deal.price || "99"}
                  </div>
                  {deal.originalPrice && (
                    <div className="text-base text-gray-400 line-through">
                      AED {deal.originalPrice}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    className={`w-full py-3 px-6 rounded-2xl font-bold text-base transition-all duration-300 relative overflow-hidden group/btn ${
                      deal.buttonStyle === "filled"
                        ? "bg-gradient-to-r from-[#E9292A] to-[#d12621] text-white shadow-lg hover:shadow-xl"
                        : "bg-white text-[#E9292A] border-2 border-[#E9292A] hover:bg-[#E9292A] hover:text-white shadow-md"
                    }`}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      {deal.orderText}
                    </span>
                  </motion.button>

                  {/* Quick View Button */}
                  <motion.button
                    className="w-full py-2 px-4 text-[#E9292A] hover:text-[#d12621] font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" />
                    Quick View
                  </motion.button>
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#E9292A]/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveDeals;
