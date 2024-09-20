import React, { useState, useRef, useEffect } from "react";
import Button from "../common/Button";
import CustomLink from "../common/CustomLink";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b fixed w-full px-18 sm:px-0 bg-white z-20 top-0 text-black shadow-sm">
      <div className="mx-auto max-w-[1386px]">
        <div className="flex justify-between items-center h-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-beige playfair-display-font text-[35px] sm:text-3xl font-bold"
            >
              Qode
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5">
            <CustomLink
              to="/blogs"
              className="text-body hover:text-primary transition duration-300"
            >
              Blogs
            </CustomLink>
            <CustomLink
              to="/strategies"
              className="text-body hover:text-primary transition duration-300"
            >
              Strategies
            </CustomLink>
            <Button
              href="https://dashboard.qodeinvest.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-lightBeige hover:bg-opacity-90 transition duration-300"
            >
              Dashboard
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden relative" ref={dropdownRef}>
            <button
              onClick={toggleMobileMenu}
              className="text-brown focus:outline-none"
            >
              <svg
                className="h-2 w-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Full-screen backdrop */}
            {isMobileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-20"
                  onClick={toggleMobileMenu}
                ></div>

                {/* Mobile Navigation Dropdown */}
                <div className="absolute right-0 border border-brown w-44 shadow-xl bg-white z-20">
                  <CustomLink
                    to="/blogs"
                    className="block px-4 py-2 text-body hover:text-black text-black border-b border-brown hover:bg-beige"
                  >
                    Blogs
                  </CustomLink>
                  <CustomLink
                    to="/strategies"
                    className="block px-4 py-2 text-body hover:text-black text-black border-b border-brown hover:bg-beige"
                    onClick={toggleMobileMenu}
                  >
                    Strategies
                  </CustomLink>
                  <a
                    href="https://dashboard.qodeinvest.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-body hover:bg-black hover:text-lightBeige transition"
                    onClick={toggleMobileMenu}
                  >
                    Dashboard
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
