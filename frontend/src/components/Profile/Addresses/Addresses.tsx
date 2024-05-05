import React, { useContext, useEffect, useState } from "react";
import "./Addresses.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import Map from "../../Map/Map";
import useGetSuggestion from "../../../hooks/useGetSuggestion";
import { MapContext } from "../../../context/MapContext";

type Address = {
  name: string;
  fullAddress: string;
  phoneNumber: string;
  doorBell: string;
  floor: string;
  block: string;
  apartment: string;
  entrance: string;
};

const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doorBell, setDoorBell] = useState("");
  const [floor, setFloor] = useState("");
  const [block, setBlock] = useState("");
  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");

  const { token, emailLogin } = useContext(LoginContext);

  const {
    setLat,
    setLong,
    suggestedAddresses,
    setSuggestedAddresses,
    selectedSuggestedAddress,
    setSelectedSuggestedAddress,
    fullAddress,
    setFullAddress,
  } = useContext(MapContext);

  const getSuggestion = useGetSuggestion();

  const location = useLocation();

  useEffect(() => {
    setAddresses(addresses);
  }, [addresses]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (location.pathname.includes("addresses") && token && emailLogin) {
        try {
          const response = await axios.get("http://localhost:3000/api/users/get-addresses", {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: emailLogin },
          });
          setAddresses(response.data.allAddresses.addresses);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data.error || "An error occurred");
          }
        }
      }
    };
    fetchAddresses();
  }, [location, token, emailLogin]);

  const fetchAddress = async (address: string) => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/get-single-address", {
        headers: { Authorization: `Bearer ${token}` },
        params: { name: address, email: emailLogin },
      });

      const data = response.data.address;

      setName(data.name);
      setFullAddress(data.fullAddress);
      setPhoneNumber(data.phoneNumber);
      setDoorBell(data.doorBell);
      setFloor(data.floor);
      setBlock(data.block);
      setApartment(data.apartment);
      setEntrance(data.entrance);
      setLat(data.coordinates[0]);
      setLong(data.coordinates[1]);

      getSuggestion(data.fullAddress);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveAddress = () => {};

  const handleDeleteAddress = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/users/delete-address`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { email: emailLogin, address: name },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data.error || "An error occurred");
      }
    }
  };

  return (
    <div className="profile-addresses">
      <div className="pas-heading">
        <img src="/svg/decorLeftRed.svg" className="deal-decor" />
        <p>MODIFY YOUR DETAILS, ADD OR DELETE AN ADDRESS</p>
        <img src="/svg/decorRightRed.svg" className="deal-decor" />
      </div>

      <div className="pas-body">
        <div className="pas-addresses">
          {addresses.map((address: Address) => (
            <div
              className="pas-single-address"
              key={address.name}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                fetchAddress(target.innerText);
              }}
            >
              {address.name}
            </div>
          ))}
          <Link
            to="/add-address"
            className="pas-addresses-add-new-container"
            onClick={() => {
              setFullAddress("");
              setSuggestedAddresses([]);
            }}
          >
            <div className="pas-addresses-add-new">
              <span className="pas-addresses-add-new-plus">+</span>
              <span className="pas-addresses-add-new-text">ADD A NEW ADDRESS</span>
            </div>
          </Link>
        </div>
        <div className="pas-settings">
          <div className="pas-settings-address-container">
            <>
              <label htmlFor="address-name">ADDRESS NAME</label>
              <input id="address-name" value={name} onChange={(e) => setName(e.target.value)} />
            </>

            <div className="pas-settings-street-container">
              <label htmlFor="address-streetName">ADDRESS</label>
              <input
                id="address-streetName"
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
                        setSelectedSuggestedAddress(address.place_name);
                        setSuggestedAddresses([]);
                      }}
                    >
                      {address.place_name}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="address-map">
              <Map />
              <div>your store: store</div>
            </div>

            <div className="address-settings-details-container">
              <div>
                <label htmlFor="address-phoneNumber">PHONE NUMBER</label>
                <input id="address-phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <label htmlFor="address-doorBell">DOOR BELL</label>
                <input id="address-doorBell" value={doorBell} onChange={(e) => setDoorBell(e.target.value)} />
                <label htmlFor="address-floor">FLOOR</label>
                <input id="address-floor" value={floor} onChange={(e) => setFloor(e.target.value)} />
              </div>
              <div>
                <label htmlFor="address-block">BLOCK</label>
                <input id="address-block" value={block} onChange={(e) => setBlock(e.target.value)} />
                <label htmlFor="address-apartment">APARTMENT</label>
                <input id="address-apartment" value={apartment} onChange={(e) => setApartment(e.target.value)} />
                <label htmlFor="address-entrance">ENTRANCE</label>
                <input id="address-entrance" value={entrance} onChange={(e) => setEntrance(e.target.value)} />
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="pas-edit">
          <div className="pas-edit-save" onClick={handleSaveAddress}>
            save
          </div>
          <div className="pas-edit-delete" onClick={handleDeleteAddress}>
            delete
          </div>
        </div>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Addresses;
