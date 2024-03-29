import { Link } from "react-router-dom";
import { GadgetInfo } from "../../../types/Home";
import "./SingleGadgetLink.css";

const SingleGadgetLink: React.FC<GadgetInfo> = ({ bgColor, btnColor, title, description, btnBg, btnLink, btnText }) => {
  return (
    <div className="single-gadget-link" style={{ backgroundColor: bgColor }}>
      <div className="gadget-title-container">
        <img src="/svg/decorLeftWhite.svg" className="deal-decor-left deal-decor" />
        <img src="/svg/decorRightWhite.svg" className="deal-decor-right deal-decor" />
        <h2 className="gadget-title">{title}</h2>
      </div>
      <p className="gadget-description">{description}</p>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Link style={{ backgroundColor: btnBg, color: btnColor }} to={btnLink} className="gadget-btn">
          {btnText}
        </Link>
      </div>
    </div>
  );
};

export default SingleGadgetLink;
