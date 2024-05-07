import React from "react";
import "./Heading.css";

type Props = {
  text: string;
};

const Heading: React.FC<Props> = ({ text }) => {
  return (
    <div className="heading">
      <img src="/svg/decorLeftRed.svg" className="deal-decor" />
      <p>{text}</p>
      <img src="/svg/decorRightRed.svg" className="deal-decor" />
    </div>
  );
};

export default Heading;
