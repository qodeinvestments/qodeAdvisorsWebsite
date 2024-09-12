import React, { useState } from "react";
import { Container, GrayContainer } from "../components";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

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
      <div className="  text-black pt-14 text-center">
        <Heading level={1} className="text-4xl pt-20  ">
          Contact Us
        </Heading>
        {/* <p className="max-w-3xl mx-auto md:text-subheading mb-16">
          We're here to help. Reach out to us with any questions or inquiries.
        </Text> */}
      </div>
      <Container>
        <div className=" text-gray-900 min-h-[60vh]">
          <div className="max-w-7xl mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-16">
              {/* <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="md:text-subheading  mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-xs  text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-xs  text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="subject"
                      className="block text-xs  text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-xs  text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div> */}

              <Container>
                <div className="bg-white  p-8 mb-8">
                  <div className="flex gap-44 items-start justify-start   mx-auto">
                    <div>
                      <div className="mb-4">
                        <Heading level={3} className="text-heading  mb-2">
                          Address
                        </Heading>
                        <Text>
                          2nd Floor, Tree Building, Raghuvanshi Mills Compound,
                        </Text>
                        <Text>
                          Gandhi Nagar, Upper Worli, Lower Parel, Mumbai,
                          Maharashtra 400013,
                        </Text>
                        <Text>Mumbai, Maharashtra 400018</Text>
                        <Text>India</Text>
                      </div>
                      <div className="mb-4">
                        <Heading level={3} className="text-heading   mb-2">
                          Phone
                        </Heading>
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
                        <Heading level={3} className="text-heading  mb-2">
                          Email
                        </Heading>
                        <Text>
                          <a
                            href="mailto:info@qode.com"
                            className="text-gray-900 hover:text-gray-600 transition duration-300"
                          >
                            rishabh@swancapital.in
                          </a>
                        </Text>
                      </div>
                    </div>

                    <div className="  ">
                      <Heading level={2} className="text-heading  mb-6">
                        Our Location
                      </Heading>
                      <div className=" h-60    bg-red-50 ">
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
                  </div>
                </div>
              </Container>

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
          </div>
        </div>
      </Container>
    </>
  );
};

export default ContactUs;
