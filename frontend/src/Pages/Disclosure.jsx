import React from "react";
import { Container } from "../components";
import Text from "../components/common/Text";
import Heading from "../components/common/Heading";
import Section from "../components/container/Section";
import Button from "../components/common/Button";

const Disclosure = () => {
  const pdfs = [
    { name: "Annual Report 2023", url: "/path/to/annual_report_2023.pdf" },
    {
      name: "Financial Statement Q1 2023",
      url: "/path/to/financial_statement_q1_2023.pdf",
    },
    {
      name: "Sustainability Report 2023",
      url: "/path/to/sustainability_report_2023.pdf",
    },
  ];

  return (
    <Section className="sm:mt-5 mt-4" padding="extralarge">
      <Heading isItalic className="text-brown mb-5">
        Disclosure
      </Heading>

      <div className="grid grid-cols-1 gap-2">
        <div className=" p-1 md:p-3 border border-brown transition-all duration-300 hover:bg-beige hover:border-none hover:shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <Heading className="sm:text-subheading text-brown text-mobileSubHeading font-subheading">
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

        <div className=" p-1 md:p-3 border border-brown transition-all duration-300 hover:bg-beige hover:border-none hover:shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <Heading className="sm:text-subheading text-brown text-mobileSubHeading font-subheading">
                Prevention of money laundering
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

        <div className=" p-1 md:p-3 border border-brown transition-all duration-300 hover:bg-beige hover:border-none hover:shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <Heading className="sm:text-subheading text-brown text-mobileSubHeading font-subheading">
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

        <div className=" p-1 md:p-3 border border-brown transition-all duration-300 hover:bg-beige hover:border-none hover:shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <Heading className="sm:text-subheading text-brown text-mobileSubHeading font-subheading">
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

        <div className=" p-1 md:p-3 border border-brown transition-all duration-300 hover:bg-beige hover:border-none hover:shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <Heading className="sm:text-subheading text-brown text-mobileSubHeading font-subheading">
                Investor complaints (monthly)
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

        <div className=" p-1 md:p-3 border border-brown transition-all duration-300 hover:bg-beige hover:border-none hover:shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <Heading className="sm:text-subheading text-brown text-mobileSubHeading font-subheading">
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
      </div>

      <div className=" mt-3">
        <Text className="text-body font-body">
          For general queries and updates, write to{" "}
          <a
            href="mailto:rishabh@qodeinvest.com"
            className="text-brown font-bold"
          >
            rishabh@qodeinvest.com
          </a>
          .
        </Text>
        <Text className="text-body font-body">
          To register a formal complaint with us, write to{" "}
          <a
            href="mailto:rishabh@qodeinvest.com"
            className="text-brown font-bold"
          >
            rishabh@qodeinvest.com
          </a>{" "}
          with your name, registered mobile number, PAN Card, and nature of the
          complaint.
        </Text>
        <br className="visible sm:hidden" />
        <Text className="text-body font-body">
          Visit the{" "}
          <a
            className="text-brown font-bold hover:text-brown"
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
  );
};

export default Disclosure;
