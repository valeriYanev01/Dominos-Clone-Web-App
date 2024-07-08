import React, { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./PaymentMethods.css";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";

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

  const { token, customerID } = useContext(LoginContext);

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

  const handlePaymentMethod = async (paymentMethodID: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payment/create-payment-intent",
        {
          amount: 2000,
          payment_method: paymentMethodID,
          return_url: `http://localhost:5173/tracker`,
          customer: customerID,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setClientSecret(response.data.paymentIntent.client_secret);
      if (response.data.paymentIntent.status === "succeeded") {
        window.location.href = "http://localhost:5173/tracker";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Saved Payment Methods</h2>
      <ul>
        {paymentMethods &&
          paymentMethods.map((method) => (
            <li key={method.id}>
              <button onClick={() => handlePaymentMethod(method.id)}>
                {method.card.brand} **** **** **** {method.card.last4}
              </button>
            </li>
          ))}
      </ul>
      <div onClick={() => setShowAddNewCard(!showAddNewCard)}>Add New Card</div>
      {showAddNewCard && clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentMethods;
