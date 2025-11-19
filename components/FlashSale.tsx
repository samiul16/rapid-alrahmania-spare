"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Heart,
  Eye,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  rating: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const FlashSale = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  const products: Product[] = [
    {
      id: "1",
      name: "Premium Brake Disc",
      image: "/top-selling/1.png",
      originalPrice: 320,
      salePrice: 240,
      discount: 25,
      rating: 5,
    },
    {
      id: "2",
      name: "LED Headlight Kit",
      image: "/products/LED Fog Light Kit.png",
      originalPrice: 80,
      salePrice: 60,
      discount: 25,
      rating: 4,
    },
    {
      id: "3",
      name: "Engine Oil Filter",
      image: "/top-selling/3.png",
      originalPrice: 450,
      salePrice: 315,
      discount: 30,
      rating: 5,
    },
    {
      id: "4",
      name: "Radiator Assembly",
      image: "/top-selling/5.png",
      originalPrice: 280,
      salePrice: 196,
      discount: 30,
      rating: 4,
    },
    {
      id: "5",
      name: "Fuel Pump Module",
      image: "/top-selling/6.png",
      originalPrice: 220,
      salePrice: 165,
      discount: 25,
      rating: 4,
    },
  ];

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1); // Mobile - 1 item
      } else if (width < 1024) {
        setItemsPerView(2); // Tablet - 2 items
      } else {
        setItemsPerView(4); // Desktop - 4 items
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total slides based on current items per view
  const totalSlides = Math.ceil(products.length / itemsPerView);

  // Reset to first slide when items per view changes
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [totalSlides, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < totalSlides - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return {
            ...prevTime,
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (prevTime.days > 0) {
          return {
            ...prevTime,
            days: prevTime.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating ? "text-amber-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white py-16">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20 py-12">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12">
          {/* Centered Title with Enhanced Design */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Main Title with Red Background */}
            <motion.div
              className="bg-gradient-to-r from-[#E9292A] to-[#d12621] rounded-3xl px-8 py-6 mb-4 inline-block shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-pulse" />

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white relative z-10">
                Flash Sale – Limited Time Offers
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-lg sm:text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Grab these amazing deals before they&apos;re gone.
              <span className="text-[#E9292A] font-bold">
                {" "}
                Upgrade your car at unbeatable prices.
              </span>
            </motion.p>
          </motion.div>

          {/* Bottom Section - Timer and Navigation */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
            {/* Left Side - Countdown Timer */}
            <motion.div
              className="mb-6 lg:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center lg:text-left mb-3">
                <h3 className="text-lg font-bold text-gray-800">
                  Sale Ends In:
                </h3>
              </div>
              <div className="flex items-end space-x-4 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="bg-[#E9292A] text-white rounded-lg px-3 py-2 shadow-lg">
                    <div className="text-2xl sm:text-3xl font-bold">
                      {timeLeft.days.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
                    Days
                  </div>
                </div>
                <div className="text-xl font-bold text-[#E9292A] pb-4">:</div>
                <div className="text-center">
                  <div className="bg-[#E9292A] text-white rounded-lg px-3 py-2 shadow-lg">
                    <div className="text-2xl sm:text-3xl font-bold">
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
                    Hours
                  </div>
                </div>
                <div className="text-xl font-bold text-[#E9292A] pb-4">:</div>
                <div className="text-center">
                  <div className="bg-[#E9292A] text-white rounded-lg px-3 py-2 shadow-lg">
                    <div className="text-2xl sm:text-3xl font-bold">
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
                    Minutes
                  </div>
                </div>
                <div className="text-xl font-bold text-[#E9292A] pb-4">:</div>
                <div className="text-center">
                  <div className="bg-[#E9292A] text-white rounded-lg px-3 py-2 shadow-lg animate-pulse">
                    <div className="text-2xl sm:text-3xl font-bold">
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
                    Seconds
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Navigation Arrows */}
            <motion.div
              className="flex space-x-3 justify-center lg:justify-end"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-14 h-14 rounded-full bg-gray-100 hover:bg-[#E9292A] text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-600 cursor-pointer border border-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                className="w-14 h-14 rounded-full bg-[#E9292A] hover:bg-[#d12621] text-white flex items-center justify-center transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#E9292A] cursor-pointer shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Carousel Container with Touch Support */}
        <div
          className="relative overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full flex-shrink-0 px-1 py-1"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products
                    .slice(
                      slideIndex * itemsPerView,
                      (slideIndex + 1) * itemsPerView
                    )
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        renderStars={renderStars}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full cursor-pointer transition-all duration-300 ${
                currentSlide === index
                  ? "w-12 h-4 bg-[#E9292A] shadow-lg"
                  : "w-4 h-4 bg-gray-300 hover:bg-[#E9292A]/60"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{
  product: Product;
  renderStars: (rating: number) => React.ReactElement[];
}> = ({ product, renderStars }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.03,
        boxShadow: "0 20px 40px rgba(233, 41, 42, 0.15)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image Container */}
      <div className="relative mb-4 bg-gray-100 rounded-xl overflow-hidden aspect-square">
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#E9292A] text-white px-2 py-1 rounded text-sm font-semibold">
            -{product.discount}%
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="w-4 h-4 text-[#E9292A]" />
          </motion.button>
          <motion.button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-4 h-4 text-[#E9292A]" />
          </motion.button>
          <motion.button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart className="w-4 h-4 text-[#E9292A]" />
          </motion.button>
        </div>

        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>

        {/* Rating and Price Row */}
        <div className="flex items-center justify-between">
          {/* Rating Stars */}
          <div className="flex">{renderStars(product.rating)}</div>

          {/* Price Section */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 line-through">
              AED{product.originalPrice}
            </span>
            <span className="text-xl font-bold text-[#E9292A]">
              AED{product.salePrice}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlashSale;
