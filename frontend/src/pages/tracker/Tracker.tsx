import React from "react";
import "./Tracker.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import TrackerComponent from "../../components/Tracker/TrackerComponent";

const Tracker: React.FC = () => {
  return (
    <div className="tracker">
      <Navbar page="tracker" />
      <TrackerComponent />

      <Footer />
    </div>
  );
};

export default Tracker;
