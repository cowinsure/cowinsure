import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

interface DialogProps {
  message: string;
  onClose: () => void;
}

const DialogCustom: React.FC<DialogProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-[40vh] shadow-lg">
                <div className="flex-1 flex flex-col justify-center items-center max-w-4xl text-center w-full mb-4">
                    <FaCheckCircle className="lg:w-auto w-full text-2xl text-start text-green-700 mb-2" />
                    <h2 className="text-xl font-bold text-[#687469] text-start mb-3">Congratulations!!</h2>
               
                </div>
                <p className="text-2xl text-center mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default DialogCustom;
