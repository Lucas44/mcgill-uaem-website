import { useCallback } from 'react';
import { InfoWindow } from "@react-google-maps/api";
import "./index.css";

const InfoBox = ({ lat, lng, setInfoBox }) => {

    const onCloseClick = useCallback(() => {
        setInfoBox(null)
    }, []);
    return (
        <InfoWindow 
            position={{ lat: lat, lng: lng }} 
            onCloseClick={onCloseClick}
        >
            <div className="h-80 w-72">
                <h2>Add Offer</h2>
                <h2>Add Request</h2>
                <h2>See Posts</h2>
            </div>
        </InfoWindow>
    )
}

export default InfoBox
