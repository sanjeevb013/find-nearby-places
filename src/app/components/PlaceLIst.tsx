
import React, {useEffect, useState } from 'react';
import { Place } from '../features/places/types';
import { PlaceCard } from './PlaceCard';
import { useAppDispatch } from '../lib/hooks';

interface Props {
  places: Place[];
  query:string
}

export const PlaceList: React.FC<Props> = ({ places, query }) => {
  const dispatch = useAppDispatch();
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // initial number of places to show

    useEffect(() => {
    setVisibleCount(6); // Reset visibleCount whenever the query changes
  }, [query]);

  if (!places.length) return <p>No places found.</p>;

  const sortedPlaces = [...places].sort((a, b) => a.distance - b.distance);


  const handleData = (id: string) => {
    setIsOpenDetailModal(true);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6); // show 6 more places
  };
  return (
    <div>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto h-auto">
        {sortedPlaces.slice(0, visibleCount).map((place) => (
          <div key={place.fsq_place_id} onClick={() => handleData(place.fsq_place_id)}>
            <PlaceCard place={place} />
          </div>
        ))}
      </div>

      {visibleCount < sortedPlaces.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
          >
            Load More...
          </button>
        </div>
      )}
    </div>
  );
};
