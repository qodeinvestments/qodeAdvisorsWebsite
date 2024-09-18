const Modal = ({ children, onClose }) => {
  // This function will be called when the backdrop is clicked
  const handleBackdropClick = (e) => {
    // If the click is on the backdrop (not on the modal itself), close the modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-60 flex items-center  justify-center z-20"
      onClick={handleBackdropClick} // Attach click handler to the backdrop
    >
      <div
        className="bg-black w-full max-w-2xl mx-4 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        <div className=" flex-1 overflow-auto flex items-center  mb-1  justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
