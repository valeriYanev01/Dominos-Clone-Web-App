export const components = [
  {
    headerImg: "/images/deals/first.jpg",
    heading: "Medium pizza Smokey Bacon, Barbecue or Domino's Special for 11.90 BGN.",
    desc: "Medium pizza Smokey Bacon, Barbecue or Domino's Special for 11.90 BGN.",
    method: { carryOut: "CARRY OUT", delivery: "" },
    steps: [{ pizza: { number: 1, size: "Medium", type: "" } }, { starters: { number: null } }, { chicken: { number: null } }, { pasta: { number: null } }, { drinks: { number: null, size: "", type: "" }, }, { dessertss: { number: null, type: "" } }],
    price: "11.90",
    products: 1
  },
  {
    headerImg: "/images/deals/second.jpg",
    heading: "Large pizza + chicken starter + 2xCoca-Cola 500ml only for 23.50 BGN!",
    desc: "Get your favorite large pizza + a choice of chicken starter + 2xCoca-Cola 500ml only for 23,50 BGN! *for Mozzarella and Pepperoni and Philadelphia stuffed crust there is an extra charge",
    method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    steps: [{ pizza: { number: 1, size: "Large", type: "" } }, { starters: { number: null } }, { chicken: { number: 1 } }, { pasta: { number: null } }, { drinks: { number: 2, size: "500ml", type: "coke" }, }, { desserts: { number: null, type: "" } }],
    price: "23.50",
    products: 4
  },
  {
    headerImg: "/images/deals/third.jpg",
    heading: "Nirvana combo",
    desc: "Get two medium pizzas + two Nirvana ice-cream only for 31.90 BGN.",
    method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    steps: [{ pizza: { number: 2, size: "Medium", type: "" } }, { starters: { number: null } }, { chicken: { number: null } }, { pasta: { number: null } }, { drinks: { number: null, size: "", type: "" }, }, { desserts: { number: 2, type: "icecream" } }],
    price: "31.90",
    products: 4
  },
  {
    headerImg: "/images/deals/fourth.jpg",
    heading: "Combo Carlsberg 0.5ml",
    desc: "Get your favourite large pizza + chicken starter + 2pcs. Carlsberg can 0.5l for 24.10 BGN * +2.50 BGN extra for philadelphia, mozzarella or pepperoni crust",
    method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    steps: [{ pizza: { number: 1, size: "Large", type: "" } }, { starters: { number: null } }, { chicken: { number: 1 } }, { pasta: { number: null } }, { drinks: { number: 2, size: "500ml", type: "beer" }, }, { desserts: { number: null, type: "" } }],
    price: "24.10",
    products: 4
  },
  {
    headerImg: "/images/deals/fifth.jpg",
    heading: "SECOND PIZZA AT HALF PRICE!",
    desc: "Buy one pizza and get the second one 50% OFF!",
    method: { carryOut: "CARRY OUT", delivery: "" },
    steps: [{ pizza: { number: 2, size: "", type: "" } }, { starters: { number: null } }, { chicken: { number: null } }, { pasta: { number: null } }, { drinks: { number: null, size: "", type: "" }, }, { desserts: { number: null, type: "" } }],
    price: "",
    products: 2
  },
  {
    headerImg: "/images/deals/sixth.jpg",
    heading: "FAMILY DEAL",
    desc: "2 Large Pizzas + Choco pie + 1,5lt Coke only for 33,90 BGN (* philadelphia, mozzarella or pepperoni stuffed crust there is extra charge",
    method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    steps: [{ pizza: { number: 2, size: "Large", type: "" } }, { starters: { number: null } }, { chicken: { number: null } }, { pasta: { number: null } }, { drinks: { number: 1, size: "1500ml", type: "coke" } }, { desserts: { number: 1, type: "choco pie" } }],
    price: "33.90",
    products: 4
  },
];
