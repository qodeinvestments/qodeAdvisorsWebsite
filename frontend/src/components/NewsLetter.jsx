import React, { useState, useCallback } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/common/Button";
import Text from "../components/common/Text";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_BACKEND_PROD_URL
      : import.meta.env.VITE_BACKEND_DEV_URL;

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

  return (
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

export default Newsletter;