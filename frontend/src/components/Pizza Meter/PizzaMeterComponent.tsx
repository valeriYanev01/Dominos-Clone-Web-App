import React, { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import "./PizzaMeterComponent.css";

const PizzaMeterComponent: React.FC = () => {
  const { dominosMorePoints } = useContext(LoginContext);

  return (
    <div className="pizza-meter-container">
      <img
        src={`${
          dominosMorePoints === 0
            ? "/images/dominos_more_pan.png"
            : dominosMorePoints === 1
            ? "/images/dominos_more_pan_1.png"
            : dominosMorePoints === 2
            ? "/images/dominos_more_pan_2.png"
            : dominosMorePoints === 3
            ? "/images/dominos_more_pan_3.png"
            : dominosMorePoints === 4
            ? "/images/dominos_more_pan_4.png"
            : dominosMorePoints === 5
            ? "/images/dominos_more_pan_5.png"
            : dominosMorePoints === 6
            ? "/images/dominos_more_pan_6.png"
            : ""
        }`}
        className="pizza-meter"
      />
    </div>
  );
};

export default PizzaMeterComponent;
