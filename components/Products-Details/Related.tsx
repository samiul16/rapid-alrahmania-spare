"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: "NEW ARRIVAL" | "SALE" | "BEST SELLER";
}

interface RelatedProps {
  products?: RelatedProduct[];
}

const Related: React.FC<RelatedProps> = ({ products }) => {
  // Default products data for demonstration
  const defaultProducts: RelatedProduct[] = [
    {
      id: "1",
      name: "Almara Premium Cotton Casual Shirt Short Sleeve",
      price: 180,
      image: "/each-products/related.jpg",
      badge: "NEW ARRIVAL",
    },
    {
      id: "2",
      name: "Alburaq Sky Color Slim Fit Full Sleeve Formal Shirt",
      price: 250,
      image: "/each-products/related.jpg",
      badge: "SALE",
    },
    {
      id: "3",
      name: "Ameerah Classic White Blouse Long Sleeve",
      price: 220,
      image: "/each-products/related.jpg",
      badge: "BEST SELLER",
    },
    {
      id: "4",
      name: "Almara Premium Cotton Casual Shirt Short Sleeve",
      price: 180,
      image: "/each-products/related.jpg",
      badge: "NEW ARRIVAL",
    },
    {
      id: "5",
      name: "Alburaq Sky Color Slim Fit Full Sleeve Formal Shirt",
      price: 250,
      image: "/each-products/related.jpg",
      badge: "SALE",
    },
    {
      id: "6",
      name: "Ameerah Classic White Blouse Long Sleeve",
      price: 220,
      image: "/each-products/related.jpg",
      badge: "BEST SELLER",
    },
  ];

  const relatedProducts = products || defaultProducts;

  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case "NEW ARRIVAL":
        return "bg-black text-white";
      case "SALE":
        return "bg-black text-white";
      case "BEST SELLER":
        return "bg-black text-white";
      default:
        return "bg-black text-white";
    }
  };

  return (
    <div className="bg-white py-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Related Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-gray-100">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold ${getBadgeStyles(
                        product.badge
                      )}`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Alburaq Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-gray-200 text-6xl md:text-8xl font-bold opacity-20 transform rotate-12">
                      A
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-gray-900 mb-3 text-xl leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-cyan-500 font-bold text-xl">
                    AED {product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Related;
