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
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <div className="sophia-pro-font text-gray-900 my-5 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="overflow-hidden">
              <div className="md:flex items-center justify-center">
                <div className="md:w-1/2 p-8">
                  <h2 className="text-2xl font-semibold mb-6">
                    Qode Weekly Insights
                  </h2>
                  <p className="md:text-lg text-gray-600">
                    Join thousands of investors receiving our data-driven market
                    insights every week
                  </p>
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
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 text-white py-2 px-4 hover:bg-red-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Subscribing...
                        </>
                      ) : (
                        "Subscribe Now"
                      )}
                    </button>
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
      </Container>

      {/* <OurFocus /> */}
    </>
  );
};

export default Home;
