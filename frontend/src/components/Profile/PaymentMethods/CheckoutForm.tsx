import React, { useContext } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { LoginContext } from "../../../context/LoginContext";
import "./CheckoutForm.css";

interface Props {
  setCardError: React.Dispatch<React.SetStateAction<string>>;
  setCardSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutForm: React.FC<Props> = ({ setCardError, setCardSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { emailLogin, token } = useContext(LoginContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.log(error);
      } else {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/payment/save-payment-method",
            {
              paymentMethodID: paymentMethod.id,
              email: emailLogin,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            setCardSuccess(true);
          }
        } catch (err) {
          console.log(err);
          if (axios.isAxiosError(err)) {
            setCardError(err.response?.data.error);
          }
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement id="payment-element" className="stripeElement" />
      <button disabled={!stripe} id="submit" className="submit-button">
        Save Card
      </button>
    </form>
  );
};

export default CheckoutForm;
