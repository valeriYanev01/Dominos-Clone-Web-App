import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Checkout.css";
import { LoginContext } from "../../context/LoginContext";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { AddressContext } from "../../context/AddressContext";
import Carousel from "../../components/Checkout/Carousel/Carousel";
import PizzaMeterComponent from "../../components/Pizza Meter/PizzaMeterComponent";
import DeliveryStep from "../../components/Checkout/Steps/DeliveryStep";
import PaymentDetailsStep from "../../components/Checkout/Steps/PaymentDetailsStep";
import OrderStep from "../../components/Checkout/Steps/OrderStep";
import { OrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

export interface Invoice {
  companyActivity: string;
  companyAddress: string;
  companyName: string;
  companyOwner: string;
  companyVAT: string;
}

export const Checkout: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [bell, setBell] = useState("");
  const [comments, setComments] = useState("");
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [clientSecret, setClientSecret] = useState("");
  const [selectedCard, setSelectedCard] = useState("");

  const { dominosMorePoints, token, emailLogin } = useContext(LoginContext);
  const { setSelectedAddress } = useContext(AddressContext);
  const { itemsInBasket, orderType } = useContext(OrderContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (itemsInBasket.length < 1) {
      navigate("/");
    }
  }, [itemsInBasket.length, navigate]);

  useEffect(() => {
    setError("");
    if (token && emailLogin) {
      const fetchAllInvoices = async () => {
        setLoading(true);
        try {
          const response = await axios.get("http://localhost:3000/api/users/get-invoices", {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: emailLogin },
          });

          setAllInvoices(response.data.invoices.invoices);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data.error);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchAllInvoices();
    }
  }, [emailLogin, token]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/get-single-address", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            name: JSON.parse(localStorage.getItem("order-details") as string).addressName,
            email: emailLogin,
          },
        });

        console.log(response);

        const data = response.data.address;

        if (data.phoneNumber) {
          setPhoneNumber(data.phoneNumber);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/get-addresses", {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: emailLogin },
        });

        setPhoneNumber(response.data.allAddresses.addresses[0].phoneNumber);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err);
        }
      }
    };

    if (
      emailLogin &&
      token &&
      (orderType === "delivery" ||
        (localStorage.getItem("order-details") &&
          JSON.parse(localStorage.getItem("order-details") as string).type === "delivery"))
    ) {
      fetchAddress();
    } else if (
      emailLogin &&
      token &&
      (orderType === "carry-out" ||
        (localStorage.getItem("order-details") &&
          JSON.parse(localStorage.getItem("order-details") as string).type === "carryOut"))
    ) {
      fetchAllAddresses();
    }
  }, [emailLogin, token, orderType]);

  useEffect(() => {
    if (
      localStorage.getItem("order-details") &&
      JSON.parse(localStorage.getItem("order-details") as string).type === "delivery"
    ) {
      setSelectedAddress({
        name: JSON.parse(localStorage.getItem("order-details") as string).addressName,
        fullAddress: JSON.parse(localStorage.getItem("order-details") as string).addressLocation,
        store: JSON.parse(localStorage.getItem("order-details") as string).store,
        apartament: "",
        block: "",
        coordinates: [0, 0],
        doorBell: "",
        entrance: "",
        phoneNumber: "",
      });
    }
  }, [setSelectedAddress]);

  return (
    <div className="checkout-page">
      <Navbar page="checkout" />

      <div className="checkout-page-content-container">
        <Carousel />

        <div className="checkout-pizza-meter">
          <div className="checkout-dominos-more-container">
            <img src="/images/dominos_more.png" className="checkout-dominos-more" />
          </div>

          <PizzaMeterComponent />

          <div className="checkout-dominos-more-points-container">
            <p className="checkout-pm-text">PIZZA METER</p>

            <p className="checkout-pm-points-digits">{dominosMorePoints > 0 && dominosMorePoints}0</p>
            <p className="checkout-pm-points-text">POINTS</p>
          </div>
        </div>

        <div className="checkout-details-container">
          <DeliveryStep
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            floor={floor}
            setFloor={setFloor}
            bell={bell}
            setBell={setBell}
            comments={comments}
            setComments={setComments}
            allInvoices={allInvoices}
            setAllInvoices={setAllInvoices}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            selectedInvoice={selectedInvoice}
            setSelectedInvoice={setSelectedInvoice}
          />

          <PaymentDetailsStep
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            clientSecret={clientSecret}
            setClientSecret={setClientSecret}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />

          <OrderStep
            selectedCard={selectedCard}
            selectedPaymentMethod={selectedPaymentMethod}
            bell={bell}
            comments={comments}
            floor={floor}
            phoneNumber={phoneNumber}
            selectedInvoice={selectedInvoice}
            setClientSecret={setClientSecret}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};
