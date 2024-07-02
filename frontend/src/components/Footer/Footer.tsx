import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-links">
          <div className="footer-links-container">
            <h2>LET US HELP YOU</h2>
            <div className="footer-links-container-text">
              <Link to="">CONTACT US</Link>
              <Link to="">TERMS OF USE</Link>
            </div>
          </div>
          <div className="footer-links-container">
            <h2>USEFUL INFO</h2>
            <div className="footer-links-container-text">
              <Link to="">DEALS</Link>
              <Link to="">STORES</Link>
              <Link to="">ALLERGENS</Link>
              <Link to="">DATA PROTECTION POLICY</Link>
            </div>
          </div>
          <div className="footer-links-container">
            <h2>GET TO KNOW US</h2>
            <div className="footer-links-container-text">
              <Link to="/careers">JOB APPLICATION</Link>
            </div>
          </div>
        </div>
        <div className="contacts">
          <Link to="tel:0877843424">
            <img src="/svg/footer/number.svg" className="footer-svg number" />
          </Link>
          <Link to="https://www.facebook.com/DominosBulgaria" target="blank">
            <img src="/svg/footer/facebook.svg" className="footer-svg" />
          </Link>
          <Link to="https://twitter.com/DominosBulgaria" target="blank">
            <img src="/svg/footer/x.svg" className="footer-svg" />
          </Link>
          <Link to="https://www.instagram.com/dominos_bg/" target="blank">
            <img src="/svg/footer/instagram.svg" className="footer-svg" />
          </Link>
          <Link to="https://www.youtube.com/channel/UCUTBiIm_r68gSa1JY2tgDLg" target="blank">
            <img src="/svg/footer/youtube.svg" className="footer-svg" />
          </Link>
        </div>

        <div style={{ margin: "20px 0px 20px auto" }}>
          Built for non commercial use. All rights reserved to{" "}
          <Link to="http://dominos.com" target="blank" className="footer-dominos-link">
            Domino's Pizza
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
