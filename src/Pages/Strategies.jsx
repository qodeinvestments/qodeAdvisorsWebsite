import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStrategyData from "../components/hooks/strategyCagr";
import { Container } from "../components";
import BookAMeet from "./BookAMeet";
import Modal from "../components/Modal";

const StrategyCard = ({ strategy, name, description, slug }) => {
  const { loading, error, calculateReturns } = useStrategyData(strategy);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const periods = ["1M", "3M", "6M", "1Y", "3Y", "5Y"];

  return (
    <Link
      to={slug}
      className="block border-black border mb-20 p-14 pb-20 relative"
    >
      <h1 className="text-6xl playfair-display-font mt-4">{name}</h1>
      <p
        className="text-4xl  leading-[2.5rem]  "
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
      <div className="flex flex-row justify-between items-end gap-16">
        {periods.map((period) => (
          <div key={period} className="flex flex-col mt-9">
            <h1 className="text-4xl playfair-display-font">{period}</h1>
            <p className="text-5xl mt-5">{calculateReturns(period)}</p>
          </div>
        ))}

        <div className="py-5 px-10 mt-5 text-center flex justify-between items-center border border-black hover:bg-white/10 transition duration-300 text-black hover:before:bg-black relative h-[50px] overflow-hidden before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full">
          <span className="relative z-10 text-3xl">Know more</span>
        </div>
      </div>
    </Link>
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
      name: "Quality Fund",
      slug: "quant-growth-fund",
      description:
        "<p class='mb-4'>Invest in quality business. Get quality results.</p>This strategy invests in 30 Quality businesses. (Quality Business - A company that generates a high return on invested capital). Principle - In the long run the stock price always matches the business performance.",
    },
    {
      id: "momentum",
      name: "High-Return & Churn Fund",
      slug: "quant-growth-momentum",
      description:
        "<p class='mb-4'>Buy high sell higher.</p>  This strategy invests in 30 businesses whose stock price has grown significantly and sells it before they start falling. Principle - The stock price tells the story before the actual story unfolds.",
    },
    {
      id: "lowvol",
      name: "Steady Fund",
      slug: "low-vol-momentum",
      description:
        "<p class='mb-4'>Slow but Steady.</p>This strategy invests in the 30 most stable stocks in the market. This strategy outperforms the Index with considerably lower risk.",
    },
  ];

  return (
    <Container>
      <div className="flex flex-col  graphik-font-regular mx-auto my-20">
        <p className="text-6xl text-center mb-5">All Strategies</p>
        <p className="text-4xl text-center mb-20">
          One of these strategies will help you in reaching your financial goal
          based on how much risk you’re willing to take.
        </p>
        {strategies.map((strategy) => (
          <StrategyCard
            key={strategy.id}
            strategy={strategy.id}
            name={strategy.name}
            description={strategy.description}
            slug={strategy.slug}
          />
        ))}

        <div className="text-center mt-10">
          <p className="my-4 text-4xl">
            I want to speak to fund manager before investing.
          </p>
          <button
            onClick={openModal}
            className="bg-black text-4xl text-white py-5 px-10 mt-5 hover:bg-gray-800 transition-colors "
          >
            Talk to a Fund Manager
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <BookAMeet />
        </Modal>
      )}
    </Container>
  );
};

export default Strategies;
