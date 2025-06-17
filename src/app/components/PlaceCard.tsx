import React from 'react';
import { Place } from '../utils/foursquareApi';

interface Props {
  place: Place;
}

export const PlaceCard: React.FC<Props> = ({ place }) => {
  const category = place.categories?.[0]; // first category (optional chaining)

  const iconUrl = category
    ? `${category.icon.prefix}64${category.icon.suffix}`
    : null;
  return (
    <div className="border rounded p-3 shadow-sm hover:shadow-md cursor-pointer mb-2 flex items-center gap-4">
      {iconUrl && (
        <img src={iconUrl} alt={category?.name} className="w-8 h-8 bg-gray-400 rounded-[50%] p-1" />
      )}
      <div>
        <h3 className="text-lg font-semibold">{place.name}</h3>
        <p className="text-sm text-gray-600">
          {place?.location?.address ?? 'Address not available'}
        </p>
        {/* {place.rating && <p>⭐ {place.rating}</p>} */}
      </div>
    </div>
  );
};
