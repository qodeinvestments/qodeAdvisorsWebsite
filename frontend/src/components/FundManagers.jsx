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
    <div className="flex flex-col-reverse md:flex-row-reverse items-center md:items-center  text-center md:gap-4 justify-between w-full">
      {/* Right Section: Image or Fund Managers */}
      {/* <div className="md:w-1/2 w-full flex flex-col justify-center md:justify-end">
        <div className="flex-shrink-0">
          <img
            src={founders}
            alt="Founders"
            className="w-full max-w-xs md:max-w-lg object-cover"
          />
        </div>
        <div className="flex sm:hidden mt-2 justify-center md:justify-start">
          <Button
            className="bg-beige shadow-md hover:bg-lightBrown transition duration-300"
            onClick={openModal}
          >
            Schedule A Meeting
          </Button>
        </div>
      </div> */}

      {/* Left Section */}
      <div className=" w-full  sm:px-9 ">
        <Heading className="text-mobileSemiHeading md:text-semiheading italic text-brown mb-2 text-center ">
          {text
            ? text
            : "Want to speak to the our fund manager before investing?"}
        </Heading>

        <div className="sm:flex  justify-center md:justify-center">
          <Button
            className="bg-beige shadow-md hover:bg-lightBrown transition duration-300"
            onClick={openModal}
          >
            Schedule A Meeting
          </Button>
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
