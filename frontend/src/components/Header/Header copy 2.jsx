import React, { useState } from "react";
import logo from "../../assets/companyLogo/Qode.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChartLine,
  faFileAlt,
  faEnvelope,
  faQuestionCircle,
  faEllipsisH,
  faContactBook,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Container from "../container/Container";
import { icon } from "@fortawesome/fontawesome-svg-core";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Strategies",
      slug: "/strategies",
      icon: faFileAlt,
      sublinks: [
        {
          name: "Quant Growth Fund",
          slug: "/strategies/quant-growth-fund",
        },
        {
          name: "Quant Growth Momentum",
          slug: "/strategies/quant-growth-momentum",
        },
      ],
    },
  ];
  const handleNavLinkClick = () => {
    setIsNavOpen(false);
  };
  const toggleExpanded = (item) => {
    if (item.sublinks && item.sublinks.length > 0) {
      setExpandedItems((prev) => ({
        ...prev,
        [item.name]: !prev[item.name],
      }));
    } else if (item.slug) {
      navigate(item.slug);
      setIsNavOpen(false);
    }
  };

  return (
    <div className="border-b border-black sophia-pro-font fixed w-full bg-white z-20 top-0 text-white">
      <div className="mx-auto">
        <div className="flex justify-between items-center h-16 px-4">
          <div className="w-1/4">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-white/10 transition duration-300"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isNavOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          <div className="w-1/2 flex justify-center">
            <Link className="cursor-pointer" to="/">
              <p className="text-black text-xl py-5 sophia-pro-font ">Qode</p>
            </Link>
          </div>

          <div className="w-1/4"></div>
        </div>
      </div>

      {/* Navigation menu with slide-in animation */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          isNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-gray-900 bg-opacity-50"
          onClick={() => setIsNavOpen(false)}
        ></div>
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#fff] text-black transform transition-transform duration-300 ease-in-out ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full overflow-y-auto">
            <div className="pt-6 pb-4">
              <button
                className="absolute top-4 right-4 text-black"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Link
                to="https://dashboard.qodeinvest.com/"
                className="flex justify-between items-center w-full mt-20 text-left text-lg font-medium hover:bg-white/10 transition duration-300 text-black hover:before:bg-red-600 relative h-[50px] overflow-hidden bg-white px-3 before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-600 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
                target="_blank"
                onClick={() => setIsNavOpen(false)}
              >
                <span className="relative z-10">My Dashboard</span>
              </Link>

              {/* Navigation items */}
              {navItems.map((item) => (
                <div key={item.name} className="py-2">
                  <button
                    onClick={() => toggleExpanded(item)}
                    className="flex justify-between items-center w-full text-left text-lg font-medium hover:bg-white/10 transition duration-300 text-black hover:before:bg-red-600 relative h-[50px] overflow-hidden bg-white px-3 before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-600 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
                  >
                    <span className="relative z-10">
                      <Link to={item.slug} onClick={handleNavLinkClick}>
                        {item.name}
                      </Link>
                    </span>
                  </button>
                </div>
              ))}
              {/* Dashboard link */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
