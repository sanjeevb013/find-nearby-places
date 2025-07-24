"use client";
import type { NextPage } from 'next';
import React, { useContext, useState } from 'react';

import { PlaceList }   from './components/PlaceLIst';
import { LocationButton } from './components/LocationButton';
import { MapView }     from './components/MapView';

import { fetchPlaces, selectAllPlaces } from '../app/features/places/PlacesSlice';
import { useAppDispatch, useAppSelector } from '../app/lib/hooks';
import { getCurrentLocation } from './utils/getLocation';
import { fetchAddress } from './features/currentAddress/currentAddressSLice';
import { fetchWeather } from './features/weather/weatherSlice';
import { ThemeContext } from './context/ThemeContext';
import ProtectedLayout from './components/ProtectedLayout';
import toast from 'react-hot-toast';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { theme, toggleTheme } = useContext(ThemeContext)
  /** ---- local-only state ---- */
  const [coords, setCoords]     = useState<[number, number] | null>(null);
  const [locLoading, setLocLoading] = useState(false);
  const [query, setQuery]       = useState('restaurant');

  /** ---- redux state ---- */
  const places = useAppSelector(selectAllPlaces);
  const {status,error} = useAppSelector((s) => s.places);
    const {currentAddress,addressStatus,addressError} = useAppSelector((s) => s.address);
      const {weatherSuccess,weatherStatus,weatherError} = useAppSelector((s) => s.weather);

  /* Detect location, then fire the thunk */
  const handleDetectLocation = async () => {
    setLocLoading(true);
    try {
      const pos   = await getCurrentLocation();
      const next  = [pos.coords.latitude, pos.coords.longitude] as [number, number];
      setCoords(next);

      dispatch(fetchWeather({lat: next[0], lng: next[1]}))
       dispatch(fetchAddress({ lat: next[0], lng: next[1]}));
      dispatch(fetchPlaces({ lat: next[0], lng: next[1], query, limit: 15 }));
    } catch (err) {
      toast.error('Failed to detect location');
      console.error(err);
    }
    setLocLoading(false);
  };
  
  const handleQueryClick = (nextQuery: string) => {
    if (!coords) {
      toast.error('Please detect your location first.');
      return;
    }
    setQuery(nextQuery);
    dispatch(fetchPlaces({ lat: coords[0], lng: coords[1], query: nextQuery, limit: 15 }));
  };
  return (
    <>
        <ProtectedLayout>
    <main className={`flex-1 overflow-y-auto p-4 w-full bg-cover bg-center overflow-hidden ${theme === "dark" && coords ? 'bg-image': theme === "light" && coords ? 'light-bg-image ':"null"}`}>
     
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
    <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between w-full px-4 py-4 bg-cover bg-center gap-4">
      {weatherSuccess && (
        <div className="rounded-xl bg-white/80 p-3 w-full sm:w-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">Weather</h2>
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${weatherSuccess.weather[0].icon}@2x.png`}
              alt={weatherSuccess.weather[0].description}
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
            <div>
              <p className="text-xl font-bold text-black">
                {Math.round(weatherSuccess.main.temp)}°C
              </p>
              <p className="capitalize text-black">{weatherSuccess.weather[0].description}</p>
              <p className="text-sm text-black">Humidity: {weatherSuccess.main.humidity}%</p>
            </div>
          </div>
        </div>
      )}
      <p className="text-sm text-white bg-black/60 px-3 py-2 rounded w-full sm:w-auto">
        Location detected:&nbsp;
        <strong>{currentAddress?.display_name}</strong>
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full px-4 pb-6">
      <PlaceList places={places} query={query} />
      <MapView places={places} center={coords} userLocation={[coords[0], coords[1]]} />
    </div>
  </>
)}

        {/* feedback */}
        {status === 'loading' && <p className="mt-4">Loading places…</p>}
      </div>
    </main>
        </ProtectedLayout>
    </>
  );
};

export default Home;
