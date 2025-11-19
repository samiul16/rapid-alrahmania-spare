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
      name: "High Performance Disc Brake Rotor",
      price: 320,
      image: "/Exclusive-Deals/2.png",
      badge: "NEW ARRIVAL",
    },
    {
      id: "2",
      name: "Turbo Charger Assembly Kit",
      price: 850,
      image: "/Exclusive-Deals/3.png",
      badge: "SALE",
    },
    {
      id: "3",
      name: "Premium Alloy Wheel Rim Set",
      price: 280,
      image: "/Exclusive-Deals/4.png",
      badge: "BEST SELLER",
    },
    {
      id: "4",
      name: "Engine Oil Filter Premium Kit",
      price: 65,
      image: "/top-selling/1.png",
      badge: "NEW ARRIVAL",
    },
    {
      id: "5",
      name: "LED Headlight Assembly",
      price: 380,
      image: "/top-selling/5.png",
      badge: "SALE",
    },
    {
      id: "6",
      name: "Fuel Injection Pump System",
      price: 650,
      image: "/top-selling/7.png",
      badge: "BEST SELLER",
    },
  ];

  const relatedProducts = products || defaultProducts;

  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case "NEW ARRIVAL":
        return "bg-[#E9292A] text-white";
      case "SALE":
        return "bg-green-600 text-white";
      case "BEST SELLER":
        return "bg-blue-600 text-white";
      default:
        return "bg-[#E9292A] text-white";
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

                  {/* Alrahmania Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-gray-200 text-4xl md:text-6xl font-bold opacity-20 transform rotate-12">
                      ALRAHMANIA
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-gray-900 mb-3 text-xl leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-[#E9292A] font-bold text-xl">
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
