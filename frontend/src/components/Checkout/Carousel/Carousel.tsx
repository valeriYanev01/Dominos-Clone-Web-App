import React, { useContext } from "react";
import { ModalContext } from "../../../context/ModalContext";
import { LoginContext } from "../../../context/LoginContext";
import { products } from "../../../data/products";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { BasketItem, OrderContext } from "../../../context/OrderContext";
import "./Carousel.css";
import { MobileContext } from "../../../context/MobileContext";

const Carousel: React.FC = () => {
  const { setModalType, setOpenModal } = useContext(ModalContext);
  const { loggedIn } = useContext(LoginContext);
  const { setItemsInBasket } = useContext(OrderContext);
  const { isMobile } = useContext(MobileContext);

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
    <div className="checkout-page-carousel-container">
      <p className="checkout-page-carousel-heading">HAVE YOU TRIED OUR...</p>

      {items.length === 5 && (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={isMobile ? 1 : 4}
          autoplay={{ delay: 2000, disableOnInteraction: true }}
          loop={true}
          style={{ marginLeft: "20px" }}
          speed={2000}
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
  );
};

export default Carousel;
