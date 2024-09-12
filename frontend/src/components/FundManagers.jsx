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

const FundManagers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const managers = [
    {
      name: "Karan Salecha",
      position: "Fund Manager",
      image: karan,
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <Heading
        level={2}
        className="text-heading font-black mt-3 mb-3 text-center"
      >
        Do you want to speak to a fund manager before investing?
      </Heading>
      <div className="flex flex-col md:flex-row justify-center items-center gap-3">
        {managers.map((manager, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex-shrink-0">
              <img
                src={manager.image}
                alt={manager.name}
                className="w-32 h-32 md:w-52 md:h-52 rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col items-center md:items-start">
              <Heading
                level={3}
                className="text-body font-bold text-center md:text-left"
              >
                {manager.name}
              </Heading>
              <Text className="text-black text-body mb-1 text-center md:text-left">
                {manager.position}
              </Text>
              <Button onClick={openModal}>Schedule A Call</Button>
            </div>
          </div>
        ))}
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
