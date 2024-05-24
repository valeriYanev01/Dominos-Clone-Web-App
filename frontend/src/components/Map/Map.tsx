import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { MapContext } from "../../context/MapContext";

interface PositionProps {
  position: [number, number];
}

interface MarkerCoordinates {
  _latlng: {
    lat: number;
    lng: number;
  };
}

interface Store {
  city: string;
  name: string;
  coords: [number, number];
}

const pizzaPlaces = [
  { city: "burgas", name: "Central Park", coords: [42.51089388389011, 27.459558977955] },
  { city: "Varna", name: "Levski", coords: [43.22053134874774, 27.936221790277145] },
  { city: "Varna", name: "Planet Mall", coords: [43.226922191205205, 27.875809240006603] },
  { city: "Varna", name: "Center", coords: [43.20767922172417, 27.91024889901246] },
  { city: "Pernik", name: "Plaza", coords: [42.60759760118098, 23.056313668009725] },
  { city: "Plovdiv", name: "Kurshiqka", coords: [42.15767615405462, 24.748879265991413] },
  { city: "Plovdiv", name: "Kuchuk Paris", coords: [42.12323160840309, 24.740547407743826] },
  { city: "Plovdiv", name: "Trakia", coords: [42.13912068243967, 24.787930029270758] },
  { city: "Plovdiv", name: "Central", coords: [42.141541395150014, 24.73978282357347] },
  { city: "Sofia", name: "Borovo", coords: [42.67288111390348, 23.285597124501713] },
  { city: "Sofia", name: "Vapcarov", coords: [42.665656646806696, 23.31917340162371] },
  { city: "Sofia", name: "Geo Milev", coords: [42.68017305816299, 23.356960627843282] },
  { city: "Sofia", name: "Drujba", coords: [42.65199558435452, 23.404189032234743] },
  { city: "Sofia", name: "Kostenski Vodopad", coords: [42.665492099877156, 23.298831890710577] },
  { city: "Sofia", name: "Krasna Polqna", coords: [42.695285285080416, 23.285756645310702] },
  { city: "Sofia", name: "Lulin", coords: [42.71311286172058, 23.24881043552756] },
  { city: "Sofia", name: "Lulin Orion", coords: [42.717106117450754, 23.27786330074529] },
  { city: "Sofia", name: "Mladost", coords: [42.63624926620774, 23.36986941582712] },
  { city: "Sofia", name: "Mladost 1", coords: [42.65545395667885, 23.38126505178002] },
  { city: "Sofia", name: "Musagenica", coords: [42.661704719474585, 23.360259616277883] },
  { city: "Sofia", name: "Nadejda", coords: [42.734370008265664, 23.29424143658992] },
  { city: "Sofia", name: "Ovha Kupel", coords: [42.68647108356929, 23.24658131282099] },
  { city: "Sofia", name: "Pavlovo", coords: [42.66163946901486, 23.26496665315077] },
  { city: "Sofia", name: "Studentski Grad", coords: [42.65383864126901, 23.345949108011933] },
  { city: "Sofia", name: "Studentski Grad 2", coords: [42.64302843701166, 23.344085738494325] },
  { city: "Sofia", name: "Suhata Reka", coords: [42.70381095804067, 23.356406005394835] },
  { city: "Sofia", name: "Center", coords: [42.697305382909974, 23.31709375748052] },
  { city: "Sofia", name: "South Park", coords: [42.67440903299069, 23.30941316832158] },
] as Store[];

const Map = (): JSX.Element => {
  const [circleData, setCircleData] = useState<{ center: [number, number]; points: [number, number][] } | null>(null);

  const { setLat, setLong, lat, long, zoom, setClosestStore, setShowStore } = useContext(MapContext);

  const calculateDistance = (latlng1: [number, number], latlng2: [number, number]) => {
    return latLng(latlng1).distanceTo(latLng(latlng2));
  };

  useEffect(() => {
    const findClosestStore = () => {
      let closestStore = null;
      let minDistance = Infinity;

      pizzaPlaces.forEach((store) => {
        const distance = calculateDistance([lat, long], store.coords);
        if (distance < minDistance) {
          minDistance = distance;
          closestStore = store;

          setClosestStore({ city: closestStore.city, name: closestStore.name });
        }
      });
    };

    findClosestStore();
  }, [lat, long, setClosestStore]);

  useEffect(() => {
    if (circleData) {
      setShowStore(true);
    } else {
      setShowStore(false);
    }
  }, [circleData, setShowStore]);

  const AddMarkerOnClickLocation = () => {
    useMapEvents({
      click(event) {
        const clickedLatLng = [event.latlng.lat, event.latlng.lng] as [number, number];
        setLat(event.latlng.lat);
        setLong(event.latlng.lng);

        let foundCircleData = null;

        pizzaPlaces.forEach((store) => {
          const distance = calculateDistance(clickedLatLng, store.coords);
          if (distance <= 2500) {
            foundCircleData = { center: store.coords };
          }
        });

        setCircleData(foundCircleData);
      },
    });

    return null;
  };

  const CenterMap = ({ position }: PositionProps) => {
    const map = useMap();
    map.setView(position, zoom);

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
    <MapContainer center={[lat, long]} zoom={zoom} style={{ height: "400px" }} scrollWheelZoom={false}>
      <AddMarkerOnClickLocation />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DraggableMarker />
      <CenterMap position={[lat, long]} />
    </MapContainer>
  );
};

export default Map;
