import React, { useContext } from "react";
import { BasketItem, OrderContext, SingleDeal } from "../../../context/OrderContext";
import { v4 as uuid } from "uuid";

interface Props {
  removeItemFromBasket: (item: BasketItem, index: number) => void;
  item: BasketItem;
  i: number;
}

const DealItem: React.FC<Props> = ({ removeItemFromBasket, item, i }) => {
  const { itemsInBasket, setItemsInBasket } = useContext(OrderContext);

  const increaseDealQuantity = (i: number) => {
    const products = [...itemsInBasket];

    products[i].quantity += 1;

    setItemsInBasket(products);
  };

  const decreaseDealQuantity = (i: number) => {
    const products = [...itemsInBasket];

    if (products[i].quantity > 1) {
      products[i].quantity -= 1;
    }

    setItemsInBasket(products);
  };

  return (
    <div key={uuid()} className="navigation-basket-single-item">
      <div className="navigation-basket-deal-container">
        <div className="navigation-basket-deal-heading">
          <span className="navigation-basket-deal-symbol">*</span>
          <span>{item.heading}</span>
        </div>

        <div className="navigation-basket-deal-body">
          <div className="navigation-basket-deal-desc">
            {item.deal &&
              item.deal.map((i: SingleDeal) => (
                <div key={uuid()}>
                  {i.crust ? <span>{i.crust} </span> : ""}
                  <span className="navigation-basket-deal-name">
                    {i.name} x {i.quantity}
                  </span>

                  {i.addedToppings && i.addedToppings?.length > 0 && (
                    <div className="navigation-basket-toppings">
                      <span>+ </span>
                      {i.addedToppings.join(", ")}
                    </div>
                  )}
                  {i.removedToppings && i.removedToppings?.length > 0 && (
                    <div className="navigation-basket-toppings">
                      <span>- </span>
                      {i.removedToppings.join(", ")}
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div onClick={() => removeItemFromBasket(item, i)} className="navigation-basket-remove-item-container">
            <span className="navigation-basket-remove-item">
              <img src="/svg/basket/removeItem.svg" className="navigation-basket-remove-img" />
            </span>
          </div>
        </div>

        <div className="navigation-basket-quantity-price-container">
          <div className="navigation-basket-price-container">
            <span
              onClick={() => decreaseDealQuantity(i)}
              className={`navigation-basket-quantity-control
              ${item.quantity < 2 ? "navigation-basket-decrease-quantity-disabled" : ""}`}
            >
              {item.quantity < 2 ? (
                <img src="/svg/basket/minus-disabled.svg" className="navigation-basket-quantity-control-img" />
              ) : (
                <img src="/svg/basket/minus.svg" className="navigation-basket-quantity-control-img" />
              )}
            </span>
            <span className="navigation-basket-quantity-text">{item.quantity}</span>
            <span onClick={() => increaseDealQuantity(i)} className="navigation-basket-quantity-control">
              <img src="/svg/basket/plus.svg" className="navigation-basket-quantity-control-img" />
            </span>
          </div>
          <p className="navigation-basket-single-item-price" style={{ margin: "0" }}>
            BGN {Number(parseFloat(item.price) * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DealItem;
