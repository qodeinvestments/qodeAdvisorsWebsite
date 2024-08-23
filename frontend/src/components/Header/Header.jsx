import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b sm:px-72   fixed w-full bg-white z-20 top-0 text-black sophia-pro-font">
      <div className="mx-auto px-4">
        <div className="flex sm:px-10 justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-red-600 playfair-display-font sm:text-3xl  font-bold"
            >
              Qode
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/blogs"
              className="text-md hover:text-gray-600 transition duration-300"
            >
              Blogs
            </Link>
            <Link
              to="/strategies"
              className="text-md hover:text-gray-600 transition duration-300"
            >
              Strategies
            </Link>

            <a
              href="https://dashboard.qodeinvest.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md bg-red-600 text-white px-5 py-3 hover:bg-red-500 transition duration-300"
            >
              Dashboard
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-black hover:text-gray-600 focus:outline-none focus:text-gray-600 "
            >
              <svg
                className="h-6 w-6"
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
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/blogs"
                className="block text-md hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md"
                onClick={toggleMobileMenu}
              >
                Blogs
              </Link>
              <Link
                to="/strategies"
                className="block text-md hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md"
                onClick={toggleMobileMenu}
              >
                Strategies
              </Link>

              <a
                href="https://dashboard.qodeinvest.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-md hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md"
                onClick={toggleMobileMenu}
              >
                Dashboard
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
