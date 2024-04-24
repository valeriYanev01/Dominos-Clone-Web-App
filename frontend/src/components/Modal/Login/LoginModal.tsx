import { Link } from "react-router-dom";
import "./LoginModal.css";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../context/ModalContext";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setOpenModal } = useContext(ModalContext);
  const { setLoggedIn, setEmailLogin } = useContext(LoginContext);

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setOpenModal(false);
    }
  }, [isAuthenticated]);

  const handleGoogleLogin = () => {
    loginWithRedirect({ authorizationParams: { connection: "google-oauth2" } });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", { email, password });
      console.log(response.data);
      setOpenModal(false);
      setLoggedIn(true);
      setEmailLogin(response.data.email);
      localStorage.setItem("user", String([response.data.email, response.data.token]));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-modal-container">
      <div className="modal-title login-modal-title">
        <img src="/svg/decorLeftRed.svg" className="deal-decor" />
        <span>LOGIN</span>
        <img src="/svg/decorRightRed.svg" className="deal-decor" />
      </div>
      <div className="login-modal-oAuthLinks-container">
        <Link to="/" className="login-modal-oAuthLink">
          <img src="/svg/login/facebook.svg" className="login-modal-svg" />
          <span>Facebook</span>
        </Link>
        <Link to="/" className="login-modal-oAuthLink" onClick={handleGoogleLogin}>
          <img src="/svg/login/google.svg" className="login-modal-svg" />
          <span>Google</span>
        </Link>
      </div>

      <div className="login-modal-input-container">
        <input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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

      <div className="login-modal-login-container" onClick={handleLogin}>
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
