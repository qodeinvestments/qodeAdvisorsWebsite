import React, { useState, useRef, useEffect } from "react";
import CustomLink from "../common/CustomLink";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 750);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`fixed z-20 transition-all duration-300 w-full sm:w-[1386px] sm:left-1/2 sm:-translate-x-1/2 ${
        isHomePage
          ? isScrolled
            ? "bg-white top-0 bg-opacity-100 shadow-lg"
            : "bg-black opacity-70 sm:top-2 backdrop-blur-md"
          : "bg-white top-0 bg-opacity-100 shadow-lg"
      }`}
    >
      <div className="mx-auto">
        <div className="shadow-lg py-1 sm:py-18 sm:px-4 px-18">
          <div className="flex items-center justify-between z-50 w-full">
            {/* Left Navigation */}
            <nav className="hidden md:flex items-center space-x-6 flex-1">
              <CustomLink
                to="/blogs"
                className={`text-body transition duration-300 ${
                  isHomePage && !isScrolled ? "text-beige" : "text-beige"
                }`}
              >
                Blogs
              </CustomLink>
              <CustomLink
                to="/strategies"
                className={`text-body transition duration-300 ${
                  isHomePage && !isScrolled ? "text-beige" : "text-beige"
                }`}
              >
                Strategies
              </CustomLink>
            </nav>

            {/* Logo (Centered) */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className={`playfair-display-font text-[24px] sm:text-[32px] font-bold ${
                  isHomePage && !isScrolled ? "text-beige" : "text-beige"
                }`}
                onClick={closeMobileMenu}
              >
                Qode
              </Link>
            </div>

            {/* Right Navigation */}
            <nav className="hidden md:flex items-center space-x-6 flex-1 justify-end">
              <CustomLink
                to="/about-us"
                className={`text-body transition duration-300 ${
                  isHomePage && !isScrolled ? "text-beige" : "text-beige"
                }`}
              >
                About Us
              </CustomLink>
              <CustomLink
                to={"https://dashboard.qodeinvest.com/"}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-body font-body transition duration-300 ${
                  isHomePage && !isScrolled ? "text-beige" : "text-beige"
                }`}
              >
                Dashboard
              </CustomLink>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden relative z-50">
              <button
                onClick={toggleMobileMenu}
                className={`focus:outline-none ${
                  isHomePage && !isScrolled ? "text-beige" : "text-black"
                }`}
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

              {/* Mobile Navigation Dropdown */}
              {isMobileMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 h-[100vh] bg-black bg-opacity-70 z-40"
                    onClick={closeMobileMenu}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  ></div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 w-48 shadow-lg bg-black z-50 overflow-hidden">
                    <CustomLink
                      to="/blogs"
                      className="block px-4 py-2 text-body text-beige hover:bg-beige hover:text-black hover:bg-opacity-50"
                      onClick={closeMobileMenu}
                    >
                      Blogs
                    </CustomLink>
                    <CustomLink
                      to="/strategies"
                      className="block px-4 py-2 text-body text-beige hover:bg-beige hover:text-black hover:bg-opacity-50"
                      onClick={closeMobileMenu}
                    >
                      Strategies
                    </CustomLink>
                    <CustomLink
                      to="/about-us"
                      className="block px-4 py-2 text-body text-beige hover:bg-beige hover:text-black hover:bg-opacity-50"
                      onClick={closeMobileMenu}
                    >
                      About us
                    </CustomLink>
                    <CustomLink
                      to="https://dashboard.qodeinvest.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 dm-sans-font text-body hover:bg-beige hover:text-black text-beige transition"
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </CustomLink>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
