import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Modal from "./components/Modal/Modal";
import { ModalContext, ModalContextProvider } from "./context/Modal.Context";
import { useContext } from "react";
import DominosMore from "./pages/more/DominosMore";
import ScrollToTop from "./functions/scrollToTop";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <ModalContextProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ModalContextProvider>
  );
}

function AppContent() {
  const { openModal } = useContext(ModalContext);

  return (
    <>
      <Modal openModal={openModal} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu/:store/*" element={<Menu />} />
        <Route path="/dominos-more" element={<DominosMore />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
