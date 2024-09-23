import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStrategyData from "../components/hooks/strategyCagr";
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

const StrategyCard = ({ strategy, name, description, slug }) => {
  const { loading, error, calculateReturns } = useStrategyData(strategy);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <CustomLink
      to={slug}
      className="p-3 relative  transition-all justify-between items-center flex-col sm:flex-row  flex duration-500 bg-white text-white hover:border-none  hover:bg-beige hover:shadow-xl group"
    >
      <div className="text-black">
        <Text className="sm:text-subheading text-mobileSubHeading font-subheading">
          {name}
        </Text>
        <Text
          className="text-body "
          dangerouslySetInnerHTML={{ __html: description }}
        ></Text>
      </div>
      <div className="text-black self-end sm:self-center ">
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
  );
};

const Strategies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);

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
      id: "qgf",
      name: "Qode Growth Fund",
      slug: "quant-growth-fund",
      description:
        "<Text class='mb-1'>Invest in quality business. Get quality results.</Text>",
    },
    {
      id: "momentum",
      name: "Qode Momentum Fund",
      slug: "quant-growth-momentum",
      description: "<Text class='mb-1'>Buy high sell higher.</Text> ",
    },
    {
      id: "lowvol",
      name: "Qode Low Volatility Fund",
      slug: "low-vol-momentum",
      description: "<Text class='mb-1'>Slow but Steady.</Text>",
    },
  ];

  return (
    <>
      <Section padding="extralarge" className="mt-9 mb-1 text-center">
        <Heading className="text-semiheading font-semibold text-brown ">
          The best investments are <br />
          <div className=" ">
            {currentText} <span className="animate-blink">|</span>
          </div>
        </Heading>
      </Section>
      <Section
        className="sm:mt-5 bg-lightBeige sm:max-w-[1386px] mx-auto"
        fullWidth={false}
        padding="extralarge"
      >
        <div className="mx-auto">
          <Heading className="text-mobileHeading sm:text-heading text-brown text-center font-heading">
            Our Strategies
          </Heading>
          <Text className=" text-body font-body text-center sm:mt-1 mt-3 mb-5">
            One of these or a combination of these strategies will help you
            reach your financial goal with the highest probability <br /> (based
            on how much risk you're willing to take)
          </Text>
          <div className="flex flex-col gap-3">
            {strategies.map((strategy) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy.id}
                name={strategy.name}
                description={strategy.description}
                slug={strategy.slug}
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
