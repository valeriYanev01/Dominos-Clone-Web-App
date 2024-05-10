import React, { useContext, useState } from "react";
import "./Singup.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [showPerks, setShowPerks] = useState(false);
  const [uploadImg, setUploadImg] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [deals, setDeals] = useState(false);
  const [updates, setUpdates] = useState(false);

  const { setLoggedIn, setEmailLogin } = useContext(LoginContext);

  const navigate = useNavigate();

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadImg(URL.createObjectURL(e.target.files[0]));
    }
    e.target.value = "";
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/signup", {
        email,
        password,
        confirmPassword,
        firstName: name,
        lastName: surname,
        img: uploadImg,
        addresses: [],
        orders: [],
        consents: [
          { delivery: true },
          { deals: false },
          { updates: false },
          { confidentiality: true },
          { termsOfUse: true },
          { more: false },
        ],
        coupons: [],
      });

      setLoggedIn(true);
      setEmailLogin(email);
      localStorage.setItem("user", String([response.data.user.email, response.data.token]));
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "An error occurred");
      }
    }
  };

  return (
    <div className="signup">
      <Navbar page="signup" />

      <div className="signup-form-container">
        <div className="signup-heading-container">
          <img src="svg/decorLeftRed.svg" className="deal-decor" />
          <p>REGISTER</p>
          <img src="svg/decorRightRed.svg" className="deal-decor" />
        </div>

        <div className="signup-form">
          <div className="signup-form-upload-container">
            <img src={`${uploadImg ? uploadImg : "svg/signup/upload.svg"}`} className="signup-form-upload-img" />
            {uploadImg && (
              <span className="remove-img" onClick={() => setUploadImg("")}>
                &#x2715;
              </span>
            )}
            <label className="signup-form-upload-btn" htmlFor="upload">
              UPLOAD PHOTO
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImgUpload(e)}
              id="upload"
              style={{ display: "none" }}
            />
          </div>
          <div className="signup-form-text">
            <div className="signup-form-text-name-container">
              <div className="signup-form-text-name">
                <label>NAME *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required={true} />
              </div>
              <div className="signup-form-text-surname">
                <label>SURNAME *</label>
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required={true} />
              </div>
            </div>
            <div className="signup-form-text-email">
              <label>E-MAIL *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
            </div>
            <div className="signup-form-text-password">
              <label>NEW PASSWORD *</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
            </div>
            <div className="signup-form-text-confirm-password">
              <label>CONFIRM PASSWORD *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
              />
            </div>
          </div>
        </div>

        <div className="signup-form-settings-container">
          <img src="svg/signup/privacy.svg" className="signup-form-privacy-img" />
          <span> PRIVACY SETTINGS</span>
          <div className="signup-form-settings">
            <div className="signup-form-settings-single">
              <input
                type="checkbox"
                checked={showPerks}
                onChange={() => {
                  setDelivery(!delivery);
                  setShowPerks(!showPerks);
                }}
                id="perks"
                required={true}
              />
              <label className="signup-form-settings-text" htmlFor="perks">
                Delivering without an address and a name?...we do our magic, but this is impossible! Therefore, it is
                essential for us to input and process your personal data to our database according to the{" "}
                <span className="signup-form-settings-text-span">general data protection regulation.</span>
              </label>
            </div>
            {showPerks && (
              <>
                <div className="signup-form-settings-single hidden">
                  <input type="checkbox" id="perks-hidden1" onChange={() => setDeals(!deals)} checked={deals} />
                  <label className="signup-form-settings-text" htmlFor="perks-hidden1">
                    Get in touch with our lates <span>cool deals</span> and <span>new hot products</span> using my
                    provided contact details (email,sms or multimedia messages).
                  </label>
                </div>
                <div className="signup-form-settings-single hidden">
                  <input type="checkbox" id="perks-hidden2" onChange={() => setUpdates(!updates)} checked={updates} />
                  <label className="signup-form-settings-text" htmlFor="perks-hidden2">
                    Get in touch with our <span>corporate updates</span> using my provided contact details.
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          <span>{error && error}</span>
          <div className="signup-btn" onClick={handleRegister}>
            REGISTER
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
