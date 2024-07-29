import React from "react";
import {
  Banner,
  Container,
  WhatWeDo,
  InvestmentProcess,
  Blogs,
  InvestmentStrategies,
  OurFocus,
} from "../components/index";
import { BackgroundBeams } from "../components/ui/background-beams";
import ChartComponent from "../components/Charts/LightWeightChart";
import FundManagers from "../components/FundManagers";
import FAQSection from "../components/FAQ";
const chartData = [
  { time: "2022-01-01", value: 100 },
  { time: "2022-01-02", value: 110 },
  { time: "2022-01-03", value: 115 },
  { time: "2022-01-04", value: 130 },
  { time: "2022-01-05", value: 120 },
];

const chartColors = {
  backgroundColor: "white",
  lineColor: "#2962FF",
  textColor: "black",
  areaTopColor: "#2962FF",
  areaBottomColor: "rgba(41, 98, 255, 0.28)",
};

const Home = () => {
  return (
    <>
      <Banner />
      <Banner />
      <Container>
        <InvestmentStrategies />
        <FundManagers />
        <FAQSection />
        {/* <Blogs /> */}
      </Container>
      {/* <OurFocus /> */}
    </>
  );
};

export default Home;
