import React from 'react'
import { useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, FeatureGroup } from 'react-leaflet'
import osm from './osm-provider'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import { EditControl } from 'react-leaflet-draw'
import "leaflet-draw/dist/leaflet.draw.css"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const mapRef = (props) => {
    const [center, setCenter] = useState({ lat: 0.5, lng: 102.0 });
    const ZOOM_LEVEL = 2;

    return (
        <MapContainer className='h-[80vh] md:auto' center={center} zoom={ZOOM_LEVEL} >
            <FeatureGroup ref= {props.data}>
                <EditControl position="topleft" />
            </FeatureGroup>
            <TileLayer url={osm.maptiler.url} />
        </MapContainer>
    )
}

export default mapRef