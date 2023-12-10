import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Product from './product';

const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Set the app element when the component mounts
  useEffect(() => {
    Modal.setAppElement('#root'); // Replace '#root' with the id or class of your root element
  }, []);

  return (
    <div className="px-4 py-4 rounded-md shadow-lg text-center bg-yellow-500 text-white font-semibold">
      <button
        onClick={openModal}
       
      >
        Open Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            border: 'none',
            borderRadius: '8px',
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4"><Product/></h2>
        <button
          onClick={closeModal}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close Modal
        </button>
      </Modal>
    </div>
  );
};

export default ModalButton;
