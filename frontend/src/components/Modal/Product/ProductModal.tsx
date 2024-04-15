import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./ProductModal.css";
import { ModalContext } from "../../../context/Modal.Context";
import SinglePizzaSize from "./SinglePizzaSize";
import { products } from "../../../data/products";
import Quantity from "./Quantity";

interface Product {
  type: string;
  name: string;
  desc: string;
  img: string;
  bigImg?: string;
  filter: string[];
  price: {
    medium?: number;
    large?: number;
    jumbo?: number;
  }[];
}

const ProductModal: React.FC = () => {
  const [size, setSize] = useState("Medium");
  // const [isFavorite, setIsFavorite] = useState(false);
  // const [favPizzaName, setFavPizzaName] = useState("");
  const [selectedCrust, setSelectedCrust] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    type: "",
    name: "",
    desc: "",
    img: "",
    bigImg: "",
    filter: [],
    price: [{ medium: 0 }, { large: 0 }, { jumbo: 0 }],
  });
  const [weigh, setWeigh] = useState<number>(385);

  const { product } = useContext(ModalContext);

  useEffect(() => {
    products.map((p) => {
      if (p.name === product[0]) {
        setSelectedProduct(p);
      }
    });
  }, [product]);

  const name = product[0];
  const img = product[3];
  const desc = product[2];

  const handTossed = {
    title: `Hand Tossed | ∅ ${size === "Medium" ? "25" : size === "Large" ? "30" : size === "Jumbo" ? "38" : ""}cm`,
    desc: "Our Traditional dough",
    img: "/images/menu/pizzaOptions/hand-tossed.png",
    weigh: size === "Medium" ? 385 : size === "Large" ? 570 : size === "Jumbo" ? 800 : 0,
  };

  const italianStyle = {
    title: `Italian Style | ∅ ${size === "Medium" ? "25" : size === "Large" ? "30" : size === "Jumbo" ? "38" : ""}cm`,
    desc: "Thin Italian Style dough",
    img: "/images/menu/pizzaOptions/italian.png",
    weigh: size === "Medium" ? 250 : size === "Large" ? 425 : size === "Jumbo" ? 700 : 0,
  };

  const glutenFree = {
    title: "Medium Gluten Free",
    desc: "Gluten Free Dough (+ 3,10BGN)",
    img: "/images/menu/pizzaOptions/hand-tossed.png",
    weigh: size === "Medium" ? 350 : size === "Large" ? 0 : size === "Jumbo" ? 0 : 0,
  };

  const thinCrust = {
    title: "Thin Crust | ∅ 30cm",
    desc: "Thin & Crispy dough",
    img: "/images/menu/pizzaOptions/thin.png",
    weigh: size === "Medium" ? 0 : size === "Large" ? 390 : size === "Jumbo" ? 0 : 0,
  };

  const philadelphia = {
    title: "With Philadelphia (+2.50BGN)",
    desc: "Fresh dough stuffed with Philadelphia cream cheese (+2,50BGN)",
    img: "/images/menu/pizzaOptions/philadelphia.png",
    weigh: size === "Medium" ? 0 : size === "Large" ? 630 : size === "Jumbo" ? 0 : 0,
  };

  const mozzarella = {
    title: "With mozzarella (+2,50 BGN)",
    desc: "Hand-tossed dough with mozzarella stuffed crust (+2,50 BGN)",
    img: "/images/menu/pizzaOptions/mozzarella.png",
    weigh: size === "Medium" ? 0 : size === "Large" ? 630 : size === "Jumbo" ? 0 : 0,
  };

  const pepperoni = {
    title: "With pepperoni (+2,50 BGN)",
    desc: "Hand-tossed dough with pepperoni stuffed crust (+2,50 BGN)",
    img: "/images/menu/pizzaOptions/pepperoni.png",
    weigh: size === "Medium" ? 0 : size === "Large" ? 630 : size === "Jumbo" ? 0 : 0,
  };

  const productOptions = {
    medium: [handTossed, italianStyle, glutenFree],
    large: [handTossed, italianStyle, thinCrust, philadelphia, mozzarella, pepperoni],
    jumbo: [handTossed, italianStyle],
  };

  const handlePizzaSize = (size: string) => {
    setSize(size);
    setQuantity(1);
    setSelectedCrust(0);
    setWeigh(size === "Medium" ? 385 : size === "Large" ? 570 : size === "Jumbo" ? 800 : 0);
  };

  const handleSelectedCrust = (index: number) => {
    setSelectedCrust(index);
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
            <div
              className={`pm-options ${size === "Medium" ? "active-option" : ""}`}
              onClick={() => handlePizzaSize("Medium")}
            >
              <img src="/svg/menu/pizzaOptions/medium.svg" />
              <p>Medium</p>
            </div>

            <div
              className={`pm-options ${size === "Large" ? "active-option" : ""}`}
              onClick={() => handlePizzaSize("Large")}
            >
              <img src="/svg/menu/pizzaOptions/large.svg" />
              <p>Large</p>
            </div>

            <div
              className={`pm-options ${size === "Jumbo" ? "active-option" : ""}`}
              onClick={() => handlePizzaSize("Jumbo")}
            >
              <img src="/svg/menu/pizzaOptions/jumbo.svg" />
              <p>Jumbo</p>
            </div>
          </div>

          <div className="pm-pizza-crust-container">
            {size === "Medium"
              ? productOptions.medium.map((crust, index) => (
                  <div key={uuid()} onClick={() => setWeigh(crust.weigh)}>
                    <SinglePizzaSize
                      crust={crust}
                      isSelected={selectedCrust === index}
                      handleSelectedCrust={() => handleSelectedCrust(index)}
                    />
                  </div>
                ))
              : size === "Large"
              ? productOptions.large.map((crust, index) => (
                  <div key={uuid()} onClick={() => setWeigh(crust.weigh)}>
                    <SinglePizzaSize
                      crust={crust}
                      isSelected={selectedCrust === index}
                      handleSelectedCrust={() => handleSelectedCrust(index)}
                    />
                  </div>
                ))
              : size === "Jumbo"
              ? productOptions.jumbo.map((crust, index) => (
                  <div key={uuid()} onClick={() => setWeigh(crust.weigh)}>
                    <SinglePizzaSize
                      crust={crust}
                      isSelected={selectedCrust === index}
                      handleSelectedCrust={() => handleSelectedCrust(index)}
                    />
                  </div>
                ))
              : ""}
          </div>

          <div className="pm-desc-container">
            <div className="pm-desc">
              <p>TOPPINGS</p>
              <p>{desc}</p>
            </div>

            <div className="pm-order-container">
              <Quantity
                quantity={quantity}
                selectedProduct={selectedProduct}
                setQuantity={setQuantity}
                size={size}
                selectedCrust={selectedCrust}
                weigh={weigh}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
