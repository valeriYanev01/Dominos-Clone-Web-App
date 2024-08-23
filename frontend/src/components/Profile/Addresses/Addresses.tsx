import React, { useContext, useEffect, useState } from "react";
import "./Addresses.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import Map from "../../Map/Map";
import useGetSuggestion from "../../../hooks/useGetSuggestion";
import { MapContext } from "../../../context/MapContext";
import Heading from "../../Heading/Heading";
import AddNewAddress from "../../Buttons/AddNewAddress";
import { Address } from "../../../types/Address";

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
  const [store, setStore] = useState("");

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
    closestStore,
    showStore,
  } = useContext(MapContext);

  const getSuggestion = useGetSuggestion();

  const location = useLocation();

  useEffect(() => {
    const fetchAddresses = async () => {
      if (location.pathname.includes("addresses") && token && emailLogin) {
        try {
          const response = await axios.get("https://dcback.vercel.app/api/users/get-addresses", {
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
      const response = await axios.get("https://dcback.vercel.app/api/users/get-single-address", {
        headers: { Authorization: `Bearer ${token}` },
        params: { name: address, email: emailLogin },
      });

      const data = response.data.address;

      console.log(data);

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
      setStore(data.store);
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
          "https://dcback.vercel.app/api/users/update-address",
          {
            email: emailLogin,
            id: id,
            name: name,
            fullAddress: fullAddress,
            store: `${closestStore.city} - ${closestStore.name}`,
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
        await axios.delete("https://dcback.vercel.app/api/users/delete-address", {
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
      <Heading text={"MODIFY YOUR DETAILS, ADD OR DELETE AN ADDRESS"} />

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
          <AddNewAddress />
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
                        setLong(address.center[0]);
                        setLat(address.center[1]);
                        setZoom(20);
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
              {store ||
              (showStore &&
                (closestStore.city === "Sofia" ||
                  closestStore.city === "Plovdiv" ||
                  closestStore.city === "Pernik" ||
                  closestStore.city === "Varna" ||
                  closestStore.city === "Burgas")) ? (
                <p className="your-store-text">
                  Your Store:{" "}
                  <span className="your-store-text2">
                    {closestStore.city} - {closestStore.name}
                  </span>
                </p>
              ) : (
                <p>We don't deliver to your address!</p>
              )}
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
