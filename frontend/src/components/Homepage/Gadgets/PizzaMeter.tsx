import { Link } from "react-router-dom";
import "./PizzaMeter.css";
import PizzaMeterComponent from "../../Pizza Meter/PizzaMeterComponent";

const PizzaMeter = () => {
  return (
    <div className="gadgets-pm">
      <span className="gadgets-pm-abs-text">PIZZA METER</span>
      <div className="gadgets-pm-flex-container">
        <PizzaMeterComponent />
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
