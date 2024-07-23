import { useLocation } from "react-router-dom";
import "./ProductsContainer.css";
import React, { useContext, useState } from "react";
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
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { selectedItem } = useContext(MenuContext);

  const location = useLocation().pathname.split("/")[3];

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
                    <SingleProduct
                      product={product}
                      setSelectedProduct={setSelectedProduct}
                      selectedProduct={selectedProduct}
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  </div>
                )
            )
          : products.map(
              (product) =>
                product.filter.includes("Vegetarian") && (
                  <div
                    className={`menu-single-product-container ${
                      product.type === "quesadilla" || product.type === "chicken" || product.type === "desserts"
                        ? "menu-single-product-animation"
                        : ""
                    }`}
                    key={product.img}
                  >
                    <SingleProduct
                      product={product}
                      setSelectedProduct={setSelectedProduct}
                      selectedProduct={selectedProduct}
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  </div>
                )
            )
        : ""}

      {location == "deals" && <MenuDeals />}

      {location !== "vegetarian" && nestedFilteredProducts.length > 0
        ? nestedFilteredProducts.map((product) => (
            <div key={product.img} className="menu-single-product-container">
              <SingleProduct
                product={product}
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          ))
        : filteredProducts.map((product) => (
            <div key={product.img} className="menu-single-product-container">
              <SingleProduct
                product={product}
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          ))}
    </div>
  );
};

export default ProductsContainer;
