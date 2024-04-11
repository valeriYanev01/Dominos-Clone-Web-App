import React, { useContext, useState } from "react";
import "./ProductModal.css";
import { ModalContext } from "../../../context/Modal.Context";

const ProductModal: React.FC = () => {
  const [size, setSize] = useState("Medium");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favPizzaName, setFavPizzaName] = useState("");

  const { product } = useContext(ModalContext);

  const name = product[0];
  const img = product[3];
  const desc = product[2];

  const handTossed = {
    title: `Hand Tossed | ∅ ${size === "Medium" ? "25" : size === "Large" ? "30" : size === "Jumbo" ? "38" : ""}cm`,
    desc: "Our Traditional dough",
    img: "/images/menu/pizzaOptions/hand-tossed.png",
  };

  const italianStyle = {
    title: `Italian Style | ∅ ${size === "Medium" ? "25" : size === "Large" ? "30" : size === "Jumbo" ? "38" : ""}cm`,
    desc: "Thin Italian Style dough",
    img: "/images/menu/pizzaOptions/italian.png",
  };

  const glutenFree = {
    title: "Medium Gluten Free",
    desc: "Gluten Free Dough (+ 3,10BGN)",
    img: "/images/menu/pizzaOptions/hand-tossed.png",
  };

  const thinCrust = {
    title: "Thin Crust | ∅ 30cm",
    desc: "Thin & Crispy dough",
    img: "/images/menu/pizzaOptions/thin.png",
  };

  const philadelphia = {
    title: "With Philadelphia (+2.50BGN)",
    desc: "Fresh dough stuffed with Philadelphia cream cheese (+2,50BGN)",
    img: "/images/menu/pizzaOptions/philadelphia.png",
  };

  const mozzarella = {
    title: "With mozzarella (+2,50 BGN)",
    desc: "Hand-tossed dough with mozzarella stuffed crust (+2,50 BGN)",
    img: "/images/menu/pizzaOptions/mozzarella.png",
  };

  const pepperoni = {
    title: "With pepperoni (+2,50 BGN)",
    desc: "Hand-tossed dough with pepperoni stuffed crust (+2,50 BGN)",
    img: "/images/menu/pizzaOptions/pepperoni.png",
  };

  const productOptions = {
    medium: {
      handTossed: { ...handTossed, weight: 385 },
      italianStyle: { ...italianStyle, weight: 250 },
      glutenFree,
    },
    large: {
      handTossed: { ...handTossed, weight: 570 },
      italianStyle: { ...italianStyle, weight: 425 },
      thinCrust: { ...thinCrust, weight: 390 },
      philadelphia: { ...philadelphia, weight: 630 },
      mozzarella,
      pepperoni,
    },
    jumbo: {
      handTossed: { ...handTossed, weight: 800 },
      italianStyle: { ...italianStyle, weight: 700 },
    },
  };

  return (
    <div className="product-modal-container">
      <div className="pm-heading-container">
        <div className="pm-heading-image">
          <img src={img} />
        </div>

        <div className="pm-info-container">
          <div className="pm-name-container">
            <img src="/svg/decorLeftRed.svg" className="deal-decor" />
            <p>{name}</p>
            <img src="/svg/decorRightRed.svg" className="deal-decor" />
          </div>

          <div>
            <img />
            <span>ADD TO FAVORITES</span>
          </div>

          <div className="pm-options-container">
            <div className={`pm-options ${size === "Medium" ? "active-option" : ""}`} onClick={() => setSize("Medium")}>
              <img src="/svg/menu/pizzaOptions/medium.svg" />
              <p>Medium</p>
            </div>

            <div className={`pm-options ${size === "Large" ? "active-option" : ""}`} onClick={() => setSize("Large")}>
              <img src="/svg/menu/pizzaOptions/large.svg" />
              <p>Large</p>
            </div>

            <div className={`pm-options ${size === "Jumbo" ? "active-option" : ""}`} onClick={() => setSize("Jumbo")}>
              <img src="/svg/menu/pizzaOptions/jumbo.svg" />
              <p>Jumbo</p>
            </div>
          </div>

          {size === "Medium" ? <div className="pizza">
            
          </div> : ""}

          <div className="pm-desc-container">
            <div className="pm-desc">
              <p>TOPPINGS</p>
              <p>{desc}</p>
            </div>

            <div className="pm-order-container">
              <div className="pm-qty-weigh">
                <p>QUANTITY</p>
                <div>
                  <img />
                  <p>1</p>
                  <img />
                </div>

                <img />
              </div>

              <div className="pm-order-btn-container">
                <img />
                <p className="pm-order-btn">price</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
