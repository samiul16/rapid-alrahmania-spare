"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const AboutAlburaq = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: "mission",
      title: "Our Mission",
      content:
        "Mission Statement: To be the global benchmark for premium apparel manufacturing, delivering unparalleled quality and innovative solutions, while upholding the highest standards of ethical practice and environmental stewardship.",
    },
    {
      id: "vision",
      title: "Our Vision",
      content:
        "Vision Statement: To inspire a future where every garment is a testament to sustainable craftsmanship, exceptional design, and enduring value, enriching lives and minimizing our ecological footprint.",
    },
    {
      id: "values",
      title: "Our Values",
      content:
        "At Al Buraq Garments, our core values guide everything we do — from creative design to final delivery. We prioritize quality in every stitch, uphold integrity and ethical practices across all operations, and embrace innovation to stay ahead in a dynamic world. With a strong commitment to sustainability, we adopt eco-conscious methods to protect our planet. Through collaboration and accountability, we build lasting relationships based on trust, respect, and excellence.",
    },
  ];

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-16 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-sky-500 mb-8">
              About Alburaq
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              From our beginnings, Alburaq has been driven by a singular vision:
              to redefine excellence in garment manufacturing. We combine
              timeless craftsmanship with cutting-edge innovation to produce
              apparel that sets global standards. <br />
              Founded on a deep passion for textiles and an unwavering
              commitment to quality, Alburaq emerged as a beacon of meticulous
              artistry in the apparel industry. Our journey began with the
              belief that true luxury is found not just in design, but in the
              integrity of every stitch, the selection of every fabric, and the
              ethical heart of every process. We translate creative visions into
              tangible garments that are built to last, wear beautifully, and
              inspire confidence. <br />
              Over the years, Alburaq has grown from a specialized atelier into
              a world-class manufacturing partner for leading fashion brands.
              While our scale has expanded, our core values remain unchanged. We
              embrace technological advancements to enhance precision and
              efficiency, yet we never lose sight of the artisanal touch that
              makes each piece exceptional. Our state-of-the-art facilities and
              skilled workforce are a testament to our dedication to both
              tradition and progress.
            </p>

            {/* Expandable Sections */}
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="space-y-3">
                  {/* Button - Always rounded full */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-cyan-400 to-sky-500 text-white font-semibold text-left flex items-center justify-between hover:from-cyan-500 hover:to-sky-600 transition-all duration-200 cursor-pointer rounded-full shadow-sm"
                  >
                    <span className="text-lg">{section.title}</span>
                    {expandedSection === section.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  {/* Content - Separate rounded container */}
                  {expandedSection === section.id && (
                    <div className="bg-white px-6 py-4">
                      <p className="text-gray-600 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Images */}
          <div className="space-y-6">
            {/* Top Image */}
            <div className="relative h-64 md:h-80 xl:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/about/cute-1.jpg"
                alt="Professional woman in purple blazer"
                fill
                className="object-cover shadow hover:scale-105 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Bottom Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 md:h-56 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/about/cute-2.jpg"
                  alt="Fashion model in beige outfit"
                  fill
                  className="object-cover shadow hover:scale-105 transition-all duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48 md:h-56 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/about/cute-3.jpg"
                  alt="Professional woman in white shirt"
                  fill
                  className="object-cover shadow hover:scale-105 transition-all duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAlburaq;
