import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl overflow-hidden max-w-lg w-full">
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition ease-in-out duration-150"
          >
            <span className="sr-only">Close</span>✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export { Modal };
