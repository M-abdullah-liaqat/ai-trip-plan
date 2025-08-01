import React, { useEffect, useRef } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";

const GeoapifyAutocomplete = ({ onSelectLocation }) => {

  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.innerHTML = "";

      const autocomplete = new GeocoderAutocomplete(
        autocompleteRef.current,
        import.meta.env.VITE_GEOAPIFY_API_KEY,
        {
          placeholder: "Search location...",
          type: "city", // can use 'address', 'country', etc.
          lang: "en",
          limit: 5,
        }
      );
      autocomplete.on("select", (location) => {
        if(location && location.properties) {
          console.log(`${location.properties.city},${location.properties.state},${location.properties.country}`)
          console.log(location.properties)
          onSelectLocation(`${location.properties.city},${location.properties.state},${location.properties.country}`);
        }
      });
    }
  }, [autocompleteRef]);0.

  return (
    <div>
      <div ref={autocompleteRef} style={{ minHeight: "40px", position: "relative" }} />
    </div>
  );
};

export default GeoapifyAutocomplete;
