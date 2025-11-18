"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import CommonHeader from "@/components/Common/CommonHeader";
import {
  FileText,
  Shield,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  RefreshCw,
  Eye,
  Lock,
  Users,
  Database,
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
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
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
            { label: "Terms & Privacy Policy", isActive: true },
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
            Terms & Privacy Policy
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-4xl mx-auto"
          >
            Please read these terms and conditions carefully before using our
            services. These policies govern your relationship with Al Buraq
            Garments and Embroidery.
          </motion.p>
        </motion.div>

        {/* Terms of Service Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-cyan-900">
                Terms of Service
              </h2>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-yellow-800 text-sm">
                This document provides a summary of the standard operational
                policies of Al Buraq Garments and Embroidery. Please note that
                these terms are a generic representation, and the legally
                binding, official Terms of Service must be formally obtained and
                reviewed by the client before engagement.
              </p>
            </div>

            <div className="space-y-8">
              {/* Order Confirmation */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Order Confirmation and Acceptance
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    All orders are subject to acceptance by the Company. A
                    binding order is established solely upon receipt of an
                    official purchase order or a detailed written confirmation
                    from the client. This documentation must explicitly
                    delineate the final agreed-upon quantities, specifications,
                    and pricing for the garments and services to be rendered.
                  </p>
                </div>
              </motion.div>

              {/* Financial Terms */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Financial and Payment Terms
                  </h3>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The commencement of production and the procurement of
                    necessary materials are contingent upon the client
                    furnishing an initial deposit, typically constituting a
                    percentage (e.g., fifty percent (50%)) of the total order
                    value.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-blue-800 font-medium">
                      The remaining outstanding balance is strictly due upon the
                      completion of the order or immediately prior to the
                      scheduled delivery or shipment of the finished goods.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Design Approval */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Design and Specification Approval
                  </h3>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    The client bears sole responsibility for the thorough review
                    and formal approval of all final design proofs, mock-ups,
                    and fabric samples. Once written approval is rendered, any
                    subsequent request for alterations or changes to the
                    specifications may necessitate the application of additional
                    charges and a commensurate extension of the production
                    timeline.
                  </p>
                </div>
              </motion.div>

              {/* Cancellation Policy */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center mb-4">
                  <RefreshCw className="w-6 h-6 text-orange-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Cancellation Policy
                  </h3>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Should an order be canceled after the Company has initiated
                    the procurement of raw materials or commenced the production
                    process, the client shall be liable for a cancellation fee.
                    This fee is calculated to cover all material costs incurred
                    and the labor charges expended up to the point of
                    cancellation notification.
                  </p>
                </div>
              </motion.div>

              {/* Defects and Returns */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Defects and Return Claims
                  </h3>
                </div>
                <div className="bg-red-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Claims about alleged manufacturing defects or verifiable
                    discrepancies from the approved specifications must be
                    formally reported to the Company in writing. Such
                    notification must occur within a specified timeframe (e.g.,
                    seven (7) calendar days) following the client&apos;s
                    physical receipt of the ordered goods.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Privacy Policy Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-cyan-900">
                Privacy Policy
              </h2>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-green-800 text-sm">
                This is a generic summary outlining the Company&apos;s approach
                to data handling. Clients should consult with the Company to
                obtain the official, comprehensive, and legally mandated Privacy
                Policy document.
              </p>
            </div>

            <div className="space-y-8">
              {/* Collection of Information */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center mb-4">
                  <Database className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Collection of Information
                  </h3>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Company collects essential personal and business
                    identification information, which includes, but is not
                    limited to:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Client's name",
                      "Corporate address",
                      "Telephone number",
                      "Email address",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200 mt-4">
                    <p className="text-blue-800 font-medium">
                      This data is collected solely for the purposes of
                      processing orders, generating accurate quotations, and
                      facilitating the management and execution of delivery
                      services.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Utilization of Data */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Utilization of Data
                  </h3>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    All data collected is utilized strictly for the purposes of:
                  </p>
                  <div className="space-y-2">
                    {[
                      "Order fulfillment",
                      "Essential communication regarding the transaction",
                      "Accurate invoicing",
                      "Providing necessary updates pertaining to the services contracted",
                    ].map((purpose, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{purpose}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200 mt-4">
                    <p className="text-purple-800 font-medium">
                      The Company shall not employ this data for purposes
                      extraneous to the client&apos;s transaction without
                      explicit consent.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Disclosure and Data Sharing */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-orange-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Disclosure and Data Sharing
                  </h3>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Company is firmly committed to not engaging in the sale,
                    trade, or transfer of the client&apos;s personally
                    identifiable information to external, unaffiliated parties.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <p className="text-orange-800 font-medium">
                      An exception to this policy is made exclusively for
                      trusted third-party entities (e.g., professional shipping
                      and logistics companies) that require limited access to
                      the data to directly assist the Company in operating its
                      business and fulfilling the client&apos;s order, under
                      strict agreements to maintain the confidentiality of the
                      information.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Data Security */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center mb-4">
                  <Lock className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Data Security Protocols
                  </h3>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    The Company undertakes to implement and maintain a variety
                    of robust security measures and procedural safeguards
                    designed to protect and preserve the safety and integrity of
                    the client&apos;s personal information against unauthorized
                    access, disclosure, alteration, or destruction.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
