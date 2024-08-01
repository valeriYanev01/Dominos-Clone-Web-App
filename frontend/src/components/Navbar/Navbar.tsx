import { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { NavColors, Page } from "../../types/Navbar";
import { ModalContext } from "../../context/ModalContext";
import { LoginContext } from "../../context/LoginContext";
import ProfileNav from "./ProfileNav";
import Logo from "./Logo";
import Links from "./Links";
import LoggedInNavigation from "./LoggedInNavigation";

const Navbar = ({ page }: Page) => {
  const [navColors, setNavColors] = useState<NavColors>({
    navBg: "transparent",
    svgLetters: "#fff",
    link: "#fff",
    navShadow: "none",
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeProfileOption, setActiveProfileOption] = useState(false);

  const { setOpenModal, setModalType } = useContext(ModalContext);
  const { loggedIn } = useContext(LoginContext);

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

  return (
    <>
      <nav
        className="navigation-container"
        style={{
          background: navColors.navBg,
          transition: "all 0.4s",
          boxShadow: navColors.navShadow,
        }}
      >
        <Logo navColors={navColors} setModalType={setModalType} setOpenModal={setOpenModal} />

        <Links navColors={navColors} showProfileMenu={showProfileMenu} setShowProfileMenu={setShowProfileMenu} />

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
