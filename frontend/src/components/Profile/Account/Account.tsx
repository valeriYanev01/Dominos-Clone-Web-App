import React, { useContext, useEffect, useState } from "react";
import "./Account.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import Heading from "../../Heading/Heading";

const Account: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [changeNameField, setChangeNameField] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successfulChange, setSuccessfulChange] = useState(false);

  const { emailLogin, token } = useContext(LoginContext);

  const { user } = useAuth0();

  useEffect(() => {
    if (user?.given_name && user.family_name && user.email) {
      setName(user.given_name);
      setSurname(user.family_name);
      setEmail(user.email);
      setChangeNameField(false);
    } else {
      setChangeNameField(true);
    }
  }, [user]);

  useEffect(() => {
    if (emailLogin && token) {
      const fetchUserInformation = async () => {
        try {
          const data = await axios.get("https://dominos-clone-backend.vercel.app/api/users", {
            params: { email: emailLogin },
            headers: { Authorization: `Bearer ${token}` },
          });
          setName(data.data.user.firstName);
          setSurname(data.data.user.lastName);
          setEmail(data.data.user.email);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            localStorage.removeItem("user");
            setError(err.response?.data?.error || "An error occurred");
          }
        }
      };

      fetchUserInformation();
    }
  }, [emailLogin, token]);

  const handleUpdateDetails = async () => {
    try {
      await axios.post(
        "https://dominos-clone-backend.vercel.app/api/users/account/update",
        {
          email: emailLogin,
          firstName: name,
          lastName: surname,
          currentPassword: currentPass,
          newPassword: newPass,
          confirmNewPassword: confirmPass,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setError("");
      setSuccessfulChange(true);
      window.scrollTo(0, 0);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setSuccessfulChange(false);
        setError(err.response?.data?.error || "An error occurred");
      }
    } finally {
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    }
  };

  return (
    <div className="profile-account">
      <Heading text={"MY PROFILE"} />

      <div className="pa-body">
        <div className="pa-name-container">
          <div>
            <label>NAME *</label>
            <input
              className={`${changeNameField ? "" : "pa-disabled"}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!changeNameField}
            />
          </div>
          <div>
            <label>SURNAME *</label>
            <input
              className={`${changeNameField ? "" : "pa-disabled"}`}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              disabled={!changeNameField}
            />
          </div>
        </div>

        <div>
          <label>E-MAIL *</label>
          <input className="pa-disabled" defaultValue={email} disabled={true} />
        </div>

        <div>
          <label>CURRENT PASSWORD *</label>
          <input
            className={`${changeNameField ? "" : "pa-disabled"}`}
            type="password"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            disabled={!changeNameField}
          />
        </div>

        <div>
          <label>NEW PASSWORD *</label>
          <input
            className={`${changeNameField ? "" : "pa-disabled"}`}
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            disabled={!changeNameField}
          />
        </div>

        <div>
          <label>CONFIRM PASSWORD *</label>
          <input
            className={`${changeNameField ? "" : "pa-disabled"}`}
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            disabled={!changeNameField}
          />
        </div>

        {error && <p>{error}</p>}
        {successfulChange && <p>Successfully updated the information!</p>}
        <div className="pa-btn" onClick={handleUpdateDetails}>
          SAVE
        </div>
      </div>
    </div>
  );
};

export default Account;
