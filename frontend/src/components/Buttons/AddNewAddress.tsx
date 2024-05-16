import React, { useContext } from "react";
import "./AddNewAddress.css";
import { Link } from "react-router-dom";
import { MapContext } from "../../context/MapContext";

const AddNewAddress: React.FC = () => {
  const { setLat, setLong, setZoom, setFullAddress, setSelectedSuggestedAddress } = useContext(MapContext);

  return (
    <Link
      to="/add-address"
      className="pas-addresses-add-new-container"
      onClick={() => {
        setFullAddress("");
        setSelectedSuggestedAddress("");
      }}
    >
      <div
        className="pas-addresses-add-new"
        onClick={() => {
          setZoom(12);
          setLat(42.693942);
          setLong(23.313396);
        }}
      >
        <span className="pas-addresses-add-new-text">ADD A NEW ADDRESS</span>
      </div>
    </Link>
  );
};

export default AddNewAddress;
