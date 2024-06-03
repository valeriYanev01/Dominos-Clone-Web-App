import React, { useContext, useEffect } from "react";
import { ModalContext } from "../../../context/ModalContext";
import { LoginContext } from "../../../context/LoginContext";
import { OrderContext } from "../../../context/OrderContext";

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

interface BasketItem {
  name: string;
  size?: string;
  crust?: string;
  toppings: string[];
  quantity: number;
  price: string;
  type: string;
}

interface Props {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  selectedProduct: Product;
  weigh: number;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  toppings: string[];
  modifiedToppings: string[];
  finalPizzaProduct: BasketItem;
}

const OtherProductsQuantity: React.FC<Props> = ({
  quantity,
  setQuantity,
  selectedProduct,
  weigh,
  price,
  setPrice,
  toppings,
  modifiedToppings,
  finalPizzaProduct,
}) => {
  const { setModalType, setOpenModal } = useContext(ModalContext);
  const { setItemsInBasket } = useContext(OrderContext);
  const { loggedIn } = useContext(LoginContext);

  useEffect(() => {
    if (selectedProduct.price[0].medium) {
      setPrice((selectedProduct.price[0].medium + (modifiedToppings.length * 1.5 - toppings.length * 1.5)) * quantity);
    }
  }, [modifiedToppings.length, quantity, selectedProduct.price, setPrice, toppings.length]);

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
      finalPizzaProduct.price = String(Number(finalPizzaProduct.price) / finalPizzaProduct.quantity);
      setItemsInBasket((prevState) => {
        return [...prevState, finalPizzaProduct];
      });
      setModalType("");
      setOpenModal(false);
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

        <div className="pm-add-btn">{price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default OtherProductsQuantity;
