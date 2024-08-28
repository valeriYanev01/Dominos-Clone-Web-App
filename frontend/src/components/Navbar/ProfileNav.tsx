import React from "react";
import { Link } from "react-router-dom";
import "./ProfileNav.css";

interface Props {
  setActiveProfileOption: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  activeProfileOption: boolean;
}

const ProfileNav: React.FC<Props> = ({ setShowProfileMenu, setActiveProfileOption, activeProfileOption }) => {
  return (
    <ul
      className="profile-nav"
      style={JSON.parse(localStorage.getItem("active-order") as string) ? { marginTop: "8.7rem" } : { marginTop: "0" }}
    >
      <li
        onClick={() => {
          setShowProfileMenu(false);
          setActiveProfileOption(true);
        }}
        className={`${activeProfileOption ? "active" : ""}`}
      >
        <Link to="/profile/account">MY PROFILE</Link>
      </li>
      <li
        onClick={() => {
          setShowProfileMenu(false);
          setActiveProfileOption(true);
        }}
        className={`${activeProfileOption ? "active" : ""}`}
      >
        <Link to="/profile/addresses">MY ADDRESSES</Link>
      </li>
      <li
        onClick={() => {
          setShowProfileMenu(false);
          setActiveProfileOption(true);
        }}
        className={`${activeProfileOption ? "active" : ""}`}
      >
        <Link to="/profile/orders">MY ORDERS</Link>
      </li>
      <li
        onClick={() => {
          setShowProfileMenu(false);
          setActiveProfileOption(true);
        }}
        className={`${activeProfileOption ? "active" : ""}`}
      >
        <Link to="/profile/coupons">MY COUPONS & GIFTS</Link>
      </li>
      <li
        onClick={() => {
          setShowProfileMenu(false);
          setActiveProfileOption(true);
        }}
        className={`${activeProfileOption ? "active" : ""}`}
      >
        <Link to="/profile/payment-methods">PAYMENT METHODS</Link>
      </li>
      <li
        onClick={() => {
          setShowProfileMenu(false);
          setActiveProfileOption(true);
        }}
        className={`${activeProfileOption ? "active" : ""}`}
      >
        <Link to="/profile/privacy-settings">PRIVACY SETTINGS</Link>
      </li>
    </ul>
  );
};

export default ProfileNav;
