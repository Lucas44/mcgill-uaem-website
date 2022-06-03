import { useCallback } from 'react';
import { InfoWindow } from "@react-google-maps/api";

const InfoBox = ({ lat, lng, setInfoBox }) => {

    const onCloseClick = useCallback(() => {
        setInfoBox(null)
    });
    return (
        <InfoWindow 
            position={{ lat: lat, lng: lng }} 
            onCloseClick={onCloseClick}
        >
            <h2>Some text</h2>
        </InfoWindow>
    )
}

export default InfoBox
