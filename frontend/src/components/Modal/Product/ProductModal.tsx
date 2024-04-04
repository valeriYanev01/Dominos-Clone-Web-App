import React, { useContext } from "react";
import "./ProductModal.css";
import { ModalContext } from "../../../context/Modal.Context";

const ProductModal: React.FC = () => {
  const { product } = useContext(ModalContext);

  const name = product[0];
  const img = product[1];
  const desc = product[2];

  return (
    <div className="product-modal-container">
      <div className="pm-heading-container">
        <div
          className="pm-heading-image"
          style={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom center no-repeat",
            backgroundSize: "cover",
            width: "70vw",
            height: "100vh",
          }}
        ></div>

        <div>
          <img />
          <p>{name}</p>
          <img />
        </div>

        <div>
          <img />
          <span>ADD TO FAVORITES</span>
        </div>

        <div className="pm-options-container"></div>

        <div className="pm-desc-container">
          <div className="pm-desc">
            <p>TOPPINGS</p>
            <p>{desc}</p>
          </div>

          <div className="pm-order-container">
            <div className="pm-qty-weigh">
              <p>QUANTITY</p>
              <div>
                <img />
                <p>1</p>
                <img />
              </div>

              <img />
            </div>

            <div className="pm-order-btn-container">
              <img />
              <p className="pm-order-btn">price</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
