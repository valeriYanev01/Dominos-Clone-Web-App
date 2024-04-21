import "./SingleDeal.css";
import { DealInfo } from "../../../types/Home";
import React, { useContext } from "react";
import { ModalContext } from "../../../context/ModalContext";
import { LoginContext } from "../../../context/LoginContext";

const SingleDeal: React.FC<DealInfo> = ({ headerImg, heading, desc, method, deal }) => {
  const { setModalType, setOpenModal } = useContext(ModalContext);
  const { loggedIn } = useContext(LoginContext);

  const handleShowModal = (type: "delivery" | "carryOut") => {
    setOpenModal(true);
    if (loggedIn) {
      type === "delivery" && setModalType("delivery");
      type === "carryOut" && setModalType("carryOut");
    } else {
      setModalType("login");
    }
  };

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
        <div className="deal-method" onClick={() => handleShowModal("delivery")}>
          {method.delivery ? (
            <>
              <img src="/svg/delivery.svg" className="deal-delivery-svg" />
              <p className="deal-method-type">{method.delivery}</p>
            </>
          ) : null}
        </div>
        <div className="deal-method" onClick={() => handleShowModal("carryOut")}>
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
