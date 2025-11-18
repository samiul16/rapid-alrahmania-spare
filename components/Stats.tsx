"use client";

import React from "react";
import Image from "next/image";

interface StatItem {
  icon: string;
  title: string;
  description: string;
}

const Stats = () => {
  const statsData: StatItem[] = [
    {
      icon: "/stats/1.svg",
      title: "FREE Shipping",
      description: "Been either finished for",
    },
    {
      icon: "/stats/2.svg",
      title: "Online Payment",
      description: "Their Professional look",
    },
    {
      icon: "/stats/3.svg",
      title: "Support 24",
      description: "Break the lines whenever",
    },
    {
      icon: "/stats/4.svg",
      title: "Return of Purchase",
      description: "Photography online website",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<StatItem> = ({ icon, title, description }) => {
  return (
    <div className="text-center group">
      {/* Icon Container */}
      <div className="flex justify-center mb-8">
        <div className="w-18 h-18 outline-[14px] outline-sky-200 rounded-full shadow-2xl flex items-center justify-center group-hover:bg-sky-50 transition-colors duration-300 ">
          <Image
            src={icon}
            alt={title}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-md text-gray-600 leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Stats;
