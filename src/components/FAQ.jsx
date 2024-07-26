import React, { useState } from "react";

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
    <div className="container mx-auto px-4 py-16 graphik-font-regular bg-white">
      <div className="flex flex-col md:flex-row border border-black">
        <div className="md:w-1/3 border-r border-black p-8 flex items-center justify-center">
          <h2 className="text-6xl font-bold transform -rotate-90 md:rotate-0">
            FAQ
          </h2>
        </div>
        <div className="md:w-2/3 p-8">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border border-black">
              <button
                className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <span className="text-2xl">
                  {openAccordion === index ? "v" : "^"}
                </span>
              </button>
              {openAccordion === index && (
                <div className="p-4 border-t border-black">
                  <p>{faq.answer}</p>
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
