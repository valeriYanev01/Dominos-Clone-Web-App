import React, { useContext, useEffect, useReducer, useState } from "react";
import "./Tracker.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Heading from "../../components/Heading/Heading";
import { OrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: any, action: { type: string }) => {
  switch (action.type) {
    case "path1":
      return {
        ...state,
        path1: "#006FA6",
        text: "We received your order",
      };
    case "path2":
      return {
        ...state,
        path2: "#006FA6",
        text: "Your order is being prepared",
      };
    case "path3":
      return {
        ...state,
        path3: "#006FA6",
        text: "The products are in the oven. It takes 5-7 minutes",
      };
    case "path4":
      return {
        ...state,
        path4: "#006FA6",
        text: "We are checking the quality of the products",
      };
    case "path5":
      return {
        ...state,
        path5: "#006FA6",
        text: "Your order is being delivered",
      };
    case "path6":
      return {
        ...state,
        path6: "#609e29",
        text: "Delivered!",
      };
    default:
      return state;
  }
};

const Tracker: React.FC = () => {
  const [currentSecond, setCurrentSecond] = useState(new Date().getTime());
  const [activePath, setActivePath] = useState("");

  const [state, dispatch] = useReducer(reducer, {
    text: "START",
    path1: "#f2f4f5",
    path2: "#f2f4f5",
    path3: "#f2f4f5",
    path4: "#f2f4f5",
    path5: "#f2f4f5",
  });

  const { activeTracker } = useContext(OrderContext);
  const { setOpenModal, setModalType } = useContext(ModalContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      activeTracker ||
      (localStorage.getItem("active-tracker") &&
        JSON.parse(localStorage.getItem("active-tracker") as string).active === true)
    ) {
      let finishTime;
      let startTime;

      if (localStorage.getItem("active-tracker")) {
        finishTime = JSON.parse(localStorage.getItem("active-tracker") as string).finish;
        startTime = JSON.parse(localStorage.getItem("active-tracker") as string).start;
      }

      const now = new Date().getTime();
      const timeToDelivery = finishTime - startTime;

      const interval = setInterval(() => {
        setCurrentSecond(currentSecond + 1000);
      }, 1000);

      if (now >= startTime + timeToDelivery - 1000 * 60 * 30) {
        dispatch({ type: "path1" });
        setActivePath("path1");
      } else {
        // if its ordered for more than 30 minutes
        dispatch({ type: "path1" });
        setActivePath("path1");
      }
      if (now >= startTime + timeToDelivery - 1000 * 60 * 28) {
        dispatch({ type: "path2" });
        setActivePath("path2");
      }
      if (now >= startTime + timeToDelivery - 1000 * 60 * 22) {
        dispatch({ type: "path3" });
        setActivePath("path3");
      }
      if (now >= startTime + timeToDelivery - 1000 * 60 * 17) {
        dispatch({ type: "path4" });
        setActivePath("path4");
      }
      if (now >= startTime + timeToDelivery - 1000 * 60 * 10) {
        dispatch({ type: "path5" });
        setActivePath("path5");
      }
      if (now >= startTime + timeToDelivery) {
        dispatch({ type: "path6" });
        setActivePath("");
      }
      if (now >= startTime + timeToDelivery + 1) {
        localStorage.setItem("active-tracker", JSON.stringify({ active: false }));
        navigate("/");
        window.location.reload();
      }

      return () => clearInterval(interval);
    }
  }, [activeTracker, currentSecond, navigate]);

  return (
    <div className="tracker">
      <Navbar page="tracker" />
      <div className="tracker-body">
        <Heading text="PIZZA TRACKER: TRACK YOUR ORDER REAL-TIME!" />

        <div className="tracker-svg-container">
          <div className="tracker-svg-text">
            <p>|</p>
            <p>{state.text}</p>
          </div>
          <div className="tracker-circle-container">
            <svg
              version="1.1"
              baseProfile="tiny"
              className="tracker-circle no-order"
              data-step="0"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 1080 1080"
            >
              <path
                className={`${activePath === "path1" ? "tracker-path-animation" : ""}`}
                id="piece1"
                fill={state.path6 ? state.path6 : state.path1}
                d="M662,135.3l37.8-47L695.7,35c-48.3-14.9-99.4-23-152.3-23.4v105.9C584.7,117.8,624.4,123.9,662,135.3z"
              ></path>
              <path
                className={`${activePath === "path2" ? "tracker-path-animation" : ""}`}
                id="piece2"
                fill={state.path6 ? state.path6 : state.path2}
                d="M676.9,140c162.8,56,281.2,208.6,285.7,389.2l47.5,19.7l58.5-21.9C1063.1,301,915,109.6,710.9,39.7l4.1,53.1L676.9,140z"
              ></path>
              <path
                className={`${activePath === "path3" ? "tracker-path-animation" : ""}`}
                id="piece3"
                fill={state.path6 ? state.path6 : state.path3}
                d="M1068.6,542.5l-58.8,22.1L962.6,545C959.8,775.2,771.9,961.9,541,962.4l-20.8,53l21,52.8C831.3,1067.7,1067.2,832.5,1068.6,542.5z"
              ></path>
              <path
                className={`${activePath === "path4" ? "tracker-path-animation" : ""}`}
                id="piece4"
                fill={state.path6 ? state.path6 : state.path4}
                d="M525.5,962.2c-108.8-3.8-207.2-48.7-280.1-119.7l-56.1,21.9L166.1,913c92.5,92.8,219.3,151.4,359.4,155.3l-20.8-52.7L525.5,962.2z"
              ></path>
              <path
                className={`${activePath === "path5" ? "tracker-path-animation" : ""}`}
                id="piece5"
                fill={state.path6 ? state.path6 : state.path5}
                d="M234.1,831.2c-72.3-75.9-116.8-178.5-116.8-291.4c0-229.3,183.5-416.6,411.4-422.4V11.7C242.6,17.6,11.4,252.4,11.4,540c0,139.8,54.7,267.2,143.7,361.7l23.4-48.9L234.1,831.2z"
              ></path>
            </svg>
            {(localStorage.getItem("active-tracker") &&
              !JSON.parse(localStorage.getItem("active-tracker") as string).active) ||
              (activeTracker === false && (
                <div className="tracker-new-order">
                  <div>
                    <p className="tracker-new-order-text">You don't have an active order.</p>
                    <br />
                    <span
                      onClick={() => {
                        setOpenModal(true);
                        setModalType("method");
                      }}
                      className="tracker-new-order-btn"
                    >
                      ORDER
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tracker;
