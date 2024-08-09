import React, { useState } from "react";
import Modal from "./Modal"; // You'll need to create this Modal component
import BookAMeet from "../Pages/BookAMeet"; // Import the BookAMeet component
import karan from "../assets/team/Karan HS.png";
import kavan from "../assets/team/Kavan HS.png";
import rishabh from "../assets/team/Rishabh Nahar HS 1.2.png";
import GrayContainer from "./container/GrayContainer";
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
    <div className="sophia-pro-font my-12 p-14 md:my-44">
      <h2 className="text-xl md:text-2xl font-black my-6 md:my-10 text-center">
        Do you want to speak to fund manager before investing?
      </h2>
      <div className="flex flex-col md:flex-row  mx-auto p-5 minion-pro-font justify-around items-center">
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
              <h3 className="text-xl sophia-pro-font font-bold md:text-2xl text-center md:text-left">
                {manager.name}
              </h3>
              <p className="text-black text-xl md:text-lg mb-4 text-center md:text-left">
                {manager.position}
              </p>
              <button
                onClick={openModal}
                className="bg-red-600 sophia-pro-font text-white py-2 px-4 md:py-3 font-medium md:px-6 hover:bg-red-500 transition-colors text-md md:text-base"
              >
                Talk to a Fund Manager
              </button>
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
