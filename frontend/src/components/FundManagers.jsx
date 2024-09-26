import React, { useState } from "react";
import Modal from "./Modal"; // You'll need to create this Modal component
import BookAMeet from "../Pages/BookAMeet"; // Import the BookAMeet component
import karan from "../assets/team/Karan HS.png";
import kavan from "../assets/team/Kavan HS.png";
import rishabh from "../assets/team/Rishabh Nahar HS 1.2.png";
import GrayContainer from "./container/GrayContainer";
import Button from "./common/Button";
import Heading from "./common/Heading";
import Text from "./common/Text";
import founders from "../assets/founders.jpg";
const FundManagers = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const managers = [
    {
      name: "Karan Salecha",
      position: "Fund Manager",
      image:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-2  md:gap-4 justify-between w-full">
      {/* Left Section */}
      <div className="md:w-1/2 w-full text-start sm:px-4 ">
        <Heading className="text-mobileSemiHeading md:text-semiheading italic text-brown mb-4 text-center md:text-start">
          {text
            ? text
            : "Do you want to speak to a fund manager to know more before investing?"}
        </Heading>

        <Text className="text-body mt-1 text-center md:text-start text-beige mb-2">
          Schedule a meeting with our fund manager.
        </Text>

        <div className="flex justify-center md:justify-start">
          <Button
            className="bg-beige shadow-md  hover:bg-lightBrown transition duration-300"
            onClick={openModal}
          >
            Schedule A Call
          </Button>
        </div>
      </div>

      {/* Right Section: Image or Fund Managers */}
      <div className="md:w-1/2 w-full flex justify-center md:justify-end">
        <div className="flex-shrink-0">
          <img
            src={founders}
            alt="Founders"
            className="w-full max-w-xs md:max-w-lg object-cover"
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <BookAMeet />
        </Modal>
      )}
    </div>
  );
};

export default FundManagers;
