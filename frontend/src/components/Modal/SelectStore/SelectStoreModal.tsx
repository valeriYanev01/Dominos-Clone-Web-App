import { useNavigate } from "react-router-dom";
import "./SelectStoreModal.css";
import { useContext } from "react";
import { ModalContext } from "../../../context/Modal.Context";
import { MenuContext } from "../../../context/MenuContext";

const stores = [
  "Select Store",
  "Burgas - Central Park",
  "Varna - Levski",
  "Varna - Planet Mall",
  "Varna - Center",
  "Pernik - Plaza",
  "Plovdiv - Kurshiaka",
  "Plovdiv - Kuchuk Paris",
  "Plovdiv - Trakia",
  "Plovdiv - Central",
  "Sofia - Borovo",
  "Sofia - Vaptsarov",
  "Sofia - Geo Milev",
  "Sofia - Drujba",
  "Sofia - Kostenski Vodopad",
  "Sofia - Krasna Polyana",
  "Sofia - Lulin",
  "Sofia - Lulin Orion",
  "Sofia - Mladost",
  "Sofia - Mladost 1",
  "Sofia - Musagenica",
  "Sofia - Nadejda",
  "Sofia - Ovcha Kupel",
  "Sofia - Pavlovo",
  "Sofia - Student City 2",
  "Sofia - Student City",
  "Sofia - Suhata Reka",
  "Sofia - Center",
  "Sofia - South Park",
];

const SelectStoreModal = () => {
  const navigate = useNavigate();

  const { setOpenModal } = useContext(ModalContext);
  const { selectedItem } = useContext(MenuContext);

  const handleSelectStore = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStore = e.target.value;
    navigate(`/menu/${selectedStore.toLowerCase().replace(/ /g, "")}/${selectedItem}`);
    setOpenModal(false);
  };

  return (
    <div>
      <div className="modal-title">
        <img src="/svg/decorLeftRed.svg" className="deal-decor deal-decor-left modal-decor-left" />
        <span>SELECT STORE</span>
        <img src="/svg/decorRightRed.svg" className="deal-decor deal-decor-right modal-decor-right" />
      </div>
      <div>
        <p className="modal-desc">STORE</p>
        <select onChange={(e) => handleSelectStore(e)} className="modal-store-select">
          {stores.map((store) => (
            <option value={store} key={store}>
              {store}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectStoreModal;
