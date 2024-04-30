import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  long: number;
  lat: number;
}

interface PositionProps {
  position: [number, number];
}

const Map = ({ long, lat }: MapProps): JSX.Element => {
  return (
    <MapContainer center={[lat, long]} zoom={20} style={{ height: "400px" }} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, long]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <CenterMap position={[lat, long]} />
    </MapContainer>
  );
};

const CenterMap = ({ position }: PositionProps) => {
  const map = useMap();
  map.setView(position);

  return null;
};

export default Map;
