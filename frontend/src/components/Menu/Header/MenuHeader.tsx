import { useState } from "react";
import "./MenuHeader.css";
import { item } from "../../../types/Menu";

const MenuHeader = ({ selectedItem, setSelectedItem }: item) => {
  const [hoveredItem, setHoveredItem] = useState("");

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

  return (
    <div className="menu-header-container">
      <div className="menu-header">
        <div className="menu-header-item">
          {menuHeaderItems.map((item) =>
            item !== "deals" ? (
              <span
                className="single-menu-header-item"
                onClick={() => setSelectedItem(item)}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem("")}
                key={item}
                style={
                  item === selectedItem
                    ? { backgroundColor: "#0073AA", outline: "2px solid white" }
                    : item === hoveredItem
                    ? { outline: "2px solid white" }
                    : { backgroundColor: "" }
                }
              >
                <img src={`/svg/menu/${item}.svg`} className="single-menu-header-item-icon" />
                <p>{item.toUpperCase()}</p>
              </span>
            ) : (
              <span
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
              </span>
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
            <p>Options</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MenuHeader;
