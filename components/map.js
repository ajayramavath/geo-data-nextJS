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

const map = (props) => {
    const [center, setCenter] = useState({ lat: 0.5, lng: 102.0 });
    const ZOOM_LEVEL = 2;
    const mapRef = useRef();

  



  return (
      <MapContainer className='h-[80vh] md:auto'  center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
          <TileLayer url={osm.maptiler.url} />
      <GeoJSON data={props.data} key={JSON.stringify(props.data)} ></GeoJSON>
    </MapContainer>
  )
}

export default map