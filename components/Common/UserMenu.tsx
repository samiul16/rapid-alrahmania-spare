"use client";

import React, { useEffect, useRef } from "react";
import {
  User,
  LogIn,
  UserPlus,
  Settings,
  ShoppingBag,
  Heart,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  userName?: string;
  userEmail?: string;
  onLogin?: () => void;
  onLogout?: () => void;
  className?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({
  isOpen,
  onClose,
  isLoggedIn = false,
  userName = "John Doe",
  userEmail = "john@example.com",
  onLogin,
  onLogout,
  className = "",
}) => {
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle escape key and outside click
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if the click is on a link or inside a link
      const isLinkClick = target.tagName === "A" || target.closest("a");

      if (
        isOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        onClose();
      } else if (isLinkClick && userMenuRef.current?.contains(target)) {
        // If clicking a link inside the menu, close the menu after a small delay
        // to allow navigation to happen
        setTimeout(() => {
          onClose();
        }, 100);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("click", handleClickOutside); // Changed from mousedown to click
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogin = () => {
    router.push("/login");
    onClose();
  };

  const handleLogout = () => {
    onLogout?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden"
        onClick={onClose}
      />

      {/* User Menu Dropdown */}
      <div
        ref={userMenuRef}
        className={`fixed md:absolute top-0 md:top-full left-0 md:left-auto right-0 md:right-0 md:mt-2 w-full md:w-80 h-full md:h-auto bg-white md:rounded-lg shadow-2xl border-0 md:border border-gray-200 z-[9999] transform transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-full md:-translate-y-2"
        } ${className}`}
        style={{
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            {isLoggedIn ? "My Account" : "Account"}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sky-200 transition-colors cursor-pointer"
            aria-label="Close user menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {isLoggedIn ? (
          <>
            {/* User Info */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{userName}</p>
                  <p className="text-sm text-gray-600">{userEmail}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">My Profile</span>
              </Link>

              <Link
                href="/orders"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">My Orders</span>
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Wishlist</span>
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Settings</span>
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-gray-100 p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 rounded-md cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Not Logged In */}
            <div className="p-4">
              <p className="text-gray-600 mb-4 text-center">
                Sign in to access your account and track your orders
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-300 to-sky-500 text-white rounded-lg hover:from-cyan-400 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-semibold">Sign In</span>
                </button>

                <Link
                  href="/register"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span className="font-semibold">Create Account</span>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="border-t border-gray-100 py-2">
              <Link
                href="/tracking"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Track Order</span>
              </Link>

              <Link
                href="/help-support"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Help & Support</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserMenu;
