import React, { useContext, useEffect } from "react";
import { ModalContext } from "../../../context/ModalContext";
import "./SingleProduct.css";
import { LoginContext } from "../../../context/LoginContext";
import { OrderContext } from "../../../context/OrderContext";

interface Props {
  product: {
    type: string;
    name: string;
    desc: string;
    img: string;
    bigImg?: string;
    filter: string[];
    price: [{ medium: []; large: []; jumbo: [] }];
  };
  selectedProduct: string;
  setSelectedProduct: React.Dispatch<React.SetStateAction<string>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const SingleProduct: React.FC<Props> = ({ product, selectedProduct, setSelectedProduct, quantity, setQuantity }) => {
  const { setModalType, setOpenModal, setProduct, product: productType } = useContext(ModalContext);
  const { loggedIn } = useContext(LoginContext);
  const { setItemsInBasket } = useContext(OrderContext);

  useEffect(() => {
    setOpenModal(
      productType[4] === "pizza" ||
        productType[4] === "pasta" ||
        productType[4] === "salad" ||
        productType[4] === "sandwich"
        ? true
        : false
    );
  }, [productType, setOpenModal]);

  const showAdditionalMenu = () => {
    if (
      product.type !== "pizza" &&
      product.type !== "pasta" &&
      product.type !== "salad" &&
      product.type !== "sandwich"
    ) {
      setSelectedProduct(product.name);

      if (selectedProduct === product.name) {
        setSelectedProduct("");
      }
    }
  };

  const handleAddToBasket = () => {
    if (loggedIn === false) {
      setModalType("login");
    } else {
      setItemsInBasket((prevState) => [
        ...prevState,
        {
          name: product.name,
          price: String(product.price[0].medium),
          quantity: quantity,
          type: product.type,
        },
      ]);
      setProduct([]);
      setSelectedProduct("");
      setQuantity(1);
    }
  };

  return (
    <div
      key={product.name}
      onClick={() => {
        setModalType("product");
        setProduct([product.name, product.img, product.desc, product.bigImg || "", product.type]);
      }}
    >
      <div
        className="menu-spc-title-container"
        onClick={() => {
          setQuantity(1);
          showAdditionalMenu();
        }}
      >
        <p className="menu-spc-title">{product.name}</p>
      </div>
      <img
        onClick={() => {
          setQuantity(1);
          showAdditionalMenu();
        }}
        src={product.img}
        className={`menu-spc-img ${product.type === "drinks" ? "menu-spc-drinks-img" : ""}`}
      />

      {selectedProduct !== product.name ? (
        <div>
          <p
            onClick={() => {
              setQuantity(1);
              showAdditionalMenu();
            }}
            className={`menu-spc-desc ${product.type === "drinks" ? "menu-spc-drinks-desc" : ""}`}
          >
            {product.desc}
          </p>
          {product.filter[0] !== "" ? (
            <div className="menu-spc-filter" key={product.img}>
              {product.filter.map((f, i) =>
                f === "Vegetarian" ? (
                  <img src="/svg/menu/filterVegetarian.svg" className="menu-filter-svg" key={i} />
                ) : f === "Spicy" ? (
                  <img src="/svg/menu/filterSpicy.svg" className="menu-filter-svg" key={i} />
                ) : f === "New" ? (
                  <img src="/svg/menu/filterNew.svg" className="menu-filter-svg" key={i} />
                ) : f === "Fasting" ? (
                  <img src="/svg/menu/filterFasting.svg" className="menu-filter-svg" key={i} />
                ) : f === "Premium" ? (
                  <img src="/svg/menu/filterPremium.svg" className="menu-filter-svg" key={i} />
                ) : (
                  ""
                )
              )}
            </div>
          ) : (
            <div className="menu-spc-filter">
              {/* to match the height for all items without filters */}
              <span></span>
            </div>
          )}
          <button
            className="menu-spc-btn"
            onClick={() => {
              setQuantity(1);
              showAdditionalMenu();
            }}
          >
            CHOOSE
          </button>
        </div>
      ) : (
        <div className="menu-spc-other-details-container">
          <div className="menu-spc-other-details">
            <div className="menu-spc-other-quantity">
              <p>QUANTITY</p>

              <div className="navigation-basket-price-container">
                <span
                  onClick={() => {
                    if (quantity < 2) {
                      return;
                    } else {
                      setQuantity(quantity - 1);
                    }
                  }}
                  className={`navigation-basket-quantity-control
                        ${quantity < 2 ? "navigation-basket-decrease-quantity-disabled" : ""}`}
                >
                  {quantity < 2 ? (
                    <img src="/svg/basket/minus-disabled.svg" className="navigation-basket-quantity-control-img" />
                  ) : (
                    <img src="/svg/basket/minus.svg" className="navigation-basket-quantity-control-img" />
                  )}
                </span>
                <span className="navigation-basket-quantity-text">{quantity}</span>
                <span onClick={() => setQuantity(quantity + 1)} className="navigation-basket-quantity-control">
                  <img src="/svg/basket/plus.svg" className="navigation-basket-quantity-control-img" />
                </span>
              </div>
            </div>
            <div className="menu-spc-other-price">
              <p>PRICE</p>
              <p>{parseFloat(String((product.price[0].medium as unknown as number) * quantity)).toFixed(2)} BGN</p>
            </div>
          </div>
          <button className="menu-spc-btn" onClick={handleAddToBasket}>
            PROCEED
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
