import React, { useState } from "react";
import Modal from "./Modal"; // You'll need to create this Modal component
import BookAMeet from "../Pages/BookAMeet"; // Import the BookAMeet component
import karan from "../assets/team/Karan HS.png";
import kavan from "../assets/team/Kavan HS.png";
import rishabh from "../assets/team/Rishabh Nahar HS 1.2.png";
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
    <div className="border border-black mt-10 graphik-font-regular p-10 bg-white">
      <div className="flex flex-col lg:flex-row gap-5 justify-between items-start lg:items-start">
        <div className=" w-1/3  ">
          <h2 className="text-6xl text-start">
            Do you want to speak to fund manager before investing?
          </h2>
        </div>
        <div className=" w-2/5 flex flex-col border border-black p-5 justify-between">
          <div className="flex flex-col  items-center text-end lg:text-right lg:ml-10">
            {managers.map((manager, index) => (
              <div key={index} className="p-6 flex flex-col items-center">
                <img
                  src={manager.image}
                  alt={manager.name}
                  className="w-52 h-52 rounded-full mb-4 object-cover"
                />
                <h3 className="text-4xl">{manager.name}</h3>
                <p className="text-gray-600 text-3xl mb-4">
                  {manager.position}
                </p>
              </div>
            ))}
          </div>
          <div className="text-end">
            <p className="my-4"></p>
            <button
              onClick={openModal}
              className="bg-black text-white py-3 px-6 hover:bg-gray-800 transition-colors text-lg"
            >
              Talk to a Fund Manager
            </button>
          </div>
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
