import React, { useContext, useEffect } from "react";
import SelectStoreModal from "./SelectStore/SelectStoreModal";
import DeliveryModal from "./Delivery/DeliveryModal";
import CarryOutModal from "./CarryOut/CarryOutModal";
import LoginModal from "./Login/LoginModal";
import "./Modal.css";
import { ModalContext } from "../../context/ModalContext";
import ProductModal from "./Product/ProductModal";
import OrderMethod from "./OrderMethod/OrderMethod";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

interface ModalInterface {
  openModal: boolean;
}

const Modal: React.FC<ModalInterface> = ({ openModal }) => {
  const { modalType, setOpenModal } = useContext(ModalContext);

  if (openModal) {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setOpenModal(false);
      }
    });
  }

  useEffect(() => {
    openModal ? document.body.classList.add("hide-scrollbar") : document.body.classList.remove("hide-scrollbar");
  }, [openModal]);

  return (
    <>
      {openModal && (
        <div className="modal-container">
          <div className="abra" style={modalType === "product" ? { width: "80vw" } : {}}>
            <div
              className={`modall ${modalType === "login" ? "modal-login-width" : ""}`}
              style={modalType === "product" ? { border: "none", background: "white", maskImage: "none" } : {}}
            >
              <div
                className={`${modalType !== "product" ? "inner-layer" : ""} ${
                  modalType === "login" ? "modal-login-inner-layer" : ""
                }`}
              >
                {modalType === "selectStore" ? (
                  <SelectStoreModal />
                ) : modalType === "delivery" ? (
                  <DeliveryModal />
                ) : modalType === "carryOut" ? (
                  <CarryOutModal />
                ) : modalType === "login" ? (
                  <LoginModal />
                ) : modalType === "product" ? (
                  <ProductModal />
                ) : modalType === "method" ? (
                  <OrderMethod />
                ) : modalType === "delete" ? (
                  <DeleteAccount />
                ) : (
                  ""
                )}
              </div>
            </div>
            <span
              className={`close-modal ${
                modalType === "login"
                  ? "close-modal-login"
                  : modalType === "product"
                  ? "close-modal-product"
                  : modalType === "method"
                  ? "close-modal-method"
                  : modalType === "delivery"
                  ? "close-modal-delivery"
                  : ""
              }`}
              onClick={() => setOpenModal(false)}
            ></span>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
