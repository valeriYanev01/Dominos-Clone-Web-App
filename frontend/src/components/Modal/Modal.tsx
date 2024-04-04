import React, { useContext, useEffect, useRef } from "react";

import SelectStoreModal from "./SelectStore/SelectStoreModal";
import DeliveryModal from "./Delivery/DeliveryModal";
import CarryOutModal from "./CarryOut/CarryOutModal";
import LoginModal from "./Login/LoginModal";
import "./Modal.css";
import { ModalContext } from "../../context/Modal.Context";

interface ModalInterface {
  openModal: boolean;
}

const Modal: React.FC<ModalInterface> = ({ openModal }) => {
  const { modalType, setOpenModal } = useContext(ModalContext);

  const modalRef = useRef<HTMLDivElement | null>(null);

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
        <div className="modal-container" ref={modalRef}>
          <div className={`modall ${modalType === "login" ? "modal-login-width" : ""}`}>
            <div className={`inner-layer ${modalType === "login" ? "modal-login-inner-layer" : ""}`}>
              {modalType === "selectStore" ? (
                <SelectStoreModal />
              ) : modalType === "delivery" ? (
                <DeliveryModal />
              ) : modalType === "carryOut" ? (
                <CarryOutModal />
              ) : modalType === "login" ? (
                <LoginModal />
              ) : (
                ""
              )}
            </div>
          </div>
          <span
            className={`close-modal ${modalType === "login" ? "close-modal-login" : ""}`}
            onClick={() => setOpenModal(false)}
          ></span>
        </div>
      )}
    </>
  );
};

export default Modal;
