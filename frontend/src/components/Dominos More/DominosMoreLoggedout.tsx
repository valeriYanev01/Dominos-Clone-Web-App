import React, { useContext } from "react";
import "./DominosMoreLoggedout.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { ModalContext } from "../../context/ModalContext";

const DominosMoreLoggedin: React.FC = () => {
  const { setModalType, setOpenModal } = useContext(ModalContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    setOpenModal(true);
    setModalType("login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="dominos-more-out">
      <Navbar page="dominos-more-out" />
      <div className="dm-bg-container-out">
        <div className="dm-content-container-out">
          <div className="dm-content-out">
            <img src="/images/dominos_more.png" className="dm-logo-out" />
            <span className="dm-header-text-out">EVERY ORDER COUNTS!</span>
            <div className="dm-main-text-out">
              NOW WITH <span>DOMINO'S MORE,</span>
              <br /> YOU EARN <span>POINTS</span>
              <br /> FOR EVERY PIZZA ORDER
              <br /> THROUGH <span>DOMINO’S.BG</span> OR <span>DOMINO’S APP.</span>
            </div>

            <div>
              <div className="dm-deal-text-out">
                <span className="dm-deal-text-desc-out">
                  FOR EVERY <br />
                  PIZZA
                  <br /> ORDER
                </span>
                <span>=</span>
                <div className="dm-deal-container-out">
                  <p className="dm-deal-text-number-out">10</p>
                  <p>POINTS</p>
                </div>
              </div>

              <div className="dm-deal-text-out">
                <div className="dm-deal-container-out">
                  <p className="dm-deal-text-number-out">60</p>
                  <p>POINTS</p>
                </div>
                <span>=</span>
                <span className="dm-deal-text-desc-out">
                  ONE <br />
                  PIZZA
                  <br /> FOR FREE
                </span>
              </div>
            </div>

            <div className="dm-deal-disclaimer-out">
              ALL YOU NEED,
              <br />
              IS TO HAVE <span>AN ACCOUNT</span>
              <br />
              AT DOMINO’S!
            </div>

            <div onClick={handleLogin} className="dm-btn-out dm-login-out">
              LOGIN
            </div>
            <div onClick={handleSignup} className="dm-btn-out dm-register-out">
              REGISTER
            </div>

            <Link to="/" className="dm-terms-out">
              PROGRAM TERMS
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DominosMoreLoggedin;
