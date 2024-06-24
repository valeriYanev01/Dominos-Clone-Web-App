import Navbar from "../../components/Navbar/Navbar";
import { v4 as uuid } from "uuid";
import "./Checkout.css";
import React, { useContext } from "react";
import { products } from "../../data/products";
import { LoginContext } from "../../context/LoginContext";
import { ModalContext } from "../../context/ModalContext";
import { BasketItem, OrderContext } from "../../context/OrderContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const Checkout: React.FC = () => {
  const items = products
    .map((product) => {
      if (
        product.name.includes("Shumensko 1L") ||
        product.name.includes("Hot Buffalo Wings") ||
        product.name.includes("Strippers") ||
        product.name.includes("Brown") ||
        product.name === "Coca-Cola"
      ) {
        return product;
      }
    })
    .filter((p) => p !== undefined);

  console.log(items);

  const { loggedIn } = useContext(LoginContext);
  const { setModalType, setOpenModal } = useContext(ModalContext);
  const { itemsInBasket, setItemsInBasket } = useContext(OrderContext);

  const handleAddToBasket = (name: string, price: string, type: string) => {
    if (loggedIn === false) {
      setModalType("login");
      setOpenModal(true);
    } else {
      setModalType("");
      setOpenModal(false);
      setItemsInBasket((prevState: BasketItem[]) => [
        ...prevState,
        { name: name, price: price, type: type, crust: "", quantity: 1, size: "", toppings: [] },
      ]);
    }
  };

  return (
    <div className="checkout-page">
      <Navbar page="checkout" />

      <div className="checkout-page-carousel-container">
        <p>HAVE YOU TRIED OUR...</p>

        {items.length === 5 && (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={10}
            slidesPerView={4}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            loop={true}
            style={{ marginLeft: "20px" }}
          >
            {items.map((item) => (
              <SwiperSlide key={item?.name}>
                <div className="checkout-page-carousel-item">
                  <img src={item?.img} className="checkout-page-carousel-image" alt={item?.name} />
                  <span>
                    <p>{item?.name}</p>
                    <p>{item?.price[0].medium?.toFixed(2)} BGN</p>
                  </span>
                  <span
                    className="checkout-page-carousel-add-to-basket"
                    onClick={() =>
                      handleAddToBasket(
                        item?.name as string,
                        item?.price[0].medium as unknown as string,
                        item?.type as string
                      )
                    }
                  >
                    <img src="/svg/addToBasket.svg" alt="Add to Basket" />
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {itemsInBasket.map((item) => (
        <p key={uuid()}>
          {item.deal ? item.desc : item.name} x {item.quantity}
        </p>
      ))}
    </div>
  );
};
