import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navigation-container">
      <ul className="navigation-list-container-logo">
        <li>
          <Link to="/">
            <img src="/images/logo.png" className="logo" />
          </Link>
        </li>
        <li>
          <Link className="navigation-hiring" to="/careers">
            <div className="hiring-dot" />
            We're Hiring!
          </Link>
        </li>
      </ul>

      <ul className="navigation-list-container-links">
        <li>
          <span>BG | </span>
          <span>EN</span>
        </li>
        <li>
          <Link to="/menu">MENU</Link>
        </li>
        <li>
          <Link to="/menu/deals">DEALS</Link>
        </li>
        <li>
          <Link to="/dominos-more" className="navigation-more">
            DOMINO'S MORE
          </Link>
        </li>
        <li>
          <Link to="order" className="navigation-order">
            ORDER NOW
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
