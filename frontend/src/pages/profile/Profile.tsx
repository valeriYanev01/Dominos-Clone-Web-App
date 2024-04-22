import React from "react";
import "./Profile.css";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Profile: React.FC = () => {
  return (
    <div className="profile">
      <Navbar page={"profile"} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Profile;
