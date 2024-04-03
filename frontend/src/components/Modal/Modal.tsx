import React, { useContext, useEffect } from "react";

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

  if (openModal) {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setOpenModal(false);
      }
    });
  }

  useEffect(() => {
    openModal ? document.body.classList.toggle("hide-scrollbar") : document.body.classList.remove("hide-scrollbar");
  }, [openModal]);

  return (
    <>
      {openModal && (
        <div className="modal-container">
          <div className="modall">
            <div className="inner-layer">
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
          <span className="close-modal" onClick={() => setOpenModal(false)}></span>
        </div>
      )}
    </>
  );
};

export default Modal;
