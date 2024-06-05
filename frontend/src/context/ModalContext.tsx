import { ReactNode, createContext, useState } from "react";

type OpenModal = boolean;

export type ModalType =
  | ""
  | "selectStore"
  | "delivery"
  | "carryOut"
  | "login"
  | "product"
  | "method"
  | "delete"
  | "deal";

type Product = string[];

export interface Deal {
  desc: string;
  headerImg: string;
  heading: string;
  method: { carryOut: string; delivery: string };
  price: string;
  steps: [
    { pizza: { number: number; size: string; type: string } },
    { starter: { number: number } },
    { chicken: { number: number } },
    { pasta: { number: number } },
    { drink: { number: number; size: string; type: string } },
    { dessert: { number: number; type: string } }
  ];
}

interface OpenModalInterface {
  openModal: OpenModal;
  setOpenModal: React.Dispatch<React.SetStateAction<OpenModal>>;
  modalType: ModalType;
  setModalType: React.Dispatch<React.SetStateAction<ModalType>>;
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  deal: Deal;
  setDeal: React.Dispatch<React.SetStateAction<Deal>>;
}

const defaultDeal: Deal = {
  desc: "",
  headerImg: "",
  heading: "",
  method: { carryOut: "", delivery: "" },
  price: "",
  steps: [
    { pizza: { number: 0, size: "", type: "" } },
    { starter: { number: 0 } },
    { chicken: { number: 0 } },
    { pasta: { number: 0 } },
    { drink: { number: 0, size: "", type: "" } },
    { dessert: { number: 0, type: "" } },
  ],
};

export const ModalContext = createContext<OpenModalInterface>({
  openModal: false,
  setOpenModal: () => {},
  modalType: "",
  setModalType: () => {},
  product: [],
  setProduct: () => {},
  deal: defaultDeal,
  setDeal: () => {},
});

export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("");
  const [product, setProduct] = useState<Product>([]);
  const [deal, setDeal] = useState<Deal>(defaultDeal);

  return (
    <ModalContext.Provider
      value={{ openModal, setOpenModal, modalType, setModalType, product, setProduct, deal, setDeal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
