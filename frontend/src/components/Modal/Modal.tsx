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
import DealModal from "./Deal/DealModal";
import { MobileContext } from "../../context/MobileContext";

interface ModalInterface {
  openModal: boolean;
}

const Modal: React.FC<ModalInterface> = ({ openModal }) => {
  const { modalType, setOpenModal, setModalType, setProduct } = useContext(ModalContext);
  const { isMobile } = useContext(MobileContext);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenModal(false);
        setModalType("");
        setProduct([]);
      }
    };

    if (openModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal, setOpenModal, setModalType, setProduct]);

  useEffect(() => {
    openModal ? document.body.classList.add("hide-scrollbar") : document.body.classList.remove("hide-scrollbar");
  }, [openModal]);

  return (
    <>
      {openModal && (
        <div className="modal-container">
          <div
            className="abra"
            style={
              (!isMobile && modalType === "product") || (!isMobile && modalType === "deal")
                ? { width: "80vw" }
                : (isMobile && modalType === "product") || (isMobile && modalType === "deal")
                ? { width: "100vw" }
                : {}
            }
          >
            <div
              className="modall"
              style={
                modalType === "product" || modalType === "deal"
                  ? { border: "none", background: "white", maskImage: "none" }
                  : {}
              }
            >
              <div className={`${modalType !== "product" && modalType !== "deal" ? "inner-layer" : ""} `}>
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
                ) : modalType === "deal" ? (
                  <DealModal />
                ) : (
                  ""
                )}
              </div>
              <span
                className={`close-modal ${
                  modalType === "product" || modalType === "deal" ? "close-modal-product" : ""
                }`}
                onClick={() => {
                  setOpenModal(false);
                  setModalType("");
                  setProduct([]);
                }}
              ></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
