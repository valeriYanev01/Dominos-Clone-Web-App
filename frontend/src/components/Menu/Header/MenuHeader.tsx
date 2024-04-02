import React, { useContext, useEffect, useState } from "react";
import "./MenuHeader.css";
import { Link, useLocation } from "react-router-dom";
import { MenuContext } from "../../../context/MenuContext";
import { products } from "../../../data/products";

interface SelectedFilters {
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterOption[]>>;
}

type FilterOption = {
  option: string;
};

const MenuHeader: React.FC<SelectedFilters> = ({ setSelectedFilters }) => {
  const [hoveredItem, setHoveredItem] = useState("");
  const [checked, setChecked] = useState<string[]>([]);

  const { selectedItem, setSelectedItem } = useContext(MenuContext);

  useEffect(() => {
    setSelectedItem(location);
  }, [selectedItem]);

  const location = useLocation().pathname.split("/")[2];

  const menuHeaderItems = [
    "deals",
    "pizza",
    "quesadilla",
    "starters",
    "chicken",
    "pasta",
    "salad",
    "sandwich",
    "dips",
    "desserts",
    "drinks",
    "vegetarian",
  ];

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setSelectedFilters([]);
    setChecked([]);
  };

  const menuOptions = new Set();
  const menuVegetarianOptions = new Set();

  products.forEach((product) => {
    if (location !== "vegetarian") {
      if (product.type === location) {
        product.filter.forEach((f) => {
          if (f !== "") {
            menuOptions.add(f);
          }
        });
      }
    } else if (location === "vegetarian") {
      if (product.filter.includes("Vegetarian")) {
        product.filter.map((f) => menuVegetarianOptions.add(f));
      }
    }
  });

  const handleFilters = (option: FilterOption) => {
    setSelectedFilters((prevState) => {
      prevState = prevState || [];

      if (prevState.includes(option)) {
        return prevState.filter((opt) => opt !== option);
      }

      return [...prevState, option];
    });
  };

  const handleChecked = (option: string) => {
    const isChecked = checked.includes(option);

    if (isChecked) {
      setChecked(checked.filter((item) => item !== option));
    } else {
      setChecked([...checked, option]);
    }
  };

  return (
    <div className="menu-header-container">
      <div className="menu-header">
        <div className="menu-header-item">
          {menuHeaderItems.map((item) =>
            item !== "deals" ? (
              <Link
                to={`/menu/${item}`}
                className="single-menu-header-item"
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem("")}
                key={item}
                style={
                  item === selectedItem
                    ? { backgroundColor: "#0073AA", outline: "2px solid white", cursor: "default" }
                    : item === hoveredItem
                    ? { outline: "2px solid white" }
                    : { backgroundColor: "" }
                }
              >
                <img src={`/svg/menu/${item}.svg`} className="single-menu-header-item-icon" />
                <p>{item.toUpperCase()}</p>
                <span className={`${selectedItem === item ? "menu-active" : ""}`}></span>
              </Link>
            ) : (
              <Link
                to="/menu/deals"
                className="single-menu-header-item menu-deals"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem("")}
                onClick={() => setSelectedItem(item)}
                key={item}
                style={
                  item === hoveredItem
                    ? { outline: "2px solid white" }
                    : item === selectedItem
                    ? { outline: "2px solid white" }
                    : { backgroundColor: "" }
                }
              >
                <img src={`/svg/menu/${item}.svg`} className="single-menu-header-item-icon" />
                <p>{item.toUpperCase()}</p>
                <span className={`${selectedItem === item ? "menu-active menu-deals-active" : ""}`}></span>
              </Link>
            )
          )}
        </div>

        {selectedItem !== "deals" && (
          <div
            className="menu-header-options"
            style={
              selectedItem !== "deals" ? { borderTop: "2px solid white" } : { paddingTop: "0px", borderTop: "none" }
            }
          >
            {location !== "vegetarian"
              ? Array.from(menuOptions).map((option, i) => (
                  <div key={i} className="menu-header-single-option">
                    <input
                      type="checkbox"
                      checked={checked.includes(option as string)}
                      id={`menu-option-${i}`}
                      onChange={() => handleChecked(option as string)}
                    />
                    <label
                      htmlFor={`menu-option-${i}`}
                      className={`menu-option-label-${i}`}
                      onClick={() => handleFilters(option as FilterOption)}
                    >
                      {(option as string).toUpperCase()}
                    </label>
                  </div>
                ))
              : Array.from(menuVegetarianOptions).map((option, i) => (
                  <div key={i} className="menu-header-single-option">
                    <input
                      type="checkbox"
                      checked={checked.includes(option as string)}
                      id={`menu-option-${i}`}
                      onChange={() => handleChecked(option as string)}
                    />
                    <label
                      htmlFor={`menu-option-${i}`}
                      className={`menu-option-label-${i}`}
                      onClick={() => handleFilters(option as FilterOption)}
                    >
                      {(option as string).toUpperCase()}
                    </label>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuHeader;
