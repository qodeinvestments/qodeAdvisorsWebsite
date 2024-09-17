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

const StrategyComponent = ({ strategyData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

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
  } = strategyData;

  return (
    <div className="mx-auto mt-9">
      <Section className="mb-4" withBorder padding="extralarge">
        <Heading className="font-bold mb-1 text-brown text-center">
          <span className="block">{title}</span>
        </Heading>
        <Text className="text-center text-subheading font-subheading mb-3">
          {tagLine}
        </Text>
        <Text className="text-center dm-sans-font text-body">
          {description}
        </Text>
        {principle && <Text className="text-center">{principle}</Text>}
      </Section>

      <Section>
        <PerformanceChart strategy={strategyCode} />
      </Section>

      <Section gray padding="normal">
        <div className="text-center">
          <Heading className=" font-bold mb-4 text-brown">
            Not sure which strategy is right for you?
          </Heading>
          <Text className="text-body mb-6 text-black">
            Sign Up to track our live portfolio.
          </Text>
          <Button to="https://dashboard.qodeinvest.com">Sign Up</Button>
        </div>
      </Section>

      <Section>
        <SectionContent>
          <Heading className="text-subheading sm:text-subheading md:text-body font-black text-[#151E28] text-center mb-4 sm:mb-8">
            How Our Strategy Works
          </Heading>
          <Text className="text-center text-gray-600 px-2 text-body">
            Understand the step-by-step process we use to identify promising
            investment opportunities and manage your portfolio.
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-[#fafafa] p-4 sm:p-2">
                <div className="flex items-center justify-center w-3 sm:h-3 rounded-full bg-gray-200 mb-4">
                  <FontAwesomeIcon
                    icon={step.icon}
                    className="text-subheading sm:text-subheading text-[#151E28]"
                  />
                </div>
                <Heading
                  level={3}
                  className="text-subheading sm:text-subheading font-bold text-[#151E28] mb-2"
                >
                  {step.title}
                </Heading>
                <Text className="text-gray-600 text-base sm:text-body">
                  {step.description}
                </Text>
              </div>
            ))}
          </div>
        </SectionContent>
      </Section>

      <Section>
        <ModalButton />
      </Section>

      <Section gray padding="normal">
        <Blogs />
      </Section>

      <Section padding="large">
        <Heading className="text-subheading sm:text-subheading md: font-black text-[#151E28] text-center mb-4 sm:mb-8">
          FAQ's
        </Heading>
        <div className="space-y-2 sm:space-y-4 mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white border">
              <div
                className="flex justify-between items-center p-3 sm:p-4 cursor-pointer"
                onClick={() => handleAccordionToggle(index)}
              >
                <Heading
                  level={3}
                  className="text-base font-medium sm:text-body md:text-body text-[#151E28] pr-4"
                >
                  {item.question}
                </Heading>
                <span
                  className={`text-[#151E28] text-subheading sm:text-subheading transition-transform duration-300 ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                >
                  &#8744;
                </span>
              </div>
              {activeIndex === index && (
                <div className="p-3 sm:p-4 bg-[#fafafa] text-black text-xs sm:text-body">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default StrategyComponent;
