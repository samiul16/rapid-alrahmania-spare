/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Eye,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useAddToCart } from "@/hooks/useAddToCart";
import { Product as CartProduct } from "@/redux/hooks/cart/cartSlice";

const RecommendedCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [itemsPerView, setItemsPerView] = useState(4);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Sample product data - you can replace with your actual data
  const products = [
    {
      id: 1,
      name: "Velvet Ascent Kimono",
      price: 40.0,
      rating: 5,
      image: "/reco/Velvet-Ascent-Kimono.png",
    },
    {
      id: 2,
      name: "The Merino Wool Blazer",
      price: 38.0,
      rating: 5,
      image: "/reco/4.jpg",
    },
    {
      id: 3,
      name: "Cashmere Micro-Knit",
      price: 42.0,
      rating: 5,
      image: "/reco/Cashmere-Micro-Knit.png",
    },
    {
      id: 4,
      name: "The Cloud Hoody",
      price: 45.0,
      rating: 5,
      image: "/reco/2.jpg",
    },
    {
      id: 5,
      name: "Signature Puffer Gilet",
      price: 43.0,
      rating: 5,
      image: "/reco/Signature-Puffer-Gilet.png",
    },
    {
      id: 6,
      name: "Velvet Ascent Kimono",
      price: 46.0,
      rating: 5,
      image: "/reco/Velvet-Ascent-Kimono.png",
    },
    {
      id: 7,
      name: "The Merino Wool Blazer",
      price: 41.0,
      rating: 5,
      image: "/reco/The-Merino-Wool-Blazer.png",
    },
    {
      id: 8,
      name: "Cashmere Micro-Knit",
      price: 39.0,
      rating: 5,
      image: "/reco/Cashmere-Micro-Knit.png",
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
  const handleTouchStart = (e: any) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
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

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  // Animation variants with proper typing
  const headerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const ProductCard = ({ product }: { product: any }) => {
    const isFavorite = favorites.has(product.id);

    const { addToCartGlobal } = useAddToCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (product: any) => {
      const cartProduct: CartProduct = {
        id: parseInt(product.id),
        name: product.name,
        price: product.price,
        image_url: product.image,
        currency: "AED",
      };
      addToCartGlobal(cartProduct, parseInt(product.id), quantity, setQuantity);
    };
    return (
      <motion.div
        className="group relative bg-sky-50 rounded-xl border border-zinc-300 overflow-hidden transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -8,
          scale: 1.03,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container */}
        <div className="relative h-52 bg-gradient-to-br from-sky-100 to-sky-200 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Action Buttons - Appear on hover */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={() => toggleFavorite(product.id)}
              className={`w-10 h-10 rounded-full bg-white shadow-lg flex items-center cursor-pointer justify-center transition-all duration-300 ${
                isFavorite ? "text-red-500" : "text-sky-500"
              }`}
              whileHover={{ scale: 1.15, rotate: isFavorite ? 0 : 10 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Add to favorites"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </motion.button>

            <motion.button
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-sky-500 hover:text-sky-600 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Quick view"
            >
              <Eye className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-sky-500 hover:text-sky-600 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Add to cart"
              onClick={() => handleAddToCart(product)}
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            {/* Rating */}
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < product.rating
                      ? "fill-sky-500 text-sky-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Price */}
            <span className="text-sky-500 text-lg font-bold">
              AED {product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20 py-12">
        <div className="space-y-10">
          {/* Header */}
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={headerVariants}
          >
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-sky-500 text-shadow-md tracking-wide">
                Recommended For You
              </h2>
              <p className="text-lg sm:text-xl text-gray-700">
                Don&apos;t Miss Out: Continue Your Discovery.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-sky-500 text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-600 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                className="w-12 h-12 rounded-lg bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer disabled:hover:bg-sky-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>

          {/* Carousel Container with Touch Support */}
          <div
            className="relative overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out py-6"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex-shrink-0 px-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products
                      .slice(
                        slideIndex * itemsPerView,
                        (slideIndex + 1) * itemsPerView
                      )
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-4">
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
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCarousel;
