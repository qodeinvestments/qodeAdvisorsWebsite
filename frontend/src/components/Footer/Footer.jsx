import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faRss } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/companyLogo/Qode.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#000] relative minion-pro-font py-16 sm:py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="text-center sm:text-left col-span-1 sm:col-span-2 md:col-span-1">
            <h2 className="md:text-lg sm:md:text-lg sophia-pro-font playfair-display-font font-bold text-red-500 mb-4">
              Qode Advisors LLP
            </h2>
            <p className="text-base sm:text-md max-w-xs mx-auto sm:mx-0 text-white">
              2nd Floor, Tree Building, Raghuvanshi Mills Compound, Gandhi
              Nagar, Upper Worli, Lower Parel, Mumbai, Maharashtra 400013
            </p>
            <div className="mt-4 text-base sm:text-md text-white">
              <p className="mb-2">
                PMS No:{" "}
                <span className="font-semibold">56165411118919841981</span>
              </p>
              <p className="mb-2">
                Email:{" "}
                <a
                  href="mailto:contact@qodeinvestments.com"
                  className="hover:text-red-500"
                >
                  contact@qodeinvest.com
                </a>
              </p>
              <p>
                Mobile:{" "}
                <a href="tel:+919876543210" className="hover:text-red-500">
                  +91 99201 11053
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="md:text-lg sm:md:text-lg sophia-pro-font font-semibold text-red-500 mb-4">
              Company
            </h3>
            <ul className="text-base sm:text-md text-white">
              <li className="mb-2 hover:text-red-500">
                <Link to="/about-us">About Us</Link>
              </li>
              <li className="mb-2 hover:text-red-500">
                <Link to="/contact-us">Contact Us</Link>
              </li>
              <li className="mb-2 hover:text-red-500">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="mb-2 hover:text-red-500">
                <Link to="/terms-n-conditions">Terms and Conditions</Link>
              </li>
              <li className="mb-2 hover:text-red-500">
                <Link to="/disclosure">Disclosure</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="md:text-lg sm:md:text-lg sophia-pro-font font-semibold text-red-500 mb-4">
              Strategies
            </h3>
            <ul className="text-base sm:text-md text-white">
              <li className="mb-2 hover:text-red-500">
                <Link to="/strategies/quant-growth-fund">Quality Fund</Link>
              </li>
              <li className="mb-2 hover:text-red-500">
                <Link to="/strategies/quant-growth-momentum">
                  High Return & Churn Fund
                </Link>
              </li>
              <li className="mb-2 hover:text-red-500">
                <Link to="/strategies/low-vol-momentum">Steady Fund</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="md:text-lg sm:md:text-lg sophia-pro-font font-semibold text-red-500 mb-4">
              Resources
            </h3>
            <ul className="text-base sm:text-md text-white">
              <li className="hover:text-red-500">
                <Link to="/faq">FAQs</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-base sm:text-md text-white text-center">
            &copy; {new Date().getFullYear()} Qode Advisors LLP. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
