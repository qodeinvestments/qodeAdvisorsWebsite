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
    <footer className=" bg-[#fcfcfd] border-t border-black relative py-12 graphik-font-regular ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 text-center md:grid-cols-3 gap-20 sm:gap-0">
          <div>
            {/* <img src={logo} alt="Company Logo" className="mb-4 w-32" /> */}
            <h3 className="text-4xl  text-black  mb-4">Company</h3>
            <ul className="text-3xl text-black ">
              {/* <li className="mb-2 hover:text-primary-dark ">
                <Link to={'/'}>About Us</Link>
              </li> */}
              {/* <li className="mb-2 hover:text-primary-dark ">
                <Link to={"/about-us/our-team"}>Our Team</Link>
              </li> */}
              {/* <li className="mb-2 hover:text-primary-dark ">
                <a href="#">Careers</a>
              </li> */}
              <li className="hover:text-primary-dark">
                <Link to={"/contact-us"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-4xl  text-[#171E27] mb-4">Strategies</h3>
            <ul className="text-3xl text-black">
              <li className="mb-2 hover:text-primary-dark">
                <Link to={"/strategies/quant-growth-fund"}>Quality Fund</Link>{" "}
              </li>
              <li className="mb-2 hover:text-primary-dark">
                <Link to={"/strategies/quant-growth-momentum"}>
                  High Return & Churn Fund
                </Link>{" "}
              </li>
              <li className="mb-2 hover:text-primary-dark">
                <Link to={"/strategies/low-vol-momentum"}>Steady Fund</Link>{" "}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-4xl  text-[#171E27] mb-4">Resources</h3>
            <ul className="text-3xl text-black">
              {/* <li className="mb-2 hover:text-primary-dark">
                <Link to={'/blogs'}>Blog</Link>
              </li>
              <li className="mb-2 hover:text-primary-dark">
                <a href="#">Whitepapers</a>
              </li>
              <li className="mb-2 hover:text-primary-dark">
                <Link to={'/calculators'}>Calculators</Link>
              </li> */}
              <li className="hover:text-primary-dark">
                <Link to={"/faq"}>FAQs</Link>
              </li>
            </ul>
          </div>
          {/* <div>
            <h3 className="text-lg  text-[#171E27] mb-4">Subscribe</h3>
            <p className="text-3xl text-black mb-4">
              Subscribe to our newsletter to get the latest updates:
            </p>
            <form className="flex">
              <input
                type="email"
                className="w-full px-4 py-2 rounded-l bg-white text-3xl text-black border border-gray-600"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-r"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
            </form>
            <h3 className="text-lg  text-white mt-8 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-3xl hover:text-primary-dark-dark text-black"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="text-3xl hover:text-primary-dark-dark text-black"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="#"
                className="text-3xl hover:text-primary-dark-dark text-black"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                href="#"
                className="text-3xl hover:text-primary-dark-dark text-black"
              >
                <FontAwesomeIcon icon={faRss} />
              </a>
            </div>
          </div> */}
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-3xl text-black text-center">
            &copy; {new Date().getFullYear()} Qode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
