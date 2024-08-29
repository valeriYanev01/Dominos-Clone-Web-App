import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { ModalContext } from "../../../context/ModalContext";
import { OrderContext } from "../../../context/OrderContext";
import "./HalfAndHalfPizzaQuantity.css";

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

interface Props {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  firstHalf: string;
  secondHalf: string;
  size: string;
  weigh: number;
  price: number;
  crust: number;
  halfAndHalfFirstSelectedProduct: Product;
  halfAndHalfSecondSelectedProduct: Product;
  firstHalfAddedToppings: string[];
  firstHalfRemovedToppings: string[];
  secondHalfRemovedToppings: string[];
  secondHalfAddedToppings: string[];
}

const HalfAndHalfPizzaQuantity: React.FC<Props> = ({
  quantity,
  setQuantity,
  weigh,
  price,
  crust,
  firstHalf,
  secondHalf,
  firstHalfAddedToppings,
  firstHalfRemovedToppings,
  secondHalfAddedToppings,
  secondHalfRemovedToppings,
  size,
}) => {
  const [pizzaCrust, setPizzaCrust] = useState("");

  const { loggedIn } = useContext(LoginContext);
  const { setOpenModal, setModalType, setProduct } = useContext(ModalContext);
  const { setItemsInBasket } = useContext(OrderContext);

  useEffect(() => {
    if (size === "Medium") {
      if (crust === 0) {
        setPizzaCrust("Hand Tossed");
      } else if (crust === 1) {
        setPizzaCrust("Italian Style");
      } else if (crust === 2) {
        setPizzaCrust("Gluten Free");
      }
    } else if (size === "Large") {
      if (crust === 0) {
        setPizzaCrust("Hand Tossed");
      } else if (crust === 1) {
        setPizzaCrust("Italian Style");
      } else if (crust === 2) {
        setPizzaCrust("Thin Crust");
      } else if (crust === 3) {
        setPizzaCrust("With Philadelphia");
      } else if (crust === 4) {
        setPizzaCrust("With Mozzarella");
      } else if (crust === 5) {
        setPizzaCrust("With Pepperoni");
      }
    } else if (size === "Jumbo") {
      if (crust === 0) {
        setPizzaCrust("Hand Tossed");
      } else if (crust === 1) {
        setPizzaCrust("Italian Style");
      }
    }
  }, [crust, size]);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToBasket = () => {
    if (loggedIn === false) {
      setModalType("login");
    } else {
      setModalType("");
      setOpenModal(false);
      setProduct([]);

      setItemsInBasket((prevItems) => {
        return [
          ...prevItems,
          {
            type: "pizza",
            name: "Half and Half",
            price: String(price),
            size: size,
            crust: pizzaCrust,
            quantity: quantity,
            firstHalf: {
              name: firstHalf,
              addedToppings: firstHalfAddedToppings,
              removedToppings: firstHalfRemovedToppings,
            },
            secondHalf: {
              name: secondHalf,
              addedToppings: secondHalfAddedToppings,
              removedToppings: secondHalfRemovedToppings,
            },
          },
        ];
      });
    }
  };

  return (
    <div className="pm-desc-container">
      <div className="pm-qty-weigh-container">
        <p>QUANTITY</p>
        <div className="pm-qty-weigh">
          <div className="navigation-basket-price-container">
            <span
              onClick={handleDecrease}
              className={`navigation-basket-quantity-control
                        ${quantity < 2 ? "navigation-basket-decrease-quantity-disabled" : ""}`}
            >
              {quantity < 2 ? (
                <img src="/svg/basket/minus-disabled.svg" className="navigation-basket-quantity-control-img" />
              ) : (
                <img src="/svg/basket/minus.svg" className="navigation-basket-quantity-control-img" />
              )}
            </span>
            <span className="navigation-basket-quantity-text">{quantity}</span>
            <span onClick={handleIncrease} className="navigation-basket-quantity-control">
              <img src="/svg/basket/plus.svg" className="navigation-basket-quantity-control-img" />
            </span>
          </div>
          <div className="weight-container">
            <img src="/svg/weight.svg" className="weight-img" />
            <p className="pm-weight-text">{weigh} g</p>
          </div>
        </div>

        <div className="pm-order-btn-container" onClick={handleAddToBasket}>
          <img src="/svg/basket.svg" className="pm-order-img" />

          {<div className="pm-add-btn">{(price * quantity).toFixed(2)}</div>}
        </div>
      </div>
    </div>
  );
};

export default HalfAndHalfPizzaQuantity;
