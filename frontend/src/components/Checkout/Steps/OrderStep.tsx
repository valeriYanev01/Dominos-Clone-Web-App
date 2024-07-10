import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { BasketItem, OrderContext } from "../../../context/OrderContext";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import { AddressContext } from "../../../context/AddressContext";
import { Invoice } from "../../../pages/checkout/Checkout";
import "./OrderStep.css";

interface SingleDeal {
  name: string;
  crust?: string;
  quantity: number;
  price: string;
  addedToppings: string[];
  removedToppings: string[];
}

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
  const {
    itemsInBasket,
    setItemsInBasket,
    orderTime,
    finalPrice,
    dealsCount,
    dealItemsInBasket,
    itemsInBasketPlusDiscount,
    freeDelivery,
    thirdPizzaPromo,
    finalPriceNoDiscount,
  } = useContext(OrderContext);
  const { token, emailLogin, customerID, setDominosMorePoints } = useContext(LoginContext);
  const { selectedAddress } = useContext(AddressContext);

  const navigate = useNavigate();

  const increaseQuantity = (i: number) => {
    const products = [...itemsInBasket];
    products[i + dealsCount].quantity += 1;
    setItemsInBasket(products);
  };

  const decreaseQuantity = (i: number) => {
    const products = [...itemsInBasket];
    if (products[i + dealsCount].quantity > 1) {
      products[i + dealsCount].quantity -= 1;
    }
    setItemsInBasket(products);
  };

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
        const finalPriceToSend = freeDelivery ? finalPrice : finalPrice + 1.99;

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
            finalPrice: finalPriceToSend,
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
            finalPrice,
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

    setDominosMorePoints((prevState) => prevState + 1);
  };

  return (
    <div className="checkout-details-order">
      <span className="checkout-details-step">3</span>

      <p className="checkout-details-delivery-heading">ORDER CONFIRMATION</p>

      <div>
        {itemsInBasket
          .filter((item) => item.deal)
          .map((item, i) => (
            <div key={uuid()} className="navigation-basket-single-item">
              <div className="navigation-basket-deal-container">
                <span className="navigation-basket-deal-symbol">*</span>

                <div className="navigation-basket-deal-desc">
                  {item.deal &&
                    item.deal.map((i: SingleDeal) => (
                      <div key={uuid()}>
                        {i.crust ? <span>{i.crust} </span> : ""}
                        <span className="navigation-basket-deal-name">
                          {i.name} x {i.quantity}
                        </span>

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
                </div>

                <div onClick={() => removeItemFromBasket(item, i)} className="navigation-basket-remove-item-container">
                  <span className="navigation-basket-remove-item">
                    <img src="/svg/basket/removeItem.svg" className="navigation-basket-remove-img" />
                  </span>
                </div>
              </div>

              <div className="navigation-basket-quantity-price-container">
                <div></div>
                <p className="navigation-basket-single-item-price" style={{ margin: "0" }}>
                  BGN {item.price}
                </p>
              </div>
            </div>
          ))}

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
                          <img
                            src="/svg/basket/minus-disabled.svg"
                            className="navigation-basket-quantity-control-img"
                          />
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
            <span className={`${finalPrice + 1 < finalPriceNoDiscount ? "navigation-basket-price-total-line" : ""}`}>
              {freeDelivery ? finalPriceNoDiscount.toFixed(2) : (finalPriceNoDiscount + 1.99).toFixed(2)}
            </span>
          </p>
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
