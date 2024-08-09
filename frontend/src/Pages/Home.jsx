import React, { useEffect, useState } from "react";
import {
  Banner,
  Container,
  WhatWeDo,
  InvestmentProcess,
  Blogs,
  InvestmentStrategies,
  OurFocus,
  GrayContainer,
} from "../components/index";
import { BackgroundBeams } from "../components/ui/background-beams";
import ChartComponent from "../components/Charts/LightWeightChart";
import FundManagers from "../components/FundManagers";
import FAQSection from "../components/FAQ";
import MailerLite from "mailerlite-api-v2-node";
import process from "process";
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

const benefits = [
  "In-depth market trend analysis",
  "Exclusive quantitative research insights",
  "Emerging investment opportunities",
  "Expert commentary on global finance",
  "Financial literacy content",
  "Invitations to exclusive events",
];

const Home = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("localhost:8000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscriptionStatus("success");
        setEmail("");
      } else {
        setSubscriptionStatus("error");
      }
    } catch (error) {
      setSubscriptionStatus("error");
      console.error("Error subscribing to newsletter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Container>
        <Banner />
      </Container>
      <GrayContainer>
        <Container>
          <InvestmentStrategies />
        </Container>
      </GrayContainer>
      <Container>
        <FundManagers />
      </Container>
      {/* <FAQSection /> */}
      <GrayContainer>
        <Container>
          <Blogs />
        </Container>
      </GrayContainer>
      <Container>
        <div className="p-14 sophia-pro-font text-gray-900  my-20 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* <div className="my-10">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Qode Weekly Insights
            </h1>
            <div className="text-center mb-12">
              <p className="text-xl text-gray-700 mb-2">
                Harness the power of quantitative analysis for smarter investing
              </p>
              <p className="text-lg text-gray-600">
                Join thousands of investors receiving our data-driven market
                insights every week
              </p>
            </div>
          </div> */}
            <div className="  overflow-hidden">
              <div className="md:flex items-center justify-center">
                <div className="md:w-1/2 p-8">
                  <h2 className="text-2xl font-semibold mb-6">
                    Qode Weekly Insights
                  </h2>
                  <p className="text-xl text-gray-600">
                    Join thousands of investors receiving our data-driven market
                    insights every week
                  </p>
                </div>
                <div className="md:w-1/2 p-8   ">
                  {/* <h2 className="text-xl mb-6">Subscribe to Our Newsletter</h2> */}
                  {!subscribed ? (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        {/* <label
                        htmlFor="email"
                        className="block text-sm text-gray-100 mb-2"
                      >
                        Email Address
                      </label> */}
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Best Email"
                          required
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 px-4 hover:bg-red-500 transition duration-300"
                      >
                        Subscribe Now
                      </button>
                    </form>
                  ) : (
                    <div className="text-green-500">
                      Thank you for subscribing! Check your email for
                      confirmation.
                    </div>
                  )}
                  {/* <p className="mt-4 text-sm text-gray-300">
                  Join thousands of investors receiving our weekly market
                  insights.
                </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* <OurFocus /> */}
    </>
  );
};

export default Home;
