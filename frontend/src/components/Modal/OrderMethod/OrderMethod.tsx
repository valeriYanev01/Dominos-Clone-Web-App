import React, { useContext } from "react";
import "./OrderMethod.css";
import { ModalContext } from "../../../context/ModalContext";
import Heading from "../../Heading/Heading";

const OrderMethod: React.FC = () => {
  const { setModalType } = useContext(ModalContext);

  return (
    <div className="order-modal">
      <Heading text="CHOOSE YOUR ORDER METHOD" />

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
