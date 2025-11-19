"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = 3;

  // Array of slide content
  const slides = [
    {
      image: "/landing/spare-parts-15.jpg",
      title: "Drive Excellence with Premium Car Parts",
      subtitle:
        "High-quality, reliable, and affordable car parts for every vehicle. Upgrade your car with confidence",
    },
    {
      image: "/landing/spare-parts-7.jpg",
      title: "Premium Car Parts & Accessories",
      subtitle:
        "High-quality parts designed with precision to enhance performance, durability, and style.",
    },
    {
      image: "/landing/spare-parts-1.jpg",
      title: "Smart Car Part Finder",
      subtitle:
        "Locate the right parts instantly and keep your car running at its best.",
    },
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-out-cubic",
    });
  }, []);

  // Refresh AOS on slide change
  useEffect(() => {
    AOS.refresh();
  }, [currentSlide]);

  // Auto-slide functionality - slides every 3 seconds
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }
    }, 4000); // 4 seconds

    // Clean up interval on component unmount
    return () => clearInterval(autoSlideInterval);
  }, [isTransitioning, totalSlides]);

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  // Reset transition state after animation completes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="relative w-full h-[663px] md:h-screen overflow-hidden">
      {/* Background Images with Advanced Animations */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-[#333] bg-cover bg-center transition-all duration-[800ms] ease-in-out transform ${
            index === currentSlide
              ? "opacity-100 scale-100 rotate-0"
              : index === (currentSlide - 1 + totalSlides) % totalSlides
              ? "opacity-0 scale-110 -rotate-1 translate-x-[-100px]"
              : index === (currentSlide + 1) % totalSlides
              ? "opacity-0 scale-110 rotate-1 translate-x-[100px]"
              : "opacity-0 scale-95 translate-y-[50px]"
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter:
              index === currentSlide
                ? "brightness(1) contrast(1.05)"
                : "brightness(0.8) blur(2px)",
            transition:
              "all 800ms cubic-bezier(0.4, 0, 0.2, 1), filter 600ms ease-out",
          }}
        >
          {/* Animated Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-black/30 to-[#bc2b2b] transition-all duration-700 ${
              index === currentSlide ? "opacity-40" : "opacity-60"
            }`}
            style={{
              background:
                index === currentSlide
                  ? "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(188,43,43,0.4) 100%)"
                  : "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(188,43,43,0.6) 100%)",
            }}
          ></div>

          {/* Animated Particles Effect */}
          {index === currentSlide && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: "3s",
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Slide Transition Overlay */}
      <div
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 pointer-events-none ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Hero Content with AOS Animations */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="max-w-8xl flex flex-col items-center space-y-5 md:mt-[-100px] md:mt-0">
          <h1
            key={`title-${currentSlide}`}
            className="text-white text-3xl md:text-5xl lg:text-6xl font-bold text-center leading-tight tracking-[-0.4px] transition-all duration-800 ease-in-out"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
            data-aos="fade-down"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            {slides[currentSlide].title}
          </h1>
          <p
            key={`subtitle-${currentSlide}`}
            className="text-gray-200 text-base md:text-xl lg:text-2xl text-center max-w-7xl transition-all duration-800 ease-in-out"
            style={{
              textShadow: "2px 2px 3px rgba(0,0,0,0.7)",
            }}
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1000"
          >
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {/* Enhanced Slider Dots */}
        <div className="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 flex space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`h-3 rounded-full transition-all duration-500 cursor-pointer transform hover:scale-125 active:scale-90 ${
                currentSlide === index
                  ? "bg-[#E9292A] w-8 shadow-lg"
                  : "bg-white/50 hover:bg-white/70 w-3"
              } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{
                boxShadow:
                  currentSlide === index
                    ? "0 2px 8px rgba(188,43,43,0.4), 0 0 0 2px rgba(255,255,255,0.2)"
                    : "0 1px 3px rgba(0,0,0,0.2)",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Enhanced CTA Button with AOS */}
        <div
          className="mt-20"
          data-aos="zoom-in"
          data-aos-delay="600"
          data-aos-duration="800"
        >
          <button
            onClick={() => router.push("/products")}
            className="bg-gradient-to-r from-[#E9292A] to-[#780b0b] text-white font-bold text-md md:text-xl py-4 px-8 rounded-full flex items-center gap-3 hover:from-[#E9292A]/80 hover:to-[#E9292A]/50 transition-all duration-300 cursor-pointer shadow-lg transform hover:scale-105 hover:shadow-xl active:scale-95 min-w-[280px] justify-center"
            style={{
              boxShadow:
                "0 8px 25px rgba(255, 255, 255, 0.4), 0 4px 12px rgba(255, 255, 255, 0.3)",
            }}
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-red-500" />
            </div>
            EXPLORE OUR PRODUCTS
          </button>
        </div>

        {/* <div className="absolute bottom-8 right-[120px] md:right-[220px]">
          <button className="w-[50px] h-[50px] rounded-full flex items-center justify-center hover:bg-[#f8eaea]/20 transition-colors cursor-pointer">
            <Image
              src="/landing/message.svg"
              alt="Message"
              width={26}
              height={22}
              className="w-8 h-8"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-0.5 -translate-y-[1px]">
              <div className="w-1 h-1 bg-red-50 rounded-full"></div>
              <div className="w-1 h-1 bg-red-50 rounded-full"></div>
              <div className="w-1 h-1 bg-red-50 rounded-full"></div>
            </div>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
