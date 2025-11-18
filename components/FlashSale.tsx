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
      name: "The Vestry Waistcoat",
      image: "/flash-sale/4.jpg",
      originalPrice: 960,
      salePrice: 960,
      discount: 40,
      rating: 4,
    },
    {
      id: "2",
      name: "Silk Drape Kaftan",
      image: "/flash-sale/2.jpg",
      originalPrice: 960,
      salePrice: 960,
      discount: 30,
      rating: 4,
    },
    {
      id: "3",
      name: "The Pilot Bomber",
      image: "/flash-sale/3.jpg",
      originalPrice: 960,
      salePrice: 960,
      discount: 40,
      rating: 4,
    },
    {
      id: "4",
      name: "Core Knit Jogger",
      image: "/flash-sale/1.jpg",
      originalPrice: 960,
      salePrice: 960,
      discount: 40,
      rating: 4,
    },
    {
      id: "5",
      name: "3D Puff Logo Cap",
      image: "/flash-sale/1.jpg",
      originalPrice: 800,
      salePrice: 480,
      discount: 40,
      rating: 5,
    },
    // {
    //   id: "6",
    //   name: "Sports Shoes",
    //   image: "/flash-sale/2.jpg",
    //   originalPrice: 1200,
    //   salePrice: 840,
    //   discount: 30,
    //   rating: 4,
    // },
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
          index < rating ? "text-cyan-400" : "text-gray-300"
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          {/* Left Side - Title and Countdown */}
          <div className="mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold text-sky-400 mb-6">Flash Sale</h2>

            {/* Countdown Timer */}
            <div className="flex items-end space-x-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Days</div>
                <div className="text-3xl font-bold text-gray-900">
                  {timeLeft.days.toString().padStart(2, "0")}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 -pb-2">:</div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Hours</div>
                <div className="text-3xl font-bold text-gray-900">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 -pb-2">:</div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Minutes</div>
                <div className="text-3xl font-bold text-gray-900">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 -pb-2">:</div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Seconds</div>
                <div className="text-3xl font-bold text-gray-900">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Navigation Arrows */}
          <div className="flex space-x-2">
            <motion.button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-sky-500 text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-600 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="w-12 h-12 rounded-lg bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sky-500 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
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

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-4 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full cursor-pointer transition-all duration-300 ${
                currentSlide === index
                  ? "w-14 h-5 bg-sky-500"
                  : "w-5 h-5 bg-sky-200 hover:bg-sky-300"
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
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image Container */}
      <div className="relative mb-4 bg-gray-100 rounded-xl overflow-hidden aspect-square">
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-cyan-400 text-white px-2 py-1 rounded text-sm font-semibold">
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
            <Heart className="w-4 h-4 text-gray-600" />
          </motion.button>
          <motion.button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-4 h-4 text-cyan-400" />
          </motion.button>
          <motion.button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart className="w-4 h-4 text-cyan-400" />
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
            <span className="text-xl font-bold text-cyan-400">
              AED{product.salePrice}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlashSale;
