import React, { useState, useRef, useEffect } from "react";
import CustomLink from "../common/CustomLink";
import { Link, useLocation } from "react-router-dom";
import SendEmailForm from "../SendEmailForm";
import Button from "../common/Button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  const closeSlider = () => {
    setIsSliderOpen(false);
  };

  const handleFormSuccess = () => {
    // Show success message
    setShowSuccessMessage(true);

    // Close the success message and slider after delay
    setTimeout(() => {
      setShowSuccessMessage(false);
      setIsSliderOpen(false);
    }, 3000);
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

  useEffect(() => {
    // Manage body overflow for both mobile menu and slider
    if (isMobileMenuOpen || isSliderOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isMobileMenuOpen, isSliderOpen]);

  const isHomePage = location.pathname === "/";

  return (
    <>
      <header
        className={`fixed z-20 transition-all duration-300 w-full 
            md:w-[700px] md:left-1/2 md:-translate-x-1/2 
            lg:w-[1066px] 
            xl:w-[1386px] 
            max-w-full ${isHomePage
            ? isScrolled
              ? "bg-white top-0 bg-opacity-100 shadow-md"
              : "bg-black opacity-100 sm:opacity-70 sm:top-2 backdrop-blur-md"
            : "bg-white top-0 bg-opacity-100 shadow-md"
          }`}
      >
        <div className="mx-auto">
          <div className="shadow-md py-18 sm:py-18 sm:px-4 px-18">
            <div className="flex items-center justify-between z-50 w-full">
              {/* Left Navigation (hidden on md and below) */}
              <nav className="hidden lg:flex items-center space-x-6 flex-1">
                {/* Contact Us Button */}


                <CustomLink
                  to="/blogs"
                  className={`text-body transition duration-300 ${isHomePage && !isScrolled ? "text-beige" : "text-beige"
                    }`}
                >
                  Blogs
                </CustomLink>
                <CustomLink
                  to="/strategies"
                  className={`text-body transition duration-300 ${isHomePage && !isScrolled ? "text-beige" : "text-beige"
                    }`}
                >
                  Strategies
                </CustomLink>
                <button
                  onClick={toggleSlider}
                  className={`text-body dm-sans-font transition duration-300 ${isHomePage && !isScrolled ? "text-beige " : "text-beige "
                    }   rounded  hover:text-black`}
                >
                  Get In Touch
                </button>
              </nav>

              {/* Logo (Centered) */}
              <div className="flex-shrink-0">
                <Link
                  to="/"
                  className={`playfair-display-font text-[24px] sm:text-[32px] font-bold ${isHomePage && !isScrolled ? "text-beige" : "text-beige"
                    }`}
                  onClick={closeMobileMenu}
                >
                  Qode
                </Link>
              </div>

              {/* Right Navigation (hidden on md and below) */}
              <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-end">
                <CustomLink
                  to="/about-us"
                  className={`text-body transition duration-300 ${isHomePage && !isScrolled ? "text-beige" : "text-beige"
                    }`}
                >
                  About Us
                </CustomLink>
                <CustomLink
                  to={"/featured-in"}
                  rel="noopener noreferrer"
                  className={`text-body font-body transition duration-300 ${isHomePage && !isScrolled ? "text-beige" : "text-beige"
                    }`}
                >
                  Media
                </CustomLink>
                <CustomLink
                  to="https://eclientreporting.nuvamaassetservices.com/wealthspectrum/app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-body font-body transition duration-300 ${isHomePage && !isScrolled ? "text-beige" : "text-beige"
                    }`}
                >
                  Client Login
                </CustomLink>
              </nav>

              {/* Hamburger menu button (visible on lg and below) */}
              <div className="lg:hidden relative bottom-1/2 z-50">
                <button
                  onClick={toggleMobileMenu}
                  className={`focus:outline-none ${isHomePage && !isScrolled ? "text-beige" : "text-black"
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
                      className="fixed inset-0 h-[100vh] bg-black bg-opacity-60 z-40"
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
                    <div className="absolute right-0 w-48 shadow-md bg-black z-50 overflow-hidden">
                      {/* Add Contact Us to mobile menu */}
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          toggleSlider();
                        }}
                        className="block px-4 py-2 text-body text-beige hover:bg-beige hover:text-black hover:bg-opacity-50"
                      >
                        Get In Touch
                      </button>
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
                        About Us
                      </CustomLink>
                      <CustomLink
                        to="/featured-in"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 dm-sans-font text-body hover:bg-beige hover:text-black text-beige transition"
                        onClick={closeMobileMenu}
                      >
                        Media
                      </CustomLink>
                      <CustomLink
                        to="https://eclientreporting.nuvamaassetservices.com/wealthspectrum/app/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 dm-sans-font text-body hover:bg-beige hover:text-black text-beige transition"
                        onClick={closeMobileMenu}
                      >
                        Client Login
                      </CustomLink>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Success Message Modal (Above everything) */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
          <div className="bg-lightBeige p-2 rounded-lg text-center max-w-sm sm:max-w-md">
            <h3 className="text-black text-2xl font-bold mb-4">
              Success!
            </h3>
            <p className="text-black text-lg mb-1">
              Your message has been sent. We'll get back to you soon!
            </p>
          </div>
        </div>
      )}

      {/* Scrollable Slider (same as in Banner) */}
      {isSliderOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 transform transition-transform duration-500 ease-in-out translate-y-0 overflow-y-auto"
          onClick={closeSlider}
        >
          <div
            className="relative max-w-7xl mx-auto py-2"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the form from closing the slider
          >
            <button
              onClick={closeSlider}
              className="absolute top-2 right-2 sm:top-4 md:right-4 p-2 text-beige text-xl cursor-pointer hover:text-white focus:outline-none z-[100]"
            >
              ✕
            </button>
            <SendEmailForm
              onClose={closeSlider}
              onFormSuccess={handleFormSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;