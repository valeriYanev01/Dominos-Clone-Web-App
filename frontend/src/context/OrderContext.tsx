import React, { ReactNode, createContext, useEffect, useState } from "react";

interface OrderContextInterface {
  orderTime: Date;
  setOrderTime: React.Dispatch<React.SetStateAction<Date>>;
  activeOrder: boolean;
  setActiveOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OrderContext = createContext<OrderContextInterface>({
  orderTime: new Date(),
  setOrderTime: () => {},
  activeOrder: false,
  setActiveOrder: () => {},
});

export const OrderContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orderTime, setOrderTime] = useState(new Date());
  const [activeOrder, setActiveOrder] = useState(false);

  useEffect(() => {
    if (orderTime) {
      localStorage.setItem("orderTime", JSON.stringify(orderTime));
    }
  }, [orderTime]);

  return (
    <OrderContext.Provider value={{ orderTime, setOrderTime, activeOrder, setActiveOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
