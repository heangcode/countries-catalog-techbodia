import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export { Modal };
