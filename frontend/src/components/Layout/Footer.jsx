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
import CustomLink from "../common/CustomLink";
import List from "../common/List";
import Heading from "../common/Heading";
import Section from "../container/Section";

const Footer = () => {
  return (
    <footer className="bg-lightBeige ">
      <div className="py-7 max-w-[1386px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start ">
          <div className="text-center sm:text-left col-span-1 sm:col-span-2 md:col-span-1">
            <Heading className="  text-subheading text-brown mb-4">
              Qode Advisors LLP
            </Heading>
            <Text className="text-base sm:text-body max-w-xs mx-auto sm:mx-0 text-black">
              2nd Floor, Tree Building, Raghuvanshi Mills Compound, Gandhi
              Nagar, Upper Worli, Lower Parel, Mumbai, Maharashtra 400013
            </Text>
            <div className="mt-1 text-base sm:text-body text-black">
              <Text className="mb-1">
                PMS No: <span className="">INP000008914</span>
              </Text>
              <Text className="mb-1">
                Email:{" "}
                <a
                  href="mailto:contact@qodeinvestments.com"
                  className="hover:text-black"
                >
                  rishabh@qodeinvest.com
                </a>
              </Text>
              <Text>
                Mobile:{" "}
                <a href="tel:+919876543210" className="hover:text-black">
                  +91 99201 11053
                </a>
              </Text>
            </div>
          </div>

          <div>
            <Heading className="text-brown text-subheading mb-4">
              Company
            </Heading>
            <List
              className="text-base sm:text-body text-black"
              itemClassName="mb-1 hover:text-black"
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
            <Heading className="text-brown  text-subheading mb-4">
              Strategies
            </Heading>
            <List
              className="text-base sm:text-body text-black"
              itemClassName="mb-1 hover:text-black"
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
            <Heading className=" text-brown text-subheading mb-4">
              Resources
            </Heading>
            <List
              className="text-base sm:text-body text-black"
              itemClassName="hover:text-black"
              items={[
                <CustomLink to="/faq">FAQs</CustomLink>,
                <CustomLink to="/python-calculator">
                  Portfolio Visualizer
                </CustomLink>,
              ]}
            />
          </div>
        </div>
        <hr className=" border-brown mt-5" />
        <div className="border-b border-gray-200 mt-1">
          <Text className="text-base sm:text-body text-black text-center">
            &copy; {new Date().getFullYear()} Qode Advisors LLP. All rights
            reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
