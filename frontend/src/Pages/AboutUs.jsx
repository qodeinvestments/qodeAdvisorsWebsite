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
    <Section withBorder padding="extralarge" className="mt-9">
      <Heading className="text-heading text-brown font-heading text-center mb-4">
        About Qode
      </Heading>
      <Text className="text-subheading font-subheading">Our Story</Text>
      <Text className="text-start text-body font-body mb-4">
        Our founders (Karan, Kavan & Rishabh) started with investing their own
        money in the stock market using Quant models. When they started
        consistently outperforming the market average, they started investing
        their family business reserve capital & grew it significantly. Over the
        years they realised - Hey, we’re good at this why not help others grow
        their wealth as well. So, they launched their quant strategy - Quant
        Growth Fund with SRE (Another Fund manager). It’s been 6 years now since
        the scheme is live. Its absolute return is - Which means if you had
        invested 1CR when the scheme when it started then you would’ve made -
        Seeing this they decided to start their own PMS and launch more schemes
        for different investors with different financial goals and risk appetite
        fund and to make a business out this. Business to help Investors grow
        their money in the long term with high certainty.
      </Text>
      <Heading className="text-semiheading font-semibold text-center mb-2">
        Our Team
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </Section>
  );
};

const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-white w-full overflow-hidden border border-brown rounded-sm">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-60 object-cover"
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
