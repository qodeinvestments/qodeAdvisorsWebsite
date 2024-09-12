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
import Section from "../components/container/Section";
import FundManagers from "../components/FundManagers";
import FAQSection from "../components/FAQ";
import MailerLite from "mailerlite-api-v2-node";
import process from "process";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionContent from "../components/container/SectionContent";
import Button from "../components/common/Button";
import Text from "../components/common/Text";
import Heading from "../components/common/Heading";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://api.qodeinvestments.com/api/mailerlite/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        toast.success(
          "Thank you for subscribing! Check your email for confirmation.",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        setEmail("");
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error("Error subscribing to newsletter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Section>
        <SectionContent>
          <Banner />
        </SectionContent>
      </Section>
      <Section gray>
        <InvestmentStrategies />
      </Section>
      {/* </GrayContainer> */}
      <Section>
        <SectionContent>
          <FundManagers />
        </SectionContent>
      </Section>
      {/* <FAQSection /> */}

      <Section gray>
        <Blogs />
      </Section>
      <Section>
        <SectionContent>
          <div className=" text-gray-900 ">
            <div className="max-w-7xl mx-auto">
              <div className="overflow-hidden">
                <div className="md:flex items-center justify-center">
                  <div className="md:w-1/2 p-8">
                    <Heading level={2} className="text-2xl font-semibold mb-6">
                      Qode Weekly Insights
                    </Heading>
                    <Text className="md:text-subheading text-gray-600">
                      Join thousands of investors receiving our data-driven
                      market insights every week
                    </Text>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
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
                      <Button
                        className="w-full"
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                      >
                        Subscribe Now
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </SectionContent>
      </Section>

      {/* <OurFocus /> */}
    </>
  );
};

export default Home;
