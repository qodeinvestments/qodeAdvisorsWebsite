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
    <footer className="bg-lightBeige">
      <div className="py-5 px-2 sm:px-0 sm:max-w-[1386px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between  items-start space-y-2 sm:space-y-0">
          <div className="text-center mx-auto sm:mx-0 mb-4 sm:mb-0 sm:text-left col-span-1 sm:col-span-2 md:col-span-1">
            <Heading className="sm:text-subheading text-mobileSubHeadingtext text-brown mb-2">
              Qode Advisors LLP
            </Heading>
            <Text className="text-body sm:text-body max-w-xs mx-auto sm:mx-0 text-black">
              2nd Floor, Tree Building, Raghuvanshi Mills Compound, Gandhi
              Nagar, Upper Worli, Lower Parel, Mumbai, Maharashtra 400013
            </Text>
            <div className="mt-1 text-body sm:text-body text-black">
              <Text className="mb-18">
                PMS No: <span>INP000008914</span>
              </Text>
              <br />
              <Text className="mb-18">
                For Investor Onboarding and other queries contact us at
                <br /> Email:{" "}
                <a
                  href="mailto:contact@qodeinvestments.com"
                  className="hover:text-black"
                >
                  operations@qodeinvest.com
                </a>
              </Text>
              <Text>
                <a href="tel:+919820300088" className="hover:text-black">
                  +91 98203 00088
                </a>
              </Text>
              <Text>
                <a
                  href="tel:+919820300028"
                  className="text-gray-900 hover:text-gray-600 transition duration-300"
                >
                  +91 98203 00028
                </a>
              </Text>
            </div>
          </div>

          <div>
            <Heading className="sm:text-subheading text-mobileSubHeading text text-brown mb-2">
              Company
            </Heading>
            <List
              className="text-body sm:text-body text-black"
              itemClassName="mb-18 hover:text-black"
              items={[
                <CustomLink to="/about-us">About Us</CustomLink>,
                <CustomLink to="/contact-us">Contact Us</CustomLink>,
                <CustomLink to="/privacy-policy">Privacy Policy</CustomLink>,
                <CustomLink to="/terms-n-conditions">
                  Terms and Conditions
                </CustomLink>,
                <CustomLink to={"http://localhost:5173/python-calculator"}>
                  Portfolio Visualizer
                </CustomLink>,
              ]}
            />
          </div>

          <div>
            <Heading className="sm:text-subheading text-mobileSubHeading text text-brown mb-2">
              Strategies
            </Heading>
            <List
              className="text-body sm:text-body text-black"
              itemClassName="mb-18 hover:text-black"
              items={[
                <CustomLink to="/strategies/quant-growth-fund">
                  Qode Growth Fund
                </CustomLink>,
                <CustomLink to="/strategies/qode-velocity-fund">
                  Qode Velocity Fund
                </CustomLink>,
                <CustomLink to="/strategies/qode-all-weather">
                  Qode All Weather
                </CustomLink>,
                <CustomLink to="/blogs/qode-future-horizon">
                  Qode Future Horizon
                </CustomLink>,
              ]}
            />
          </div>

          <div>
            <Heading className="sm:text-subheading text-mobileSubHeading text text-brown mb-2">
              Support
            </Heading>
            <List
              className="text-body sm:text-body text-black"
              itemClassName="mb-18 hover:text-black"
              items={[
                <CustomLink
                  key="smart-odr"
                  target="_blank"
                  to={"https://smartodr.in/"}
                >
                  Smart ODR
                </CustomLink>,
                <CustomLink key="disclosure" to="/disclosure">
                  Disclosure
                </CustomLink>,
              ]}
            />
          </div>
        </div>
        <hr className="border-brown mt-4" />
        <div className="mt-4">
          <Text className="text-body sm:text-body text-black text-center">
            &copy; {new Date().getFullYear()} Qode Advisors LLP. All rights
            reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
