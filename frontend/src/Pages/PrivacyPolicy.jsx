import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../components";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

const PrivacyPolicy = () => {
  return (
    <Container>
      <div className="p-24">
        <Heading level={1} className="mb-6  text-start text-4xl font-black">
          Privacy Policy
        </Heading>
        <Text className="   md:text-subheading">
          At Qode Advisors LLP("Qode"), we prioritize the privacy and security
          of our clients' personal, financial, and transactional information.
          Our commitment to safeguarding your privacy is integral to our
          relationship with you, and we employ advanced technology to ensure a
          secure online experience. This Privacy Policy outlines how we collect,
          use, protect, and share information obtained through our website
          <a
            href="https://qodeinvest.com"
            className="text-brown hover:text-brown"
          >
            {" "}
            qodeinvest.com
          </a>
          , and it reflects our dedication to protecting your privacy.
        </Text>
        <div className="flex flex-col mt-24 items-center justify-start">
          <div className="text-start max-w-4xl ">
            <Heading level={2} className="text-2xl font-semibold  mb-6 ">
              Information Collection and Use
            </Heading>
            <Text className="mb-12  md:text-subheading">
              Qode collects personal information such as your name, address,
              email address, phone number, birth date, PAN, Aadhaar, occupation,
              income, risk profile, nominee details, investment details, and
              bank details. This information is gathered through various means,
              including email, forms, and WhatsApp groups, and is used to
              facilitate account opening, KYC processes, and account management.
              We also use this information to keep you informed about our latest
              product announcements, special offers, and to provide you with
              better services.
            </Text>

            <Heading level={2} className="text-2xl font-semibold mt-24 mb-6 ">
              Sharing and Disclosure of Information
            </Heading>
            <Text className="mb-12  md:text-subheading">
              Qode may share your personal information with third parties,
              including custodians like ICICI Bank, KYC and KRA centers, CRM
              systems, auditors, and other service providers, to add value and
              improve the quality of services we provide. This sharing of
              information will be done in strict compliance with confidentiality
              standards and only when necessary for audits, account opening, or
              as required by law.
            </Text>

            <Heading level={2} className="text-2xl font-semibold mt-24 mb-6 ">
              Protection of Information
            </Heading>
            <Text className="mb-12  md:text-subheading">
              We are committed to protecting your information with the same
              degree of care that we apply to our own confidential information.
              This includes taking all reasonable steps to prevent unauthorized
              use, dissemination, or publication of your personal information.
              Access to your personal information on our website is secured
              through a unique login ID and password, which you are advised to
              handle carefully and change periodically.
            </Text>

            <Heading level={2} className="text-2xl font-semibold mt-24 mb-6 ">
              Cookies and Web Analytics
            </Heading>
            <Text className="mb-12  md:text-subheading">
              Our website uses cookies and Google Analytics to enhance your
              browsing experience, remember your preferences, and improve site
              navigation. These cookies do not collect personal sensitive
              information. By using our website, you consent to the placement of
              these cookies on your device. You are free to disable or delete
              these cookies through your web browser settings.
            </Text>

            <Heading level={2} className="text-2xl font-semibold mt-24 mb-6 ">
              Your Rights and Responsibilities
            </Heading>
            <Text className="mb-12  md:text-subheading">
              You have the right to access, update, and correct your personal
              information. We encourage you to keep your information accurate
              and up-to-date by using the features available on our website.
              Please be aware that disclosing confidential information obtained
              through our services to third parties without our consent may
              constitute a breach of this policy.
            </Text>

            <Heading level={2} className="text-2xl font-semibold mt-24 mb-6 ">
              Changes to the Privacy Policy
            </Heading>
            <Text className="mb-12  md:text-subheading">
              Qode reserves the right to update or modify this Privacy Policy at
              any time without prior notice. We encourage you to review this
              policy periodically to stay informed about how we are protecting
              your information.
            </Text>

            <Heading level={2} className="text-2xl font-semibold mt-24 mb-6 ">
              Contact Us
            </Heading>
            <Text className="  md:text-subheading">
              If you have any questions or concerns about this Privacy Policy or
              our privacy practices, please contact us through our website{" "}
              <a
                href="https://qodeinvest.com"
                className="text-brown hover:text-brown"
              >
                qodeinvest.com
              </a>
              . This Privacy Policy is governed by the laws of India and is
              designed to comply with all relevant legal and regulatory
              requirements, including those set forth by SEBI. It does not
              create any contractual or other legal rights on behalf of any
              party.
            </Text>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
