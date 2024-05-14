import React, { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./PaymentMethods.css";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";

const PaymentMethods: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stripePromise, setStripePromise] = useState<any | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  const { token } = useContext(LoginContext);

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
    if (token) {
      const createPaymentIntent = async () => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/payment/create-payment-intent",
            { amount: 2000 },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setClientSecret(response.data.paymentIntent.client_secret);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.log(err);
          }
        }
      };

      createPaymentIntent();
    }
  }, [token]);

  return (
    <div>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentMethods;
