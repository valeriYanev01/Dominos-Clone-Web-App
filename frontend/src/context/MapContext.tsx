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

interface MapContextInterface {
  lat: number;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  long: number;
  setLong: React.Dispatch<React.SetStateAction<number>>;
  suggestedAddresses: SuggestedAddresses[];
  setSuggestedAddresses: React.Dispatch<React.SetStateAction<SuggestedAddresses[]>>;
  selectedSuggestedAddress: string;
  setSelectedSuggestedAddress: React.Dispatch<React.SetStateAction<string>>;
  fullAddress: string;
  setFullAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const MapContext = createContext<MapContextInterface>({
  lat: 0,
  setLat: () => {},
  long: 0,
  setLong: () => {},
  suggestedAddresses: [],
  setSuggestedAddresses: () => {},
  selectedSuggestedAddress: "",
  setSelectedSuggestedAddress: () => {},
  fullAddress: "",
  setFullAddress: () => {},
});

export const MapContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [suggestedAddresses, setSuggestedAddresses] = useState<SuggestedAddresses[]>([]);
  const [selectedSuggestedAddress, setSelectedSuggestedAddress] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  return (
    <MapContext.Provider
      value={{
        lat,
        setLat,
        long,
        setLong,
        suggestedAddresses,
        setSuggestedAddresses,
        selectedSuggestedAddress,
        setSelectedSuggestedAddress,
        fullAddress,
        setFullAddress,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
