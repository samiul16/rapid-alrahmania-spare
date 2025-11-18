"use client";
import React, { useState } from "react";
import { Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialData {
  id: number;
  name: string;
  title: string;
  image: string;
  testimonial: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl transition-all duration-300 ease-in-out hover:shadow hover:scale-105 hover:-translate-y-2 cursor-pointer group">
      <div className="relative h-[550px] bg-[var(--primary)]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[#333] z-0">
          <Image
            height={800}
            width={800}
            src={testimonial.image}
            alt="Testimonial background"
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-l from-sky-600/10 to-[var(--primary)]/80" />

        {/* Content */}
        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl mt-4 font-medium text-[#E9F5FB]">
              {testimonial.title}
            </h3>
            <Image
              height={800}
              width={800}
              src="/client/Icon.svg"
              alt="Quote icon"
              className="w-7 h-7 object-cover"
            />
          </div>

          <p className="text-white text-shadow-2xs text-sm md:text-base mb-8 mt-10">
            {testimonial.testimonial}
          </p>

          <div className="flex items-center">
            <div className="w-5 h-[1px] bg-white"></div>
            <span className="ml-2 text-white opacity-90 text-sm">
              {testimonial.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Update cards per view based on screen size
  React.useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablet: 2 cards
      } else {
        setCardsPerView(3); // Desktop: 3 cards
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const testimonialsData: TestimonialData[] = [
    {
      id: 1,
      name: "Yousuf Noor",
      title: "",
      image: "/clientt/1.jpeg",
      testimonial:
        "We have been sourcing our entire line of outerwear from Alburaq for three seasons, and the quality is consistently exceptional. Our customers demand durable, weather-tested garments, and Alburaq delivers every time. The stitching is flawless, the materials are top-grade, and their attention to detail means fewer returns for us. They truly define manufacturing excellence.",
    },
    {
      id: 2,
      name: "Stella Smith, New York",
      title: "",
      image: "/clientt/2.jpeg",
      testimonial:
        "Alburaq isn't just a supplier; they are a true manufacturing partner. From the initial concept and material sourcing to managing complex production runs, their team is professional, transparent, and incredibly responsive. They handled a difficult custom fabric request seamlessly and delivered the final order ahead of schedule. Highly recommended for any brand seeking zero-compromise production.",
    },
    {
      id: 3,
      name: "Abdur Gaffar, Dubai",
      title: "",
      image: "/clientt/3.jpeg",
      testimonial:
        "We switched to Alburaq for our premium knitwear collection, and the difference in the final product was immediate. The sweaters had a beautiful hand feel and held their shape perfectly after washing. The entire process, from sample development to the final quality control check, was superior to any other manufacturer we've used. Alburaq’s quality control is simply the best in the business.",
    },
    {
      id: 4,
      name: "Muhammad Salim, Dubai",
      title: "",
      image: "/clientt/5.jpeg",
      testimonial:
        "We have been sourcing our entire line of outerwear from Alburaq for three seasons, and the quality is consistently exceptional. Our customers demand durable, weather-tested garments, and Alburaq delivers every time. The stitching is flawless, the materials are top-grade, and their attention to detail means fewer returns for us. They truly define manufacturing excellence.",
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, testimonialsData.length - cardsPerView);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, testimonialsData.length - cardsPerView);
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };
  return (
    <div className="bg-white flex flex-col items-center w-full py-20 gap-16">
      <div className="flex flex-col items-center gap-4 max-w-8xl mx-auto text-center">
        <h2 className="text-5xl sm:text-5xl font-bold text-[var(--primary)] font-anek">
          Client Reviews
        </h2>
      </div>

      <div className="relative w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-24 rounded-xl -mt-6">
        <div className="overflow-hidden px-4 py-6">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              gap: cardsPerView === 1 ? "0px" : "24px",
            }}
          >
            {testimonialsData.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0"
                style={{
                  width:
                    cardsPerView === 1
                      ? "100%"
                      : cardsPerView === 2
                      ? "calc((100% - 24px) / 2)"
                      : "calc((100% - 48px) / 3)",
                }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-[var(--primary)]/80 hover:bg-[var(--primary)] flex items-center justify-center transform rotate-270 cursor-pointer transition-colors duration-300 z-30"
        >
          <div className="text-white">
            <svg
              width="16"
              height="19"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1.66699V17.0003M8 1.66699L1.33334 8.33366M8 1.66699L14.6667 8.33366"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>

        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-[var(--primary)]/80 hover:bg-[var(--primary)] flex items-center justify-center transform -rotate-270 cursor-pointer transition-colors duration-300 z-30"
        >
          <div className="text-white">
            <svg
              width="16"
              height="19"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1.66699V17.0003M8 1.66699L1.33334 8.33366M8 1.66699L14.6667 8.33366"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 gap-3">
          {Array.from({
            length: Math.max(1, 5),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out hover:scale-125 active:scale-90 ${
                currentIndex === index
                  ? "bg-[var(--primary)] shadow-lg scale-110"
                  : isAnimating
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-200 hover:bg-[var(--primary)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;
