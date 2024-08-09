import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../components";

const PrivacyPolicy = () => {
  return (
    <Container>
      <div className="p-24">
        <h1 className="mb-6 sophia-pro-font text-start text-5xl font-black">
          Privacy Policy
        </h1>
        <p className="  minion-pro-font text-xl">
          At Qode Financial Services Pvt Ltd ("Qode"), we prioritize the privacy
          and security of our clients' personal, financial, and transactional
          information. Our commitment to safeguarding your privacy is integral
          to our relationship with you, and we employ advanced technology to
          ensure a secure online experience. This Privacy Policy outlines how we
          collect, use, protect, and share information obtained through our
          website
          <a
            href="https://qodeinvest.com"
            className="text-red-500 hover:text-red-700"
          >
            {" "}
            qodeinvest.com
          </a>
          , and it reflects our dedication to protecting your privacy.
        </p>
        <div className="flex flex-col mt-24 items-center justify-start">
          <div className="text-start max-w-4xl ">
            <h2 className="text-2xl font-semibold  mb-6 sophia-pro-font">
              Information Collection and Use
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              Qode collects personal information such as your name, address,
              email address, phone number, birth date, PAN, Aadhaar, occupation,
              income, risk profile, nominee details, investment details, and
              bank details. This information is gathered through various means,
              including email, forms, and WhatsApp groups, and is used to
              facilitate account opening, KYC processes, and account management.
              We also use this information to keep you informed about our latest
              product announcements, special offers, and to provide you with
              better services.
            </p>

            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Sharing and Disclosure of Information
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              Qode may share your personal information with third parties,
              including custodians like ICICI Bank, KYC and KRA centers, CRM
              systems, auditors, and other service providers, to add value and
              improve the quality of services we provide. This sharing of
              information will be done in strict compliance with confidentiality
              standards and only when necessary for audits, account opening, or
              as required by law.
            </p>

            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Protection of Information
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              We are committed to protecting your information with the same
              degree of care that we apply to our own confidential information.
              This includes taking all reasonable steps to prevent unauthorized
              use, dissemination, or publication of your personal information.
              Access to your personal information on our website is secured
              through a unique login ID and password, which you are advised to
              handle carefully and change periodically.
            </p>

            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Cookies and Web Analytics
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              Our website uses cookies and Google Analytics to enhance your
              browsing experience, remember your preferences, and improve site
              navigation. These cookies do not collect personal sensitive
              information. By using our website, you consent to the placement of
              these cookies on your device. You are free to disable or delete
              these cookies through your web browser settings.
            </p>

            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Your Rights and Responsibilities
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
              Changes to the Privacy Policy
            </h2>
            <p className="mb-12 minion-pro-font text-xl">
              Qode reserves the right to update or modify this Privacy Policy at
              any time without prior notice. We encourage you to review this
              policy periodically to stay informed about how we are protecting
              your information.
            </p>

            <h2 className="text-2xl font-semibold mt-24 mb-6 sophia-pro-font">
              Contact Us
            </h2>
            <p className="mb-52 minion-pro-font text-xl">
              If you have any questions or concerns about this Privacy Policy or
              our privacy practices, please contact us through our website{" "}
              <a
                href="https://qodeinvest.com"
                className="text-red-500 hover:text-red-700"
              >
                qodeinvest.com
              </a>
              . This Privacy Policy is governed by the laws of India and is
              designed to comply with all relevant legal and regulatory
              requirements, including those set forth by SEBI. It does not
              create any contractual or other legal rights on behalf of any
              party.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
