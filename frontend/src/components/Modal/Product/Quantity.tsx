import React, { useContext, useEffect } from "react";
import "./Quantity.css";
import { ModalContext } from "../../../context/Modal.Context";
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

interface Props {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  size: string;
  selectedProduct: Product;
  selectedCrust: number;
  weigh: number;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  toppings: string[];
  modifiedToppings: string[];
}

const Quantity: React.FC<Props> = ({
  quantity,
  setQuantity,
  selectedProduct,
  size,
  selectedCrust,
  weigh,
  price,
  setPrice,
  toppings,
  modifiedToppings,
}) => {
  const { setModalType } = useContext(ModalContext);
  const { loggedIn } = useContext(LoginContext);

  useEffect(() => {
    // for pizzas
    if (selectedProduct.type === "pizza") {
      if (selectedProduct.price[0].medium && selectedProduct.price[1].large && selectedProduct.price[2].jumbo) {
        if (size === "Medium") {
          if (selectedCrust === 2) {
            setPrice(
              (selectedProduct.price[0].medium + (modifiedToppings.length * 1.5 - toppings.length * 1.5) + 3.1) *
                quantity
            );
          } else {
            setPrice(
              (selectedProduct.price[0].medium + (modifiedToppings.length * 1.5 - toppings.length * 1.5)) * quantity
            );
          }
        }
        if (size === "Large") {
          if (selectedCrust === 3 || selectedCrust === 4 || selectedCrust === 5) {
            setPrice(
              (selectedProduct.price[1].large + (modifiedToppings.length * 2 - toppings.length * 2) + 2.5) * quantity
            );
          } else {
            setPrice((selectedProduct.price[1].large + (modifiedToppings.length * 2 - toppings.length * 2)) * quantity);
          }
        }

        if (size === "Jumbo") {
          setPrice(
            (selectedProduct.price[2].jumbo + (modifiedToppings.length * 2.5 - toppings.length * 2.5)) * quantity
          );
        }
      }

      if (selectedProduct.price[0].large) {
        setPrice((selectedProduct.price[0].large + (modifiedToppings.length * 2 - toppings.length * 2)) * quantity);
      }

      if (selectedProduct.price[0].medium) {
        setPrice((selectedProduct.price[0].medium + (modifiedToppings.length * 1.5 - toppings.length * 2)) * quantity);
      }
    }

    //for pastas
  }, [quantity, selectedCrust, size, selectedProduct.price]);

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
    }
  };

  return (
    <div className="pm-qty-weigh-container">
      <p>QUANTITY</p>
      <div className="pm-qty-weigh">
        <div className="pm-quantity-control">
          <p className="pm-quantity-decrease" onClick={handleDecrease}>
            &minus;
          </p>
          <p className="pm-quantity-text">{quantity}</p>
          <p className="pm-quantity-increase" onClick={handleIncrease}>
            +
          </p>
        </div>
        <div className="weight-container">
          <img src="/svg/weight.svg" className="weight-img" />
          <p className="pm-weight-text">{weigh} g</p>
        </div>
      </div>
      <div className="pm-order-btn-container" onClick={handleAddToBasket}>
        <img src="/svg/basket.svg" className="pm-order-img" />
        {/* for the special pizzas with only one size and only one crust */}
        {selectedProduct.price[0].large ? (
          price.toFixed(2)
        ) : selectedProduct.price[0].medium ? (
          <div className="pm-add-btn">{price.toFixed(2)}</div>
        ) : (
          // {/* for the regular pizzas */}
          selectedProduct.price[0].medium &&
          selectedProduct.price[1].large &&
          selectedProduct.price[2].jumbo && <div className="pm-add-btn">{price.toFixed(2)}</div>
        )}
      </div>
    </div>
  );
};

export default Quantity;
