import "./MenuHeader.css";

const MenuHeader = () => {
  const menuHeaderItems = [
    "deals",
    "pizzas",
    "quesadillas",
    "starters",
    "chicken",
    "pasta",
    "salads",
    "sandwich",
    "dips",
    "desserts",
    "drinks",
    "vegetarian",
  ];
  return (
    <div className="menu-header">
      <div className="menu-header-item">
        {menuHeaderItems.map((item) => (
          <span className="single-menu-header-item">
            <img src={`/svg/menu/${item}.svg`} className="single-menu-header-item-icon" />
            <p>{item.toUpperCase()}</p>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MenuHeader;
