import React from "react";
import "./Careers.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CareersComponent from "../../components/Careers/CareersComponent";

const Careers: React.FC = () => {
  return (
    <div className="careers-page">
      <Navbar page="careers" />
      <CareersComponent />
      <Footer />
    </div>
  );
};

export default Careers;
