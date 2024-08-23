// src/components/Calculators.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../components";
import { strategies } from "../config/strategies";

const StrategyTile = ({ title, link, description }) => (
  <Link
    to={link}
    className="bg-white hover:bg-gray-300 transition-colors duration-300 p-6 rounded-lg shadow-md text-center"
  >
    <h3 className="md:text-lg  text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600 text-sm">{description}</p>
  </Link>
);

const Calculators = () => {
  return (
    <div className="bg-white sophia-pro-font min-h-screen">
      <div className="bg-gray-100 text-center text-black py-44">
        <Container>
          <h1 className="md:text-lg  mb-4">Strategy Calculators</h1>
          <p className="md:text-lg">
            Explore and calculate returns for various investment strategies
          </p>
        </Container>
      </div>

      <Container>
        <div className="my-12">
          <h2 className="md:text-lg  text-gray-700 mb-6">Choose a Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies.map((strategy) => (
              <StrategyTile
                key={strategy.id}
                title={strategy.title}
                link={`/calculators/${strategy.id}`}
                description={strategy.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Calculators;
