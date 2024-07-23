import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import Heading from "../../Heading/Heading";
import { BasketItem, OrderContext } from "../../../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { Invoice } from "../../../pages/checkout/Checkout";
import { v4 as uuid } from "uuid";

interface Address {
  block: string;
  coordinates: [number, number];
  doorBell: string;
  entrance: string;
  fullAddress: string;
  name: string;
  phoneNumber: string;
  store: string;
  _id: string;
}

interface Order {
  address?: Address;
  comments: string;
  createdAt: string;
  deliveryTime: string;
  doorBell: string;
  finalPrice: number;
  floor: string;
  invoice: Invoice;
  orderType: string;
  paymentMethod: string;
  phoneNumber: string;
  products: BasketItem[];
  store: string;
  _id: string;
}

const Orders: React.FC = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  const { token, emailLogin } = useContext(LoginContext);

  const {
    setOrderType,
    setItemsInBasket,
    setOrderAddress,
    setOrderStore,
    setOrderTime,
    setFinalPrice,
    setActiveOrder,
  } = useContext(OrderContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchOrders = async () => {
        const response = await axios.get("http://localhost:3000/api/users/get-orders", {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: emailLogin },
        });

        setAllOrders(response.data.allOrders.orders);
      };

      fetchOrders();
    }
  }, [token, emailLogin]);

  const handleReorder = (order: Order) => {
    console.log(order);

    if (order.orderType === "delivery" && order.address && order.address?.fullAddress.length > 0) {
      setOrderAddress(order.address);

      localStorage.setItem(
        "order-details",
        JSON.stringify({
          type: "delivery",
          addressLocation: order.address?.fullAddress,
          addressName: order.address.name,
          store: order.store,
        })
      );
    } else {
      localStorage.setItem(
        "order-details",
        JSON.stringify({
          type: "carryOut",
          store: order.store,
        })
      );
    }

    localStorage.setItem("active-order", JSON.stringify(true));
    localStorage.setItem("order-time", String(order.deliveryTime));

    setActiveOrder(true);
    setOrderType(order.orderType);
    setOrderStore(order.store);
    setOrderTime("NOW");
    setItemsInBasket(order.products);
    setFinalPrice(order.finalPrice);

    navigate("/checkout");
  };

  return (
    <div className="profile-orders">
      <Heading text="MY ORDERS" />
      {allOrders && (
        <div className="po-all-orders-container">
          {allOrders.map((order) => (
            <div className="po-order-container" key={uuid()}>
              <span className="po-order-date">{new Date(order.createdAt).toLocaleDateString("en-GB")}</span>
              <div className="po-order-description-container">
                {order.products.map((product) => (
                  <div className="po-order-description" key={uuid()}>
                    <span className="po-order-quantity">{product.quantity}x </span>
                    <span className="po-order-product-name">{product.name}</span>
                    {product.addedToppings &&
                    product.addedToppings.length > 0 &&
                    product.removedToppings &&
                    product.removedToppings.length > 0 ? (
                      <span className="po-order-product-modifications">
                        (Without {product.removedToppings.join(", Without ")}, +{product.addedToppings.join(", +")})
                      </span>
                    ) : product.addedToppings &&
                      product.addedToppings.length > 0 &&
                      product.removedToppings &&
                      product.removedToppings.length < 1 ? (
                      <span className="po-order-product-modifications">(+{product.addedToppings.join(", +")})</span>
                    ) : product.addedToppings &&
                      product.addedToppings.length < 1 &&
                      product.removedToppings &&
                      product.removedToppings.length > 0 ? (
                      <span className="po-order-product-modifications">
                        (Without {product.removedToppings.join(", Without ")})
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                ))}
              </div>
              <img src="/svg/reorder.svg" className="po-order-again-img" onClick={() => handleReorder(order)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
