import React from "react";

type Product = {
  product: {
    type: string;
    name: string;
    desc: string;
    img: string;
    filter: string[];
  };
};

const Vegetarian: React.FC<Product> = ({ product }) => {
  return (
    <div key={product.name}>
      <div className="menu-spc-title-container">
        <p className="menu-spc-title">{product.name}</p>
      </div>
      <img src={product.img} className={`menu-spc-img ${product.type === "drinks" ? "menu-spc-drinks-img" : ""}`} />
      <p className={`menu-spc-desc ${product.type === "drinks" ? "menu-spc-drinks-desc" : ""}`}>{product.desc}</p>
      {product.filter[0] !== "" ? (
        <div className="menu-spc-filter" key={product.img}>
          {product.filter.map((f, i) =>
            f === "Vegetarian" ? (
              <img src="/svg/menu/filterVegetarian.svg" className="menu-filter-svg" key={i} />
            ) : f === "Spicy" ? (
              <img src="/svg/menu/filterSpicy.svg" className="menu-filter-svg" key={i} />
            ) : f === "New" ? (
              <img src="/svg/menu/filterNew.svg" className="menu-filter-svg" key={i} />
            ) : f === "Fasting" ? (
              <img src="/svg/menu/filterFasting.svg" className="menu-filter-svg" key={i} />
            ) : f === "Premium" ? (
              <img src="/svg/menu/filterPremium.svg" className="menu-filter-svg" key={i} />
            ) : (
              ""
            )
          )}
        </div>
      ) : (
        <div className="menu-spc-filter">
          <span></span>
        </div>
      )}
      <button className="menu-spc-btn">CHOOSE</button>
    </div>
  );
};

export default Vegetarian;
