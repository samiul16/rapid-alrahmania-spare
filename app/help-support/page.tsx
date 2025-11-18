"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import CommonHeader from "@/components/Common/CommonHeader";
import {
  Truck,
  Package,
  Clock,
  MapPin,
  RotateCcw,
  ShoppingCart,
  Search,
  CheckCircle,
  AlertTriangle,
  Phone,
  MessageCircle,
  Building,
  Users,
  BookOpen,
  MapPinIcon,
  Star,
} from "lucide-react";

export default function Page() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="bg-white min-h-screen">
      <div data-aos="fade-up">
        <CommonHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Help & Support", isActive: true },
          ]}
        />
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 py-12">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-cyan-900 mb-6"
          >
            Help & Support Center
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Everything you need to know about ordering, shipping, and our
            services. We&apos;re here to help you every step of the way.
          </motion.p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              WhatsApp Support
            </h3>
            <p className="text-gray-600 mb-4">
              Get instant help via WhatsApp chat
            </p>
            {/* <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
              Chat Now
            </button> */}
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with our team</p>
            {/* <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
              Call Now
            </button> */}
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Track Order
            </h3>
            <p className="text-gray-600 mb-4">Check your order status</p>
            {/* <button className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors">
              Track Now
            </button> */}
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Shipping Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-cyan-900">
                  Shipping Information
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                We deliver uniforms and custom-stitched garments all over UAE.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                    Delivery Coverage
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Ajman", "Dubai", "Sharjah", "Abu Dhabi"].map(
                      (city, index) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {city}
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Other Emirates – available depending on order quantity
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Clock className="w-5 h-5 text-orange-500 mr-2" />
                    Production Time
                  </h3>
                  <p className="text-gray-600">
                    Standard production time depends on order quantity & design.
                  </p>
                  <div className="bg-orange-50 rounded-lg p-3 mt-2">
                    <p className="text-orange-800 font-medium">
                      Average timeline: 7 – 20 Working Days
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Package className="w-5 h-5 text-purple-500 mr-2" />
                    Delivery Types
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Courier delivery</span>
                      <span className="text-sm text-gray-500">
                        (charges apply)
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">
                        Local pickup from Ajman shop
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        Free
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Returns Policy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <RotateCcw className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-cyan-900">
                  Returns Policy
                </h2>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800">
                  Because we produce customized & embroidered uniforms, returns
                  are not applicable after embroidery & stitching is completed.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Returns Possible
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Wrong logo from our side",
                      "Wrong size stitching by our team",
                      "Wrong fabric/color supplied by our team",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                    Not Eligible for Return
                  </h3>
                  <div className="space-y-2">
                    {[
                      "If the customer changes the design after approval",
                      "If the size measurement given by the customer was wrong",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    We always send final approval before stitching – so please
                    check carefully.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* How to Order */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-cyan-900">
                  How to Order
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Send us your requirement",
                    details: [
                      "Quantity",
                      "Type of uniform",
                      "Sample picture (if available)",
                    ],
                  },
                  {
                    step: 2,
                    title: "Select fabric & colors",
                    details: ["We will share available fabric options"],
                  },
                  {
                    step: 3,
                    title: "Send logo for embroidery",
                    details: ["We accept JPEG / PDF / PNG / AI / PSD"],
                  },
                  {
                    step: 4,
                    title: "Get quotation",
                    details: ["We will share the final price & time"],
                  },
                  {
                    step: 5,
                    title: "Confirm order + advance payment",
                    details: ["After advance received, we start production"],
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <div className="space-y-1">
                        {item.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                            <span className="text-gray-600 text-sm">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Order Tracking */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Search className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-cyan-900">
                  How to Track Your Order
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                You can track your order anytime by:
              </p>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {[
                  {
                    icon: MessageCircle,
                    text: "WhatsApp message",
                    bgColor: "bg-green-50",
                    iconColor: "text-green-600",
                  },
                  {
                    icon: Phone,
                    text: "Calling our number",
                    bgColor: "bg-blue-50",
                    iconColor: "text-blue-600",
                  },
                  {
                    icon: MessageCircle,
                    text: "Visiting our WhatsApp Business chat",
                    bgColor: "bg-green-50",
                    iconColor: "text-green-600",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 ${item.bgColor} rounded-lg`}
                  >
                    <item.icon className={`w-5 h-5 ${item.iconColor} mr-3`} />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  We will update:
                </h3>
                <div className="space-y-2">
                  {[
                    "Production Stage",
                    "Embroidery Stage",
                    "Stitching Stage",
                    "Dispatch / Delivery details",
                  ].map((stage, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-blue-800 text-sm">
                  Order Status updates are usually given within 24 hours upon
                  request.
                </p>
              </div>
            </motion.div>

            {/* Order Confirmation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-cyan-900">
                  How to Confirm
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                Before we start making your uniforms, we will send:
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "Final design/logo preview",
                  "Final fabric color confirmation",
                  "Final size breakdown",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium mb-2">
                  You must reply &quot;Approved ✅&quot; in WhatsApp
                </p>
                <p className="text-green-700 text-sm">
                  Only after your approval, our team will start embroidery &
                  stitching.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Company Info */}
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-cyan-900 text-center mb-12">
            Company Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              {
                icon: Building,
                text: "About Us",
                bgColor: "bg-blue-100",
                iconColor: "text-blue-600",
              },
              {
                icon: BookOpen,
                text: "Our Blog",
                bgColor: "bg-green-100",
                iconColor: "text-green-600",
              },
              {
                icon: Users,
                text: "Careers",
                bgColor: "bg-purple-100",
                iconColor: "text-purple-600",
              },
              {
                icon: MapPinIcon,
                text: "Store Location",
                bgColor: "bg-red-100",
                iconColor: "text-red-600",
              },
              {
                icon: Star,
                text: "Testimonial",
                bgColor: "bg-yellow-100",
                iconColor: "text-yellow-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center cursor-pointer"
              >
                <div
                  className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}
                >
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-800">{item.text}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}
