import React, { useContext } from "react";
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
}

const Quantity: React.FC<Props> = ({ quantity, setQuantity, selectedProduct, size, selectedCrust, weigh }) => {
  const { setModalType } = useContext(ModalContext);
  const { loggedIn } = useContext(LoginContext);

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
        {selectedProduct.price[0].medium && selectedProduct.price[1].large && selectedProduct.price[2].jumbo && (
          <div className="pm-add-btn">
            {size === "Medium"
              ? (selectedCrust === 2
                  ? (selectedProduct?.price[0].medium + 3.1) * quantity
                  : selectedProduct?.price[0].medium * quantity
                ).toFixed(2)
              : size === "Large"
              ? (selectedCrust === 3 || selectedCrust === 4 || selectedCrust === 5
                  ? (selectedProduct.price[1].large + 2.5) * quantity
                  : selectedProduct.price[1].large * quantity
                ).toFixed(2)
              : size === "Jumbo"
              ? (selectedProduct.price[2].jumbo * quantity).toFixed(2)
              : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quantity;
