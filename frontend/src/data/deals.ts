export const components = [
  {
    headerImg: "/images/deals/first.jpg",
    heading: "Medium pizza Smokey Bacon, Barbecue or Domino's Special for 11.90 BGN.",
    desc: "Medium pizza Smokey Bacon, Barbecue or Domino's Special for 11.90 BGN.",
    method: { carryOut: "CARRY OUT", delivery: "" },
    steps: [{ pizza: { number: 1, size: "Medium", type: "" } }, { starter: { number: null } }, { chicken: { number: null } }, { pasta: { number: null } }, { drink: { number: null, size: "", type: "" }, }, { dessert: { number: null, type: "" } }],
    price: "11.90"
  },
  {
    headerImg: "/images/deals/second.jpg",
    heading: "Large pizza + chicken starter + 2xCoca-Cola 500ml only for 23.50 BGN!",
    desc: "Get your favorite large pizza + a choice of chicken starter + 2xCoca-Cola 500ml only for 23,50 BGN! *for Mozzarella and Pepperoni and Philadelphia stuffed crust there is an extra charge",
    method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    steps: [{ pizza: { number: 1, size: "Large", type: "" } }, { starter: { number: null } }, { chicken: { number: 1 } }, { pasta: { number: null } }, { drink: { number: 2, size: "500ml", type: "coke" }, }, { dessert: { number: null, type: "" } }],
    price: "23.50"
  },
  {
    headerImg: "/images/deals/third.jpg",
    heading: "Nirvana combo",
    desc: "Get two medium pizzas + two Nirvana ice-cream only for 31.90 BGN.",
    method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    steps: [{ pizza: { number: 2, size: "Medium", type: "" } }, { starter: { number: null } }, { chicken: { number: null } }, { pasta: { number: null } }, { drink: { number: null, size: "", type: "" }, }, { dessert: { number: 2, type: "icecream" } }],
    price: "23.50"
  },
  {
    headerImg: "/images/deals/fourth.jpg",
    heading: "Combo Carlsberg 0.5ml",
    desc: "Get your favourite large pizza + chicken starter + 2pcs. Carlsberg can 0.5l for 24.10 BGN * +2.50 BGN extra for philadelphia, mozzarella or pepperoni crust",
    method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    steps: [{ pizza: { number: 1, size: "Large", type: "" } }, { starter: { number: null } }, { chicken: { number: 1 } }, { pasta: { number: null } }, { drink: { number: 2, size: "500ml", type: "beer" }, }, { dessert: { number: null, type: "" } }],
    price: "23.50"
  },
  {
    headerImg: "/images/deals/fifth.jpg",
    heading: "SECOND PIZZA AT HALF PRICE!",
    desc: "Buy one pizza and get the second one 50% OFF!",
    method: { carryOut: "CARRY OUT", delivery: "" },
    steps: [{ pizza: { number: 2, size: "", type: "" } }, { starter: { number: null } }, { chicken: { number: null } }, { pasta: { number: null } }, { drink: { number: null, size: "", type: "" }, }, { dessert: { number: null, type: "" } }],
    price: "23.50"
  },
  {
    headerImg: "/images/deals/sixth.jpg",
    heading: "FAMILY DEAL",
    desc: "2 Large Pizzas + Choco pie + 1,5lt Coke only for 33,90 BGN (* philadelphia, mozzarella or pepperoni stuffed crust there is extra charge",
    method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    steps: [{ pizza: { number: 2, size: "Large", type: "" } }, { starter: { number: null } }, { chicken: { number: null } }, { pasta: { number: null } }, { drink: { number: 1, size: "1500ml", type: "Coke" } }, { dessert: { number: 1, type: "choco pie" } }],
    price: "23.50"
  },
];
