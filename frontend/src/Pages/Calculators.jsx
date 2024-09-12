// src/components/Calculators.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../components";
import { strategies } from "../config/strategies";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import CustomLink from "../components/common/CustomLink";

const StrategyTile = ({ title, link, description }) => (
  <CustomLink
    to={link}
    className="bg-white hover:bg-gray-300 transition-colors duration-300 p-6 rounded-lg shadow-md text-center"
  >
    <Heading level={3} className="md:text-subheading  text-gray-800">
      {title}
    </Heading>
    <Text className="mt-2 text-gray-600 text-xs">{description}</Text>
  </CustomLink>
);

const Calculators = () => {
  return (
    <div className="bg-white  min-h-screen">
      <div className="bg-gray-100 text-center text-black py-44">
        <Container>
          <Heading level={1} className="md:text-subheading  mb-4">
            Strategy Calculators
          </Heading>
          <Text className="md:text-subheading">
            Explore and calculate returns for various investment strategies
          </Text>
        </Container>
      </div>

      <Container>
        <div className="my-12">
          <Heading level={2} className="md:text-subheading  text-gray-700 mb-6">
            Choose a Strategy
          </Heading>
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
