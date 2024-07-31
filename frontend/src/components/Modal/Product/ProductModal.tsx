import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./ProductModal.css";
import { ModalContext } from "../../../context/ModalContext";
import SinglePizzaSize from "./SinglePizzaSize";
import { products } from "../../../data/products";
import { allToppings } from "../../../data/toppings";
import { LoginContext } from "../../../context/LoginContext";
import PizzaQuantity from "./PizzaQuantity";
import OtherProductsQuantity from "./OtherProductsQuantity";
import HalfAndHalfPizzaQuantity from "./HalfAndHalfPizzaQuantity";

interface Product {
  type: string;
  name: string;
  desc: string;
  img: string;
  bigImg?: string;
  filter: string[];
  price: {
    medium?: number;
    large?: number;
    jumbo?: number;
  }[];
}

const ProductModal: React.FC = () => {
  const [size, setSize] = useState("Medium");
  const [selectedCrust, setSelectedCrust] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    type: "",
    name: "",
    desc: "",
    img: "",
    bigImg: "",
    filter: [],
    price: [{ medium: 0 }, { large: 0 }, { jumbo: 0 }],
  });
  const [weigh, setWeigh] = useState(385);
  const [showEditPizzaToppings, setShowEditPizzaToppings] = useState(false);
  const [price, setPrice] = useState(0);
  const [modifiedToppings, setModifiedToppings] = useState<string[]>([]);
  const [addToppings, setAddToppings] = useState<string[]>([]);
  const [removeToppings, setRemoveToppings] = useState<string[]>([]);

  const defaultHalfAndHalfPizza = "Make Your Own!";
  const [firstHalf, setFirstHalf] = useState(defaultHalfAndHalfPizza);
  const [secondHalf, setSecondHalf] = useState(defaultHalfAndHalfPizza);
  const [firstHalfToppings, setFirstHalfToppings] = useState<string[]>([]);
  const [secondHalfToppings, setSecondHalfToppings] = useState<string[]>([]);
  const [firstHalfModifiedToppings, setFirstHalfModifiedToppings] = useState<string[]>([]);
  const [secondHalfModifiedToppings, setSecondHalfModifiedToppings] = useState<string[]>([]);
  const [showEditFirstHalfPizzaToppings, setShowEditFirstHalfPizzaToppings] = useState(false);
  const [showEditSecondHalfPizzaToppings, setShowEditSecondHalfPizzaToppings] = useState(false);
  const [halfAndHalfFirstSelectedProduct, setHalfAndHalfFirstSelectedProduct] = useState<Product>({
    type: "",
    name: "",
    desc: "",
    img: "",
    bigImg: "",
    filter: [],
    price: [{ medium: 0 }, { large: 0 }, { jumbo: 0 }],
  });
  const [halfAndHalfSecondSelectedProduct, setHalfAndHalfSecondSelectedProduct] = useState<Product>({
    type: "",
    name: "",
    desc: "",
    img: "",
    bigImg: "",
    filter: [],
    price: [{ medium: 0 }, { large: 0 }, { jumbo: 0 }],
  });
  const [firstHalfPrice, setFirstHalfPrice] = useState(0);
  const [secondHalfPrice, setSecondHalfPrice] = useState(0);
  const [firstHalfAddedToppings, setFirstHalfAddedToppings] = useState<string[]>([]);
  const [firstHalfRemovedToppings, setFirstHalfRemovedToppings] = useState<string[]>([]);
  const [secondHalfRemovedToppings, setSecondHalfRemovedToppings] = useState<string[]>([]);
  const [secondHalfAddedToppings, setSecondHalfAddedToppings] = useState<string[]>([]);

  const { product } = useContext(ModalContext);
  const { loggedIn } = useContext(LoginContext);

  const premiumPizzaWeigh = 570;

  const name = product[0];
  const img = product[3];
  const desc = product[2];

  const toppings = desc.split(", ");

  useEffect(() => {
    setModifiedToppings(toppings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFirstHalfModifiedToppings(firstHalfToppings);
  }, [firstHalfToppings]);

  useEffect(() => {
    setSecondHalfModifiedToppings(secondHalfToppings);
  }, [secondHalfToppings]);

  useEffect(() => {
    products.map((p) => {
      if (p.name === product[0]) {
        setSelectedProduct(p);
      }
    });
  }, [product, selectedProduct]);

  useEffect(() => {
    const newAddedToppingsSet = new Set<string>();
    let newAddedToppings = [] as string[];

    const newRemovedToppingsSet = new Set<string>();
    let newRemovedToppings = [] as string[];

    let currentProductToppings = [] as string[];

    products.forEach((product) => {
      if (product.name === name) {
        currentProductToppings = product.desc.split(", ");
      }
    });

    modifiedToppings.forEach((topping) => {
      if (!currentProductToppings.includes(topping)) {
        newAddedToppingsSet.add(topping);
      }
    });

    currentProductToppings.forEach((topping) => {
      if (!modifiedToppings.includes(topping)) {
        newRemovedToppingsSet.add(topping);
      }
    });

    newAddedToppings = Array.from(newAddedToppingsSet);
    newRemovedToppings = Array.from(newRemovedToppingsSet);

    setRemoveToppings(newRemovedToppings);
    setAddToppings(newAddedToppings);
  }, [modifiedToppings, name]);

  useEffect(() => {
    if (firstHalfModifiedToppings.length > 0) {
      const newAddedToppingsSet = new Set<string>();
      let newAddedToppings = [] as string[];

      const newRemovedToppingsSet = new Set<string>();
      let newRemovedToppings = [] as string[];

      let currentProductToppings = [] as string[];

      products.forEach((product) => {
        if (product.name === firstHalf) {
          currentProductToppings = product.desc.split(", ");
        }
      });

      firstHalfModifiedToppings.forEach((topping) => {
        if (!currentProductToppings.includes(topping)) {
          newAddedToppingsSet.add(topping);
        }
      });

      currentProductToppings.forEach((topping) => {
        if (!firstHalfModifiedToppings.includes(topping)) {
          newRemovedToppingsSet.add(topping);
          console.log(newRemovedToppingsSet);
        }
      });

      newAddedToppings = Array.from(newAddedToppingsSet);
      newRemovedToppings = Array.from(newRemovedToppingsSet);

      setFirstHalfRemovedToppings(newRemovedToppings);
      setFirstHalfAddedToppings(newAddedToppings);
    }
  }, [firstHalf, firstHalfModifiedToppings]);

  useEffect(() => {
    if (secondHalfModifiedToppings.length > 0) {
      const newAddedToppingsSet = new Set<string>();
      let newAddedToppings = [] as string[];

      const newRemovedToppingsSet = new Set<string>();
      let newRemovedToppings = [] as string[];

      let currentProductToppings = [] as string[];

      products.forEach((product) => {
        if (product.name === secondHalf) {
          currentProductToppings = product.desc.split(", ");
        }
      });

      secondHalfModifiedToppings.forEach((topping) => {
        if (!currentProductToppings.includes(topping)) {
          newAddedToppingsSet.add(topping);
        }
      });

      currentProductToppings.forEach((topping) => {
        if (!secondHalfModifiedToppings.includes(topping)) {
          newRemovedToppingsSet.add(topping);
        }
      });

      newAddedToppings = Array.from(newAddedToppingsSet);
      newRemovedToppings = Array.from(newRemovedToppingsSet);

      setSecondHalfRemovedToppings(newRemovedToppings);
      setSecondHalfAddedToppings(newAddedToppings);
    }
  }, [secondHalf, secondHalfModifiedToppings]);

  useEffect(() => {
    if (firstHalf.length > 0) {
      products.forEach((product) => {
        if (product.name === firstHalf) {
          setHalfAndHalfFirstSelectedProduct(product);
        }
      });
    }
  }, [firstHalf]);

  useEffect(() => {
    if (selectedProduct.name === "Half and Half") {
      if (selectedCrust === 3 || selectedCrust === 4 || selectedCrust === 5) {
        setPrice(firstHalfPrice + secondHalfPrice + 2.5);
      } else {
        setPrice(firstHalfPrice + secondHalfPrice);
      }
    }
  }, [firstHalfPrice, secondHalfPrice, selectedCrust, selectedProduct.name]);

  useEffect(() => {
    if (selectedProduct.name === "Half and Half") {
      if (firstHalf.length > 0) {
        products.forEach((product) => {
          if (product.name === firstHalf) {
            setHalfAndHalfFirstSelectedProduct(product);

            if (size === "Medium") {
              const tempPrice = halfAndHalfFirstSelectedProduct.price[0].medium;
              if (tempPrice) {
                setFirstHalfPrice(tempPrice / 2);
              }
            } else if (size === "Large") {
              const tempPrice = halfAndHalfFirstSelectedProduct.price[1].large;
              if (tempPrice) {
                setFirstHalfPrice(tempPrice / 2);
              }
            } else {
              const tempPrice = halfAndHalfFirstSelectedProduct.price[2].jumbo;
              if (tempPrice) {
                setFirstHalfPrice(tempPrice / 2);
              }
            }
          }
        });
      }
    }
  }, [firstHalf, halfAndHalfFirstSelectedProduct.price, selectedProduct.name, size]);

  useEffect(() => {
    if (selectedProduct.name === "Half and Half") {
      if (secondHalf.length > 0) {
        products.forEach((product) => {
          if (product.name === secondHalf) {
            setHalfAndHalfSecondSelectedProduct(product);

            if (size === "Medium") {
              const tempPrice = halfAndHalfSecondSelectedProduct.price[0].medium;
              if (tempPrice) {
                setSecondHalfPrice(tempPrice / 2);
              }
            } else if (size === "Large") {
              const tempPrice = halfAndHalfSecondSelectedProduct.price[1].large;
              if (tempPrice) {
                setSecondHalfPrice(tempPrice / 2);
              }
            } else {
              const tempPrice = halfAndHalfSecondSelectedProduct.price[2].jumbo;
              if (tempPrice) {
                setSecondHalfPrice(tempPrice / 2);
              }
            }
          }
        });
      }
    }
  }, [halfAndHalfSecondSelectedProduct.price, secondHalf, selectedProduct.name, size]);

  const finalPizzaProduct = {
    name: name,
    size: product[4] === "pizza" ? size : "",
    crust:
      product[4] === "pizza"
        ? size === "Medium"
          ? selectedCrust === 0
            ? "Hand Tossed"
            : selectedCrust === 1
            ? "Italian Style"
            : selectedCrust === 2
            ? "Gluten Free"
            : ""
          : size === "Large"
          ? selectedCrust === 0
            ? "Hand Tossed"
            : selectedCrust === 1
            ? "Italian Style"
            : selectedCrust === 2
            ? "Thin Crust"
            : selectedCrust === 3
            ? "With Philadelphia"
            : selectedCrust === 4
            ? "With Mozzarella"
            : selectedCrust === 5
            ? "With Pepperoni"
            : ""
          : size === "Jumbo"
          ? selectedCrust === 0
            ? "Hand Tossed"
            : selectedCrust === 1
            ? "Italian Style"
            : ""
          : ""
        : "",
    toppings: modifiedToppings,
    removedToppings: removeToppings,
    addedToppings: addToppings,
    quantity: quantity,
    price: price.toFixed(2),
    type: product[4],
  };

  const handTossed = {
    title: `Hand Tossed | ∅ ${size === "Medium" ? "25" : size === "Large" ? "30" : size === "Jumbo" ? "38" : ""}cm`,
    desc: "Our Traditional dough",
    img: "/images/menu/pizzaOptions/hand-tossed.png",
    weigh: size === "Medium" ? 385 : size === "Large" ? 570 : size === "Jumbo" ? 800 : 0,
  };

  const italianStyle = {
    title: `Italian Style | ∅ ${size === "Medium" ? "25" : size === "Large" ? "30" : size === "Jumbo" ? "38" : ""}cm`,
    desc: "Thin Italian Style dough",
    img: "/images/menu/pizzaOptions/italian.png",
    weigh: size === "Medium" ? 250 : size === "Large" ? 425 : size === "Jumbo" ? 700 : 0,
  };

  const glutenFree = {
    title: "Medium Gluten Free",
    desc: "Gluten Free Dough (+ 3,10BGN)",
    img: "/images/menu/pizzaOptions/hand-tossed.png",
    weigh: size === "Medium" ? 350 : size === "Large" ? 0 : size === "Jumbo" ? 0 : 0,
  };

  const thinCrust = {
    title: "Thin Crust | ∅ 30cm",
    desc: "Thin & Crispy dough",
    img: "/images/menu/pizzaOptions/thin.png",
    weigh: size === "Medium" ? 0 : size === "Large" ? 390 : size === "Jumbo" ? 0 : 0,
  };

  const philadelphia = {
    title: "With Philadelphia (+2.50BGN)",
    desc: "Fresh dough stuffed with Philadelphia cream cheese (+2,50BGN)",
    img: "/images/menu/pizzaOptions/philadelphia.png",
    weigh: size === "Medium" ? 0 : size === "Large" ? 630 : size === "Jumbo" ? 0 : 0,
  };

  const mozzarella = {
    title: "With mozzarella (+2,50 BGN)",
    desc: "Hand-tossed dough with mozzarella stuffed crust (+2,50 BGN)",
    img: "/images/menu/pizzaOptions/mozzarella.png",
    weigh: size === "Medium" ? 0 : size === "Large" ? 630 : size === "Jumbo" ? 0 : 0,
  };

  const pepperoni = {
    title: "With pepperoni (+2,50 BGN)",
    desc: "Hand-tossed dough with pepperoni stuffed crust (+2,50 BGN)",
    img: "/images/menu/pizzaOptions/pepperoni.png",
    weigh: size === "Medium" ? 0 : size === "Large" ? 630 : size === "Jumbo" ? 0 : 0,
  };

  const productOptions = {
    medium: [handTossed, italianStyle, glutenFree],
    large: [handTossed, italianStyle, thinCrust, philadelphia, mozzarella, pepperoni],
    jumbo: [handTossed, italianStyle],
  };

  const handlePizzaSize = (size: string) => {
    setSize(size);
    setQuantity(1);
    setSelectedCrust(0);
    setWeigh(size === "Medium" ? 385 : size === "Large" ? 570 : size === "Jumbo" ? 800 : 0);
  };

  const handleSelectedCrust = (index: number) => {
    setSelectedCrust(index);
  };

  const handleChangeToppings = (topping: string, checked: boolean) => {
    if (checked === true) {
      if (modifiedToppings.length >= toppings.length) {
        if (size === "Medium") {
          setPrice((price) => price + 1.5 * quantity);
        }
        if (size === "Large") {
          setPrice((price) => price + 2 * quantity);
        }
        if (size === "Jumbo") {
          setPrice((price) => price + 2.5 * quantity);
        }
      }
    } else {
      if (modifiedToppings.length > toppings.length) {
        if (size === "Medium") {
          setPrice((price) => price - 1.5 * quantity);
        }
        if (size === "Large") {
          setPrice((price) => price - 2 * quantity);
        }
        if (size === "Jumbo") {
          setPrice((price) => price - 2.5 * quantity);
        }
      }
    }

    const newToppings = [...modifiedToppings];
    const toppingIndex = newToppings.indexOf(topping);

    if (toppingIndex === -1) {
      newToppings.push(topping);
    } else {
      newToppings.splice(toppingIndex, 1);

      if (!topping.includes("Extra")) {
        const extraToppingIndex = newToppings.findIndex((t) => t.includes("Extra") && t.includes(topping));
        if (extraToppingIndex !== -1) {
          newToppings.splice(extraToppingIndex, 1);
        }
      }
    }

    setModifiedToppings(newToppings);
  };

  const handleChangeFirstHalfToppings = (topping: string, checked: boolean) => {
    if (showEditSecondHalfPizzaToppings) {
      setShowEditSecondHalfPizzaToppings(false);
    }

    if (checked === true) {
      if (firstHalfModifiedToppings.length >= firstHalfToppings.length) {
        if (size === "Medium") {
          setPrice((price) => price + 0.75);
        }
        if (size === "Large") {
          setPrice((price) => price + 1);
        }
        if (size === "Jumbo") {
          setPrice((price) => price + 1.25);
        }
      }
    } else {
      if (firstHalfModifiedToppings.length > firstHalfToppings.length) {
        if (size === "Medium") {
          setPrice((price) => price - 0.75);
        }
        if (size === "Large") {
          setPrice((price) => price - 1);
        }
        if (size === "Jumbo") {
          setPrice((price) => price - 1.25);
        }
      }
    }

    const newToppings = [...firstHalfModifiedToppings];
    const toppingIndex = newToppings.indexOf(topping);

    if (toppingIndex === -1) {
      newToppings.push(topping);
    } else {
      newToppings.splice(toppingIndex, 1);

      if (!topping.includes("Extra")) {
        const extraToppingIndex = newToppings.findIndex((t) => t.includes("Extra") && t.includes(topping));
        if (extraToppingIndex !== -1) {
          newToppings.splice(extraToppingIndex, 1);
        }
      }
    }

    setFirstHalfModifiedToppings(newToppings);
  };

  const handleChangeSecondHalfToppings = (topping: string, checked: boolean) => {
    if (checked === true) {
      if (secondHalfModifiedToppings.length >= secondHalfToppings.length) {
        if (size === "Medium") {
          setPrice((price) => price + 0.75);
        }
        if (size === "Large") {
          setPrice((price) => price + 1);
        }
        if (size === "Jumbo") {
          setPrice((price) => price + 1.25);
        }
      }
    } else {
      if (secondHalfModifiedToppings.length > secondHalfToppings.length) {
        if (size === "Medium") {
          setPrice((price) => price - 0.75);
        }
        if (size === "Large") {
          setPrice((price) => price - 1);
        }
        if (size === "Jumbo") {
          setPrice((price) => price - 1.25);
        }
      }
    }

    const newToppings = [...secondHalfModifiedToppings];
    const toppingIndex = newToppings.indexOf(topping);

    if (toppingIndex === -1) {
      newToppings.push(topping);
    } else {
      newToppings.splice(toppingIndex, 1);

      if (!topping.includes("Extra")) {
        const extraToppingIndex = newToppings.findIndex((t) => t.includes("Extra") && t.includes(topping));
        if (extraToppingIndex !== -1) {
          newToppings.splice(extraToppingIndex, 1);
        }
      }
    }

    setSecondHalfModifiedToppings(newToppings);
  };

  const handleDefault = () => {
    setModifiedToppings(toppings);
    if (size === "Medium") {
      if (selectedCrust === 2) {
        setPrice((Number(selectedProduct.price[0].medium) + 3.1) * quantity);
      } else {
        setPrice(Number(selectedProduct.price[0].medium) * quantity);
      }
    }
    if (size === "Large") {
      if (selectedProduct?.price[1]?.large) {
        if (selectedCrust === 3 || selectedCrust === 4 || selectedCrust === 5) {
          setPrice((Number(selectedProduct.price[1].large) + 2.5) * quantity);
        } else {
          setPrice(Number(selectedProduct.price[1].large) * quantity);
        }
      } else {
        if (selectedCrust === 3 || selectedCrust === 4 || selectedCrust === 5) {
          setPrice((Number(selectedProduct.price[0].large) + 2.5) * quantity);
        } else {
          setPrice(Number(selectedProduct.price[0].large) * quantity);
        }
      }
    }
    if (size === "Jumbo") {
      setPrice(Number(selectedProduct.price[2].jumbo) * quantity);
    }
  };

  const handleDefaultFirstHalf = () => {
    setFirstHalfModifiedToppings(firstHalfToppings);

    if (size === "Medium") {
      const firstPrice = halfAndHalfFirstSelectedProduct.price[0].medium;
      const secondPrice = halfAndHalfSecondSelectedProduct.price[0].medium;

      if (firstPrice && secondPrice) {
        if (selectedCrust === 2) {
          setPrice((Number(firstPrice / 2 + secondPrice / 2) + 3.1) * quantity);
        } else {
          setPrice(Number(firstPrice / 2 + secondPrice / 2) * quantity);
        }
      }
    }
    if (size === "Large") {
      const firstPrice = halfAndHalfFirstSelectedProduct.price[1].large;
      const secondPrice = halfAndHalfSecondSelectedProduct.price[1].large;

      if (firstPrice && secondPrice) {
        if (selectedCrust === 3 || selectedCrust === 4 || selectedCrust === 5) {
          setPrice((Number(firstPrice / 2 + secondPrice / 2) + 2.5) * quantity);
        } else {
          setPrice(Number(firstPrice / 2 + secondPrice / 2) * quantity);
        }
      }
    }
    if (size === "Jumbo") {
      const firstPrice = halfAndHalfFirstSelectedProduct.price[2].jumbo;
      const secondPrice = halfAndHalfSecondSelectedProduct.price[2].jumbo;

      if (firstPrice && secondPrice) {
        setPrice(Number(firstPrice / 2 + secondPrice / 2) * quantity);
      }
    }
  };

  const handleDefaultSecondHalf = () => {
    setSecondHalfModifiedToppings(secondHalfToppings);

    if (size === "Medium") {
      const firstPrice = halfAndHalfFirstSelectedProduct.price[0].medium;
      const secondPrice = halfAndHalfSecondSelectedProduct.price[0].medium;

      if (firstPrice && secondPrice) {
        if (selectedCrust === 2) {
          setPrice((Number(firstPrice / 2 + secondPrice / 2) + 3.1) * quantity);
        } else {
          setPrice(Number(firstPrice / 2 + secondPrice / 2) * quantity);
        }
      }
    }
    if (size === "Large") {
      const firstPrice = halfAndHalfFirstSelectedProduct.price[1].large;
      const secondPrice = halfAndHalfSecondSelectedProduct.price[1].large;

      if (firstPrice && secondPrice) {
        if (selectedCrust === 3 || selectedCrust === 4 || selectedCrust === 5) {
          setPrice((Number(firstPrice / 2 + secondPrice / 2) + 2.5) * quantity);
        } else {
          setPrice(Number(firstPrice / 2 + secondPrice / 2) * quantity);
        }
      }
    }
    if (size === "Jumbo") {
      const firstPrice = halfAndHalfFirstSelectedProduct.price[2].jumbo;
      const secondPrice = halfAndHalfSecondSelectedProduct.price[2].jumbo;

      if (firstPrice && secondPrice) {
        setPrice(Number(firstPrice / 2 + secondPrice / 2) * quantity);
      }
    }
  };

  useEffect(() => {
    products.forEach((product) => {
      if (product.name === firstHalf) {
        setFirstHalfToppings(product.desc.split(", "));
      }
    });
  }, [firstHalf]);

  useEffect(() => {
    products.forEach((product) => {
      if (product.name === secondHalf) {
        setSecondHalfToppings(product.desc.split(", "));
      }
    });
  }, [secondHalf]);

  const handleHalfAndHalfCrustChange = (crust: string) => {
    setSelectedCrust(0);

    if (size === "Medium") {
      if (crust.includes("Hand")) {
        setSelectedCrust(0);
      } else if (crust.includes("Italian")) {
        setSelectedCrust(1);
      } else {
        setSelectedCrust(2);
      }
    } else if (size === "Large") {
      if (crust.includes("Hand")) {
        setSelectedCrust(0);
      } else if (crust.includes("Italian")) {
        setSelectedCrust(1);
      } else if (crust.includes("Thin")) {
        setSelectedCrust(2);
      } else if (crust.includes("Philadelphia")) {
        setSelectedCrust(3);
      } else if (crust.includes("mozzarella")) {
        setSelectedCrust(4);
      } else {
        setSelectedCrust(5);
      }
    } else if (size === "Jumbo") {
      if (crust.includes("Hand")) {
        setSelectedCrust(0);
      } else {
        setSelectedCrust(1);
      }
    }
  };

  return (
    <div className="product-modal-container">
      <div className="pm-heading-container">
        <div
          className={`pm-heading-image ${
            selectedProduct.type === "pizza" ? "pm-heading-image-pizza" : "pm-heading-image-other"
          }`}
        >
          <img
            src={img}
            className={`pm-heading-image-img ${
              selectedProduct.type === "pizza" ? "pm-heading-image-img-pizza" : "pm-heading-image-img-other"
            }`}
          />
        </div>

        <div
          className={`pm-info-container ${
            selectedProduct.type === "pizza" ? "pm-info-container-pizza" : "pm-info-container-other"
          }`}
        >
          <div className="pm-name-container">
            <img src="/svg/decorLeftRed.svg" className="deal-decor" />
            <p>{name}</p>
            <img src="/svg/decorRightRed.svg" className="deal-decor" />
          </div>

          {/* ----------------PIZZA-------------------- */}
          {selectedProduct.type === "pizza" && product[0] !== "Half and Half" ? (
            <>
              <div className="pm-options-container">
                {/* for premium pizzas */}
                {selectedProduct.name === "Pulled Beef" ||
                selectedProduct.name === "Pizza Milano" ||
                selectedProduct.name === "Pizza Parma" ? (
                  <div
                    onLoad={() => {
                      setWeigh(premiumPizzaWeigh);
                      setSize("Large");
                    }}
                    className={`pm-options ${size === "Large" ? "active-option" : ""}`}
                    onClick={() => handlePizzaSize("Large")}
                  >
                    <img src="/svg/menu/pizzaOptions/large.svg" />
                    <p>Large</p>
                  </div>
                ) : (
                  <>
                    <div
                      className={`pm-options ${size === "Medium" ? "active-option" : ""}`}
                      onClick={() => handlePizzaSize("Medium")}
                    >
                      <img src="/svg/menu/pizzaOptions/medium.svg" />
                      <p>Medium</p>
                    </div>

                    <div
                      className={`pm-options ${size === "Large" ? "active-option" : ""}`}
                      onClick={() => handlePizzaSize("Large")}
                    >
                      <img src="/svg/menu/pizzaOptions/large.svg" />
                      <p>Large</p>
                    </div>

                    <div
                      className={`pm-options ${size === "Jumbo" ? "active-option" : ""}`}
                      onClick={() => handlePizzaSize("Jumbo")}
                    >
                      <img src="/svg/menu/pizzaOptions/jumbo.svg" />
                      <p>Jumbo</p>
                    </div>
                  </>
                )}
              </div>

              <div className="pm-pizza-crust-container">
                {size === "Medium"
                  ? productOptions.medium.map((crust, index) => (
                      <div key={uuid()} onClick={() => setWeigh(crust.weigh)}>
                        <SinglePizzaSize
                          crust={crust}
                          isSelected={selectedCrust === index}
                          handleSelectedCrust={() => handleSelectedCrust(index)}
                        />
                      </div>
                    ))
                  : size === "Large"
                  ? !selectedProduct.price[0].large
                    ? productOptions.large.map((crust, index) => (
                        <div key={uuid()} onClick={() => setWeigh(crust.weigh)}>
                          <SinglePizzaSize
                            crust={crust}
                            isSelected={selectedCrust === index}
                            handleSelectedCrust={() => handleSelectedCrust(index)}
                          />
                        </div>
                      ))
                    : // for promo pizzas where they don't have size other than large and base crust
                      productOptions.large
                        .filter((crust) => crust.weigh === 570)
                        .map((crust, index) => (
                          <div key={uuid()} onClick={() => setWeigh(crust.weigh)}>
                            <SinglePizzaSize
                              crust={crust}
                              isSelected={selectedCrust === index}
                              handleSelectedCrust={() => handleSelectedCrust(index)}
                            />
                          </div>
                        ))
                  : size === "Jumbo"
                  ? productOptions.jumbo.map((crust, index) => (
                      <div key={uuid()} onClick={() => setWeigh(crust.weigh)}>
                        <SinglePizzaSize
                          crust={crust}
                          isSelected={selectedCrust === index}
                          handleSelectedCrust={() => handleSelectedCrust(index)}
                        />
                      </div>
                    ))
                  : ""}
              </div>
            </>
          ) : (
            <div className="half-and-half-pizza-container">
              {/* For half and half pizza */}
              <div className="hah-size-crust-container">
                <div className="hah-size">
                  <p>SIZE</p>
                  <select
                    onChange={(e) => {
                      setSelectedCrust(0);
                      setSize(e.target.value);
                    }}
                  >
                    <option value="Medium">Medium (6 Slices)</option>
                    <option value="Large">Large (8 Slices)</option>
                    <option value="Jumbo">Jumbo (12 Slices)</option>
                  </select>
                </div>

                <div className="hah-crust">
                  <p>CRUST</p>
                  <select onChange={(e) => handleHalfAndHalfCrustChange(e.target.value)}>
                    {size === "Medium"
                      ? productOptions.medium.map((crust) => <option>{crust.title}</option>)
                      : size === "Large"
                      ? productOptions.large.map((crust) => <option>{crust.title}</option>)
                      : size === "Jumbo"
                      ? productOptions.jumbo.map((crust) => <option>{crust.title}</option>)
                      : ""}
                  </select>
                </div>
              </div>

              <div className="hah-products-container">
                <div key={uuid()} className="hah-first-product">
                  <p className="hah-product-heading">1</p>

                  <p>PRODUCT</p>
                  <select
                    onChange={(e) => {
                      setFirstHalf(e.target.value);
                    }}
                    key={uuid()}
                    value={firstHalf}
                  >
                    {products
                      .filter(
                        (p) =>
                          p.type === "pizza" &&
                          p.name !== "Half and Half" &&
                          p.name !== "Pulled Beef" &&
                          p.name !== "Pizza Parma" &&
                          p.name !== "Pizza Milano"
                      )
                      .map((product) => (
                        <option key={uuid()}>{product.name}</option>
                      ))}
                  </select>

                  <div className="pm-desc">
                    <div className="pm-toppings-btn">
                      <p className="edit-toppings-text">TOPPINGS</p>
                      {loggedIn && (
                        <div className="logged-topping-container">
                          <div className="toppings-default" onClick={handleDefaultFirstHalf}>
                            DEFAULT
                          </div>
                          <div
                            className="edit-toppings-container"
                            onClick={() => {
                              if (showEditSecondHalfPizzaToppings) {
                                setTimeout(() => {
                                  setShowEditFirstHalfPizzaToppings(true);
                                }, 500);
                                setShowEditSecondHalfPizzaToppings(false);
                              } else {
                                setShowEditFirstHalfPizzaToppings(!showEditFirstHalfPizzaToppings);
                              }
                            }}
                          >
                            <span
                              className="edit-toppings-btn"
                              onClick={() =>
                                setFirstHalfModifiedToppings(
                                  firstHalfModifiedToppings.length > 0 ? firstHalfModifiedToppings : firstHalfToppings
                                )
                              }
                            >
                              <img src="/svg/menu/pizzaOptions/edit.svg" className="edit-toppings-img" />
                              <p>CUSTOMIZE</p>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <p>
                      {firstHalfModifiedToppings.length > 0
                        ? firstHalfModifiedToppings.join(", ")
                        : firstHalfToppings.join(", ")}
                    </p>
                  </div>
                </div>

                <div key={uuid()} className="hah-second-product">
                  <p className="hah-product-heading">2</p>

                  <p>PRODUCT</p>
                  <select
                    onChange={(e) => {
                      setSecondHalf(e.target.value);
                    }}
                    key={uuid()}
                    value={secondHalf}
                  >
                    {products
                      .filter(
                        (p) =>
                          p.type === "pizza" &&
                          p.name !== "Half and Half" &&
                          p.name !== "Pulled Beef" &&
                          p.name !== "Pizza Parma" &&
                          p.name !== "Pizza Milano"
                      )
                      .map((product) => (
                        <option key={uuid()}>{product.name}</option>
                      ))}
                  </select>
                  <div className="pm-desc">
                    <div className="pm-toppings-btn">
                      <p className="edit-toppings-text">TOPPINGS</p>
                      {loggedIn && (
                        <div className="logged-topping-container">
                          <div className="toppings-default" onClick={handleDefaultSecondHalf}>
                            DEFAULT
                          </div>
                          <div
                            className="edit-toppings-container"
                            onClick={() => {
                              if (showEditFirstHalfPizzaToppings) {
                                setTimeout(() => {
                                  setShowEditSecondHalfPizzaToppings(true);
                                }, 500);
                                setShowEditFirstHalfPizzaToppings(false);
                              } else {
                                setShowEditSecondHalfPizzaToppings(!showEditSecondHalfPizzaToppings);
                              }
                            }}
                          >
                            <span
                              className="edit-toppings-btn"
                              onClick={() =>
                                setSecondHalfModifiedToppings(
                                  secondHalfModifiedToppings.length > 0
                                    ? secondHalfModifiedToppings
                                    : secondHalfToppings
                                )
                              }
                            >
                              <img src="/svg/menu/pizzaOptions/edit.svg" className="edit-toppings-img" />
                              <p>CUSTOMIZE</p>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <p>
                      {secondHalfModifiedToppings.length > 0
                        ? secondHalfModifiedToppings.join(", ")
                        : secondHalfToppings.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pm-order-container">
                <HalfAndHalfPizzaQuantity
                  quantity={quantity}
                  setQuantity={setQuantity}
                  firstHalf={firstHalf}
                  secondHalf={secondHalf}
                  size={size}
                  weigh={size === "Medium" ? 385 : size === "Large" ? 570 : size === "Jumbo" ? 800 : 0}
                  price={price}
                  crust={selectedCrust}
                  halfAndHalfFirstSelectedProduct={halfAndHalfFirstSelectedProduct}
                  halfAndHalfSecondSelectedProduct={halfAndHalfSecondSelectedProduct}
                  firstHalfAddedToppings={firstHalfAddedToppings}
                  firstHalfRemovedToppings={firstHalfRemovedToppings}
                  secondHalfRemovedToppings={secondHalfRemovedToppings}
                  secondHalfAddedToppings={secondHalfAddedToppings}
                />
              </div>
            </div>
          )}
          {/* ----------------PIZZA END-------------------- */}

          {product[0] !== "Half and Half" ? (
            <div className="pm-desc-container">
              <div className="pm-desc">
                <div className="pm-toppings-btn">
                  <p className="edit-toppings-text">TOPPINGS</p>
                  {loggedIn && (
                    <div className="logged-topping-container">
                      <div className="toppings-default" onClick={handleDefault}>
                        DEFAULT
                      </div>
                      <div
                        className="edit-toppings-container"
                        onClick={() => {
                          setShowEditPizzaToppings(!showEditPizzaToppings);
                        }}
                      >
                        <span
                          className="edit-toppings-btn"
                          onClick={() => setModifiedToppings(modifiedToppings.length > 0 ? modifiedToppings : toppings)}
                        >
                          <img src="/svg/menu/pizzaOptions/edit.svg" className="edit-toppings-img" />
                          <p>CUSTOMIZE</p>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <p>{modifiedToppings.length > 0 ? modifiedToppings.join(", ") : desc.split("")}</p>
              </div>

              {selectedProduct.type === "pizza" ? (
                <div className="pm-order-container">
                  <PizzaQuantity
                    quantity={quantity}
                    selectedProduct={selectedProduct}
                    setQuantity={setQuantity}
                    size={size}
                    selectedCrust={selectedCrust}
                    weigh={weigh}
                    price={price}
                    setPrice={setPrice}
                    toppings={toppings}
                    modifiedToppings={modifiedToppings}
                    finalPizzaProduct={finalPizzaProduct}
                  />
                </div>
              ) : (
                // For other products that need the modal but don't have crust or size
                <div className="pm-order-container">
                  <OtherProductsQuantity
                    quantity={quantity}
                    setQuantity={setQuantity}
                    price={price}
                    modifiedToppings={modifiedToppings}
                    selectedProduct={selectedProduct}
                    setPrice={setPrice}
                    toppings={toppings}
                    weigh={weigh}
                    finalPizzaProduct={finalPizzaProduct}
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              <div>
                <div></div>
                <div></div>
              </div>

              <div></div>
            </div>
          )}
        </div>
      </div>

      {showEditPizzaToppings && (
        <div className="toppings-container">
          {allToppings.map((topping) => (
            <div key={uuid()} className="all-toppings">
              <h3 className="topping-name">{topping.name}</h3>
              {topping.toppings.map((t, i) => (
                <div key={uuid()} className="topping">
                  <input
                    type="checkbox"
                    id={`${uuid()}`}
                    checked={modifiedToppings.includes(t)}
                    onChange={(e) => {
                      handleChangeToppings(t, e.target.checked);
                    }}
                  />
                  <label htmlFor={`${uuid()}`}>{t}</label>
                  {modifiedToppings.includes(t) && (
                    <div className="additional-topping">
                      <input
                        type="checkbox"
                        id={`${i}-additional ${uuid()}`}
                        checked={modifiedToppings.includes(`Extra ${t}`)}
                        onChange={(e) => handleChangeToppings(`Extra ${t}`, e.target.checked)}
                      />
                      <label htmlFor={`${i}-additional ${uuid()}`}>Extra {t}</label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {showEditFirstHalfPizzaToppings && (
        <>
          <p>FIRST HALF - {firstHalf}</p>

          <div className="toppings-container">
            {allToppings.map((topping) => (
              <div key={uuid()} className="all-toppings">
                <h3 className="topping-name">{topping.name}</h3>
                {topping.toppings.map((t, i) => (
                  <div key={uuid()} className="topping">
                    <input
                      type="checkbox"
                      id={`${uuid()}`}
                      checked={firstHalfModifiedToppings.length > 0 && firstHalfModifiedToppings.includes(t)}
                      onChange={(e) => {
                        handleChangeFirstHalfToppings(t, e.target.checked);
                      }}
                    />
                    <label htmlFor={`${uuid()}`}>{t}</label>
                    {firstHalfModifiedToppings.includes(t) && (
                      <div className="additional-topping">
                        <input
                          type="checkbox"
                          id={`${i}-additional ${uuid()}`}
                          checked={firstHalfModifiedToppings.includes(`Extra ${t}`)}
                          onChange={(e) => handleChangeFirstHalfToppings(`Extra ${t}`, e.target.checked)}
                        />
                        <label htmlFor={`${i}-additional ${uuid()}`}>Extra {t}</label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {showEditSecondHalfPizzaToppings && (
        <>
          <p>SECOND HALF - {secondHalf}</p>
          <div className="toppings-container">
            {allToppings.map((topping) => (
              <div key={uuid()} className="all-toppings">
                <h3 className="topping-name">{topping.name}</h3>
                {topping.toppings.map((t, i) => (
                  <div key={uuid()} className="topping">
                    <input
                      type="checkbox"
                      id={`${uuid()}`}
                      checked={secondHalfModifiedToppings.length > 0 && secondHalfModifiedToppings.includes(t)}
                      onChange={(e) => {
                        handleChangeSecondHalfToppings(t, e.target.checked);
                      }}
                    />
                    <label htmlFor={`${uuid()}`}>{t}</label>
                    {secondHalfModifiedToppings.includes(t) && (
                      <div className="additional-topping">
                        <input
                          type="checkbox"
                          id={`${i}-additional ${uuid()}`}
                          checked={secondHalfModifiedToppings.includes(`Extra ${t}`)}
                          onChange={(e) => handleChangeSecondHalfToppings(`Extra ${t}`, e.target.checked)}
                        />
                        <label htmlFor={`${i}-additional ${uuid()}`}>Extra {t}</label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductModal;
