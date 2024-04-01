import { useContext, useEffect, useState } from "react";
import "./MenuHeader.css";
import { Link, useLocation } from "react-router-dom";
import { MenuContext } from "../../../context/MenuContext";
import { products } from "../../../data/products";

const MenuHeader = () => {
  const [hoveredItem, setHoveredItem] = useState("");
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
  };

  const smthType = new Set();

  const pizzaTypes = new Set();
  const quesadillaTypes = new Set();
  const startersTypes = new Set();
  const chickenTypes = new Set();
  const pastaTypes = new Set();
  const saladTypes = new Set();
  const sandwichTypes = new Set();
  const dipsTypes = new Set();
  const dessertsTypes = new Set();
  const drinksTypes = new Set();

  products.forEach((product) => {
    if (product.type === "pizza") {
      product.filter.forEach((f) => {
        if (f !== "") {
          pizzaTypes.add(f);
        }
      });
    }
    if (product.type === "quesadilla") {
      product.filter.forEach((f) => {
        if (f !== "") {
          quesadillaTypes.add(f);
        }
      });
    }
    if (product.type === "starters") {
      product.filter.forEach((f) => {
        if (f !== "") {
          startersTypes.add(f);
        }
      });
    }
    if (product.type === "chicken") {
      product.filter.forEach((f) => {
        if (f !== "") {
          chickenTypes.add(f);
        }
      });
    }
    if (product.type === "pasta") {
      product.filter.forEach((f) => {
        if (f !== "") {
          pastaTypes.add(f);
        }
      });
    }
    if (product.type === "salad") {
      product.filter.forEach((f) => {
        if (f !== "") {
          saladTypes.add(f);
        }
      });
    }
    if (product.type === "sandwich") {
      product.filter.forEach((f) => {
        if (f !== "") {
          sandwichTypes.add(f);
        }
      });
    }
    if (product.type === "dips") {
      product.filter.forEach((f) => {
        if (f !== "") {
          dipsTypes.add(f);
        }
      });
    }
    if (product.type === "desserts") {
      product.filter.forEach((f) => {
        if (f !== "") {
          dessertsTypes.add(f);
        }
      });
    }
    if (product.type === "drinks") {
      product.filter.forEach((f) => {
        if (f !== "") {
          drinksTypes.add(f);
        }
      });
    }
  });

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

        {selectedItem !== "deals" ? (
          <div
            className="menu-header-options"
            style={
              selectedItem !== "deals"
                ? { paddingTop: "10px", borderTop: "2px solid white" }
                : { paddingTop: "0px", borderTop: "none" }
            }
          >
            {products.map((product) =>
              product.type === location ? (
                <div>
                  {product.filter.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              ) : (
                ""
              )
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MenuHeader;
