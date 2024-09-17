import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        {children}
        <p>Do you wish for an extended time ?</p>
        <button 
          onClick={onClose} 
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
        <button 
          onClick={onClose} 
          className="mt-4 ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Modal;