"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Eye,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";

const Recommended = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "New Designers Dress",
      price: "AED 410.00",
      rating: 5,
      image: "/recommended/1.jpg",
    },
    {
      id: 2,
      name: "Bridal Dress",
      price: "AED 1000.00",
      rating: 5,
      image: "/recommended/2.jpg",
    },
    {
      id: 3,
      name: "Maroon Kurti",
      price: "AED 40.00",
      rating: 5,
      image: "/recommended/3.jpg",
    },
    {
      id: 4,
      name: "Kung Pao Chicken",
      price: "AED 40.00",
      rating: 5,
      image: "/recommended/4.jpg",
    },
    {
      id: 5,
      name: "Designer Saree",
      price: "AED 250.00",
      rating: 5,
      image: "/recommended/1.jpg",
    },
    {
      id: 6,
      name: "Casual Shirt",
      price: "AED 80.00",
      rating: 5,
      image: "/recommended/2.jpg",
    },
  ];

  const itemsPerPage = 4;
  const totalSlides = Math.ceil(products.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentProducts = () => {
    const startIndex = currentSlide * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-cyan-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-sky-500 mb-2">
              Recommended For You
            </h2>
            <p className="text-gray-700 text-lg">
              See our recommended foods for today
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-cyan-300 hover:text-cyan-400 transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-cyan-400 text-white flex items-center justify-center hover:bg-cyan-500 transition-colors cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getCurrentProducts().map((product) => (
            <div
              key={product.id}
              className="bg-sky-100 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative h-48 2xl:h-56 group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-all duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-cyan-50 hover:text-cyan-500 transition-colors cursor-pointer">
                    <Heart className="w-4 h-4 text-sky-500" />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-cyan-50 hover:text-cyan-500 transition-colors cursor-pointer">
                    <Eye className="w-4 h-4 text-sky-500" />
                  </button>
                  <button className="w-8 h-8 bg-cyan-400 text-white rounded-full flex items-center justify-center shadow-md hover:bg-cyan-500 transition-colors cursor-pointer">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                  {product.name}
                </h3>

                <div className="flex justify-between">
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {renderStars(product.rating)}
                  </div>

                  {/* Price */}
                  <p className="text-cyan-500 font-bold text-lg">
                    {product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center space-x-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index
                  ? "bg-cyan-400"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-center space-x-4 mt-6">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-cyan-400 text-white flex items-center justify-center hover:bg-cyan-500 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommended;
