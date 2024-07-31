const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 max-w-2xl w-full">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
