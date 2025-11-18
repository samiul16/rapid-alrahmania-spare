"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CommonHeader from "@/components/Common/CommonHeader";
import CareerPage from "@/components/career/career";

export default function Page() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div>
      <div data-aos="fade-up">
        <CommonHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Career", isActive: true },
          ]}
        />
      </div>
      <div data-aos="fade-up">
        <CareerPage />
      </div>
    </div>
  );
}
