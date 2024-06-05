import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./Basket.css";
import { OrderContext } from "../../context/OrderContext";

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

const Basket: React.FC<Props> = ({ setShowBasketOnHover }) => {
  const [totalPizzas, setTotalPizzas] = useState(0);
  const [itemsInBasketPlusDiscount, setItemsInBasketPlusDiscount] = useState<Product[]>([]);

  const { itemsInBasket, finalPrice, setFinalPrice, thirdPizzaPromotions, setThirdPizzaPromotions } =
    useContext(OrderContext);

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
      for (let j = 0; j < itemsInBasket[i].quantity; j++) {
        const product = new Product(
          itemsInBasket[i].name,
          itemsInBasket[i].price,
          1,
          itemsInBasket[i].size,
          itemsInBasket[i].crust,
          itemsInBasket[i].toppings,
          itemsInBasket[i].type
        );

        spreadItemsInBasket.push(product);
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
        }
      }
    }

    setItemsInBasketPlusDiscount(spreadItemsInBasket);

    let price = 0;
    spreadItemsInBasket.forEach((item) => {
      price += Number(item.price);
    });

    setFinalPrice(price);

    setTotalPizzas(pizzaQuantity);
    setThirdPizzaPromotions(parseInt(String(totalPizzas / 3)));
  }, [itemsInBasket, totalPizzas, thirdPizzaPromotions, setThirdPizzaPromotions, setFinalPrice]);

  return (
    <div className="navigation-basket-items" onMouseEnter={() => setShowBasketOnHover(true)}>
      <p>Paid Delivery 1.99 BGN!!!</p>

      {thirdPizzaPromotions > 0 && <p>Third Pizza For 6 Leva! x {thirdPizzaPromotions}</p>}

      {itemsInBasket.map((item, i) => (
        <div key={uuid()} className="navigation-basket-single-item">
          <p>{item.name}</p>
          <span>{item.size} </span>
          <span>{item.crust}</span>
          <div>
            <div>
              <span>-</span>
              <span>{item.quantity}</span>
              <span>+</span>
            </div>

            <div>
              {itemsInBasketPlusDiscount.length > 0 &&
              Number(item.price) * item.quantity > Number(itemsInBasketPlusDiscount[i].price) ? (
                <div>
                  <span>
                    {itemsInBasketPlusDiscount.length > 0 && Number(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                  <span>
                    {itemsInBasketPlusDiscount.length > 0 && Number(itemsInBasketPlusDiscount[i].price).toFixed(2)}
                  </span>
                </div>
              ) : (
                <p>{itemsInBasketPlusDiscount.length > 0 && Number(itemsInBasketPlusDiscount[i].price).toFixed(2)}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div>Final Price: {finalPrice.toFixed(2)}</div>
    </div>
  );
};

export default Basket;
