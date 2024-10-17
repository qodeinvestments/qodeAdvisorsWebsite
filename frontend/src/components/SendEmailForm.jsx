import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./common/Button";
import useMobileWidth from "../components/hooks/useMobileWidth";
import Text from "./common/Text";
import Modal from "./Modal";
import Heading from "./common/Heading";

const SendEmailForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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
        closeModal();
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
        onClick={openModal}
        className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors mb-2"
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </Button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="bg-black bg-opacity-10 backdrop-blur-md flex flex-col sm:p-5 lg:p-4 p-3 items-center justify-center z-50 font-body">
            <Text className="mb-18 text-beige font-semiheading text-semiheading">
              Contact Us
            </Text>
            <Text className="mb-4 text-lightBeige text-body font-body">
              Please fill out the form below and we will get back to you as soon
              as possible.
            </Text>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full p-18 text-body font-body bg-lightBeige border border-brown    "
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full p-18 text-body font-body bg-lightBeige border border-brown    "
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  className="w-full p-18 text-body font-body bg-lightBeige border border-brown     h-32"
                  required
                />
              </div>
              <div className="text-right">
                <Button
                  type="submit"
                  className="bg-beige text-black  p-1 px-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SendEmailForm;
