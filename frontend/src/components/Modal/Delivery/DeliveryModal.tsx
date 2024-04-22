import React from "react";
import "./DeliveryModal.css";

const DeliveryModal: React.FC = () => {
  return (
    <div className="delivery-modal">
      <div className="dm-heading">
        <img src="/svg/decorLeftRed.svg" className="deal-decor" />
        <p>SELECT ADDRESS & DELIVERY TIME</p>
        <img src="/svg/decorRightRed.svg" className="deal-decor" />
      </div>

      <div className="dm-adress-container">
        <p>Recently Selected</p>
        <div>
          <img />

          <p>adress name</p>
          <div>
            <img />
            <p>adress</p>
          </div>
          <div>
            <img />
            <p>Your Store: store</p>
          </div>

          <img />
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;
