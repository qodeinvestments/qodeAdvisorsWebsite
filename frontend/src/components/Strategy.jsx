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
    <div className="mx-auto sm:mt-5 mt-8">
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
      <Section className="mb-18 " padding="normal">
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
        <PerformanceChart strategy={strategyCode} />
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

      <Section padding="extralarge">
        <SectionContent>
          <Text className="sm:text-subheading text-mobileSubHeading font-subheading text-center mb-4 ">
            How this Strategy works & <br className="sm:visible hidden" /> how
            was it made to get the expected returns with highest certainty.
          </Text>
          <CustomLink
            to={`/blogs${blogUrl}`}
            className="p-2 relative border-brown border transition-all justify-between items-center  flex duration-500 hover:bg-beige hover:text-black hover:border-none hover:shadow-xl group"
          >
            <div className="text-black">
              <Text className="sm:text-subheading text-mobileSubHeading font-subheading">
                Read here
              </Text>
            </div>
            <div className="text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="44"
                height="44"
                fill="currentColor"
                className="ml-2"
              >
                <path d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z" />
              </svg>
            </div>
          </CustomLink>
        </SectionContent>
      </Section>

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
      <Section>
        <FundManagers
          text={
            "Need help deciding which strategy would be best for you to reach financial goal?"
          }
        />
      </Section>
      {/* <Section>
        <ModalButton />
      </Section>

      <Section gray padding="normal">
        <Blogs />
      </Section> */}

      <Section padding="normal">
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
      </Section>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <BookAMeet />
        </Modal>
      )}
    </div>
  );
};

export default StrategyComponent;
