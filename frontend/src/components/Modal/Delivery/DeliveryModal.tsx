import React, { useContext, useEffect, useState } from "react";
import "./DeliveryModal.css";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import AddNewAddress from "../../Buttons/AddNewAddress";
import { Address } from "../../../types/Address";
import { ModalContext } from "../../../context/ModalContext";
import { OrderContext } from "../../../context/OrderContext";
import { useNavigate } from "react-router-dom";

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
  const { setOpenModal, setModalType, setProduct } = useContext(ModalContext);
  const { setOrderType, orderStore, setOrderStore, setOrderAddress, orderTime, setOrderTime, setActiveOrder } =
    useContext(OrderContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (emailLogin && token) {
      const getAllOrders = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/users/get-orders", {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: emailLogin },
          });

          const allOrders = response.data.allOrders.orders;

          if (allOrders.length < 1) {
            setShowRecentAddress(false);
            console.log(otherAddresses);
            setSelectedAddress(otherAddresses[0]);
          } else {
            const lastOrder = allOrders[allOrders.length - 1];
            setLastOrderAddress(lastOrder);
            setLastOrderFullAddress(lastOrder.address.fullAddress);
            setLastOrderAddressName(lastOrder.address.name);
            setOrderStore(lastOrder.address.store);
            setShowAddresses(true);
            setShowRecentAddress(true);
            setSelectedAddress(lastOrder.address);
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.log(err.message);
          }
        }
      };
      getAllOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailLogin, token, otherAddresses]);

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
            setShowOtherAddresses(true);
            setShowAddresses(true);
            if (newAddresses.length < response.data.allAddresses.addresses.length) {
              setOtherAddresses(newAddresses);
            }
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.log(err.message);
          }
        }
      };

      getAllAddresses();
    }
  }, [emailLogin, token, lastOrderAddressName]);

  useEffect(() => {
    if (new Date().getHours() >= 11) {
      setIsOpenForDelivery(true);
    }
  }, []);

  useEffect(() => {
    if (selectedAddress) setOrderAddress(selectedAddress);
  }, [selectedAddress, setOrderAddress]);

  const deliveryHoursOpenedStore = [
    isOpenForDelivery ? "NOW" : "11:30",
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

  const deliveryHoursOpen = deliveryHoursOpenedStore
    .map((hour) => {
      if (hour !== "NOW") {
        const h = parseInt(hour.split(":")[0]);
        const m = parseInt(hour.split(":")[1]);

        const dateForDelivery = new Date(new Date(new Date(new Date().setHours(h)).setMinutes(m)).setSeconds(0));

        const now = new Date();

        if (dateForDelivery.getTime() < new Date(now.getTime()).setMinutes(now.getMinutes() + 20)) {
          return undefined;
        } else {
          return String(
            `${dateForDelivery.getHours()}:${
              String(dateForDelivery.getMinutes()).length === 1 ? "00" : dateForDelivery.getMinutes()
            }`
          );
        }
      } else {
        return "NOW";
      }
    })
    .filter((hour) => hour !== undefined);

  useEffect(() => {
    if (isOpenForDelivery && deliveryHoursOpen[0]) {
      setOrderTime(deliveryHoursOpen[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenForDelivery]);

  const handleSelectedAddress = (address: Address) => {
    setSelectedAddress(address.address ? address.address : address);
  };

  const handleOrder = () => {
    setOrderType("delivery");
    setActiveOrder(true);
    navigate(`/menu/${orderStore.toLocaleLowerCase().split(" ").join("")}/pizza`);
    setOpenModal(false);
    setProduct([]); // if there is an active product the modal will be open, so it needs to be nullified before entering the menu page
    setModalType("");
    localStorage.setItem("active-order", "true");
    localStorage.setItem(
      "order-details",
      JSON.stringify({
        type: "delivery",
        addressLocation: selectedAddress?.fullAddress,
        addressName: selectedAddress?.name,
        store: orderStore,
      })
    );
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
                className={`address-container ${
                  selectedAddress === lastOrderAddress?.address ? "selected-address" : ""
                }`}
              >
                <img
                  src="/svg/edit.svg"
                  className="dm-address-edit-img"
                  style={selectedAddress === lastOrderAddress?.address ? { display: "block" } : { display: "none" }}
                />
                <img
                  src="/svg/greenCheck.svg"
                  className="dm-address-check-img"
                  style={selectedAddress === lastOrderAddress?.address ? { display: "block" } : { display: "none" }}
                />

                <p className="dm-address-name">{lastOrderAddressName}</p>

                <div className="dm-address-location-container">
                  <img
                    src="/svg/addressLocation.svg"
                    className="dm-address-location-store"
                    style={selectedAddress === lastOrderAddress?.address ? { display: "block" } : { display: "none" }}
                  />
                  <p>{lastOrderFullAddress}</p>
                </div>

                <div className="dm-address-store-container">
                  <img
                    src="/svg/addressStore.svg"
                    className="dm-address-location-store"
                    style={selectedAddress === lastOrderAddress?.address ? { display: "block" } : { display: "none" }}
                  />
                  <p>
                    Your Store: <span className="dm-address-store-name">{orderStore}</span>
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
        <select onChange={(e) => setOrderTime(e.target.value)} value={orderTime}>
          {deliveryHoursOpen.map((hour, i) => (
            <option key={i}>{hour}</option>
          ))}
        </select>
      </div>

      <div
        className={`dm-address-order-btn ${!showAddresses ? "dm-address-order-btn-disabled" : ""}`}
        onClick={handleOrder}
      >
        ORDER NOW!
      </div>
    </div>
  );
};

export default DeliveryModal;
