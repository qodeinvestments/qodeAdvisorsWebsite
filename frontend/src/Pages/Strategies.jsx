import React, { useState } from "react";
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

const StrategyCard = ({ strategy, name, description, slug }) => {
  const { loading, error, calculateReturns } = useStrategyData(strategy);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CustomLink
      to={slug}
      className="mb-1 p-2 relative border-brown border hover:bg-white hover:shadow-xl group transition duration-300"
    >
      <div className="transition-all duration-500 transform group-hover:-translate-y-2">
        <Heading
          level={1}
          className="text-heading sm:text-subheading font-black mb-1"
        >
          {name}
        </Heading>
        <Text
          className="text-xs sm:text-body mb-1"
          dangerouslySetInnerHTML={{ __html: description }}
        ></Text>
        <Text className="text-subheading mb-1">3Y CAGR</Text>
        <Text>24%</Text>
      </div>
      <div className="flex justify-between items-end gap-1 sm:gap-1">
        <div className="absolute bottom-0 left-0 right-0 px-1 sm:px-1 py-1 sm:py-1 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <CustomLink to={`/strategies/${slug}`} className="text-black">
            <span className="relative z-10 text-brown">
              Explore <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </CustomLink>
        </div>
      </div>
    </CustomLink>
  );
};

const Strategies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <Container>
      <div className="mx-auto">
        <Heading className="text-heading text-center mt-1 font-black">
          All Strategies
        </Heading>
        <Text className="text-body my-1">
          ONE OF THESE OR 4 COMBINATION OF THESE STRATEGIES WILL HELP YOU REACH
          YOUR FINANCIAL GOAL WITH THE HIGHEST PROBABILITY (BASED ON HOW MUCH
          RISK YOU'RE WILLING TO TAKE)
        </Text>
        <div className="flex flex-col space-y-1">
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
        <Section gray className="p-0">
          <div className="mt-1">
            <Heading className="text-heading">
              MAKING MONEY IN THE STOCK MARKET IS SIMPLE IF YOU FOLLOW THESE
              RULES
            </Heading>
            <Text>SIMPLE NOT EASY</Text>
            <List
              className="list-disc space-y-1 mt-1"
              items={[
                <Text className="text-subheading">DON'T LOOSE MONEY EVER</Text>,
                <Text className="text-subheading">
                  NEVER YAKE DECISION BASED ON EMOTION
                </Text>,
                <Text className="text-subheading">
                  INCREASE YOUR ODDS OF WINNING IN THE LONG TERM
                </Text>,
                <Text className="text-subheading">
                  DON'T TRY TO BE SMART, JUST DON'T BE STUPID
                </Text>,
              ]}
            ></List>
          </div>
        </Section>

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <BookAMeet />
          </Modal>
        )}
      </div>
    </Container>
  );
};

export default Strategies;
