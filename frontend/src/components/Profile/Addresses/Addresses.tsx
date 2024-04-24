import React from "react";
import "./Addresses.css";

const Addresses: React.FC = () => {
  return (
    <div className="profile-addresses">
      <div className="pas-heading">
        <img src="/svg/decorLeftRed.svg" className="deal-decor" />
        <p>MODIFY YOUR DETAILS, ADD OR DELETE AN ADDRESS</p>
        <img src="/svg/decorRightRed.svg" className="deal-decor" />
      </div>

      <div className="pas-body">
        <div>kvartiri</div>
        <div>settings</div>
        <div>save</div>
      </div>
    </div>
  );
};

export default Addresses;
