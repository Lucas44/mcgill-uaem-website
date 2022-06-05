import {
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

const Request = ({ selected, setSelected, request }) => {
  return (
  <Marker  
      key={`${request.lat}-${request.lng}`}
      position={{ lat: request.lat, lng: request.lng }}
      onClick={() => {
        setSelected(request);
      }}
      icon={{ 
        url: '/red_triangle.png',
        scaledSize: new window.google.maps.Size(30,30),
        origin: new window.google.maps.Point(0,0),
        anchor: new window.google.maps.Point(15,15),
      }}
  >
    {selected === request && 
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
  )
}

export default Request