import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./ProductModal.css";
import { ModalContext } from "../../../context/Modal.Context";
import SinglePizzaSize from "./SinglePizzaSize";
import { products } from "../../../data/products";
import { allToppings } from "../../../data/toppings";
import Quantity from "./Quantity";
import { LoginContext } from "../../../context/LoginContext";

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
  const [showEditPizzaToppings, setShowEditPizzaToppings] = useState(false);
  const [price, setPrice] = useState(0);
  const [modifiedToppings, setModifiedToppings] = useState<string[]>([]);

  const { product } = useContext(ModalContext);
  const { loggedIn } = useContext(LoginContext);
  // if (!loggedIn) setLoggedIn(true); // only for testing <--------------------------------------------------------

  const premiumPizzaWeigh = 570;

  const name = product[0];
  const img = product[3];
  const desc = product[2];

  const toppings = desc.split(", ");

  useEffect(() => {
    setModifiedToppings(toppings);
  }, []);

  useEffect(() => {
    products.map((p) => {
      if (p.name === product[0]) {
        setSelectedProduct(p);
      }
    });
  }, [product, selectedProduct]);

  const finalPizzaProduct = {
    name: name,
    size: size,
    crust:
      selectedCrust === 0
        ? "Hand Tossed"
        : selectedCrust === 1
        ? "Italian Style"
        : selectedCrust === 2
        ? "Gluten Free"
        : selectedCrust === 3
        ? "With Philadelphia"
        : selectedCrust === 4
        ? "With Mozzarella"
        : selectedCrust === 5
        ? "With Pepperoni"
        : "",
    toppings: modifiedToppings,
    quantity: quantity,
    price: price.toFixed(2),
  };

  console.log(finalPizzaProduct);

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

  const handleChangeToppings = (topping: string, checked: boolean) => {
    if (checked) {
      if (modifiedToppings.length >= toppings.length) {
        if (size === "Medium") {
          setPrice((price) => price + 1.5 * quantity);
        }
        if (size === "Large") {
          setPrice((price) => price + 2 * quantity);
        }
        if (size === "Jumbo") {
          setPrice((price) => price + 2.5 * quantity);
        }
      }
    } else {
      if (modifiedToppings.length > toppings.length) {
        if (size === "Medium") {
          setPrice((price) => price - 1.5 * quantity);
        }
        if (size === "Large") {
          setPrice((price) => price - 2 * quantity);
        }
        if (size === "Jumbo") {
          setPrice((price) => price - 2.5 * quantity);
        }
      }
    }

    const newToppings = [...modifiedToppings];
    const toppingIndex = newToppings.indexOf(topping);

    if (toppingIndex === -1) {
      newToppings.push(topping);
    } else {
      newToppings.splice(toppingIndex, 1);

      if (!topping.includes("Extra")) {
        const extraToppingIndex = newToppings.findIndex((t) => t.includes("Extra") && t.includes(topping));
        if (extraToppingIndex !== -1) {
          newToppings.splice(extraToppingIndex, 1);
        }
      }
    }

    setModifiedToppings(newToppings);
  };

  const handleDefault = () => {
    setModifiedToppings(toppings);
    if (size === "Medium") {
      if (selectedCrust === 2) {
        setPrice((Number(selectedProduct.price[0].medium) + 3.1) * quantity);
      } else {
        setPrice(Number(selectedProduct.price[0].medium) * quantity);
      }
    }
    if (size === "Large") {
      if (selectedCrust === 3 || selectedCrust === 4 || selectedCrust === 5) {
        setPrice((Number(selectedProduct.price[1].large) + 2.5) * quantity);
      } else {
        setPrice(Number(selectedProduct.price[1].large) * quantity);
      }
    }
    if (size === "Jumbo") {
      setPrice(Number(selectedProduct.price[2].jumbo) * quantity);
    }
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

          <div className="pm-options-container">
            {/* for premium pizzas */}
            {selectedProduct.name === "Pulled Beef" ||
            selectedProduct.name === "Pizza Milano" ||
            selectedProduct.name === "Pizza Parma" ? (
              <div
                onLoad={() => {
                  setWeigh(premiumPizzaWeigh);
                  setSize("Large");
                }}
                className={`pm-options ${size === "Large" ? "active-option" : ""}`}
                onClick={() => handlePizzaSize("Large")}
              >
                <img src="/svg/menu/pizzaOptions/large.svg" />
                <p>Large</p>
              </div>
            ) : (
              <>
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
              </>
            )}
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
              ? !selectedProduct.price[0].large
                ? productOptions.large.map((crust, index) => (
                    <div key={uuid()} onClick={() => setWeigh(crust.weigh)}>
                      <SinglePizzaSize
                        crust={crust}
                        isSelected={selectedCrust === index}
                        handleSelectedCrust={() => handleSelectedCrust(index)}
                      />
                    </div>
                  ))
                : // for promo pizzas where they don't have size other than large and base crust
                  productOptions.large
                    .filter((crust) => crust.weigh === 570)
                    .map((crust, index) => (
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
              <div className="pm-toppings-btn">
                <p className="edit-toppings-text">TOPPINGS</p>
                {loggedIn && (
                  <div className="logged-topping-container">
                    <div className="toppings-default" onClick={handleDefault}>
                      DEFAULT
                    </div>
                    <div
                      className="edit-toppings-container"
                      onClick={() => {
                        setShowEditPizzaToppings(!showEditPizzaToppings);
                      }}
                    >
                      <span
                        className="edit-toppings-btn"
                        onClick={() => setModifiedToppings(modifiedToppings.length > 0 ? modifiedToppings : toppings)}
                      >
                        <img src="/svg/menu/pizzaOptions/edit.svg" className="edit-toppings-img" />
                        <p>CUSTOMIZE</p>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <p>{modifiedToppings.length > 0 ? modifiedToppings.join(", ") : desc.split("")}</p>
            </div>

            <div className="pm-order-container">
              <Quantity
                quantity={quantity}
                selectedProduct={selectedProduct}
                setQuantity={setQuantity}
                size={size}
                selectedCrust={selectedCrust}
                weigh={weigh}
                price={price}
                setPrice={setPrice}
                toppings={toppings}
                modifiedToppings={modifiedToppings}
              />
            </div>
          </div>
        </div>
      </div>

      {showEditPizzaToppings && (
        <div className="toppings-container">
          {allToppings.map((topping) => (
            <div key={uuid()} className="all-toppings">
              <h3 className="topping-name">{topping.name}</h3>
              {topping.toppings.map((t, i) => (
                <div key={uuid()} className="topping">
                  <input
                    type="checkbox"
                    id={`${uuid()}`}
                    checked={modifiedToppings.includes(t)}
                    onChange={(e) => {
                      handleChangeToppings(t, e.target.checked);
                    }}
                  />
                  <label htmlFor={`${uuid()}`}>{t}</label>
                  {modifiedToppings.includes(t) && (
                    <div className="additional-topping">
                      <input
                        type="checkbox"
                        id={`${i}-additional ${uuid()}`}
                        checked={modifiedToppings.includes(`Extra ${t}`)}
                        onChange={(e) => handleChangeToppings(`Extra ${t}`, e.target.checked)}
                      />
                      <label htmlFor={`${i}-additional ${uuid()}`}>Extra {t}</label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductModal;
