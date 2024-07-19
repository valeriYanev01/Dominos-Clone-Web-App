import React from "react";
import "./ForgotPassword.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ForgotPasswordComponent from "../../components/Forgot Password/ForgotPasswordComponent";

const ForgotPassword: React.FC = () => {
  return (
    <div className="forgot-password">
      <Navbar page="forgot-password" />

      <ForgotPasswordComponent />

      <Footer />
    </div>
  );
};

export default ForgotPassword;
