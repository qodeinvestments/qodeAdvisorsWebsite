import React, { useState } from "react";
import { Blogs } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import PerformanceChart from "./Charts/PerformanceChart";
import ModalButton from "./ModalButton";
import Section from "./container/Section";
import SectionContent from "./container/SectionContent";
import Button from "./common/Button";
import Text from "./common/Text";
import Heading from "./common/Heading";
import CustomLink from "./common/CustomLink";
import FundManagers from "./FundManagers";
import Modal from "./Modal";
import BookAMeet from "../Pages/BookAMeet";
import { Helmet } from "react-helmet";
import Calculator from "./Calculator";
import image from "../assets/livePerformance.jpg";

const StrategyComponent = ({ strategyData }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccordionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const {
    title,
    tagLine,
    description,
    principle,
    strategyCode,
    steps,
    faqItems,
    blogUrl,
  } = strategyData;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{title} - Strategy Overview | Qode Investments</title>
        <meta
          name="description"
          content={`Learn more about the ${title} strategy at Qode Investments. ${description}`}
        />
        <meta
          name="keywords"
          content={`${title}, ${tagLine}, investment strategy, Qode Investments`}
        />
        <meta name="author" content="Qode Investments" />
      </Helmet>
      <div className="mx-auto sm:mt-5 mt-8">
        <Section className="mb-18 " padding="extralarge">
          <Heading className="font-bold mb-1 text-brown text-center">
            <span className="block">{title}</span>
          </Heading>
          <Text className="text-center sm:text-subheading text-mobileSubHeading font-subheading mb-3">
            {tagLine}
          </Text>
          <Text className="text-center dm-sans-font text-body">
            {description}
          </Text>
          {principle && <Text className="text-center">{principle}</Text>}
        </Section>

        <Section className="mb-4 ">
          <PerformanceChart strategy={strategyCode} blogUrl={blogUrl} />
        </Section>
        <Section className="mb-4">
          <div className="w-full flex sm:flex-row flex-col gap-4">
            {" "}
            {/* Adjusted margin */}
            <div className=" sm:p-6 p-3 border border-brown bg-white  sm:w-3/6">
              {" "}
              {/* Adjusted padding */}
              <Calculator strategy={strategyCode} />
            </div>
            <div
              className="relative  bg-cover flex justify-start items-start flex-col sm:p-6 p-2 sm:w-1/2"
              style={{ backgroundImage: `url(${image})` }}
            >
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black opacity-20"></div>

              {/* Content that sits on top of the background and overlay */}
              <div className="relative z-10 text-start backdrop-blur-md bg-black bg-opacity-30 p-4 ">
                <Heading
                  isItalic
                  className="text-lightBeige sm:text-semiheading text-mobileSemiHeading mb-4"
                >
                  Want to track the live portfolio performance?
                </Heading>
                <Button
                  to={"https://dashboard.qodeinvest.com/"}
                  target="_blank"
                  isGlassmorphism
                  className="text-lightBeige hover:text-black"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* <Section gray padding="normal">
        <div className="text-center">
          <Heading className=" font-bold mb-4 text-brown">
            Not sure which strategy is right for you?
          </Heading>
          <Text className="text-body mb-6 text-black">
            Sign Up to track our live portfolio.
          </Text>
          <Button to="https://dashboard.qodeinvest.com">Sign Up</Button>
        </div>
      </Section> */}

        {/* <Section
        padding="extralarge"
        className="bg-black max-w-[93%] sm:max-w-[1386px] mx-auto"
      >
        <Heading className="sm:text-semiheading text-mobileSemiHeading text-beige   mb-4 text-center"></Heading>
        <Text className="sm:text-subheading text-mobileSubHeading mb-3 text-center text-beige">
          Our fund manager would be happy to help you.
        </Text>
        <div className="text-center">
          <Button className="bg-beige" onClick={openModal}>
            Schedule A Call
          </Button>
        </div>
      </Section> */}
        <Section padding="large">
          <FundManagers
            text={
              "Need help deciding which strategy would be best for reaching your financial goal?"
            }
          />
        </Section>
        {/* <Section>
        <ModalButton />
      </Section>

      <Section gray padding="normal">
        <Blogs />
      </Section> */}

        {/* <Section padding="normal">
        <Heading className="sm:text-semiheading text-mobileSemiHeading font-semiheading text-brown text-center mb-4 ">
          FAQ's
        </Heading>
        <div className="space-y-2 sm:space-y-3 mx-auto">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border p-1 sm:p-0 py-0 border-brown"
            >
              <div
                className="flex gap-0.5 justify-between items-center  sm:px-2 py-2 cursor-pointer"
                onClick={() => handleAccordionToggle(index)}
              >
                <Text className="sm:text-subheading text-mobileSubHeading font-subheading sm:pr-4">
                  {item.question}
                </Text>
                <span
                  className={`text-brown sm:text-subheading text-mobileSubHeadingsm:sm:text-subheading text-mobileSubHeadingtransition-transform duration-300 ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                >
                  &#8744;
                </span>
              </div>
              {activeIndex === index && (
                <div className=" pb-2 sm:px-3  text-black font-body text-body">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section> */}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <BookAMeet />
          </Modal>
        )}
      </div>
    </>
  );
};

export default StrategyComponent;
