import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"; // Import Helmet
import { Container } from "../components";
import BookAMeet from "./BookAMeet";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import BlogCard from "../components/BlogCard";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Button from "../components/common/Button";
import CustomLink from "../components/common/CustomLink";
import List from "../components/common/List";
import Section from "../components/container/Section";
import { motion } from "framer-motion";

const StrategyCard = ({ strategy, name, description, slug, cagr }) => {
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="44"
      height="44"
      className="mx-auto sm:mx-0"
    >
      <path
        d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z"
        fill="currentColor"
      />
    </svg>
  );

  const renderCustomLink = () => {
    return (
      <CustomLink
        to={name === "Qode Future Horizons" ? `/blogs/${slug}` : slug}
        className="p-2 sm:p-3 relative  sm:h-auto transition-all group justify-between items-end flex-col sm:flex-row border border-brown flex duration-500 bg-white  hover:bg-beige hover:text-black hover:shadow-xl group"
      >
        <div className="text-black mb-2 sm:mb-0">
          <Heading className="sm:text-subheading text-brown group-hover:text-black mb-18 text-mobileSubHeading font-subheading">
            {name}
          </Heading>
          <Text
            className="text-body"
            dangerouslySetInnerHTML={{ __html: description }}
          ></Text>
        </div>
        {cagr && (
          <div className=" flex flex-col items-end ">
            <Text className="text-body leading-8 text-right">5Y </Text>
            <Text className="text-subheading font-subheading shine leading-none text-brown">
              {cagr}%
            </Text>
          </div>
        )}
      </CustomLink>
    );
  };

  return renderCustomLink();
};

const Strategies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);

  const typingSpeed = 130;
  const deletingSpeed = 55;
  const delayBetweenTexts = 1500;
  const textArray = ["driven by data.", "objective.", "emotion-free."];

  useEffect(() => {
    let timeout;
    if (isTyping) {
      if (currentText.length < textArray[index].length) {
        timeout = setTimeout(() => {
          setCurrentText(textArray[index].slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsTyping(true);
        setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, index]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const strategies = [
    {
      id: "lowvol",
      name: "Qode All Weather",
      slug: "qode-all-weather",
      cagr: "25.7",
      description:
        "<Text class='mb-1'>Lower risk need not  <br class='md:hidden' /> mean lower returns.</Text>",
    },
    {
      id: "qgf",
      name: "Qode Growth Fund",
      slug: "qode-growth-fund",
      cagr: "37.7",

      description:
        "<Text class='mb-1'>Investing in quality businesses <br class='md:hidden' /> for long-term growth.</Text>",
    },
    {
      id: "momentum",
      name: "Qode Velocity Fund",
      slug: "qode-velocity-fund",
      cagr: "43.8",

      description: "<Text class='mb-1'>Capturing the market’s growth.</Text> ",
    },
    {
      id: "futureHorizon",
      name: "Qode Future Horizons",
      slug: "qode-future-horizons",
      description:
        "<Text class='mb-1'>Precision stock picking using data-driven models</Text>",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Qode - Discover Investment Approaches</title>
        <meta
          name="description"
          content="Explore Qode's data-driven strategies, including Growth, Momentum, and Low Volatility Funds. Find the right approach to meet your investment
          goals."
        />
        <meta
          name="keywords"
          content="investment strategies, Qode Growth Fund, Momentum Fund, Low Volatility Fund, data-driven investment, investment
          goals"
        />
        <meta name="author" content="Qode Invest" />
      </Helmet>
      <Section className="mt-9 text-center">
        <Text className="text-subheading font-semibold text-brown ">
          The best investments are <br />
          <div className=" text-beige">
            {currentText} <span className="animate-blink">|</span>
          </div>
        </Text>
      </Section>
      <Section
        className="  sm:max-w-[1386px] mx-auto"
        fullWidth={false}
        padding="normal"
      >
        <div className="mx-auto">
          <Heading
            isItalic
            className="text-mobileHeading sm:text-heading mb-5 text-brown text-center font-heading"
          >
            Our Strategies
          </Heading>
          {/* <Text className=" text-body font-body text-center sm:mt-1 mt-3 mb-5">
            One of these or a combination of these strategies will help you
            reach your financial goal with the highest probability{" "}
            <br className="md:block hidden" /> (based on how much risk you're
            willing to take)
          </Text> */}
          <div className="flex flex-col gap-3">
            {strategies.map((strategy) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy.id}
                name={strategy.name}
                description={strategy.description}
                slug={strategy.slug}
                cagr={strategy.cagr}
              />
            ))}
          </div>

          {isModalOpen && (
            <Modal onClose={closeModal}>
              <BookAMeet />
            </Modal>
          )}
        </div>
      </Section>
    </>
  );
};

export default Strategies;