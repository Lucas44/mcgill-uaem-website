import {
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";

import mapStyles from "./MapStyles";
import "./index.css";
import { useState, useCallback, useRef } from 'react';

import Search from "./Search";
import Locate from "./Locate";
import InfoBox from "./InfoBox";
import Offer from "./Offer";
import Request from "./Request";

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
  clickableIcons: false,
}

export default function Map() {

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [infoBox, setInfoBox] = useState(null);

  const onMapClick = useCallback((e) => {
    setInfoBox({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
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
      {infoBox && 
      <InfoBox 
        lat={infoBox.lat} 
        lng={infoBox.lng} 
        setInfoBox={setInfoBox} 
        setOffers={setOffers}
        setRequests={setRequests}
      />}
      {offers.map((offer) => (
        <Offer 
          selected={selectedOffer}
          setSelected={setSelectedOffer}
          offer={offer}
        />
      ))}
      {requests.map((request) => (
        <Request 
          selected={selectedRequest}
          setSelected={setSelectedRequest}
          request={request}
        />
      ))}
    </GoogleMap>
  </div>
  );
}

