import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import {showDataOnMap} from './util';
function Map({  countries,casesType,center, zoom,darkMode }) {
  return (
    <div className={`map `}>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url={`${!darkMode?"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png":"https://api.mapbox.com/styles/v1/sarfinaa/ckpbe8lx30z7917mudivdqc93/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FyZmluYWEiLCJhIjoiY2twYmVpMnpzMTF0ZjJ5b2d6ZzI3aG83cCJ9.3BvVXjgnoVcP_tupu2lepA"}`}
          attribution={`${!darkMode?'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors':"© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"}`}
        />
        {showDataOnMap(countries,casesType)};
        
      </LeafletMap>
    </div>
  );
}

export default Map;