import React from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2X from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface Props {
  coords: [number, number];
}

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2X,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const CarryOutMap: React.FC<Props> = ({ coords }) => {
  const CenterMap = () => {
    const map = useMap();
    map.setView(coords, 20);

    return null;
  };

  return (
    <MapContainer
      center={coords}
      zoom={20}
      style={{ height: "200px" }}
      zoomControl={false}
      dragging={false}
      scrollWheelZoom={false}
    >
      <Marker position={coords} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CenterMap />
    </MapContainer>
  );
};

export default CarryOutMap;
