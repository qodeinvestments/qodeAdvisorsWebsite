import React, { useEffect, useState } from "react";
import { Banner, Blogs, InvestmentStrategies } from "../components/index";
import FundManagers from "../components/FundManagers";
import { Helmet } from "react-helmet"; // Import Helmet
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/common/Button";
import Text from "../components/common/Text";
import Section from "../components/container/Section";
import Modal from "../components/Modal";
import GrowMoney from "./GrowMoney";
import ParallaxSection from "../components/ParallexSection";

const Home = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const typingSpeed = 130;
  const deletingSpeed = 55;
  const delayBetweenTexts = 1500;
  const textArray = [
    "driven by data.",
    "objective.",
    "emotion-free.",
    "carried out by Qode.",
  ];

  useEffect(() => {
    let timeout;
    if (isTyping) {
      if (currentText.length < textArray[index].length) {
        timeout = setTimeout(() => {
          setCurrentText(textArray[index].slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsTyping(true);
        setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, index]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Helmet>
        <title>
          Qode Advisors LLP - Grow Your Wealth with Data-Driven Strategies
        </title>
        <meta
          name="description"
          content="At Qode Invest, we help individuals grow their wealth using data-driven investment strategies with a proven track record. Learn more about our investing principles and strategies."
        />
        <meta
          name="keywords"
          content="Qode Invest, data-driven investment, wealth management, quant models, stock market, investment strategies"
        />
        <meta name="author" content="Qode Invest" />
      </Helmet>
      <Banner />

      <Section padding="none" className="my-7 text-center">
        <Text className="text-subheading font-heading  text-brown ">
          The best investments are <br />
          <div className=" ">
            {currentText} <span className="animate-blink">|</span>
          </div>
        </Text>
      </Section>

      <Section
        padding="extralarge"
        className="max-w-[93%] mt-5 sm:max-w-[1386px] bg-lightBeige mx-auto"
        fullWidth={false}
      >
        <InvestmentStrategies />
      </Section>

      <Section
        padding="normal"
        className="max-w-[93%] mb-4 sm:mb-0 sm:max-w-[1386px] mx-auto"
      >
        <FundManagers />
      </Section>

      <Section padding="normal" className="mt-1">
        <Blogs />
      </Section>

      {/* Parallax Section */}
      <ParallaxSection />
      {/* <Parallax className="mb-6 mt-7" bgImage={principle} strength={200}>
        <div
          className="relative w-full min-h-[485px] bg-fixed bg-right sm:bg-center bg-cover flex items-center justify-center"
          style={{
            backgroundImage: `url(${principle})`,
            backgroundPosition: "65% 20%",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-35"></div>

          <div className="relative z-10 w-full max-w-[93%] sm:max-w-[1386px] mx-auto flex items-center justify-end">
            <div className="w-[820px]  text-start p-4  backdrop-filter backdrop-blur-sm bg-white bg-opacity-5 shadow-2xl overflow-auto">
              <Heading className="text-heading font-heading text-lightBeige italic mb-18">
                Our Investing Principles
              </Heading>
              <Text className="text-lightBeige text-body mb-4">
                At Qode, we see things for what they are and ignore all the
                noise.
              </Text>
              <Button
                href={"/blogs/qodes-principles-of-investing"}
                isGlassmorphism={true}
              >
                Know How
              </Button>
            </div>
          </div>
        </div>
      </Parallax> */}

      <Section padding="normal" className="mb-6">
        <div className="md:flex flex-col items-center text-center gap-2 justify-center">
          <div className="md:w-1/2">
            <Text className="sm:text-subheading text-mobileSubHeading text-black mb-3">
              Subscribe to know more about our investment strategies, style and
              principles.
            </Text>
          </div>
          <div className="md:w-1/2">
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
              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-beige text-black"
                  aria-busy={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="inline-flex items-center">
                        Submitting
                        <span className="dot-animation">
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                        </span>
                      </span>
                      .
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
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
