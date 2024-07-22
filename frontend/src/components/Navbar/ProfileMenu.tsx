import React, { useContext } from "react";
import "./ProfileMenu.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginContext } from "../../context/LoginContext";

interface Props {
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu: React.FC<Props> = ({ setShowProfileMenu }) => {
  const { setLoggedIn } = useContext(LoginContext);

  const { logout, user } = useAuth0();

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (user) {
      setShowProfileMenu(false);
      logout({ logoutParams: { returnTo: window.location.origin } });
      localStorage.removeItem("user");
      localStorage.removeItem("active-tracker");
      localStorage.removeItem("active-order");
      localStorage.removeItem("customer_id");
      localStorage.removeItem("basket-items");
      setLoggedIn(false);
      navigate("/");
    }

    if (!user) {
      setShowProfileMenu(false);
      localStorage.removeItem("user");
      setLoggedIn(false);
      navigate("/");
    }

    localStorage.clear();
  };

  return (
    <ul className="navigation-profile-menu">
      <li onClick={() => setShowProfileMenu(false)}>
        <Link to="/profile/account">MY PROFILE</Link>
      </li>
      <li onClick={() => setShowProfileMenu(false)}>
        <Link to="/profile/addresses">MY ADDRESSES</Link>
      </li>
      <li onClick={() => setShowProfileMenu(false)}>
        <Link to="/profile/orders">MY ORDERS</Link>
      </li>
      <li onClick={() => setShowProfileMenu(false)}>
        <Link to="/profile/coupons">MY COUPONS & GIFTS</Link>
      </li>
      <li onClick={() => setShowProfileMenu(false)}>
        <Link to="/profile/privacy-settings">PRIVACY SETTINGS</Link>
      </li>
      <li onClick={handleLogout}>
        <Link to="/">LOGOUT</Link>
      </li>
    </ul>
  );
};

export default ProfileMenu;
