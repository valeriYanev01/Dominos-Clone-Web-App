import React from "react";
import "./NewPassword.css";
import Navbar from "../../components/Navbar/Navbar";
import NewPasswordComponent from "../../components/Forgot Password/NewPasswordComponent";
import Footer from "../../components/Footer/Footer";

const NewPassword: React.FC = () => {
  return (
    <div className="new-password">
      <Navbar page="new-password" />

      <NewPasswordComponent />

      <Footer />
    </div>
  );
};

export default NewPassword;
