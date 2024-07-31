import React, { useContext } from "react";
import "./Basket.css";
import { BasketItem, OrderContext } from "../../../context/OrderContext";
import { Link } from "react-router-dom";
import NonDealItem from "./NonDealItem";
import DealItem from "./DealItem";
import { v4 as uuid } from "uuid";

interface Props {
  setShowBasketOnHover: React.Dispatch<React.SetStateAction<boolean>>;
}

const Basket: React.FC<Props> = ({ setShowBasketOnHover }) => {
  const { itemsInBasket, setItemsInBasket, finalPrice, dealItemsInBasket, freeDelivery, finalPriceNoDiscount } =
    useContext(OrderContext);

  const removeItemFromBasket = (item: BasketItem, i: number) => {
    const newItemsInBasket = [...itemsInBasket];
    if (item.deal) {
      newItemsInBasket.splice(i, 1);
    } else {
      newItemsInBasket.splice(i + dealItemsInBasket, 1);
    }

    setItemsInBasket(newItemsInBasket);
  };

  return (
    <div className="navigation-basket-items" onMouseEnter={() => setShowBasketOnHover(true)}>
      {itemsInBasket
        .filter((item) => item.deal)
        .map((item, i) => (
          <DealItem removeItemFromBasket={removeItemFromBasket} item={item} i={i} key={uuid()} />
        ))}

      {itemsInBasket.length > 0 &&
        itemsInBasket
          .filter((item) => !item.deal)
          .map((item, i) => <NonDealItem removeItemFromBasket={removeItemFromBasket} item={item} i={i} key={uuid()} />)}

      {freeDelivery ? (
        <p className="navigation-basket-promo-text">
          Free Delivery <span className="navigation-basket-free-delivery">1.99 Lv.</span> 0.00 Lv.
        </p>
      ) : (
        <p>Paid Delivery 1.99 BGN!!!</p>
      )}

      <div className="navigation-basket-total-price-container">
        <div>
          Total:{" "}
          <span className={`${finalPrice + 1 < finalPriceNoDiscount ? "navigation-basket-price-total-line" : ""}`}>
            {finalPriceNoDiscount.toFixed(2)}
          </span>
        </div>
        {finalPrice + 1 < finalPriceNoDiscount && (
          <>
            <p className="navigation-basket-price-discount">Total with discount: {finalPrice.toFixed(2)}</p>
            <p className="navigation-basket-price-save">You Save: {(finalPriceNoDiscount - finalPrice).toFixed(2)}</p>
          </>
        )}
        <Link to="/checkout" style={{ textDecoration: "none", marginRight: "1rem", marginTop: "1rem" }}>
          <p className="navigation-basket-btn">PROCEED</p>
        </Link>
      </div>
    </div>
  );
};

export default Basket;
