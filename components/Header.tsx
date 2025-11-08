"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdSearch, IoMdClose, IoMdMenu } from "react-icons/io";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setSearchTerm(trimmedValue);
      setIsSearchActive(true);
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
    // If on home page, scroll to top
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside or on link
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Show clear button (cross) when search is active and input matches search term
  const showClearButton = isSearchActive && inputValue.trim() === searchTerm && searchTerm !== "";

  return (
    <header
      className={`bg-[#d32f2f] text-white w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "sticky top-0 left-0 right-0 z-50 shadow-lg"
          : "relative"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center justify-center flex-shrink-0 w-[50px] h-[50px] overflow-hidden"
        >
          <Image src={logo} alt="logo" width={45} height={45} className="object-contain" />
        </Link>

        {/* Search - Between Logo and Menu - Always visible */}
        {!hideSearch && (
          <div className="flex flex-1 max-w-md items-center bg-white rounded-lg shadow-md px-3 py-2 relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Sök recept..."
              className="w-full outline-none text-gray-700 text-sm px-2 pr-10"
            />
            <div className="flex items-center">
              {showClearButton ? (
                <button
                  onClick={handleClear}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                  aria-label="Clear search"
                >
                  <IoMdClose className="text-xl" />
                </button>
              ) : (
                <button
                  onClick={handleSearch}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                  aria-label="Search"
                  disabled={!inputValue.trim()}
                >
                  <IoMdSearch className="text-xl" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Desktop Navigation Menu - Hidden on screens ≤ 980px */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold uppercase flex-shrink-0">
          <Link href="/" onClick={handleHomeClick} className="hover:underline whitespace-nowrap">
            Hem
          </Link>
          <Link href="/#recipes" className="hover:underline whitespace-nowrap">
            Julrecept
          </Link>
          {!hideSearch && (
            <Link href="/#recipes" className="hover:underline whitespace-nowrap">
              Sök
            </Link>
          )}
        </nav>

        {/* Burger Menu Button - Shown on screens ≤ 980px */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 text-white hover:text-gray-200 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <IoMdClose className="text-3xl" />
          ) : (
            <IoMdMenu className="text-3xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Side Menu */}
      <div
        className={`fixed top-0 right-0 z-50 bg-[#d32f2f] text-white transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } ${
          // Width: 100% on screens ≤ 450px, 300px on larger screens
          "w-full min-[451px]:w-[300px]"
        } ${
          // Height: 50% of screen
          "h-[50vh]"
        } shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <h2 className="text-lg font-semibold uppercase">Meny</h2>
            <button
              onClick={closeMenu}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close menu"
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex flex-col flex-1 overflow-y-auto">
            <Link
              href="/"
              onClick={handleHomeClick}
              className="px-6 py-4 text-base font-semibold uppercase border-b border-white/10 hover:bg-white/10 transition-colors"
            >
              Hem
            </Link>
            <Link
              href="/#recipes"
              onClick={closeMenu}
              className="px-6 py-4 text-base font-semibold uppercase border-b border-white/10 hover:bg-white/10 transition-colors"
            >
              Julrecept
            </Link>
            {!hideSearch && (
              <Link
                href="/#recipes"
                onClick={closeMenu}
                className="px-6 py-4 text-base font-semibold uppercase border-b border-white/10 hover:bg-white/10 transition-colors"
              >
                Sök
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}