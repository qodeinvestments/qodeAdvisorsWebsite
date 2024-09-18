import React, { useState } from "react";
import { Container, GrayContainer } from "../components";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Section from "../components/container/Section";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Section withBorder padding="extralarge" className="mt-9">
        <div className="  text-brown  text-center">
          <Heading className="text-heading font-heading mb-4 ">
            Contact Us
          </Heading>
          {/* <p className="max-w-3xl mx-auto md:text-subheading mb-16">
          We're here to help. Reach out to us with any questions or inquiries.
        </Text> */}
        </div>

        <div className="">
          <div className="bg-white">
            <div className="text-center">
              <div className="flex max-w-4xl border border-brown p-2 mb-4 items-center gap-3 justify-center mx-auto">
                <div className="text-start">
                  <Text className="text-subheading font-subheading  mb-1">
                    Address
                  </Text>
                  <Text>
                    2nd Floor, Tree Building, Raghuvanshi Mills Compound,
                  </Text>
                  <Text>Gandhi Nagar, Upper Worli, Lower Parel,</Text>
                  <Text>Mumbai, Maharashtra 400013</Text>
                  <Text>India</Text>
                </div>
                <div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6322147006836!2d72.82033437580478!3d18.991843454607952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cec445995555%3A0x198651c83d7c4bd5!2sQode%20Advisors%20LLP!5e0!3m2!1sen!2sin!4v1723199089828!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Qode Location"
                  ></iframe>
                </div>
              </div>

              <div className="mb-4">
                <Text className="text-subheading font-subheading   mb-1">
                  Phone
                </Text>
                <Text>
                  <a
                    href="tel:+919920111053"
                    className="text-gray-900 hover:text-gray-600 transition duration-300"
                  >
                    +91 99201 11053
                  </a>
                </Text>
              </div>
              <div>
                <Text className="text-subheading font-subheading  mb-1">
                  Email
                </Text>
                <Text>
                  <a
                    href="mailto:rishabh@qodeinvest.in"
                    className="text-gray-900 hover:text-gray-600 transition duration-300"
                  >
                    rishabh@qodeinvest.in
                  </a>
                </Text>
              </div>
            </div>
          </div>

          {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6322147006836!2d72.82033437580478!3d18.991843454607952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cec445995555%3A0x198651c83d7c4bd5!2sQode%20Advisors%20LLP!5e0!3m2!1sen!2sin!4v1723199089828!5m2!1sen!2sin"
                width="600"
                height="450"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe> */}
        </div>
      </Section>
    </>
  );
};

export default ContactUs;
