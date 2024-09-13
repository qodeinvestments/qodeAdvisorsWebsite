import React, { useState } from "react";
import { Banner, Blogs, InvestmentStrategies } from "../components/index";
import FundManagers from "../components/FundManagers";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/common/Button";
import Text from "../components/common/Text";
import Heading from "../components/common/Heading";
import Section from "../components/container/Section";
import SectionContent from "../components/container/SectionContent";

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
    <div className="max-w-7xl mx-auto font-body text-body">
      <Section withBorder={true} className="mt-5">
        <SectionContent>
          <Banner />
        </SectionContent>
      </Section>

      <Section className="bg-black">
        <SectionContent>
          <Heading className="text-subheading font-subheading">
            AND NOW SINCE THE PAST 7 YEARS WE HAVE BEEN MANAGING & GROWING
            WEALTH OF HIGH NETWORTH INDIVIDUALS, THEIR FAMILIES & BUSINESSES
          </Heading>
          <Button className="mt-1">Start Investing With Qode</Button>
        </SectionContent>
      </Section>

      <Section gray withBorder={true}>
        <SectionContent>
          <InvestmentStrategies />
        </SectionContent>
      </Section>
      <Section withBorder={true}>
        <SectionContent>
          <Heading className="text-heading">
            PICKING THE RIGHT PORTFOLIO MANAGEMENT SERVICE IS LIKE PICKING THE
            RIGHT STOCK
          </Heading>
          <Text className="text-subheading">
            HOW DO YOU KNOW IF YOU HAVE PICKED THE RIGHT ONE
          </Text>
        </SectionContent>
      </Section>

      <Section className="bg-black">
        {/* <SectionContent> */}
        <FundManagers />
        {/* </SectionContent> */}
      </Section>

      {/* <Section gray withBorder={true} innerBorder={true}>
        <SectionContent>
          <Blogs />
        </SectionContent>
      </Section> */}

      <Section withBorder={true} innerBorder={true}>
        <SectionContent>
          <div className="text-text">
            <div className="md:flex items-center justify-center">
              <div className="md:w-1/2 p-2">
                <Heading
                  level={2}
                  className="text-subheading font-heading mb-2"
                >
                  Qode Weekly Insights
                </Heading>
                <Text className="text-body text-text-secondary">
                  Join thousands of investors receiving our data-driven market
                  insights every week
                </Text>
              </div>
              <div className="md:w-1/2 p-2">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Best Email"
                      required
                      className="w-full px-2 py-1 border border-beige focus:outline-none focus:ring-2 focus:ring-brown"
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
        </SectionContent>
      </Section>

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
  );
};

export default Home;
