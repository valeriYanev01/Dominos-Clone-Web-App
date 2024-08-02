import React, { useContext } from "react";
import "./MobileLinks.css";
import { LoginContext } from "../../context/LoginContext";
import { Link, useLocation } from "react-router-dom";
import { OrderContext } from "../../context/OrderContext";
import { ModalContext } from "../../context/ModalContext";
import { MenuContext } from "../../context/MenuContext";

const MobileLinks: React.FC = () => {
  const { loggedIn } = useContext(LoginContext);
  const { activeOrder, activeTracker } = useContext(OrderContext);
  const { setOpenModal, setModalType } = useContext(ModalContext);
  const { setSelectedItem } = useContext(MenuContext);

  const inStore = useLocation().pathname.includes("/menu");

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

  return (
    <div className="navigation-mobile-links">
      <div>
        {loggedIn ? (
          <ul className="nav-mobile">
            <li>
              <Link to="/tracker">PIZZA TRACKER</Link>
            </li>
            <li>
              <Link to="/tracker">PIZZA TRACKER</Link>
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
