"use client"
import type { NextPage } from 'next';
import React, { useState } from 'react';
import { getCurrentLocation } from './utils/getLocation';
import { fetchPlaces, Place } from './utils/foursquareApi';
import { LocationButton } from './components/LocationButton';
import { PlaceList } from './components/PlaceLIst';
import { MapView } from './components/MapView';

const Home: NextPage = () => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState('restaurant');
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  const detectLocation = async () => {
    setLoadingLocation(true);
    try {
      const pos = await getCurrentLocation();
      const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
      setLocation(coords);
      await loadPlaces(coords, searchQuery);
    } catch (e) {
      alert('Failed to detect location');
      console.error(e);
    }
    setLoadingLocation(false);
  };

  const loadPlaces = async (coords: [number, number], query: string) => {
    setLoadingPlaces(true);
    const data = await fetchPlaces(coords[0], coords[1], query, 15);
    setPlaces(data);
    setLoadingPlaces(false);
  };

  // const onSearchChange = async (query: string) => {
  //   setSearchQuery(query);
  //   if (location) {
  //     await loadPlaces(location, query);
  //   }
  // };
  const onSearchChange = async (query: string) => {
  if (!location) {
    alert('Please detect your location first.');
    return;
  }
  setSearchQuery(query);
  await loadPlaces(location, query);
};

  return (
    <main className="flex-1 overflow-y-auto p-4 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Nearby Places Finder 🌍</h1>

      <div className="flex flex-col items-center gap-4 mb-6">
        <LocationButton onLocate={detectLocation} loading={loadingLocation} />

        <div className="space-x-3 w-[24rem] p-2">
          {['restaurant', 'cafe', 'park','hospital'].map((type) => (
            <button
              key={type}
              onClick={() => onSearchChange(type)}
              className={`px-4 py-2 rounded  ${
                searchQuery === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              } ${!location ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {location && (
          <>
            <p>
              Location detected: <strong>{location[0].toFixed(4)}, {location[1].toFixed(4)}</strong>
            </p>

             <div className="grid md:grid-cols-2 gap-6 mt-6 h-full w-full ">
              <PlaceList places={places} />
              <MapView places={places} center={location} />
            </div>
          </>
        )}

        {loadingPlaces && <p className="mt-4">Loading places...</p>}
      </div>
      <div>
        
      </div>
    </main>
  );
};

export default Home;
