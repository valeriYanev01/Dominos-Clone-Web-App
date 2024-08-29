import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import "./PizzaMeterComponent.css";
import { useLocation } from "react-router-dom";
import { MobileContext } from "../../context/MobileContext";

const PizzaMeterComponent: React.FC = () => {
  const [inDominosMorePage, setInDominosMorePage] = useState(false);

  const { dominosMorePoints } = useContext(LoginContext);
  const { isMobile } = useContext(MobileContext);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("dominos-more")) {
      setInDominosMorePage(true);
    }
  }, [location.pathname]);

  return (
    <div className="pizza-meter-container" style={inDominosMorePage ? { border: "none" } : {}}>
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
        style={
          inDominosMorePage && !isMobile ? { width: "20rem" } : inDominosMorePage && isMobile ? { width: "12rem" } : {}
        }
      />
    </div>
  );
};

export default PizzaMeterComponent;
