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
        className="w-full sm:max-w-4xl mx-1 sm:mx-4 sm:p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Close button */}
        <button
          className="absolute -top-3 -right-2 sm:top-3 sm:right-4 text-body sm:text-subheading m-4 text-white z-30 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
