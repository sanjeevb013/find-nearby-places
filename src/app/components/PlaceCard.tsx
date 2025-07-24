import React, { useContext } from 'react';
import { Place } from '../features/places/types';
import { getCurrentLocation } from '../utils/getLocation';
import { ThemeContext } from '../context/ThemeContext';
interface Props {
  place: Place;
}

export const PlaceCard: React.FC<Props> = ({ place }) => {
      const { theme, toggleTheme } = useContext(ThemeContext)
  const category = place.categories?.[0];
  const iconUrl = category
    ? `${category.icon.prefix}64${category.icon.suffix}`
    : null;

  const handleGetDirections = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported by your browser.');
      return;
    }

    try {
      const pos = await getCurrentLocation();
      const [userLat, userLng] = [pos.coords.latitude, pos.coords.longitude];

      const destinationLat = place.latitude;
      const destinationLng = place.longitude;

      if (userLat && userLng && destinationLat && destinationLng) {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}`;
        window.open(mapsUrl, '_blank');
      } else {
        alert('Destination coordinates not available.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to get your location. Please allow location access.');
    }
  };

  return (
<div
  className={`border rounded-xl p-4 sm:p-6 transition-shadow duration-300 ease-in-out 
    shadow-md  cursor-pointer mb-3 flex flex-col justify-between gap-3 h-full overflow-hidden
   bg-gradient-to-br from-gray-400 to-gray-800 text-white`}
>
      <div className="flex items-center gap-4">
        {iconUrl && (
          <img
            src={iconUrl}
            alt={category?.name}
            className="w-8 h-8 rounded-full p-1 "
          />
        )}
        <div>
          <h3 className="text-lg font-semibold">{place.name}</h3>
          <p className="text-sm">
            {place.location?.address ?? 'Address not available'}
          </p>
        </div>
      </div>

      <button
        onClick={handleGetDirections}
        className="mt-2 w-fit px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded ml-10 cursor-pointer"
      >
        Get Directions
      </button>
    </div>
  );
};
