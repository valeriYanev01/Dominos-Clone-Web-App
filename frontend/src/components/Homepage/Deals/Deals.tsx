import { useState } from "react";
import SingleDeal from "./SingleDeal";
import "./Deals.css";

const Deals = () => {
  const [startIndex, setStartIndex] = useState(0);

  const components = [
    {
      headerImg: "/images/deals/first.jpg",
      heading: "Medium pizza Smokey Bacon, Barbecue or Domino's Special for 11.90 BGN.",
      desc: "Medium pizza Smokey Bacon, Barbecue or Domino's Special for 11.90 BGN.",
      method: { carryOut: "CARRY OUT", delivery: "" },
    },
    {
      headerImg: "/images/deals/second.jpg",
      heading: "Large pizza + chicken starter + 2xCoca-Cola 500ml only for 23.50 BGN!",
      desc: "Get your favorite large pizza + a choice of chicken starter + 2xCoca-Cola 500ml only for 23,50 BGN! *for Mozzarella and Pepperoni and Philadelphia stuffed crust there is an extra charge",
      method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    },
    {
      headerImg: "/images/deals/third.jpg",
      heading: "Nirvana combo",
      desc: "Get two medium pizzas + two Nirvana ice-cream only for 31.90 BGN.",
      method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    },
    {
      headerImg: "/images/deals/fourth.jpg",
      heading: "Combo Carlsberg 0.5ml",
      desc: "Get your favourite large pizza + chicken starter + 2pcs. Carlsberg can 0.5l for 24.10 BGN * +2.50 BGN extra for philadelphia, mozzarella or pepperoni crust",
      method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    },
    {
      headerImg: "/images/deals/fifth.jpg",
      heading: "SECOND PIZZA AT HALF PRICE!",
      desc: "Buy one pizza and get the second one 50% OFF!",
      method: { carryOut: "CARRY OUT", delivery: "" },
    },
    {
      headerImg: "/images/deals/sixth.jpg",
      heading: "FAMILY DEAL",
      desc: "2 Large Pizzas + Choco pie + 1,5lt Coke only for 33,90 BGN (* philadelphia, mozzarella or pepperoni stuffed crust there is extra charge",
      method: { carryOut: "CARRY OUT", delivery: "DELIVERY" },
    },
  ];

  const handlePrevious = () => {
    console.log("prev");
    setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    setStartIndex(startIndex + 1);
  };

  const containerWidth = `${80 + 5 * 20}%`;

  const rowStyle = {
    width: containerWidth,
    transform: `translateX(-${startIndex * 14}%)`,
  };

  return (
    <div className="deals-container">
      <button className="arrow-button left" disabled={startIndex === 0} onClick={handlePrevious}>
        <img src="/svg/homepage/leftArrow.svg" className="deal-arrow" />
      </button>
      <div style={{ overflow: "hidden" }}>
        <div className="deal-row" style={rowStyle}>
          {components.map((deal, index) => (
            <div key={index} className="deal-item">
              <SingleDeal headerImg={deal.headerImg} heading={deal.heading} desc={deal.desc} method={deal.method} />
            </div>
          ))}
          di
        </div>
      </div>
      <button className="arrow-button right" disabled={startIndex === components.length - 4} onClick={handleNext}>
        <img src="/svg/homepage/rightArrow.svg" className="deal-arrow" />
      </button>
    </div>
  );
};

export default Deals;
