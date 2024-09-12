import React, { useState } from "react";
import Text from "./common/Text";
import Heading from "./common/Heading";

const FAQSection = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const faqs = [
    {
      question: "What is Qode Invest?",
      answer:
        "Qode Invest is a data-driven investment management firm that leverages quantitative analysis to make informed investment decisions in the Indian equity market.",
    },
    {
      question: "How does your Portfolio Management Service work?",
      answer:
        "Our PMS uses advanced algorithms and data analysis to identify high-potential stocks in the Indian market. We actively manage your portfolio to optimize returns while managing risk.",
    },
    {
      question: "What are the minimum investment requirements?",
      answer:
        "The minimum investment for our PMS is ₹50 lakhs, as per SEBI regulations. This allows us to create a diversified portfolio tailored to your investment goals.",
    },
    {
      question: "How can I track my investments?",
      answer:
        "We provide a secure online portal where you can track your investments in real-time. Additionally, we send monthly performance reports and conduct quarterly review calls.",
    },
  ];

  const toggleAccordion = (index) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }
  };

  return (
    <div className="container mx-auto  py-16  bg-white">
      <div className="flex flex-col md:flex-row ">
        <div className="md:w-1/3 border-r border-black p-8 ">
          <Heading
            level={2}
            className="text-4xl  transform -rotate-90 md:rotate-0"
          >
            FAQ
          </Heading>
        </div>
        <div className="md:w-2/3 p-8">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 ">
              <button
                className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
                onClick={() => toggleAccordion(index)}
              >
                <span className="md:text-subheading">{faq.question}</span>
                <span className="">{openAccordion === index ? "v" : "^"}</span>
              </button>
              {openAccordion === index && (
                <div className="p-4 md:text-subheading border-t border-black">
                  <Text>{faq.answer}</Text>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
