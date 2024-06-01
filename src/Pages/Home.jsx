import React from "react";
import {
  Banner,
  Container,
  WhatWeDo,
  InvestmentProcess,
  Blogs,
  InvestmentStrategies,
} from "../components/index";
const Home = () => {
  return (
    <div>
        <Banner />
      <Container>
        {/* <WhatWeDo /> */}
        {/* <InvestmentProcess /> */}
      </Container>
      <InvestmentStrategies />
      <Container>
        <Blogs />
      </Container>
    </div>
  );
};

export default Home;
