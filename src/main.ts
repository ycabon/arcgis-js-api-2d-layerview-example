import * as Map from "esri/Map";

import * as MapView from "esri/views/MapView";

import CustomLayer from "./layers/CustomLayer";

var map = new Map({
  basemap: <any> "topo",
  layers: [
    new CustomLayer()
  ]
});

new MapView({
  map: map,
  container: "viewDiv",
  zoom: 4
});
