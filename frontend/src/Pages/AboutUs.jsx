import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import rishabh from "../assets/team/Rishabh Nahar HS 1.2.png";
import karan from "../assets/team/Karan HS.png";
import kavan from "../assets/team/Kavan HS.png";
import vidhi from "../assets/team/Vidhi HS.png";
import neha from "../assets/team/Neha HS.png";
import sakshi from "../assets/team/Sakshi HS.png";
import { Container } from "../components";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Rishabh Nahar",
      designation: "Quantitative Research Analyst",
      linkedin: "https://www.linkedin.com/in/johndoe",
      image: rishabh,
      email: "johndoe@example.com",
    },
    {
      name: "Karan Salecha",
      designation: "Algorthmic Trader",
      linkedin: "https://www.linkedin.com/in/janesmith",
      image: karan,
      email: "janesmith@example.com",
    },
    {
      name: "Kavan Sejpal",
      designation: "Proprietry Trader",
      linkedin: "https://www.linkedin.com/in/johndoe",
      email: "johndoe@example.com",
      image: kavan,
    },
    {
      name: "Vidhi",
      designation: "CTO",
      linkedin: "https://www.linkedin.com/in/janesmith",
      email: "janesmith@example.com",
      image: vidhi,
    },
    {
      name: "Neha",
      designation: "CEO",
      linkedin: "https://www.linkedin.com/in/johndoe",
      email: "johndoe@example.com",
      image: neha,
    },
    {
      name: "Sakshi",
      designation: "CTO",
      linkedin: "https://www.linkedin.com/in/janesmith",
      email: "janesmith@example.com",
      image: sakshi,
    },
  ];

  return (
    <Container>
      <div className="container minion-pro-font mx-auto py-8 mt-16">
        <h2 className="text-4xl sophia-pro-font font-bold text-center mb-6">
          About Qode
        </h2>
        <p className="text-center   mb-12 max-w-2xl text-lg mx-auto">
          At Qode, we offer rigorous data-driven investment strategies geared to
          build long term wealth. Experience transparent, low-cost portfolio
          management tailored to free up your time for life's important moments.
        </p>

        <div className="max-w-4xl bg-[#fafafa] p-14 mt-24 text-center mx-auto rounded-lg mb-16">
          <h3 className=" sophia-pro-font font-semibold text-4xl mb-6">
            Why Choose Qode?
          </h3>
          <ul className="list-decimal text-lg  list-inside space-y-2">
            {/* <li>Innovative financial technology solutions</li>
            <li>Expert team of developers, analysts, and fund managers</li> */}
            <li>Data-driven decision-making processes</li>
            <li>Tailored strategies for optimal financial growth</li>
            <li>Commitment to security and risk management</li>
          </ul>
        </div>

        <h2 className=" mt-24 text-4xl sophia-pro-font font-bold text-center mb-6">
          Our Team
        </h2>
        <p className="text-center text-black text-lg mb-12 max-w-3xl mx-auto">
          We at Qode are dedicated to growing your money and optimizing your
          financial future. Using innovative strategies and our extensive
          expertise, we effectively manage investments to maximize returns and
          minimize risks, ensuring comprehensive financial growth and security.
        </p>
        <div className="grid max-w-4xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
      {/* 
      <div className="bg-gray-100 py-16 mt-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6">Financial Analysis</h3>
              <p className="text-black text-lg">
                In-depth analysis of market trends and investment opportunities
                to guide your financial decisions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6">
                Portfolio Management
              </h3>
              <p className="text-black text-lg">
                Expert management of your investment portfolio to optimize
                returns and minimize risks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6">FinTech Solutions</h3>
              <p className="text-black text-lg">
                Cutting-edge financial technology tools to streamline your
                business operations and financial processes.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </Container>
  );
};

const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-white w-66 mx-auto shadow-md sophia-pro-font  rounded-lg overflow-hidden">
      <img src={member.image} alt={member.name} className="object-cover" />
      <div className="p-2">
        <div className="flex justify-between mb-1 items-start">
          <div>
            <h3 className="">{member.name}</h3>
            <span className="text-gray-400 text-sm ">{member.designation}</span>
          </div>
          <div className="flex gap-2 flex-row-reverse">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors text-md"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href={`mailto:${member.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black text-lg hover:text-gray-800 transition-colors text-md"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
