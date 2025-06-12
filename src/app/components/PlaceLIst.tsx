import React from 'react';
import { Place } from '../utils/foursquareApi';
import { PlaceCard } from './PlaceCard';

interface Props {
  places: Place[];
}

export const PlaceList: React.FC<Props> = ({ places }) => {
  if (!places.length) return <p>No places found.</p>;

     const sortedPlaces = [...places].sort((a, b) => a.distance - b.distance);
  return (
    <div className="mt-4 overflow-y-auto h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-col-3 gap-2">
      {sortedPlaces.map((place) => (
        <PlaceCard key={place.fsq_id} place={place} />
      ))}
    </div>
  );
};
