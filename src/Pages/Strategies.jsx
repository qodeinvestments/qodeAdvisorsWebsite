import React from "react";
import { Link } from "react-router-dom";
import useStrategyData from "../components/hooks/strategyCagr";
import { Container } from "../components";

const StrategyCard = ({ strategy, name, description, slug }) => {
  const { loading, error, calculateReturns } = useStrategyData(strategy);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const periods = ["1M", "3M", "6M", "1Y", "3Y", "5Y"];

  return (
    <Link to={slug} className="block border-black border p-14 relative">
      <h1 className="text-6xl playfair-display-font my-4">{name}</h1>
      <p
        className="text-4xl mb-3 "
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
      <div className="flex flex-row justify-between items-end gap-20">
        {periods.map((period) => (
          <div key={period} className="flex flex-col mt-9">
            <h1 className="text-4xl playfair-display-font">{period}</h1>
            <p className="text-5xl mt-5">{calculateReturns(period)}</p>
          </div>
        ))}
        <div className="py-5 px-10 mt-5 text-center flex justify-between items-center border border-black hover:bg-white/10 transition duration-300 text-black hover:before:bg-black relative h-[50px] overflow-hidden before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full">
          <span className="relative z-10">Know more</span>
        </div>
      </div>
    </Link>
  );
};

const Strategies = () => {
  const strategies = [
    {
      id: "qgf",
      name: "Quality Fund",
      slug: "quant-growth-fund",
      description:
        "This strategy invests in a portfolio of 30 businesses that generate high return on their capital employed. <br><i>The principle - In the long run the stock price always matches the business performance.</i>",
    },
    {
      id: "momentum",
      name: "High-Return Fund",
      slug: "quant-growth-momentum",
      description:
        "A strategy that invests in 30 businesses that have significantly grown in terms of stock price. and reinvest before they start falling. <br><i>The Principle - The stock price tells the story before the actual story unfolds.</i>",
    },
    {
      id: "lowvol",
      name: "Steady Fund",
      slug: "low-vol-momentum",
      description:
        "Our strategies are designed to help you achieve your financial goals. We offer a range of strategies to suit your investment needs.",
    },
  ];

  return (
    <Container>
      <div className="flex flex-col gap-10 graphik-font-regular mx-auto my-20">
        {strategies.map((strategy) => (
          <StrategyCard
            key={strategy.id}
            strategy={strategy.id}
            name={strategy.name}
            description={strategy.description}
            slug={strategy.slug}
          />
        ))}
        <div className="text-center">
          <Link
            to={"/open-account"}
            className="bg-black text-white text-xl text-center px-5 py-3"
          >
            Open Account With Qode
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Strategies;
