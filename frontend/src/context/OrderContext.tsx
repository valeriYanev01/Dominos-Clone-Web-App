import React, { ReactNode, createContext, useEffect, useState } from "react";
import { Address } from "../types/Address";

interface OrderDetails {
  type: string;
  time: string;
  addressLocation: string;
  addressName: string;
}

interface BasketItem {
  name: string;
  size?: string;
  crust?: string;
  toppings?: string[];
  quantity: number;
  price: string;
  type: string;
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
  navigateToCheckoutPage: boolean;
  setNavigateToCheckoutPage: React.Dispatch<React.SetStateAction<boolean>>;
  itemsInBasket: BasketItem[];
  setItemsInBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  finalPrice: number;
  setFinalPrice: React.Dispatch<React.SetStateAction<number>>;
  thirdPizzaPromotions: number;
  setThirdPizzaPromotions: React.Dispatch<React.SetStateAction<number>>;
  spreadItemsInBasket: BasketItem[];
  setSpreadItemsInBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
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
  navigateToCheckoutPage: false,
  setNavigateToCheckoutPage: () => {},
  itemsInBasket: [],
  setItemsInBasket: () => {},
  finalPrice: 0,
  setFinalPrice: () => {},
  thirdPizzaPromotions: 0,
  setThirdPizzaPromotions: () => {},
  spreadItemsInBasket: [],
  setSpreadItemsInBasket: () => {},
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
  const [navigateToCheckoutPage, setNavigateToCheckoutPage] = useState(false);
  const [itemsInBasket, setItemsInBasket] = useState<BasketItem[]>(
    JSON.parse(localStorage.getItem("basket-items") as string)
      ? JSON.parse(localStorage.getItem("basket-items") as string)
      : []
  );
  const [finalPrice, setFinalPrice] = useState(0);
  const [thirdPizzaPromotions, setThirdPizzaPromotions] = useState(0);
  const [spreadItemsInBasket, setSpreadItemsInBasket] = useState<BasketItem[]>([]);

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

  useEffect(() => {
    localStorage.setItem("basket-items", JSON.stringify(itemsInBasket));
  }, [itemsInBasket]);

  useEffect(() => {
    if (itemsInBasket.length > 0) {
      setNavigateToCheckoutPage(true);
    }
  }, [itemsInBasket]);

  useEffect(() => {
    itemsInBasket.sort((a, b) => a.type.localeCompare(b.type));
    itemsInBasket.sort((a, b) => a.price.localeCompare(b.price));

    for (let i = 0; i <= itemsInBasket.length - 2; i++) {
      const counter = i + 1;

      if (
        JSON.stringify(itemsInBasket[i].toppings) === JSON.stringify(itemsInBasket[counter].toppings) &&
        itemsInBasket[i].name === itemsInBasket[counter].name
      ) {
        itemsInBasket[counter].quantity += itemsInBasket[i].quantity;
        itemsInBasket.splice(i, 1);
      }
    }
  }, [itemsInBasket, thirdPizzaPromotions]);

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
        navigateToCheckoutPage,
        setNavigateToCheckoutPage,
        itemsInBasket,
        setItemsInBasket,
        finalPrice,
        setFinalPrice,
        thirdPizzaPromotions,
        setThirdPizzaPromotions,
        spreadItemsInBasket,
        setSpreadItemsInBasket,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
