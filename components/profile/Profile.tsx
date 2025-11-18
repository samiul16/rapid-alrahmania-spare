"use client";

import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfileProps {
  onSaveChanges?: (data: FormData) => void;
  onCancel?: () => void;
}

export default function Profile({ onSaveChanges, onCancel }: ProfileProps) {
  const [formData, setFormData] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    onSaveChanges?.(formData);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <div className=" bg-white py-10 px-4">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-sky-100 p-4 rounded-2xl shadow border border-sky-300">
              {/* Manage My Account Section */}
              <div className="p-6">
                <h2 className="text-gray-800 text-base font-semibold mb-4">
                  Manage My Account
                </h2>
                <div className="space-y-3">
                  <div className="text-cyan-500 text-sm font-medium cursor-pointer">
                    My Profile
                  </div>
                  <div className="text-gray-500 text-sm cursor-pointer hover:text-gray-700 transition-colors">
                    Address Book
                  </div>
                  <div className="text-gray-500 text-sm cursor-pointer hover:text-gray-700 transition-colors">
                    My Payment Options
                  </div>
                </div>
              </div>

              {/* My Orders Section */}
              <div className=" p-6">
                <h2 className="text-gray-800 text-base font-semibold mb-4">
                  My Orders
                </h2>
                <div className="space-y-3">
                  <div className="text-gray-500 text-sm cursor-pointer hover:text-gray-700 transition-colors">
                    My Returns
                  </div>
                  <div className="text-gray-500 text-sm cursor-pointer hover:text-gray-700 transition-colors">
                    My Cancellations
                  </div>
                </div>
              </div>

              {/* My WishList Section */}
              <div className=" p-6">
                <h2 className="text-gray-800 text-base font-semibold mb-4">
                  My WishList
                </h2>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div className="bg-sky-100 rounded-2xl shadow-sm p-6 border border-sky-300">
              <h2 className="text-gray-800 text-base font-semibold mb-4">
                Payment Methods
              </h2>
              <div className="space-y-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={selectedPaymentMethod === "cash"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      selectedPaymentMethod === "cash"
                        ? "border-cyan-500 bg-cyan-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPaymentMethod === "cash" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-700 text-sm">
                    Cash on Delivery
                  </span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={selectedPaymentMethod === "bank"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      selectedPaymentMethod === "bank"
                        ? "border-cyan-500 bg-cyan-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPaymentMethod === "bank" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-700 text-sm">Bank Transfer</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={selectedPaymentMethod === "online"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      selectedPaymentMethod === "online"
                        ? "border-cyan-500 bg-cyan-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPaymentMethod === "online" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-700 text-sm">Online Payment</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-sky-100 rounded-2xl shadow-sm border border-sky-300 p-8">
              <h1 className="text-sky-500 text-xl font-semibold mb-8">
                Edit Your Profile
              </h1>

              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-800 text-sm font-semibold mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:bg-white transition-all"
                      placeholder="Md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 text-sm font-semibold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:bg-white transition-all"
                      placeholder="Rimel"
                    />
                  </div>
                </div>

                {/* Email and Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-800 text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:bg-white transition-all"
                      placeholder="rimel111@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 text-sm font-semibold mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:bg-white transition-all"
                      placeholder="Kingston, 5236, United State"
                    />
                  </div>
                </div>

                {/* Password Changes Section */}
                <div className="pt-4">
                  <h2 className="text-gray-800 text-sm font-semibold mb-4">
                    Password Changes
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) =>
                        handleInputChange("currentPassword", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:bg-white transition-all"
                      placeholder="Current Password"
                    />
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        handleInputChange("newPassword", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:bg-white transition-all"
                      placeholder="New Password"
                    />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:bg-white transition-all"
                      placeholder="Confirm New Password"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                  <button
                    onClick={handleCancel}
                    className="px-8 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="px-8 py-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors font-medium shadow-md cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
