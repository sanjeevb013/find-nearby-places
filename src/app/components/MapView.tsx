"use client";
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import { Place } from '../utils/foursquareApi';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

interface Props {
  places: Place[];
  center: [number, number];
}

// Component to update map bounds
const FitBoundsToMarkers: React.FC<{ places: Place[] }> = ({ places }) => {
  const map = useMap();

  useEffect(() => {
    if (places.length > 0) {
      const bounds: LatLngBoundsExpression = places.map(place => [
        place.geocodes.main.latitude,
        place.geocodes.main.longitude,
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [places, map]);

  return null;
};

export const MapView: React.FC<Props> = ({ places, center }) => {
  return (
    <MapContainer center={center} zoom={20} scrollWheelZoom={false} style={{ height: '600px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {places.map((place) => (
        <Marker
          key={place.fsq_id}
          position={[place.geocodes.main.latitude, place.geocodes.main.longitude]}
        >
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.location.address ?? 'No address'}
          </Popup>
        </Marker>
      ))}
      <FitBoundsToMarkers places={places} />
    </MapContainer>
  );
};
