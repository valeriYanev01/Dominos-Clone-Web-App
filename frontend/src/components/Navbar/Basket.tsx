import React, { useContext } from "react";
import "./Basket.css";
import { OrderContext } from "../../context/OrderContext";

const Basket: React.FC = () => {
  const { itemsInBasket } = useContext(OrderContext);

  return (
    <div>
      {itemsInBasket.map((item) => (
        <div key={item.name}>
          <p>{item.name}</p>
          <span>{item.size} </span>
          <span>{item.crust}</span>
          <div>
            <div>
              <span>-</span>
              <span>{item.quantity}</span>
              <span>+</span>
            </div>

            <div>{item.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Basket;
