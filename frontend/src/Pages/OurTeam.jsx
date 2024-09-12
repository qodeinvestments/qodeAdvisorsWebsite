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
import Heading from "../components/common/Heading";

const OurTeam = () => {
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
      <div className="container  mx-auto py-8  mt-16">
        <Heading
          level={2}
          className="md:text-subheading inter-font  text-center mb-6"
        >
          Our Team
        </Heading>
        <Text className="text-center text-gray-400 mb-12">
          We are Code Developers, Analysts, and Fund Managers dedicated to
          growing your money and optimizing your financial future. Using
          innovative strategies and our extensive expertise, we effectively
          manage investments to maximize returns and minimize risks, ensuring
          comprehensive financial growth and security.
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </Container>
  );
};

const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-white shadow-md   rounded-lg overflow-hidden">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-96 object-cover"
      />
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
              className="text-gray-600 hover:text-gray-800 transition-colors text-body"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
