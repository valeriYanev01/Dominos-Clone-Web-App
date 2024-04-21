import { ReactNode, createContext, useState } from "react";

type OpenModal = boolean;

export type ModalType = "" | "selectStore" | "delivery" | "carryOut" | "login" | "product";

type Product = string[];

interface OpenModalInterface {
  openModal: OpenModal;
  setOpenModal: React.Dispatch<React.SetStateAction<OpenModal>>;
  modalType: ModalType;
  setModalType: React.Dispatch<React.SetStateAction<ModalType>>;
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export const ModalContext = createContext<OpenModalInterface>({
  openModal: false,
  setOpenModal: () => {},
  modalType: "",
  setModalType: () => {},
  product: [],
  setProduct: () => {},
});

export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("");
  const [product, setProduct] = useState<Product>([]);

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal, modalType, setModalType, product, setProduct }}>
      {children}
    </ModalContext.Provider>
  );
};
