import React, { useState } from "react";
import BookAMeet from "../Pages/BookAMeet";
import Modal from "./Modal";
const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="text-center mt-10">
      <p className=" text-4xl">
        I want to speak to fund manager before investing.
      </p>
      <button
        onClick={openModal}
        className="bg-black text-3xl text-white py-4 px-10 my-5 hover:bg-gray-800 transition-colors "
      >
        Talk to a Fund Manager
      </button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <BookAMeet />
        </Modal>
      )}
    </div>
  );
};

export default ModalButton;
