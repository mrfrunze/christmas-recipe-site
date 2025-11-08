"use client";

import { useState } from "react";
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

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setSearchTerm(trimmedValue);
      setIsSearchActive(true);
      // Scroll to recipes section if on home page
      if (window.location.pathname === "/") {
        setTimeout(() => {
          const recipesSection = document.getElementById("recipes");
          if (recipesSection) {
            recipesSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
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
  };

  // Show clear button (cross) when search is active and input matches search term
  const showClearButton = isSearchActive && inputValue.trim() === searchTerm && searchTerm !== "";

  return (
    <header className="bg-[#d32f2f] text-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4">
        <Link 
          href="/" 
          onClick={handleLogoClick}
          className="flex items-center justify-center w-[50px] h-[50px] overflow-hidden"
        >
          <Image src={logo} alt="logo" width={45} height={45} className="object-contain"/>
        </Link>
        <nav className="mt-3 sm:mt-0 flex space-x-6 text-sm font-semibold uppercase">
          <Link href="/" onClick={handleHomeClick} className="hover:underline">Hem</Link>
          <Link href="/#recipes" className="hover:underline">Julrecept</Link>
          {!hideSearch && (
            <Link href="/#recipes" className="hover:underline">Sök</Link>
          )}
        </nav>
      </div>
      {!hideSearch && (
        <div className="flex flex-col items-center text-center py-2 px-2">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Julens söta favoriter
          </h1>

          <div className="w-full max-w-md flex items-center bg-white rounded-lg shadow-md px-3 py-2 relative">
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
                  <IoMdClose className="text-2xl" />
                </button>
              ) : (
                <button 
                  onClick={handleSearch}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                  aria-label="Search"
                  disabled={!inputValue.trim()}
                >
                  <IoMdSearch className="text-2xl" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}