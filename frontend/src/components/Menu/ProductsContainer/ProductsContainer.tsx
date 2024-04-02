import { useLocation } from "react-router-dom";
import "./ProductsContainer.css";
import React, { useContext } from "react";
import { MenuContext } from "../../../context/MenuContext";
import MenuDeals from "./MenuDeals";
import { products } from "../../../data/products";
import SingleProduct from "./SingleProduct";

type FilterOption = {
  option: string;
};

interface SelectedFilters {
  selectedFilters: FilterOption[];
}

const ProductsContainer: React.FC<SelectedFilters> = ({ selectedFilters }) => {
  const { selectedItem } = useContext(MenuContext);

  const location = useLocation().pathname.split("/")[2];

  const filteredProducts = products.filter((product) => {
    return product.type === selectedItem;
  });

  const nestedFilteredProducts = filteredProducts.filter((product) => {
    return selectedFilters.some((filter) => product.filter.includes(filter));
  });

  console.log(nestedFilteredProducts);

  return (
    <div className="menu-products-container">
      {location == "deals" && <MenuDeals />}
      {nestedFilteredProducts.length > 0
        ? nestedFilteredProducts.map((product) => (
            <div key={product.desc}>
              <SingleProduct product={product} />
            </div>
          ))
        : filteredProducts.map((product) => (
            <div key={product.desc}>
              <SingleProduct product={product} />
            </div>
          ))}
    </div>
  );
};

export default ProductsContainer;
