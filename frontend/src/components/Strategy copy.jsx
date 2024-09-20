import React, { useState, useEffect } from "react";
import { Blogs, Container, GrayContainer } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PerformanceChart from "./Charts/PerformanceChart";
import HoldingDistribution from "./Charts/HoldingDistribution";
import RelatedArticles from "./RelatedArticles";
import TrailingReturns from "./TrailingReturns";
import { Modal } from "bootstrap";
import ModalButton from "./ModalButton";
import { Link } from "react-router-dom";
import Section from "./container/Section";
import SectionContent from "./container/SectionContent";
import Button from "./common/Button";
import Text from "./common/Text";
import Heading from "./common/Heading";
import axios from "axios";

const StrategyComponent = ({ strategyData }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [blogPost, setBlogPost] = useState(null);

  const handleAccordionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const {
    title,
    description,
    strategyCode,
    strategySlug,
    pptLink,
    whitePaperLink,
    steps,
    faqItems,
  } = strategyData;

  useEffect(() => {
    const fetchBlogPost = async () => {
      const key = import.meta.env.VITE_GHOST_BLOG_KEY;
      try {
        const response = await axios.get(
          `https://blogs.qodeinvest.com/ghost/api/v3/content/posts/slug/qode-low-risk/?key=${key}&include=authors`
        );
        setBlogPost(response.data.posts[0]);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };
    fetchBlogPost();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="mx-auto">
      <Section>
        <Heading
          level={2}
          className="sm:text-subheading text-mobileSubHeadingsm:text-mobileHeading sm:text-heading font-bold mb-1 text-primary text-center"
        >
          <span className="block">{title}</span>
        </Heading>
        <div
          className="text-center font-body sm:text-subheading text-mobileSubHeadinglg:px-3"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </Section>

      <Section className="py-1">
        <PerformanceChart strategy={strategyCode} />
      </Section>

      {blogPost && (
        <Section>
          <div className="mx-auto px-1 py-1">
            <div className="max-w-7xl mx-auto p-4">
              {blogPost.feature_image && (
                <img
                  src={blogPost.feature_image}
                  alt={blogPost.title}
                  className="w-full object-cover h-auto mb-4"
                />
              )}
              <div
                className="post-content leading-relaxed my-2"
                dangerouslySetInnerHTML={{ __html: blogPost.html }}
              />
              {blogPost.primary_author && (
                <div className="flex items-center mt-4 bg-lightBeige p-2 rounded-lg">
                  {blogPost.primary_author.profile_image && (
                    <img
                      src={blogPost.primary_author.profile_image}
                      alt={blogPost.primary_author.name}
                      className="w-16 h-16 rounded-full object-cover mr-2"
                    />
                  )}
                  <div>
                    <Text className="font-body">
                      {blogPost.primary_author.name}
                    </Text>
                    {blogPost.primary_author.bio && (
                      <Text className="font-body">
                        {blogPost.primary_author.bio}
                      </Text>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      <Section className="bg-lightBeige">
        <div className="text-center">
          <Heading
            level={2}
            className="text-mobileHeading sm:text-heading font-bold mb-2 text-brown"
          >
            Not sure which strategy is right for you?
          </Heading>
          <Text className="text-body mb-3 text-black">
            Sign Up to track our live portfolio.
          </Text>
          <Button to="https://dashboard.qodeinvest.com">Sign Up</Button>
        </div>
      </Section>

      <Section>
        <SectionContent>
          <Heading
            level={2}
            className="sm:text-subheading text-mobileSubHeadingsm:text-mobileHeading sm:text-heading font-black text-black text-center mb-2 sm:mb-4"
          >
            How Our Strategy Works
          </Heading>
          <Text className="text-center text-text-secondary px-1 sm:px-5 mb-3 sm:mb-5 text-body">
            Understand the step-by-step process we use to identify promising
            investment opportunities and manage your portfolio.
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="bg-lightBeige p-2 sm:p-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-beige mb-2">
                  <FontAwesomeIcon
                    icon={step.icon}
                    className="sm:text-subheading text-mobileSubHeadingtext-brown"
                  />
                </div>
                <Heading
                  level={3}
                  className="sm:text-subheading text-mobileSubHeadingfont-bold text-brown mb-1"
                >
                  {step.title}
                </Heading>
                <Text className="text-text-secondary text-body">
                  {step.description}
                </Text>
              </div>
            ))}
          </div>
        </SectionContent>
      </Section>

      <Section>
        <ModalButton />
      </Section>

      <Section className="bg-lightBeige">
        <Blogs />
      </Section>

      <Section>
        <Heading
          level={2}
          className="sm:text-subheading text-mobileSubHeadingsm:text-mobileHeading sm:text-heading font-black text-black text-center mb-2 sm:mb-4"
        >
          FAQ's
        </Heading>
        <div className="space-y-1 sm:space-y-2 mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white border">
              <div
                className="flex justify-between items-center p-1 sm:p-2 cursor-pointer"
                onClick={() => handleAccordionToggle(index)}
              >
                <Heading
                  level={3}
                  className="text-body font-medium sm:sm:text-subheading text-mobileSubHeadingtext-black pr-2"
                >
                  {item.question}
                </Heading>
                <span
                  className={`text-black sm:text-subheading text-mobileSubHeadingtransition-transform duration-300 ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                >
                  &#8744;
                </span>
              </div>
              {activeIndex === index && (
                <div className="p-1 sm:p-2 bg-lightBeige text-black text-body">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default StrategyComponent;
