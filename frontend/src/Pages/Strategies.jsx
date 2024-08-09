import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStrategyData from "../components/hooks/strategyCagr";
import { Container } from "../components";
import BookAMeet from "./BookAMeet";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const StrategyCard = ({ strategy, name, description, slug }) => {
  const { loading, error, calculateReturns } = useStrategyData(strategy);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const periods = ["1M", "3M", "6M", "1Y", "3Y", "5Y"];

  return (
    <Link
      to={slug}
      className="mb-20 p-14 pb-20 relative bg-[#fafafa] hover:bg-[#fff] hover:shadow-xl group transition duration-300"
    >
      <div className="transition-all duration-500  transform group-hover:-translate-y-4 ">
        <h1 className="text-2xl  font-black sophia-pro-font mt-4">{name}</h1>
        <p
          className="text-lg leading-[2.5rem]"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
      <div className="flex flex-row justify-between items-end gap-16">
        {/* {periods.map((period) => (
      <div key={period} className="flex flex-col mt-9">
        <h1 className="text-xl sophia-pro-font">{period}</h1>
        <p className="text-xl mt-5">{calculateReturns(period)}</p>
      </div>
    ))} */}

        <div className="absolute bottom-0 left-0 right-0 px-14 py-10 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <Link to={"/strategies/quant-growth-momentum"} className="text-black">
            <span className="relative z-10 text-red-600">
              Explore <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </Link>
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
        "<p class='mb-4'>Invest in quality business. Get quality results.</p>",
    },
    {
      id: "momentum",
      name: "High-Return & Churn Fund",
      slug: "quant-growth-momentum",
      description: "<p class='mb-4'>Buy high sell higher.</p> ",
    },
    {
      id: "lowvol",
      name: "Steady Fund",
      slug: "low-vol-momentum",
      description: "<p class='mb-4'>Slow but Steady.</p>",
    },
  ];

  // const strategies = [
  //   {
  //     id: "qgf",
  //     name: "Quality Fund",
  //     slug: "quant-growth-fund",
  //     description:
  //       "<p class='mb-4'>Invest in quality business. Get quality results.</p>This strategy invests in 30 Quality businesses. (Quality Business - A company that generates a high return on invested capital). Principle - In the long run the stock price always matches the business performance.",
  //   },
  //   {
  //     id: "momentum",
  //     name: "High-Return & Churn Fund",
  //     slug: "quant-growth-momentum",
  //     description:
  //       "<p class='mb-4'>Buy high sell higher.</p>  This strategy invests in 30 businesses whose stock price has grown significantly and sells it before they start falling. Principle - The stock price tells the story before the actual story unfolds.",
  //   },
  //   {
  //     id: "lowvol",
  //     name: "Steady Fund",
  //     slug: "low-vol-momentum",
  //     description:
  //       "<p class='mb-4'>Slow but Steady.</p>This strategy invests in the 30 most stable stocks in the market. This strategy outperforms the Index with considerably lower risk.",
  //   },
  // ];

  return (
    <Container>
      <div className="mx-auto p-4 md:p-14">
        <p className="text-xl sm:text-xl md:text-xl lg:text-5xl sophia-pro-font mt-10 sm:mt-16 md:mt-20 font-black mb-6 md:mb-4 ">
          All Strategies
        </p>
        <p className="text-lg sm:text-xl md:text-xl lg:text-xl minion-pro-font font-thin mb-8 md:mb-20 ">
          One of these strategies will help you in reaching your financial goal
          based on how much risk you’re willing to take.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 sophia-pro-font mx-auto my-10 md:my-20">
          {strategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy.id}
              name={strategy.name}
              description={strategy.description}
              slug={strategy.slug}
            />
          ))}

          <div className="text-center mt-8 md:mt-10">
            <p className="my-4 text-xl md:text-xl lg:text-xl">
              Not sure which strategy is right for you? <br /> Sign Up to track
              our live portfolio.
            </p>
            <Link target="_blank" to={"https://dashboard.qodeinvest.com"}>
              <button className="bg-red-600 text-lg sophia-pro-font md:text-xl lg:text-xl text-white py-3 md:py-4 lg:py-3 px-6 md:px-8 lg:px-6 mt-5 hover:bg-red-500 transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
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
