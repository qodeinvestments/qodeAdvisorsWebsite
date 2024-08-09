import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/companyLogo/Qode.png";
import { Link } from "react-router-dom";
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

const navItems = [
  {
    name: "Home",
    slug: "/",
    active: true,
    icon: faHome,
  },
  // {
  //   name: "About Us",
  //   active: true,
  //   slug: "#",
  //   icon: faUsers,
  //   sublinks: [],
  // },
  {
    name: "Quant Investing",
    active: true,
    slug: "#",
    icon: faChartLine,
    sublinks: [
      {
        name: "Quant Investing 101",
        slug: "/quant-investing-101",
        active: true,
      },
      {
        name: "The Quant Growth",
        slug: "/quant-growth",
        active: true,
      },
    ],
  },
  {
    name: "Strategies",
    active: true,
    slug: "#",
    icon: faFileAlt,
    sublinks: [
      {
        name: "Quant Growth Fund",
        slug: "/strategies/quant-growth-fund",
        active: true,
      },
      {
        name: "Quant Growth Momentum",
        slug: "/strategies/quant-growth-momentum",
        active: true,
      },
    ],
  },
  {
    name: "Blogs",
    active: true,
    icon: faFileAlt,
    sublinks: [
      {
        name: "Weekly Newsletter",
        slug: "/weekly-newsletter",
        active: true,
      },
      {
        name: "Articles and infographics",
        slug: "/articles-infographics",
        active: true,
      },
    ],
  },
  // {
  //   name: "Contact Us",
  //   active: true,
  //   icon: faEnvelope,
  //   sublinks: [],
  // },

  {
    name: "More",
    active: true,
    icon: faEllipsisH,
    sublinks: [
      {
        name: "FAQ's",
        slug: "/faq",
        active: true,
        icon: faQuestionCircle,
      },
      {
        name: "Meet the team",
        slug: "/about-us/our-team",
        active: true,
      },
      {
        name: "Our beliefs and values",
        slug: "/about-us/beliefs-and-values",
        active: true,
      },
      {
        name: "Schedule a meeting",
        slug: "/quant-investing-101",
        active: true,
      },
      {
        name: "Chat",
        slug: "/chat",
        active: true,
      },
    ],
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navbarRef = useRef(null);
  const navbarAreaRef = useRef(null);

  const toggleNavbar = (item, isSublink = false, isEntering = false) => {
    if (isSublink) {
      setIsOpen(true);
      setActiveNavItem(item);
    } else if (isEntering) {
      setIsOpen(true);
      setActiveNavItem(item);
    } else if (activeNavItem && activeNavItem.sublinks) {
      // If a navlink with sublinks is already active, keep the navbar open
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
      setActiveNavItem(isOpen ? null : item);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (item) => {
    if (activeNavItem === item) {
      setActiveNavItem(null);
    } else {
      setActiveNavItem(item);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarAreaRef.current &&
        !navbarAreaRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setActiveNavItem(null);
      }
    };

    const handleMouseLeave = () => {
      setIsOpen(false);
      setActiveNavItem(null);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    navbarAreaRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      navbarAreaRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={navbarAreaRef}
      className="shadow-lg sophia-pro-font fixed  w-full z-20 bg-primary top-0"
    >
      <nav ref={navbarRef}>
        <div className="max-w-[90rem] text-center  mx-auto ">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-44">
              <Link to={"/"}>
                <img className="pt-5" src={logo} alt="Logo" />
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => toggleNavbar(item, false, true)}
                      onMouseLeave={() => toggleNavbar(null)}
                    >
                      <Link className="text-white hover:bg-gray-700 hover:text-white px-4 py-3 rounded-lg text-sm  flex items-center ">
                        <FontAwesomeIcon icon={item.icon} className="mr-2" />
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mr-4 flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                onClick={toggleSidebar}
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen && activeNavItem && activeNavItem.sublinks ? "h-auto" : "h-0"
        }`}
        style={{
          maxHeight:
            isOpen && activeNavItem && activeNavItem.sublinks
              ? `${activeNavItem.sublinks.length * 400}px`
              : "0px",
        }}
      >
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 flex-wrap">
            {" "}
            {/* Add flex-wrap for wrapping cards */}
            {activeNavItem &&
              activeNavItem.sublinks &&
              activeNavItem.sublinks.map((sublink) => (
                <Link
                  key={sublink.name}
                  to={sublink.slug}
                  className="glass-card text-lg  text-white"
                  activeClassName="bg-gray-700 text-white"
                  onClick={() => toggleNavbar(sublink, true)}
                >
                  {sublink.name}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden ${isSidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 flex z-40 pr-10">
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
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
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <img className="h-auto w-48" src={logo} alt="Logo" />
              </div>
              <nav className="px-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      className="group flex items-center px-2 py-2 text-base leading-6  rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
                      onClick={() => handleItemClick(item)}
                    >
                      {item.name}
                      {item.sublinks && (
                        <svg
                          className={`${
                            activeNavItem === item
                              ? "text-gray-600 rotate-90"
                              : "text-gray-400 group-hover:text-gray-500"
                          } ml-2 h-5 w-5 transform transition-all`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </Link>
                    {activeNavItem === item && item.sublinks && (
                      <div className="mt-1 ml-4 space-y-1">
                        {item.sublinks.map((sublink) => (
                          <Link
                            key={sublink.name}
                            to={sublink.slug}
                            className="group flex items-center px-3 py-2 text-base leading-6  rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex-shrink-0 w-14"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
