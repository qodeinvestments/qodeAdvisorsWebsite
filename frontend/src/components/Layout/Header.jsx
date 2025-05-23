import React, { useState, useRef, useEffect } from "react";
import CustomLink from "../common/CustomLink";
import { Link, useLocation } from "react-router-dom";
import SendEmailForm from "../SendEmailForm";
import Button from "../common/Button";
import Modal from "../Modal";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSuccess = () => {
    // Show success message
    setShowSuccessMessage(true);

    // Close the success message and modal after delay
    setTimeout(() => {
      setShowSuccessMessage(false);
      setIsModalOpen(false);
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
    return () => document.addEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Manage body overflow for mobile menu (modal handles its own overflow)
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isMobileMenuOpen]);

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
                  onClick={toggleModal}
                  className={`text-body dm-sans-font transition duration-300 ${isHomePage && !isScrolled ? "text-beige" : "text-beige"
                    } rounded `}
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
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          toggleModal();
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
            <h3 className="text-black text-2xl font-bold mb-4">Success!</h3>
            <p className="text-black text-lg mb-1">
              Your message has been sent. We'll get back to you soon!
            </p>
          </div>
        </div>
      )}

      {/* Modal for SendEmailForm */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="relative">
            <SendEmailForm onClose={closeModal} onFormSuccess={handleFormSuccess} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;