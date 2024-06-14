import React from "react";
import { NavLink, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { Container } from "../components";
import "./Pages.css";
const QuantInvesting101 = () => {
  return (
    <>
      <div className="flex flex-grow min-h-screen graphik-font-regular mt-16">
        <div className="bg-[#F8FAFC] p-4  w-70 static  overflow-y-auto">
          <nav>
            <ul className="space-y-3 ">
              <li>
                <div className="nav-link-container">
                  <p className="text-sm font-black">Introduction</p>
                  <ul className=" mt-4 space-y-3">
                    <li className="nav-link-ladder">
                      <NavLink
                        to="introduction/what-is-quant-investing"
                        className={({ isActive }) =>
                          isActive
                            ? "  text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1 text-sm"
                        }
                      >
                        What is Quant Investing
                        {({ isActive }) => (
                          <>
                            {isActive && <span className="dot mr-2"></span>}
                            Benefits and Risks
                          </>
                        )}
                      </NavLink>
                    </li>
                    <li className="nav-link-ladder">
                      <NavLink
                        to="introduction/how-it-works"
                        className={({ isActive }) =>
                          isActive
                            ? " text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1 text-sm"
                        }
                      >
                        How it Works
                      </NavLink>
                    </li>
                    <li className="nav-link-ladder">
                      <NavLink
                        to="introduction/benefits-and-risks"
                        className={({ isActive }) =>
                          isActive
                            ? " text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1 text-sm"
                        }
                      >
                        Benefits and Risks
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="nav-link-container">
                  <p className="text-sm font-black">Quantitative Strategies </p>
                  <ul className=" mt-4 space-y-3">
                    <li className="nav-link-ladder">
                      <NavLink
                        to="quantitative-strategies/trend-following"
                        className={({ isActive }) =>
                          isActive
                            ? "  text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1 text-sm"
                        }
                      >
                        Trend Following
                      </NavLink>
                    </li>
                    <li className="nav-link-ladder">
                      <NavLink
                        to="quantitative-strategies/mean-reversion"
                        className={({ isActive }) =>
                          isActive
                            ? "  text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1 text-sm"
                        }
                      >
                        Mean Reversion
                      </NavLink>
                    </li>
                    <li className="nav-link-ladder">
                      <NavLink
                        to="quantitative-strategies/statistical-arbitrage"
                        className={({ isActive }) =>
                          isActive
                            ? "  text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1 text-sm"
                        }
                      >
                        Statistical Arbitrage
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="nav-link-container">
                  <p className="text-sm font-black">Data and Tools</p>
                  <ul className=" mt-4 space-y-3">
                    <li className="nav-link-ladder">
                      <NavLink
                        to="data-and-tools/data-sources"
                        className={({ isActive }) =>
                          isActive
                            ? "  text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1 text-sm"
                        }
                      >
                        Data Sources
                      </NavLink>
                    </li>
                    <li className="nav-link-ladder">
                      <NavLink
                        to="data-and-tools/backtesting"
                        className={({ isActive }) =>
                          isActive
                            ? "  text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1 text-sm"
                        }
                      >
                        Backtesting
                      </NavLink>
                    </li>
                    <li className="nav-link-ladder">
                      <NavLink
                        to="data-and-tools/programming-languages"
                        className={({ isActive }) =>
                          isActive
                            ? "  text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1 text-sm"
                        }
                      >
                        Programming Languages
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="nav-link-container">
                  <p className="text-sm font-black">Portfolio Management</p>
                  <ul className=" mt-4 space-y-3">
                    <li className="nav-link-ladder">
                      <NavLink
                        to="portfolio-management/risk-management"
                        className={({ isActive }) =>
                          isActive
                            ? "  text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1 text-sm"
                        }
                      >
                        Risk Management
                      </NavLink>
                    </li>
                    <li className="nav-link-ladder">
                      <NavLink
                        to="portfolio-management/position-sizing"
                        className={({ isActive }) =>
                          isActive
                            ? "  text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 px-2 py-1 text-sm rounded-m"
                        }
                      >
                        Position Sizing
                      </NavLink>
                    </li>
                    <li className="nav-link-ladder">
                      <NavLink
                        to="portfolio-management/position-sizings"
                        className={({ isActive }) =>
                          isActive
                            ? " text-sm text-[#48B4EA] dot font-black rounded-md px-2 py-1"
                            : "text-gray-500 font-medium hover:text-gray-800 hover:bg-gray-100 px-2 py-1 text-sm rounded-m"
                        }
                      >
                        Position Sizings
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex-1   p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default QuantInvesting101;
