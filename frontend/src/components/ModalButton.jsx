import React, { useState } from "react";
import BookAMeet from "../Pages/BookAMeet";
import Modal from "./Modal";
import Button from "./common/Button";
import Text from "./common/Text";
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
      <Text className=" md:text-subheading">
        Do you want to speak to fund manager before investing?
      </Text>
      <Button onClick={openModal} className="mt-5">
        Talk to a Fund Manager
      </Button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <BookAMeet />
        </Modal>
      )}
    </div>
  );
};

export default ModalButton;
