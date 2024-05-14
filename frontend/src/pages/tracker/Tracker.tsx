import React, { useEffect, useReducer, useState } from "react";
import "./Tracker.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Heading from "../../components/Heading/Heading";

const reducer = (state: any, action: { type: string }) => {
  switch (action.type) {
    case "path1":
      return {
        ...state,
        path1: "#006FA6",
        text: "Preparing",
      };
    case "path2":
      return {
        ...state,
        path2: "#006FA6",
        text: "Cooking",
      };
    case "path3":
      return {
        ...state,
        path3: "#006FA6",
        text: "Oven",
      };
    case "path4":
      return {
        ...state,
        path4: "#006FA6",
        text: "Checking",
      };
    case "path5":
      return {
        ...state,
        path5: "#006FA6",
        text: "Delivery",
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
  const [currentSecond, setCurrentSecond] = useState(0);

  const [state, dispatch] = useReducer(reducer, {
    text: "START",
    path1: "#f2f4f5",
    path2: "#f2f4f5",
    path3: "#f2f4f5",
    path4: "#f2f4f5",
    path5: "#f2f4f5",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSecond((prevState) => prevState + 1);
    }, 1000);
    if (currentSecond === 5) dispatch({ type: "path1" });
    if (currentSecond === 10) dispatch({ type: "path2" });
    if (currentSecond === 15) dispatch({ type: "path3" });
    if (currentSecond === 20) dispatch({ type: "path4" });
    if (currentSecond === 25) dispatch({ type: "path5" });
    if (currentSecond === 30) dispatch({ type: "path6" });
    return () => clearInterval(interval);
  }, [currentSecond]);

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
              id="piece1"
              fill={state.path6 ? state.path6 : state.path1}
              d="M662,135.3l37.8-47L695.7,35c-48.3-14.9-99.4-23-152.3-23.4v105.9C584.7,117.8,624.4,123.9,662,135.3z"
            ></path>
            <path
              id="piece2"
              fill={state.path6 ? state.path6 : state.path2}
              d="M676.9,140c162.8,56,281.2,208.6,285.7,389.2l47.5,19.7l58.5-21.9C1063.1,301,915,109.6,710.9,39.7l4.1,53.1L676.9,140z"
            ></path>
            <path
              id="piece3"
              fill={state.path6 ? state.path6 : state.path3}
              d="M1068.6,542.5l-58.8,22.1L962.6,545C959.8,775.2,771.9,961.9,541,962.4l-20.8,53l21,52.8C831.3,1067.7,1067.2,832.5,1068.6,542.5z"
            ></path>
            <path
              id="piece4"
              fill={state.path6 ? state.path6 : state.path4}
              d="M525.5,962.2c-108.8-3.8-207.2-48.7-280.1-119.7l-56.1,21.9L166.1,913c92.5,92.8,219.3,151.4,359.4,155.3l-20.8-52.7L525.5,962.2z"
            ></path>
            <path
              id="piece5"
              fill={state.path6 ? state.path6 : state.path5}
              d="M234.1,831.2c-72.3-75.9-116.8-178.5-116.8-291.4c0-229.3,183.5-416.6,411.4-422.4V11.7C242.6,17.6,11.4,252.4,11.4,540c0,139.8,54.7,267.2,143.7,361.7l23.4-48.9L234.1,831.2z"
            ></path>
          </svg>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tracker;
