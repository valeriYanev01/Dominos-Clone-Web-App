import { Link } from "react-router-dom";
import "./PizzaMeter.css";

const PizzaMeter = () => {
  return (
    <div className="gadgets-pm">
      <span className="gadgets-pm-abs-text">PIZZA METER</span>
      <div className="gadgets-pm-flex-container">
        <div className="gadgets-pan-container">
          <img src="/images/dominos_more_pan.png" className="gadgets-pan" />
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
