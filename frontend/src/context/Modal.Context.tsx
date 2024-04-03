import { ReactNode, createContext, useState } from "react";

type OpenModal = boolean;

type ModalType = "" | "selectStore" | "delivery" | "carryOut" | "login";

interface OpenModalInterface {
  openModal: OpenModal;
  setOpenModal: React.Dispatch<React.SetStateAction<OpenModal>>;
  modalType: ModalType;
  setModalType: React.Dispatch<React.SetStateAction<ModalType>>;
}

export const ModalContext = createContext<OpenModalInterface>({
  openModal: false,
  setOpenModal: () => {},
  modalType: "",
  setModalType: () => {},
});

export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("");

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal, modalType, setModalType }}>
      {children}
    </ModalContext.Provider>
  );
};
