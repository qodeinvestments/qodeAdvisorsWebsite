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
    <footer className=" bg-[#fcfcfd] relative py-12 graphik-font-regular ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-0">
          <div>
            {/* <img src={logo} alt="Company Logo" className="mb-4 w-32" /> */}
            <h3 className="text-lg font-semibold text-black  mb-4">Company</h3>
            <ul className="text-sm text-gray-400 ">
              <li className="mb-2 hover:text-primary-dark ">
                <Link to={'/'}>About Us</Link>
              </li>
              <li className="mb-2 hover:text-primary-dark ">
                <Link to={'/about-us/our-team'}>Our Team</Link>
              </li>
              <li className="mb-2 hover:text-primary-dark ">
                <a href="#">Careers</a>
              </li>
              <li className="hover:text-primary-dark">
              <Link to={'/contact-us'}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#171E27] mb-4">
              Strategis
            </h3>
            <ul className="text-sm text-gray-400">
              <li className="mb-2 hover:text-primary-dark">
                <Link to={'/strategies/quant-growth-momentum'}>Quant Growth Momentum</Link>       </li>
              <li className="mb-2 hover:text-primary-dark">
                <Link to={'/strategies/quant-growth-fund'}>Quant Growth Fund</Link>    </li>
              
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#171E27] mb-4">
              Resources
            </h3>
            <ul className="text-sm text-gray-400">
              <li className="mb-2 hover:text-primary-dark">
                <Link to={'/blogs'}>Blog</Link>
              </li>
              <li className="mb-2 hover:text-primary-dark">
                <a href="#">Whitepapers</a>
              </li>
              <li className="mb-2 hover:text-primary-dark">
                <Link to={'/calculators'}>Calculators</Link>
              </li>
              <li className="hover:text-primary-dark">
                <Link to={'/faq'}>FAQs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#171E27] mb-4">
              Subscribe
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter to get the latest updates:
            </p>
            <form className="flex">
              <input
                type="email"
                className="w-full px-4 py-2 rounded-l bg-white text-sm text-gray-400 border border-gray-600"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-r"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
            </form>
            <h3 className="text-lg font-semibold text-white mt-8 mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-sm hover:text-primary-dark-dark text-gray-400"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="text-sm hover:text-primary-dark-dark text-gray-400"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="#"
                className="text-sm hover:text-primary-dark-dark text-gray-400"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                href="#"
                className="text-sm hover:text-primary-dark-dark text-gray-400"
              >
                <FontAwesomeIcon icon={faRss} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Qode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
