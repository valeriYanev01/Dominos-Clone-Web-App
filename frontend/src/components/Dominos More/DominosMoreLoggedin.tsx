import React, { useContext, useEffect, useState } from "react";
import "./DominosMoreLoggedin.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import PizzaMeterComponent from "../Pizza Meter/PizzaMeterComponent";
import { LoginContext } from "../../context/LoginContext";
import axios from "axios";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Grid } from "swiper/modules";

interface Order {
  createdAt: string;
  _id: string;
}

const DominosMoreLoggedin: React.FC = () => {
  const [ordersWithPizza, setOrdersWithPizza] = useState<Order[]>([]);

  const { dominosMorePoints, emailLogin, token } = useContext(LoginContext);

  useEffect(() => {
    const fetchPreviousOrdersWithPizza = async () => {
      const response = await axios.get("http://localhost:3000/api/users/get-orders", {
        params: { email: emailLogin },
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrdersWithPizza(response.data.allOrders.orders);
    };

    if (emailLogin && token) {
      fetchPreviousOrdersWithPizza();
    }
  }, [emailLogin, token]);

  console.log(ordersWithPizza);

  return (
    <div className="dominos-more-in">
      <Navbar page="dominos-more-in" />

      <div className="dm-bg-container-in">
        <div className="dm-content-container-in">
          <div className="dm-content-in">
            <img src="/images/dominos_more.png" className="dm-logo-in" />
            <div className="dm-main-text-in">
              CHECK AT PIZZA METER <span>HOW MANY POINTS</span>
              <br /> YOU HAVE COLLECTED <span>SO FAR,</span>
              <br /> BUT MOSTLY
              <span>HOW MANY MORE YOU NEED</span>
              <br /> <span> FOR THE FREE PIZZA!</span>
              <br />
              <p className="dm-header-text-in">PIZZA METER</p>
              <div>
                <PizzaMeterComponent />
              </div>
              <div className="dm-points-container">
                <p className="dm-points-digits">{dominosMorePoints > 0 && dominosMorePoints}0</p>
                <p className="dm-points-text">POINTS</p>
              </div>
            </div>

            <div className="dm-how-to-redeem">
              <p className="dm-redeem-heading">HOW DO I REDEEM THE FREE PIZZA?</p>
              <div className="dm-redeem-step">
                <img src="/images/more/first-step.png" />
                <p>
                  ADD A <span>MEDIUM</span> PIZZA IN <span>YOUR BASKET</span>.
                </p>
              </div>

              <div className="dm-redeem-step">
                <img src="/images/more/second-step.png" />
                <p>
                  ADD YOUR <span>DOMINO’S MORE COUPON</span> AT CHECKOUT PAGE.
                </p>
              </div>

              <div className="dm-redeem-step">
                <img src="/images/more/third-step.png" />
                <p>
                  YOUR PIZZA IS <span>FREE</span>.
                </p>
              </div>
            </div>

            <div className="dm-refer">
              <div className="dm-refer-content">
                <img src="/images/more/refer-left.png" />
                <div>REFER TO A FRIEND</div>
                <img src="/images/more/refer-right.png" />
              </div>
              <p>GET 10 POINTS EACH</p>
            </div>

            <div className="dm-points-history">
              <p className="dm-points-history-text">POINT HISTORY</p>
              <p className="dm-points-history-desc">
                CHECK YOUR ORDERS <br />
                POINT HISTORY.
              </p>

              {ordersWithPizza && (
                <Swiper
                  modules={[Pagination, Navigation, Grid]}
                  spaceBetween={50}
                  pagination={{ clickable: true }}
                  speed={1000}
                  className="dm-swiper"
                  slidesPerView={2}
                  slidesPerGroup={2}
                  grid={{ rows: 2, fill: "row" }}
                >
                  {ordersWithPizza.map((order) => (
                    <SwiperSlide key={order._id}>
                      <div>
                        <p className="dm-points-digits">10</p>
                        <p className="dm-points-text">POINTS</p>
                      </div>

                      <div>
                        <p className="dm-history-date">
                          {String(new Date(order.createdAt).toLocaleDateString("de-DE")).split(".").join("-")}
                        </p>

                        <p className="dm-history-text">FROM ORDER</p>
                        <p className="dm-history-text">
                          EXPIRATION DATE:{" "}
                          {String(
                            new Date(
                              new Date(order.createdAt).getTime() + 1000 * 60 * 60 * 24 * 30 * 6
                            ).toLocaleDateString("de-DE")
                          )
                            .split(".")
                            .join("-")}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DominosMoreLoggedin;
