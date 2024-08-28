import React, { useState } from "react";
import "./NewPasswordComponent.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Heading from "../Profile/Heading/Heading";

const NewPasswordComponent: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const token = useParams().token;

  const handleResetPassword = async () => {
    const response = await axios.post("https://dcback.vercel.app/api/users/reset-password", {
      password,
      confirmPassword,
      token,
    });

    if (response.data.success) {
      navigate("/");
    }
  };

  return (
    <div className="reset-password-container">
      <Heading text="PASSWORD RESET" />

      <div className="reset-password-content">
        <p>Please enter below your new password</p>

        <div className="rp-password-container">
          <div>
            <label htmlFor="rp-password">NEW PASSWORD *</label>
            <input onChange={(e) => setPassword(e.target.value)} id="rp-password" required />
          </div>

          <div>
            <label htmlFor="rp-password">CONFIRM PASSWORD *</label>
            <input onChange={(e) => setConfirmPassword(e.target.value)} id="rp-password" required />
          </div>
        </div>

        <div className="rp-btn" onClick={handleResetPassword}>
          RESET PASSWORD
        </div>
      </div>
    </div>
  );
};

export default NewPasswordComponent;
