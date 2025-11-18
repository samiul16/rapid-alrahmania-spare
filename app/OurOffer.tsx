"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface OfferProduct {
  id: number;
  name: string;
  image: string;
  discount: number;
}

const WinterOfferSection = () => {
  const router = useRouter();
  const products: OfferProduct[] = [
    {
      id: 1,
      name: "Jackets",
      image: "/winter-offer/1.jpg",
      discount: 30,
    },
    {
      id: 2,
      name: "Warm Outfit",
      image: "/winter-offer/2.jpg",
      discount: 30,
    },
    {
      id: 3,
      name: "Sweater",
      image: "/winter-offer/4.jpg",
      discount: 30,
    },
    {
      id: 4,
      name: "Gloves",
      image: "/winter-offer/3.webp",
      discount: 30,
    },
  ];

  const handleOrderNow = (productName: string) => {
    console.log(`Order now clicked for: ${productName}`);
    router.push("/products");
  };

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16 max-w-[896px] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-sky-500 text-shadow-md mb-6">
            Bundle Up & Save: Exclusive Winter Offer
          </h2>
          <p className="text-xl sm:text-2xl text-black/80">
            Don&apos;t let the chill catch you unprepared. Explore our
            essential, premium winter apparel and take 30% OFF these
            cold-weather heroes!
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="flex flex-col items-center"
              variants={cardVariants}
            >
              {/* Card Container */}
              <div className="relative flex flex-col items-center pt-32">
                {/* Circular Image - Half outside card */}
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 z-20"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="rounded-full object-cover shadow-2xl"
                  />
                </motion.div>

                {/* Gradient Card - EXACT styling as specified */}
                <motion.div
                  className="w-80 h-80 bg-gradient-to-b from-cyan-300 to-sky-500 rounded-3xl shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)] border border-sky-500/50 relative pt-40 pb-8 px-6 flex flex-col items-center justify-between"
                  whileHover={
                    {
                      // scale: 1.02,
                      // zIndex: 40,
                    }
                  }
                  transition={{ duration: 0.3 }}
                >
                  {/* Discount Badge */}
                  {/* If you have a union.svg file */}
                  <motion.div
                    className="absolute top-4 right-0 z-50"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative w-28 h-28">
                      {/* Background Union SVG */}
                      <Image
                        src="/Union.svg"
                        alt="Badge"
                        fill
                        className="object-contain"
                      />

                      {/* Text overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                        <div className="text-white text-3xl font-bold leading-none mb-2">
                          {product.discount}%
                        </div>
                        <div className="px-3 py-1 bg-white rounded-full">
                          <span className="text-sky-500 text-xs font-bold uppercase">
                            OFF
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Product Name */}
                  <div className="text-center mt-auto mb-4">
                    <h3 className="text-white text-2xl font-bold leading-6">
                      {product.name}
                    </h3>
                  </div>

                  {/* Order Now Button */}
                  <motion.button
                    onClick={() => handleOrderNow(product.name)}
                    className="text-sky-800 text-xl font-bold  leading-6 hover:text-sky-900 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-2 border border-white px-12  py-2 rounded-full bg-sky-500/20 shadow-2xl">
                      <span>Order Now</span>
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WinterOfferSection;
