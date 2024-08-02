import React, { useContext, useEffect } from "react";
import { LoginContext } from "../../context/LoginContext";
import { Link, useLocation } from "react-router-dom";
import { OrderContext } from "../../context/OrderContext";
import { ModalContext } from "../../context/ModalContext";
import { MenuContext } from "../../context/MenuContext";
import ProfileMenu from "./ProfileMenu";
import Basket from "./Basket/Basket";
import { NavColors } from "../../types/Navbar";

interface Props {
  showProfileMenu: boolean;
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  navColors: NavColors;
  showBasketOnHover: boolean;
  setShowBasketOnHover: React.Dispatch<React.SetStateAction<boolean>>;
  itemsInBasketQuantity: number;
  setItemsInBasketQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const Links: React.FC<Props> = ({
  showProfileMenu,
  setShowProfileMenu,
  navColors,
  showBasketOnHover,
  setShowBasketOnHover,
  itemsInBasketQuantity,
  setItemsInBasketQuantity,
}) => {
  const { loggedIn } = useContext(LoginContext);
  const { activeOrder, activeTracker, itemsInBasket } = useContext(OrderContext);
  const { setOpenModal, setModalType } = useContext(ModalContext);
  const { setSelectedItem } = useContext(MenuContext);

  const inStore = useLocation().pathname.includes("/menu");

  useEffect(() => {
    const totalQuantity = itemsInBasket.reduce((total, item) => {
      if (item.deal) {
        return total + 1;
      } else {
        return total + item.quantity;
      }
    }, 0);
    setItemsInBasketQuantity(totalQuantity);
  }, [itemsInBasket, setItemsInBasketQuantity]);

  const handleOrderBtn = () => {
    setOpenModal(true);
    if (loggedIn) {
      setModalType("method");
    } else {
      setModalType("login");
    }
  };

  const handleOpenStore = (menuItem: string) => {
    setSelectedItem(menuItem);
    if (!inStore) {
      setModalType("selectStore");
      setOpenModal(true);
    }
  };

  return (
    <ul className="navigation-list-container-links">
      {loggedIn ? (
        <li>
          <Link to="/tracker" style={{ color: navColors.link, transition: "all 0.4s" }}>
            PIZZA TRACKER
          </Link>
        </li>
      ) : (
        <>
          <li>
            {inStore ? (
              <Link
                to="pizza"
                onClick={() => handleOpenStore("pizza")}
                style={{ color: navColors.link, transition: "all 0.4s" }}
              >
                MENU
              </Link>
            ) : (
              <span onClick={() => handleOpenStore("pizza")} style={{ color: navColors.link, transition: "all 0.4s" }}>
                MENU
              </span>
            )}
          </li>

          <li>
            {inStore ? (
              <Link
                to="deals"
                onClick={() => handleOpenStore("deals")}
                style={{ color: navColors.link, transition: "all 0.4s" }}
              >
                DEALS
              </Link>
            ) : (
              <span onClick={() => handleOpenStore("deals")} style={{ color: navColors.link, transition: "all 0.4s" }}>
                DEALS
              </span>
            )}
          </li>
        </>
      )}

      <li>
        <Link to="/dominos-more" className="navigation-more">
          DOMINO'S MORE
        </Link>
      </li>
      {!activeOrder && !activeTracker && (
        <li>
          <span onClick={handleOrderBtn} className="navigation-order">
            ORDER NOW
          </span>
        </li>
      )}
      {activeOrder && window.location.pathname.includes("menu") && (
        <div
          onMouseEnter={() => {
            setShowBasketOnHover(itemsInBasketQuantity > 0 ? true : false);
            setShowProfileMenu(false);
          }}
          onMouseLeave={() => setShowBasketOnHover(false)}
          className="navigation-basket-container"
        >
          <li className="navigation-basket">
            <Link to="/checkout">
              <img src="/svg/orderBasket.svg" className="navigation-basket-img" />
              <p className="navigation-basket-items-number">{itemsInBasketQuantity}</p>
            </Link>
          </li>
          {showBasketOnHover && <Basket setShowBasketOnHover={setShowBasketOnHover} />}
        </div>
      )}

      {loggedIn ? (
        <li>
          <img
            src="/svg/profile.svg"
            className="navigation-profile-img"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
        </li>
      ) : (
        ""
      )}

      {showProfileMenu && <ProfileMenu setShowProfileMenu={setShowProfileMenu} />}
    </ul>
  );
};

export default Links;
