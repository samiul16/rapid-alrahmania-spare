"use client";

import React from "react";
import Image from "next/image";
import { Apple, Play } from "lucide-react";

const DownloadOurApp = () => {
  return (
    <div className="py-20 bg-white sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <div className="relative py-16 px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Phone Mockups */}
              <div className="relative flex items-center justify-center lg:justify-start">
                {/* Background Circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 bg-white/15 rounded-full"></div>
                  <div className="absolute w-96 h-96 border-4 border-white/25 rounded-full"></div>
                </div>

                {/* Phone Mockups Container */}
                <div className="relative z-10 flex items-center">
                  {/* Main Phone */}
                  <div className="relative">
                    <Image
                      src="/download-app/mobile-1.png"
                      alt="Alburaq App Main Screen"
                      width={240}
                      height={480}
                      className="object-contain drop-shadow-2xl"
                    />

                    {/* Best Mobile App Badge */}
                    {/* <div className="absolute top-[40%] -left-8 md:-left-16 backdrop-blur-sm text-white rounded-xl shadow-2xl">
                      <div className="flex items-center space-x-3">
                        <Image
                          src="/download-app/tablet-shape.png"
                          alt="Alburaq App Main Screen"
                          width={240}
                          height={480}
                          className="object-contain drop-shadow-2xl"
                        />
                      </div>
                    </div> */}
                  </div>

                  {/* Secondary Phone */}
                  <div className="relative ml-4 mt-16">
                    <Image
                      src="/download-app/mobile-2.png"
                      alt="Alburaq App Secondary Screen"
                      width={180}
                      height={360}
                      className="object-contain drop-shadow-xl"
                    />
                  </div>
                </div>

                {/* Gaming Controller Icon */}
                <div className="absolute -top-2 md:top-2 right-[10%] lg:right-[30%]">
                  <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-xl">
                    <Image
                      src="/download-app/console.png"
                      alt="Gaming Console"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="text-white space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-4xl font-bold mb-6 leading-tight">
                    Download Alburaq App!
                  </h2>
                  <p className="text-lg text-white/90 leading-relaxed max-w-lg text-shadow-2xs">
                    Download our app today to access our services right from
                    your mobile device! Stay updated with new arrivals,
                    exclusive deals, seasonal sales, and special offers at your
                    fingertips.
                  </p>
                </div>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* App Store Button */}
                  <a
                    href="https://apps.apple.com/app/id123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[160px] rounded-full"
                  >
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <Apple className="w-5 h-5 text-black" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold">App Store</div>
                    </div>
                  </a>

                  {/* Play Store Button */}
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[160px] rounded-full"
                  >
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <Play className="w-5 h-5 text-black fill-current" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold">Play Store</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadOurApp;
