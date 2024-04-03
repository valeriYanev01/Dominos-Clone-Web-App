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

  const location = useLocation().pathname.split("/")[3];

  console.log(location);

  const filteredProducts = products.filter((product) => {
    return product.type === selectedItem;
  });

  const nestedFilteredProducts = filteredProducts.filter((product) => {
    return selectedFilters.some((filter) => product.filter.includes(filter as unknown as string));
  });

  const vegetarianProducts = products.filter((product) => {
    return selectedFilters.some((filter) => product.filter.includes(filter as unknown as string));
  });

  return (
    <div className="menu-products-container">
      {location === "vegetarian"
        ? vegetarianProducts.length > 0
          ? vegetarianProducts.map(
              (product) =>
                product.filter.includes("Vegetarian") && (
                  <div className="menu-single-product-container" key={product.img}>
                    <SingleProduct product={product} />
                  </div>
                )
            )
          : products.map(
              (product) =>
                product.filter.includes("Vegetarian") && (
                  <div className="menu-single-product-container" key={product.img}>
                    <SingleProduct product={product} />
                  </div>
                )
            )
        : ""}

      {location == "deals" && <MenuDeals />}

      {location !== "vegetairan" && nestedFilteredProducts.length > 0
        ? nestedFilteredProducts.map((product) => (
            <div key={product.img} className="menu-single-product-container">
              <SingleProduct product={product} />
            </div>
          ))
        : filteredProducts.map((product) => (
            <div key={product.img} className="menu-single-product-container">
              <SingleProduct product={product} />
            </div>
          ))}
    </div>
  );
};

export default ProductsContainer;
