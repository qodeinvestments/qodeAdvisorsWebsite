import React, { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border px-10 bg-white mb-2 border-gray-200 ">
      <button
        className="flex justify-between items-center w-full py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg  pr-8">{question}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="pb-6 pr-12">
          <p className="text-gray-700">{answer}</p>
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
    <div className="bg-gray-50 graphik-font-regular text-gray-900 min-h-screen">
      <div className="bg-gray-100 text-black py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl  mb-4">Frequently Asked Questions</h1>
        <p className="max-w-3xl mx-auto text-xl">
          Find answers to common questions about Qode's investment approach and
          services.
        </p>
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
