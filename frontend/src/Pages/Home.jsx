import React, { useEffect, useState } from "react";
import { Banner, Blogs, InvestmentStrategies } from "../components/index";
import { Helmet } from "react-helmet";
import Text from "../components/common/Text";
import Section from "../components/container/Section";
import InvestmentPrinciples from "../components/InvestmentPrinciples";


const Home = () => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);

  // Add scroll handling useEffect
  useEffect(() => {
    // Function to handle scroll
    const scrollToSection = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # from the hash
        const sectionId = hash.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          // Add a small delay to ensure the page is fully loaded
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Call the function when component mounts
    scrollToSection();

    // Add event listener for hash changes
    window.addEventListener('hashchange', scrollToSection);

    // Cleanup
    return () => window.removeEventListener('hashchange', scrollToSection);
  }, []);

  const typingSpeed = 130;
  const deletingSpeed = 55;
  const delayBetweenTexts = 1500;
  const textArray = [
    "driven by data.",
    "objective.",
    "emotion-free.",
    "carried out by Qode.",
  ];

  useEffect(() => {
    let timeout;
    if (isTyping) {
      if (currentText.length < textArray[index].length) {
        timeout = setTimeout(() => {
          setCurrentText((prevText) =>
            textArray[index].slice(0, prevText.length + 1)
          );
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText((prevText) => prevText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsTyping(true);
        setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, index]);

  return (
    <div>
      <Helmet>
        <title>Qode - Grow your wealth with data-driven strategies</title>
        <meta
          name="description"
          content="At Qode Invest, we help individuals grow their wealth using data-driven investment strategies with a proven track record. Learn more about our investing principles and strategies."
        />
        <meta
          name="keywords"
          content="Qode Invest, data-driven investment, wealth management, quant models, stock market, investment strategies"
        />
        <meta name="author" content="Qode Invest" />
        <link rel="canonical" href="https://www.qodeinvest.com/" />
      </Helmet>

      <Banner />
      <Section padding="none" className="my-7 text-center">
        <Text className="text-subheading font-heading text-brown">
          The best investments are <br />
          <div className=" text-beige">
            {currentText} <span className="animate-blink">|</span>
          </div>
        </Text>
      </Section>
      <Section padding="extralarge" className="mt-5 bg-lightBeige">
        <InvestmentStrategies />
      </Section>
      <Section padding="none" className="mt-7 sm:mt-5">
        <Blogs />
      </Section>
      <Section padding="none" fullWidth className="mt-8 sm:mt-5">
        <InvestmentPrinciples />
      </Section>
      {/* <Section id="newsletter-section" padding="none" className="mb-6">
        <Newsletter />
      </Section> */}
      {/* <Section padding="none" fullWidth className="mt-8 bg-lightBeige/50 sm:mt-5">
        <SendEmailForm />
      </Section> */}
    </div>
  );
};

export default Home;