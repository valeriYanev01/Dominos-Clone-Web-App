import React, { useContext } from "react";
import ActiveOrder from "./ActiveOrder";
import { OrderContext } from "../../context/OrderContext";
import { LoginContext } from "../../context/LoginContext";
import { Link } from "react-router-dom";
import { ModalContext, ModalType } from "../../context/ModalContext";

interface Props {
  page: string;
}

const LoggedInNavigation: React.FC<Props> = ({ page }) => {
  const { orderStore, activeTracker, activeOrder } = useContext(OrderContext);
  const { loggedIn } = useContext(LoginContext);
  const { setOpenModal, setModalType } = useContext(ModalContext);

  const handleOpenModal = (modal: ModalType) => {
    setModalType(modal);
    setOpenModal(true);
  };

  return (
    <>
      {loggedIn && page === "home" && !activeOrder && !activeTracker ? (
        <div className="loggedin-navigation">
          <div onClick={() => handleOpenModal("delivery")}>
            <img src="/images/delivery.png" className="loggedin-navigation-img" />
            <p>DELIVERY</p>
          </div>
          <img src="/images/or_image.png" className="loggedin-navigation-img" />
          <div onClick={() => handleOpenModal("carryOut")}>
            <img src="/images/carryOut.png" className="loggedin-navigation-img" />
            <p>CARRY OUT</p>
          </div>
        </div>
      ) : loggedIn && page === "home" && activeOrder && !activeTracker ? (
        <div className="loggedin-navigation">
          <p className="loggedin-navigation-text">CONTINUE WITH YOUR ORDER HERE</p>{" "}
          <Link
            to={`/menu/${orderStore.toLocaleLowerCase().split(" ").join("")}/pizza`}
            onClick={() => {
              setModalType("");
              setOpenModal(false);
            }}
          >
            <img src="/svg/orderBasketWhite.svg" className="loggedin-navigation-basket-img" />
          </Link>
        </div>
      ) : (
        loggedIn && activeOrder && !activeTracker && page !== "careers" && <ActiveOrder />
      )}
    </>
  );
};

export default LoggedInNavigation;
