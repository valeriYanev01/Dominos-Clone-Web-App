import Footer from "../../components/Footer/Footer";
import MenuHeader from "../../components/Menu/Header/MenuHeader";
import ProductsContainer from "../../components/Menu/ProductsContainer/ProductsContainer";
import Navbar from "../../components/Navbar/Navbar";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="menupage">
      <Navbar page="menu" />
      <MenuHeader />
      <ProductsContainer />
      <Footer />
    </div>
  );
};

export default Menu;
