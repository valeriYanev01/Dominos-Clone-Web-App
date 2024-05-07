import React, { useContext, useEffect, useState } from "react";
import "./PrivacySettings.css";
import Heading from "../../Heading/Heading";
import { Link } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import { ModalContext } from "../../../context/ModalContext";

const PrivacySettings: React.FC = () => {
  const [delivery, setDelivery] = useState(false);
  const [confidentiality, setConfidentiality] = useState(false);
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [deals, setDeals] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [more, setMore] = useState(false);
  const [success, setSuccess] = useState(false);

  const { token, emailLogin, setLoggedIn } = useContext(LoginContext);
  const { setOpenModal, setModalType } = useContext(ModalContext);

  useEffect(() => {
    if (token) {
      const fetchConsents = async () => {
        const response = await axios.get("http://localhost:3000/api/users", {
          params: { email: emailLogin },
          headers: { Authorization: `Bearer ${token}` },
        });
        setDelivery(response.data.user.consents[0].delivery === "true" ? true : false);
        setDeals(response.data.user.consents[0].deals === "true" ? true : false);
        setUpdates(response.data.user.consents[0].updates === "true" ? true : false);
        setConfidentiality(response.data.user.consents[0].confidentiality === "true" ? true : false);
        setTermsOfUse(response.data.user.consents[0].termsOfUse === "true" ? true : false);
        setMore(response.data.user.consents[0].more === "true" ? true : false);
      };

      fetchConsents();
    }
  }, [emailLogin, token]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  const handleUpdateConsent = async () => {
    try {
      await axios.put(
        "http://localhost:3000/api/users/update-consent",
        { email: emailLogin, delivery, confidentiality, termsOfUse, deals, updates, more },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("http://localhost:3000/api/users/account-delete", {
        headers: { Authorization: `Bearer ${token}` },
        params: { email: emailLogin },
      });

      setLoggedIn(false);
      localStorage.removeItem("user");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data.error);
      }
    }
  };

  return (
    <div className="profile-privacy-settings">
      <Heading text={"PRIVACY SETTINGS"} />

      <div className="ps-options-container">
        <h3>We only ask for your consent on the following:</h3>
        <div className="ps-options">
          <input type="checkbox" id="ps-option-1" onChange={() => setDelivery(!delivery)} checked={delivery} />
          <label htmlFor="ps-option-1">
            Delivering without an address and a name?...we do our magic, but this is impossible! Therefore, it is
            essential for us to input and process your personal data to our database according to the general data
            protection regulation.
          </label>
        </div>

        <div className="ps-options">
          <input
            type="checkbox"
            id="ps-option-2"
            onChange={() => setConfidentiality(!confidentiality)}
            checked={confidentiality}
          />
          <label htmlFor="ps-option-2">
            I confirm that I have read and I agree with the Confidentiality Statement Regarding Order and Delivery
          </label>
        </div>

        <div className="ps-options">
          <input type="checkbox" id="ps-option-3" onChange={() => setTermsOfUse(!termsOfUse)} checked={termsOfUse} />
          <label htmlFor="ps-option-3">
            I confirm that I have read and I agree with the{" "}
            <Link to="/" className="ps-option-link">
              Terms of use
            </Link>
          </label>
        </div>

        <div className="ps-options">
          <input type="checkbox" id="ps-option-4" onChange={() => setDeals(!deals)} checked={deals} />
          <label htmlFor="ps-option-4">
            Get in touch with our latest <span className="ps-option-bold">cool deals</span> and
            <span className="ps-option-bold">new hot products</span> using my provided contact details (email, sms or
            multimedia messages).
          </label>
        </div>

        <div className="ps-options">
          <input type="checkbox" id="ps-option-5" onChange={() => setUpdates(!updates)} checked={updates} />
          <label htmlFor="ps-option-5">
            Get in touch with our <span className="ps-option-bold">corporate updates</span> using my provided contact
            details.
          </label>
        </div>

        <div className="ps-options">
          <input type="checkbox" id="ps-option-6" onChange={() => setMore(!more)} checked={more} />
          <label htmlFor="ps-option-6">
            I accept the <span>Terms and Conditions</span> of program <span className="ps-option-bold">MORE</span>.
          </label>
        </div>
      </div>

      <div className="ps-personal-data-container">
        <h3>We maintain the following personal data:</h3>

        <div className="ps-personal-data">
          <div className="ps-personal-data-option">
            <img src="/svg/check.svg" />
            <p>Name</p>
          </div>
          <div className="ps-personal-data-option">
            <img src="/svg/check.svg" />
            <p>IP</p>
          </div>
          <div className="ps-personal-data-option">
            <img src="/svg/check.svg" />
            <p>Landline phone</p>
          </div>
          <div className="ps-personal-data-option">
            <img src="/svg/check.svg" />
            <p>Email Address</p>
          </div>
          <div className="ps-personal-data-option">
            <img src="/svg/check.svg" />
            <p>Mobile phone</p>
          </div>
          <div className="ps-personal-data-option">
            <img src="/svg/check.svg" />
            <p>Tax information (in case of invoice)</p>
          </div>
          <div className="ps-personal-data-option">
            <img src="/svg/check.svg" />
            <p>Delivery Address</p>
          </div>
        </div>
      </div>

      <div className="ps-opt-out">
        <h3>What if I change my mind?</h3>
        <p>You will always have the opportunity to opt in or to opt out with just a click on the options above!</p>
        <div className="ps-opt-out-btn" onClick={handleUpdateConsent}>
          Save
        </div>
      </div>

      <div
        className="delete-account-btn"
        onClick={() => {
          setModalType("delete");
          setOpenModal(true);
        }}
      >
        Delete account
      </div>

      {success && <div className="ps-success">Changes successfully saved</div>}
    </div>
  );
};

export default PrivacySettings;
