import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Address } from "../types/Address";
import { LoginContext } from "./LoginContext";
import { AddressContext } from "./AddressContext";

interface OrderDetails {
  type: string;
  time: string;
  addressLocation: string;
  addressName: string;
}

export interface SingleDeal {
  name: string;
  crust?: string;
  quantity: number;
  price: string;
  addedToppings: string[];
  removedToppings: string[];
  heading: string;
}

export interface BasketItem {
  name: string;
  size?: string;
  crust?: string;
  toppings?: string[];
  removedToppings?: string[];
  addedToppings?: string[];
  quantity: number;
  price: string;
  type: string;
  deal?: Array<{
    name: string;
    crust?: string;
    quantity: number;
    toppings?: string[];
    addedToppings?: string[];
    removedToppings?: string[];
  }>;
  desc?: string;
  heading?: string;
  firstHalf?: {
    name: string;
    addedToppings?: string[];
    removedToppings?: string[];
  };
  secondHalf?: {
    name: string;
    addedToppings?: string[];
    removedToppings?: string[];
  };
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
  initialToppings: string[][];
  setInitialToppings: React.Dispatch<React.SetStateAction<string[][]>>;
  modifiedToppings: string[][];
  setModifiedToppings: React.Dispatch<React.SetStateAction<string[][]>>;
  isOpenForDelivery: boolean;
  setIsOpenForDelivery: React.Dispatch<React.SetStateAction<boolean>>;
  itemsInBasketPlusDiscount: Product[];
  setItemsInBasketPlusDiscount: React.Dispatch<React.SetStateAction<Product[]>>;
  dealItemsInBasket: number;
  setDealItemsInBasket: React.Dispatch<React.SetStateAction<number>>;
  thirdPizzaPromo: boolean;
  setThirdPizzaPromo: React.Dispatch<React.SetStateAction<boolean>>;
  freeDelivery: boolean;
  setFreeDelivery: React.Dispatch<React.SetStateAction<boolean>>;
  dealsCount: number;
  setDealsCount: React.Dispatch<React.SetStateAction<number>>;
  finalPriceNoDiscount: number;
  setFinalPriceNoDiscount: React.Dispatch<React.SetStateAction<number>>;
  activeTracker: boolean;
  setActiveTracker: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCoupon: string;
  setSelectedCoupon: React.Dispatch<React.SetStateAction<string>>;
  showCoupons: boolean;
  setShowCoupons: React.Dispatch<React.SetStateAction<boolean>>;
  isReadyForOrder: boolean;
  setIsReadyForOrder: React.Dispatch<React.SetStateAction<boolean>>;
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
  initialToppings: [],
  setInitialToppings: () => {},
  modifiedToppings: [],
  setModifiedToppings: () => {},
  isOpenForDelivery: false,
  setIsOpenForDelivery: () => {},
  itemsInBasketPlusDiscount: [],
  setItemsInBasketPlusDiscount: () => {},
  dealItemsInBasket: 0,
  setDealItemsInBasket: () => {},
  thirdPizzaPromo: false,
  setThirdPizzaPromo: () => {},
  freeDelivery: false,
  setFreeDelivery: () => {},
  dealsCount: 0,
  setDealsCount: () => {},
  finalPriceNoDiscount: 0,
  setFinalPriceNoDiscount: () => {},
  activeTracker: false,
  setActiveTracker: () => {},
  selectedCoupon: "",
  setSelectedCoupon: () => {},
  showCoupons: false,
  setShowCoupons: () => {},
  isReadyForOrder: false,
  setIsReadyForOrder: () => {},
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
  const [initialToppings, setInitialToppings] = useState<string[][]>([]);
  const [modifiedToppings, setModifiedToppings] = useState<string[][]>([]);
  const [isOpenForDelivery, setIsOpenForDelivery] = useState(false);
  const [totalPizzas, setTotalPizzas] = useState(0);
  const [itemsInBasketPlusDiscount, setItemsInBasketPlusDiscount] = useState<Product[]>([]);
  const [dealItemsInBasket, setDealItemsInBasket] = useState(0);
  const [thirdPizzaPromo, setThirdPizzaPromo] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [dealsCount, setDealsCount] = useState(0);
  const [finalPriceNoDiscount, setFinalPriceNoDiscount] = useState(0);
  const [activeTracker, setActiveTracker] = useState(() => {
    const savedData = localStorage.getItem("active-tracker");
    return savedData && JSON.parse(savedData).active ? true : false;
  });
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);
  const [isReadyForOrder, setIsReadyForOrder] = useState(false);

  const { loggedIn } = useContext(LoginContext);
  const { selectedAddress } = useContext(AddressContext);

  useEffect(() => {
    if (orderTime) {
      localStorage.setItem("order-time", orderTime);
    }
  }, [orderTime]);

  useEffect(() => {
    if (!loggedIn) {
      setItemsInBasket([]);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (localStorage.getItem("order-time")) {
      setOrderTime(localStorage.getItem("order-time") as string);
    }
  }, []);

  useEffect(() => {
    if (new Date().getHours() >= 11) {
      setIsOpenForDelivery(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("active-order") && JSON.parse(localStorage.getItem("active-order") as string) === true) {
      setActiveOrder(true);
    }

    if (localStorage.getItem("active-tracker")) {
      setActiveOrder(false);
      localStorage.setItem("active-order", JSON.stringify(false));
    }
  }, []);

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem("active-order", JSON.stringify(true));
    } else {
      localStorage.setItem("active-order", JSON.stringify(false));
    }
  }, [activeOrder]);

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
    } else {
      setNavigateToCheckoutPage(false);
    }
  }, [itemsInBasket]);

  useEffect(() => {
    const combineAndSortItems = (items: BasketItem[]) => {
      const combinedItems = [...items];

      for (let i = 0; i < combinedItems.length - 1; i++) {
        if (combinedItems[i].deal) continue;

        for (let j = i + 1; j < combinedItems.length; j++) {
          if (
            (combinedItems[i].name !== "Half and Half" &&
              JSON.stringify(combinedItems[i].toppings) === JSON.stringify(combinedItems[j].toppings) &&
              combinedItems[i].name === combinedItems[j].name &&
              combinedItems[i].size === combinedItems[j].size &&
              combinedItems[i].crust === combinedItems[j].crust) ||
            (combinedItems[i].name === "Half and Half" &&
              combinedItems[i].name === combinedItems[j].name &&
              combinedItems[i].size === combinedItems[j].size &&
              combinedItems[i].crust === combinedItems[j].crust &&
              JSON.stringify(combinedItems[i].firstHalf) === JSON.stringify(combinedItems[j].firstHalf) &&
              JSON.stringify(combinedItems[i].secondHalf) === JSON.stringify(combinedItems[j].secondHalf))
          ) {
            combinedItems[i].quantity += combinedItems[j].quantity;
            combinedItems.splice(j, 1);
            j--;
          }
        }
      }

      combinedItems.sort((a, b) => {
        if (a.deal && !b.deal) return -1;
        if (!a.deal && b.deal) return 1;

        if (a.type === "pizza" && b.type !== "pizza") return -1;
        if (a.type !== "pizza" && b.type === "pizza") return 1;

        if (a.type === "pizza" && b.type === "pizza") {
          if (parseFloat(a.price) !== parseFloat(b.price)) return parseFloat(a.price) - parseFloat(b.price);
          return a.type.localeCompare(b.type);
        }

        return 0;
      });

      return combinedItems;
    };

    const newItemsInBasket = combineAndSortItems(itemsInBasket);

    // avoid unnecessary rerenders
    if (JSON.stringify(newItemsInBasket) !== JSON.stringify(itemsInBasket)) {
      setItemsInBasket(newItemsInBasket);
    }
  }, [itemsInBasket, thirdPizzaPromotions]);

  useEffect(() => {
    let counter = 0;

    itemsInBasket.forEach((item) => {
      if (item.deal) {
        counter += 1;
      }
    });

    setDealsCount(counter);
  }, [itemsInBasket]);

  useEffect(() => {
    let counter = 0;
    itemsInBasket.forEach((item) => {
      if (item.deal) counter += 1;
    });

    setDealItemsInBasket(counter);
  }, [itemsInBasket]);

  // To determine how many 3rd pizza promotions should be included
  useEffect(() => {
    if (itemsInBasket.length > 0) {
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

      if (selectedCoupon.length > 0) {
        if (spreadItemsInBasket[0].type === "pizza") {
          spreadItemsInBasket[0].price = "0";
        }
      }

      if (thirdPizzaPromotions > 0 && selectedCoupon.length > 0) {
        for (let i = 0; i < thirdPizzaPromotions + 1; i++) {
          if (spreadItemsInBasket[i].type === "pizza" && spreadItemsInBasket[i].price !== "0") {
            spreadItemsInBasket[i].price = "5.50";
          }
        }
      } else if (thirdPizzaPromotions > 0) {
        for (let i = 0; i < thirdPizzaPromotions; i++) {
          if (spreadItemsInBasket[i].type === "pizza" && spreadItemsInBasket[i].price !== "0") {
            spreadItemsInBasket[i].price = "5.50";
          }
        }
      }

      for (let i = 0; i < spreadItemsInBasket.length; i++) {
        for (let j = i + 1; j < spreadItemsInBasket.length; j++) {
          if (
            JSON.stringify(spreadItemsInBasket[i].toppings) === JSON.stringify(spreadItemsInBasket[j].toppings) &&
            spreadItemsInBasket[i].name === spreadItemsInBasket[j].name &&
            spreadItemsInBasket[i].size === spreadItemsInBasket[j].size &&
            spreadItemsInBasket[i].crust === spreadItemsInBasket[j].crust
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
          price += Number(item.price) * item.quantity;
        }
      });

      if (!freeDelivery) {
        price += 1.99;
      }

      setFinalPrice(price);
      setTotalPizzas(pizzaQuantity);
      if (selectedCoupon.length > 0) {
        setThirdPizzaPromotions(Math.ceil(totalPizzas / 3 - 1));
      } else {
        setThirdPizzaPromotions(parseInt(String(totalPizzas / 3)));
      }
    }
  }, [
    itemsInBasket,
    totalPizzas,
    thirdPizzaPromotions,
    setThirdPizzaPromotions,
    setFinalPrice,
    selectedCoupon,
    freeDelivery,
  ]);

  useEffect(() => {
    if (thirdPizzaPromotions) {
      setThirdPizzaPromo(true);
    } else {
      setThirdPizzaPromo(false);
    }
  }, [thirdPizzaPromotions]);

  useEffect(() => {
    if (finalPrice >= 30) {
      setFreeDelivery(true);
    } else {
      setFreeDelivery(false);
    }
  }, [finalPrice]);

  useEffect(() => {
    let priceNoDiscount = 0;

    itemsInBasket.forEach((item) => {
      if (item.deal) {
        priceNoDiscount += parseFloat(item.price) * item.quantity;
      } else {
        priceNoDiscount += parseFloat(item.price) * item.quantity;
      }
    });

    setFinalPriceNoDiscount(priceNoDiscount);
  }, [itemsInBasket]);

  useEffect(() => {
    if (loggedIn && localStorage.getItem("order-time")) {
      let finishOrderTimeHours;
      let finishOrderTimeMinutes;

      const placedOrderTime = new Date(parseInt(localStorage.getItem("placed-order-time") as string));
      const placedOrderTimeCopyHours = new Date(placedOrderTime);
      const placedOrderTimeCopyMinutes = new Date(placedOrderTime);

      if ((localStorage.getItem("order-time") as string) === "NOW") {
        finishOrderTimeHours = new Date(
          placedOrderTimeCopyHours.setMinutes(placedOrderTimeCopyHours.getMinutes() + 30)
        ).getHours();
        finishOrderTimeMinutes = new Date(
          placedOrderTimeCopyMinutes.setMinutes(placedOrderTimeCopyMinutes.getMinutes() + 30)
        ).getMinutes();
      } else {
        finishOrderTimeHours = parseInt((localStorage.getItem("order-time") as string).toString().split(":")[0]);
        finishOrderTimeMinutes = parseInt((localStorage.getItem("order-time") as string).toString().split(":")[1]);
      }

      const startOrderTimeHours = new Date(JSON.parse(localStorage.getItem("placed-order-time") as string)).getHours();
      const startOrderTimeMinutes = new Date(
        JSON.parse(localStorage.getItem("placed-order-time") as string)
      ).getMinutes();

      const finishTime = new Date(
        new Date(
          new Date(new Date().setMinutes(Number(finishOrderTimeMinutes))).setHours(Number(finishOrderTimeHours))
        ).setSeconds(0)
      ).getTime();

      const startTime = new Date(
        new Date(
          new Date(new Date().setMinutes(Number(startOrderTimeMinutes))).setHours(Number(startOrderTimeHours))
        ).setSeconds(0)
      ).getTime();

      if (activeTracker) {
        localStorage.setItem("active-tracker", JSON.stringify({ active: true, start: startTime, finish: finishTime }));
      }
    }
  }, [activeTracker, loggedIn]);

  const savedData = localStorage.getItem("active-tracker");

  useEffect(() => {
    if (savedData && JSON.parse(savedData).active) {
      setActiveTracker(true);
    } else {
      setActiveTracker(false);
    }
  }, [savedData]);

  useEffect(() => {
    if (
      selectedAddress &&
      selectedAddress.name &&
      selectedAddress.name.length > 0 &&
      selectedAddress.fullAddress.length > 0 &&
      orderTime.length > 0
    ) {
      setIsReadyForOrder(true);
    }
  }, [orderTime.length, selectedAddress, setIsReadyForOrder]);

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
        initialToppings,
        setInitialToppings,
        modifiedToppings,
        setModifiedToppings,
        isOpenForDelivery,
        setIsOpenForDelivery,
        itemsInBasketPlusDiscount,
        setItemsInBasketPlusDiscount,
        dealItemsInBasket,
        setDealItemsInBasket,
        thirdPizzaPromo,
        setThirdPizzaPromo,
        dealsCount,
        setDealsCount,
        freeDelivery,
        setFreeDelivery,
        finalPriceNoDiscount,
        setFinalPriceNoDiscount,
        activeTracker,
        setActiveTracker,
        selectedCoupon,
        setSelectedCoupon,
        showCoupons,
        setShowCoupons,
        isReadyForOrder,
        setIsReadyForOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
