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
      className="mb-1 p-2 relative border-brown border hover:bg-white group transition duration-300"
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
          One of these or 4 combination of these strategies will help you reach
          your financial goal with the highest probability (based on how much
          risk you're willing to take)
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
              Making money in the stock market is simple if you follow these
              rules
            </Heading>
            <Text>Simple not easy </Text>
            <List
              className="list-disc space-y-1 mt-1"
              items={[
                <Text className="text-subheading">Don't lose money ever</Text>,
                <Text className="text-subheading">
                  Never take decisions based on emotion
                </Text>,
                <Text className="text-subheading">
                  Increase your odds of winning in the long term
                </Text>,
                <Text className="text-subheading">
                  Don't try to be smart, just don't be stupid
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
