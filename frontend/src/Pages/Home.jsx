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
import Modal from "../components/Modal";
import GrowMoney from "./GrowMoney";

const Home = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Section
        padding="extralarge"
        fullWidth={false}
        className="bg-black max-w-[93%] mt-9 sm:max-w-[1386px] mx-auto"
      >
        <SectionContent className="text-center">
          <Heading className="sm:text-semiheading text-mobileSemiHeading text-beige sm:mb-4 ">
            We manage and grow long term wealth for high-net-worth individuals,
            their families, and businesses.
          </Heading>
          <div className="flex gap-6 justify-center items-center sm:flex-row flex-col">
            <Button
              onClick={openModal}
              className="sm:mt-1 mt-3 bg-beige text-black"
            >
              Grow your money with Qode
            </Button>
            {/* <Button
              to={"/strategies"}
              className="sm:mt-1 mt-3 border-beige border hover:bg-beige hover:text-black duration-300 transition text-body font-body text-beige"
            >
              Strategies
            </Button> */}
          </div>
        </SectionContent>
      </Section>

      {/* <Section
        padding="extralarge"
        fullWidth={false}
        className="bg-black max-w-[93%] sm:max-w-[1386px] mx-auto"
      >
        <SectionContent className="text-center">
          <Text className="sm:text-subheading text-mobileSubHeading text-beige sm:mb-4 font-subheading">
            For the past seven years, we have been managing and growing the{" "}
            <br className="sm:visible hidden" />
            wealth of high-net-worth individuals, their families, and
            businesses.
          </Text>
          <Button
            onClick={openModal}
            className="sm:mt-1 mt-3 bg-beige text-black"
          >
            Grow your money with Qode
          </Button>
        </SectionContent>
      </Section> */}

      <Section
        padding="extralarge"
        className="max-w-[93%] sm:max-w-[1386px] bg-lightBeige mx-auto"
        fullWidth={false}
      >
        <SectionContent>
          <InvestmentStrategies />
        </SectionContent>
      </Section>
      {/* <Section padding="extralarge" className="text-center" withBorder={true}>
        <SectionContent>
          <Heading className="sm:text-semiheading text-mobileSemiHeading text-brown mb-4">
            Picking the right Portfolio Management Service (PMS)  <br className="sm:visible hidden" /> is like
            picking the right stock
          </Heading>
          <Text className="mb-1 text-subheading">
            How do you know if you have picked the right one?
          </Text>
          <Button className="bg-beige text-black  px-3 py-18">
            Things to consider to pick the right PMS
          </Button>
        </SectionContent>
      </Section> */}

      <Section
        padding="extralarge"
        className="bg-black max-w-[93%] sm:max-w-[1386px] mx-auto"
      >
        {/* <SectionContent> */}
        <FundManagers />
        {/* </SectionContent> */}
      </Section>

      {/* <Section gray withBorder={true} innerBorder={true}>
        <SectionContent>
          <Blogs />
        </SectionContent>
      </Section> */}

      <Section padding="extralarge" withBorder={true}>
        <SectionContent>
          <div className="">
            <div className="md:flex flex-col items-center text-center gap-2 justify-center">
              <div className="md:w-1/2 ">
                <Text className="sm:text-subheading text-mobileSubHeading text-black mb-3">
                  Subscribe to know more about our investment strategies, style
                  and principles.
                </Text>
              </div>
              <div className="md:w-1/2 ">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      required
                      className="w-full px-2 py-18 border border-beige focus:outline-none focus:ring-2 focus:ring-brown"
                    />
                  </div>
                  <div className="">
                    <Button
                      className="  bg-beige text-black"
                      type="submit"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      Subscribe
                    </Button>
                  </div>
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
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <GrowMoney />
        </Modal>
      )}
    </div>
  );
};

export default Home;
