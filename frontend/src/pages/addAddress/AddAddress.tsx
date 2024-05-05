import React, { useContext, useState } from "react";
import "./AddAddress.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Map from "../../components/Map/Map";
import useGetSuggestion from "../../hooks/useGetSuggestion";
import { MapContext } from "../../context/MapContext";

const AddAddress: React.FC = () => {
  const [nextSteps, setNextSteps] = useState(false);

  const {
    lat,
    long,
    setLat,
    setLong,
    selectedSuggestedAddress,
    setSelectedSuggestedAddress,
    fullAddress,
    setFullAddress,
    suggestedAddresses,
    setSuggestedAddresses,
  } = useContext(MapContext);

  const getSuggestion = useGetSuggestion();

  return (
    <div className="add-address-page">
      <Navbar page="add-address" />
      <div className="ad-content">
        <div className="ad-title">
          <img src="/svg/decorLeftRed.svg" className="deal-decor" />
          <p>ADD A NEW ADDRESS</p>
          <img src="/svg/decorRightRed.svg" className="deal-decor" />
        </div>

        <div className="ad-body">
          <p>ADDRESS</p>
          <input
            placeholder="ex: ulitsa dunav 6, sofia"
            value={selectedSuggestedAddress ? selectedSuggestedAddress : fullAddress}
            onChange={(e) => {
              getSuggestion(e.target.value);
              setFullAddress(e.target.value);
              setSelectedSuggestedAddress("");
            }}
          />

          {suggestedAddresses && (
            <div>
              {suggestedAddresses.map((address) => (
                <p
                  key={address.place_name}
                  onClick={() => {
                    setLong(address.center[0]);
                    setLat(address.center[1]);
                    setSelectedSuggestedAddress(address.place_name);
                    setSuggestedAddresses([]);
                    setNextSteps(true);
                  }}
                >
                  {address.place_name}
                </p>
              ))}
            </div>
          )}
          <Map lat={lat} long={long} setLat={setLat} setLong={setLong} />
        </div>

        {nextSteps && (
          <div>
            <p>Next steps</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AddAddress;
