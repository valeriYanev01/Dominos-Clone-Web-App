import React, { useContext, useEffect, useState } from "react";
import "./DeliveryModal.css";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import AddNewAddress from "../../Buttons/AddNewAddress";
import { Address } from "../../../types/Address";
import { ModalContext } from "../../../context/ModalContext";

const DeliveryModal: React.FC = () => {
  const [lastOrderFullAddress, setLastOrderFullAddress] = useState();
  const [lastOrderAddressName, setLastOrderAddressName] = useState();
  const [otherAddresses, setOtherAddresses] = useState<Address[]>([]);
  const [lastOrderAddress, setLastOrderAddress] = useState<Address>();
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [isOpenForDelivery, setIsOpenForDelivery] = useState(false);
  const [showAddresses, setShowAddresses] = useState(true);
  const [showOtherAddresses, setShowOtherAddresses] = useState(false);
  const [showRecentAddress, setShowRecentAddress] = useState(false);

  const { token, emailLogin } = useContext(LoginContext);
  const { setOpenModal, setModalType } = useContext(ModalContext);

  const deliveryHours = [
    isOpenForDelivery && "NOW",
    "11:30",
    "11:40",
    "11:50",
    "12:00",
    "12:10",
    "12:20",
    "12:30",
    "12:40",
    "12:50",
    "13:00",
    "13:10",
    "13:20",
    "13:30",
    "13:40",
    "13:50",
    "14:00",
    "14:10",
    "14:20",
    "14:30",
    "14:40",
    "14:50",
    "15:00",
    "15:10",
    "15:20",
    "15:30",
    "15:40",
    "15:50",
    "16:00",
    "16:10",
    "16:20",
    "16:30",
    "16:40",
    "16:50",
    "17:00",
    "17:10",
    "17:20",
    "17:30",
    "17:40",
    "17:50",
    "18:00",
    "18:10",
    "18:20",
    "18:30",
    "18:40",
    "18:50",
    "19:00",
    "19:10",
    "19:20",
    "19:30",
    "19:40",
    "19:50",
    "20:00",
    "20:10",
    "20:20",
    "20:30",
    "20:40",
    "20:50",
    "21:00",
    "21:10",
    "21:20",
    "21:30",
    "21:40",
    "21:50",
    "22:00",
    "22:10",
    "22:20",
    "22:30",
  ];

  useEffect(() => {
    if (emailLogin && token) {
      try {
        const getAllOrders = async () => {
          const response = await axios.get("http://localhost:3000/api/users/get-orders", {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: emailLogin },
          });

          const allOrders = response.data.allOrders.orders;
          console.log(allOrders);

          if (allOrders.length < 1) {
            setShowRecentAddress(false);
            setSelectedAddress(otherAddresses[0]);
          } else {
            const lastOrder = allOrders[allOrders.length - 1];
            setLastOrderAddress(lastOrder);
            setLastOrderFullAddress(lastOrder.address.fullAddress);
            setLastOrderAddressName(lastOrder.address.name);
            setShowAddresses(true);
            setShowRecentAddress(true);
          }
        };

        getAllOrders();
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.message);
        }
      }
    }
  }, [emailLogin, token]);

  useEffect(() => {
    if (emailLogin && token) {
      const getAllAddresses = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/users/get-addresses", {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: emailLogin },
          });

          const newAddresses = response.data.allAddresses.addresses.filter((address: Address) => {
            return address.name !== lastOrderAddressName;
          });

          if (newAddresses.length < 1) {
            setShowOtherAddresses(false);
          } else {
            setOtherAddresses(newAddresses);
            setShowOtherAddresses(true);
            setShowAddresses(true);
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.log(err.message);
          }
        }
      };

      getAllAddresses();
    }
    setSelectedAddress(lastOrderAddress);
  }, [emailLogin, token, lastOrderAddressName, lastOrderAddress, showRecentAddress]);

  useEffect(() => {
    if (new Date().getHours() >= 11) {
      setIsOpenForDelivery(true);
    }
  }, []);

  const handleSelectedAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="delivery-modal">
      <div className="dm-heading">
        <img src="/svg/decorLeftRed.svg" className="deal-decor" />
        <p>SELECT ADDRESS & DELIVERY TIME</p>
        <img src="/svg/decorRightRed.svg" className="deal-decor" />
      </div>

      {!showAddresses ? (
        <p className="dm-no-addresses">To begin your delivery order please add your delivery address below</p>
      ) : (
        <div className="dm-adresses-container">
          {showRecentAddress && (
            <div className="dm-addresses-recently">
              <p className="dm-addresses-heading">Recently Selected</p>
              <div
                onClick={() => handleSelectedAddress(lastOrderAddress as Address)}
                className={`address-container ${selectedAddress === lastOrderAddress ? "selected-address" : ""}`}
              >
                <img
                  src="/svg/edit.svg"
                  className="dm-address-edit-img"
                  style={selectedAddress === lastOrderAddress ? { display: "block" } : { display: "none" }}
                />
                <img
                  src="/svg/greenCheck.svg"
                  className="dm-address-check-img"
                  style={selectedAddress === lastOrderAddress ? { display: "block" } : { display: "none" }}
                />

                <p className="dm-address-name">{lastOrderAddressName}</p>

                <div className="dm-address-location-container">
                  <img
                    src="/svg/addressLocation.svg"
                    className="dm-address-location-store"
                    style={selectedAddress === lastOrderAddress ? { display: "block" } : { display: "none" }}
                  />
                  <p>{lastOrderFullAddress}</p>
                </div>

                <div className="dm-address-store-container">
                  <img
                    src="/svg/addressStore.svg"
                    className="dm-address-location-store"
                    style={selectedAddress === lastOrderAddress ? { display: "block" } : { display: "none" }}
                  />
                  <p>
                    Your Store: <span className="dm-address-store-name">Store</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {showOtherAddresses && (
            <div className="dm-addresses-others">
              <p className="dm-addresses-heading">Other Adresses</p>
              {otherAddresses &&
                otherAddresses.map((address: Address) => (
                  <div
                    key={address._id}
                    onClick={() => handleSelectedAddress(address)}
                    className={`address-container ${selectedAddress === address ? "selected-address" : ""}`}
                  >
                    <img
                      src="/svg/edit.svg"
                      className="dm-address-edit-img"
                      style={selectedAddress === address ? { display: "block" } : { display: "none" }}
                    />
                    <img
                      src="/svg/greenCheck.svg"
                      className="dm-address-check-img"
                      style={selectedAddress === address ? { display: "block" } : { display: "none" }}
                    />
                    <p className="dm-address-name">{address.name}</p>
                    <div className="dm-address-location-container">
                      <img
                        src="/svg/addressLocation.svg"
                        className="dm-address-location-store"
                        style={selectedAddress === address ? { display: "block" } : { display: "none" }}
                      />
                      <p>{lastOrderFullAddress}</p>
                    </div>

                    <div className="dm-address-store-container">
                      <img
                        src="/svg/addressStore.svg"
                        className="dm-address-location-store"
                        style={selectedAddress === address ? { display: "block" } : { display: "none" }}
                      />
                      <p>
                        Your Store: <span className="dm-address-store-name">Store</span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      <div
        className="dm-address-new-address-btn"
        onClick={() => {
          setOpenModal(false);
          setModalType("");
        }}
      >
        <AddNewAddress />
      </div>

      {showAddresses && !isOpenForDelivery && (
        <div className="dm-address-store-closed">
          <img src="/svg/storeClosed.svg" className="dm-address-store-closed-img" />
          <p>The store is now closed... but we start delivering from:</p>
        </div>
      )}

      <div className="dm-address-delivery-time">
        <p>DELIVERY TIME</p>
        <select>
          {deliveryHours.map((hour, i) => (
            <option key={i}>{hour}</option>
          ))}
        </select>
      </div>

      <div className={`dm-address-order-btn ${!showAddresses ? "dm-address-order-btn-disabled" : ""}`}>ORDER NOW!</div>
    </div>
  );
};

export default DeliveryModal;
