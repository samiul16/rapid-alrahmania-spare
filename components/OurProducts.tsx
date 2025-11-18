"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Eye,
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { addToCart, openCart } from "@/redux/hooks/cart/cartSlice";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
}

const HotProductsSection = () => {
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    "All",
    "Brake System",
    "Engine Parts",
    "Body Parts",
    "Cooling System",
    "Fuel System",
  ];

  const products: Product[] = [
    {
      id: 1,
      title: "Car AC Compressor",
      subtitle:
        "Car AC Compressor that is designed to improve the performance of your car's air conditioning system.",
      price: 180,
      rating: 4.8,
      reviews: 24,
      image: "/products/Car AC Compressor.jpg",
      category: "Brake System",
    },
    {
      id: 2,
      title: "Premium Disc Brake Rotors",
      subtitle:
        "Premium Disc Brake Rotors that is designed to improve the performance of your car's disc brake rotors.",
      price: 280,
      rating: 4.6,
      reviews: 32,
      image: "/products/Premium Disc Brake Rotors.png",
      category: "Cooling System",
    },
    {
      id: 3,
      title: "Universal Side Mirror Indicator Light",
      subtitle:
        "Universal Side Mirror Indicator Light that is designed to improve the performance of your car's side mirror indicator light.",
      price: 45,
      rating: 4.9,
      reviews: 56,
      image: "/products/Universal Side Mirror Indicator Light.png",
      category: "Engine Parts",
    },
    {
      id: 4,
      title: "Multi-Function Steering Control Buttons",
      subtitle:
        "Multi-Function Steering Control Buttons that is designed to improve the performance of your car's steering control buttons.",
      price: 320,
      rating: 4.7,
      reviews: 18,
      image: "/products/Multi-Function Steering Control Buttons.png",
      category: "Body Parts",
    },

    {
      id: 5,
      title: "Fuel Pump Module",
      subtitle:
        "Reliable fuel pump module for consistent fuel delivery. Electric pump with high-flow capacity and built-in pressure regulator.",
      price: 220,
      rating: 4.8,
      reviews: 41,
      image: "/products/fuel pump.webp",
      category: "Fuel System",
    },
    {
      id: 6,
      title: "Brake Pad Set",
      subtitle:
        "Premium ceramic brake pads for smooth, quiet braking. Low dust formula with excellent heat resistance and extended wear life.",
      price: 85,
      rating: 4.9,
      reviews: 67,
      image: "/products/break pad.webp",
      category: "Brake System",
    },
    {
      id: 7,
      title: "LED Fog Light",
      subtitle:
        "LED Fog Light that is designed to improve the performance of your car's fog light.",
      price: 35,
      rating: 4.7,
      reviews: 89,
      image: "/products/LED Fog Light kit.png",
      category: "Engine Parts",
    },
    {
      id: 8,
      title: "Side Mirror Assembly",
      subtitle:
        "Complete side mirror assembly with power adjustment. Clear glass with wide-angle view and heated defogging capability.",
      price: 150,
      rating: 4.5,
      reviews: 29,
      image: "/products/side mirror.jpg",
      category: "Body Parts",
    },
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    // Convert product to cart format
    const cartProduct = {
      id: product.id,
      name: product.title,
      price: product.price,
      image_url: product.image,
      currency: "AED",
    };

    // Generate unique cart ID
    const cartId = `${product.id}-${Date.now()}`;

    // Add to cart with correct payload structure
    dispatch(
      addToCart({
        items: cartProduct,
        quantity: 1,
        cartId: cartId,
      })
    );

    // Open the cart sidebar
    dispatch(openCart());
  };

  // Cards per slide
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(filteredProducts.length / cardsPerSlide);

  // Get current products to display
  const getCurrentProducts = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return filteredProducts.slice(startIndex, startIndex + cardsPerSlide);
  };

  // Navigation functions
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Reset slide when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentSlide(0);
  };

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header Section */}
        <motion.div
          className="flex flex-col items-center gap-8 md:gap-10 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
        >
          {/* Title */}
          <h2 className="text-5xl sm:text-5xl font-bold text-[#E9292A] text-shadow-md text-center">
            Hot Products of the Month
          </h2>

          <p className="text-gray-600 text-lg max-w-5xl mx-auto">
            Trending and must-have car parts handpicked for you
          </p>

          {/* Category Filter */}
          <div className="bg-white rounded-[50px] shadow-xl border border-[#E9292A]/20 px-6 sm:px-10 py-4 flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`rounded-[50px] text-base sm:text-lg font-bold transition-all duration-300 flex items-center justify-center cursor-pointer whitespace-nowrap ${
                  activeCategory === category
                    ? "min-w-40 h-12 px-4 bg-[#E9292A] text-white shadow-md"
                    : "text-black/70 hover:text-[#E9292A] px-4 py-2"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <motion.button
                onClick={goToPrevSlide}
                className="absolute left-5 top-[50%] -translate-y-1/2 z-10 w-12 h-12 bg-[#E9292A] hover:bg-[#d12621] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer -ml-6 lg:-ml-20"
                style={{ marginTop: "15px" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                onClick={goToNextSlide}
                className="absolute right-5 top-[50%] -translate-y-1/2 z-10 w-12 h-12 bg-[#E9292A] hover:bg-[#d12621] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 -mr-6 lg:-mr-20"
                style={{ marginTop: "15px" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </>
          )}

          {/* Products Grid */}
          <div className="relative min-h-[600px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${currentSlide}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
              >
                {getCurrentProducts().map((product) => (
                  <motion.div
                    key={product.id}
                    className="group bg-white rounded-[20px] shadow-[12px_12px_16px_0px_rgba(0,0,0,0.10)] overflow-hidden hover:shadow-[4px_10px_24px_0px_rgba(0,0,0,0.15)] transition-all duration-300"
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                  >
                    {/* Product Image */}
                    <div className="relative w-full h-64 sm:h-72 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover rounded-t-[20px] group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <motion.button
                          onClick={() => toggleWishlist(product.id)}
                          className="w-8 h-8 bg-white rounded-full shadow-[0px_2px_6px_0px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-red-50 cursor-pointer transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              wishlist.includes(product.id)
                                ? "fill-[#E9292A] text-[#E9292A]"
                                : "text-[#E9292A]"
                            }`}
                          />
                        </motion.button>
                        <motion.button
                          className="w-8 h-8 bg-white rounded-full shadow-[0px_2px_6px_0px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-red-50 cursor-pointer transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-4 h-4 text-[#E9292A]" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-4 sm:p-6 space-y-4">
                      {/* Rating and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                            <span className="text-black/50 font-bold text-sm sm:text-base">
                              {product.rating.toFixed(1)} ({product.reviews})
                            </span>
                          </div>
                        </div>
                        <span className="text-[#E9292A] font-bold text-md text-shadow-sm sm:text-base">
                          AED {product.price}
                        </span>
                      </div>

                      {/* Product Title */}
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-xl font-bold text-black leading-tight">
                          {product.title}
                        </h3>
                        <p className="text-base sm:text-base font-semibold text-black/50">
                          {product.subtitle}
                        </p>
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        className="w-full py-2.5 sm:py-3 rounded-[50px] bg-gradient-to-r from-[#E9292A] to-red-700 border border-[#E9292A] font-bold text-base sm:text-lg hover:bg-[#d12621] text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-[#E9292A] w-8"
                      : "bg-[#E9292A]/30 w-2 hover:bg-[#E9292A]/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl text-gray-500">
              No products found in this category
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HotProductsSection;
