import React, { useState } from 'react';

interface Props {
  onLocate: () => void;
  loading: boolean;
}

export const LocationButton: React.FC<Props> = ({ onLocate, loading }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onLocate();
  };

  return (
    <button
      className={`
        w-[110px] h-[40px] flex items-center justify-start gap-[10px]
        bg-blue-600 text-white font-semibold rounded-full border-none
        relative cursor-pointer transition duration-500 shadow-[5px_5px_10px_rgba(0,0,0,0.116)] 
        pl-2 disabled:opacity-50
        ${!loading && !clicked ? 'animate-zoom-in-out' : ''}
        ${isHovered ? 'pause-animation' : ''}
        ${loading ? 'bg-blue-200 cursor-not-allowed' : 'hover:bg-blue-200'}
        active:scale-[0.97] active:duration-200
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={loading}
    >
      <svg
        className={`h-[25px] transition duration-[1500ms] ${
          isHovered ? 'rotate-[250deg]' : ''
        }`}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
      </svg>
      {loading ? 'Locating...' : 'Explore'}
    </button>
  );
};
