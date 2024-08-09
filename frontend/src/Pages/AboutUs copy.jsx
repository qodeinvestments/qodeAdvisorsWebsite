import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 minion-pro-font mt-20 min-h-screen">
      <header className=" text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl text-black font-bold mb-4">About Qode</h1>
          <p className="text-2xl sophia-pro-font text-black">
            Revolutionizing wealth management for a new era
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-2xl sophia-pro-font font-bold  mb-6">
            Our Mission
          </h2>
          <p className="text-lg mb-8">
            At Qode, we are dedicated to revolutionizing the way Indians grow
            and manage their wealth. As India's premier wealth management firm,
            we are our clients' most trusted partner, providing investment
            portfolios built on rigorous analysis and expertise.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold  mb-4">
              Transform your wealth with trusted expertise
            </h3>
            <p className="text-gray-700">
              With a proven track record, we're the chosen stewards for hundreds
              of individuals, families and businesses, dedicated to realizing
              their financial vision.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl sophia-pro-font font-bold  mb-6">
            Our Investment Philosophy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Disciplined Process Over Prediction",
                content:
                  "We believe there is folly in making bold short-term predictions. We implement an evidence-based investment process founded on wisdom accrued from experience, rigorous data analysis, and rational decision-making.",
              },
              {
                title: "Consistency for the long run",
                content:
                  "Genuine skill reveals itself through steady excellence over market cycles, not fleeting victory during isolated periods. A superior record is built, not from soaring one year and crashing the next but from a resilient approach that offers conviction for building long term wealth.",
              },
              {
                title: "Intelligent Risk-taking",
                content:
                  "Risk, the permanent loss of capital, is intrinsic to investing. So we seek to understand and manage risk, guard against avoidable dangers, stay nimble, and when called for, take decisive action.",
              },
              {
                title: "Constant Learning and Evolution",
                content:
                  "We resist adherence to any one investment dogma, approach or legacy rule-of-thumb. Our investment approach continuously adapts as we expand our capabilities, insights and access to new opportunities.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-2xl sophia-pro-font font-semibold  mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-red-50 rounded-lg p-8">
          <h2 className="text-2xl sophia-pro-font font-bold  mb-6">
            Investment Strategies
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Distinct yet complementary investment strategies unified by a solid
            core.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {["Equity Growth", "Balanced Allocation", "Fixed Income"].map(
              (strategy, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 text-center"
                >
                  <h3 className="text-2xl sophia-pro-font font-semibold  mb-2">
                    {strategy}
                  </h3>
                  <p className="text-gray-600">
                    Tailored for your unique financial goals
                  </p>
                </div>
              )
            )}
          </div>
          <div className="text-center">
            <button className="bg-red-600 text-white font-semibold py-3 px-8 rounded-full hover: transition duration-300">
              Explore Our Portfolios
            </button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl sophia-pro-font font-bold  mb-6">
            Our Business Principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Client Interests First",
                content:
                  "We consider client goals our guideposts in every action we take. Their needs, more than our own, shape what we do.",
              },
              {
                title: "Clear and Transparent",
                content:
                  "We communicate with factual and jargon-free transparency so clients comprehend opportunities and risks realistically.",
              },
              {
                title: "Disciplined Expectations",
                content:
                  "We do not make unreasonable promises borne out of short-term outcomes. Our guidance is grounded in diligent analytics, not aiming to impress in order to make the sale, but to foster a lifelong partnership.",
              },
              {
                title: "Aligning Philosophy and People",
                content:
                  "Our team lives these principles through ethical yet high-achieving collaborative conduct across everything we do.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-2xl sophia-pro-font font-semibold  mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl sophia-pro-font font-bold  mb-6">Our Team</h2>
          <p className="text-lg mb-8">
            Qode is powered by a diverse team of financial experts, data
            scientists, and technology innovators. Our collective expertise
            drives our success in navigating the complex world of wealth
            management.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Investment Strategists",
              "Market Analysts",
              "Risk Management Experts",
              "Client Relations Specialists",
            ].map((role, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 text-center"
              >
                <p className="font-semibold ">{role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className=" text-white rounded-lg p-8">
          <h2 className="text-2xl sophia-pro-font font-bold mb-6">
            Ready to Transform Your Wealth?
          </h2>
          <p className="text-lg mb-8">
            Join the hundreds of individuals and businesses who trust Qode with
            their financial future. Let's start your journey to financial
            success today.
          </p>
          <button className="bg-white  font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
            Schedule a Consultation
          </button>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
