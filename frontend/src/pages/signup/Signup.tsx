import React from "react";
import "./Singup.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SignupComponent from "../../components/Signup/SignupComponent";

const Signup: React.FC = () => {
  return (
    <div className="signup">
      <Navbar page="signup" />
      <SignupComponent />
      <Footer />
    </div>
  );
};

export default Signup;
