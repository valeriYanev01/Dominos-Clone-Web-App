import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import MenuHeader from "../../components/Menu/Header/MenuHeader";
import PizzasContainer from "../../components/Menu/PizzasContainer/PizzasContainer";
import Navbar from "../../components/Navbar/Navbar";
import "./Menu.css";

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <div className="menupage">
      <Navbar page="menu" />
      <MenuHeader selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <PizzasContainer selectedItem={selectedItem} />
      <Footer />
    </div>
  );
};

export default Menu;
