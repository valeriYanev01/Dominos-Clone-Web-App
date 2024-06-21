import React, { useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import "./DealModal.css";
import { ModalContext } from "../../../context/ModalContext";
import Heading from "../../Heading/Heading";
import { products } from "../../../data/products";
import { BasketItem, OrderContext } from "../../../context/OrderContext";
import { LoginContext } from "../../../context/LoginContext";
import { allToppings } from "../../../data/toppings";

interface Pizza {
  number: number;
  size: string;
  type: string;
}

interface Starter {
  number: number;
}

interface Chicken {
  number: number;
}

interface Pasta {
  number: number;
}

interface Drink {
  number: number;
  size: string;
  type: string;
}

interface Dessert {
  number: number;
  type: string;
}

interface Products {
  pizza?: Pizza;
  starters?: Starter;
  chicken?: Chicken;
  pasta?: Pasta;
  drinks?: Drink;
  desserts?: Dessert;
}

interface Deal {
  deal: Array<{
    name: string;
    crust?: string;
    quantity: number;
    toppings?: string[];
    removedToppings?: string[];
    addedToppings?: string[];
  }>;
  price: string;
  desc: string;
}

const DealModal: React.FC = () => {
  const [pizza, setPizza] = useState<Pizza>({ number: 0, size: "", type: "" });
  const [starters, setstarters] = useState<Starter>({ number: 0 });
  const [chicken, setChicken] = useState<Chicken>({ number: 0 });
  const [pasta, setPasta] = useState<Pasta>({ number: 0 });
  const [drinks, setDrinks] = useState<Drink>({ number: 0, size: "", type: "" });
  const [desserts, setDesserts] = useState<Dessert>({ number: 0, type: "" });
  const [dealProducts, setDealProducts] = useState<Products[]>([]);
  const [selectedPizzas, setSelectedPizzas] = useState<string[]>([]);
  const [selectedCrust, setSelectedCrust] = useState<string[]>([]);
  const [toppings, setToppings] = useState<string[][]>([]);
  const [selectedChicken, setSelectedChicken] = useState<string[]>([]);
  const [selectedDesserts, setSelectedDesserts] = useState<string[]>([]);
  const [selectedPastas, setSelectedPastas] = useState<string[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [selectedStarters, setSelectedStarters] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [pizzaIndex, setPizzaIndex] = useState(0);
  const [finalDeal, setFinalDeal] = useState<BasketItem>();
  const [showEditPizzaToppings, setShowEditPizzaToppings] = useState(false);

  const { deal, setOpenModal, setModalType } = useContext(ModalContext);
  const { setItemsInBasket, modifiedToppings, setModifiedToppings } = useContext(OrderContext);
  const { loggedIn } = useContext(LoginContext);

  const indexes = deal.products || 0;

  const crusts = useMemo(
    () => ({
      medium: ["Medium Hand Tossed", "Medium Italian Style", "Medium Gluten Free"],
      large: [
        "Large Hand Tossed",
        "Large Italian Style",
        "Large Thin Crust",
        "Large With Philadelphia (+2.50 BGN)",
        "Large With Mozzarella (+2.50 BGN)",
      ],
      jumbo: ["Large Hand Tossed", "Large Italian Style"],
    }),
    []
  );

  useEffect(() => {
    setPrice(deal.price);
  }, [deal.price]);

  useEffect(() => {
    if (selectedCrust.length > 0) {
      if (selectedCrust[0].includes("Medium")) {
        setSize("Medium");
      } else if (selectedCrust[0].includes("Large")) {
        setSize("Large");
      } else {
        setSize("Jumbo");
      }
    }
  }, [selectedCrust]);

  useEffect(() => {
    deal.steps.forEach((step) => {
      if ("pizza" in step) {
        setPizza(step.pizza);
      }
      if ("starters" in step) {
        setstarters(step.starters);
      }
      if ("chicken" in step) {
        setChicken(step.chicken);
      }
      if ("pasta" in step) {
        setPasta(step.pasta);
      }
      if ("drinks" in step) {
        setDrinks(step.drinks);
      }
      if ("desserts" in step) {
        setDesserts(step.desserts);
      }
    });
  }, [deal]);

  useEffect(() => {
    const products = [];

    if (pizza.number > 0) {
      products.push({ pizza });
    }
    if (starters.number > 0) {
      products.push({ starters });
    }
    if (chicken.number > 0) {
      products.push({ chicken });
    }
    if (pasta.number > 0) {
      products.push({ pasta });
    }
    if (drinks.number > 0) {
      products.push({ drinks });
    }
    if (desserts.number > 0) {
      products.push({ desserts });
    }
    setDealProducts(products);
  }, [pizza, starters, chicken, pasta, drinks, desserts]);

  useEffect(() => {
    const newToppings = [...toppings];
    for (let i = 0; i < indexes; i++) {
      products.forEach((product) => {
        if (product.name === selectedPizzas[i]) {
          newToppings[i] = product.desc.split(", ");
        }
      });
    }
    setToppings(newToppings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexes, selectedPizzas]);

  useEffect(() => {
    const newToppings = [...toppings];
    for (let i = 0; i < indexes; i++) {
      products.forEach((product) => {
        if (product.name === selectedPizzas[i]) {
          newToppings[i] = product.desc.split(", ");
        }
      });
    }
    setModifiedToppings(newToppings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexes, selectedPizzas]);

  useEffect(() => {
    setModifiedToppings(toppings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const final: Deal = { deal: [], price: "", desc: "" };

    const pizzas = [...selectedPizzas];
    const chicken = [...selectedChicken];
    const pastas = [...selectedPastas];
    const drinks = [...selectedDrinks];
    const starters = [...selectedStarters];
    const desserts = [...selectedDesserts];

    const tempToppings = [];

    for (let i = 0; i < indexes; i++) {
      if (pizzas.length > 0) {
        const pizza = pizzas.shift();

        const toppings = products
          .map((product) => {
            if (product.name === pizza) {
              return product.desc;
            }
          })
          .filter((t) => t !== undefined);

        tempToppings[i] = toppings;

        const newAddedToppingsSet = new Set<string>();
        let newAddedToppings = [] as string[];

        const newRemovedToppingsSet = new Set<string>();
        let newRemovedToppings = [] as string[];

        let currentProductToppings = [] as string[];

        products.forEach((product) => {
          if (product.name === pizza) {
            currentProductToppings = product.desc.split(", ");
          }
        });

        modifiedToppings[i] &&
          modifiedToppings[i].forEach((topping) => {
            if (!currentProductToppings.includes(topping)) {
              newAddedToppingsSet.add(topping);
            }
          });

        modifiedToppings[i] &&
          currentProductToppings.forEach((topping) => {
            if (!modifiedToppings[i].includes(topping)) {
              newRemovedToppingsSet.add(topping);
            }
          });

        newAddedToppings = Array.from(newAddedToppingsSet);
        newRemovedToppings = Array.from(newRemovedToppingsSet);

        if (pizza) {
          final.deal.push({
            name: pizza,
            crust: selectedCrust[i],
            quantity: 1,
            toppings: modifiedToppings[i],
            addedToppings: newAddedToppings,
            removedToppings: newRemovedToppings,
          });
        }
      } else if (chicken.length > 0) {
        const newChicken = chicken.shift();
        if (newChicken) {
          final.deal.push({ name: newChicken, quantity: 1 });
        }
      } else if (pastas.length > 0) {
        const pasta = pastas.shift();
        if (pasta) {
          final.deal.push({ name: pasta, quantity: 1 });
        }
      } else if (drinks.length > 0) {
        const drink = drinks.shift();
        if (drink) {
          final.deal.push({ name: drink, quantity: 1 });
        }
      } else if (starters.length > 0) {
        const starter = starters.shift();
        if (starter) {
          final.deal.push({ name: starter, quantity: 1 });
        }
      } else if (desserts.length > 0) {
        const dessert = desserts.shift();
        if (dessert) {
          final.deal.push({ name: dessert, quantity: 1 });
        }
      }
    }

    final.price = String(Number(price).toFixed(2));
    final.desc = deal.desc;

    // If the pizzas are the same with the same toppings, remove all but 1,
    // and on the one that is left, increase the quantity with how many are removed.
    for (let i = 0; i < final.deal.length; i++) {
      for (let j = i + 1; j < final.deal.length; j++) {
        if (
          final.deal[i].name === final.deal[j].name &&
          JSON.stringify(final.deal[i].toppings) === JSON.stringify(final.deal[j].toppings)
        ) {
          final.deal[j].quantity += 1;
          final.deal.splice(i, 1);
          j--;
        }
      }
    }

    setFinalDeal(final);
  }, [
    indexes,
    selectedChicken,
    selectedDesserts,
    selectedDrinks,
    selectedPastas,
    selectedPizzas,
    selectedStarters,
    selectedCrust,
    deal.price,
    deal.desc,
    modifiedToppings,
  ]);

  // Default values for the modal
  useEffect(() => {
    const pizzas = [] as string[];
    const pizzaCrusts = [] as string[];
    const starters = [] as string[];
    const chicken = [] as string[];
    const pastas = [] as string[];
    const drinks = [] as string[];
    const desserts = [] as string[];

    dealProducts.forEach((product) => {
      if (product.pizza) {
        for (let i = 0; i < product.pizza.number; i++) {
          products.map((p) => {
            if (p.type === "pizza" && p.name.includes("Margarita")) {
              pizzas.push(p.name);
            }
            if (product.pizza?.size === "Medium") {
              pizzaCrusts.push(crusts.medium[0]);
            } else if (product.pizza?.size === "Large") {
              pizzaCrusts.push(crusts.large[0]);
            } else if (product.pizza?.size === "Jumbo") {
              pizzaCrusts.push(crusts.jumbo[0]);
            }
          });
        }
      } else if (product.starters) {
        for (let i = 0; i < product.starters.number; i++) {
          products.map((p) => {
            if (p.type === "starter" && p.name.includes("Cheesy Bread")) {
              starters.push(p.name);
            }
          });
        }
      } else if (product.chicken) {
        for (let i = 0; i < product.chicken?.number; i++) {
          products.map((p) => {
            if (p.type === "chicken" && p.name.includes("Strippers")) {
              chicken.push(p.name);
            }
          });
        }
      } else if (product.pasta) {
        for (let i = 0; i < product.pasta.number; i++) {
          products.map((p) => {
            if (p.type === "pasta" && p.name.includes("Carbonara")) {
              pastas.push(p.name);
            }
          });
        }
      } else if (product.drinks) {
        for (let i = 0; i < product.drinks.number; i++) {
          if (product.drinks.type === "coke") {
            products.map((p) => {
              if (p.type === "drinks" && p.name.includes("Zero")) {
                drinks.push(p.name);
              }
            });
          } else if (product.drinks.type === "beer") {
            products.map((p) => {
              if (p.type === "drinks" && p.name.includes("Carls")) {
                drinks.push(p.name);
              }
            });
          }
        }
      } else if (product.desserts) {
        for (let i = 0; i < product.desserts.number; i++) {
          products.map((p) => {
            if (p.type === "desserts") {
              if (product.desserts?.type === "icecream") {
                if (p.name.includes("Nirvana Pralines")) {
                  desserts.push(p.name);
                }
              } else if (product.desserts?.type === "choco pie") {
                if (p.name.includes("Choco Pie")) {
                  desserts.push(p.name);
                }
              }
            }
          });
        }
      }
    });

    pizzas.forEach((pizza, i) => handlePizzaChange(i, pizza));
    pizzaCrusts.forEach((crust, i) => handleCrustChange(i, crust));
    starters.forEach((starter, i) => handleStarterChange(i, starter));
    chicken.forEach((chicken, i) => handleChickenChange(i, chicken));
    pastas.forEach((pasta, i) => handlePastaChange(i, pasta));
    drinks.forEach((drink, i) => handleDrinkChange(i, drink));
    desserts.forEach((dessert, i) => handleDessertChange(i, dessert));
  }, [crusts.jumbo, crusts.large, crusts.medium, dealProducts]);

  const handlePizzaChange = (index: number, value: string) => {
    setSelectedPizzas((prevPizzas) => {
      const pizzas = [...prevPizzas];
      pizzas[index] = value;
      return pizzas;
    });
  };

  const handleCrustChange = (index: number, value: string) => {
    setSelectedCrust((prevCrusts) => {
      const crusts = [...prevCrusts];
      crusts[index] = value;
      return crusts;
    });
  };

  const handleStarterChange = (index: number, value: string) => {
    setSelectedStarters((prevStarters) => {
      const starters = [...prevStarters];
      starters[index] = value;
      return starters;
    });
  };

  const handleChickenChange = (index: number, value: string) => {
    setSelectedChicken((prevChicken) => {
      const chickens = [...prevChicken];
      chickens[index] = value;
      return chickens;
    });
  };

  const handlePastaChange = (index: number, value: string) => {
    setSelectedPastas((prevPastas) => {
      const pastas = [...prevPastas];
      pastas[index] = value;
      return pastas;
    });
  };

  const handleDrinkChange = (index: number, value: string) => {
    setSelectedDrinks((prevDrinks) => {
      const drinks = [...prevDrinks];
      drinks[index] = value;
      return drinks;
    });
  };

  const handleDessertChange = (index: number, value: string) => {
    setSelectedDesserts((prevDesserts) => {
      const desserts = [...prevDesserts];
      desserts[index] = value;
      return desserts;
    });
  };

  const handleAddToBasket = () => {
    if (loggedIn === false) {
      setModalType("login");
    } else {
      if (finalDeal) {
        setItemsInBasket((prevState) => {
          return [...prevState, finalDeal];
        });
      }
      setModalType("");
      setOpenModal(false);
    }
  };

  const handleChangeToppings = (topping: string, checked: boolean) => {
    console.log(size);
    if (checked === true) {
      if (modifiedToppings[pizzaIndex].length >= toppings[pizzaIndex].length) {
        if (size === "Medium") {
          setPrice((price) => String(Number(price) + 1.5));
        }
        if (size === "Large") {
          setPrice((price) => String(Number(price) + 2));
        }
        if (size === "Jumbo") {
          setPrice((price) => String(Number(price) + 2.5));
        }
      }
    } else {
      if (modifiedToppings[pizzaIndex].length > toppings[pizzaIndex].length) {
        if (size === "Medium") {
          setPrice((price) => String(Number(price) - 1.5));
        }
        if (size === "Large") {
          setPrice((price) => String(Number(price) - 2));
        }
        if (size === "Jumbo") {
          setPrice((price) => String(Number(price) - 2.5));
        }
      }
    }

    const newToppings = [...modifiedToppings];
    const toppingIndex = newToppings[pizzaIndex].indexOf(topping);

    if (toppingIndex === -1) {
      newToppings[pizzaIndex].push(topping);
    } else {
      newToppings[pizzaIndex].splice(toppingIndex, 1);

      if (!topping.includes("Extra")) {
        const extraToppingIndex = newToppings[pizzaIndex].findIndex((t) => t.includes("Extra") && t.includes(topping));
        if (extraToppingIndex !== -1) {
          newToppings[pizzaIndex].splice(extraToppingIndex, 1);
        }
      }
    }

    setModifiedToppings(newToppings);
  };

  const handleShowEditPizzaToppings = (i: number) => {
    setShowEditPizzaToppings(!showEditPizzaToppings);
    setPizzaIndex(i);
  };

  const handleDefault = (i: number) => {
    const newToppings = [...modifiedToppings.map((t) => [...t])];
    newToppings[i] = [...toppings[i]];

    setModifiedToppings(newToppings);
  };

  return (
    <div className="deal-modal-container">
      <div>
        <Heading text={deal.heading} />
      </div>
      <p>{deal.desc}</p>

      <div className="dm-steps-container">
        {dealProducts.length > 0 &&
          dealProducts.map((product, index) => (
            <div key={uuid()} className={`dm-step ${product.pizza ? "" : "dm-step-side-border"} `}>
              <p className="dm-step-num">{index + 1}</p>
              {product.pizza && (
                <div key={uuid()}>
                  {new Array(product.pizza.number).fill(undefined).map((_, i) => (
                    <div key={uuid()}>
                      <p>PRODUCT</p>
                      <select
                        key={uuid()}
                        value={selectedPizzas[i]}
                        onChange={(e) => {
                          handlePizzaChange(i, e.target.value);
                        }}
                      >
                        {products.map(
                          (product) => product.type === "pizza" && <option key={uuid()}>{product.name}</option>
                        )}
                      </select>
                      <select
                        key={uuid()}
                        onChange={(e) => {
                          handleCrustChange(i, e.target.value);
                        }}
                        value={selectedCrust[i]}
                      >
                        {product.pizza?.size === "Medium" &&
                          crusts.medium.map((crust) => <option key={uuid()}>{crust}</option>)}
                        {product.pizza?.size === "Large" &&
                          crusts.large.map((crust) => <option key={uuid()}>{crust}</option>)}
                        {product.pizza?.size === "Jumbo" &&
                          crusts.jumbo.map((crust) => <option key={uuid()}>{crust}</option>)}
                      </select>

                      <div>
                        <p>TOPPINGS</p>

                        <p>
                          {modifiedToppings[i]?.length > toppings[i]?.length
                            ? modifiedToppings[i]?.join(", ")
                            : toppings[i]?.join(", ")}
                        </p>
                        {loggedIn && (
                          <div className="logged-topping-container">
                            <div className="toppings-default" onClick={() => handleDefault(i)}>
                              DEFAULT
                            </div>
                            <div
                              className="edit-toppings-container"
                              onClick={() => {
                                handleShowEditPizzaToppings(i);
                              }}
                            >
                              <span className="edit-toppings-btn">
                                <img src="/svg/menu/pizzaOptions/edit.svg" className="edit-toppings-img" />
                                <p>CUSTOMIZE</p>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {product.starters && (
                <div key={uuid()}>
                  {new Array(product.starters.number).fill(undefined).map((_, i) => (
                    <div key={uuid()}>
                      <p>PRODUCT</p>
                      <select
                        key={uuid()}
                        onChange={(e) => handleStarterChange(i, e.target.value)}
                        value={selectedStarters[i]}
                      >
                        {products.map(
                          (product) => product.type === "starter" && <option key={uuid()}>{product.name}</option>
                        )}
                      </select>
                    </div>
                  ))}
                </div>
              )}
              {product.chicken && (
                <div key={uuid()}>
                  {new Array(product.chicken.number).fill(undefined).map((_, i) => (
                    <div key={uuid()}>
                      <p>PRODUCT</p>
                      <select
                        key={uuid()}
                        onChange={(e) => handleChickenChange(i, e.target.value)}
                        value={selectedChicken[i]}
                      >
                        {products.map(
                          (product) => product.type === "chicken" && <option key={uuid()}>{product.name}</option>
                        )}
                      </select>
                    </div>
                  ))}
                </div>
              )}
              {product.pasta && (
                <div key={uuid()}>
                  {new Array(product.pasta.number).fill(undefined).map((_, i) => (
                    <div key={uuid()}>
                      <p>PRODUCT</p>
                      <select
                        key={uuid()}
                        onChange={(e) => handlePastaChange(i, e.target.value)}
                        value={selectedPastas[i]}
                      >
                        {products.map(
                          (product) => product.type === "pasta" && <option key={uuid()}>{product.name}</option>
                        )}
                      </select>
                    </div>
                  ))}
                </div>
              )}
              {product.drinks && (
                <div key={uuid()}>
                  {new Array(product.drinks.number).fill(undefined).map((_, i) => (
                    <div key={uuid()}>
                      <p>PRODUCT</p>
                      <select key={uuid()} onChange={(e) => handleDrinkChange(i, e.target.value)}>
                        {product.drinks?.type === "coke"
                          ? products.map(
                              (p) =>
                                p.type === "drinks" &&
                                p.name.includes("Coca-Cola") && <option key={uuid()}>{p.name}</option>
                            )
                          : product.drinks?.type === "beer"
                          ? products.map(
                              (p) =>
                                p.type === "drinks" &&
                                p.name.includes("Carls") && <option key={uuid()}>{p.name}</option>
                            )
                          : ""}
                      </select>
                    </div>
                  ))}
                </div>
              )}
              {product.desserts && (
                <div key={uuid()}>
                  {new Array(product.desserts.number).fill(undefined).map((_, i) => (
                    <div key={uuid()}>
                      <p>PRODUCT</p>
                      <select
                        key={uuid()}
                        onChange={(e) => handleDessertChange(i, e.target.value)}
                        value={selectedDesserts[i]}
                      >
                        {product.desserts?.type === "icecream"
                          ? products.map(
                              (p) =>
                                p.type === "desserts" &&
                                p.name.includes("Nirvana") && <option key={uuid()}>{p.name}</option>
                            )
                          : product.desserts?.type === "choco pie"
                          ? products.map(
                              (p) =>
                                p.type === "desserts" &&
                                p.name.includes("Choco Pie") && <option key={uuid()}>{p.name}</option>
                            )
                          : ""}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
      {price && (
        <div>
          <p>BGN {Number(price).toFixed(2)}</p>
          <div className="deal-add-btn" onClick={handleAddToBasket}>
            ADD
          </div>
        </div>
      )}

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
                    checked={modifiedToppings[pizzaIndex]?.length > 0 && modifiedToppings[pizzaIndex].includes(t)}
                    onChange={(e) => {
                      handleChangeToppings(t, e.target.checked);
                    }}
                  />
                  <label htmlFor={`${uuid()}`}>{t}</label>
                  {modifiedToppings[pizzaIndex].includes(t) && (
                    <div className="additional-topping">
                      <input
                        type="checkbox"
                        id={`${i}-additional ${uuid()}`}
                        checked={modifiedToppings[pizzaIndex].includes(`Extra ${t}`)}
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
    </div>
  );
};

export default DealModal;
