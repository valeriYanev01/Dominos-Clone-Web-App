import React, { useState } from "react";
import "./ForgotPasswordComponent.css";
import axios from "axios";

const ForgotPasswordComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSendNewPassword = async () => {
    navigator.vibrate(50);
    setError("");
    try {
      const response = await axios.post("https://dominos-clone-backend.vercel.app/api/users/forgot-password", { email });

      if (response.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.error);
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="modal-title fp-modal-title">
        <img src="/svg/decorLeftRed.svg" className="deal-decor" />
        <span>FORGOT MY PASSWORD</span>
        <img src="/svg/decorRightRed.svg" className="deal-decor" />
      </div>

      <div className="forgot-password-content">
        <p>
          Please enter your email address If you do not receive the email, <br />
          please check your spam folder or junk folder .
        </p>

        <div className="fp-email-container">
          <label htmlFor="fp-email">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} id="fp-email" placeholder="E.g. your@email.com" required />
        </div>

        <button
          className={`fp-btn ${success ? "fp-btn-disabled" : ""}`}
          onClick={handleSendNewPassword}
          disabled={success}
        >
          SEND NEW PASSWORD
        </button>

        {success && <p>Email sent successfully</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
