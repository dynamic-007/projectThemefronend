import React, { useState } from "react";
import {CiLocationOn} from "react-icons/ci"
import ReactMapGL, {
  Marker,
} from "react-map-gl";
// import { TOKEN } from "./Geocoder";

// -26.475393195281754, 153.04416685709924

const AppMap = ({data}) => {

    const [viewport, setViewport] = useState({
        latitude: 17.396623690234186,
        longitude: 78.51378895799557,
        width: "1000px",
        height: "100vh",
        zoom: 10
      });


 
  // Add a black outline around the polygon.
  
  return (
   
    <ReactMapGL
        initialViewState={viewport}
        mapboxAccessToken={"pk.eyJ1IjoiZGhlZXJhamRqMDciLCJhIjoiY2xtbmE0dXI3MHRzcDJqcGc3cTh3bzN5NSJ9.q8OSGZZasm_C7nQ3dcMDzg"}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        height="100%"
        width="100%"
    >
      {/* {data.length!==0 && data.map((each)=>
        <Marker
          latitude={17.140882652094692}
          longitude={79.61230890560284}
          offsetLeft={-3.5*viewport.zoom}
          offsetTop={7*viewport.zoom}
        >
            <CiLocationOn style={{height:"20px",width:"20px"}}/>
        </Marker>
      )} */}
      <Marker
          latitude={17.140882652094692}
          longitude={79.61230890560284}
        >
            <div style={{display: "block",cursor: "pointer"}}><CiLocationOn style={{height:"20px",width:"20px"}}/></div>
        </Marker>
    </ReactMapGL>
    
  );
};
export default AppMap;