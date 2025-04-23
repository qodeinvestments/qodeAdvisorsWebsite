// /src/Pages/Home.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Banner, Blogs, InvestmentStrategies } from "../components/index";
import { Helmet } from "react-helmet";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/common/Button";
import Text from "../components/common/Text";
import Section from "../components/container/Section";
import Modal from "../components/Modal";
import GrowMoney from "./GrowMoney";
import InvestmentPrinciples from "../components/InvestmentPrinciples";
import SendEmailForm from "../components/SendEmailForm";

const Home = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);

  // Add scroll handling useEffect
  useEffect(() => {
    // Function to handle scroll
    const scrollToSection = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # from the hash
        const sectionId = hash.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          // Add a small delay to ensure the page is fully loaded
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Call the function when component mounts
    scrollToSection();

    // Add event listener for hash changes
    window.addEventListener('hashchange', scrollToSection);

    // Cleanup
    return () => window.removeEventListener('hashchange', scrollToSection);
  }, []);

  // Rest of your existing code remains the same...
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

  // Your existing useEffects and handlers...
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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email) {
        toast.error("Email is required.", {
          position: "bottom-right",
        });
        return;
      }
      console.log("Submitting email:", email);
      if (isSubmitting) return;

      setIsSubmitting(true);

      try {
        const response = await fetch(`${API_URL}/newsletter/subscribe`, {
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
          //console.log(data);

          setEmail("");
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
        setIsSubmitting(false);
      }
    },
    [API_URL, email, isSubmitting]
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Rest of your JSX remains the same...
  return (
    <div>
      <Helmet>
        <title>Qode - Grow your wealth with data-driven strategies</title>
        <meta
          name="description"
          content="At Qode Invest, we help individuals grow their wealth using data-driven investment strategies with a proven track record. Learn more about our investing principles and strategies."
        />
        <meta
          name="keywords"
          content="Qode Invest, data-driven investment, wealth management, quant models, stock market, investment strategies"
        />
        <meta name="author" content="Qode Invest" />
        <link rel="canonical" href="https://www.qodeinvest.com/" />
      </Helmet>

      <Banner />
      <Section padding="none" className="my-7 text-center">
        <Text className="text-subheading font-heading  text-brown ">
          The best investments are <br />
          <div className=" text-beige">
            {currentText} <span className="animate-blink">|</span>
          </div>
        </Text>
      </Section>
      <Section padding="extralarge" className="mt-5 bg-lightBeige">
        <InvestmentStrategies />
      </Section>
      <Section padding="none" className="mt-7 sm:mt-5 ">
        <Blogs />
      </Section>
      <Section padding="none" fullWidth className="mt-8 sm:mt-5 ">
        <InvestmentPrinciples />
      </Section>
      <Section id="newsletter-section" padding="none" className="mb-6">
        <div className="md:flex flex-col items-center text-center gap-2 justify-center">
          <div className="md:w-1/2 mb-3">
            <Text className="sm:text-subheading text-mobileSubHeading text-black">
              Subscribe to know more about our investment style, strategies, and principles.
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
                        Subscribing
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
      </Section>
      <Section padding="none" className="mt-8 bg-lightBeige/50 sm:mt-5 ">
        <SendEmailForm  />
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
      {/* {isModalOpen && (
        <Modal onClose={closeModal}>
          <GrowMoney />
        </Modal>
      )} */}
    </div>
  );
};

export default Home;