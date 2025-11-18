"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "@/components/HeroSection";
import OurProducts from "@/components/OurProducts";
import OurOffer from "./OurOffer";
import TopSelling from "./TopSelling";
import Recomended from "./Recomended";
import FlashSale from "@/components/FlashSale";
import ClientTestimonials from "@/components/ClientTestimonials";
import TwoCard from "@/components/Two-Card";
import Subscribe from "@/components/Subscribe";
import DownloadOurApp from "@/components/DownloadOurApp";
import Stats from "@/components/Stats";
import CategoriesSection from "@/components/CategoriesSection";
import ExclusiveDeals from "@/components/ExclusiveDeals";
import GetStarted from "@/components/GetStarted";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main>
        <div>
          <div>
            <HeroSection />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <CategoriesSection />
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <OurProducts />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <TopSelling />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <ExclusiveDeals />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <FlashSale />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <ClientTestimonials />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            {/* <TwoCard /> */}
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            {/* <Subscribe /> */}
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <DownloadOurApp />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <GetStarted />
          </div>
        </div>
      </main>
    </div>
  );
}
