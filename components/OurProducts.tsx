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
    "Sweater",
    "Head Gear",
    "Gloves",
    "Shawls & Wraps",
    "Essentials",
  ];

  const products: Product[] = [
    {
      id: 1,
      title: "Hoodie For Women",
      subtitle:
        "Supreme comfort meets lasting durability. Perfect for cold-weather layering, designed with ultra-soft fleece and a tailored fit.",
      price: 290,
      rating: 5.0,
      reviews: 12,
      image: "/products/garments-hot-product-1.jpg",
      category: "Sweater",
    },
    {
      id: 2,
      title: "Jacket For Men",
      subtitle:
        "Seamlessly transition from work to weekend. A classic, smart-casual design crafted with attention to fit and high-end finishing.",
      price: 290,
      rating: 5.0,
      reviews: 12,
      image: "/products/garments-hot-product-2.jpg",
      category: "Sweater",
    },
    {
      id: 3,
      title: "Girls Woolen Hat",
      subtitle:
        "Snug warmth for winter adventures. Crafted from soft, breathable wool to keep her comfortable and protected in the cold.",
      price: 290,
      rating: 5.0,
      reviews: 12,
      image: "/products/garments-hot-product-3.jpg",
      category: "Head Gear",
    },
    {
      id: 4,
      title: "Winter Gloves",
      subtitle:
        "Supreme comfort meets lasting durability. Perfect for cold-weather layering, designed with ultra-soft fleece and a tailored fit.",
      price: 150,
      rating: 4.8,
      reviews: 8,
      image: "/products/garments-hot-product-1.jpg",
      category: "Gloves",
    },
    {
      id: 5,
      title: "Kashmiri Shaal",
      subtitle:
        "Snug warmth for winter adventures. Crafted from soft, breathable wool to keep her comfortable and protected in the cold.",
      price: 450,
      rating: 5.0,
      reviews: 20,
      image: "/products/garments-hot-product-2.jpg",
      category: "Shaal",
    },
    {
      id: 6,
      title: "Traditional Sweater",
      subtitle:
        "Seamlessly transition from work to weekend. A classic, smart-casual design crafted with attention to fit and high-end finishing.",
      price: 320,
      rating: 4.9,
      reviews: 15,
      image: "/products/garments-hot-product-3.jpg",
      category: "Bangladeshi",
    },
    {
      id: 7,
      title: "Cotton T-Shirt",
      subtitle:
        "Seamlessly transition from work to weekend. A classic, smart-casual design crafted with attention to fit and high-end finishing.",
      price: 180,
      rating: 4.7,
      reviews: 10,
      image: "/products/garments-hot-product-1.jpg",
      category: "Sweater",
    },
    {
      id: 8,
      title: "Woolen Scarf",
      subtitle:
        "Supreme comfort meets lasting durability. Perfect for cold-weather layering, designed with ultra-soft fleece and a tailored fit.",
      price: 220,
      rating: 4.9,
      reviews: 18,
      image: "/products/garments-hot-product-2.jpg",
      category: "Shaal",
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
          <h2 className="text-4xl sm:text-4xl font-bold text-sky-500 text-shadow-md text-center">
            Our Hot Products
          </h2>

          {/* Category Filter - Updated with exact dimensions */}
          <div className="bg-white rounded-[50px] shadow border border-sky-300 px-6 sm:px-10 py-4 flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`rounded-[50px] text-base sm:text-lg font-bold transition-all duration-300 flex items-center justify-center cursor-pointer whitespace-nowrap ${
                  activeCategory === category
                    ? "min-w-40 h-12 px-4 bg-sky-500 text-white shadow-md" // Changed to min-width to accommodate longer text
                    : "text-black hover:text-neutral-900 px-4 py-2"
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
          {/* Navigation Arrows - Centered on cards */}
          {totalSlides > 1 && (
            <>
              <motion.button
                onClick={goToPrevSlide}
                className="absolute left-5 top-[50%] -translate-y-1/2 z-10 w-12 h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer -ml-6 lg:-ml-20"
                style={{ marginTop: "15px" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                onClick={goToNextSlide}
                className="absolute right-5 top-[50%] -translate-y-1/2 z-10 w-12 h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 -mr-6 lg:-mr-20"
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
                    className="group bg-white rounded-[20px] shadow-[4px_6px_16px_0px_rgba(0,0,0,0.10)] overflow-hidden hover:shadow-[4px_10px_24px_0px_rgba(0,0,0,0.15)] transition-all duration-300"
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
                          className="w-8 h-8 bg-white rounded-full shadow-[0px_2px_6px_0px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-sky-50 cursor-pointer transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              wishlist.includes(product.id)
                                ? "fill-sky-500 text-sky-500"
                                : "text-sky-500"
                            }`}
                          />
                        </motion.button>
                        <motion.button
                          className="w-8 h-8 bg-white rounded-full shadow-[0px_2px_6px_0px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-sky-50 cursor-pointer transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-4 h-4 text-sky-500" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-4 sm:p-6 space-y-4">
                      {/* Rating and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-sky-500 text-sky-500" />
                            <span className="text-black/50 font-bold text-sm sm:text-base">
                              {product.rating.toFixed(1)} ({product.reviews})
                            </span>
                          </div>
                        </div>
                        <span className="text-sky-500 font-bold text-md text-shadow-sm sm:text-base">
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
                        className="w-full py-2.5 sm:py-3 rounded-[50px] bg-gradient-to-r from-cyan-300 to-sky-500 border border-sky-500 font-bold text-base sm:text-lg hover:bg-sky-600 text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
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
                      ? "bg-sky-500 w-8"
                      : "bg-sky-500/30 w-2 hover:bg-sky-500/50"
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
