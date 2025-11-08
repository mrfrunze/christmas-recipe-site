"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import logo from "@/public/logo-cooker.png";
import { useSearch } from "@/contexts/SearchContext";

interface HeaderProps {
  hideSearch?: boolean;
}

export default function Header({ hideSearch = false }: HeaderProps) {
  const { searchTerm, setSearchTerm } = useSearch();
  const [inputValue, setInputValue] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setSearchTerm(trimmedValue);
      setIsSearchActive(true);
      // No scrolling - search results appear without scrolling
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // If user starts typing after search was active, reset search state
    if (isSearchActive && value !== searchTerm) {
      setIsSearchActive(false);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
    setIsSearchActive(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogoClick = () => {
    setSearchTerm("");
    setInputValue("");
    setIsSearchActive(false);
  };

  const handleHomeClick = () => {
    setSearchTerm("");
    setInputValue("");
    setIsSearchActive(false);
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show clear button (cross) when search is active and input matches search term
  const showClearButton = isSearchActive && inputValue.trim() === searchTerm && searchTerm !== "";

  return (
    <header 
      className={`bg-[#d32f2f] text-white transition-all duration-300 ${
        isScrolled ? 'sticky top-0 z-50 shadow-lg' : 'relative'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={handleLogoClick}
          className="flex items-center justify-center w-[40px] h-[40px] overflow-hidden flex-shrink-0"
        >
          <Image src={logo} alt="logo" width={35} height={35} className="object-contain"/>
        </Link>
        
        {/* Search - in header navigation */}
        {!hideSearch && (
          <div className="flex-1 flex justify-center max-w-md">
            <div className="w-full flex items-center bg-white rounded-lg shadow-md px-3 py-1.5">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Sök recept..."
                className="w-full outline-none text-gray-700 text-sm px-2 pr-8"
              />
              <div className="flex items-center">
                {showClearButton ? (
                  <button
                    onClick={handleClear}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                    aria-label="Clear search"
                  >
                    <IoMdClose className="text-lg" />
                  </button>
                ) : (
                  <button 
                    onClick={handleSearch}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                    aria-label="Search"
                    disabled={!inputValue.trim()}
                  >
                    <IoMdSearch className="text-lg" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <nav className="flex space-x-4 text-xs sm:text-sm font-semibold uppercase flex-shrink-0">
          <Link href="/" onClick={handleHomeClick} className="hover:underline whitespace-nowrap">Hem</Link>
          <Link href="/#recipes" className="hover:underline whitespace-nowrap">Julrecept</Link>
        </nav>
      </div>
    </header>
  );
}