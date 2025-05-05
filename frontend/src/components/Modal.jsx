import { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    // Add class to body to prevent scrolling
    document.body.style.overflow = "hidden";

    // Clean up: re-enable scrolling when modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  const handleBackdropClick = (e) => {
    // If the click is on the backdrop (not on the modal itself), close the modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 min-h-screen"
      onClick={handleBackdropClick} // Attach click handler to the backdrop
    >
      <div
        className="w-full max-w-6xl mx-1 sm:mx-4 px-18 bg-lightBeige  relative  sm:max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Close button */}
        <button
          className="absolute top-1 right-2 text-2xl sm:text-subheading text-beige z-30 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Modal content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;