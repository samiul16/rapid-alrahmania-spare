"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import EachProducts from "@/components/Products-Details/EachProducts";
import Related from "@/components/Products-Details/Related";
import Stats from "@/components/Stats";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [productId, setProductId] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    };

    getParams();

    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, [params]);

  return (
    <div className="min-h-screen bg-white">
      <div data-aos="fade-up">
        <EachProducts />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <Related />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <Stats />
      </div>
    </div>
  );
}
