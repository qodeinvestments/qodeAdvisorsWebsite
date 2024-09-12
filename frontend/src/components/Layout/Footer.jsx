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
import Text from "../common/Text";
import Heading from "../common/Heading";
import CustomLink from "../common/CustomLink";
import List from "../common/List";

const Footer = () => {
  return (
    <footer className="bg-[#000] relative  py-16 sm:py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="text-center sm:text-left col-span-1 sm:col-span-2 md:col-span-1">
            <Heading
              level={2}
              className="md: sm:md:  playfair-display-font font-bold text-brown mb-4"
            >
              Qode Advisors LLP
            </Heading>
            <Text className="text-base sm:text-body max-w-xs mx-auto sm:mx-0 text-white">
              2nd Floor, Tree Building, Raghuvanshi Mills Compound, Gandhi
              Nagar, Upper Worli, Lower Parel, Mumbai, Maharashtra 400013
            </Text>
            <div className="mt-4 text-base sm:text-body text-white">
              <Text className="mb-2">
                PMS No: <span className="font-semibold">INP000008914</span>
              </Text>
              <Text className="mb-2">
                Email:{" "}
                <a
                  href="mailto:contact@qodeinvestments.com"
                  className="hover:text-brown"
                >
                  contact@qodeinvest.com
                </a>
              </Text>
              <Text>
                Mobile:{" "}
                <a href="tel:+919876543210" className="hover:text-brown">
                  +91 99201 11053
                </a>
              </Text>
            </div>
          </div>

          <div>
            <Heading
              level={3}
              className="md: sm:md:  font-semibold text-brown mb-4"
            >
              Company
            </Heading>
            <List
              className="text-base sm:text-body text-white"
              itemClassName="mb-2 hover:text-brown"
              items={[
                <CustomLink to="/about-us">About Us</CustomLink>,
                <CustomLink to="/contact-us">Contact Us</CustomLink>,
                <CustomLink to="/privacy-policy">Privacy Policy</CustomLink>,
                <CustomLink to="/terms-n-conditions">
                  Terms and Conditions
                </CustomLink>,
                <CustomLink to="/disclosure">Disclosure</CustomLink>,
              ]}
            />
          </div>

          <div>
            <Heading
              level={3}
              className="md: sm:md:  font-semibold text-brown mb-4"
            >
              Strategies
            </Heading>
            <List
              className="text-base sm:text-body text-white"
              itemClassName="mb-2 hover:text-brown"
              items={[
                <CustomLink to="/strategies/quant-growth-fund">
                  Qode Growth Fund
                </CustomLink>,
                <CustomLink to="/strategies/quant-growth-momentum">
                  Qode Momentum Fund
                </CustomLink>,
                <CustomLink to="/strategies/low-vol-momentum">
                  Qode Low Volatility Fund
                </CustomLink>,
              ]}
            />
          </div>

          <div>
            <Heading
              level={3}
              className="md: sm:md:  font-semibold text-brown mb-4"
            >
              Resources
            </Heading>
            <List
              className="text-base sm:text-body text-white"
              itemClassName="hover:text-brown"
              items={[
                <CustomLink to="/faq">FAQs</CustomLink>,
                <CustomLink to="/python-calculator">
                  Portfolio Visualizer
                </CustomLink>,
              ]}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <Text className="text-base sm:text-body text-white text-center">
            &copy; {new Date().getFullYear()} Qode Advisors LLP. All rights
            reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
