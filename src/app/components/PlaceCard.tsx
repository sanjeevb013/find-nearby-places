import React from 'react';
import { Place } from '../utils/foursquareApi';

interface Props {
  place: Place;
}

export const PlaceCard: React.FC<Props> = ({ place }) => {
  return (
    <div className="border rounded p-3 shadow-sm hover:shadow-md cursor-pointer mb-2 ">
      <h3 className="text-lg font-semibold">{place.name}</h3>
      <p className="text-sm text-gray-600">
        {place?.location?.address ?? 'Address not available'}
      </p>
      {/* {place.rating && <p>⭐ {place.rating}</p>} */}
    </div>
  );
};
