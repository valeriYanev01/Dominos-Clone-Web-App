import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import { OrderContext } from "../../context/OrderContext";

const ActiveOrder: React.FC = () => {
  const { setOpenModal, setModalType } = useContext(ModalContext);
  const { orderStore, orderTime, navigateToCheckoutPage, setIsReadyForOrder } = useContext(OrderContext);

  const navigate = useNavigate();

  const handleNavigateToMenu = () => {
    if (window.location.pathname.includes("menu")) {
      return;
    } else {
      navigate(`/menu/${orderStore.toLocaleLowerCase().split(" ").join("")}/pizza`);
      setOpenModal(false);
      setModalType("");
    }
  };

  return (
    <ul className="navbar-active-order-container">
      <li
        onClick={() => {
          setOpenModal(true);
          setModalType("method");
        }}
      >
        {localStorage.getItem("order-details") && (
          <div className="navbar-active-order-step">
            <img src="/svg/order/step1.svg" className="navbar-active-order-step-img" />
            <span className="navbar-active-order-step-text" style={{ width: "max-content" }}>
              {JSON.parse(localStorage.getItem("order-details") as string).type[0].toUpperCase() +
                JSON.parse(localStorage.getItem("order-details") as string)
                  .type.split("")
                  .splice(1, JSON.parse(localStorage.getItem("order-details") as string).type.length - 1)
                  .join("")}
            </span>
          </div>
        )}
        {
          <div className="navbar-active-order-step" onClick={() => setIsReadyForOrder(false)}>
            <img src="/svg/order/time.svg" className="navbar-active-order-step-img navbar-img" />
            <span className="navbar-active-order-step-text">{orderTime}</span>
          </div>
        }
        <img src="/svg/order/arrow.svg" className="navbar-active-order-step-arrow" />
      </li>
      <li
        style={
          localStorage.getItem("order-details") &&
          JSON.parse(localStorage.getItem("order-details") as string).type === "delivery"
            ? { flex: 2 }
            : { flex: 1 }
        }
        onClick={() => {
          setOpenModal(true);
          setModalType(JSON.parse(localStorage.getItem("order-details") as string).type);
        }}
      >
        <div className="navbar-active-order-step" onClick={() => setIsReadyForOrder(false)}>
          <img src="/svg/order/step2.svg" className="navbar-active-order-step-img" />
          {localStorage.getItem("order-details") &&
          JSON.parse(localStorage.getItem("order-details") as string).addressLocation ? (
            <span className="navbar-active-order-step-text order-type-delivery">
              {localStorage.getItem("order-details") &&
                JSON.parse(localStorage.getItem("order-details") as string).addressLocation}{" "}
              {localStorage.getItem("order-details") &&
                JSON.parse(localStorage.getItem("order-details") as string).addressName}
            </span>
          ) : (
            <span className="navbar-active-order-step-text order-type-carryout">
              {localStorage.getItem("order-details") &&
                JSON.parse(localStorage.getItem("order-details") as string).store}
            </span>
          )}
        </div>
        <img src="/svg/order/arrow.svg" className="navbar-active-order-step-arrow" />
      </li>
      <li>
        <div className="navbar-active-order-step" onClick={handleNavigateToMenu}>
          <img src="/svg/order/step3.svg" className="navbar-active-order-step-img" />
          <span className="navbar-active-order-step-text">Menu</span>
        </div>
        <img src="/svg/order/arrow.svg" className="navbar-active-order-step-arrow" />
      </li>
      <li>
        {navigateToCheckoutPage ? (
          <Link to="/checkout" className="navbar-active-order-link">
            <div className="navbar-active-order-step">
              <img src="/svg/order/step4.svg" className="navbar-active-order-step-img" />
              <span className="navbar-active-order-step-text">Complete your Order</span>
            </div>
          </Link>
        ) : (
          <div className="navbar-active-order-step inactive">
            <img src="/svg/order/step4.svg" className="navbar-active-order-step-img" />
            <span className="navbar-active-order-step-text">Complete your Order</span>
          </div>
        )}
      </li>
    </ul>
  );
};

export default ActiveOrder;
