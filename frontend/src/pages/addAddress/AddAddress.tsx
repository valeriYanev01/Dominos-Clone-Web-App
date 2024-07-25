import React from "react";
import "./AddAddress.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AddAddressComponent from "../../components/Add Address/AddAddressComponent";

const AddAddress: React.FC = () => {
  return (
    <div className="add-address-page">
      <Navbar page="add-address" />
      <AddAddressComponent />
      <Footer />
    </div>
  );
};

export default AddAddress;
