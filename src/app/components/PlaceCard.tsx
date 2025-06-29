import React from 'react';
import { Place } from '../utils/foursquareApi';
import { getCurrentLocation } from '../utils/getLocation';

interface Props {
  place: Place;
}

export const PlaceCard: React.FC<Props> = ({ place }) => {
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
        const next  = [pos.coords.latitude, pos.coords.longitude] as [number, number];

      const userLat = next[0];
      const userLng = next[1];
      // console.log(userLat, userLng, next)
      const destinationLat = place.geocodes?.main?.latitude;
      const destinationLng = place.geocodes?.main?.longitude;

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
    <div className="border rounded p-3 shadow-sm hover:shadow-md cursor-pointer mb-2 flex flex-col gap-2 h-full overflow-hidden">
      <div className="flex items-center gap-4">
        {iconUrl && (
          <img
            src={iconUrl}
            alt={category?.name}
            className="w-8 h-8 bg-gray-400 rounded-[50%] p-1"
          />
        )}
        <div>
          <h3 className="text-lg font-semibold">{place.name}</h3>
          <p className="text-sm text-gray-600">
            {place?.location?.address ?? 'Address not available'}
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
