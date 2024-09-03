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
    // {
    //   name: "Rishabh Nahar",
    //   position: "Fund Manager",
    //   image: rishabh, // Replace with actual image path
    // },
    {
      name: "Karan Salecha",
      position: "Fund Manager",
      image: karan, // Replace with actual image path
    },
    // {
    //   name: "Kavan Sejpal",
    //   position: "Fund Manager",
    //   image: kavan, // Replace with actual image path
    // },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <Heading
        level={2}
        className="md:text-2xl font-black my-6 md:my-10 text-center"
      >
        Do you want to speak to fund manager before investing?
      </Heading>
      <div className="flex flex-col md:flex-row  mx-auto p-5  justify-around items-center">
        {managers.map((manager, index) => (
          <div
            key={index}
            className="flex flex-col  md:flex-row items-center  justify-center w-full mb-8 md:mb-0"
          >
            {/* Image */}
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <img
                src={manager.image}
                alt={manager.name}
                className="w-32 h-32 md:w-52 md:h-52 rounded-full object-cover"
              />
            </div>

            {/* Name, Designation, and Button */}
            <div className="flex flex-col items-center md:items-start md:ml-10">
              <Heading
                level={3}
                className="md:text-lg  font-bold  text-center md:text-left"
              >
                {manager.name}
              </Heading>
              <Text className="text-black md:text-lg  mb-4 text-center md:text-left">
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
