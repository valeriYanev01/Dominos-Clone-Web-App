import React from "react";
import "./Tracker.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Heading from "../../components/Heading/Heading";

const Tracker: React.FC = () => {
  return (
    <div className="tracker">
      <Navbar page="tracker" />
      <div className="tracker-body">
        <Heading text="PIZZA TRACKER: TRACK YOUR ORDER REAL-TIME!" />
      </div>
      <Footer />
    </div>
  );
};

export default Tracker;
