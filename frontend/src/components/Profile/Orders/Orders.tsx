import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import Heading from "../../Heading/Heading";

type Order = {
  products: {
    name: string;
    quantity: number;
    modifications: {
      added: string[];
      removed: string[];
    }[];
    _id: string;
    createdAt: number;
  }[];
  _id: string;
  createdAt: string;
};

const Orders: React.FC = () => {
  const [allOrders, setAllOrders] = useState<Order[]>();
  const { token, emailLogin } = useContext(LoginContext);

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

  return (
    <div className="profile-orders">
      <Heading text="MY ORDERS" />
      {allOrders && (
        <div className="po-all-orders-container">
          {allOrders.map((products, i) => (
            <div className="po-order-container" key={products._id + i}>
              <span className="po-order-date">{new Date(products.createdAt).toLocaleDateString("en-GB")}</span>
              <div className="po-order-description-container">
                {products.products.map((product) => (
                  <div className="po-order-description" key={product._id}>
                    <span className="po-order-quantity">{product.quantity}x </span>
                    <span className="po-order-product-name">{product.name}</span>
                    {product.modifications[0].added.length > 0 && product.modifications[0].removed.length > 0 ? (
                      <span className="po-order-product-modifications">
                        (Without {product.modifications[0].removed.join(", Without ")}, +
                        {product.modifications[0].added.join(", +")})
                      </span>
                    ) : product.modifications[0].added.length > 0 && product.modifications[0].removed.length < 1 ? (
                      <span className="po-order-product-modifications">
                        (+{product.modifications[0].added.join(", +")})
                      </span>
                    ) : product.modifications[0].added.length < 1 && product.modifications[0].removed.length > 0 ? (
                      <span className="po-order-product-modifications">
                        (Without {product.modifications[0].removed.join(", Without ")})
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                ))}
              </div>
              <img src="/svg/reorder.svg" className="po-order-again-img" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
