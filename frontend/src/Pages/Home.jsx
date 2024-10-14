import React, { useEffect, useState, useCallback } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false); // Remove isLoading and use isSubmitting consistently
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);

  const typingSpeed = 130;
  const deletingSpeed = 55;
  const delayBetweenTexts = 1500;
  const textArray = [
    "driven by data.",
    "objective.",
    "emotion-free.",
    "carried out by Qode.",
  ];

  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_BACKEND_PROD_URL
      : import.meta.env.VITE_BACKEND_DEV_URL;

  useEffect(() => {
    let timeout;
    if (isTyping) {
      if (currentText.length < textArray[index].length) {
        timeout = setTimeout(() => {
          setCurrentText((prevText) =>
            textArray[index].slice(0, prevText.length + 1)
          );
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText((prevText) => prevText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsTyping(true);
        setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, index]);

  // Optimize handleSubmit with useCallback to avoid re-rendering
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email) {
        toast.error("Email is required.", {
          position: "bottom-right",
        });
        return;
      }

      if (isSubmitting) return; // Prevent multiple submissions

      setIsSubmitting(true); // Set submitting state to prevent re-submit

      try {
        const response = await fetch(`${API_URL}/emails/collect/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message, {
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
          console.log(data);

          setEmail(""); // Reset email after successful submission
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Subscription failed");
        }
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`, {
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
      } finally {
        setIsSubmitting(false); // Reset the isSubmitting state
      }
    },
    [API_URL, email, isSubmitting] // Only re-run when these variables change
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Helmet>
        <title>Qode - Grow Your Wealth with Data-Driven Strategies</title>
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
        className="max-w-[93%] mt-5 md:max-w-[1386px] bg-lightBeige mx-auto"
        fullWidth={false}
      >
        <InvestmentStrategies />
      </Section>
      <Section
        padding="extralarge"
        className="max-w-[93%] my-7 sm:my-0 border border-brown mb-4 sm:mb-0 md:max-w-[1386px] mx-auto"
      >
        <FundManagers />
      </Section>
      <Section padding="none" className="mt-5 ">
        <Blogs />
      </Section>
      {/* Parallax Section */}
      <Section padding="none" fullWidth className="mt-5 ">
        <ParallaxSection />
      </Section>
      <Section padding="normal" className="mb-6">
        <div className="md:flex flex-col items-center text-center gap-2 justify-center">
          <div className="md:w-1/2 mb-3">
            <Text className="sm:text-subheading text-mobileSubHeading text-black">
              Subscribe to know more about our investment strategies, style, and
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
                  disabled={isSubmitting}
                  className="bg-beige text-black"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-flex items-center">
                        Submitting
                        <span className="dot-animation">
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                        </span>
                      </span>
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Section>{" "}
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
