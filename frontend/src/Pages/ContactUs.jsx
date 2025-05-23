import React, { useState } from "react";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Section from "../components/container/Section";
import { Helmet } from "react-helmet";
import SendEmailForm from "../components/SendEmailForm";
import Modal from "../components/Modal";
import Button from "../components/common/Button";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // //console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setIsModalOpen(false);
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Qode</title>
        <meta
          name="description"
          content="Contact Qode for inquiries, support, or further information. Find our address, phone number, and email or send us a direct message."
        />
        <meta
          name="keywords"
          content="Qode, Contact Us, address, phone number, email, get in touch"
        />
        <meta name="author" content="Qode" />
        <link rel="canonical" href="https://www.qodeinvest.com/contact-us" />
      </Helmet>
      <Section padding="extralarge" className="mt-5">
        <div className="text-brown text-center">
          <Heading
            isItalic
            className="text-mobileHeading sm:text-heading font-heading mb-4"
          >
            Contact Us
          </Heading>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="bg-white">
              <div className="text-left">
                <div className="mb-4">
                  <Text className="sm:text-subheading text-mobileSubHeading font-subheading mb-2">
                    Address
                  </Text>
                  <Text>
                    2nd Floor, Tree Building, Raghuvanshi Mills Compound, Gandhi
                    Nagar, Upper Worli, Lower Parel, Mumbai, Maharashtra 400013
                  </Text>
                  <Text>India</Text>
                </div>

                <div className="mb-4">
                  <Text className="sm:text-subheading text-mobileSubHeading font-subheading mb-2">
                    Phone
                  </Text>
                  <Text>
                    <a
                      href="tel:+919820300028"
                      className="text-gray-900 hover:text-gray-600 transition duration-300"
                    >
                      +91 98203 00028
                    </a>
                  </Text>
                </div>
                <div className="mb-4">
                  <Text className="sm:text-subheading text-mobileSubHeading font-subheading mb-2">
                    Email
                  </Text>
                  <Text>
                    <a
                      href="mailto:investor.relations@qodeinvest.com"
                      className="text-gray-900 hover:text-gray-600 transition duration-300"
                    >
                      investor.relations@qodeinvest.com
                    </a>
                  </Text>
                </div>
                {/* New HR-related queries section */}
                <div className="mb-4">
                  <Text className="sm:text-subheading text-mobileSubHeading font-subheading mb-2">
                    HR Queries
                  </Text>
                  <Text>
                    For any HR related queries, please write to{" "}
                    <a
                      href="mailto:hr@qodeinvest.com"
                      className="text-gray-900 hover:text-gray-600 transition duration-300"
                    >
                      hr@qodeinvest.com
                    </a>
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6322147006836!2d72.82033437580478!3d18.991843454607952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cec445995555%3A0x198651c83d7c4bd5!2sQode%20Advisors%20LLP!5e0!3m2!1sen!2sin!4v1723199089828!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen=""
              loading="lazy"
              title="Qode Location"
            ></iframe>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Button
            onClick={toggleModal}
            className="text-body dm-sans-font bg-beige text-black hover:bg-opacity-80 px-2 py-1"
          >
            Get In Touch
          </Button>
        </div>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <div className="relative">
              <SendEmailForm onClose={closeModal} onFormSuccess={handleFormSuccess} />
            </div>
          </Modal>
        )}
      </Section>
    </>
  );
};

export default ContactUs;
