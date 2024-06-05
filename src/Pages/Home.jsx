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
