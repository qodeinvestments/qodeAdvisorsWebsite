import React, { useState } from "react";
import Button from "../common/Button";
import CustomLink from "../common/CustomLink";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b fixed w-full bg-white z-20 top-0 py-5  text-black shadow-sm">
      <div className="mx-auto px-4 sm:px-72">
        <div className="flex justify-between items-center h-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-brown playfair-display-font sm:text-3xl  font-bold"
            >
              Qode
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
              className="bg-beige text-white hover:bg-opacity-90 transition duration-300"
            >
              Dashboard
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-black hover:text-primary focus:outline-none"
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
            <div className="px-2 pt-2 pb-3 space-y-1">
              <CustomLink
                to="/blogs"
                className="block text-body hover:bg-lightBeige hover:text-primary px-3 py-1 rounded-md"
                onClick={toggleMobileMenu}
              >
                Blogs
              </CustomLink>
              <CustomLink
                to="/strategies"
                className="block text-body hover:bg-lightBeige hover:text-primary px-3 py-1 rounded-md"
                onClick={toggleMobileMenu}
              >
                Strategies
              </CustomLink>

              <CustomLink
                href="https://dashboard.qodeinvest.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-body hover:bg-lightBeige hover:text-primary px-3 py-1 "
                onClick={toggleMobileMenu}
              >
                Dashboard
              </CustomLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
