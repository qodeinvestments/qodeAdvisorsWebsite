import {
  faCheckCircle,
  faChartLine,
  faBolt,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import StrategyComponent from "../components/Strategy";

export const quantMomentumFundData = {
  title: "Qode Momentum Fund",
  description:
    "<Text class='mb-4  '>Buy high sell higher.</Text> <Text class=''> This strategy invests in 30 businesses whose stock price has grown significantly and sells it before they start falling. Principle - The stock price tells the story before the actual story unfolds.</Text>",
  strategyCode: "QMF",
  strategySlug: "quant-growth-momentum",
  pptLink: "/path-to-your-ppt-file.pptx",
  whitePaperLink: "",
  steps: [
    {
      title: "Step 1: Screening of the stocks",
      description:
        "We first look at the six months average rolling market cap and turnover for each security. We then use composite ranking of 50% weightage to each factor and choose the top 500 for the back test.",
      icon: faCheckCircle,
    },
    {
      title: "Step 2: How do we use momentum?",
      description:
        "Rate of Change is essentially the simplest form of momentum indicator which tells how much has a particular stock given return in a particular period of time. We ideally want to buy stocks that are in momentum and among them the one that have the highest momentum. This is used to compare stocks in the universe and rank based on pure momentum.",
      icon: faChartLine,
    },
    {
      title: "Step 3: How do we use volatility?",
      description:
        "This is a variation to the naive momentum where aim to buy stocks which have a high momentum but a lower volatility. The method used for this is to divided the rate of change of a particular stock with it's standard deviation during the same lookback period. All stocks are ranked based on this parameter and we buy the top 30 stocks.",
      icon: faBolt,
    },
    {
      title: "Step 4: Risk Management",
      description:
        "Risk management is a crucial step where we ensure the portfolio is balanced and diversified. We regularly review the stocks and make adjustments as necessary to maintain optimal risk levels.",
      icon: faShieldAlt,
    },
  ],
  faqItems: [
    {
      question:
        "When is it a good time to invest in the Quant Growth Momentum?",
      answer:
        "There isn't a perfect moment to jump into a Quant Growth Momentum strategy. Instead, a Systematic Investment Plan (SIP) is your best bet. By consistently investing smaller amounts at regular intervals, you average out market fluctuations. This approach, historically, has helped investors outperform the benchmark and achieve superior long-term returns.",
    },
    {
      question:
        "How does the Quant Growth Momentum differ from traditional funds?",
      answer:
        "Unlike traditional funds, Quant Growth Momentum focuses on growth potential and not just company size. It actively buys and sells (high churn) based on quantitative signals, aiming to capture rising trends and avoid falling ones (opposite of traditional value investing). This strategy can be more volatile but has the potential for outperformance",
    },
    {
      question: "Is Quant Growth Momentum suitable for all investors?",
      answer:
        "Quant Growth Momentum might not be ideal for everyone. Investors who dislike high volatility or frequent portfolio changes (churn) may find this strategy stressful. It's best suited for those comfortable with potential ups and downs and a long-term investment horizon",
    },
    {
      question:
        "What is the risk level associated with a Quant Growth Momentum Fund?",
      answer: "High Risk Fund",
    },
  ],
};

// import React from "react";
// import StrategyComponent from "./StrategyComponent";
// import { quantMomentumFundData } from "./quantMomentumFundData";
const MomentumTabs = () => {
  return <StrategyComponent strategyData={quantMomentumFundData} />;
};

export default MomentumTabs;
