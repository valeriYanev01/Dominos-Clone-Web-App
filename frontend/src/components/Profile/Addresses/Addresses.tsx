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
  const [id, setId] = useState("");
  const [addressSelected, setAddressSelected] = useState(false);

  const { token, emailLogin } = useContext(LoginContext);

  const {
    lat,
    setLat,
    long,
    setLong,
    setZoom,
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

      setId(data._id);
      setName(data.name);
      setFullAddress(data.fullAddress);
      setSelectedSuggestedAddress(data.fullAddress);
      setPhoneNumber(data.phoneNumber);
      setDoorBell(data.doorBell);
      setFloor(data.floor);
      setBlock(data.block);
      setApartment(data.apartment);
      setEntrance(data.entrance);
      setLat(data.coordinates[0]);
      setLong(data.coordinates[1]);
      setZoom(20);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveAddress = async () => {
    if (addressSelected) {
      try {
        await axios.put(
          "http://localhost:3000/api/users/update-address",
          {
            email: emailLogin,
            id: id,
            name: name,
            fullAddress: fullAddress,
            phoneNumber: phoneNumber,
            doorBell: doorBell,
            floor: floor,
            block: block,
            apartment: apartment,
            entrance: entrance,
            coordinates: [lat, long],
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        window.location.reload();
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data.error || "An error occurred");
        }
      }
    } else {
      return;
    }
  };

  const handleDeleteAddress = async () => {
    if (addressSelected) {
      try {
        await axios.delete(`http://localhost:3000/api/users/delete-address`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: emailLogin, address: name },
        });

        window.location.reload();
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data.error || "An error occurred");
        }
      }
    } else {
      return;
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
                setAddressSelected(true);
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
              setSelectedSuggestedAddress("");
            }}
          >
            <div
              className="pas-addresses-add-new"
              onClick={() => {
                setZoom(12);
                setLat(42.693942);
                setLong(23.313396);
              }}
            >
              <span className="pas-addresses-add-new-text">ADD A NEW ADDRESS</span>
            </div>
          </Link>
        </div>
        <div className="pas-settings">
          <div className="pas-settings-address-container">
            <label htmlFor="address-name">ADDRESS NAME</label>
            <input id="address-name" value={name} onChange={(e) => setName(e.target.value)} />

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
              <p className="your-store-text">
                Your Store: <span className="your-store-text2">store</span>
              </p>
            </div>

            <div className="address-settings-details-container">
              <div>
                <div className="address-info-container">
                  <label htmlFor="address-phoneNumber">PHONE NUMBER</label>
                  <input
                    id="address-phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="address-info-container">
                  <label htmlFor="address-doorBell">DOOR BELL</label>
                  <input id="address-doorBell" value={doorBell} onChange={(e) => setDoorBell(e.target.value)} />
                </div>

                <div className="address-info-container">
                  <label htmlFor="address-floor">FLOOR</label>
                  <input id="address-floor" value={floor} onChange={(e) => setFloor(e.target.value)} />
                </div>
              </div>
              <div>
                <div className="address-info-container">
                  <label htmlFor="address-block">BLOCK</label>
                  <input id="address-block" value={block} onChange={(e) => setBlock(e.target.value)} />
                </div>

                <div className="address-info-container">
                  <label htmlFor="address-apartment">APARTMENT</label>
                  <input id="address-apartment" value={apartment} onChange={(e) => setApartment(e.target.value)} />
                </div>

                <div className="address-info-container">
                  <label htmlFor="address-entrance">ENTRANCE</label>
                  <input id="address-entrance" value={entrance} onChange={(e) => setEntrance(e.target.value)} />
                </div>
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
