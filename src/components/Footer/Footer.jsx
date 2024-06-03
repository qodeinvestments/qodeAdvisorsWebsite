import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRss } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import logo from "../../assets/companyLogo/Qode.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-0">
          <div>
            {/* <img src={logo} alt="Company Logo" className="mb-4 w-32" /> */}
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#">Our Team</a>
              </li>
              <li className="mb-2">
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#">Investment Planning</a>
              </li>
              <li className="mb-2">
                <a href="#">Wealth Management</a>
              </li>
              <li className="mb-2">
                <a href="#">Tax Planning</a>
              </li>
              <li>
                <a href="#">Estate Planning</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#">Blog</a>
              </li>
              <li className="mb-2">
                <a href="#">Whitepapers</a>
              </li>
              <li className="mb-2">
                <a href="#">Calculators</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter to get the latest updates:</p>
            <form className="flex">
              <input
                type="email"
                className="w-full px-4 py-2 rounded-l bg-gray-700 text-gray-400 border border-gray-600"
                placeholder="Enter your email"
              />
              <button type="submit" className="px-4 py-2 bg-gray-600 text-white rounded-r">
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
            </form>
            <h3 className="text-lg font-semibold text-white mt-8 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <FontAwesomeIcon icon={faRss} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Qode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
