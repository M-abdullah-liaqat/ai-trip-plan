// AutocompleteExample.js
import React, { useRef, useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const AutocompleteExample = () => {
  const inputRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded || !window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'], // or use ['(cities)'] if you want only cities
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.warn('No geometry returned for place');
        return;
      }

      console.log('Place selected:', place);
      alert(`
        Name: ${place.name}
        Address: ${place.formatted_address}
        Lat: ${place.geometry.location.lat()}
        Lng: ${place.geometry.location.lng()}
      `);
    });
  }, [loaded]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDt7dLAuzd5YGX06S5574XlOzjo4z_3ii8"
      libraries={libraries}
       version="beta"
      onLoad={() => {
        console.log('Google Maps script loaded');
        setLoaded(true);
      }}
    >
      <div style={{ padding: 30 }}>
        <h3>Google Places Autocomplete</h3>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search location"
          style={{ width: 300, padding: 10 }}
        />
      </div>
    </LoadScript>
  );
};

export default AutocompleteExample;