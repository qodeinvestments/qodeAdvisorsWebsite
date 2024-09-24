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
import Section from "../components/container/Section";
import Heading from "../components/common/Heading";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Karan Salecha",
      designation: "Principal Officer, COO",
      linkedin: "https://www.linkedin.com/in/karan-salecha-181309a7/",
      image: karan,
      email: "karan@qodeinvest.com",
    },
    {
      name: "Rishabh Nahar",
      designation: "Fund Manager, CEO",
      linkedin: "https://www.linkedin.com/in/rishabhnahar",
      image: rishabh,
      email: "rishabh@qodeinvest.com",
    },
    {
      name: "Kavan Sejpal",
      designation: "Founding Partner, Proprietary Trader",
      linkedin: "https://www.linkedin.com/in/kavan-sejpal-760a2b23/",
      email: "kavan@swancapital.in",
      image: kavan,
    },
    {
      name: "Vidhi Chheda",
      designation: "Partner, Head of Quant Research",
      linkedin: "https://www.linkedin.com/in/vidhi-chheda-770600101/",
      email: "vidhi.chheda@qodeinvest.com",
      image: vidhi,
    },
    // {
    //   name: "Neha Bader",
    //   designation: "Quantitative Analyst",
    //   linkedin: "https://www.linkedin.com/in/neha-bader-a8395578/",
    //   email: "neha@swancapital.in",
    //   image: neha,
    // },
    // {
    //   name: "Sakshi",
    //   designation: "Quantitative Research Analyst",
    //   linkedin: "https://www.linkedin.com/in/sakshi-chheda/",
    //   email: "sakshi.chheda@swancapital.in",
    //   image: sakshi,
    // },
  ];

  return (
    <Section padding="extralarge" className="mt-5">
      <Heading
        isItalic
        className="sm:text-semiheading text-mobileSemiHeading text-center mb-1 text-brown font-semiheading"
      >
        Our Story
      </Heading>
      <Text className="text-center text-body font-body mb-7">
        Our founders (Karan, Kavan & Rishabh) started with investing their own
        money in the stock market using Quant models. <br /> When they started
        consistently outperforming the market average, they started investing
        their family business reserve capital & grew it significantly. <br />
        <br /> Over the years they realised - Hey, we’re good at this why not
        help others grow their wealth as well. <br />
        <br /> So, they launched their quant strategy - Quant Growth Fund with
        another Fund manager. It’s been 5 years, and our CAGR is{" "}
        <strong>35.1%</strong>. <br /> And compared to all the PMS's 5Y CAGR we
        stand 4th. <br /> <br /> Seeing this they decided to start their own PMS
        and launch more schemes for different investors with different financial
        goals and risk appetite.
      </Text>
      <Heading
        isItalic
        className="sm:text-semiheading text-mobileSemiHeading font-semibold text-center mb-3 text-brown"
      >
        Our Team
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </Section>
  );
};

const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-white w-full overflow-hidden  rounded-sm">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-[287px] object-cover"
      />
      <div className="p-1">
        <div className="flex justify-between items-start mb-18">
          <div>
            <Text className="text-2xl font-subheading text-brown">
              {member.name}
            </Text>
            <span className="text-xs text-text-secondary">
              {member.designation}
            </span>
          </div>
          <div className="flex gap-18 flex-row-reverse">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brown hover:text-beige transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-1xl" />
            </a>
            <a
              href={`mailto:${member.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brown hover:text-beige transition-colors"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-1xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
