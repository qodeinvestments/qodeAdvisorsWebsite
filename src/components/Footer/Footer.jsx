import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
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
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;