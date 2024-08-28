import { ReactNode, createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
    { starters: { number: number } },
    { chicken: { number: number } },
    { pasta: { number: number } },
    { drinks: { number: number; size: string; type: string } },
    { desserts: { number: number; type: string } }
  ];
  products: number;
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
    { starters: { number: 0 } },
    { chicken: { number: 0 } },
    { pasta: { number: 0 } },
    { drinks: { number: 0, size: "", type: "" } },
    { desserts: { number: 0, type: "" } },
  ],
  products: 0,
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

  const location = useLocation();

  useEffect(() => {
    if ((!location.pathname.includes("menu") && modalType === "product") || (modalType === "" && product)) {
      setOpenModal(false);
      setModalType("");
    }
  }, [location, modalType, product]);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
        modalType,
        setModalType,
        product,
        setProduct,
        deal,
        setDeal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
