import React, { useState } from "react";
import logo from "../../assets/companyLogo/Qode.png";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About Us",
      slug: "/about-us",
      active: true,
    },
    {
      name: "Quant Investing",
      slug: "/quant-investing",
      active: true,
    },
    {
      name: "Contact Us",
      slug: "/contact-us",
      active: true,
    },
    {
      name: "Strategies",
      slug: "/strategies",
      active: true,
    },
    {
      name: "Blogs",
      slug: "/blogs",
      active: true,
    },
    {
      name: "FAQs",
      slug: "/strategies",
      active: true,
    },
    {
      name: "FAQs",
      slug: "/Calculator",
      active: true,
    },
    {
      name: "Dashboard",
      slug: "/Calculator",
      active: true,
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center h-16 px-4 shadow-md">
        <div className="mt-5">
          <img className="w-1/2 sm:w-34" src={logo} alt="Company Logo" />
        </div>
        <div className="hidden md:flex space-x-2 items-center">
          {navItems.map((item) => (
            <div key={item.name} className="group relative">
              <a
                href={item.slug}
                className="px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900"
              >
                {item.name}
              </a>
              <div className="absolute top-full left-0 right-0 mx-auto hidden group-hover:block bg-white shadow-lg">
                <div className="w-screen -mx-8 backdrop-filter backdrop-blur-lg p-8">
                  <p className="text-gray-700 text-base">
                    This is a placeholder for {item.name} dropdown content.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>
      {isNavOpen && (
        <div className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50">
          <div
            className={`fixed inset-y-0 right-0 z-20 w-64 bg-white transition-transform duration-300 transform ${
              isNavOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-2">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setIsNavOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.slug}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Header;
