"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isOpen,
  onClose,
  onSearch,
  placeholder = "Search products, categories...",
  suggestions = [],
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key and outside click
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim() && suggestions.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, suggestions]);

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
      setQuery("");
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2147483648]"
        onClick={onClose}
      />

      {/* Search Container */}
      <div
        ref={searchContainerRef}
        className={`fixed top-0 left-0 right-0 bg-white shadow-2xl z-[2147483649] transform transition-all duration-300 ease-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } ${className}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Search Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Search
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-sky-200 transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="absolute left-3 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full pl-10 sm:pl-12 pr-12 sm:pr-16 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-200 rounded-full focus:border-cyan-500 focus:outline-none transition-colors"
              />
              {query && (
                <button
                  onClick={() => handleSearch()}
                  className="absolute right-1 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-300 to-sky-500 text-white rounded-full flex items-center justify-center hover:from-cyan-400 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                  aria-label="Search"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3 cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Search Categories */}
          <div className="mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
              Popular searches:
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                "T-Shirts",
                "Hoodies",
                "Polo Shirts",
                "Uniforms",
                "Embroidery",
                "Custom Apparel",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => handleSuggestionClick(category)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
