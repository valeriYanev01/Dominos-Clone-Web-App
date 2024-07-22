import React, { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./PaymentMethods.css";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import Heading from "../../Heading/Heading";

interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
  };
}

const PaymentMethods: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stripePromise, setStripePromise] = useState<any | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [showAddNewCard, setShowAddNewCard] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [cardError, setCardError] = useState("");
  const [cardSuccess, setCardSuccess] = useState(false);

  const { token, customerID, emailLogin } = useContext(LoginContext);

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
          }
        }
      };

      getPublishableKey();
    }
  }, [token]);

  useEffect(() => {
    if (token && customerID) {
      const fetchAllPaymentMethods = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/payment/all-payment-methods", {
            headers: { Authorization: `Bearer ${token}` },
            params: { customerID },
          });

          setPaymentMethods(response.data.savedPaymentMethods);
        } catch (err) {
          console.log(err);
        }
      };

      fetchAllPaymentMethods();
    }
  }, [token, customerID]);

  useEffect(() => {
    const handlePaymentMethod = async () => {
      setCardError("");
      try {
        const response = await axios.post(
          "http://localhost:3000/api/payment/create-payment-intent",
          {
            amount: 2000,
            customer: customerID,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setClientSecret(response.data.paymentIntent.client_secret);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setCardError(err.response?.data.error);
        }
      }
    };

    if (token) {
      handlePaymentMethod();
    }
  }, [customerID, token]);

  useEffect(() => {
    const fetchAllPaymentMethods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/payment/all-payment-methods", {
          headers: { Authorization: `Bearer ${token}` },
          params: { customerID },
        });

        setPaymentMethods(response.data.savedPaymentMethods);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err);
        }
      }
    };

    if (token && customerID) {
      fetchAllPaymentMethods();
    }

    if (cardSuccess) {
      fetchAllPaymentMethods();
    }
  }, [token, customerID, cardSuccess]);

  console.log(cardSuccess);

  useEffect(() => {
    if (cardSuccess) {
      setShowAddNewCard(false);
    }
  }, [cardSuccess]);

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

          setPaymentMethods(response.data.savedPaymentMethods);
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

  return (
    <div className="saved-payment-methods">
      <Heading text="Saved Payment Methods" />

      <div className="spm-body">
        <ul className="spm-cards-container">
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method, i) => (
              <li key={method.id}>
                {i + 1}. {method.card.brand} **** **** **** {method.card.last4}
                <img
                  className="checkout-single-card-delete spm-delete-card"
                  src="/svg/checkout/delete.svg"
                  onClick={() => handleDeleteCard(method.id)}
                />
              </li>
            ))
          ) : (
            <p>No added cards</p>
          )}
        </ul>
        <div
          onClick={() => {
            setShowAddNewCard(!showAddNewCard);
            setCardError("");
          }}
          className="spm-add-new-card"
        >
          Add New Card
        </div>
        {showAddNewCard && clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm setCardError={setCardError} setCardSuccess={setCardSuccess} />
          </Elements>
        )}

        {cardError && <p>{cardError}</p>}
      </div>
    </div>
  );
};

export default PaymentMethods;
