import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ longitude, latitude }) => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGhlZXJhamRqMDciLCJhIjoiY2xtbmE0dXI3MHRzcDJqcGc3cTh3bzN5NSJ9.q8OSGZZasm_C7nQ3dcMDzg';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // You can choose a different map style here
      center: [longitude, latitude],
      zoom: 12, // Adjust the zoom level as needed
    });

    // Add a marker to the map
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    // Cleanup when the component unmounts
    return () => map.remove();
  }, [longitude, latitude]);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
