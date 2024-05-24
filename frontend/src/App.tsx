import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "./functions/scrollToTop";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Modal from "./components/Modal/Modal";
import { ModalContext } from "./context/ModalContext";
import { LoginContext } from "./context/LoginContext";
import DominosMore from "./pages/more/DominosMore";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import Account from "./components/Profile/Account/Account";
import Addresses from "./components/Profile/Addresses/Addresses";
import Orders from "./components/Profile/Orders/Orders";
import Coupons from "./components/Profile/Coupons/Coupons";
import PrivacySettings from "./components/Profile/PrivacySettings/PrivacySettings";
import PaymentMethods from "./components/Profile/PaymentMethods/PaymentMethods";
import AddAddress from "./pages/addAddress/AddAddress";
import Tracker from "./pages/tracker/Tracker";

function App() {
  const { openModal } = useContext(ModalContext);
  const { loggedIn } = useContext(LoginContext);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("user") && location.pathname.includes("profile")) {
      navigate("/");
    }

    if (localStorage.getItem("user") && location.pathname.includes("signup")) {
      navigate("/");
    }
  }, [loggedIn, navigate, location]);

  return (
    <>
      <Modal openModal={openModal} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/step1" element={<Home />}/>
        <Route path="/step2" element={<Home />}/>
        <Route path="menu/:store/*" element={<Menu />} />
        <Route path="dominos-more" element={<DominosMore />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />}>
          <Route path={"account"} element={<Account />} />
          <Route path={"addresses"} element={<Addresses />} />
          <Route path={"orders"} element={<Orders />} />
          <Route path={"coupons"} element={<Coupons />} />
          <Route path={"privacy-settings"} element={<PrivacySettings />} />
          <Route path={"payment-methods"} element={<PaymentMethods />} />
        </Route>
        <Route path="add-address" element={<AddAddress />} />
        <Route path="tracker" element={<Tracker />} />
      </Routes>
    </>
  );
}

export default App;
