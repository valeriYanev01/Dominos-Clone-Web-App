import Footer from "../../components/Footer/Footer";
import MenuHeader from "../../components/Menu/Header/MenuHeader";
import PizzasContainer from "../../components/Menu/PizzasContainer/PizzasContainer";
import Navbar from "../../components/Navbar/Navbar";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="menupage">
      <Navbar page="menu" />
      <MenuHeader />
      <PizzasContainer />
      <Footer />
    </div>
  );
};

export default Menu;
