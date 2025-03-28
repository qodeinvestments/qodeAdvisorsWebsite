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
      <div className="px-2 sm:px-0 py-5 lg:max-w-[1066px] xl:max-w-[1386px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-2 md:space-y-0">
          <div className="text-center hidden sm:block mx-auto lg:mx-0 mb-4 sm:mb-0 lg:text-left col-span-1 sm:col-span-2 md:col-span-1">
            <Heading className="sm:text-subheading text-mobileSubHeading font-bold text text-brown mb-3">
              Qode
            </Heading>
            <Text className="text-body lg:text-body w-full lg:max-w-xs mx-auto sm:mx-0 text-black">
              2nd Floor, Tree Building, Raghuvanshi Mills Compound, Gandhi
              Nagar, Upper Worli, Lower Parel, Mumbai, Maharashtra 400013
            </Text>
            <div className="mt-1 text-body sm:text-body text-black">
              <Text className="mb-18">
                SEBI registered PMS No: <span>INP000008914</span>
              </Text>
              <br />
              <Text className="mb-18">
                For Investor onboarding and other queries contact us at
                <br /> Email:{" "}
                <a
                  href="mailto:investor.relations@qodeinvest.com"
                  className="hover:text-black"
                >
                  investor.relations@qodeinvest.com
                </a>
              </Text>
              <Text>
                Contact No:{" "}
                <a href="tel:+919820300088" className="hover:text-black">
                  +91 98203 00028
                </a>
              </Text>
              {/* <Text>
                <a
                  href="tel:+919820300028"
                  className="text-gray-900 hover:text-gray-600 transition duration-300"
                >
                  +91 98203 00028
                </a>
              </Text> */}
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
                <CustomLink to="/featured-in">Media</CustomLink>,
                <CustomLink to="/privacy-policy">Privacy Policy</CustomLink>,
                <CustomLink to="/terms-n-conditions">
                  Terms and Conditions
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
                <CustomLink to="/strategies/qode-all-weather">
                  Qode All Weather
                </CustomLink>,
                <CustomLink to="/strategies/qode-growth-fund">
                  Qode Growth Fund
                </CustomLink>,
                <CustomLink to="/strategies/qode-tactical-fund">
                  Qode Tactical Fund
                </CustomLink>,
                <CustomLink to="/strategies/qode-future-horizons">
                  Qode Future Horizons
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
                <CustomLink key="support" to="https://support.qodeinvest.com/">
                  Support
                </CustomLink>,
              ]}
            />
          </div>
          <div className="block sm:hidden">
            <Heading className="sm:text-subheading text-mobileSubHeading text text-brown mb-2">
              Qode
            </Heading>
            <Text className="text-body lg:text-body w-full lg:max-w-xs mx-auto sm:mx-0 text-black">
              2nd Floor, Tree Building, Raghuvanshi Mills Compound, Gandhi
              Nagar, Upper Worli, Lower Parel, Mumbai, Maharashtra 400013
            </Text>
            <div className="mt-1 text-body sm:text-body text-black">
              <Text className="mb-18">
                SEBI registered PMS no: <span>INP000008914</span>
              </Text>
              <br />
              <Text className="mb-18">
                For Investor onboarding and other queries contact us at
                <br /> Email:{" "}
                <a
                  href="mailto:investor.relations@qodeinvest.com"
                  className="hover:text-black"
                >
                  investor.relations@qodeinvest.com
                </a>{" "}
              </Text>
              <br />
              Contact No:{" "}
              <a href="tel:+919820300088" className="hover:text-black">
                +91 98203 00028
              </a>
              {/* <Text>
                <a
                  href="tel:+919820300028"
                  className="text-gray-900 hover:text-gray-600 transition duration-300"
                >
                  +91 98203 00028
                </a>
              </Text> */}
            </div>
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
