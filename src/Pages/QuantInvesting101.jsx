import React from "react";
import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import { Container } from "../components";
import AppRoutes from "./QuantInvesting101/Routes";
import "./Pages.css";
const QuantInvesting101 = () => {
  return (
    <>
      <div className="flex h-screen graphik-font-regular mt-16">
        <div className="bg-gray-200 p-4 w-70">
          <nav className="space-y-1">
            <ul className="space-y-1">
              <li>
                <div className="nav-link-container">
                  &#x2022; Introduction
                  <ul className="pl-4 mt-2 space-y-1">
                    <li className="nav-link-ladder">
                      <NavLink
                        to="introduction/what-is-quant-investing"
                        className={({ isActive }) =>
                          isActive
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
                        }
                      >
                        What is Quant Investing
                      </NavLink>
                    </li>
                    <li className="nav-link-ladder">
                      <NavLink
                        to="introduction/how-it-works"
                        className={({ isActive }) =>
                          isActive
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
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
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
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
                  &#x2022; Quantitative Strategies
                  <ul className="pl-4 mt-2 space-y-1">
                    <li className="nav-link-ladder">
                      <NavLink
                        to="quantitative-strategies/trend-following"
                        className={({ isActive }) =>
                          isActive
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
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
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
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
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
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
                  &#x2022; Data and Tools
                  <ul className="pl-4 mt-2 space-y-1">
                    <li className="nav-link-ladder">
                      <NavLink
                        to="data-and-tools/data-sources"
                        className={({ isActive }) =>
                          isActive
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
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
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
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
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
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
                  &#x2022; Portfolio Management
                  <ul className="pl-4 mt-2 space-y-1">
                    <li className="nav-link-ladder">
                      <NavLink
                        to="portfolio-management/risk-management"
                        className={({ isActive }) =>
                          isActive
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
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
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-2 py-1 rounded-m"
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
                            ? "text-gray-800  bg-white rounded-md px-2 py-1"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-2 py-1 rounded-m"
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
        <div className="flex-1  p-4">
          <AppRoutes />
        </div>
      </div>
    </>
  );
};

export default QuantInvesting101;
