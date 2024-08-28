import React, { useContext } from "react";
import "./MobileLinks.css";
import { LoginContext } from "../../context/LoginContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { OrderContext } from "../../context/OrderContext";
import { ModalContext } from "../../context/ModalContext";
import { MenuContext } from "../../context/MenuContext";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileLinks: React.FC<Props> = ({ setShowProfileMenu }) => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { activeOrder, activeTracker } = useContext(OrderContext);
  const { setOpenModal, setModalType } = useContext(ModalContext);
  const { setSelectedItem } = useContext(MenuContext);

  const inStore = useLocation().pathname.includes("/menu");

  const navigate = useNavigate();

  const { logout, user } = useAuth0();

  const handleOrderBtn = () => {
    setOpenModal(true);
    if (loggedIn) {
      setModalType("method");
    } else {
      setModalType("login");
    }
  };

  const handleOpenStore = (menuItem: string) => {
    setSelectedItem(menuItem);
    if (!inStore) {
      setModalType("selectStore");
      setOpenModal(true);
    }
  };

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
    window.location.reload();
  };

  return (
    <div className="navigation-mobile-links">
      <div>
        {loggedIn ? (
          <ul className="nav-mobile">
            <li className="nav-mobile-profile">
              <Link to="/profile/account">
                <img src="/svg/profile.svg" className="navigation-profile-img" />
                <span>PROFILE</span>
              </Link>
            </li>
            <li>
              <Link to="/tracker">PIZZA TRACKER</Link>
            </li>
            <li className="nav-mobile-special">
              <Link to="/dominos-more" className="navigation-more">
                DOMINO'S MORE
              </Link>
            </li>
            <li onClick={handleLogout}>
              <Link to="/">LOGOUT</Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-mobile">
            <li>
              {inStore ? (
                <Link to="pizza" onClick={() => handleOpenStore("pizza")}>
                  MENU
                </Link>
              ) : (
                <span onClick={() => handleOpenStore("pizza")}>MENU</span>
              )}
            </li>

            <li>
              {inStore ? (
                <Link to="deals" onClick={() => handleOpenStore("deals")}>
                  DEALS
                </Link>
              ) : (
                <span onClick={() => handleOpenStore("deals")}>DEALS</span>
              )}
            </li>

            <li className="nav-mobile-special">
              <Link to="/dominos-more" className="navigation-more">
                DOMINO'S MORE
              </Link>
            </li>
            {!activeOrder && !activeTracker && (
              <li className="nav-mobile-special">
                <span onClick={handleOrderBtn} className="navigation-order">
                  ORDER NOW
                </span>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MobileLinks;
