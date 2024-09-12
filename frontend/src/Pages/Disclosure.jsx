import React from "react";
import { Container } from "../components";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

const Disclosure = () => {
  const pdfs = [
    { name: "Annual Report 2023", url: "/path/to/annual_report_2023.pdf" },
    {
      name: "Financial Statement Q1 2023",
      url: "/path/to/financial_statement_q1_2023.pdf",
    },
    {
      name: "Sustainability Report 2023",
      url: "/path/to/sustainability_report_2023.pdf",
    },
  ];

  return (
    <Container>
      <div className="flex flex-col  items-center justify-center min-h-screen ">
        <div className="bg-white  p-8 rounded-lg  mx-auto mt-10">
          <Heading
            level={1}
            className="font-black mt-20  text-4xl text-start mb-10"
          >
            Disclosure
          </Heading>
          {/* <Text className="text-start  text-2xl mb-6">
            Welcome to our disclosure section. Here you can find all the
            necessary documents and reports regarding our company's performance,
            financial health, and sustainability efforts. Feel free to download
            and review any of the documents listed below.
          </Text> */}
          <div className="grid grid-cols-2 gap-20">
            <div className="bg-lightBeige flex p-20 gap-20">
              <div>
                <Heading level={1} className="text-2xl font-extrabold ">
                  PMS Disclosure Document
                </Heading>
                <button className="bg-beige py-2 px-6 text-white font-bold  mt-10">
                  Download
                </button>
              </div>
            </div>
            <div className="bg-lightBeige flex p-20 gap-20">
              <div>
                <Heading level={1} className="text-2xl font-extrabold ">
                  Investor Charter: Portfolio Manager
                </Heading>
                <button className="bg-beige py-2 px-6 text-white font-bold  mt-10">
                  Download
                </button>
              </div>
            </div>
            <div className="bg-lightBeige flex p-20 gap-20">
              <div>
                <Heading level={1} className="text-2xl font-extrabold ">
                  Financial Information
                </Heading>
                <button className="bg-beige py-2 px-6 text-white font-bold  mt-10">
                  Download
                </button>
              </div>
            </div>
            <div className="bg-lightBeige flex p-20 gap-20">
              <div>
                <Heading level={1} className="text-2xl font-extrabold ">
                  Complaint Resolution
                </Heading>
                <button className="bg-beige py-2 px-6 text-white font-bold  mt-10">
                  Download
                </button>
              </div>
            </div>
          </div>

          <div className=" md:text-subheading space-y-10 mt-10">
            <Text>
              For general queries and updates, write to support@qodeinvest.com
            </Text>
            <Text>
              To register a formal complaint with us, write to
              pmscompliance@qodeinvest.com with your name, registered mobile
              number, PAN Card and nature of complaint.
            </Text>
            <Text>
              Visit the{" "}
              <a className="text-brown" href="https://scores.sebi.gov.in/">
                SCORES
              </a>
              &nbsp; website.
            </Text>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Disclosure;
