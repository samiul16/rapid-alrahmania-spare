"use client";

import Image from "next/image";
import React, { useState } from "react";

const PaymentComponent = () => {
  const [cardholderName, setCardholderName] = useState("Rimel");
  const [cardNumber, setCardNumber] = useState("4123 7890 8989");
  const [endMonth, setEndMonth] = useState("mm");
  const [endYear, setEndYear] = useState("yyyy");
  const [cvv, setCvv] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="flex bg-white p-6 py-20 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-16">
      {/* Left Sidebar */}
      <div className="w-64 bg-sky-100 border border-sky-300 rounded-lg shadow-sm p-6 mr-8 h-fit">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Manage My Account
        </h2>

        <div className="space-y-4">
          <div className="text-gray-600 hover:text-sky-500 cursor-pointer">
            My Profile
          </div>
          <div className="text-gray-600 hover:text-sky-500 cursor-pointer">
            Address Book
          </div>
          <div className="text-sky-500 font-medium cursor-pointer">
            My Payment Options
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">
          My Orders
        </h3>
        <div className="space-y-4">
          <div className="text-gray-600 hover:text-sky-500 cursor-pointer">
            My Returns
          </div>
          <div className="text-gray-600 hover:text-sky-500 cursor-pointer">
            My Cancellations
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">
          My WishList
        </h3>
      </div>

      {/* Main Payment Form */}
      <div className="flex-1 bg-sky-100 rounded-lg shadow-sm p-8 border border-sky-300 h-fit">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-sky-500">
            Payment Options
          </h1>
          <div className="text-xl font-semibold text-sky-400">
            Total AED130.00
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-sky-500 rounded-full mr-3"></div>
            <span className="text-gray-600">Payment System</span>
          </div>

          {/* Payment Icons */}
          <div className="flex space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <div className=" rounded px-2 py-1">
                <Image src={"/visa.png"} alt="visa" width={60} height={20} />
              </div>
              <div className=" rounded px-2 py-1">
                <div className="flex space-x-1">
                  <Image src={"/mc.png"} alt="visa" width={32} height={10} />
                </div>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <Image src={"/paypal.png"} alt="visa" width={65} height={20} />
              </div>
              <div className=" rounded px-2 py-1">
                <Image src={"/ipay.png"} alt="visa" width={50} height={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Cardholder Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Rimel"
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="4123 7890 8989"
            />
          </div>

          {/* End Date and CVV */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                End Date
              </label>
              <div className="flex space-x-2">
                <select
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-gray-50"
                >
                  <option value="mm">mm</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <select
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-gray-50"
                >
                  <option value="yyyy">yyyy</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                CVV
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  placeholder="3 Digits"
                  maxLength={3}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs text-gray-500">?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-5 h-5 text-sky-500 border-gray-300 rounded-full focus:ring-sky-500"
            />
            <label htmlFor="terms" className="text-gray-600">
              I have read and accept the terms of use and privacy policy
            </label>
          </div>

          {/* Pay Now Button */}
          <button
            className="w-full bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold py-4 px-6 hover:from-sky-500 hover:to-sky-700 transition-all duration-200 shadow rounded-full cursor-pointer"
            disabled={!acceptTerms}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
