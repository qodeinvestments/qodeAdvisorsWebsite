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
    <div className="text-center  mt-10">
      <p className="sophia-pro-font text-xl">
        Do you want to speak to fund manager before investing?
      </p>
      <button
        onClick={openModal}
        className="bg-red-600 sm:text-md sophia-pro-font text-white py-3 px-8 my-5 hover:bg-red-500 transition-colors "
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
