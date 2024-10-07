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
import { Helmet } from "react-helmet";

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
      designation: "Fund Manager",
      linkedin: "https://www.linkedin.com/in/kavan-sejpal-760a2b23/",
      email: "kavan@qodeinvest.com",
      image: kavan,
    },
    {
      name: "Gaurav Didwania",
      designation: "Fund Manager",
      linkedin: "https://www.linkedin.com/in/gaurav-didwania-234bbb37/",
      email: "gaurav.didwania@qodeinvest.com",
      image:
        "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    },
    {
      name: "Vidhi Chheda",
      designation: "Senior Quant Analyst",
      linkedin: "https://www.linkedin.com/in/vidhi-chheda-770600101/",
      email: "vidhi.chheda@qodeinvest.com",
      image: vidhi,
    },
    {
      name: "Purnanand Kulkarni",
      designation: "Senior Research Analyst",
      linkedin: "https://www.linkedin.com/in/purnanandkulkarni/",
      email: "",
      image:
        "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    },
    {
      name: "Pratik Tandel",
      designation: "Research Analyst",
      linkedin: "https://www.linkedin.com/in/pratiktandel2205/",
      email: "pratik.tandel@qodeinvest.com",
      image:
        "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    },
    {
      name: "Sanket Shinde",
      designation: "Frontend Developer",
      linkedin: "https://www.linkedin.com/in/sanket-shinde-71904b1b6/",
      email: "tech@qodeinvest.com",
      image:
        "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    },
    {
      name: "Harshal Pokle",
      designation: "Content Strategist, Graphic Designer",
      linkedin: "https://www.linkedin.com/in/harshalpokle/",
      email: "harshal.pokle@qodeinvest.com",
      image:
        "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    },
    // {
    //   name: "Kinjal Babariya",
    //   designation: "Operations Analyst",
    //   linkedin: "https://www.linkedin.com/in/kinjal-babariya/",
    //   email: "harshal.pokle@qodeinvest.com",
    //   image:
    //     "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    // },
    // {
    //   name: "Shrikant Rakte",
    //   designation: "Manager",
    //   // linkedin: "https://www.linkedin.com/in/vidhi-chheda-770600101/",
    //   // email: "harshal.pokle@qodeinvest.com",
    //   image:
    //     "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    // },
    // {
    //   name: "Uttam More",
    //   designation: "Office Boy, Runner",
    //   // linkedin: "https://www.linkedin.com/in/vidhi-chheda-770600101/",
    //   // email: "harshal.pokle@qodeinvest.com",
    //   image:
    //     "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    // },
    {
      name: "Kruti Dave",
      designation: "Accounts",
      linkedin: "https://www.linkedin.com/in/kruti-dave-201419185/",
      email: "harshal.pokle@qodeinvest.com",
      image:
        "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    },
    // {
    //   name: "Vaibhav",
    //   designation: "Operations",
    //   linkedin: "https://www.linkedin.com/in/kruti-dave-201419185/",
    //   email: "harshal.pokle@qodeinvest.com",
    //   image:
    //     "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    // },

    // {
    //   name: "Neha Bader",
    //   designation: "Quantitative Analyst",
    //   linkedin: "https://www.linkedin.com/in/neha-bader-a8395578/",
    //   email: "neha@qodeinvest.com",
    //   image: neha,
    // },
    // {
    //   name: "Sakshi",
    //   designation: "Quantitative Research Analyst",
    //   linkedin: "https://www.linkedin.com/in/sakshi-chheda/",
    //   email: "sakshi.chheda@qodeinvest.com",
    //   image: sakshi,
    // },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Meet the Qode Investments Team</title>
        <meta
          name="description"
          content="Learn about Qode Investments, our founders Karan, Rishabh, and Kavan, and meet the team that helps clients achieve their financial goals through data-driven strategies."
        />
        <meta
          name="keywords"
          content="Qode Investments, About Us, Karan Salecha, Rishabh Nahar, Kavan Sejpal, Vidhi Chheda, Fund Managers, Quantitative Investment Team"
        />
        <meta name="author" content="Qode Investments" />
      </Helmet>
      <Section padding="extralarge" className="mt-5">
        <Heading
          isItalic
          className="sm:text-semiheading text-mobileSemiHeading text-center mb-1 text-brown font-semiheading"
        >
          Our Story
        </Heading>
        <Text className="text-center text-body font-body mb-7">
          Our journey started when we (Karan, Kavan, and Rishabh) invested our
          money in the stock market using quant models. We had a passion for
          finance, and soon enough, we began consistently outperforming the
          market averages. This success gave us the confidence to invest the
          reserve capital from our family business. We grew the capital
          significantly. <br />
          <br /> As time passed, it became clear to us: we’re really good at
          this. Why not use our expertise to help others grow their wealth too?
          With this in mind, we launched our first quant strategy, "The Quant
          Growth Fund", with another fund manager. It’s been five years since
          then, and we’re proud to have achieved a CAGR of 35.1%. Compared to
          the 5-year CAGR of all the PMS providers, we currently stand 4th.{" "}
          <br />
          <br /> This success sparked the next phase of our journey. We launched
          our own PMS and created new schemes tailored for different types of
          investors, each with their unique financial goals and varying risk
          appetites. And that's exactly what we're doing now—expanding to help
          others achieve financial growth through smart, data-driven strategies.
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
    </>
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
          {member.linkedin && member.email && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
