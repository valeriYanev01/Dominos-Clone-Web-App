import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useCallback, useMemo, useRef, useState } from "react";

interface MapProps {
  lat: number;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  long: number;
  setLong: React.Dispatch<React.SetStateAction<number>>;
}

interface PositionProps {
  position: [number, number];
}

interface MarkerCoordinates {
  _latlng: {
    lat: number;
    lng: number;
  };
}

const Map = ({ lat, setLat, long, setLong }: MapProps): JSX.Element => {
  const AddMarkerOnClickLocation = () => {
    useMapEvents({
      click(event) {
        setLat(event.latlng.lat);
        setLong(event.latlng.lng);
      },
    });

    return null;
  };

  const CenterMap = ({ position }: PositionProps) => {
    const map = useMap();
    map.setView(position);

    return null;
  };

  const DraggableMarker = () => {
    const [draggable, setDraggable] = useState(false);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current as MarkerCoordinates | null;
          if (marker != null) {
            setLat(marker._latlng.lat);
            setLong(marker._latlng.lng);
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker draggable={draggable} eventHandlers={eventHandlers} position={[lat, long]} ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable ? "Marker is draggable" : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    );
  };

  return (
    <MapContainer center={[lat, long]} zoom={20} style={{ height: "400px" }} scrollWheelZoom={false}>
      <AddMarkerOnClickLocation />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DraggableMarker />
      <CenterMap position={[lat, long]} />
    </MapContainer>
  );
};

export default Map;
