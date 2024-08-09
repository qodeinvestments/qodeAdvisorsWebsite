import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../components";

const TermsnConditions = () => {
  return (
    <Container>
      <div className="p-24">
        <h1 className=" mb-6 sophia-pro-font text-start text-5xl font-black">
          Terms & Conditions
        </h1>
        <p className="minion-pro-font text-xl">
          By accessing and using the website of Qode Financial Services Pvt Ltd
          (hereinafter referred to as "Qode"), including any of its web pages,
          you signify your agreement to these Terms and Conditions. It is
          important that you read these terms each time you access our website,
          as they may be amended from time to time at Qode's sole discretion.
          <a
            href="https://qodeinvest.com"
            className="text-red-500 hover:text-red-700"
          >
            {" "}
            qodeinvest.com
          </a>
          , and it reflects our dedication to protecting your privacy.
        </p>
        <div className="flex flex-col mt-24 items-center justify-start ">
          <div className="text-start max-w-4xl ">
            <h2 className="text-2xl font-semibold  mb-6 sophia-pro-font">
              Use of Information and Materials:
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              The content provided on Qode's website is for general
              informational purposes only and should not be considered as
              financial advice or a recommendation to invest. The website
              content is not intended to be an offer or solicitation for
              investment in any financial products mentioned. Investments are
              subject to market risks, including the potential loss of
              principal. Past performance is not indicative of future results.
              Users are advised to seek independent financial advice before
              making any investment decisions.
            </p>

            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Copyright and Intellectual Property:
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              All content on Qode's website, including text, graphics, logos,
              and images, is the property of Qode Financial Services Pvt Ltd or
              its content suppliers and is protected by copyright and other
              intellectual property laws. Unauthorized use, reproduction, or
              distribution of any material from this website is strictly
              prohibited.
            </p>

            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              No Warranties:
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              Qode makes no warranties or representations about the accuracy,
              completeness, or suitability of the information on its website.
              All content is provided "as is" without any warranty of any kind.
              Qode, its affiliates, and their respective officers, directors,
              employees, or agents will not be liable for any damages arising
              from the use of this website.
            </p>

            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Exclusion of Liability:
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              Qode will not be liable for any damages or losses arising from the
              use of this website, including but not limited to direct,
              indirect, incidental, punitive, and consequential damages. This
              exclusion applies to damages from the use of or reliance on any
              information provided, any transactions conducted through the
              website, and unauthorized access or alteration of your
              transmissions or data.
            </p>

            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Governing Law:
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              You have the right to access, update, and correct your personal
              information. We encourage you to keep your information accurate
              and up-to-date by using the features available on our website.
              Please be aware that disclosing confidential information obtained
              through our services to third parties without our consent may
              constitute a breach of this policy.
            </p>

            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Privacy and Security:
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              These Terms and Conditions are governed by the laws of India. Any
              disputes arising out of or in connection with this website are to
              be submitted to the exclusive jurisdiction of the courts in
              Mumbai, India.
            </p>

            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Hyperlinks:
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              This website may contain links to other websites. Qode is not
              responsible for the content or privacy practices of these external
              sites. Users are advised to read the privacy policy of external
              sites before disclosing any personal information.
              <a
                href="https://qodeinvest.com"
                className="text-red-500 hover:text-red-700"
              >
                qodeinvest.com
              </a>
              . Qode reserves the right to amend these Terms and Conditions at
              any time. Any such changes will be posted on this page. Your
              continued use of the website following the posting of changes to
              these terms will mean you accept those changes.
            </p>
            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Amendments
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              Qode reserves the right to amend these Terms and Conditions at any
              time. Any such changes will be posted on this page. Your continued
              use of the website following the posting of changes to these terms
              will mean you accept those changes.
            </p>
            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Contact Information:
            </h2>
            <p className="mb-52 minion-pro-font  text-xl">
              If you have any questions or concerns about these Terms and
              Conditions, please contact us at connect@qodeinvest.com.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TermsnConditions;
