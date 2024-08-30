import React, { useContext, useEffect, useState } from "react";
import "./AddAddressComponent.css";
import { useNavigate } from "react-router-dom";
import { MapContext } from "../../context/MapContext";
import { LoginContext } from "../../context/LoginContext";
import useGetSuggestion from "../../hooks/useGetSuggestion";
import axios from "axios";
import Map from "../Map/Map";

const AddAddressComponent: React.FC = () => {
  const [nextSteps, setNextSteps] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doorBell, setDoorBell] = useState("");
  const [floor, setFloor] = useState("");
  const [block, setBlock] = useState("");
  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    lat,
    long,
    setLat,
    setLong,
    setZoom,
    selectedSuggestedAddress,
    setSelectedSuggestedAddress,
    fullAddress,
    setFullAddress,
    suggestedAddresses,
    setSuggestedAddresses,
    closestStore,
    deliveryStore,
    setDeliveryStore,
  } = useContext(MapContext);

  const { emailLogin, token } = useContext(LoginContext);

  const getSuggestion = useGetSuggestion();

  useEffect(() => {
    setDeliveryStore(`${closestStore.city} - ${closestStore.name}`);
  }, [closestStore, setDeliveryStore]);

  const handleAddAddress = async () => {
    try {
      await axios.post(
        "https://dcback.vercel.app/api/users/add-address",
        {
          email: emailLogin,
          name,
          fullAddress: selectedSuggestedAddress,
          store: deliveryStore,
          phoneNumber,
          doorBell,
          floor,
          block,
          apartment,
          entrance,
          coordinates: [lat, long],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setName("");
      setFullAddress("");
      setDeliveryStore("");
      setSelectedSuggestedAddress("");
      setPhoneNumber("");
      setDoorBell("");
      setFloor("");
      setBlock("");
      setApartment("");
      setEntrance("");
      setError("");
      setNextSteps(false);
      navigate("/profile/addresses");
      console.log("success");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.error);
      }
    }
  };

  return (
    <div className="ad-content">
      <div className="ad-title">
        <img src="/svg/decorLeftRed.svg" className="deal-decor" />
        <p>ADD A NEW ADDRESS</p>
        <img src="/svg/decorRightRed.svg" className="deal-decor" />
      </div>

      <div className="ad-body">
        <p className="ad-body-text">ADDRESS</p>
        <input
          className="ad-body-input"
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
                  setZoom(20);
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
        <Map />
      </div>

      {nextSteps && (
        <div>
          <p className="your-store-text">
            Your Store:{" "}
            <span className="your-store-text2">
              {closestStore.city} - {closestStore.name}
            </span>
          </p>
          <div className="ad-address-name">
            <label htmlFor="ad-address-name">Address Name</label>
            <input id="ad-address-name" onChange={(e) => setName(e.target.value)} value={name} />
          </div>

          <div className="address-settings-details-container">
            <div>
              <div className="address-info-container">
                <label htmlFor="ad-phone-number">Phone Number</label>
                <input id="ad-phone-number" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
              </div>

              <div className="address-info-container">
                <label htmlFor="ad-door-bell">Door Bell</label>
                <input id="ad-door-bell" onChange={(e) => setDoorBell(e.target.value)} value={doorBell} />
              </div>

              <div className="address-info-container">
                <label htmlFor="ad-floor">Floor</label>
                <input id="ad-floor" onChange={(e) => setFloor(e.target.value)} value={floor} />
              </div>
            </div>

            <div>
              <div className="address-info-container">
                <label htmlFor="ad-block">Block</label>
                <input id="ad-block" onChange={(e) => setBlock(e.target.value)} value={block} />
              </div>

              <div className="address-info-container">
                <label htmlFor="ad-apartment">Apartment</label>
                <input id="ad-apartment" onChange={(e) => setApartment(e.target.value)} value={apartment} />
              </div>

              <div className="address-info-container">
                <label htmlFor="ad-entrance">Entrance</label>
                <input id="ad-entrance" onChange={(e) => setEntrance(e.target.value)} value={entrance} />
              </div>
            </div>
          </div>
          <div className="ad-add-address-btn" onClick={handleAddAddress}>
            ADD
          </div>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default AddAddressComponent;
