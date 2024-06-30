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
import { Link, useNavigate } from "react-router-dom";
import Container from "../container/Container";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navItems = [
    // {
    //   name: "Home",
    //   slug: "/",
    //   icon: faHome,
    //   sublinks: [],
    // },
    // {
    //   name: "Quant Investing",
    //   icon: faChartLine,
    //   sublinks: [
    //     {
    //       name: "Quant Investing 101",
    //       slug: "/docs/quant-investing-101/introduction/what-is-quant-investing",
    //     },
    //     {
    //       name: "The Quant Growth",
    //       slug: "/docs/the-quant-growth",
    //     },
    //   ],
    // },
    {
      name: "Strategies",
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
      slug: "/blogs",
      icon: faFileAlt,
      sublinks: [
        {
          name: "Our Blogs",
          slug: "/blogs",
        },
        {
          name: "Weekly Newsletter",
          slug: "/weekly-newsletter",
        },
        // {
        //   name: "Articles and infographics",
        //   slug: "/articles-infographics",
        // },
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
        // {
        //   name: "Schedule a meeting",
        //   slug: "/quant-investing-101",
        // },
      ],
    },
    {
      name: "Contact Us",
      slug: "/contact-us",
    },
  ];
  const handleNavLinkClick = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="shadow-lg graphik-font-regular fixed w-full bg-white z-20  top-0 text-white">
      <Container>
        <div className="flex justify-between gap-20 mx-auto items-center h-12  ">
          <Link className="cursor-pointer" to={"/"}>
            <p className="text-black text-2xl playfair-display-font font-semibold">
              Qode.
            </p>
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.slug ? item.slug : "#"}
                  className="text-[#000] hover:bg-white/10 px-4 py-2 rounded-lg text-sm  font-medium flex items-center transition duration-300"
                >
                  {item.name}
                </Link>

                {item.sublinks && item.sublinks.length > 0 && (
                  <ul className="absolute top-full w-72 left-0 text-sm right-0 mx-auto hidden group-hover:block bg-white text-[#000]  rounded-md overflow-hidden">
                    {item.sublinks.map((sublink) => (
                      <li
                        key={sublink.name}
                        className="px-4 py-3 hover:bg-[#efefef] hover:text-primary transition duration-300"
                      >
                        <Link to={sublink.slug}>{sublink.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <Link
              to="https://qode-dashboard.vercel.app/"
              className="text-[#fff] bg-black px-4 py-2 rounded-lg text-sm font-medium flex items-center transition duration-300"
              target="_blank"
            >
              Dashboard
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-white/10 transition duration-300" // Change text-white to text-black
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-8 w-8 text-black" // Add text-black class
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
                    isNavOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
      {isNavOpen && (
        <div className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50">
          <div
            className={`fixed inset-y-0 right-0 z-20 w-80 bg-[#efefef] text-black transition-transform duration-300 transform ${
              isNavOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-white/10 transition duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-8 w-8"
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
            <div className="px-4 pt-2 pb-3 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.slug || "#"}
                    onClick={handleNavLinkClick}
                    className="block w-full text-left px-4 py-3 rounded-md text-lg font-medium hover:bg-white/10 transition duration-300"
                  >
                    <FontAwesomeIcon icon={item.icon} className="mr-3" />
                    {item.name}
                  </Link>
                  {Array.isArray(item.sublinks) && item.sublinks.length > 0 && (
                    <ul className="pl-8 mt-1 space-y-1">
                      {item.sublinks.map((sublink) => (
                        <li key={sublink.name}>
                          <Link
                            to={sublink.slug}
                            onClick={handleNavLinkClick}
                            className="block w-full text-left px-4 py-2 rounded-md text-base font-medium hover:bg-white/10 transition duration-300"
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
