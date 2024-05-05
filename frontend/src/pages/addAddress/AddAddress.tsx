import React, { useContext, useState } from "react";
import "./AddAddress.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Map from "../../components/Map/Map";
import useGetSuggestion from "../../hooks/useGetSuggestion";
import { MapContext } from "../../context/MapContext";
import { LoginContext } from "../../context/LoginContext";
import axios from "axios";

const AddAddress: React.FC = () => {
  const [nextSteps, setNextSteps] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doorBell, setDoorBell] = useState("");
  const [floor, setFloor] = useState("");
  const [block, setBlock] = useState("");
  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");

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

  const { emailLogin, token } = useContext(LoginContext);

  const getSuggestion = useGetSuggestion();

  const handleAddAddress = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/users/add-address",
        {
          email: emailLogin,
          name: name,
          fullAddress: fullAddress,
          phoneNumber: phoneNumber,
          doorBell: doorBell,
          floor: floor,
          block: block,
          apartment: apartment,
          entrance: entrance,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.log(err);
    }
  };

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
            <div className="ad-address-name">
              <label htmlFor="ad-address-name">Address Name</label>
              <input id="ad-address-name" onChange={(e) => setName(e.target.value)} value={name} />
            </div>

            <div className="ad-full-address-details">
              <div className="ad-full-address">
                <label htmlFor="ad-full-address">Full Address</label>
                <input id="ad-full-address" value={fullAddress} disabled={true} />
              </div>

              <div className="ad-address-details">
                <div>
                  <label htmlFor="ad-phone-number">Phone Number</label>
                  <input id="ad-phone-number" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                </div>

                <div>
                  <label htmlFor="ad-door-bell">Door Bell</label>
                  <input id="ad-door-bell" onChange={(e) => setDoorBell(e.target.value)} value={doorBell} />
                </div>

                <div>
                  <label htmlFor="ad-floor">Floor</label>
                  <input id="ad-floor" onChange={(e) => setFloor(e.target.value)} value={floor} />
                </div>

                <div>
                  <label htmlFor="ad-block">Block</label>
                  <input id="ad-block" onChange={(e) => setBlock(e.target.value)} value={block} />
                </div>

                <div>
                  <label htmlFor="ad-apartment">Apartment</label>
                  <input id="ad-apartment" onChange={(e) => setApartment(e.target.value)} value={apartment} />
                </div>

                <div>
                  <label htmlFor="ad-entrance">Entrance</label>
                  <input id="ad-entrance" onChange={(e) => setEntrance(e.target.value)} value={entrance} />
                </div>
              </div>
            </div>
            <div className="ad-add-address-btn" onClick={handleAddAddress}>
              ADD
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AddAddress;
