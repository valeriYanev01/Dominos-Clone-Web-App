import React, { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../Profile/PaymentMethods/CheckoutForm";
import { LoginContext } from "../../../context/LoginContext";
import axios from "axios";
import "./PaymentDetailsStep.css";
import { Coupons } from "../../Profile/Coupons/Coupons";
import { OrderContext } from "../../../context/OrderContext";

interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
  };
}

interface Props {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  clientSecret: string;
  setClientSecret: React.Dispatch<React.SetStateAction<string>>;
  selectedCard: string;
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>;
}

const PaymentDetailsStep: React.FC<Props> = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  clientSecret,
  setClientSecret,
  selectedCard,
  setSelectedCard,
}) => {
  const [cardError, setCardError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stripePromise, setStripePromise] = useState<any | null>(null);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<PaymentMethod[]>([]);
  const [cardSuccess, setCardSuccess] = useState(false);
  const [showAddNewCard, setShowAddNewCard] = useState(false);
  const [coupons, setCoupons] = useState<Coupons[]>([]);
  const [showCoupons, setShowCoupons] = useState(false);

  const { token, emailLogin, customerID, setLoggedIn } = useContext(LoginContext);
  const { setSelectedCoupon } = useContext(OrderContext);

  useEffect(() => {
    if (token) {
      const getPublishableKey = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/payment/config", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setStripePromise(loadStripe(response.data.publishableKey));
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.log(err);
            if (err.response?.data.error === "Request is not authorized") {
              setLoggedIn(false);
            }
          }
        }
      };

      getPublishableKey();
    }
  }, [token, showAddNewCard, setLoggedIn]);

  useEffect(() => {
    if (token && customerID) {
      const fetchAllPaymentMethods = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/payment/all-payment-methods", {
            headers: { Authorization: `Bearer ${token}` },
            params: { customerID },
          });

          setSavedPaymentMethods(response.data.savedPaymentMethods);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.log(err);
          }
        }
      };

      fetchAllPaymentMethods();
    }
  }, [token, customerID, cardSuccess]);

  useEffect(() => {
    if (cardSuccess) {
      setShowAddNewCard(false);
    }
  }, [cardSuccess]);

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/payment/create-payment-intent",
          {
            amount: 100,
            payment_method: selectedCard,
            customer: customerID,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setClientSecret(response.data.paymentIntent.client_secret);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err);
        }
      }
    };

    if (token) {
      getClientSecret();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerID, token, showAddNewCard]);

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await axios.get("http://localhost:3000/api/users/get-coupons", {
        params: { email: emailLogin },
        headers: { Authorization: `Bearer ${token}` },
      });

      setCoupons(response.data.coupons.coupons.filter((coupon: Coupons) => !coupon.used));
    };

    if (token && emailLogin) {
      fetchCoupons();
    }
  }, [token, emailLogin]);

  const handleDeleteCard = async (paymentMethodID: string) => {
    try {
      const response = await axios.delete("http://localhost:3000/api/payment/delete-payment-method", {
        headers: { Authorization: `Bearer ${token}` },
        params: { email: emailLogin, paymentMethodID },
      });

      if (response.data.success) {
        try {
          const response = await axios.get("http://localhost:3000/api/payment/all-payment-methods", {
            headers: { Authorization: `Bearer ${token}` },
            params: { customerID },
          });

          setSavedPaymentMethods(response.data.savedPaymentMethods);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.log(err);
          }
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const handleSelectCoupon = (checked: boolean, id: string) => {
    if (checked) {
      setSelectedCoupon(id);
    } else {
      setSelectedCoupon("");
    }
  };

  return (
    <div className="checkout-details-payment-container">
      <div className="checkout-details-payment first-payment-step">
        <span className="checkout-details-step">2</span>

        <p className="checkout-details-delivery-heading">PAYMENT METHOD</p>

        <div
          onClick={() => {
            setShowAddNewCard(false);
            setSelectedPaymentMethod("cash");
          }}
          className="checkout-delivery-method"
        >
          <input
            type="radio"
            name="payment-method"
            value="cash"
            checked={selectedPaymentMethod === "cash"}
            onChange={() => setSelectedPaymentMethod("cash")}
          />
          <img src={selectedPaymentMethod === "cash" ? "/svg/checkout/cash-selected.svg" : "/svg/checkout/cash.svg"} />
          <p>Cash</p>
        </div>

        <div onClick={() => setSelectedPaymentMethod("card")} className="checkout-delivery-method">
          <input
            type="radio"
            name="payment-method"
            value="cash"
            checked={selectedPaymentMethod === "card"}
            onChange={() => setSelectedPaymentMethod("card")}
          />
          <img src={selectedPaymentMethod === "card" ? "/svg/checkout/card-selected.svg" : "/svg/checkout/card.svg"} />
          <div>
            <p className="checkout-delivery-method-card">Credit Card</p>
            <p className="checkout-delivery-method-card-symbol-text">&#10003; No extra charge</p>
          </div>
        </div>

        {selectedPaymentMethod === "card" && (
          <div>
            <ul className="checkout-saved-cards-container">
              {savedPaymentMethods &&
                savedPaymentMethods.map((method) => (
                  <li key={method.id}>
                    <input
                      type="radio"
                      name="checkout-selected-card"
                      id={method.id}
                      value={method.id}
                      onChange={() => setSelectedCard(method.id)}
                    />
                    <label htmlFor={method.id}>
                      <span className="checkout-saved-card-brand">{method.card.brand}</span> **** **** ****{" "}
                      <span className="checkout-saved-card-last4">{method.card.last4}</span>
                    </label>
                    <img
                      className="checkout-single-card-delete"
                      src="/svg/checkout/delete.svg"
                      onClick={() => handleDeleteCard(method.id)}
                    />
                  </li>
                ))}
            </ul>
            <div className="checkout-all-new-invoice-container" onClick={() => setShowAddNewCard(!showAddNewCard)}>
              <p className="checkout-all-invoice-btn">Add New Card</p>
              <img className="checkout-all-invoice-btn-img" src="/svg/checkout/plus.svg" />
            </div>
          </div>
        )}

        {showAddNewCard && clientSecret && stripePromise && (
          <>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm setCardError={setCardError} setCardSuccess={setCardSuccess} />
            </Elements>

            {cardError && <p className="checkout-card-error">{cardError}</p>}
          </>
        )}
      </div>

      <div className="checkout-details-payment">
        <h3 className="checkout-details-payment-coupons-heading" onClick={() => setShowCoupons(!showCoupons)}>
          <img src="/svg/checkout/coupons.svg" />
          <p>YOUR COUPONS</p>
        </h3>

        {showCoupons && (
          <div className="checkout-details-payment-coupons-container">
            {coupons.map((coupon) => (
              <div className="checkout-details-payment-coupon" key={coupon._id}>
                <label htmlFor={coupon._id}>{coupon.name}</label>
                <input
                  type="checkbox"
                  id={coupon._id}
                  onChange={(e) => handleSelectCoupon(e.target.checked, e.target.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetailsStep;
