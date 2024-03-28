import "./SliderInformation.css";
import { SliderInfo } from "../../../types/Home";
import React from "react";

const SliderInformation: React.FC<SliderInfo> = ({ caption, valid, desc }) => {
  return (
    <div className="deal-container">
      <div className="second-layer">
        <h2 className="deal-caption">{caption}</h2>
        <h3 className="deal-valid">{valid}</h3>
        <p className="deal-desc">{desc}</p>
      </div>
    </div>
  );
};

export default SliderInformation;
