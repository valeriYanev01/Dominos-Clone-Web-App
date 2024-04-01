import "./SingleDeal.css";
import { DealInfo } from "../../../types/Home";
import React from "react";

const SingleDeal: React.FC<DealInfo> = ({ headerImg, heading, desc, method, deal }) => {
  return (
    <div className="single-deal-container">
      <img src={headerImg} className="deal-header-img" />
      {deal && <img src="/svg/homepage/deal.svg" className="deal-svg" />}
      <p className="deal-heading">{heading}</p>
      <div className="single-deal-breakline" />
      <p className="deal-desc">{desc}</p>
      <div className="deal-btn-container">
        <button className="deal-btn">GET THIS DEAL</button>
      </div>
      <div
        className={`${
          method.carryOut && method.delivery ? "deal-method-container-space-around" : "deal-method-container "
        }`}
      >
        <div className="deal-method">
          {method.delivery ? (
            <>
              <img src="/svg/delivery.svg" className="deal-delivery-svg" />
              <p className="deal-method-type">{method.delivery}</p>
            </>
          ) : null}
        </div>
        <div className="deal-method">
          {method.carryOut ? (
            <>
              <img src="/svg/carryOut.svg" className="deal-delivery-svg" />
              <p className="deal-method-type">{method.carryOut}</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SingleDeal;
