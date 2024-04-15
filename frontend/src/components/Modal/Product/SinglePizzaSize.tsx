import React from "react";
import "./SinglePizzaSize.css";

type Crust = {
  title: string;
  desc: string;
  img: string;
};

interface Props {
  crust: Crust;
  isSelected: boolean;
  handleSelectedCrust: () => void;
}

const SinglePizzaSize: React.FC<Props> = ({ crust, isSelected, handleSelectedCrust }) => {
  return (
    <ul className="pm-pizza-crust" key={crust.img} onClick={handleSelectedCrust}>
      <div className="pm-pizza-crust-info">
        <li>
          <img src={crust.img} className="pm-pizza-crust-img" />
        </li>
        <div className="pm-pizza-crust-text">
          <li className="pm-pizza-crust-title">{crust.title}</li>
          <li className="pm-pizza-crust-desc">{crust.desc}</li>
        </div>
      </div>
      <li className="pm-pizza-crust-select-container">
        <div className={`pm-pizza-crust-select ${isSelected ? "active-crust" : ""}`}></div>
      </li>
    </ul>
  );
};

export default SinglePizzaSize;
