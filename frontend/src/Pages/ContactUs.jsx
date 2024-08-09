import React, { useState } from "react";
import { Container, GrayContainer } from "../components";

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
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <div className=" sophia-pro-font text-black pt-14 text-center">
        <h1 className="text-4xl pt-20 ">Contact Us</h1>
        {/* <p className="max-w-3xl mx-auto text-lg mb-16">
          We're here to help. Reach out to us with any questions or inquiries.
        </p> */}
      </div>
      <Container>
        <div className="sophia-pro-font text-gray-900 min-h-screen">
          <div className="max-w-7xl mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-16">
              {/* <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-lg  mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm  text-gray-700 mb-1"
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
                      className="block text-sm  text-gray-700 mb-1"
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
                      className="block text-sm  text-gray-700 mb-1"
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
                      className="block text-sm  text-gray-700 mb-1"
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

              <div>
                <div className="bg-white  p-8 mb-8">
                  <h2 className="text-lg  mb-6">Contact Information</h2>
                  <div className="mb-4">
                    <h3 className="text-md  mb-2">Address</h3>
                    <p>XRW9+HQP, Shah and Nahar Industrial Estate,</p>
                    <p>Worli Naka, Siddharth Nagar, Worli,</p>
                    <p>Mumbai, Maharashtra 400018</p>
                    <p>India</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-md  mb-2">Phone</h3>
                    <p>
                      <a
                        href="tel:+919920111053"
                        className="text-gray-900 hover:text-gray-600 transition duration-300"
                      >
                        +91 99201 11053
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-md  mb-2">Email</h3>
                    <p>
                      <a
                        href="mailto:info@qode.com"
                        className="text-gray-900 hover:text-gray-600 transition duration-300"
                      >
                        rishabh@swancapital.in
                      </a>
                    </p>
                  </div>
                </div>
                <div className="bg-white  p-8">
                  <h2 className="text-lg  mb-6">Our Location</h2>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15090.109826698288!2d72.8194424!3d18.9964656!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cff81471d8f7%3A0xfe0f743d6a385cef!2sSwan%20Capital!5e0!3m2!1sen!2sin!4v1719750122422!5m2!1sen!2sin"
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
          </div>
        </div>
      </Container>
    </>
  );
};

export default ContactUs;
