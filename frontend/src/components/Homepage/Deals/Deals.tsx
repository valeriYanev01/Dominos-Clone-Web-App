import { useContext } from "react";
import "./Deals.css";
import { components } from "../../../data/deals";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ModalContext } from "../../../context/ModalContext";
import { LoginContext } from "../../../context/LoginContext";
import { OrderContext } from "../../../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Deals = () => {
  const { setModalType, setOpenModal } = useContext(ModalContext);
  const { loggedIn } = useContext(LoginContext);
  const { activeTracker } = useContext(OrderContext);

  const navigate = useNavigate();

  const handleShowModal = (type: "delivery" | "carryOut") => {
    setOpenModal(true);
    if (loggedIn) {
      type === "delivery" && setModalType("delivery");
      type === "carryOut" && setModalType("carryOut");
    } else {
      setModalType("login");
    }
  };

  return (
    <Swiper
      className="deals-container"
      modules={[Pagination, Navigation]}
      spaceBetween={25}
      slidesPerView={4}
      pagination
    >
      {components.map((deal) => (
        <div className="deal-item" key={uuid()}>
          <SwiperSlide key={uuid()} className="single-deal-container">
            <img src={deal.headerImg} className="deal-header-img" />
            {deal && <img src="/svg/homepage/deal.svg" className="deal-svg" />}
            <p className="deal-heading">{deal.heading}</p>
            <div className="single-deal-breakline" />
            <p className="deal-desc">{deal.desc}</p>
            <div
              className="deal-btn-container"
              onClick={() => {
                setOpenModal(true);
                setModalType("method");
              }}
            >
              <div className="deal-btn">GET THIS DEAL</div>
            </div>
            <div
              className={`${
                deal.method.carryOut && deal.method.delivery
                  ? "deal-method-container-space-around"
                  : "deal-method-container "
              }`}
            >
              <div
                className="deal-method"
                onClick={() => {
                  if (!activeTracker) {
                    handleShowModal("delivery");
                  } else {
                    navigate("/tracker");
                  }
                }}
              >
                {deal.method.delivery ? (
                  <>
                    <img src="/svg/delivery.svg" className="deal-delivery-svg" />
                    <p className="deal-method-type">{deal.method.delivery}</p>
                  </>
                ) : null}
              </div>
              <div
                className="deal-method"
                onClick={() => {
                  if (!activeTracker) {
                    handleShowModal("carryOut");
                  } else {
                    navigate("/tracker");
                  }
                }}
              >
                {deal.method.carryOut ? (
                  <>
                    <img src="/svg/carryOut.svg" className="deal-delivery-svg" />
                    <p className="deal-method-type">{deal.method.carryOut}</p>
                  </>
                ) : null}
              </div>
            </div>
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  );
};

export default Deals;
