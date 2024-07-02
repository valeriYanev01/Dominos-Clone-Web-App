import { Link } from "react-router-dom";
import "./PizzaMeter.css";
import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";

const PizzaMeter = () => {
  const { dominosMorePoints } = useContext(LoginContext);

  return (
    <div className="gadgets-pm">
      <span className="gadgets-pm-abs-text">PIZZA METER</span>
      <div className="gadgets-pm-flex-container">
        <div className="gadgets-pan-container">
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
            className="gadgets-pan"
          />
        </div>
        <div className="gadgets-dominos-more-container">
          <img src="/images/dominos_more.png" className="gadgets-dominos-more" />
          <p className="gadgets-dominos-more-text">Join now and get closer to a free pizza!</p>
        </div>
      </div>
      <div className="gadgets-pm-btn-container">
        <Link to="" className="gadgets-pm-btn">
          ACTIVATE
        </Link>
      </div>
    </div>
  );
};

export default PizzaMeter;
