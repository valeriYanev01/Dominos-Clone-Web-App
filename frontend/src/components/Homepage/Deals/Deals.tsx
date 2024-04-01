import { useState } from "react";
import SingleDeal from "./SingleDeal";
import "./Deals.css";
import { components } from "../../../data/deals";

const Deals = () => {
  const [startIndex, setStartIndex] = useState(0);

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
              <SingleDeal
                deal={true}
                headerImg={deal.headerImg}
                heading={deal.heading}
                desc={deal.desc}
                method={deal.method}
              />
            </div>
          ))}
        </div>
      </div>
      <button className="arrow-button right" disabled={startIndex === components.length - 4} onClick={handleNext}>
        <img src="/svg/homepage/rightArrow.svg" className="deal-arrow" />
      </button>
    </div>
  );
};

export default Deals;
