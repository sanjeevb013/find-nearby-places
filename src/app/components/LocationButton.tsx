import React from 'react';

interface Props {
  onLocate: () => void;
  loading: boolean;
}

export const LocationButton: React.FC<Props> = ({ onLocate, loading }) => {
  return (
    <button
      onClick={onLocate}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
    >
      {loading ? 'Locating...' : 'Detect My Location'}
    </button>
  );
};
