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
import Text from "../components/common/Text";

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
      <div className="container  mx-auto py-8 mt-16">
        <Heading level={2} className="text-4xl  font-bold text-center mb-6">
          About Qode
        </Heading>
        <Text className="text-center   mb-12 max-w-2xl md:text-subheading mx-auto">
          At Qode, we offer rigorous data-driven investment strategies geared to
          build long term wealth. Experience transparent, low-cost portfolio
          management tailored to free up your time for life's important moments.
        </Text>

        <div className="max-w-4xl bg-[#fafafa] p-14 mt-24 text-center mx-auto rounded-lg mb-16">
          <Heading level={3} className="  font-semibold text-4xl mb-6">
            Why Choose Qode?
          </Heading>
          <ul className="list-decimal md:text-subheading  list-inside space-y-2">
            {/* <li>Innovative financial technology solutions</li>
            <li>Expert team of developers, analysts, and fund managers</li> */}
            <li>Data-driven decision-making processes</li>
            <li>Tailored strategies for optimal financial growth</li>
            <li>Commitment to security and risk management</li>
          </ul>
        </div>

        <Heading
          level={2}
          className=" mt-24 text-4xl  font-bold text-center mb-6"
        >
          Our Team
        </Heading>
        <Text className="text-center text-black md:text-subheading mb-12 max-w-3xl mx-auto">
          We at Qode are dedicated to growing your money and optimizing your
          financial future. Using innovative strategies and our extensive
          expertise, we effectively manage investments to maximize returns and
          minimize risks, ensuring comprehensive financial growth and security.
        </Text>
        <div className="grid max-w-4xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
      {/* 
      <div className="bg-gray-100 py-16 mt-16">
        <div className="container mx-auto">
          <Heading level={2} level={2} className="text-2xl font-bold text-center mb-8">Our Services</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Heading level={3} className="text-heading font-semibold mb-6">Financial Analysis</Heading>
              <Text className="text-black md:text-subheading">
                In-depth analysis of market trends and investment opportunities
                to guide your financial decisions.
              </Text>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Heading level={3} className="text-heading font-semibold mb-6">
                Portfolio Management
              </Heading>
              <Text className="text-black md:text-subheading">
                Expert management of your investment portfolio to optimize
                returns and minimize risks.
              </Text>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Heading level={3} className="text-heading font-semibold mb-6">FinTech Solutions</Heading>
              <Text className="text-black md:text-subheading">
                Cutting-edge financial technology tools to streamline your
                business operations and financial processes.
              </Text>
            </div>
          </div>
        </div>
      </div> */}
    </Container>
  );
};

const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-white w-66 mx-auto shadow-md   rounded-lg overflow-hidden">
      <img src={member.image} alt={member.name} className="object-cover" />
      <div className="p-2">
        <div className="flex justify-between mb-1 items-start">
          <div>
            <Heading level={3} className="">
              {member.name}
            </Heading>
            <span className="text-gray-400 text-xs ">{member.designation}</span>
          </div>
          <div className="flex gap-2 flex-row-reverse">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors text-body"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href={`mailto:${member.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black md:text-subheading hover:text-gray-800 transition-colors text-body"
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
