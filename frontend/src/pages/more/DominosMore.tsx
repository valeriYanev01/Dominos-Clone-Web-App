import React from "react";
import "./DominosMore.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const DominosMore: React.FC = () => {
  return (
    <div className="dominos-more">
      <Navbar page="dominos-more" />
      <div className="dm-bg-container">
        <div className="dm-content-container">
          <div className="dm-content">
            <img src="/images/dominos_more.png" className="dm-logo" />
            <span className="dm-header-text">EVERY ORDER COUNTS!</span>
            <div className="dm-main-text">
              NOW WITH <span>DOMINO'S MORE,</span>
              <br /> YOU EARN <span>POINTS</span>
              <br /> FOR EVERY PIZZA ORDER
              <br /> THROUGH <span>DOMINO’S.BG</span> OR <span>DOMINO’S APP.</span>
            </div>

            <div>
              <div className="dm-deal-text">
                <span className="dm-deal-text-desc">
                  FOR EVERY <br />
                  PIZZA
                  <br /> ORDER
                </span>
                <span>=</span>
                <div className="dm-deal-container">
                  <p className="dm-deal-text-number">10</p>
                  <p>POINTS</p>
                </div>
              </div>

              <div className="dm-deal-text">
                <div className="dm-deal-container">
                  <p className="dm-deal-text-number">60</p>
                  <p>POINTS</p>
                </div>
                <span>=</span>
                <span className="dm-deal-text-desc">
                  ONE <br />
                  PIZZA
                  <br /> FOR FREE
                </span>
              </div>
            </div>

            <div className="dm-deal-disclaimer">
              ALL YOU NEED,
              <br />
              IS TO HAVE <span>AN ACCOUNT</span>
              <br />
              AT DOMINO’S!
            </div>

            <div className="dm-btn dm-login">LOGIN</div>
            <div className="dm-btn dm-register">REGISTER</div>

            <Link to="/" className="dm-terms">
              PROGRAM TERMS
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DominosMore;
