import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "../components";
import Calculator from "../components/Calculator";
import { strategies } from "../config/strategies";
import Heading from "../components/common/Heading";

const StrategyCalculator = () => {
  const { strategyID } = useParams();
  const strategy = strategies.find((s) => s.id === strategyID);
  // console.log(strategy);
  const getStrategyKey = (strategy) => {
    switch (strategy) {
      case "Quant Growth Momentum":
        return "Vol Adjusted Momentum";
      case "Quant Growth Fund":
        return "QGF";
      case "Naive Momentum":
        return "Naive Momentum";
      case "Nifty 50":
        return "Nifty 50";
      case "Short Flat":
        return "Short Flat";
      case "QGF + Short Flat":
        return "QGF + Short Flat";
      default:
        throw new Error(`Invalid strategy`);
    }
  };
  if (!strategyID) {
    return <div>Strategy not found</div>;
  }
  const strategyKey = getStrategyKey(strategy);

  return (
    <Container>
      <Heading level={1} className="md:text-subheading  my-8">
        {strategyKey} Calculators
      </Heading>
      <Calculator strategy={strategyKey} />
    </Container>
  );
};

export default StrategyCalculator;
