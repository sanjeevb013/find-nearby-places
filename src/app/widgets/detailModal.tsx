// components/DetailModal.tsx
import React from "react";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-right">
          <button onClick={onClose} className="text-gray-600 hover:text-black text-2xl font-bold">
            &times;
          </button>
        </div>
        <div className="mt-3">{content}</div>
      </div>
    </div>
  );
};

export default DetailModal;
