import axios from "axios";
import { useContext } from "react";
import { MapContext } from "../context/MapContext";

const useGetSuggestion = () => {
  const { setSuggestedAddresses } = useContext(MapContext);

  const getSuggestion = async (inputValue: string) => {
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json`, {
        params: {
          access_token: "pk.eyJ1IjoidmFsZXJpZGV2IiwiYSI6ImNsdmt2cHp0OTI2NGwyanA2ZzAwZ2wyd3UifQ.zLfzF0FydSNScvU6xLtN9A",
          types: "address,poi",
          autocomplete: true,
          country: "BG",
        },
      });
      setSuggestedAddresses(response.data.features);
    } catch (err) {
      console.log(err);
    }
  };

  return getSuggestion;
};

export default useGetSuggestion;
