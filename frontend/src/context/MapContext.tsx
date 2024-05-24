import React, { ReactNode, createContext, useState } from "react";

interface SuggestedAddresses {
  address: string;
  center: [number, number];
  context: {
    id: string;
    mapbox_id: string;
    wikidata?: string;
    short_code?: string;
    text: string;
  }[];
  geometry: {
    coordinates: [number, number];
    type: string;
  };
  id: string;
  matching_place_name: string;
  matching_text: string;
  place_name: string;
  place_type: [string];
  properties: {
    accuracy: string;
    mapbox_id: string;
  };
  relevance: number;
  text: string;
  type: string;
}

interface ClosestStore {
  city: string;
  name: string;
}

interface MapContextInterface {
  lat: number;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  long: number;
  setLong: React.Dispatch<React.SetStateAction<number>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  suggestedAddresses: SuggestedAddresses[];
  setSuggestedAddresses: React.Dispatch<React.SetStateAction<SuggestedAddresses[]>>;
  selectedSuggestedAddress: string;
  setSelectedSuggestedAddress: React.Dispatch<React.SetStateAction<string>>;
  fullAddress: string;
  setFullAddress: React.Dispatch<React.SetStateAction<string>>;
  closestStore: ClosestStore;
  setClosestStore: React.Dispatch<React.SetStateAction<ClosestStore>>;
  showStore: boolean;
  setShowStore: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapContext = createContext<MapContextInterface>({
  lat: 42.693942,
  setLat: () => {},
  long: 23.313396,
  setLong: () => {},
  zoom: 12,
  setZoom: () => {},
  suggestedAddresses: [],
  setSuggestedAddresses: () => {},
  selectedSuggestedAddress: "",
  setSelectedSuggestedAddress: () => {},
  fullAddress: "",
  setFullAddress: () => {},
  closestStore: { city: "", name: "" },
  setClosestStore: () => {},
  showStore: false,
  setShowStore: () => {},
});

export const MapContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lat, setLat] = useState(42.693942);
  const [long, setLong] = useState(23.313396);
  const [zoom, setZoom] = useState(12);
  const [suggestedAddresses, setSuggestedAddresses] = useState<SuggestedAddresses[]>([]);
  const [selectedSuggestedAddress, setSelectedSuggestedAddress] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [closestStore, setClosestStore] = useState({ city: "", name: "" });
  const [showStore, setShowStore] = useState(false);

  return (
    <MapContext.Provider
      value={{
        lat,
        setLat,
        long,
        setLong,
        zoom,
        setZoom,
        suggestedAddresses,
        setSuggestedAddresses,
        selectedSuggestedAddress,
        setSelectedSuggestedAddress,
        fullAddress,
        setFullAddress,
        closestStore,
        setClosestStore,
        showStore,
        setShowStore,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
