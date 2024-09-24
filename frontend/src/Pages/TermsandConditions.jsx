import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../components";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Section from "../components/container/Section";

const TermsnConditions = () => {
  return (
    <Section className="mt-8 sm:mt-5" padding="extralarge">
      <Heading isItalic className="text-brown mb-18">
        Terms & Conditions
      </Heading>
      <Text className="text-body">
        By accessing & using the website of Qode Advisors LLP (hereinafter
        referred to as "Qode"), including any of its web pages, you signify your
        agreement to these Terms & Conditions. It is important that you read
        these terms each time you access our website, as they may be amended
        from time to time at Qode's sole discretion
        <a
          href="https://qodeinvest.com"
          className="text-brown hover:text-brown"
        >
          {" "}
          qodeinvest.com
        </a>
        , & it reflects our dedication to protecting your privacy.
      </Text>

      <div className="flex flex-col mt-5 items-center justify-start">
        <div className="text-start">
          <Text className="mb-18 sm:text-subheading text-mobileSubHeading font-subheading">
            Use of Information & materials:
          </Text>
          <Text className="mb-4 md:text-body">
            The content provided on Qode's website is for general informational
            purposes only & should not be considered as financial advice or a
            recommendation to invest. The website content is not intended to be
            an offer or solicitation for investment in any financial products
            mentioned. Investments are subject to market risks, including the
            potential loss of principal. Past performance is not indicative of
            future results. Users are advised to seek independent financial
            advice before making any investment decisions.
          </Text>

          <Text className="mt-5 mb-18 sm:text-subheading text-mobileSubHeading font-subheading">
            Copyright & Intellectual property:
          </Text>
          <Text className="mb-4 md:text-body">
            All content on Qode's website, including text, graphics, logos, &
            images, is the property of Qode Advisors LLP or its content
            suppliers & is protected by copyright & other intellectual property
            laws. Unauthorized use, reproduction, or distribution of any
            material from this website is strictly prohibited.
          </Text>

          <Text className="mt-5 mb-18 sm:text-subheading text-mobileSubHeading font-subheading">
            No warranties:
          </Text>
          <Text className="mb-4 md:text-body">
            Qode makes no warranties or representations about the accuracy,
            completeness, or suitability of the information on its website. All
            content is provided "as is" without any warranty of any kind. Qode,
            its affiliates, & their respective officers, directors, employees,
            or agents will not be liable for any damages arising from the use of
            this website.
          </Text>

          <Text className="mt-5 mb-18 sm:text-subheading text-mobileSubHeading font-subheading">
            Exclusion of liability:
          </Text>
          <Text className="mb-4 md:text-body">
            Qode will not be liable for any damages or losses arising from the
            use of this website, including but not limited to direct, indirect,
            incidental, punitive, & consequential damages. This exclusion
            applies to damages from the use of or reliance on any information
            provided, any transactions conducted through the website, &
            unauthorized access or alteration of your transmissions or data.
          </Text>

          <Text className="mt-5 mb-18 sm:text-subheading text-mobileSubHeading font-subheading">
            Governing law:
          </Text>
          <Text className="mb-4 md:text-body">
            These Terms & Conditions are governed by the laws of India. Any
            disputes arising out of or in connection with this website are to be
            submitted to the exclusive jurisdiction of the courts in Mumbai,
            India.
          </Text>

          <Text className="mt-5 mb-18 sm:text-subheading text-mobileSubHeading font-subheading">
            Privacy & security:
          </Text>
          <Text className="mb-4 md:text-body">
            Qode takes the privacy & security of its users seriously. Please
            review our Privacy Policy to understand how we protect your
            information.
          </Text>

          <Text className="mt-5 mb-18 sm:text-subheading text-mobileSubHeading font-subheading">
            Hyperlinks:
          </Text>
          <Text className="mb-4 md:text-body">
            This website may contain links to other websites. Qode is not
            responsible for the content or privacy practices of these external
            sites. Users are advised to read the privacy policy of external
            sites before disclosing any personal information on
            <a
              href="https://qodeinvest.com"
              className="text-brown hover:text-brown"
            >
              {" "}
              qodeinvest.com
            </a>
            . Qode reserves the right to amend these Terms & Conditions at any
            time. Any such changes will be posted on this page. Your continued
            use of the website following the posting of changes to these terms
            will mean you accept those changes.
          </Text>

          <Text className="mt-5 mb-18 sm:text-subheading text-mobileSubHeading font-subheading">
            Amendments:
          </Text>
          <Text className="mb-4 md:text-body">
            Qode reserves the right to amend these Terms & Conditions at any
            time. Any such changes will be posted on this page. Your continued
            use of the website following the posting of changes to these terms
            will mean you accept those changes.
          </Text>

          <Text className="mt-5 mb-18 sm:text-subheading text-mobileSubHeading font-subheading">
            Contact Information:
          </Text>
          <Text className="md:text-body">
            If you have any questions or concerns about these Terms &
            Conditions, please contact us at{" "}
            <a href="mailto:rishabh@qodeinvest.com">
              <strong className="text-beige">rishabh@qodeinvest.com</strong>
            </a>
            .
          </Text>
        </div>
      </div>
    </Section>
  );
};

export default TermsnConditions;
