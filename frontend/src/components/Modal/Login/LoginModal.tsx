import { Link } from "react-router-dom";
import "./LoginModal.css";
import { useContext } from "react";
import { ModalContext } from "../../../context/Modal.Context";
import { useAuth0 } from "@auth0/auth0-react";

const LoginModal = () => {
  const { setOpenModal } = useContext(ModalContext);

  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-modal-container">
      <div className="modal-title login-modal-title">
        <img src="/svg/decorLeftRed.svg" className="deal-decor" />
        <span>LOGIN</span>
        <img src="/svg/decorRightRed.svg" className="deal-decor" />
      </div>
      <div className="login-modal-oAuthLinks-container">
        <Link to="/" className="login-modal-oAuthLink" onClick={() => loginWithRedirect()}>
          <img src="/svg/login/facebook.svg" className="login-modal-svg" />
          <span>Facebook</span>
        </Link>
        <Link to="/" className="login-modal-oAuthLink" onClick={() => loginWithRedirect()}>
          <img src="/svg/login/google.svg" className="login-modal-svg" />
          <span>Google</span>
        </Link>
      </div>

      <div className="login-modal-input-container">
        <input placeholder="E-mail" type="email" />
        <input placeholder="Password" type="password" />
      </div>

      <div className="login-modal-fp-ks">
        <Link to="/" className="login-modal-forgot-password">
          forgot my password
        </Link>
        <div className="login-modal-ks">
          <input type="checkbox" id="login-modal-ks" />
          <label htmlFor="login-modal-ks">Keep me signed in</label>
        </div>
      </div>

      <div className="login-modal-login-container">
        <div className="login-modal-login">Login</div>
      </div>

      <div className="login-modal-signup-text">New member? Signup Now!</div>

      <div className="login-modal-register-container">
        <Link className="login-modal-register-link" to="/signup">
          <div onClick={() => setOpenModal(false)} className="login-modal-register">
            Register
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoginModal;
