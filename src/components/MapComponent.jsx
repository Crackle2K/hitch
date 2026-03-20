import { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapComponent({ locations }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {} // silently ignore if denied
    );
  }, []);

  const initialView = userLocation
    ? { longitude: userLocation.lng, latitude: userLocation.lat, zoom: 10 }
    : { longitude: -79.4, latitude: 43.93, zoom: 9 };

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={initialView}
      style={{ width: '100%', height: '500px' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {/* School markers */}
      {locations.map(loc => (
        <Marker
          key={loc.id}
          longitude={loc.lng}
          latitude={loc.lat}
          onClick={() => setSelectedLocation(loc)}
          style={{ cursor: 'pointer' }}
        />
      ))}

      {/* User location marker */}
      {userLocation && (
        <Marker longitude={userLocation.lng} latitude={userLocation.lat}>
          <div style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#4285F4',
            border: '3px solid white',
            boxShadow: '0 0 0 2px #4285F4',
          }} title="Your location" />
        </Marker>
      )}

      {selectedLocation && (
        <Popup
          longitude={selectedLocation.lng}
          latitude={selectedLocation.lat}
          onClose={() => setSelectedLocation(null)}
          closeOnClick={false}
          anchor="bottom"
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>{selectedLocation.name}</p>
        </Popup>
      )}
    </Map>
  );
}
