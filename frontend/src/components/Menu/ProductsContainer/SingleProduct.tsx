import React, { useContext, useEffect } from "react";
import { ModalContext } from "../../../context/ModalContext";

type Product = {
  product: {
    type: string;
    name: string;
    desc: string;
    img: string;
    bigImg?: string;
    filter: string[];
  };
};

const SingleProduct: React.FC<Product> = ({ product }) => {
  const { setModalType, setOpenModal, setProduct, product: productType } = useContext(ModalContext);

  useEffect(() => {
    setOpenModal(
      productType[4] === "pizza" ||
        productType[4] === "pasta" ||
        productType[4] === "salad" ||
        productType[4] === "sandwich"
        ? true
        : false
    );
  }, [productType]);

  return (
    <div
      key={product.name}
      onClick={() => {
        setModalType("product");
        setProduct([product.name, product.img, product.desc, product.bigImg || "", product.type]);
      }}
    >
      <div className="menu-spc-title-container">
        <p className="menu-spc-title">{product.name}</p>
      </div>
      <img src={product.img} className={`menu-spc-img ${product.type === "drinks" ? "menu-spc-drinks-img" : ""}`} />
      <div>
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
            {/* to match the height for all items without filters */}
            <span></span>
          </div>
        )}
        <button className="menu-spc-btn">CHOOSE</button>
      </div>
    </div>
  );
};

export default SingleProduct;
