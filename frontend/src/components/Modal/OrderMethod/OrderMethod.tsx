import React, { useContext } from "react";
import "./OrderMethod.css";
import { ModalContext } from "../../../context/ModalContext";

const OrderMethod: React.FC = () => {
  const { setModalType } = useContext(ModalContext);

  return (
    <div className="order-modal">
      <div className="om-heading">
        <img src="/svg/decorLeftRed.svg" className="deal-decor" />
        <p>CHOOSE YOUR ORDER METHOD</p>
        <img src="/svg/decorRightRed.svg" className="deal-decor" />
      </div>

      <div className="om-methods-container">
        <div className="om-method" onClick={() => setModalType("delivery")}>
          <img src="/svg/delivery.svg" />
          <p>DELIVERY</p>
        </div>
        <div className="om-method" onClick={() => setModalType("carryOut")}>
          <img src="/svg/carryOut.svg" />
          <p>CARRY OUT</p>
        </div>
      </div>
    </div>
  );
};

export default OrderMethod;
