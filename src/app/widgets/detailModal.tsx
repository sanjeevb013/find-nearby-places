import React from "react";
import { useAppSelector } from "../lib/hooks";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose }) => {
  const { placeDetail, detailsStatus, detailsError } = useAppSelector((s) => s.places);
  
  if (!isOpen) return null;

  // Loading or error handling
  if (detailsStatus === "loading") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
        <div className="bg-white p-6 rounded-xl shadow-lg">Loading...</div>
      </div>
    );
  }

  if (detailsError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
        <div className="bg-white p-6 rounded-xl shadow-lg text-red-500">Error: {detailsError}</div>
      </div>
    );
  }

  if (!placeDetail) return null;

  const { name, location, categories, geocodes } = placeDetail;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-600 text-2xl font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Category */}
        {categories?.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <img
              src={`${categories[0].icon.prefix}bg_64${categories[0].icon.suffix}`}
              alt={categories[0].name}
              className="w-8 h-8"
            />
            <span className="text-sm text-gray-700">{categories[0].name}</span>
          </div>
        )}

        {/* Address */}
        <div className="mb-3 space-y-1">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Address:</span>{" "}
            {location.formatted_address || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Postcode:</span>{" "}
            {location.postcode || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Country:</span>{" "}
            {location.country}
          </p>
        </div>

        {/* Google Maps link */}
        <a
          href={`https://www.google.com/maps?q=${geocodes.main.latitude},${geocodes.main.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
};

export default DetailModal;
