"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import EachProducts from "@/components/Products-Details/EachProducts";
import Related from "@/components/Products-Details/Related";
import Stats from "@/components/Stats";
import productsData from "./EachProduct.json";
import Link from "next/link";

interface ProductData {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  availability: number;
  images: string[];
  sizes: string[];
  colors: string[];
  code: string;
  styleCode: string;
  features: string[];
  description: string;
  additionalInfo: string;
  reviews: number;
  sku: string;
  categories: string[];
  brand: string;
  rating: number;
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [productId, setProductId] = useState<string>("");
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);

      // Find the product by ID
      const foundProduct = productsData.find(
        (p) => p.id === parseInt(resolvedParams.id)
      );

      if (foundProduct) {
        setProduct(foundProduct);
      }

      setLoading(false);
    };

    getParams();

    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#E9292A]"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/products"
            className="bg-[#E9292A] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div data-aos="fade-up">
        <EachProducts product={product} />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <Related />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        {/* <Stats /> */}
      </div>
    </div>
  );
}
