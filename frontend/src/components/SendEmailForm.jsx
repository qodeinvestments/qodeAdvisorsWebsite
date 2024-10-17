import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./common/Button";
import useMobileWidth from "../components/hooks/useMobileWidth";
import Text from "./common/Text";
const SendEmailForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_BACKEND_PROD_URL
      : import.meta.env.VITE_BACKEND_DEV_URL;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { isMobile } = useMobileWidth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/emails/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formData.email,
          subject: "Qode Form Submission",
          message: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`,
          fromName: "Qode Contact Form",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(
          "Your message has been sent. We'll get back to you soon!",
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

        setFormData({ name: "", email: "", message: "" });
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
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
  };

  return (
    <div className="fixed bottom-2 right-2 z-50 flex flex-col items-end">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors mb-2"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faEnvelope} />
      </Button>
      {isOpen && (
        <div
          className={`transition-all duration-20 ease-in ${
            isOpen
              ? "max-w-md opacity-100"
              : "max-w-0 opacity-0 pointer-events-none"
          } ${
            isMobile ? "w-full" : "mr-0 mb-6 w-80"
          } bg-[#fee9d6] border border-brown p-1 overflow-hidden`}
        >
          <Text className="mb-2">
            Please fill out the form below and we will get back to you as soon
            as possible.
          </Text>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-3">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full p-18 bg-white border border-[#945c39]"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full p-18 bg-white border border-[#945c39]"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message"
                className="w-full p-18 bg-white border border-[#945c39] h-20"
                required
              />
            </div>
            <Button
              type="submit"
              className=" bg-[#d1a47b] text-white hover:bg-[#945c39] transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SendEmailForm;
