"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-sky-500 text-white py-12 rounded-t-4xl">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/rahmania-logo.png"
                alt="Alburaq"
                width={120}
                height={40}
                className="mb-4 rounded-lg"
              />
            </div>
            <p className="text-lg text-gray-100 mb-6">
              Alburaq is your go-to destination for quality products at
              unbeatable prices.
            </p>

            {/* Social Media Icons */}
            <div className="flex flex-nowrap gap-2 sm:gap-3 overflow-x-auto">
              {/* X (Twitter) */}
              <Link
                href="https://x.com/home"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-8 h-8 min-w-[2rem] min-h-[2rem] border-2 border-sky-300 rounded-full flex items-center justify-center hover:bg-sky-400 hover:bg-opacity-20 transition-all aspect-square"
              >
                <svg
                  className="w-3 h-3 text-sky-200 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>

              {/* Facebook */}
              <Link
                href="https://www.facebook.com/Alburaqemb/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-8 h-8 min-w-[2rem] min-h-[2rem] bg-sky-400 rounded-full flex items-center justify-center hover:bg-sky-400 transition-colors aspect-square"
              >
                <svg
                  className="w-4 h-4 text-white flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>

              {/* YouTube */}
              <Link
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-8 h-8 min-w-[2rem] min-h-[2rem] border-2 border-sky-400 rounded-full flex items-center justify-center hover:bg-sky-400 hover:bg-opacity-20 transition-all aspect-square"
              >
                <svg
                  className="w-4 h-4 text-sky-200 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-8 h-8 min-w-[2rem] min-h-[2rem] border-2 border-sky-400 rounded-full flex items-center justify-center hover:bg-sky-400 hover:bg-opacity-20 transition-all aspect-square"
              >
                <svg
                  className="w-3 h-3 text-sky-200 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Help & Support Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/help-support"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/help-support"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/help-support"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  How to Order
                </Link>
              </li>
              <li>
                <Link
                  href="/help-support"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  How to confirm
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company Info</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="text-lg text-gray-300 hover:text-white transition-colors"
                >
                  Our Blog
                </Link>
              </li> */}
              <li>
                <Link
                  href="/career"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=Al+Rashidiya+1+Ajman+United+Arab+Emirates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  Store Location
                </Link>
              </li>
              <li>
                <Link
                  href="/help-support"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  How to Track
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/faq"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-policy"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  Terms & Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/gift-card"
                  className="text-lg text-gray-100 hover:text-white transition-colors"
                >
                  Gift Card
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-7">
              <div className="flex items-start space-x-2">
                <svg
                  className="w-6 h-6 mt-1 text-sky-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <p className="text-lg text-gray-100">
                  Al Rashidiya 1 - Ajman - United Arab Emirates
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  className="w-6 h-6 text-sky-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <p className="text-lg text-gray-100">+971 54 324 7559</p>
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  className="w-6 h-6 text-sky-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <p className="text-lg text-gray-100">marium.marufa@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t-2 border-sky-400 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-lg text-gray-100">
                © 2025 Alburaq. All Rights Reserved.
              </p>
            </div>

            <Link
              href="#"
              className="text-lg text-gray-100 hover:text-white underline transition-colors"
            >
              Download Our App
            </Link>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded px-2 py-1">
                <Image src={"/visa.png"} alt="visa" width={60} height={20} />
              </div>
              <div className="bg-white rounded px-2 py-1">
                <div className="flex space-x-1">
                  <Image src={"/mc.png"} alt="visa" width={32} height={10} />
                </div>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <Image src={"/paypal.png"} alt="visa" width={65} height={20} />
              </div>
              <div className="bg-white rounded px-2 py-1">
                <Image src={"/ipay.png"} alt="visa" width={40} height={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
