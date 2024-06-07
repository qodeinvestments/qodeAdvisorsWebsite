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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      icon: faHome,
      sublinks: [],
    },
    {
      name: "Quant Investing",
      slug: "#",
      icon: faChartLine,
      sublinks: [
        {
          name: "Quant Investing 101",
          slug: "/quant-investing-101",
        },
        {
          name: "The Quant Growth",
          slug: "/quant-growth",
        },
      ],
    },
    {
      name: "Strategies",
      slug: "#",
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
    {
      name: "Blogs",
      slug: "#",
      icon: faFileAlt,
      sublinks: [
        {
          name: "Weekly Newsletter",
          slug: "/weekly-newsletter",
        },
        {
          name: "Articles and infographics",
          slug: "/articles-infographics",
        },
      ],
    },
    {
      name: "More",
      slug: "#",
      icon: faEllipsisH,
      sublinks: [
        {
          name: "FAQ's",
          slug: "/faq",
          icon: faQuestionCircle,
        },
        {
          name: "Meet the team",
          slug: "/about-us/our-team",
        },
        {
          name: "Our beliefs and values",
          slug: "/about-us/beliefs-and-values",
        },
        {
          name: "Schedule a meeting",
          slug: "/quant-investing-101",
        },
        {
          name: "Chat",
          slug: "/chat",
        },
      ],
    },
  ];

  return (
    <div className="shadow-lg graphik-font-regular fixed  w-full z-20 bg-[#151E28] top-0 text-white">
      <div className="flex max-w-[100rem] justify-around mx-auto items-center h-16 px-56 shadow-md">
        <div className="flex-grow">
          <img className="w-32" src={logo} alt="Company Logo" />
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link className="text-white hover:bg-gray-700 hover:text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center ">
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                {item.name}
              </Link>
              {item.sublinks && item.sublinks.length > 0 && (
                <ul className="absolute top-full w-72 left-0 right-0 mx-auto hidden group-hover:block bg-[#1a2635] text-white shadow-lg rounded-md">
                  {item.sublinks.map((sublink) => (
                    <li
                      key={sublink.name}
                      className="px-3 py-2  hover:bg-gray-900"
                    >
                      <Link to={sublink.slug}>{sublink.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-700"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="sr-only">Open menu</span>
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
            className={`fixed inset-y-0 right-0 z-20 w-64 bg-[#151E28] text-white transition-transform duration-300 transform ${
              isNavOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-2">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-700"
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
                <div key={item.name}>
                  <Link
                    to={item.slug}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                  {item.sublinks.length > 0 && (
                    <ul className="pl-4">
                      {item.sublinks.map((sublink) => (
                        <li key={sublink.name}>
                          <Link
                            to={sublink.slug}
                            className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                          >
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
