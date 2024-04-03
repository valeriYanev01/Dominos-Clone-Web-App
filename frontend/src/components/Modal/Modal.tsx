import React, { useContext } from "react";

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
            <div className="close-modal-container">
              <div className="close-modal" onClick={() => setOpenModal(false)}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
