import React, { useState } from 'react';
import { Place } from '../utils/foursquareApi';
import { PlaceCard } from './PlaceCard';
import {useAppDispatch} from "../lib/hooks"
import { fetchPlaceDetails } from '../features/places/PlacesSlice';
import Widgets from '../widgets/index'
interface Props {
  places: Place[];
}

export const PlaceList: React.FC<Props> = ({ places }) => {
  const dispatch= useAppDispatch();
  const [isOpenDetailModal, setIsOpenDetailModal]=useState(false);
  if (!places.length) return <p>No places found.</p>;

  const sortedPlaces = [...places].sort((a, b) => a.distance - b.distance);
  const closeModal = () => setIsOpenDetailModal(false);

  const handleData=(id : string)=>{
    dispatch(fetchPlaceDetails(id));
    setIsOpenDetailModal(true);
  }
  return (
    <div className="overflow-y-auto h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-col-3 gap-2">
      {sortedPlaces.map((place) => (
        <div onClick={()=>handleData(place.fsq_id)}>
        <PlaceCard key={place.fsq_id} place={place} />
        </div>
      ))}
      <Widgets.DetailModal
       isOpen={isOpenDetailModal}
        onClose={closeModal}
      />
    </div>
  );
};
