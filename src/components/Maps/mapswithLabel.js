import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGhlZXJhamRqMDciLCJhIjoiY2xtbmE0dXI3MHRzcDJqcGc3cTh3bzN5NSJ9.q8OSGZZasm_C7nQ3dcMDzg';

const MapWithMarkers = ({ markers }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // You can choose a different map style here
      center: [78.4744, 17.3753], // Center the map based on the first marker
      zoom: 12, // Adjust the zoom level as needed
    });

    // Create markers for each object in the markers array
    markers.forEach((each) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([each.location.coordinates[1], each.location.coordinates[0]])
        .addTo(map.current);

      // Add a hover event listener to the marker
      marker.getElement().addEventListener('mouseenter', () => {
        marker.setPopup(new mapboxgl.Popup().setHTML(each.Department_contact_details.Dept_name).addTo(map.current));
      });

      // Remove the popup when the mouse leaves the marker
      marker.getElement().addEventListener('mouseleave', () => {
        marker.getPopup().remove();
      });
    });

    // Clean up the map when the component unmounts
    return () => {
      map.current.remove();
    };
  }, [markers]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default MapWithMarkers;
