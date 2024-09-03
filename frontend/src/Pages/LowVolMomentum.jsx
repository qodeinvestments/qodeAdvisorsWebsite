import React from "react";
import {
  faList,
  faBolt,
  faChartLine,
  faCheckCircle,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import StrategyComponent from "../components/Strategy";

const LowVolMomentum = () => {
  const strategyData = {
    title: "Qode Low Volatility Fund",
    description:
      "<Text class='mb-4  '>Slow but Steady.</Text><Text class=''>This strategy invests in the 30 most stable stocks in the market. This strategy outperforms the Index with considerably lower risk.</Text>",
    strategyCode: "LVF",
    strategySlug: "low-vol-momentum",
    pptLink: "/Quant Growth Fund Feb.pdf",
    whitePaperLink: "", // Add the white paper link when available
    steps: [
      {
        title: "Step 1: Universe of the Stocks",
        description:
          "The investible universe defines all the stocks you can potentially choose from. Here, it's narrowed to small and mid-cap companies. Liquidity screens are then applied to ensure these chosen stocks are actively traded.",
        icon: faCheckCircle,
      },
      {
        title: "Step 2: Profitability Screener",
        description:
          "A tool used to filter stocks based on their financial performance, focusing on profitability.",
        icon: faChartLine,
      },
      {
        title: "Step 3: Selecting top performers",
        description:
          "After applying our profitability filter to all the companies, we determine a composite rank for each. From these rankings, we identify the 30 strongest performers.",
        icon: faBolt,
      },
      {
        title: "Step 4: Annual Rebalancing",
        description:
          "Portfolio rebalancing is like course correction for your investments. Done annually, it ensures your asset allocation stays on track.",
        icon: faShieldAlt,
      },
    ],
    faqItems: [
      {
        question:
          "What is the type of stocks in which quant growth fund invests?",
        answer:
          "Quant growth funds typically invest in stocks of companies with strong growth potential.",
      },
      {
        question: "What are the market cap of stocks held?",
        answer:
          "The market capitalization of stocks held in a quant growth fund typically ranges from 500 crore to 20,000 crore.",
      },
      {
        question:
          "Are there any sectors or types of companies Quant Growth fund avoids?",
        answer:
          "Quant growth funds skip volatile sectors like trading, banking and financials, and focuses on profitable companies with long-term growth potential.",
      },
      {
        question:
          "How does the Quant Growth Fund differ from traditional funds?",
        answer: "Quant growth funds are driven by algorithms and data",
      },
      {
        question:
          "What are the benefits of investing in the Quant Growth Fund?",
        answer:
          "Quant Growth Fund, a successful and diversified investment option, offers consistent winners and outperformance. By focusing on annual rebalancing, it maintains diversification and lowers costs, making it an attractive choice for investors.",
      },
    ],
  };

  return <StrategyComponent strategyData={strategyData} />;
};

export default LowVolMomentum;
