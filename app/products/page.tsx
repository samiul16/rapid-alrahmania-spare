"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Grid, List, Heart } from "lucide-react";
import CommonHeader from "@/components/Common/CommonHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAddToCart } from "@/hooks/useAddToCart";
import {
  addToCart,
  Product as CartProduct,
} from "@/redux/hooks/cart/cartSlice";

const Products = () => {
  const router = useRouter();
  const { addToCartGlobal } = useAddToCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Brake System",
    "Body Parts",
    "Cooling System",
    "Engine Parts",
    "Fuel System",
    "Light Systems",
  ]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showDropdown, setShowDropdown] = useState({
    items: false,
    sort: false,
  });
  const [collapsedSections, setCollapsedSections] = useState({
    categories: false,
    brands: false,
  });
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const categories = [
    { name: "Brake System", count: 15, isChild: false },
    { name: "Body Parts", count: 12, isChild: false },
    { name: "Cooling System", count: 8, isChild: false },
    { name: "Engine Parts", count: 20, isChild: false },
    { name: "Fuel System", count: 10, isChild: false },
    { name: "Light Systems", count: 6, isChild: false },
  ];

  const brands: { name: string; count: number }[] = [
    { name: "Toyota", count: 18 },
    { name: "BMW", count: 15 },
    { name: "Mercedes", count: 12 },
    { name: "Audi", count: 10 },
    { name: "Lamborghini", count: 6 },
    { name: "Ferrari", count: 4 },
    { name: "Porsche", count: 8 },
    { name: "Volkswagen", count: 14 },
    { name: "Honda", count: 16 },
    { name: "Nissan", count: 11 },
  ];

  const products = useMemo(
    () => [
      {
        id: 1,
        name: "Premium Air Brake System",
        price: 450,
        priceText: "AED 450",
        image: "/Exclusive-Deals/1.png",
        rating: 5,
        reviewCount: 24,
        specs: [
          "Material: High-Grade Steel & Aluminum",
          "Compatibility: Heavy Duty Trucks",
          "Warranty: 2 Years",
        ],
        category: "Brake System",
        brand: "Toyota",
        dateAdded: new Date("2024-01-15"),
      },
      {
        id: 2,
        name: "Disc Brake Rotor Set",
        price: 320,
        priceText: "AED 320",
        image: "/Exclusive-Deals/2.png",
        rating: 4,
        reviewCount: 18,
        specs: [
          "Material: Cast Iron with Coating",
          "Size: 350mm Diameter",
          "Compatible: BMW, Mercedes, Audi",
        ],
        category: "Brake System",
        brand: "BMW",
        dateAdded: new Date("2024-01-20"),
      },
      {
        id: 3,
        name: "Turbo Charger Assembly",
        price: 850,
        priceText: "AED 850",
        image: "/Exclusive-Deals/3.png",
        rating: 5,
        reviewCount: 15,
        specs: [
          "Material: High-Temperature Alloy",
          "Power Output: 250HP Boost",
          "Compatible: Toyota, Honda Engines",
        ],
        category: "Engine Parts",
        brand: "Honda",
        dateAdded: new Date("2024-02-01"),
      },
      {
        id: 4,
        name: "Alloy Wheel Rim 18 inch",
        price: 280,
        priceText: "AED 280",
        image: "/Exclusive-Deals/4.png",
        rating: 4,
        reviewCount: 22,
        specs: [
          "Material: Lightweight Aluminum Alloy",
          "Size: 18x8 inches",
          "Finish: Polished Chrome",
        ],
        category: "Body Parts",
        brand: "Mercedes",
        dateAdded: new Date("2024-01-25"),
      },
      {
        id: 5,
        name: "Engine Oil Filter Kit",
        price: 65,
        priceText: "AED 65",
        image: "/top-selling/1.png",
        rating: 5,
        reviewCount: 31,
        specs: [
          "Material: High-Quality Paper Element",
          "Filtration: 99.5% Efficiency",
          "Compatible: Most 4-Cylinder Engines",
        ],
        category: "Engine Parts",
        brand: "Toyota",
        dateAdded: new Date("2024-02-05"),
      },
      {
        id: 6,
        name: "Radiator Cooling System",
        price: 420,
        priceText: "AED 420",
        image: "/top-selling/3.png",
        rating: 4,
        reviewCount: 19,
        specs: [
          "Material: Aluminum Core with Plastic Tanks",
          "Capacity: 2.5 Liters",
          "Compatible: Toyota Camry, Honda Accord",
        ],
        category: "Cooling System",
        brand: "Honda",
        dateAdded: new Date("2024-01-10"),
      },
      {
        id: 7,
        name: "LED Headlight Assembly",
        price: 380,
        priceText: "AED 380",
        image: "/top-selling/5.png",
        rating: 5,
        reviewCount: 27,
        specs: [
          "Technology: Advanced LED Matrix",
          "Brightness: 6000K Cool White",
          "Compatible: BMW 3 Series, Mercedes C-Class",
        ],
        category: "Light Systems",
        brand: "BMW",
        dateAdded: new Date("2024-02-10"),
      },
      {
        id: 8,
        name: "Fuel Injection Pump",
        price: 650,
        priceText: "AED 650",
        image: "/top-selling/7.png",
        rating: 4,
        reviewCount: 16,
        specs: [
          "Type: High-Pressure Direct Injection",
          "Flow Rate: 200L/hour",
          "Compatible: Diesel Engines",
        ],
        category: "Fuel System",
        brand: "Audi",
        dateAdded: new Date("2024-01-30"),
      },
      {
        id: 9,
        name: "Carbon Fiber Hood",
        price: 1200,
        priceText: "AED 1200",
        image: "/top-selling/8.png",
        rating: 5,
        reviewCount: 12,
        specs: [
          "Material: 100% Carbon Fiber Weave",
          "Weight: 40% Lighter than Steel",
          "Compatible: Sports Cars & Performance Vehicles",
        ],
        category: "Body Parts",
        brand: "Lamborghini",
        dateAdded: new Date("2024-02-12"),
      },
     {
        id: 10,
        name: "Alloy Wheel Rim 18 inch",
        price: 280,
        priceText: "AED 280",
        image: "/Exclusive-Deals/4.png",
        rating: 4,
        reviewCount: 22,
        specs: [
          "Material: Lightweight Aluminum Alloy",
          "Size: 18x8 inches",
          "Finish: Polished Chrome",
        ],
        category: "Body Parts",
        brand: "Mercedes",
        dateAdded: new Date("2024-01-25"),
      },
    ],
    []
  );

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const toggleSection = (section: "categories" | "brands") => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleParentCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Filter and sort products
  const processedProducts = useMemo(() => {
    // Filter by categories
    let filtered = products.filter((product) =>
      selectedCategories.includes(product.category)
    );

    // Filter by brands (only if brands are selected)
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Popular":
          return b.reviewCount - a.reviewCount;
        case "Newest item":
        default:
          return b.dateAdded.getTime() - a.dateAdded.getTime();
      }
    });

    return sorted;
  }, [products, selectedCategories, selectedBrands, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = processedProducts.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (num: number) => {
    setItemsPerPage(num);
    setCurrentPage(1); // Reset to first page
    setShowDropdown((prev) => ({ ...prev, items: false }));
  };

  const handleSortChange = (option: string) => {
    setSortBy(option);
    setCurrentPage(1); // Reset to first page
    setShowDropdown((prev) => ({ ...prev, sort: false }));
  };

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
      y: -8,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #22d3ee;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #06b6d4;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #22d3ee transparent;
        }
      `}</style>
      <div className=" bg-white">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-2 max-w-[1800px] mx-auto"
        >
          <CommonHeader
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Products", isActive: true },
            ]}
          />
        </motion.div>
        {/* Main Content */}
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1 space-y-4"
            >
              {/* Categories */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                {/* Categories Header */}
                <div
                  className="flex items-center justify-between p-5 cursor-pointer"
                  onClick={() => toggleSection("categories")}
                >
                  <h2 className="text-gray-700 text-base font-medium">
                    Categories
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      collapsedSections.categories ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {!collapsedSections.categories && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1">
                        {/* Search */}
                        <div className="relative mb-4">
                          <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2.5 pl-10 bg-gray-50 rounded-full border-0 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-white transition-all shadow-md"
                          />
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500" />
                        </div>

                        {/* Category List with Custom Scrollbar */}
                        <div className="space-y-1 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                          {categories
                            .filter((category) =>
                              category.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            )
                            .map((category, index) => {
                              return (
                                <div key={category.name}>
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                    className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors group"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleCategory(category.name);
                                    }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-5 h-5 rounded-md transition-all duration-200 flex items-center justify-center ${
                                          selectedCategories.includes(
                                            category.name
                                          )
                                            ? "bg-sky-500 shadow-sm"
                                            : "border-2 border-gray-300 hover:border-gray-400"
                                        }`}
                                      >
                                        {selectedCategories.includes(
                                          category.name
                                        ) && (
                                          <svg
                                            className="w-3 h-3 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        )}
                                      </div>
                                      <span
                                        className={`text-sm font-normal transition-colors ${
                                          selectedCategories.includes(
                                            category.name
                                          )
                                            ? "text-gray-800 font-semibold"
                                            : "text-gray-600"
                                        }`}
                                      >
                                        {category.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-gray-400 font-medium">
                                        ({category.count})
                                      </span>
                                    </div>
                                  </motion.div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Brands */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                {/* Brands Header */}
                <div
                  className="flex items-center justify-between p-5 cursor-pointer"
                  onClick={() => toggleSection("brands")}
                >
                  <h2 className="text-gray-700 text-base font-medium">
                    Brands
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      collapsedSections.brands ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {!collapsedSections.brands && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1">
                        {/* Search */}
                        <div className="relative mb-4">
                          <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-4 py-2.5 pl-10 bg-gray-50 rounded-full border-0 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:bg-white transition-all"
                          />
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
                        </div>

                        {/* Brand List with Custom Scrollbar */}
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                          {brands.map((brand, index) => (
                            <motion.label
                              key={brand.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.02 }}
                              className="flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-6 h-6 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center ${
                                    selectedBrands.includes(brand.name)
                                      ? "bg-sky-500 shadow-sm"
                                      : "border-2 border-gray-300 hover:border-gray-400"
                                  }`}
                                  onClick={() => toggleBrand(brand.name)}
                                >
                                  {selectedBrands.includes(brand.name) && (
                                    <svg
                                      className="w-3.5 h-3.5 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <span
                                  className={`text-sm font-normal transition-colors ${
                                    selectedBrands.includes(brand.name)
                                      ? "text-gray-800 font-semibold"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {brand.name}
                                </span>
                              </div>
                              <span className="text-xs text-gray-400 font-medium">
                                ({brand.count})
                              </span>
                            </motion.label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.aside>

            {/* Products Section */}
            <div className="lg:col-span-3">
              {/* Controls */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 flex-wrap"
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-neutral-500 text-sm sm:text-base font-bold">
                    Show
                  </span>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowDropdown((prev) => ({
                          ...prev,
                          items: !prev.items,
                        }))
                      }
                      className="px-4 py-2 rounded-full border bg-white border-sky-400 text-sky-400 text-sm sm:text-base flex items-center gap-2 min-w-[160px] sm:min-w-[180px] justify-between hover:bg-gray-50 transition-colors cursor-pointer shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)]"
                    >
                      <span>{itemsPerPage} per page</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          showDropdown.items ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {showDropdown.items && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                        >
                          {[10, 25, 50, 100].map((num) => (
                            <button
                              key={num}
                              onClick={() => handleItemsPerPageChange(num)}
                              className="w-full px-4 py-2 text-left hover:bg-gray-50 text-blue-950 text-sm cursor-pointer"
                            >
                              {num} per page
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-neutral-500 text-sm sm:text-base font-bold">
                    Sort by
                  </span>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowDropdown((prev) => ({
                          ...prev,
                          sort: !prev.sort,
                        }))
                      }
                      className="px-4 py-2 rounded-full border bg-white border-sky-400 text-sky-400 text-sm sm:text-base flex items-center gap-2 min-w-[160px] sm:min-w-[180px] justify-between hover:bg-gray-50 transition-colors cursor-pointer shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)]"
                    >
                      <span className="truncate">{sortBy}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform flex-shrink-0 ${
                          showDropdown.sort ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {showDropdown.sort && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                        >
                          {[
                            "Newest item",
                            "Price: Low to High",
                            "Price: High to Low",
                            "Popular",
                          ].map((option) => (
                            <button
                              key={option}
                              onClick={() => handleSortChange(option)}
                              className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm cursor-pointer"
                            >
                              {option}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-slate-500 text-sm sm:text-base font-bold">
                    View as
                  </span>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode("grid")}
                      className={`w-10 h-10 rounded flex items-center justify-center cursor-pointer shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)] ${
                        viewMode === "grid"
                          ? "bg-white rounded-xl shadow"
                          : "border border-sky-300 rounded-xl shadow"
                      }`}
                    >
                      <Grid
                        className={`w-5 h-5 ${
                          viewMode === "grid" ? "text-sky-400" : "text-blue-950"
                        }`}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode("list")}
                      className={`w-10 h-10 rounded flex items-center justify-center cursor-pointer shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)] ${
                        viewMode === "list"
                          ? "bg-white rounded-xl shadow"
                          : "border border-sky-300 rounded-xl shadow"
                      }`}
                    >
                      <List
                        className={`w-5 h-5 ${
                          viewMode === "list" ? "text-sky-400" : "text-blue-950"
                        }`}
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Results Info */}
              <div className="mb-4 text-sm text-gray-600">
                Showing {startIndex + 1}-
                {Math.min(endIndex, processedProducts.length)} of{" "}
                {processedProducts.length} products
              </div>

              {/* Products Grid/List */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                <AnimatePresence>
                  {displayedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      whileHover="hover"
                      layout
                      className={`bg-sky-50 rounded-2xl shadow-lg overflow-hidden border border-gray-100 ${
                        viewMode === "list"
                          ? "flex flex-row h-48"
                          : "flex flex-col h-full"
                      }`}
                    >
                      {/* Product Image */}
                      <div
                        className={`relative ${
                          viewMode === "list"
                            ? "w-48 flex-shrink-0"
                            : "aspect-[4/3]"
                        }`}
                      >
                        <div
                          className={`overflow-hidden relative ${
                            viewMode === "list" ? "h-full" : "aspect-[4/3]"
                          }`}
                        >
                          <Image
                            fill
                            src={product.image}
                            alt={product.name}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center"
                        >
                          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                        </motion.button>
                      </div>

                      {/* Product Details */}
                      <div
                        className={`p-4 ${
                          viewMode === "list"
                            ? "flex-1 flex flex-col justify-between"
                            : "flex-1 flex flex-col"
                        }`}
                      >
                        <div
                          className={`${
                            viewMode === "list"
                              ? "space-y-2"
                              : "flex-1 space-y-3"
                          }`}
                        >
                          {/* Product Title */}
                          <h3
                            className={`text-gray-800 font-medium leading-tight ${
                              viewMode === "list"
                                ? "text-lg"
                                : "text-base min-h-[3rem] flex items-start"
                            }`}
                          >
                            {product.name}
                          </h3>

                          {/* Star Rating */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < product.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-gray-500 text-sm">
                              ({product.reviewCount})
                            </span>
                          </div>

                          {/* Specifications */}
                          {viewMode === "grid" && (
                            <div className="space-y-1 flex-1">
                              {product.specs.map((spec, specIndex) => (
                                <div
                                  key={specIndex}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <p className="text-gray-600 text-sm leading-relaxed">
                                    {spec}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* List view - show fewer specs */}
                          {viewMode === "list" && (
                            <div className="space-y-1">
                              {product.specs
                                .slice(0, 2)
                                .map((spec, specIndex) => (
                                  <div
                                    key={specIndex}
                                    className="flex items-start gap-2"
                                  >
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                      {spec}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>

                        {/* Divider and Actions */}
                        <div
                          className={`${
                            viewMode === "list"
                              ? "flex items-center gap-4"
                              : "border-t border-gray-200 pt-4 mt-auto"
                          }`}
                        >
                          {/* Price */}
                          <p
                            className={`text-sky-500 font-bold ${
                              viewMode === "list"
                                ? "text-2xl"
                                : "text-xl mb-4 text-center"
                            }`}
                          >
                            {product.priceText}
                          </p>

                          {/* Buy Now Button */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              router.push(`/products/${product.id}`);
                            }}
                            className={`bg-gradient-to-r from-cyan-400 to-sky-600 text-white font-semibold rounded-full hover:bg-sky-500 transition-colors shadow-md cursor-pointer ${
                              viewMode === "list"
                                ? "px-8 py-2.5 text-sm"
                                : "w-full py-3"
                            }`}
                          >
                            Buy Now
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center items-center gap-2 mt-8"
                >
                  {/* Previous Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-sky-300 text-sky-500 hover:bg-sky-50 cursor-pointer"
                    }`}
                  >
                    Previous
                  </motion.button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        // Show first page, last page, current page, and pages around current
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <motion.button
                              key={page}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setCurrentPage(page)}
                              className={`w-10 h-10 rounded-lg font-semibold transition-colors cursor-pointer ${
                                currentPage === page
                                  ? "bg-sky-400 text-white shadow-md"
                                  : "bg-white border border-sky-300 text-sky-500 hover:bg-sky-50"
                              }`}
                            >
                              {page}
                            </motion.button>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <span
                              key={page}
                              className="w-10 h-10 flex items-center justify-center text-gray-400"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      }
                    )}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-sky-300 text-sky-500 hover:bg-sky-50 cursor-pointer"
                    }`}
                  >
                    Next
                  </motion.button>
                </motion.div>
              )}

              {/* No Results */}
              {displayedProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500 text-lg">
                    No products found matching your criteria.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
