import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { BasketItem, OrderContext } from "../../../context/OrderContext";

interface Props {
  removeItemFromBasket: (item: BasketItem, index: number) => void;
  item: BasketItem;
  i: number;
}

const NonDealItem: React.FC<Props> = ({ removeItemFromBasket, item, i }) => {
  const { itemsInBasket, setItemsInBasket, itemsInBasketPlusDiscount, thirdPizzaPromo, dealsCount } =
    useContext(OrderContext);

  const increaseQuantity = (i: number) => {
    const products = [...itemsInBasket];
    products[i + dealsCount].quantity += 1;
    setItemsInBasket(products);
  };

  const decreaseQuantity = (i: number) => {
    const products = [...itemsInBasket];
    if (products[i + dealsCount].quantity > 1) {
      products[i + dealsCount].quantity -= 1;
    }
    setItemsInBasket(products);
  };

  return (
    <div key={uuid()} className="navigation-basket-single-item">
      <div>
        <div className="navigation-basket-desc-remove-container">
          <div className="navigation-basket-desc-container">
            <p className="navigation-basket-product-name">{item.name}</p>
            <div className="navigation-basket-product-desc">
              <span>{item.size} </span>
              <span>{item.crust}</span>
            </div>

            {item.addedToppings && item.addedToppings?.length > 0 && (
              <div className="navigation-basket-toppings">
                <span>+ </span>
                {item.addedToppings.join(", ")}
              </div>
            )}

            {item.removedToppings && item.removedToppings?.length > 0 && (
              <div className="navigation-basket-toppings">
                <span>- </span>
                {item.removedToppings.join(", ")}
              </div>
            )}

            {item.firstHalf && (
              <span className="navigation-basket-toppings-half-and-half-name">
                First Half: {item.firstHalf.name}
                <br />
              </span>
            )}

            {item.firstHalf && item.firstHalf.addedToppings && item.firstHalf.addedToppings.length > 0 && (
              <div className="navigation-basket-toppings">
                <span>+ </span>
                {item.firstHalf.addedToppings.join(", ")}
              </div>
            )}

            {item.firstHalf && item.firstHalf.removedToppings && item.firstHalf.removedToppings.length > 0 && (
              <div className="navigation-basket-toppings">
                <span>- </span>
                {item.firstHalf.removedToppings.join(", ")}
              </div>
            )}

            {item.secondHalf && (
              <span className="navigation-basket-toppings-half-and-half-name">
                Second Half: {item.secondHalf.name}
                <br />
              </span>
            )}

            {item.secondHalf && item.secondHalf.addedToppings && item.secondHalf.addedToppings.length > 0 && (
              <div className="navigation-basket-toppings">
                <span>+ </span>
                {item.secondHalf.addedToppings.join(", ")}
              </div>
            )}

            {item.secondHalf && item.secondHalf.removedToppings && item.secondHalf.removedToppings.length > 0 && (
              <div className="navigation-basket-toppings">
                <span>- </span>
                {item.secondHalf.removedToppings.join(", ")}
              </div>
            )}
          </div>

          <div onClick={() => removeItemFromBasket(item, i)} className="navigation-basket-remove-item-container">
            <span className="navigation-basket-remove-item">
              <img src="/svg/basket/removeItem.svg" className="navigation-basket-remove-img" />
            </span>
          </div>
        </div>
        {thirdPizzaPromo && item.type === "pizza" && (
          <p className="navigation-basket-promo-text">Third Pizza for 5.50 Lv.</p>
        )}

        <div className="navigation-basket-quantity-price-container">
          <div className="navigation-basket-price-container">
            <span
              onClick={() => decreaseQuantity(i)}
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
            <span onClick={() => increaseQuantity(i)} className="navigation-basket-quantity-control">
              <img src="/svg/basket/plus.svg" className="navigation-basket-quantity-control-img" />
            </span>
          </div>

          <div className="navigation-basket-single-item-price">
            {itemsInBasketPlusDiscount.length > 0 &&
            itemsInBasketPlusDiscount[i] &&
            item.type === "pizza" &&
            Number(item.price) * item.quantity > Number(itemsInBasketPlusDiscount[i].price) ? (
              <div>
                {itemsInBasketPlusDiscount.length > 0 ? (
                  <div>
                    <p className="navigation-basket-reduced-price">
                      BGN {Number(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                    <p className="navigation-basket-regular-price">
                      BGN {Number(itemsInBasketPlusDiscount[i].price).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="navigation-basket-regular-price">
                    BGN {Number(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            ) : (
              itemsInBasketPlusDiscount[i] && (
                <p style={{ fontWeight: "bold" }}>BGN {Number(itemsInBasketPlusDiscount[i].price).toFixed(2)}</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonDealItem;
