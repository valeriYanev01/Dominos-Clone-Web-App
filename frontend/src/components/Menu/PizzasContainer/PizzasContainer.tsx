import "./PizzasContainer.css";

type item = {
  selectedItem: string;
};

const PizzasContainer = ({ selectedItem }: item) => {
  const products = [
    {
      type: "pizza",
      name: "Make Your Own!",
      desc: "Create your own pizza! Choose your size, base, and add any topping combination you wish!",
      img: "/images/menu/make-your.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Half and Half",
      desc: "Combine 2 pizzas in one base!",
      img: "/images/menu/half-half.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Margarita",
      desc: "Mozzarella, tomato sauce, extra mozzarella",
      img: "/images/menu/margarita.png",
      filter: ["Vegetarian"],
    },
    {
      type: "pizza",
      name: "Pulled Beef",
      desc: "barbecue sauce, mozzarella, caramelized onion, cheddar, pulled beef * our standard offers do not apply for this pizza and it is not customizable *",
      img: "/images/menu/pulled-beef.png",
      filter: ["Premium"],
    },
    {
      type: "pizza",
      name: "Beast v.3",
      desc: "tomato sauce, mozzarella, ham, bacon, ventricina",
      img: "/images/menu/beast-v-3.png",
      filter: ["Spicy"],
    },
    {
      type: "pizza",
      name: "Gyros pizza",
      desc: "tomato sauce, onion, mozzarella, gyros chicken, extra gyros chicken, fresh tomatoes, yoghurt sauce",
      img: "/images/menu/gyros.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Chickenita",
      desc: "tomato sauce, mozzarella, chicken fillet, pepperoni, fresh tomatoes, emmental",
      img: "/images/menu/chickenita.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Mexicana",
      desc: "tomato sauce, mozzarella, chicken fillet, jalapenos, green peppers, tomatoes, onion, chipotle sauce",
      img: "/images/menu/mexicana.png",
      filter: ["Spicy"],
    },
    {
      type: "pizza",
      name: "Dominos Special",
      desc: "Mozzarella, tomato sauce, ham, bacon, fresh mushrooms, fresh green peppers, onions",
      img: "/images/menu/special.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Pizza Milano",
      desc: "– rectangular pizza prepared in a pan; tomato sauce, mozzarella, Italian Milano salami, green peppers, fresh tomatoes",
      img: "/images/menu/milano.png",
      filter: ["New"],
    },
    {
      type: "pizza",
      name: "Chick-Chi-Rick",
      desc: "Tomato sauce, mozzarella, lean chicken, melted cheese, sweetcorn",
      img: "/images/menu/chick-chi-rick.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Pizza Parma",
      desc: "– rectangular pizza prepared in a pan; tomato sauce, mozzarella, pepperoni, mushrooms, parmesan",
      img: "/images/menu/parma.png",
      filter: ["New"],
    },
    {
      type: "pizza",
      name: "Carbonara",
      desc: "Fresh cream, mozzarella, bacon, mushrooms",
      img: "/images/menu/carbonara.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "American Hot",
      desc: "Tomato sauce, mozzarella, pepperoni, spicy jalapeno peppers, onions",
      img: "/images/menu/american-hot.png",
      filter: ["Vegetarian"],
    },
    {
      type: "pizza",
      name: "Garden Classic",
      desc: "Tomato sauce, mozzarella, olives, fresh green peppers, onions, mushrooms, fresh tomatoes",
      img: "/images/menu/garden-classic.png",
      filter: ["Vegetarian"],
    },
    {
      type: "pizza",
      name: "Chili sin Carne",
      desc: "tomato sauce, vegan mozzarella, chili sin carne, corn, onion",
      img: "/images/menu/chilli-sin-carne.png",
      filter: ["Spicy", "Vegeterian", "Fasting"],
    },
    {
      type: "pizza",
      name: "Pepperoni Classic",
      desc: "Mozzarella, tomato sauce, extra mozzarella, extra pepperoni",
      img: "/images/menu/pepperoni.png",
      filter: ["Spicy"],
    },
    {
      type: "pizza",
      name: "Barbecue Chicken",
      desc: "Mozzarella, barbecue sauce, tender chicken breast, bacon",
      img: "/images/menu/bbq-chicken.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Barbecue Classic",
      desc: "Mozzarella, barbecue sauce, bacon, spicy beef",
      img: "/images/menu/bbq-classic.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "New York",
      desc: "Tomato sauce, mozzarella, bacon, cheddar, extra cheddar, fresh mushrooms",
      img: "/images/menu/new-york.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Ham Classic",
      desc: "tomato sauce, mozzarella, ham, green peppers, fresh mushrooms",
      img: "/images/menu/ham-classic.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Italian Classic",
      desc: "Tomato sauce, mozzarella, pesto sauce, Grano Padano, fresh tomatoes, basil",
      img: "/images/menu/italian-classic.png",
      filter: ["Vegetarian"],
    },
    {
      type: "pizza",
      name: "Hawaii",
      desc: "Tomato sauce, mozzarella, smoked ham, pineapple",
      img: "/images/menu/hawaii.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "4 Cheese",
      desc: "Tomato sauce, mozzarella, cheddar, feta cheese, Parmesan",
      img: "/images/menu/four-cheese.png",
      filter: ["Vegetarian"],
    },
    {
      type: "pizza",
      name: "Tuna Pizza",
      desc: "Tomato sauce, mozzarella, tuna, fresh tomatoes, onions",
      img: "/images/menu/tuna.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Extravaganza",
      desc: "Mozzarella, tomato sauce, smoked ham, pepperoni, onion, fresh green papers, fresh mushrooms, black olives",
      img: "/images/menu/extravaganza.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Burger Pizza",
      desc: "burger sauce, mozzarella, fresh tomato, cheddar, cucumber pickles, spicy beef, onion",
      img: "/images/menu/burger.png",
      filter: [""],
    },
    {
      type: "pizza",
      name: "Master Burger Pizza",
      desc: "barbecue sauce, mozzarella, caramelized onion, chicken fillet, tomatoes, burger sauce ",
      img: "/images/menu/margarita.png",
      filter: ["Vegetarian"],
    },
    {
      type: "pizza",
      name: "Fasting v.2",
      desc: "tomato sauce, vegan mozzarella, sun-dried tomatoes, fresh tomatoes, mushrooms, black olives * may contain traces of lactose * ",
      img: "/images/menu/fasting-2.png",
      filter: ["Vegetarian", "Fasting"],
    },
    {
      type: "pizza",
      name: "Smokey Bacon",
      desc: "cream, bacon, mozzarella, smoked melted cheese, black olives",
      img: "/images/menu/smokey-bacon.png",
      filter: [""],
    },
    {
      type: "quesadilla",
      name: "Domino's Chicken quesadillas",
      desc: "mozzarella, cheddar, green peppers, corn, chicken, accompanied by chipotle sauce *available until 5:00p.m.",
      img: "/images/menu/ques1.png",
      filter: ["New"],
    },
    {
      type: "quesadilla",
      name: "Domino's quesadilla Chili Sin Carne",
      desc: "cheddar, chili sin carne, onion, corn, accompanied by chipotle sauce *available until 5:00p.m.",
      img: "/images/menu/ques2.png",
      filter: ["Spicy", "Vegetarian", "New"],
    },
    {
      type: "starters",
      name: "Cheesy Bread",
      desc: "Freshly baked, topped with mozzarella and the special Domino's seasoning, served with tomato dip",
      img: "/images/menu/cheesy-bread.png",
      filter: ["Vegetarian"],
    },
    {
      type: "starters",
      name: "Potato Wedges",
      desc: "Potato wedges with a lightly spicy coating. Served with a barbecue dip",
      img: "/images/menu/potato-wedges.png",
      filter: ["Vegetarian"],
    },
    {
      type: "starters",
      name: "Mozzarella Sticks",
      desc: "five crispy mozzarella sticks with BBQ dip",
      img: "/images/menu/mozzarella-sticks.png",
      filter: [""],
    },
    {
      type: "chicken",
      name: "Chicken Kickers Single Portion",
      desc: "Oven baked chicken nuggets in a spicy breadcrumb coating. Served with Barbecue dip",
      img: "/images/menu/kickers.png",
      filter: ["Spicy"],
    },
    {
      type: "chicken",
      name: "Chicken Strippers Single Portion",
      desc: "Succulent pieces of white chicken breast, not spicy, coated in breadcrumbs cooked in the oven. Served with sweet chilli sauce",
      img: "/images/menu/strippers.png",
      filter: [""],
    },
    {
      type: "chicken",
      name: "Buffalo Wings Single Portion",
      desc: "8 freshly baked chicken wings covered in Domino's barbecue sauce",
      img: "/images/menu/buffalo.png",
      filter: [""],
    },
    {
      type: "chicken",
      name: "Hot Buffalo Wings",
      desc: "8 freshly baked chicken wings in Franks sauce",
      img: "/images/menu/hot-buffalo.png",
      filter: ["Spicy"],
    },
    {
      type: "pasta",
      name: "Carbonara Pasta",
      desc: "Rigatoni pasta, cream, fresh mushrooms, smoked bacon, parmesan",
      img: "/images/menu/pasta-carbonara.png",
      filter: [""],
    },
    {
      type: "pasta",
      name: "Napoliten",
      desc: "Rigatoni pasta, tomato sauce, pesto sauce, parmesan",
      img: "/images/menu/pasta-napoliten.png",
      filter: [""],
    },
    {
      type: "pasta",
      name: "Pasta Pepperoni",
      desc: "Rigatoni pasta, cream, tomato sauce, pepperoni, parmesan",
      img: "/images/menu/pasta-pepperoni.png",
      filter: ["Spicy"],
    },
    {
      type: "pasta",
      name: "Mac and Cheese",
      desc: "Rigatoni pasta, emmental, parmesan, cheddar, cream",
      img: "/images/menu/pasta-mac-and-cheese.png",
      filter: [""],
    },
    {
      type: "salad",
      name: "Rocket Salad",
      desc: "Iceberg lettuce, arugula, fresh tomatoes, parmesan, olive oil, Balsamic dressing",
      img: "/images/menu/salad-rocket.png",
      filter: ["Vegetarian"],
    },
    {
      type: "salad",
      name: "Salad Tricolore",
      desc: "Tomatoes, feta cheese, pesto sauce and olive oil",
      img: "/images/menu/salad-tricolore.png",
      filter: ["Vegetarian"],
    },
    {
      type: "salad",
      name: "“Caesars Bacon”",
      desc: "Iceberg, bacon, corn, croutons, parmesan, Caesar dressing",
      img: "/images/menu/salad-ceasers-bacon.png",
      filter: [""],
    },
    {
      type: "salad",
      name: "“Caesars Chicken",
      desc: "Iceberg, chicken, corn, croutons, parmesan, Caesar dressing",
      img: "/images/menu/salad-ceasers-chicken.png",
      filter: [""],
    },
    {
      type: "salad",
      name: "Tuna Salad",
      desc: "Iceberg lettuce, tuna, corn, olives, lemon and olive oil",
      img: "/images/menu/salad-tuna.png",
      filter: [""],
    },
    {
      type: "sandwich",
      name: "Sandwich Milano",
      desc: "- available until 5 p.m. - tomato sauce, provolone, Milano salami, green peppers, fresh tomatoes",
      img: "/images/menu/sandwich-milano.png",
      filter: ["New"],
    },
    {
      type: "sandwich",
      name: "Pepperoni Sandwich",
      desc: "tomato sauce, provolone, Philadelphia cheese, pepperoni *available until 5:00p.m.",
      img: "/images/menu/sandwich-pepperoni.png",
      filter: [""],
    },
    {
      type: "sandwich",
      name: "BBQ chicken sandwich",
      desc: "barbecue sauce, provolone, chicken fillet, bacon *available until 5:00p.m.",
      img: "/images/menu/sandwich-bbq-chicken.png",
      filter: [""],
    },
    {
      type: "sandwich",
      name: "Mediterraneo sandwich",
      desc: "ranch sauce, provolone, white cheese, tomatoes, olives, green peppers *available until 5:00p.m.",
      img: "/images/menu/sandwich-mediteraneo.png",
      filter: [""],
    },
    {
      type: "dips",
      name: "Frank's Hot Sauce Dip",
      desc: "Fermented red cayenne peppers, spirit vinegar, water, salt, garlic powder",
      img: "/images/menu/dip-frank.png",
      filter: ["Spicy"],
    },
    {
      type: "dips",
      name: "Honey-Mustard Dip",
      desc: "Rapeseed oil, water, spirit vinegar, sugar, MUSTARD seeds, pasteurised EGG yolk, MUSTARD flour, salt, honey powder (honey, maltodextrin), white wine vinegar, stabilisers (guar gum, xanthan gum), spices, modified potato starch, horseradish, MILK protein, MUSTARD bran, colour: plain caramel, preservative: potassium sorbate, natural colours (curcumin, annatto)",
      img: "/images/menu/dip-honey-mustard.png",
      filter: [""],
    },
    {
      type: "dips",
      name: "Garlic and Herbs Dip",
      desc: "Rapeseed Oil, Water, Spirit Vinegar, Pasteurised EGG Yolk, Sugar, Garlic , Herbs, Salt, Acidity Regulator: Lactic acid, MILK Protein, MUSTARD Flour, Lemon Juice Concentrate, Stabilisers (Guar Gum, Xanthan Gum), Preservative: Potassium Sorbate",
      img: "/images/menu/dip-garlic.png",
      filter: [""],
    },
    {
      type: "dips",
      name: "Barbecue Dip",
      desc: "Water, tomato paste, sugar, glucose syrup, vinegar, molasses, salt, modified maize starch, MUSTARD, caramel liquid smoke, spices, onion powder, potassium sorbate, garlic puree, ground CELERY, herbs, clove oil",
      img: "/images/menu/dip-bbq.png",
      filter: [""],
    },
    {
      type: "dips",
      name: "Sweet Chilli Dip",
      desc: "Sugar, water, vinegar, red chilli puree, garlic puree, salt, vegetable oil, red pepper, stabilizer (xanthan gum, guar gum), spices, preservative (potassium sorbate)",
      img: "/images/menu/dip-sweet-chilli.png",
      filter: [""],
    },
    {
      type: "dips",
      name: "Tomato Dip",
      desc: "Tomatoes, salt, sugar, spices, garlic powder",
      img: "/images/menu/dip-tomato.png",
      filter: [""],
    },
    {
      type: "dips",
      name: "Milk based sauce",
      desc: "Refined sunflower oil, water, cow’s MILK YOGHURT, fennel, salt, garlic powder, EGG mélange powder, acids: vinegar and lemon acid; emulsifiers: guar gum, xanthan gum; preservative: potassium sorbate",
      img: "/images/menu/dip-milk.png",
      filter: [""],
    },
    {
      type: "dips",
      name: "Chipotle dip",
      desc: "Sunflower oil, chipotle adobo, sugar, sweet MUSTARD, pasteurized whole EGGS , water, alcohol vinegar, garlic powder, salt, modified maize starch, concentrated lemon juice, potassium sorbate, natural flavouring.",
      img: "/images/menu/dip-chipotle.png",
      filter: ["Spicy"],
    },
    {
      type: "dips",
      name: "Ranch Dip",
      desc: "SOY oil, water, sour-milk product (skimmed MILK, MILK protein, palm oil, sour milk cultures), EGG yolk, vinegar, sugar, MUSTARD, salt, spices",
      img: "/images/menu/dip-ranch.png",
      filter: [""],
    },
    {
      type: "dips",
      name: "Ceaser Dip",
      desc: "Ceaser dip",
      img: "/images/menu/dip-ceaser.png",
      filter: [""],
    },
    {
      type: "dips",
      name: "Balsamic dressing",
      desc: "Balsamic dressing",
      img: "/images/menu/dip-balsamic.png",
      filter: [""],
    },
    {
      type: "desserts",
      name: "Choco Pie with Nutella",
      desc: "Freshly oven baked puff pastry filled with Nutella spread and sprinkled with icing sugar",
      img: "/images/menu/dessert-choco-pie.png",
      filter: [""],
    },
    {
      type: "desserts",
      name: "Brownie bites",
      desc: "Chocolate brownie with white chocolate chips ",
      img: "/images/menu/dessert-brownie.png",
      filter: [""],
    },
    {
      type: "desserts",
      name: "Chocolate Souffle",
      desc: "Chocolate lava cake filled with melted warm chocolate",
      img: "/images/menu/dessert-suffle.png",
      filter: [""],
    },
    {
      type: "desserts",
      name: "Nirvana Pralines and Cream 150 ml",
      desc: "Nirvana Pralines and Cream",
      img: "/images/menu/dessert-parlines.png",
      filter: [""],
    },
    {
      type: "desserts",
      name: "Nirvana Cookies and Cream 150 ml",
      desc: "Nirvana Cookies and Cream",
      img: "/images/menu/dessert-cookies.png",
      filter: [""],
    },
    {
      type: "desserts",
      name: "Nirvana Chocolate and Choco Chips 150 ml",
      desc: "Nirvana Chocolate and Choco Chips",
      img: "/images/menu/dessert-choco.png",
      filter: [""],
    },
    {
      type: "drinks",
      name: "Aryan 0.5L",
      desc: "",
      img: "/images/menu/drinks-saqna.png",
      filter: [""],
    },
    {
      type: "drinks",
      name: "Red Bull 250ml",
      desc: "",
      img: "/images/menu/drinks-red-bull.png",
      filter: ["New"],
    },
    {
      type: "drinks",
      name: "Red Bull Sugarfree 250ml",
      desc: "",
      img: "/images/menu/drinks-red-bull-sugarfree.png",
      filter: ["New"],
    },
    {
      type: "drinks",
      name: "Coca-Cola Zero",
      desc: "",
      img: "/images/menu/drinks-coca-cola-zero.png",
      filter: [""],
    },
    {
      type: "drinks",
      name: "Coca-Cola",
      desc: "",
      img: "/images/menu/drinks-coca-cola.png",
      filter: [""],
    },
    {
      type: "drinks",
      name: "Mineral Water",
      desc: "",
      img: "/images/menu/drinks-water.png",
      filter: [""],
    },
    {
      type: "drinks",
      name: "Fanta",
      desc: "",
      img: "/images/menu/drinks-fanta.png",
      filter: [""],
    },
    {
      type: "drinks",
      name: "Cappy Pulpy",
      desc: "",
      img: "/images/menu/drinks-cappy.png",
      filter: [""],
    },
    {
      type: "drinks",
      name: "Fuzetea",
      desc: "",
      img: "/images/menu/drinks-fuzetea.png",
      filter: [""],
    },
    {
      type: "drinks",
      name: "Carlsbearg 0.5L",
      desc: "",
      img: "/images/menu/drinks-carlsbearg.png",
      filter: [""],
    },
    {
      type: "drinks",
      name: "Shumensko 0.5L",
      desc: "",
      img: "/images/menu/drinks-shumensko-half.png",
      filter: [""],
    },
    {
      type: "drinks",
      name: "Shumensko 1L",
      desc: "",
      img: "/images/menu/drinks-shumensko.png",
      filter: [""],
    },
  ];

  const filteredProducts = products.filter((product) => {
    return product.type === selectedItem;
  });

  return (
    <div className="menu-pizzas-container">
      {filteredProducts.map((product) => (
        <div key={product.name} className="menu-single-pizza-container">
          <p className="menu-spc-title">{product.name}</p>
          <img src={product.img} className="menu-spc-img" />
          <p className="menu-spc-desc">{product.desc}</p>
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
              <span></span>
            </div>
          )}
          <button className="menu-spc-btn">CHOOSE</button>
        </div>
      ))}
    </div>
  );
};

export default PizzasContainer;
