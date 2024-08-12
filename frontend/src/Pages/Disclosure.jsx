import React from "react";
import { Container } from "../components";

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
          <h1 className="font-black mt-20 sophia-pro-font text-4xl text-start mb-10">
            Disclosure
          </h1>
          {/* <p className="text-start minion-pro-font text-2xl mb-6">
            Welcome to our disclosure section. Here you can find all the
            necessary documents and reports regarding our company's performance,
            financial health, and sustainability efforts. Feel free to download
            and review any of the documents listed below.
          </p> */}
          <div className="grid grid-cols-2 gap-20">
            <div className="bg-[#fafafa] flex p-20 gap-20">
              <div>
                <h1 className="text-2xl font-extrabold sophia-pro-font">
                  PMS Disclosure Document
                </h1>
                <button className="bg-red-600 py-2 px-6 text-white font-bold sophia-pro-font mt-10">
                  Download
                </button>
              </div>
            </div>
            <div className="bg-[#fafafa] flex p-20 gap-20">
              <div>
                <h1 className="text-2xl font-extrabold sophia-pro-font">
                  Investor Charter: Portfolio Manager
                </h1>
                <button className="bg-red-600 py-2 px-6 text-white font-bold sophia-pro-font mt-10">
                  Download
                </button>
              </div>
            </div>
            <div className="bg-[#fafafa] flex p-20 gap-20">
              <div>
                <h1 className="text-2xl font-extrabold sophia-pro-font">
                  Financial Information
                </h1>
                <button className="bg-red-600 py-2 px-6 text-white font-bold sophia-pro-font mt-10">
                  Download
                </button>
              </div>
            </div>
            <div className="bg-[#fafafa] flex p-20 gap-20">
              <div>
                <h1 className="text-2xl font-extrabold sophia-pro-font">
                  Complaint Resolution
                </h1>
                <button className="bg-red-600 py-2 px-6 text-white font-bold sophia-pro-font mt-10">
                  Download
                </button>
              </div>
            </div>
          </div>

          <div className="minion-pro-font md:text-lg space-y-10 mt-10">
            <p>
              For general queries and updates, write to support@qodeinvest.com
            </p>
            <p>
              To register a formal complaint with us, write to
              pmscompliance@qodeinvest.com with your name, registered mobile
              number, PAN Card and nature of complaint.
            </p>
            <p>
              Visit the{" "}
              <a className="text-red-500" href="https://scores.sebi.gov.in/">
                SCORES
              </a>
              &nbsp; website.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Disclosure;
