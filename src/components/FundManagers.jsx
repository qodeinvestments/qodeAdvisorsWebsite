import React, { useState } from "react";
import Modal from "./Modal"; // You'll need to create this Modal component
import BookAMeet from "../Pages/BookAMeet"; // Import the BookAMeet component
import karan from "../assets/team/Karan HS.png";
import kavan from "../assets/team/Kavan HS.png";
import rishabh from "../assets/team/Rishabh Nahar HS 1.2.png";
const FundManagers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const managers = [
    {
      name: "Rishabh Nahar",
      position: "Fund Manager",
      image: rishabh, // Replace with actual image path
    },
    {
      name: "Karan Salecha",
      position: "Fund Manager",
      image: karan, // Replace with actual image path
    },
    {
      name: "Kavan Sejpal",
      position: "Fund Manager",
      image: kavan, // Replace with actual image path
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border-b  graphik-font-regular mx-auto py-16 bg-white">
      <h2 className="text-3xl  mb-12 text-center">Our Fund Managers</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {managers.map((manager, index) => (
          <div
            key={index}
            className="border border-black p-6 flex flex-col items-center text-center"
          >
            <img
              src={manager.image}
              alt={manager.name}
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl  mb-2">{manager.name}</h3>
            <p className="text-gray-600 mb-4">{manager.position}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="my-4">
          I want to speak to fund manager before investing.
        </p>
        <button
          onClick={openModal}
          className="bg-black text-white py-3 px-6 hover:bg-gray-800 transition-colors text-lg"
        >
          Talk to a Fund Manager
        </button>
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
