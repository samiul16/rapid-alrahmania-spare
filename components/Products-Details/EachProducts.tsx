"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Facebook,
  Twitter,
} from "lucide-react";
import { useAddToCart } from "@/hooks/useAddToCart";
import { Product as CartProduct } from "@/redux/hooks/cart/cartSlice";

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

interface EachProductsProps {
  product: ProductData;
}

const EachProducts: React.FC<EachProductsProps> = ({ product }) => {
  const { addToCartGlobal } = useAddToCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const productData = product;

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const cartProduct: CartProduct = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image_url: productData.images[0],
      currency: "AED",
    };
    addToCartGlobal(cartProduct, productData.id, quantity, setQuantity);
  };

  return (
    <motion.div
      className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16 bg-white py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Images */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Image */}
            <motion.div
              className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <Image
                    src={productData.images[selectedImage]}
                    alt={productData.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Thumbnail Images */}
            <motion.div
              className="grid grid-cols-4 gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {productData.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-[#E9292A]"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={image}
                    alt={`${productData.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Product Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Discount Badge */}
            {productData.discount && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div
                  className="bg-[#E9292A] text-white px-3 py-1 rounded-full text-base font-semibold shadow border-2 border-[#E9292A]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {productData.discount}% Off
                </motion.div>
              </motion.div>
            )}

            {/* Product Title & Price */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {productData.name}
              </h1>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  AED {productData.price.toFixed(2)}
                </span>
                {productData.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    AED {productData.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                ({productData.availability} Available)
              </p>
            </div>

            {/* Technical Specifications Table */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-3 text-center">
                Technical Specifications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Specification</th>
                      <th className="text-left py-2">Standard</th>
                      <th className="text-left py-2">Heavy Duty</th>
                      <th className="text-left py-2">Commercial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Max Pressure</td>
                      <td className="py-2">120 PSI</td>
                      <td className="py-2">150 PSI</td>
                      <td className="py-2">180 PSI</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Weight Capacity</td>
                      <td className="py-2">15 Tons</td>
                      <td className="py-2">25 Tons</td>
                      <td className="py-2">40 Tons</td>
                    </tr>
                    <tr>
                      <td className="py-2">Operating Temp</td>
                      <td className="py-2">-20°C to 80°C</td>
                      <td className="py-2">-30°C to 100°C</td>
                      <td className="py-2">-40°C to 120°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Code & Features */}
            <div className="space-y-3">
              <div>
                <span className="text-red-600 font-semibold">Code: </span>
                <span className="text-red-600">{productData.code}</span>
              </div>
              <div>
                <span className="font-semibold">Style Code: </span>
                <span>{productData.styleCode}</span>
              </div>
              <ul className="space-y-1 text-gray-700">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-[#E9292A] rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="text-sm text-gray-600">
              <p>
                Product appearance may slightly vary due to photographic
                lighting.
              </p>
              <p className="text-red-600 font-semibold">
                ** Professional Installation Recommended
              </p>
              <p className="text-green-600 font-semibold">
                ** 2 Year Manufacturer Warranty
              </p>
            </div>

            {/* Type Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h3 className="font-semibold mb-3">Type</h3>
              <div className="flex gap-2 flex-wrap">
                {productData.sizes.map((size, index) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-colors cursor-pointer ${
                      selectedSize === size
                        ? "border-[#E9292A] bg-red-50 text-[#E9292A]"
                        : "border-[#E9292A] hover:border-red-600"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quantity & Add to Cart */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.div
                className="flex items-center border border-[#E9292A] rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-2 hover:bg-gray-50 transition-colors cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <motion.span
                  className="px-4 py-2 border-x border-[#E9292A] min-w-[60px] text-center"
                  key={quantity}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {quantity}
                </motion.span>
                <motion.button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-2 hover:bg-gray-50 transition-colors cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </motion.div>

              <motion.button
                onClick={handleAddToCart}
                className="flex-1 bg-[#E9292A] hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <ShoppingCart className="w-5 h-5" />
                Add To Cart
              </motion.button>

              <motion.button
                className="p-3 border border-[#E9292A] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Heart className="w-5 h-5 text-[#E9292A]" />
              </motion.button>
            </motion.div>

            {/* Installation Guide Link */}
            <button className="text-[#E9292A] hover:text-red-600 font-semibold">
              View Installation Guide
            </button>

            {/* Product Meta */}
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-semibold">SKU: </span>
                <span>{productData.sku}</span>
              </div>
              <div>
                <span className="font-semibold">Categories: </span>
                <span>{productData.categories.join(" / ")}</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-4">
              <span className="font-semibold">Share:</span>
              <div className="flex gap-2">
                <button className="p-2 text-[#E9292A] hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-2 text-[#E9292A] hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                  <Twitter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="border-b border-red-200">
            <nav className="flex space-x-8 justify-center">
              {[
                { id: "description", label: "Description" },
                { id: "additional", label: "Additional Information" },
                { id: "reviews", label: `Reviews (${productData.reviews})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "border-[#E9292A] text-[#E9292A] font-semibold"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-red-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  className="prose max-w-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {productData.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {productData.additionalInfo}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Install with confidence knowing this brake system is backed
                    by comprehensive technical support and a 2-year warranty.
                    Compatible with most commercial vehicle makes and models,
                    this system delivers the reliability and performance your
                    fleet demands.
                  </p>
                </motion.div>
              )}

              {activeTab === "additional" && (
                <motion.div
                  key="additional"
                  className="text-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p>
                        <strong>Material:</strong> High-Grade Steel & Aluminum
                      </p>
                      <p>
                        <strong>Type:</strong> Air Brake System
                      </p>
                      <p>
                        <strong>Installation:</strong> Professional installation
                        recommended
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Origin:</strong> Made in Germany
                      </p>
                      <p>
                        <strong>Brand:</strong> Alrahmania Auto Parts
                      </p>
                      <p>
                        <strong>Warranty:</strong> 2 years manufacturer warranty
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  className="text-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold mb-4">Customer Reviews</h3>
                  <p>No reviews yet. Be the first to review this product!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EachProducts;
