"use client";
import React, { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const Question = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "What is your core specialization?",
      answer:
        "We specialize in stitching and embroidery. We primarily focus on making and supplying all kinds of uniforms.",
    },
    {
      id: 2,
      question: "What types of uniforms can you produce?",
      answer:
        "We produce a wide variety of uniforms, including corporate wear, school uniforms, medical scrubs, industrial workwear, hotel uniforms, and specialized garments.",
    },
    {
      id: 3,
      question: "Do you handle custom designs and logos?",
      answer:
        "Yes, custom designs, logos, and branding (embroidery/printing) are our specialty. Please provide us with your high-resolution artwork for accurate quotation and production.",
    },
    {
      id: 4,
      question: "Is there a minimum order quantity (MOQ)?",
      answer:
        "The Minimum Order Quantity (MOQ) varies depending on the specific garment, material, and complexity of the embroidery/stitching required. Please contact us with your project details for an accurate answer.",
    },
    {
      id: 5,
      question: "How long does production typically take?",
      answer:
        "The production timeline depends entirely on the size of the order and the complexity of the customization. An estimated delivery date will be provided after final design approval and confirmation of materials, typically ranging from 2 to 4 weeks.",
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">FAQs</h2>
        </div>

        {/* FAQ Questions */}
        <div className="max-w-8xl mx-auto px-6 lg:px-24">
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-indigo-50/40 rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-sky-500 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full border border-sky-500 flex items-center justify-center transition-transform duration-200 ${
                        openFAQ === faq.id ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === faq.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-stone-900/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Question;
