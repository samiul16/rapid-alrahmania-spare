"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

const TwoCard = () => {
  const cardsData: CardData[] = [
    {
      id: "1",
      title: "The New Season Collection",
      subtitle:
        "Discover our latest arrivals. Crafted for enduring style and unparalleled comfort.",
      buttonText: "Shop New Arrivals",
      image: "",
      backgroundColor: "bg-gradient-to-br from-yellow-400 to-orange-400",
      textColor: "text-white",
      buttonColor: "bg-white",
      buttonTextColor: "text-orange-500",
    },
    {
      id: "2",
      title: "Sustainable Staples",
      subtitle:
        "Invest in garments that make a difference. Ethically sourced, consciously created.",
      buttonText: "Explore Our Eco-Line",
      image: "",
      backgroundColor: "bg-gradient-to-br from-cyan-400 to-blue-500",
      textColor: "text-white",
      buttonColor: "bg-white",
      buttonTextColor: "text-blue-500",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cardsData.map((card) => (
            <ProductCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ card: CardData }> = ({ card }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/products");
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative ${card.backgroundColor} rounded-3xl p-8 lg:p-10 overflow-hidden min-h-[280px] group hover:scale-105 transition-transform duration-300 cursor-pointer`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/20 transform -translate-x-12 translate-y-12"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center h-full text-left">
        {/* Content */}
        <div className="flex-1 mb-6 lg:mb-0">
          <h2
            className={`text-2xl lg:text-3xl font-bold ${card.textColor} mb-2`}
          >
            {card.title}
          </h2>
          <p className={`text-lg ${card.textColor} opacity-90 mb-6`}>
            {card.subtitle}
          </p>
          <button
            className={`${card.buttonColor} ${card.buttonTextColor} px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer`}
          >
            {card.buttonText}
          </button>
        </div>

        {/* Right Image - Hidden since no images needed */}
        {card.image && (
          <div className="flex-shrink-0 relative">
            <div className="relative w-48 h-48 lg:w-56 lg:h-56">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 1024px) 192px, 224px"
              />
            </div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full"></div>
      <div className="absolute bottom-8 right-8 w-1 h-1 bg-white/30 rounded-full"></div>
      <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
    </div>
  );
};

export default TwoCard;
