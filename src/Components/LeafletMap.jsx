import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useState } from 'react';

export default function LeafletMap() {

    const [lng, setLng] = useState(146.359);
    const [lat, setLat] = useState(-32.648);
    const center = [lat, lng]
    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
            <TileLayer

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}
