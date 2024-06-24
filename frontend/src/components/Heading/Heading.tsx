import React, { useContext } from "react";
import "./Heading.css";
import { ModalContext } from "../../context/ModalContext";

type Props = {
  text: string;
};

const Heading: React.FC<Props> = ({ text }) => {
  const { modalType } = useContext(ModalContext);

  return (
    <div
      className="heading"
      style={
        modalType === "deal" ? { marginTop: "0" } : modalType === "carryOut" ? { marginTop: "0", paddingTop: "0" } : {}
      }
    >
      <img src="/svg/decorLeftRed.svg" className="deal-decor" />
      <p>{text}</p>
      <img src="/svg/decorRightRed.svg" className="deal-decor" />
    </div>
  );
};

export default Heading;
