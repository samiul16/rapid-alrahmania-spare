"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tag, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import CommonHeader from "@/components/Common/CommonHeader";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  zip: string;
  description: string;
}

interface ShippingOption {
  id: string;
  name: string;
  duration: string;
  price: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const CheckoutPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    zip: "",
    description: "",
  });

  const [selectedShipping, setSelectedShipping] = useState<string>("express");
  const [selectedPayment, setSelectedPayment] = useState<string>("cod");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const shippingOptions: ShippingOption[] = [
    {
      id: "free",
      name: "Free Shipping",
      duration: "7-20 Days",
      price: 0,
    },
    {
      id: "express",
      name: "Express Shipping",
      duration: "1-3 Days",
      price: 50,
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "online",
      name: "Online Payment",
      icon: <CreditCard className="w-5 h-5" />,
    },
  ];

  const subtotal = 2500;
  const shippingFee =
    shippingOptions.find((option) => option.id === selectedShipping)?.price ||
    0;
  const discount = couponApplied ? 100 : 0;
  const total = subtotal + shippingFee - discount;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setCouponApplied(true);
    }
  };

  const handleCheckout = () => {
    console.log("Processing checkout...", {
      formData,
      selectedShipping,
      selectedPayment,
      total,
    });
  };

  return (
    <div className="w-full bg-white min-h-screen py-8 md:py-12 ">
      <CommonHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Checkout", isActive: true },
        ]}
      />
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20 pt-10">
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          {/* Left Section - Personal Information & Shipping */}
          <div className="flex-1 max-w-[1080px]">
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Personal Information */}
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-neutral-900">
                  Personal Information
                </h2>

                <div className="bg-sky-100 rounded-2xl shadow-[2px_4px_10px_0px_rgba(0,0,0,0.10)] p-6 space-y-6">
                  {/* Name */}
                  <div className="space-y-3">
                    <label className="text-lg font-medium text-zinc-600">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full h-14 px-3 bg-white rounded-[10px] border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <label className="text-lg font-medium text-zinc-600">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-14 px-3 bg-white rounded-[10px] border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-3">
                    <label className="text-lg font-medium text-zinc-600">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full h-14 px-3 bg-white rounded-[10px] border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                      placeholder="Enter your mobile number"
                    />
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <label className="text-lg font-medium text-zinc-600">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full h-14 px-3 bg-white rounded-[10px] border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                        placeholder="City"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-lg font-medium text-zinc-600">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full h-14 px-3 bg-white rounded-[10px] border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                        placeholder="State"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-lg font-medium text-zinc-600">
                        ZIP
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="w-full h-14 px-3 bg-white rounded-[10px] border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <label className="text-lg font-medium text-zinc-600">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-3 bg-white rounded-[20px] border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all resize-none"
                      placeholder="Additional delivery instructions (optional)"
                    />
                  </div>

                  {/* Shipping Details */}
                  <div className="space-y-6 pt-4">
                    <h3 className="text-lg font-bold text-neutral-900">
                      Shipping Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {shippingOptions.map((option) => (
                        <motion.label
                          key={option.id}
                          htmlFor={`shipping-${option.id}`}
                          className={`relative p-6 bg-white rounded-[50px] border-2 cursor-pointer transition-all ${
                            selectedShipping === option.id
                              ? "border-sky-500 shadow-lg ring-2 ring-sky-200"
                              : "border-neutral-200 hover:border-sky-300"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            id={`shipping-${option.id}`}
                            name="shipping"
                            value={option.id}
                            checked={selectedShipping === option.id}
                            onChange={() => setSelectedShipping(option.id)}
                            className="sr-only"
                          />

                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-4">
                              {/* Custom Radio Button */}
                              <div className="relative w-6 h-6 flex-shrink-0 mt-0.5">
                                <div
                                  className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                                    selectedShipping === option.id
                                      ? "border-sky-500 bg-white"
                                      : "border-gray-400 bg-white"
                                  }`}
                                >
                                  {selectedShipping === option.id && (
                                    <motion.div
                                      className="w-3 h-3 bg-sky-500 rounded-full"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                      }}
                                    />
                                  )}
                                </div>
                              </div>

                              <div className="text-left">
                                <div
                                  className={`text-lg font-semibold transition-colors ${
                                    selectedShipping === option.id
                                      ? "text-sky-600"
                                      : "text-zinc-700"
                                  }`}
                                >
                                  {option.name}
                                </div>
                                <div className="text-base text-zinc-500 mt-1">
                                  {option.duration}
                                </div>
                              </div>
                            </div>

                            <div
                              className={`text-lg font-bold transition-colors ${
                                selectedShipping === option.id
                                  ? "text-sky-600"
                                  : "text-zinc-600"
                              }`}
                            >
                              AED {option.price}
                            </div>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Section - Order Summary & Payment */}
          <div className="w-full lg:w-[400px] space-y-10 mt-30">
            {/* Order Summary */}
            <motion.div
              className="bg-sky-100 rounded-2xl shadow-[2px_4px_10px_0px_rgba(0,0,0,0.10)] p-6 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-base font-bold text-neutral-900">
                Orders Summary
              </h3>

              <div className="space-y-6">
                <div className="h-px bg-zinc-300" />

                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-black">
                    Subtotal
                  </span>
                  <span className="text-base font-medium text-black">
                    AED {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-black">
                    Shipping fee
                  </span>
                  <span className="text-base font-medium text-black">
                    AED {shippingFee.toFixed(2)}
                  </span>
                </div>

                {couponApplied && (
                  <motion.div
                    className="flex justify-between items-center text-green-600"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="text-base font-medium">Discount</span>
                    <span className="text-base font-medium">
                      -AED {discount.toFixed(2)}
                    </span>
                  </motion.div>
                )}

                <div className="h-px bg-zinc-300" />

                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-black">
                    Total Order
                  </span>
                  <span className="text-lg font-bold text-black">
                    AED {total.toFixed(2)}
                  </span>
                </div>

                {/* Coupon Code */}
                <div className="relative">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon Code"
                    disabled={couponApplied}
                    className="w-full h-12 pl-4 pr-28 bg-white rounded-[50px] border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-base font-medium text-zinc-600 disabled:bg-gray-100"
                  />
                  <motion.button
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !couponCode.trim()}
                    className="absolute right-0 top-0 h-12 px-7 bg-sky-500 text-white rounded-r-[50px] border border-sky-500 hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {couponApplied ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      "Apply"
                    )}
                  </motion.button>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  className="w-full h-12 bg-sky-500 text-white rounded-[100px] border border-sky-500 hover:bg-sky-600 transition-colors font-bold uppercase text-base flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Truck className="w-5 h-5" />
                  Process to Checkout
                </motion.button>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              className="bg-sky-100 rounded-2xl shadow-[2px_4px_10px_0px_rgba(0,0,0,0.10)] p-6 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold text-neutral-900">
                Payment Methods
              </h3>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <motion.label
                    key={method.id}
                    htmlFor={`payment-${method.id}`}
                    className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? "bg-white shadow-md"
                        : "hover:bg-white/50"
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <input
                      type="radio"
                      id={`payment-${method.id}`}
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                      className="sr-only"
                    />

                    {/* Custom Radio Button */}
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedPayment === method.id
                            ? "border-sky-500 bg-white"
                            : "border-gray-400 bg-white"
                        }`}
                      >
                        {selectedPayment === method.id && (
                          <motion.div
                            className="w-3 h-3 bg-sky-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          />
                        )}
                      </div>
                    </div>

                    <span
                      className={`text-lg font-medium flex items-center gap-2 transition-colors ${
                        selectedPayment === method.id
                          ? "text-sky-600"
                          : "text-neutral-900"
                      }`}
                    >
                      {method.icon}
                      {method.name}
                    </span>
                  </motion.label>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
