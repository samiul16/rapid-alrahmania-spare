"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AboutAlburaq from "@/components/about/AboutAlburaq";
// import Recommended from "@/components/Recommended";
import Recomended from "../Recomended";
import DownloadOurApp from "@/components/DownloadOurApp";
import CommonHeader from "@/components/Common/CommonHeader";

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
      <CommonHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", isActive: true },
        ]}
      />
      <div data-aos="fade-up">
        <AboutAlburaq />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <Recomended />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <DownloadOurApp />
      </div>
    </div>
  );
}
