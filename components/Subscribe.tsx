"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import Image from "next/image";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="w-full bg-sky-700 py-8 my-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Side - Icon and Text */}
          <div className="flex items-center gap-6 text-center lg:text-left">
            {/* Email Icon */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center">
                <Image
                  src="/subs.svg"
                  alt="Email Icon"
                  width={120}
                  height={120}
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                Subscribe & Get 15% Discount
              </h2>
              <p className="text-blue-100 text-sm lg:text-base">
                Get 15% off on your first purchase! Plus, be the first to know
                about our latest deals and exclusive offers.
              </p>
            </div>
          </div>

          {/* Right Side - Email Form */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
                className="flex-1 px-4 py-3 rounded-full border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:min-w-[250px] bg-gray-100"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-full transition-colors duration-300 whitespace-nowrap cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
