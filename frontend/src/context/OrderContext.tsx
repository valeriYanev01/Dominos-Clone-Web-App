import React, { ReactNode, createContext, useEffect, useState } from "react";
import { Address } from "../types/Address";

interface OrderDetails {
  type: string;
  time: string;
  addressLocation: string;
  addressName: string;
}

interface OrderContextInterface {
  orderTime: string;
  setOrderTime: React.Dispatch<React.SetStateAction<string>>;
  activeOrder: boolean;
  setActiveOrder: React.Dispatch<React.SetStateAction<boolean>>;
  orderType: string;
  setOrderType: React.Dispatch<React.SetStateAction<string>>;
  orderAddress: Address;
  setOrderAddress: React.Dispatch<React.SetStateAction<Address>>;
  orderStore: string;
  setOrderStore: React.Dispatch<React.SetStateAction<string>>;
  orderDetails: OrderDetails;
  setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetails>>;
}

export const OrderContext = createContext<OrderContextInterface>({
  orderTime: "",
  setOrderTime: () => {},
  activeOrder: false,
  setActiveOrder: () => {},
  orderType: "",
  setOrderType: () => {},
  orderAddress: {
    apartament: "",
    closestStore: "",
    block: "",
    coordinates: [0, 0],
    doorBell: "",
    entrance: "",
    fullAddress: "",
    name: "",
    phoneNumber: "",
    _id: "",
  },
  setOrderAddress: () => {},
  orderStore: "",
  setOrderStore: () => {},
  orderDetails: {
    type: "",
    time: "",
    addressLocation: "",
    addressName: "",
  },
  setOrderDetails: () => {},
});

export const OrderContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeOrder, setActiveOrder] = useState(false);
  const [orderTime, setOrderTime] = useState("");
  const [orderType, setOrderType] = useState("");
  const [orderAddress, setOrderAddress] = useState<Address>({
    apartament: "",
    closestStore: "",
    block: "",
    coordinates: [0, 0],
    doorBell: "",
    entrance: "",
    fullAddress: "",
    name: "",
    phoneNumber: "",
    _id: "",
  });
  const [orderStore, setOrderStore] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    type: "",
    time: "",
    addressLocation: "",
    addressName: "",
  });

  useEffect(() => {
    if (orderTime) {
      localStorage.setItem("order-time", JSON.stringify(orderTime));
    }
  }, [orderTime]);

  useEffect(() => {
    if (localStorage.getItem("active-order")) {
      setActiveOrder(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("order-details")) {
      setOrderStore(
        JSON.parse(localStorage.getItem("order-details") as string)
          .store.toLocaleLowerCase()
          .split(" ")
          .join("")
      );
    }
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orderTime,
        setOrderTime,
        activeOrder,
        setActiveOrder,
        orderType,
        setOrderType,
        orderAddress,
        setOrderAddress,
        orderStore,
        setOrderStore,
        orderDetails,
        setOrderDetails,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
