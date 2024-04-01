import "./MenuDeals.css";
import { components } from "../../../data/deals";

const MenuDeals = () => {
  return (
    <div className="menu-products-container menu-deals-container">
      {components.map((deal) => (
        <div key={deal.heading} className="menu-single-product-container menu-single-deal">
          <img src={deal.headerImg} className="menu-deals-img" />
          <div className="menu-spc-title-container">
            <p className="menu-spc-title menu-deal-title">{deal.heading}</p>
          </div>
          <p className="menu-spc-desc">{deal.desc}</p>
          <button className="menu-spc-btn">CHOOSE</button>
        </div>
      ))}
    </div>
  );
};

export default MenuDeals;
