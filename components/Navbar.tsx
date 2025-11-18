"use client";
import { ChevronDown, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { openCart, closeCart } from "@/redux/hooks/cart/cartSlice";
import SearchBar from "@/components/Common/SearchBar";
import ExpandableSearchBar from "@/components/Common/ExpandableSearchBar";
import UserMenu from "@/components/Common/UserMenu";
import ShoppingCartComponent from "@/components/Common/ShoppingCart";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { totalItems, isOpen: isCartOpen } = useAppSelector(
    (state) => state.cart
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { language, setLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search functionality
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Add your search logic here
    // For example: router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu when search opens
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  // Handle user menu functionality
  const handleUserMenuOpen = () => {
    setIsUserMenuOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu when user menu opens
  };

  const handleUserMenuClose = () => {
    setIsUserMenuOpen(false);
  };

  const handleLogin = () => {
    console.log("Login clicked");
    // Add your login logic here
    // For example: router.push('/login');
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  // Handle shopping cart functionality
  const handleCartOpen = () => {
    dispatch(openCart());
    setIsMobileMenuOpen(false); // Close mobile menu when cart opens
  };

  // Handle escape key and outside click
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      if (event.key === "Escape" && isLangDropdownOpen) {
        setIsLangDropdownOpen(false);
      }
      if (event.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
      if (event.key === "Escape" && isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
      if (event.key === "Escape" && isCartOpen) {
        dispatch(closeCart());
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        isLangDropdownOpen &&
        langRef.current &&
        !langRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
      if (
        isUserMenuOpen &&
        userRef.current &&
        !userRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        isCartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target as Node)
      ) {
        dispatch(closeCart());
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    if (isLangDropdownOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
    }

    if (isUserMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
    }

    if (isCartOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [
    isMobileMenuOpen,
    isLangDropdownOpen,
    isSearchOpen,
    isUserMenuOpen,
    isCartOpen,
    dispatch,
  ]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1100 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Determine navbar background and text colors
  const getNavbarStyles = () => {
    return {
      navBg: isScrolled ? "bg-black/20 backdrop-blur-md" : "bg-transparent",
      textColor: isHomePage ? "text-white" : "text-[#E9292A]/60",
      hoverColor: "hover:text-[var(--primary)]/70",
      activeColor: "text-[var(--primary)] font-semibold",
    };
  };

  const styles = getNavbarStyles();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-300 py-2 ${styles.navBg} hover:bg-white border-b border-white/10 shadow group`}
      style={{ zIndex: 9998 }}
    >
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20 pt-1">
        <div className="flex items-center justify-between h-14 sm:h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/rahmania-logo.png"
                alt="Company Logo"
                width={600}
                height={600}
                className="h-14 w-auto drop-shadow-lg rounded-lg"
                // style={{
                //   filter:
                //     "drop-shadow(0 0 10px rgba(0, 191, 255, 0.2)) brightness(1.4) contrast(1.5) saturate(1.8) hue-rotate(10deg)",
                // }}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden xl:block">
            <div
              className={`flex gap-6 lg:gap-10 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {/* <Link
                href="/"
                className={`${
                  pathname === "/" ? styles.activeColor : styles.textColor
                } ${
                  styles.hoverColor
                } group-hover:text-[var(--primary)] font-semibold transition-colors text-lg font-anek`}
              >
                HOME
              </Link> */}

              <Link
                href="/products"
                className={`${
                  pathname === "/products"
                    ? styles.activeColor
                    : styles.textColor
                } ${
                  styles.hoverColor
                } group-hover:text-[var(--primary)] font-semibold transition-colors text-lg font-anek uppercase`}
              >
                PRODUCTS
              </Link>
              <Link
                href="/career"
                className={`${
                  pathname === "/career" ? styles.activeColor : styles.textColor
                } ${
                  styles.hoverColor
                } group-hover:text-[var(--primary)] font-semibold transition-colors text-lg font-anek uppercase`}
              >
                CAREER
              </Link>
              <Link
                href="/about"
                className={`${
                  pathname === "/about" ? styles.activeColor : styles.textColor
                } ${
                  styles.hoverColor
                } group-hover:text-[var(--primary)] font-semibold transition-colors text-lg font-anek uppercase`}
              >
                ABOUT
              </Link>
              <Link
                href="/contact"
                className={`${
                  pathname === "/contact"
                    ? styles.activeColor
                    : styles.textColor
                } ${
                  styles.hoverColor
                } group-hover:text-[var(--primary)] font-semibold transition-colors text-lg font-anek uppercase`}
              >
                CONTACT
              </Link>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="hidden xl:flex items-center space-x-4">
            {/* Language Selector with Flag */}
            {/* <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-2 rounded-full px-3 py-2 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Image
                  src={
                    language === "en"
                      ? "/b.svg"
                      : "https://flagcdn.com/w40/sa.png"
                  }
                  alt={language === "en" ? "English" : "Arabic"}
                  width={24}
                  height={16}
                  className="rounded-sm"
                />
                <ChevronDown
                  className={`${
                    styles.textColor
                  } group-hover:text-sky-500 w-4 h-4 transition-transform ${
                    isLangDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLangDropdownOpen && (
                <div
                  className={`absolute top-full ${
                    isRTL ? "left-0" : "right-0"
                  } mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50`}
                >
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left cursor-pointer ${
                      language === "en" ? "bg-gray-50" : ""
                    }`}
                  >
                    <Image
                      src="/b.svg"
                      alt="English"
                      width={24}
                      height={16}
                      className="rounded-sm"
                    />
                    <span className="text-gray-800 text-sm font-medium">
                      {t("nav.english")}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("ar");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left cursor-pointer ${
                      language === "ar" ? "bg-gray-50" : ""
                    }`}
                  >
                    <Image
                      src="https://flagcdn.com/w40/sa.png"
                      alt="Arabic"
                      width={24}
                      height={16}
                      className="rounded-sm"
                    />
                    <span className="text-gray-800 text-sm font-medium">
                      {t("nav.arabic")}
                    </span>
                  </button>
                </div>
              )}
            </div> */}

            {/* Expandable Search */}
            <ExpandableSearchBar
              onSearch={handleSearch}
              placeholder="Search for products..."
              iconColor={styles.textColor}
              hoverIconColor={styles.hoverColor}
              suggestions={[
                "T-Shirts",
                "Hoodies",
                "Polo Shirts",
                "Uniforms",
                "Embroidery Services",
                "Custom Apparel",
                "Corporate Wear",
                "Sports Wear",
                "Casual Wear",
                "Formal Shirts",
              ]}
            />

            {/* Shopping Cart Icon */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={handleCartOpen}
                className={`${styles.textColor} group-hover:text-[var(--primary)] hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer relative`}
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5 text-[#E9292A]" />
                {/* Cart Badge - Only show if there are items */}
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              <ShoppingCartComponent />
            </div>

            {/* User Icon */}
            <div className="relative" ref={userRef}>
              <button
                onClick={handleUserMenuOpen}
                className={`${styles.textColor} group-hover:text-[var(--primary)] hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer`}
                aria-label="User Account"
              >
                <User className="w-5 h-5 text-[#E9292A]" />
              </button>

              <UserMenu
                isOpen={isUserMenuOpen}
                onClose={handleUserMenuClose}
                isLoggedIn={false} // Change this based on your auth state
                userName="John Doe"
                userEmail="john@example.com"
                onLogin={handleLogin}
                onLogout={handleLogout}
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsSearchOpen(false); // Close search when mobile menu opens
              }}
              className={`relative w-11 h-11 ${styles.textColor} group-hover:text-[#E9292A] hover:opacity-50 transition-colors flex items-center justify-center cursor-pointer`}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute left-0 top-1 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-5 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------START MOBILE---------------- */}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm xl:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            zIndex: 2147483646,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-black/65 backdrop-blur-lg border-l border-white/10 transform transition-transform duration-300 ease-out xl:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          zIndex: 2147483647,
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          isolation: "isolate",
        }}
      >
        {/* Close Button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 text-white hover:text-[#E9292A] transition-colors flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
            aria-label="Close mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          className={`flex flex-col h-full pt-20 px-6 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-6">
            {/* <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/" ? "text-sky-400" : "text-white/80"
              } hover:text-[var(--primary)] font-semibold transition-colors text-xl py-2 font-anek`}
            >
              HOME
            </Link> */}

            <Link
              href="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/products" ? "text-sky-400" : "text-white/80"
              } hover:text-[var(--primary)]  font-semibold transition-colors text-xl py-2 font-anek`}
            >
              PRODUCTS
            </Link>
            <Link
              href="/career"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/career" ? "text-sky-400" : "text-white/80"
              } hover:text-[var(--primary)]  font-semibold transition-colors text-xl py-2 font-anek`}
            >
              CAREER
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/about" ? "text-sky-400" : "text-white/80"
              } hover:text-[var(--primary)]  font-semibold transition-colors text-xl py-2 font-anek`}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/contact" ? "text-sky-400" : "text-white/80"
              } hover:text-[var(--primary)]  font-semibold transition-colors text-xl py-2 font-anek`}
            >
              CONTACT
            </Link>
          </div>

          {/* Mobile Language Selector */}
          {/* <div className="mt-8 mb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setLanguage("en");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center ${
                  isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                } px-3 py-2 rounded-lg transition-colors  cursor-pointer ${
                  language === "en"
                    ? "bg-white/20"
                    : "bg-white/10 hover:bg-white/15"
                }`}
              >
                <Image
                  src="/b.svg"
                  alt="English"
                  width={24}
                  height={16}
                  className="rounded-sm"
                />
                <span className="text-white/90 text-base font-medium">
                  {t("nav.english")}
                </span>
              </button>
              <button
                onClick={() => {
                  setLanguage("ar");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center ${
                  isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                } px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  language === "ar"
                    ? "bg-white/20"
                    : "bg-white/10 hover:bg-white/15"
                }`}
              >
                <Image
                  src="https://flagcdn.com/w40/sa.png"
                  alt="Arabic"
                  width={24}
                  height={16}
                  className="rounded-sm"
                />
                <span className="text-white/90 text-base font-medium">
                  {t("nav.arabic")}
                </span>
              </button>
            </div>
          </div> */}

          {/* Mobile Search Bar */}
          <div className="mt-8 mb-6">
            <ExpandableSearchBar
              onSearch={handleSearch}
              placeholder="Search for products..."
              iconColor="text-white/80"
              hoverIconColor="hover:text-[var(--primary)]"
              className="w-full"
              suggestions={[
                "T-Shirts",
                "Hoodies",
                "Polo Shirts",
                "Uniforms",
                "Embroidery Services",
                "Custom Apparel",
                "Corporate Wear",
                "Sports Wear",
                "Casual Wear",
                "Formal Shirts",
              ]}
            />
          </div>

          {/* Mobile Action Icons */}
          <div className="mt-4 flex items-center justify-around">
            <button
              onClick={handleCartOpen}
              className="text-white/80 hover:text-[var(--primary)] p-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {/* Mobile Cart Badge - Only show if there are items */}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
            <button
              onClick={handleUserMenuOpen}
              className="text-white/80 hover:text-[var(--primary)] p-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="User Account"
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar Component */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={handleSearchClose}
        onSearch={handleSearch}
        placeholder="Search products, categories, brands..."
        suggestions={[
          "T-Shirts",
          "Hoodies",
          "Polo Shirts",
          "Uniforms",
          "Embroidery Services",
          "Custom Apparel",
          "Corporate Wear",
          "Sports Wear",
          "Casual Wear",
          "Formal Shirts",
        ]}
      />

      {/* Mobile User Menu Component */}
      <div className="xl:hidden">
        <UserMenu
          isOpen={isUserMenuOpen}
          onClose={handleUserMenuClose}
          isLoggedIn={false} // Change this based on your auth state
          userName="John Doe"
          userEmail="john@example.com"
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Shopping Cart Component */}
      <div className="xl:hidden">
        <ShoppingCartComponent />
      </div>
    </nav>
  );
};

export default Navbar;
