// "use client";
// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import { LatLngBoundsExpression } from 'leaflet';
// import { Place } from '../features/places/types';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Set default icon for all other markers
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
// });

// // Custom icon for user's location
// const userLocationIcon = new L.Icon({
//   iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', // home icon
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// interface Props {
//   places: Place[];
//   center: [number, number];
//   userLocation: [number, number];
// }

// // Fit map bounds to all markers
// const FitBoundsToMarkers: React.FC<{ places: Place[] }> = ({ places }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (places.length > 0) {
//       const bounds: LatLngBoundsExpression = places.map(place => [
//         place.latitude,
//         place.longitude,
//       ]);
//       map.fitBounds(bounds, { padding: [50, 50] });
//     }
//   }, [places, map]);

//   return null;
// };

// export const MapView: React.FC<Props> = ({ places, center, userLocation }) => {
//   return (
//     <MapContainer center={center} zoom={20} scrollWheelZoom={false} style={{ height: '600px', width: '100%' }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//       {/* Your location marker with custom icon */}
//       <Marker position={userLocation} icon={userLocationIcon}>
//         <Popup>
//           <strong>Your Location</strong>
//         </Popup>
//       </Marker>

//       {/* Other places */}
//       {places.map((place) => (
//         <Marker
//           key={place.fsq_place_id}
//           position={[place.latitude, place.longitude]}
//         >
//           <Popup>
//             <strong>{place.name}</strong>
//             <br />
//             {place.location.address ?? 'No address'}
//           </Popup>
//         </Marker>
//       ))}

//       <FitBoundsToMarkers places={places} />
//     </MapContainer>
//   );
// };


// components/MapView.tsx
// components/MapView.tsx
'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../features/places/types';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  places: Place[];
  center: [number, number];
  userLocation: [number, number];
}

const MapView: React.FC<MapViewProps> = ({ places, center, userLocation }) => {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />

      {/* Marker for user's location */}
      <Marker position={userLocation}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Markers for nearby places */}
      {places.map((place) => (
        <Marker key={place.id} position={[place.latitude, place.longitude]}>
          <Popup>{place.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;

