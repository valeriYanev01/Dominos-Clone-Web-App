import React, { useContext, useEffect, useState } from "react";
import "./DealModal.css";
import { ModalContext } from "../../../context/ModalContext";
import Heading from "../../Heading/Heading";

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
  starter?: Starter;
  chicken?: Chicken;
  pasta?: Pasta;
  drink?: Drink;
  dessert?: Dessert;
}

const DealModal: React.FC = () => {
  const [pizza, setPizza] = useState<Pizza>({ number: 0, size: "", type: "" });
  const [starter, setstarter] = useState<Starter>({ number: 0 });
  const [chicken, setChicken] = useState<Chicken>({ number: 0 });
  const [pasta, setPasta] = useState<Pasta>({ number: 0 });
  const [drink, setDrink] = useState<Drink>({ number: 0, size: "", type: "" });
  const [dessert, setDessert] = useState<Dessert>({ number: 0, type: "" });
  const [dealProducts, setDealProducts] = useState<Products[]>([]);

  const { deal } = useContext(ModalContext);

  useEffect(() => {
    deal.steps.forEach((step) => {
      if ("pizza" in step) {
        setPizza(step.pizza);
      }
      if ("starter" in step) {
        setstarter(step.starter);
      }
      if ("chicken" in step) {
        setChicken(step.chicken);
      }
      if ("pasta" in step) {
        setPasta(step.pasta);
      }
      if ("drink" in step) {
        setDrink(step.drink);
      }
      if ("dessert" in step) {
        setDessert(step.dessert);
      }
    });
  }, [deal]);

  useEffect(() => {
    const products = [];

    if (pizza.number > 0) {
      products.push({ pizza });
    }
    if (starter.number > 0) {
      products.push({ starter });
    }
    if (chicken.number > 0) {
      products.push({ chicken });
    }
    if (pasta.number > 0) {
      products.push({ pasta });
    }
    if (drink.number > 0) {
      products.push({ drink });
    }
    if (dessert.number > 0) {
      products.push({ dessert });
    }
    setDealProducts(products);
  }, [pizza, starter, chicken, pasta, drink, dessert]);

  console.log(dealProducts);
  return (
    <div>
      <Heading text={deal.heading} />
      <p>{deal.desc}</p>

      <div>
        {dealProducts.length > 0 &&
          dealProducts.map((product, index) => (
            <div key={index}>
              <div>
                <p>{index + 1}</p>
                {product.pizza && (
                  <div>
                    {new Array(product.pizza.number).fill(undefined).map((_, index) => (
                      <p>pizza {index + 1}</p>
                    ))}
                  </div>
                )}
                {product.starter && <div>starter</div>}
                {product.chicken && <div>chicken</div>}
                {product.pasta && <div>pasta</div>}
                {product.drink && <div>drink</div>}
                {product.dessert && <div>dessert</div>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DealModal;
