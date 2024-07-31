import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasketItem, OrderContext } from "../../../context/OrderContext";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import { AddressContext } from "../../../context/AddressContext";
import { Invoice } from "../../../pages/checkout/Checkout";
import "./OrderStep.css";
import DealItem from "../../Navbar/Basket/DealItem";
import NonDealItem from "../../Navbar/Basket/NonDealItem";

interface Props {
  selectedCard: string;
  selectedPaymentMethod: string;
  setClientSecret: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  floor: string;
  comments: string;
  bell: string;
  selectedInvoice: Invoice | null | undefined;
}

const OrderStep: React.FC<Props> = ({
  selectedCard,
  selectedPaymentMethod,
  setClientSecret,
  phoneNumber,
  floor,
  comments,
  bell,
  selectedInvoice,
}) => {
  const [finishTime, setFinishTime] = useState(0);

  const {
    itemsInBasket,
    setItemsInBasket,
    orderTime,
    finalPrice,
    setFinalPrice,
    dealItemsInBasket,
    freeDelivery,
    finalPriceNoDiscount,
    setActiveTracker,
    selectedCoupon,
  } = useContext(OrderContext);
  const { token, emailLogin, customerID } = useContext(LoginContext);
  const { selectedAddress } = useContext(AddressContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (itemsInBasket.length > 0) {
      const cheapestPizza = itemsInBasket.filter((item) => item.type === "pizza")[0];

      if (cheapestPizza) {
        if (selectedCoupon.length > 0 && cheapestPizza.size === "Medium") {
          setFinalPrice(finalPrice - parseFloat(cheapestPizza.price));
        } else {
          setFinalPrice(finalPrice + parseFloat(cheapestPizza.price));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsInBasket, selectedCoupon, setFinalPrice]);

  useEffect(() => {
    if (orderTime === "NOW") {
      setFinishTime(new Date(new Date().getTime() + 1000 * 60 * 30).getTime());
    } else {
      const hour = parseInt(orderTime.split(":")[0]);
      const minutes = parseInt(orderTime.split(":")[1]);

      const finishTimeTemp = new Date(
        new Date(new Date(new Date().setHours(hour)).setMinutes(minutes)).setSeconds(0)
      ).getTime();

      setFinishTime(finishTimeTemp);
    }
  }, [orderTime]);

  const removeItemFromBasket = (item: BasketItem, i: number) => {
    const newItemsInBasket = [...itemsInBasket];
    if (item.deal) {
      newItemsInBasket.splice(i, 1);
    } else {
      newItemsInBasket.splice(i + dealItemsInBasket, 1);
    }

    setItemsInBasket(newItemsInBasket);
  };

  const handlePayWithSelectedCard = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payment/create-payment-intent",
        {
          amount: 2000,
          payment_method: selectedCard,
          return_url: "http://localhost:5173/tracker",
          customer: customerID,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setClientSecret(response.data.paymentIntent.client_secret);

      if (response.data.paymentIntent.status === "succeeded") {
        window.location.href = "http://localhost:5173/tracker";
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const handleOrder = async () => {
    if (selectedPaymentMethod === "card") {
      handlePayWithSelectedCard();
    }

    let orderStore = "";

    if (JSON.parse(localStorage.getItem("order-details") as string).store.length > 0) {
      orderStore = JSON.parse(localStorage.getItem("order-details") as string).store;
    }

    if (JSON.parse(localStorage.getItem("order-details") as string).type === "delivery") {
      try {
        const response = await axios.put(
          "http://localhost:3000/api/users/new-order",
          {
            email: emailLogin,
            products: itemsInBasket,
            address: selectedAddress,
            deliveryTime: orderTime,
            phoneNumber,
            store: orderStore,
            floor,
            doorBell: bell,
            comments,
            paymentMethod: selectedPaymentMethod,
            invoice: selectedInvoice,
            orderType: JSON.parse(localStorage.getItem("order-details") as string).type,
            finalPrice: parseFloat(finalPrice.toFixed(2)),
            start: new Date().getTime(),
            finish: finishTime,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          navigate("/tracker");
          localStorage.removeItem("active-order");
          localStorage.removeItem("basket-items");
          setItemsInBasket([]);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err);
        }
      }
    } else {
      try {
        const response = await axios.put(
          "http://localhost:3000/api/users/new-order",
          {
            email: emailLogin,
            products: itemsInBasket,
            deliveryTime: orderTime,
            phoneNumber,
            store: JSON.parse(localStorage.getItem("order-details") as string).store,
            floor,
            doorBell: bell,
            comments,
            paymentMethod: selectedPaymentMethod,
            invoice: selectedInvoice,
            orderType: JSON.parse(localStorage.getItem("order-details") as string).type,
            finalPrice: parseFloat(finalPrice.toFixed(2)),
            start: new Date().getTime(),
            finish: finishTime,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          navigate("/tracker");
          localStorage.removeItem("active-order");
          localStorage.removeItem("basket-items");
          setItemsInBasket([]);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err);
        }
      }
    }

    if (selectedCoupon) {
      await axios.put(
        "http://localhost:3000/api/users/update-coupon-used",
        { email: emailLogin, _id: selectedCoupon },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setActiveTracker(true);

    localStorage.setItem("placed-order-time", JSON.stringify(new Date().getTime()));
  };

  return (
    <div className="checkout-details-order">
      <span className="checkout-details-step">3</span>

      <p className="checkout-details-delivery-heading">ORDER CONFIRMATION</p>

      <div>
        {itemsInBasket
          .filter((item) => item.deal)
          .map((item, i) => (
            <DealItem removeItemFromBasket={removeItemFromBasket} item={item} i={i} />
          ))}

        {itemsInBasket.length > 0 &&
          itemsInBasket
            .filter((item) => !item.deal)
            .map((item, i) => <NonDealItem removeItemFromBasket={removeItemFromBasket} item={item} i={i} />)}

        {freeDelivery ? (
          <p className="navigation-basket-promo-text">
            Free Delivery <span className="navigation-basket-free-delivery">1.99 Lv.</span> 0.00 Lv.
          </p>
        ) : (
          <p>Paid Delivery 1.99 BGN!!!</p>
        )}

        <div className="navigation-basket-total-price-container">
          <div>
            Total:{" "}
            <span className={`${finalPrice + 1 < finalPriceNoDiscount ? "navigation-basket-price-total-line" : ""}`}>
              {freeDelivery ? finalPriceNoDiscount.toFixed(2) : (finalPriceNoDiscount + 1.99).toFixed(2)}
            </span>
          </div>
          {finalPrice + 1 < finalPriceNoDiscount && (
            <>
              <p className="navigation-basket-price-discount">
                Total with discount: <span>{finalPrice.toFixed(2)}</span>
              </p>
              <p className="navigation-basket-price-save">You Save: {(finalPriceNoDiscount - finalPrice).toFixed(2)}</p>
            </>
          )}
        </div>
      </div>

      <div className="checkout-final-order-btn" onClick={handleOrder}>
        ORDER NOW
      </div>
    </div>
  );
};

export default OrderStep;
