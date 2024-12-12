import React from "react";
const Modal = ({ isOpen, onClose, children, modalheading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white p-2 rounded-lg shadow-xl w-fit  transform transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-orange-500 text-xl">
            {modalheading}
          </span>
          <button
            className="text-4xl font-bold text-orange-500"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="modal-body ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
