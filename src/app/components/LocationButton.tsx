import React, { useState } from 'react';

interface Props {
  onLocate: () => void;
  loading: boolean;
}

export const LocationButton: React.FC<Props> = ({ onLocate, loading }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true); // remove animation
    onLocate();       // trigger the parent function
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 cursor-pointer
        ${!loading && !clicked ? 'animate-zoom-in-out' : ''}
        ${isHovered ? 'pause-animation' : ''}`}
    >
      {loading ? 'Locating...' : 'Detect My Location'}
    </button>
  );
};
