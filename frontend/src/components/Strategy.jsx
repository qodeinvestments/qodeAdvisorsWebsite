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
import mobileImage from "../assets/livePerformanceMobile.jpg";
import TrailingReturns from "./TrailingReturns";
import useFetchStrategyData from "./hooks/useFetchStrategyData";
const StrategyComponent = ({ strategyData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, error } = useFetchStrategyData(strategyCode);

  return (
    <>
      <Helmet>
        <title>{title} - Strategy Overview | Qode</title>
        <meta
          name="description"
          content={`Learn more about the ${title} strategy at Qode. ${description}`}
        />
        <meta
          name="keywords"
          content={`${title}, ${tagLine}, investment strategy, Qode`}
        />
        <meta name="author" content="Qode" />
      </Helmet>
      <div className="mx-auto sm:mt-8 mt-8">
        <Section padding="normal">
          <Heading className="font-bold mb-1 text-brown text-center">
            <span className="block">{title}</span>
          </Heading>
          <Text className="text-center sm:text-subheading text-mobileSubHeading font-subheading mb-3">
            {tagLine}
          </Text>
          <Text className="text-center dm-sans-font text-body">
            {description}
          </Text>{" "}
          <br />
          {principle && <Text className="text-center">{principle}</Text>}
        </Section>

        <Section className="mx-0">
          <TrailingReturns
            data={data}
            isLoading={isLoading}
            error={error}
            strategy={strategyCode}
          />
        </Section>

        <Section padding="normal" className="mb-2">
          <PerformanceChart
            data={data}
            strategy={strategyCode}
            blogUrl={blogUrl}
            error={error}
            isLoading={isLoading}
          />
        </Section>

        <Section>
          <div className="w-full flex lg:flex-row flex-col gap-4">
            {" "}
            {/* Adjusted margin */}
            <div className=" lg:p-6 p-3 border border-brown bg-white  lg:w-3/6">
              {" "}
              {/* Adjusted padding */}
              <Calculator data={data} strategy={strategyCode} />
            </div>
            <div
              className="relative bg-cover flex justify-start items-start flex-col sm:p-6 p-2 lg:w-1/2"
              style={{
                backgroundImage: `url(${image})`,
                minHeight: "490px",
                backgroundPosition: "70% 10%",
              }}
            >
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black opacity-20"></div>

              {/* Content that sits on top of the background and overlay */}
              <div className="relative z-10 text-start backdrop-blur-md bg-black bg-opacity-30 p-3 ">
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

        <Section
          padding="large"
          className="max-w-[93%] border border-brown mb-4 sm:mb-5 md:max-w-[1386px] mx-auto"
        >
          <FundManagers
            text={
              "Need help deciding which strategy would be best for reaching your financial goal?"
            }
          />
        </Section>
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
