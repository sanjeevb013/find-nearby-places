"use client";
import type { NextPage } from 'next';
import React, { useState } from 'react';

import { PlaceList }   from './components/PlaceLIst';
import { LocationButton } from './components/LocationButton';
import { MapView }     from './components/MapView';

import { fetchPlaces, selectAllPlaces } from '../app/features/places/PlacesSlice';
import { useAppDispatch, useAppSelector } from '../app/lib/hooks';
import { getCurrentLocation } from './utils/getLocation';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  /** ---- local-only state ---- */
  const [coords, setCoords]     = useState<[number, number] | null>(null);
  const [locLoading, setLocLoading] = useState(false);
  const [query, setQuery]       = useState('restaurant');

  /** ---- redux state ---- */
  const places       = useAppSelector(selectAllPlaces);
  const placesStatus = useAppSelector((s) => s.places.status);
  const placesError  = useAppSelector((s) => s.places.error);

  /* Detect location, then fire the thunk */
  const handleDetectLocation = async () => {
    setLocLoading(true);
    try {
      const pos   = await getCurrentLocation();
      const next  = [pos.coords.latitude, pos.coords.longitude] as [number, number];
      localStorage.setItem("userLocation", JSON.stringify(next));
      setCoords(next);
      // immediately pull nearby places for the initial chip
      dispatch(fetchPlaces({ lat: next[0], lng: next[1], query, limit: 15 }));
    } catch (err) {
      alert('Failed to detect location');
      console.error(err);
    }
    setLocLoading(false);
  };
  console.log(coords,"hhh")
  /* Chip click → update query and call the thunk */
  const handleQueryClick = (nextQuery: string) => {
    if (!coords) {
      alert('Please detect your location first.');
      return;
    }
    setQuery(nextQuery);
    dispatch(fetchPlaces({ lat: coords[0], lng: coords[1], query: nextQuery, limit: 15 }));
  };
  return (
    <main className="flex-1 overflow-y-auto p-4 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Nearby Places Finder 🌍</h1>

      <div className="flex flex-col items-center gap-4 mb-6">
        <LocationButton onLocate={handleDetectLocation} loading={locLoading} />

        {/* category chips */}
        <div className="space-x-3 w-[24rem] p-2">
          {['restaurant', 'cafe', 'park', 'hospital'].map((type) => (
            <button
              key={type}
              onClick={() => handleQueryClick(type)}
              className={`px-4 py-2 rounded ${
                query === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              } ${!coords ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {type[0].toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {coords && (
          <>
            <p>
              Location detected:&nbsp;
              <strong>{coords[0].toFixed(4)}, {coords[1].toFixed(4)}</strong>
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6 h-full w-full">
              <PlaceList places={places} query={query}/>
              <MapView   places={places} center={coords} />
            </div>
          </>
        )}

        {/* feedback */}
        {placesStatus === 'loading' && <p className="mt-4">Loading places…</p>}
        {placesError && <p className="text-red-600">{placesError}</p>}
      </div>
    </main>
  );
};

export default Home;
