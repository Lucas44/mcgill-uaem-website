import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
  } from "@react-google-maps/api";
  
  import { formatRelative } from "date-fns";
  import mapStyles from "./MapStyles";
  import "./index.css";
  import { useState, useCallback, useRef } from 'react';
  
  import Search from "./Search";
  import Locate from "./Locate";
  
  const libraries = ["places"];
  
  const mapContainerStyle = {
    width: "100vw",
    height: "90vh",
  }
  const center = {
    lat: 45.504717,
    lng: -73.576456,
  }
  
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  }
  
  export default function Map() {
  
    const {isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    });
  
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const onMapClick = useCallback((e) => {
      setMarkers((current) => [
        ...current,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          time: new Date(),
        },
      ]);
    }, []);
  
  const mapRef = new useRef();
  const onMapLoad = useCallback((map) => {
      mapRef.current = map;
    }, []);
  
  const panTo = useCallback(({lat, lng}) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
    }, []);
  
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
  
    return (
    <div>
      <h1>
        UAEM McGill
      </h1>
  
      <Locate panTo={panTo}/>
      <Search panTo={panTo} />
  
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker  
            key={`${marker.lat}-${marker.lng}`}
            // key={marker.time.toISOString()}
            // key={marker._id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{ 
              url: '/red_triangle.png',
              scaledSize: new window.google.maps.Size(30,30),
              origin: new window.google.maps.Point(0,0),
              anchor: new window.google.maps.Point(15,15),
            }}
            >
              {selected === marker && 
              (<InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => { 
                  setSelected(null);
                 }}
              >
                <div>
                  <h2>Request</h2>
                  <p>Spotted {formatRelative(selected.time, new Date())}</p>
                </div>
              </InfoWindow>)}
            </Marker>
        ))}
      </GoogleMap>
    </div>
    );
  }
  
