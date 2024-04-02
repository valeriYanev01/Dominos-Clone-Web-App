import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import MenuHeader from "../../components/Menu/Header/MenuHeader";
import ProductsContainer from "../../components/Menu/ProductsContainer/ProductsContainer";
import Navbar from "../../components/Navbar/Navbar";
import "./Menu.css";

type FilterOption = {
  option: string;
};

const Menu: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);

  return (
    <div className="menupage">
      <Navbar page="menu" />
      <MenuHeader setSelectedFilters={setSelectedFilters} />
      <ProductsContainer selectedFilters={selectedFilters} />
      <Footer />
    </div>
  );
};

export default Menu;
