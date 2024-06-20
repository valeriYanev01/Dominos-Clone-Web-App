import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./Basket.css";
import { BasketItem, OrderContext } from "../../context/OrderContext";
import { Link } from "react-router-dom";

interface Props {
  setShowBasketOnHover: React.Dispatch<React.SetStateAction<boolean>>;
}

class Product {
  name: string;
  price: string;
  quantity: number;
  size: string;
  crust: string;
  toppings: string[];
  type: string;

  constructor(
    name: string,
    price: string,
    quantity: number,
    size: string,
    crust: string,
    toppings: string[],
    type: string
  ) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
    this.type = type;
  }
}

interface SingleDeal {
  name: string;
  crust?: string;
  quantity: number;
  price: string;
  addedToppings: string[];
  removedToppings: string[];
}

const Basket: React.FC<Props> = ({ setShowBasketOnHover }) => {
  const [totalPizzas, setTotalPizzas] = useState(0);
  const [itemsInBasketPlusDiscount, setItemsInBasketPlusDiscount] = useState<Product[]>([]);
  const [nonDealItemsInBasket, setNonDealItemsInBasket] = useState(0);
  const [thirdPizzaPromo, setThirdPizzaPromo] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [finalPriceNoDiscount, setFinalPriceNoDiscount] = useState(0);

  const { itemsInBasket, setItemsInBasket, finalPrice, setFinalPrice, thirdPizzaPromotions, setThirdPizzaPromotions } =
    useContext(OrderContext);

  useEffect(() => {
    let counter = 0;
    itemsInBasket.forEach((item) => {
      if (!item.deal) counter += 1;
    });

    setNonDealItemsInBasket(counter);
  }, [itemsInBasket]);

  // Calculate final price
  useEffect(() => {
    let price = 0;
    itemsInBasket.forEach((item) => {
      price += Number(item.price) * item.quantity;
    });

    setFinalPrice(price);
  }, [itemsInBasket, setFinalPrice, thirdPizzaPromotions]);

  // To determine how many 3rd pizza promotions should be included
  useEffect(() => {
    let pizzaQuantity = 0;

    itemsInBasket.forEach((item) => {
      if (item.type === "pizza") {
        pizzaQuantity += item.quantity;
      }
    });

    const spreadItemsInBasket = [];

    for (let i = 0; i < itemsInBasket.length; i++) {
      if (itemsInBasket[i].deal) {
        continue;
      } else {
        for (let j = 0; j < itemsInBasket[i].quantity; j++) {
          const product = new Product(
            itemsInBasket[i].name,
            itemsInBasket[i].price,
            1,
            itemsInBasket[i].size || "",
            itemsInBasket[i].crust || "",
            itemsInBasket[i].toppings || [],
            itemsInBasket[i].type
          );

          spreadItemsInBasket.push(product);
        }
      }
    }

    for (let i = 0; i < thirdPizzaPromotions; i++) {
      spreadItemsInBasket[i].price = "5.50";
    }

    for (let i = 0; i < spreadItemsInBasket.length; i++) {
      for (let j = i + 1; j < spreadItemsInBasket.length; j++) {
        if (
          JSON.stringify(spreadItemsInBasket[i].toppings) === JSON.stringify(spreadItemsInBasket[j].toppings) &&
          spreadItemsInBasket[i].name === spreadItemsInBasket[j].name
        ) {
          spreadItemsInBasket[i].quantity += spreadItemsInBasket[j].quantity;
          spreadItemsInBasket[i].price = String(
            Number(spreadItemsInBasket[i].price) + Number(spreadItemsInBasket[j].price)
          );
          spreadItemsInBasket.splice(j, 1);
          j--;
        } else {
          continue;
        }
      }
    }

    setItemsInBasketPlusDiscount(spreadItemsInBasket);

    let price = 0;

    spreadItemsInBasket.forEach((item) => {
      price += Number(item.price);
    });

    itemsInBasket.forEach((item) => {
      if (item.deal) {
        price += Number(item.price);
      }
    });

    setFinalPrice(price);

    setTotalPizzas(pizzaQuantity);
    setThirdPizzaPromotions(parseInt(String(totalPizzas / 3)));
  }, [itemsInBasket, totalPizzas, thirdPizzaPromotions, setThirdPizzaPromotions, setFinalPrice]);

  useEffect(() => {
    if (thirdPizzaPromotions) {
      setThirdPizzaPromo(true);
    } else {
      setThirdPizzaPromo(false);
    }
  }, [thirdPizzaPromotions]);

  useEffect(() => {
    if (finalPrice > 30) {
      setFreeDelivery(true);
    } else {
      setFreeDelivery(false);
    }
  }, [finalPrice]);

  const increaseQuantity = (i: number) => {
    const products = [...itemsInBasket];
    products[i].quantity += 1;
    setItemsInBasket(products);
  };

  const decreaseQuantity = (i: number) => {
    const products = [...itemsInBasket];
    if (products[i].quantity > 1) {
      products[i].quantity -= 1;
    }
    setItemsInBasket(products);
  };

  const removeItemFromBasket = (item: BasketItem, i: number) => {
    const newItemsInBasket = [...itemsInBasket];
    if (item.deal) {
      newItemsInBasket.splice(i + nonDealItemsInBasket, 1);
    } else {
      newItemsInBasket.splice(i, 1);
    }

    setItemsInBasket(newItemsInBasket);
  };

  useEffect(() => {
    let priceNoDiscount = 0;

    itemsInBasket.forEach((item) => {
      priceNoDiscount += parseFloat(item.price) * item.quantity;
    });

    setFinalPriceNoDiscount(priceNoDiscount);
  }, [itemsInBasket]);

  return (
    <div className="navigation-basket-items" onMouseEnter={() => setShowBasketOnHover(true)}>
      {itemsInBasket.length > 0 &&
        itemsInBasket
          .filter((item) => !item.deal)
          .map((item, i) => (
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
                  </div>

                  <div
                    onClick={() => removeItemFromBasket(item, i)}
                    className="navigation-basket-remove-item-container"
                  >
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
                        <p style={{ fontWeight: "bold" }}>
                          BGN {Number(itemsInBasketPlusDiscount[i].price).toFixed(2)}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

      {itemsInBasket
        .filter((item) => item.deal)
        .map((item, i) => (
          <div key={uuid()} className="navigation-basket-single-item">
            <span>*</span>
            {item.deal &&
              item.deal.map((i: SingleDeal) => (
                <div key={uuid()}>
                  {i.crust ? <span>{i.crust} </span> : ""}
                  <span className="navigation-basket-deal-name">{i.name}</span>

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
            <p>{item.price}</p>
            <div onClick={() => removeItemFromBasket(item, i)} className="navigation-basket-remove-item-container">
              <span className="navigation-basket-remove-item">
                <img src="/svg/basket/removeItem.svg" className="navigation-basket-remove-img" />
              </span>
            </div>
          </div>
        ))}

      {freeDelivery ? (
        <p className="navigation-basket-promo-text">
          Free Delivery <span className="navigation-basket-free-delivery">1.99 Lv.</span> 0.00 Lv.
        </p>
      ) : (
        <p>Paid Delivery 1.99 BGN!!!</p>
      )}

      <div className="navigation-basket-total-price-container">
        <p>
          Total:{" "}
          <span className={`${finalPrice < finalPriceNoDiscount ? "navigation-basket-price-total-line" : ""}`}>
            {finalPriceNoDiscount.toFixed(2)}
          </span>
        </p>
        {finalPrice < finalPriceNoDiscount && (
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
