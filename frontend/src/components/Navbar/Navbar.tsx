import { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { NavColors, Page } from "../../types/Navbar";
import { ModalContext } from "../../context/ModalContext";
import { LoginContext } from "../../context/LoginContext";
import ProfileNav from "./ProfileNav";
import Logo from "./Logo";
import Links from "./Links";
import LoggedInNavigation from "./LoggedInNavigation";
import { useNavigate } from "react-router-dom";
import Basket from "./Basket/Basket";
import MobileLinks from "./MobileLinks";

const Navbar = ({ page }: Page) => {
  const [navColors, setNavColors] = useState<NavColors>({
    navBg: "transparent",
    svgLetters: "#fff",
    link: "#fff",
    navShadow: "none",
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeProfileOption, setActiveProfileOption] = useState(false);
  const [itemsInBasketQuantity, setItemsInBasketQuantity] = useState(0);
  const [showBasketOnHover, setShowBasketOnHover] = useState(false);
  const [showMobileLinks, setShowMobileLinks] = useState(false);

  const { setOpenModal, setModalType } = useContext(ModalContext);
  const { loggedIn } = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (page === "home") {
      const handleScroll = () => {
        setNavColors(
          window.scrollY > 50
            ? { navBg: "white", svgLetters: "#0078ae", link: "#898989", navShadow: "0 2px 2px rgba(0,0,0,.15)" }
            : { navBg: "transparent", svgLetters: "#fff", link: "#fff", navShadow: "none" }
        );
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setNavColors({
        navBg: "white",
        svgLetters: "#0078ae",
        link: "#898989",
        navShadow: "0 2px 2px rgba(0,0,0,.15)",
      });
    }
  }, [page]);

  useEffect(() => {
    if (showMobileLinks) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
  }, [showMobileLinks]);

  return (
    <>
      {showMobileLinks && <MobileLinks />}

      <nav
        className="navigation-container"
        style={{
          background: navColors.navBg,
          transition: "all 0.4s",
          boxShadow: navColors.navShadow,
        }}
      >
        {/* MOBILE MENU */}
        <div className="navigation-menu-mobile" onClick={() => setShowMobileLinks(!showMobileLinks)}>
          <svg width="3rem" height="3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke={`${showMobileLinks ? "#555" : navColors.link}`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </div>

        <Logo
          navColors={navColors}
          setModalType={setModalType}
          setOpenModal={setOpenModal}
          showMobileLinks={showMobileLinks}
        />

        <li
          className="navigation-basket navigation-basket-mobile"
          onClick={() => {
            if (loggedIn) {
              navigate("/checkout");
            } else {
              setModalType("login");
              setOpenModal(true);
            }
          }}
        >
          <div
            onMouseEnter={() => {
              setShowBasketOnHover(itemsInBasketQuantity > 0 ? true : false);
              setShowProfileMenu(false);
            }}
            onMouseLeave={() => setShowBasketOnHover(false)}
            className="navigation-basket-container navigation-basket-container-mobile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              width="3rem"
              height="3rem"
              viewBox="0 0 47.445 47.446"
              className="navigation-basket-img"
            >
              <g>
                <path
                  fill={`${showMobileLinks ? "#555" : navColors.link}`}
                  d="M38.271,14.645V9.331c0-3.418-2.727-6.2-6.145-6.2H15.373c-3.418,0-6.201,2.781-6.201,6.2v5.313H2.698   C1.208,14.644,0,15.852,0,17.342v5.865c0,1.491,1.208,2.698,2.698,2.698h0.804L6.45,42.1c0.233,1.282,1.351,2.214,2.654,2.214   h29.292c1.304,0,2.42-0.932,2.654-2.215l2.946-16.194h0.75c1.49,0,2.698-1.207,2.698-2.698v-5.865c0-1.49-1.208-2.698-2.698-2.698   L38.271,14.645L38.271,14.645z M14.17,9.331c0-0.652,0.551-1.202,1.203-1.202h16.756c0.651,0,1.146,0.55,1.146,1.202v5.313H14.17   V9.331z M17.902,34.672c0,1.037-0.829,1.877-1.866,1.877c-1.036,0-1.866-0.84-1.866-1.877V24.368c0-1.037,0.83-1.876,1.866-1.876   c1.038,0,1.866,0.841,1.866,1.876V34.672z M25.62,34.672c0,1.037-0.83,1.877-1.866,1.877c-1.036,0-1.867-0.84-1.867-1.877V24.368   c0-1.037,0.831-1.876,1.867-1.876c1.037,0,1.866,0.841,1.866,1.876V34.672z M33.338,34.672c0,1.037-0.83,1.877-1.865,1.877   c-1.037,0-1.867-0.84-1.867-1.877V24.368c0-1.037,0.83-1.876,1.867-1.876c1.035,0,1.865,0.841,1.865,1.876V34.672z"
                />
              </g>
            </svg>
            <p className="navigation-basket-items-number">{itemsInBasketQuantity}</p>
            {showBasketOnHover && <Basket setShowBasketOnHover={setShowBasketOnHover} />}
          </div>
        </li>

        <Links
          navColors={navColors}
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
          itemsInBasketQuantity={itemsInBasketQuantity}
          setItemsInBasketQuantity={setItemsInBasketQuantity}
          showBasketOnHover={showBasketOnHover}
          setShowBasketOnHover={setShowBasketOnHover}
        />

        <LoggedInNavigation page={page} />
      </nav>

      {loggedIn && page === "profile" && (
        <ProfileNav
          activeProfileOption={activeProfileOption}
          setActiveProfileOption={setActiveProfileOption}
          setShowProfileMenu={setShowProfileMenu}
        />
      )}
    </>
  );
};

export default Navbar;
