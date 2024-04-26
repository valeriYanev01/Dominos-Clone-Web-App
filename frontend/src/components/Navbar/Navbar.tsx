import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { NavColors, Page } from "../../types/Navbar";
import { MenuContext } from "../../context/MenuContext";
import { ModalContext, ModalType } from "../../context/ModalContext";
import { LoginContext } from "../../context/LoginContext";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ page }: Page) => {
  const [navColors, setNavColors] = useState<NavColors>({
    navBg: "transparent",
    svgLetters: "#fff",
    link: "#fff",
    navShadow: "none",
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeProfileOption, setActiveProfileOption] = useState(false);

  const { setSelectedItem } = useContext(MenuContext);
  const { setOpenModal, setModalType } = useContext(ModalContext);
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const navigate = useNavigate();

  const { logout, user } = useAuth0();

  const inStore = useLocation().pathname.includes("/menu");

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

  const handleOpenStore = (menuItem: string) => {
    setSelectedItem(menuItem);
    if (!inStore) {
      setModalType("selectStore");
      setOpenModal(true);
    }
  };

  const handleOpenModal = (modal: ModalType) => {
    setModalType(modal);
    setOpenModal(true);
  };

  const handleOrderBtn = () => {
    setOpenModal(true);
    if (loggedIn) {
      setModalType("method");
    } else {
      setModalType("login");
    }
  };

  const handleLogout = () => {
    if (user) {
      setShowProfileMenu(false);
      setLoggedIn(false);
      logout({ logoutParams: { returnTo: window.location.origin } });
      console.log("GOOGLE");
    }

    if (!user) {
      setShowProfileMenu(false);
      localStorage.removeItem("user");
      setLoggedIn(false);
      navigate("/");
      console.log("EMAIL");
    }
  };

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
        <ul className="navigation-list-container-logo">
          <li>
            <Link
              onClick={() => {
                setOpenModal(false);
                setModalType("");
              }}
              to="/"
              className="logo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Upload_by_NICF-Nettie"
                x="0px"
                y="0px"
                viewBox="0 0 567 143"
              >
                <switch>
                  <g>
                    <path
                      className="logo-letter"
                      style={{ fill: navColors.svgLetters }}
                      d="M173.7,60.1h-28c-0.9,0-1.7,0.7-1.7,1.7v62.9c0,0.9,0.7,1.7,1.7,1.7h28c22,0,36.3-13,36.3-33.2       C210.1,73.1,195.8,60.1,173.7,60.1 M173.7,108.9h-9.5V77.6h9.6c10,0,15.9,5.8,15.9,15.6C189.7,101,184.2,108.9,173.7,108.9"
                    />
                    <path
                      className="logo-letter"
                      style={{ fill: navColors.svgLetters }}
                      d="M334,77.2c-7.7,0-14,4.2-16.8,8.4c-2.1-5.6-6.7-8.4-13.8-8.4c-7.9,0-13.8,4-15.9,6.7V80       c0-0.9-0.7-1.7-1.7-1.7h-14.5c-0.9,0-1.7,0.7-1.7,1.7v44.7c0,0.9,0.7,1.7,1.7,1.7h14.5c0.9,0,1.7-0.7,1.7-1.7V96.8v0       c1.1-1.2,3.2-3.8,7.3-3.8c3.5,0,5.5,1.9,5.5,5.4v26.4c0,0.9,0.7,1.7,1.7,1.7h14.5c0.9,0,1.7-0.7,1.7-1.7V96.8       c1-1.2,3.2-3.8,7.3-3.8c3.5,0,5.5,2,5.5,5.4v26.4c0,0.9,0.7,1.7,1.7,1.7h14.5c0.9,0,1.7-0.7,1.7-1.7V91.6       C348.8,82.3,343.5,77.2,334,77.2"
                    />
                    <path
                      className="logo-letter"
                      style={{ fill: navColors.svgLetters }}
                      d="M372.3,78.4h-14.5c-0.9,0-1.7,0.7-1.7,1.7v44.7c0,0.9,0.7,1.7,1.7,1.7h14.5c0.9,0,1.7-0.8,1.7-1.7V80       C374,79.1,373.2,78.4,372.3,78.4"
                    />
                    <path
                      className="logo-letter"
                      style={{ fill: navColors.svgLetters }}
                      d="M365.5,54.8c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10c5.5,0,10-4.5,10-10C375.5,59.3,371,54.8,365.5,54.8"
                    />
                    <path
                      className="logo-letter"
                      style={{ fill: navColors.svgLetters }}
                      d="M415.9,77.2c-9.3,0-14.3,4.2-16.5,6.7V80c0-0.9-0.8-1.7-1.7-1.7h-14.5c-0.9,0-1.7,0.7-1.7,1.7v44.7       c0,0.9,0.8,1.7,1.7,1.7h14.5c0.9,0,1.7-0.7,1.7-1.7V96.8c1.2-1.3,3.3-3.8,7.6-3.8c4.6,0,7,2.3,7,6.8v24.9       c0,0.9,0.7,1.7,1.7,1.7h14.5c0.9,0,1.7-0.7,1.7-1.7V92.3C431.9,82.8,426,77.2,415.9,77.2"
                    />
                    <path
                      className="logo-letter"
                      style={{ fill: navColors.svgLetters }}
                      d="M238.9,77c-14,0-25.3,11.3-25.3,25.3c0,14,11.3,25.3,25.3,25.3c14,0,25.3-11.3,25.3-25.3       C264.2,88.3,252.9,77,238.9,77 M238.9,110.6c-4.8,0-8.6-3.9-8.6-8.7c0-4.8,3.9-8.6,8.6-8.6c4.8,0,8.6,3.9,8.6,8.6       C247.6,106.7,243.7,110.6,238.9,110.6"
                    />
                    <path
                      className="logo-letter"
                      style={{ fill: navColors.svgLetters }}
                      d="M462.6,77c-14,0-25.3,11.3-25.3,25.3c0,14,11.3,25.3,25.3,25.3c14,0,25.3-11.3,25.3-25.3       C487.9,88.4,476.6,77,462.6,77 M462.6,110.7c-4.8,0-8.6-3.9-8.6-8.7c0-4.8,3.9-8.6,8.6-8.6c4.8,0,8.6,3.9,8.6,8.6       C471.2,106.8,467.4,110.7,462.6,110.7"
                    />
                    <path
                      className="logo-letter"
                      style={{ fill: navColors.svgLetters }}
                      d="M501.9,62.9C501.9,62.9,501.9,62.9,501.9,62.9C501.9,62.8,501.9,62.8,501.9,62.9c0-0.1,0-0.1,0-0.2l0,0       c-1.1-5-6.6-8.6-11.9-7.5c-5.4,1.1-9,6.2-7.9,11.2c0.9,4.2,4.6,7.1,8.9,7.4c-0.3,1.7-1.8,3.2-3,3.9c-0.8,0.5-0.3,1.4-0.3,1.4       l1.1,1.7c0.3,0.6,0.8,0.8,1.4,0.6C501.1,76.8,503,67.4,501.9,62.9"
                    />
                    <path
                      className="logo-letter"
                      style={{ fill: navColors.svgLetters }}
                      d="M514.8,92.6c0-1.8,2.3-2.6,5.2-2.6c5.8,0,9.1,1.7,12.8,4.1c0.4,0.3,0.9,0.3,1.3,0.2       c0.4-0.1,0.8-0.4,1.1-0.8L540,85c0.4-0.8,0.2-1.8-0.6-2.3c-4-2.4-9.9-5.5-20.2-5.5c-14.8,0-22.7,7-21.4,17       c2.3,17.6,29.7,11.6,29.3,17.6c-0.1,1.4-2.5,2.4-6.7,2.4c-5.4,0-11.6-2.7-15.5-5.1c-0.4-0.2-0.9-0.3-1.3-0.2       c-0.4,0.1-0.8,0.4-1,0.8l-5.7,9.5c-0.4,0.8-0.2,1.7,0.5,2.2c5.4,3.7,14.2,6.1,21.9,6.1c14.8,0,23.4-6.4,23.4-16.8       C542.7,91.4,514.9,97.4,514.8,92.6"
                    />
                    <path
                      className="logo-cube-outer"
                      d="M128.8,44.4L96.2,11.8C94.8,10.4,93,9.6,91,9.6c-1.9,0-3.8,0.8-5.2,2.1L58.5,39.1L12.9,84.7       c-2.8,2.8-2.8,7.5,0,10.3l32.6,32.6c1.4,1.4,3.2,2.1,5.2,2.1s3.8-0.8,5.2-2.1l40.8-40.8l32.1-32.1       C131.6,51.9,131.6,47.2,128.8,44.4"
                    />
                    <path
                      className="logo-red-part"
                      d="M126.5,46.7L93.9,14.1c-1.6-1.6-4.1-1.6-5.7,0L52.9,49.4l38.3,38.3l35.3-35.3       C128.1,50.8,128.1,48.3,126.5,46.7 M97.8,56.1c-1.8,1.8-4.3,2.8-6.7,2.8c-2.4,0-4.8-0.9-6.7-2.8c-1.8-1.8-2.8-4.3-2.8-6.7       c0-2.4,0.9-4.8,2.8-6.7c1.8-1.8,4.3-2.8,6.7-2.8c2.4,0,4.8,0.9,6.7,2.8c1.8,1.8,2.8,4.3,2.8,6.7       C100.6,51.9,99.6,54.3,97.8,56.1"
                    />
                    <path
                      className="logo-blue-part"
                      d="M15.2,87c-1.6,1.6-1.6,4.1,0,5.7l32.6,32.6c0.8,0.8,1.8,1.2,2.8,1.2s2.1-0.4,2.8-1.2l35.3-35.3L50.5,51.7       L15.2,87z M43.5,96.4c-1.8,1.8-4.3,2.8-6.7,2.8c-2.4,0-4.8-0.9-6.7-2.8c-1.8-1.8-2.8-4.3-2.8-6.7c0-2.4,0.9-4.8,2.8-6.7       c1.8-1.8,4.3-2.8,6.7-2.8c2.4,0,4.8,0.9,6.7,2.8c1.8,1.9,2.8,4.3,2.8,6.7C46.3,92.1,45.3,94.5,43.5,96.4 M57.9,83.4       c1.8-1.8,4.3-2.8,6.7-2.8c2.4,0,4.8,0.9,6.7,2.8c1.9,1.8,2.8,4.3,2.8,6.7c0,2.4-0.9,4.8-2.8,6.7c-1.8,1.8-4.3,2.8-6.7,2.8       c-2.4,0-4.8-0.9-6.7-2.8c-1.8-1.8-2.8-4.3-2.8-6.7C55.1,87.7,56,85.2,57.9,83.4"
                    />
                  </g>
                </switch>
              </svg>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setOpenModal(false);
                setModalType("");
              }}
              className="navigation-hiring"
              to="/careers"
            >
              <div className="hiring-dot" />
              We're Hiring!
            </Link>
          </li>
        </ul>

        <ul className="navigation-list-container-links">
          <li>
            <span style={{ color: navColors.link, transition: "all 0.4s" }}>BG | </span>
            <span style={{ color: navColors.link, transition: "all 0.4s" }}>EN</span>
          </li>
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
                  <span
                    onClick={() => handleOpenStore("pizza")}
                    style={{ color: navColors.link, transition: "all 0.4s" }}
                  >
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
                  <span
                    onClick={() => handleOpenStore("deals")}
                    style={{ color: navColors.link, transition: "all 0.4s" }}
                  >
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
          <li>
            <span onClick={handleOrderBtn} className="navigation-order">
              ORDER NOW
            </span>
          </li>
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
          {showProfileMenu ? (
            <ul className="navigation-profile-menu">
              <li onClick={() => setShowProfileMenu(false)}>
                <Link to="/profile/account">MY PROFILE</Link>
              </li>
              <li onClick={() => setShowProfileMenu(false)}>
                <Link to="/profile/addresses">MY ADDRESSES</Link>
              </li>
              <li onClick={() => setShowProfileMenu(false)}>
                <Link to="/profile/orders">MY ORDERS</Link>
              </li>
              <li onClick={() => setShowProfileMenu(false)}>
                <Link to="/profile/coupons">MY COUPONS & GIFTS</Link>
              </li>
              <li onClick={() => setShowProfileMenu(false)}>
                <Link to="/profile/privacy-settings">PRIVACY SETTINGS</Link>
              </li>
              <li onClick={handleLogout}>LOGOUT</li>
            </ul>
          ) : (
            ""
          )}
        </ul>
      </nav>
      {loggedIn && page === "home" ? (
        <div className="loggedin-navigation">
          <div onClick={() => handleOpenModal("delivery")}>
            <img src="/images/delivery.png" className="loggedin-navigation-img" />
            <p>DELIVERY</p>
          </div>
          <img src="/images/or_image.png" className="loggedin-navigation-img" />
          <div onClick={() => handleOpenModal("carryOut")}>
            <img src="/images/carryOut.png" className="loggedin-navigation-img" />
            <p>CARRY OUT</p>
          </div>
        </div>
      ) : (
        ""
      )}

      {loggedIn && page === "profile" ? (
        <ul className="profile-nav">
          <li
            onClick={() => {
              setShowProfileMenu(false);
              setActiveProfileOption(true);
            }}
            className={`${activeProfileOption ? "active" : ""}`}
          >
            <Link to="/profile/account">MY PROFILE</Link>
          </li>
          <li
            onClick={() => {
              setShowProfileMenu(false);
              setActiveProfileOption(true);
            }}
            className={`${activeProfileOption ? "active" : ""}`}
          >
            <Link to="/profile/addresses">MY ADDRESSES</Link>
          </li>
          <li
            onClick={() => {
              setShowProfileMenu(false);
              setActiveProfileOption(true);
            }}
            className={`${activeProfileOption ? "active" : ""}`}
          >
            <Link to="/profile/orders">MY ORDERS</Link>
          </li>
          <li
            onClick={() => {
              setShowProfileMenu(false);
              setActiveProfileOption(true);
            }}
            className={`${activeProfileOption ? "active" : ""}`}
          >
            <Link to="/profile/coupons">MY COUPONS & GIFTS</Link>
          </li>
          <li
            onClick={() => {
              setShowProfileMenu(false);
              setActiveProfileOption(true);
            }}
            className={`${activeProfileOption ? "active" : ""}`}
          >
            <Link to="/profile/payment-methods">PAYMENT METHODS</Link>
          </li>
          <li
            onClick={() => {
              setShowProfileMenu(false);
              setActiveProfileOption(true);
            }}
            className={`${activeProfileOption ? "active" : ""}`}
          >
            <Link to="/profile/privacy-settings">PRIVACY SETTINGS</Link>
          </li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
