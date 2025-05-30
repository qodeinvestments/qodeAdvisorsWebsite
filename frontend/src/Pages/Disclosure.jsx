import React from "react";
import Text from "../components/common/Text";
import Heading from "../components/common/Heading";
import Section from "../components/container/Section";
import { Helmet } from "react-helmet";
import CustomLink from "../components/common/CustomLink";

const Disclosure = () => {

  return (
    <>
      <Helmet>
        <title>Disclosure - Qode</title>
        <meta
          name="description"
          content="Access the latest disclosure documents, financial statements, and reports from Qode Invest. Download annual reports, sustainability reports, and more."
        />
        <meta
          name="keywords"
          content="Qode, Disclosure, Annual Report, Financial Statements, Sustainability Report, Investor Complaints, Code of Conduct"
        />
        <meta name="author" content="Qode" />
        <link rel="canonical" href="https://www.qodeinvest.com/disclosure" />
      </Helmet>
      <Section className="sm:mt-5 mt-4" padding="extralarge">
        <Heading isItalic className="text-brown text-center mb-5">
          Disclosure
        </Heading>
        <div className="grid grid-cols-1 gap-2">
          <CustomLink
            to={"/documents/Qode-Disclosure-Document.pdf"}
            target="_blank"
          >
            <div className=" p-1 md:p-3 cursor-pointer border border-brown transition-all group duration-300 hover:bg-beige hover:text-black capitalize hover:shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <Heading className="group-hover:text-black sm:text-subheading text-brown text-mobileSubHeading font-subheading">
                    Disclosure document
                  </Heading>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="44"
                    height="44"
                    fill="currentColor"
                  >
                    <path d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </CustomLink>
          <CustomLink
            target="_blank"
            to={"/documents/Qode-Anti-Money-Laundering-Policy.pdf"}
          >
            <div className=" p-1 md:p-3 cursor-pointer border border-brown transition-all group duration-300 hover:bg-beige hover:text-black capitalize hover:shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <Heading className="group-hover:text-black sm:text-subheading text-brown text-mobileSubHeading font-subheading">
                    Anti-Money Laundering Policy
                  </Heading>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="44"
                    height="44"
                    fill="currentColor"
                  >
                    <path d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </CustomLink>
          <CustomLink
            to={"/documents/Qode-Conflict-Of-Interest-Policy.pdf"}
            target="_blank"
          >
            <div className=" p-1 md:p-3 cursor-pointer border border-brown transition-all group duration-300 hover:bg-beige hover:text-black capitalize hover:shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <Heading className="group-hover:text-black sm:text-subheading text-brown text-mobileSubHeading font-subheading">
                    Conflict of interest policy
                  </Heading>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="44"
                    height="44"
                    fill="currentColor"
                  >
                    <path d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </CustomLink>
          <CustomLink
            to={"/documents/Qode-Investor-Charter.pdf"}
            target="_blank"
          >
            <div className=" p-1 md:p-3 cursor-pointer border border-brown transition-all group duration-300 hover:bg-beige hover:text-black capitalize hover:shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <Heading className="group-hover:text-black sm:text-subheading text-brown text-mobileSubHeading font-subheading">
                    Investor charter
                  </Heading>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="44"
                    height="44"
                    fill="currentColor"
                  >
                    <path d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </CustomLink>
          <CustomLink
            to={"/documents/Qode-Customer-Grievance-Mechanism.pdf"}
            target="_blank"
          >
            <div className=" p-1 md:p-3 cursor-pointer border border-brown transition-all group duration-300 hover:bg-beige hover:text-black capitalize hover:shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <Heading className="group-hover:text-black sm:text-subheading text-brown text-mobileSubHeading font-subheading">
                    Customer Grievance Mechanism
                  </Heading>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="44"
                    height="44"
                    fill="currentColor"
                  >
                    <path d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </CustomLink>
          <CustomLink
            to={"/documents/Qode-Code-of-Conduct.pdf"}
            target="_blank"
          >
            <div className=" p-1 md:p-3 cursor-pointer border border-brown transition-all group duration-300 hover:bg-beige hover:text-black capitalize hover:shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <Heading className="group-hover:text-black sm:text-subheading text-brown text-mobileSubHeading font-subheading">
                    Code of conduct
                  </Heading>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="44"
                    height="44"
                    fill="currentColor"
                  >
                    <path d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </CustomLink>
          <CustomLink
            to={"/documents/Qode-Annexure-D.pdf"}
            target="_blank"
          >
            <div className=" p-1 md:p-3 cursor-pointer border border-brown transition-all group duration-300 hover:bg-beige hover:text-black capitalize hover:shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <Heading className="group-hover:text-black sm:text-subheading text-brown text-mobileSubHeading font-subheading">
                    Annexure D
                  </Heading>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="44"
                    height="44"
                    fill="currentColor"
                  >
                    <path d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </CustomLink>
          <CustomLink
            to={"/documents/Qode-Customer-Complaints.pdf"}
            target="_blank"
          >
            <div className=" p-1 md:p-3 cursor-pointer border border-brown transition-all group duration-300 hover:bg-beige hover:text-black capitalize hover:shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <Heading className="group-hover:text-black sm:text-subheading text-brown text-mobileSubHeading font-subheading">
                    Customer complaints
                  </Heading>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="44"
                    height="44"
                    fill="currentColor"
                  >
                    <path d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </CustomLink>
          <CustomLink
            to={"/documents/Fee_Calculator.xlsx"}
            target="_blank"
          >
            <div className=" p-1 md:p-3 cursor-pointer border border-brown transition-all group duration-300 hover:bg-beige hover:text-black capitalize hover:shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <Heading className="group-hover:text-black sm:text-subheading text-brown text-mobileSubHeading font-subheading">
                    Fee Calculation
                  </Heading>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="44"
                    height="44"
                    fill="currentColor"
                  >
                    <path d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </CustomLink>
        </div>
        <div className=" mt-3">
          <Text className="text-body font-body">
            For general queries and updates, write to{" "}
            <a
              href="mailto:investor.relations@qodeinvest.com"
              className="text-brown font-bold"
            >
              investor.relations@qodeinvest.com
            </a>
            .
          </Text>
          <Text className="text-body font-body">
            To register a formal complaint with us, write to{" "}
            <a
              href="mailto:investor.relations@qodeinvest.com"
              className="text-brown font-bold"
            >
              investor.relations@qodeinvest.com
            </a>{" "}
            with your name, registered mobile number, PAN Card, and nature of
            the complaint.
          </Text>
          <br className="visible sm:hidden" />
          <Text className="text-body font-body">
            Visit the{" "}
            <a
              className="text-brown font-bold hover:text-black"
              href="https://scores.sebi.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SCORES
            </a>{" "}
            website for more information.
          </Text>
        </div>
      </Section>
    </>
  );
};

export default Disclosure;
