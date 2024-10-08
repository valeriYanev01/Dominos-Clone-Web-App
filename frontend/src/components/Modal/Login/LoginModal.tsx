import { Link } from "react-router-dom";
import "./LoginModal.css";
import { MouseEvent, useCallback, useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../context/ModalContext";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState("1h");
  const [loading, setLoading] = useState(false);

  const { setOpenModal, setModalType } = useContext(ModalContext);
  const { setLoggedIn, setEmailLogin } = useContext(LoginContext);

  const { loginWithRedirect } = useAuth0();

  const handleGoogleLogin = async () => {
    loginWithRedirect({ authorizationParams: { connection: "google-oauth2" } });
  };

  // added useCallback bcs i need to use the latest version of handleLogin inside the eventListener
  const handleLogin = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://dcback.vercel.app/api/users/login", {
        email,
        password,
        keepLoggedIn,
      });

      localStorage.setItem("user", String([response.data.email, response.data.token]));
      setOpenModal(false);
      setLoggedIn(true);
      setEmailLogin(response.data.email);
      window.location.reload();
    } catch (err) {
      console.log("CATCh");
      console.log(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [email, keepLoggedIn, password, setEmailLogin, setLoggedIn, setOpenModal]);

  const handleKeepSignedIn = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      setKeepLoggedIn("1d");
    } else {
      setKeepLoggedIn("1h");
    }
  };

  useEffect(() => {
    const loginWithEnter = (e: KeyboardEvent) => {
      if (e.code.toLowerCase() === "enter" || e.code.toLowerCase() === "numpadenter") {
        handleLogin();
      }
    };

    window.addEventListener("keydown", loginWithEnter);

    return () => {
      window.removeEventListener("keydown", loginWithEnter);
    };
  }, [handleLogin]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div className="login-modal-container">
        <div className="modal-title login-modal-title">
          <img src="/svg/decorLeftRed.svg" className="deal-decor" />
          <span>LOGIN</span>
          <img src="/svg/decorRightRed.svg" className="deal-decor" />
        </div>
        <div className="login-modal-oAuthLinks-container">
          <button disabled={loading} className="login-modal-oAuthLink-single-container">
            <Link to="/" className={`login-modal-oAuthLink ${loading ? "login-modal-login-loading" : ""}`}>
              <img src="/svg/login/facebook.svg" className="login-modal-svg" />
              <span>Facebook</span>
            </Link>
          </button>

          <button disabled={loading} className="login-modal-oAuthLink-single-container">
            <Link
              to="/"
              className={`login-modal-oAuthLink ${loading ? "login-modal-login-loading" : ""}`}
              onClick={handleGoogleLogin}
            >
              <img src="/svg/login/google.svg" className="login-modal-svg" />
              <span>Google</span>
            </Link>
          </button>
        </div>

        <div className="login-modal-input-container">
          <input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-modal-fp-ks">
          <Link
            to="/forgot-password"
            className="login-modal-forgot-password"
            onClick={() => {
              setOpenModal(false);
              setModalType("");
            }}
          >
            forgot my password
          </Link>
          <div className="login-modal-ks">
            <input type="checkbox" id="login-modal-ks" onClick={(e) => handleKeepSignedIn(e)} />
            <label htmlFor="login-modal-ks">Keep me signed in</label>
          </div>
        </div>

        <div className="login-modal-login-container ">
          <button
            disabled={loading}
            className={`login-modal-login ${loading ? "login-modal-login-loading" : ""}`}
            type="submit"
          >
            Login
          </button>
        </div>

        {error && <p>{error}</p>}

        <div className="login-modal-signup-text">New member? Signup Now!</div>

        <div className="login-modal-register-container">
          <Link className="login-modal-register-link" to="/signup" onClick={() => setOpenModal(false)}>
            <div className="login-modal-register">Register</div>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginModal;
