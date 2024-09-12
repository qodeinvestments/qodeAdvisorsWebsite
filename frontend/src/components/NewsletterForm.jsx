// src/components/NewsletterForm.jsx
import React from "react";
import Button from "./common/Button";
import Text from "./common/Text";
import Heading from "./common/Heading";

const NewsletterForm = ({ email, setEmail, handleSubmit, isSubmitting }) => {
  return (
    <div className="text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <div className="md:flex items-center justify-center">
            <div className="md:w-1/2 p-8">
              <Heading level={2} className="text-2xl font-semibold mb-6">
                Qode Weekly Insights
              </Heading>
              <Text className="md: text-gray-600">
                Join thousands of investors receiving our data-driven market
                insights every week
              </Text>
            </div>
            <div className="md:w-1/2 p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Best Email"
                    required
                    className="w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  Subscribe Now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
