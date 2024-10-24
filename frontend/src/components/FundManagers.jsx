import React, { useState } from "react";
import Modal from "./Modal"; // You'll need to create this Modal component
import BookAMeet from "../Pages/BookAMeet"; // Import the BookAMeet component

import GrayContainer from "./container/GrayContainer";
import Button from "./common/Button";
import Heading from "./common/Heading";
import Text from "./common/Text";
import founders from "../assets/founders.jpg";
const FundManagers = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const VITE_GOOGLE_MEET_URL = import.meta.env.VITE_GOOGLE_MEET_URL;

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
    <div className="flex flex-col-reverse md:flex-row-reverse items-center md:items-center text-center justify-between w-full">
      <div className="w-full md:px-6">
        <Heading className="text-mobileSemiHeading md:text-semiheading italic text-brown mb-4 text-center">
          {text ? text : "Want to speak to our fund manager before investing?"}
        </Heading>

        {/* <div className="flex justify-center">
          <Button
            className="bg-beige shadow-md hover:bg-lightBrown transition duration-300"
            onClick={openModal}
          >
            Schedule A Meeting
          </Button>
        </div> */}

        <div className="flex justify-center">
          <Button
            className="bg-beige shadow-md hover:bg-lightBrown transition duration-300"
            href={VITE_GOOGLE_MEET_URL}
            target={"_blank"}
          >
            Schedule A Call
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <BookAMeet />
        </Modal>
      )}
    </div>
  );
};

export default FundManagers;
