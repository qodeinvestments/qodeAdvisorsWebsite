import React, { useState } from "react";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border mb-2">
      <div
        className="flex justify-between items-center p-3 sm:p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Heading
          level={3}
          className="text-base  font-medium sm:text-body md:text-subheading text-[#151E28] pr-4"
        >
          {question}
        </Heading>
        <span
          className={`text-[#151E28] md:text-subheading sm:md:text-subheading transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        >
          &#8744;
        </span>
      </div>
      {isOpen && (
        <div className="p-3 sm:p-4 bg-[#fafafa]">
          <Text className=" text-black text-xs sm:text-body">{answer}</Text>
        </div>
      )}
    </div>
  );
};

const FAQs = () => {
  const faqData = [
    {
      question: "What is Qode's investment philosophy?",
      answer:
        "Qode's investment philosophy is rooted in quantitative analysis and long-term value creation. We leverage advanced mathematical models and data analysis to identify investment opportunities that offer the best risk-adjusted returns over time.",
    },
    {
      question: "How does Qode ensure transparency for its clients?",
      answer:
        "We prioritize clear and factual communication with our clients. Regular reports, open dialogues, and accessible information about our investment strategies and performance are core to our transparency efforts. We believe in educating our clients about both opportunities and risks.",
    },
    {
      question: "What types of investment products does Qode offer?",
      answer:
        "Qode offers a range of investment products tailored to different risk profiles and investment goals. These include mutual funds, ETFs, separately managed accounts, and customized portfolio solutions. All our products are underpinned by our quantitative approach to investing.",
    },
    {
      question:
        "How does Qode's research process differ from traditional methods?",
      answer:
        "Our research goes beyond traditional financial analysis. While we thoroughly examine financial statements and market data, we also employ advanced algorithms to analyze vast amounts of information. Additionally, we place significant emphasis on understanding the human factors driving company performance through extensive field research.",
    },
    {
      question: "What is Qode's approach to risk management?",
      answer:
        "Risk management is integral to our investment process. We use sophisticated models to assess and monitor various risk factors, including market risk, liquidity risk, and operational risk. Our goal is to optimize returns while maintaining a prudent risk profile aligned with each client's tolerance and objectives.",
    },
    {
      question:
        "How does Qode incorporate ESG factors into its investment decisions?",
      answer:
        "Environmental, Social, and Governance (ESG) factors are an important part of our investment analysis. We believe that companies with strong ESG practices are more likely to deliver sustainable long-term returns. Our quantitative models incorporate ESG data alongside traditional financial metrics to provide a comprehensive view of investment opportunities.",
    },
  ];

  return (
    <div className="  text-gray-900 min-h-screen">
      <div className=" text-black  px-4 sm:px-6 lg:px-8 mt-44 text-center">
        <Heading level={1} className="text-3xl font-black  mb-4">
          FAQ's
        </Heading>
      </div>

      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg ">
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
