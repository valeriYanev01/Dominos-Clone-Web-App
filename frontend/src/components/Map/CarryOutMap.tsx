import React from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

interface Props {
  coords: [number, number];
}

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
