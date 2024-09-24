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
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20"
      onClick={handleBackdropClick} // Attach click handler to the backdrop
    >
      <div
        className=" w-full max-w-4xl mx-4 p-6  relative"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Modal content */}
        <div className="flex-1 overflow-auto">{children}</div>

        {/* Close button (Optional) */}
      </div>
    </div>
  );
};

export default Modal;
