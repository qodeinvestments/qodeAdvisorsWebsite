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
      className="p-3 relative border-brown border transition-all justify-between items-center  flex duration-500 hover:bg-beige hover:border-none hover:shadow-xl group"
    >
      <div className="text-black">
        <Text className="text-subheading font-subheading">{name}</Text>
        <Text
          className="text-xs sm:text-body "
          dangerouslySetInnerHTML={{ __html: description }}
        ></Text>
      </div>
      <div className="text-black">
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
      <Section className="mt-9" withBorder padding="extralarge">
        <div className="mx-auto">
          <Heading className="text-heading text-brown text-center font-heading">
            All Strategies
          </Heading>
          <Text className=" text-center mt-1 mb-5">
            One of these or a combination of these strategies will help you
            reach your financial goal with the highest probability <br /> (based
            on how much risk you're willing to take)
          </Text>
          <div className="flex flex-col gap-2">
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
      {/* <Section
        className="max-w-[1386px] bg-lightBeige mx-auto"
        fullWidth={false}
        // gray
        padding="extralarge"
      >
        <div className="mt-1">
          <Heading className="text-semiheading text-center text-brown">
            Making money in the stock market is <br /> simple if you follow
            these rules
          </Heading>
          <Text className="text-subheading text-center mb-4 font-subheading">
            Simple but not easy{" "}
          </Text>
          <List
            className=" space-y-1 text-center mt-1"
            items={[
              <Text className="text-body font-body">
                Don't lose money ever
              </Text>,
              <Text className="text-body font-body">
                Never take decisions based on emotion
              </Text>,
              <Text className="text-body font-body">
                Increase your odds of winning in the long term
              </Text>,
              <Text className="text-body font-body">
                Don't try to be smart, just don't be stupid
              </Text>,
            ]}
          ></List>
        </div>
      </Section> */}
    </>
  );
};

export default Strategies;
