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
const Home = () => {
  return (
    <>
      <Banner />
      <InvestmentStrategies />
      <Container>
        <Blogs />
      </Container>
      <OurFocus />
    </>
  );
};

export default Home;
