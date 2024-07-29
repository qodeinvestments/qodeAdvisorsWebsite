import React, { useState } from "react";

const WeeklyNewsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setSubscribed(true);
    setEmail("");
  };

  const benefits = [
    "In-depth market trend analysis",
    "Exclusive quantitative research insights",
    "Emerging investment opportunities",
    "Expert commentary on global finance",
    "Financial literacy content",
    "Invitations to exclusive events",
  ];

  return (
    <div className="bg-gray-100 graphik-font-regular text-gray-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="my-10">
          <h1 className="text-4xl mb-4   text-center">Qode Weekly Insights</h1>
          <div className="text-center mb-12">
            <p className="text-xl text-gray-700 mb-2">
              Harness the power of quantitative analysis for smarter investing
            </p>
            <p className="text-lg text-gray-600">
              Join thousands of investors receiving our data-driven market
              insights every week
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 bg-black text-white">
              <h2 className="text-2xl  mb-6">Stay Ahead of the Markets</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl  mb-6">Subscribe to Our Newsletter</h2>
              {!subscribed ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm  text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                  >
                    Subscribe Now
                  </button>
                </form>
              ) : (
                <div className="text-green-600 ">
                  Thank you for subscribing! Check your email for confirmation.
                </div>
              )}
              <p className="mt-4 text-sm text-gray-600">
                Join thousands of investors receiving our weekly market
                insights.
              </p>
            </div>
          </div>
        </div>

        {/* <div className="mt-16">
          <h2 className="text-2xl  mb-6 text-center">What Our Subscribers Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Qode's insights have revolutionized my investment approach. The quantitative analysis is unparalleled.",
                author: "Sarah J., Portfolio Manager"
              },
              {
                quote: "I rely on Qode's newsletter to navigate complex market dynamics. It's become an essential part of my weekly routine.",
                author: "Michael T., Financial Analyst"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <p className=" text-gray-600">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default WeeklyNewsletter;
