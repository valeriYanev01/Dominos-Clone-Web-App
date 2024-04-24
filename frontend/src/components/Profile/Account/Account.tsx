import React, { useContext, useEffect, useState } from "react";
import "./Account.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";

const Account: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [changeNameField, setChangeNameField] = useState(false);
  const [email, setEmail] = useState("");

  const { emailLogin } = useContext(LoginContext);

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
    if (emailLogin) {
      console.log("No google");
      const fetchUserInformation = async () => {
        console.log(emailLogin);
        const data = await axios.get("http://localhost:3000/api/users", { params: { email: emailLogin } });
        console.log(data);
        setName(data.data.user.firstName);
        setSurname(data.data.user.lastName);
        setEmail(data.data.user.email);
      };

      fetchUserInformation();
    }
  }, [emailLogin]);

  return (
    <div className="profile-account">
      <div className="pa-heading">
        <img src="/svg/decorLeftRed.svg" className="deal-decor" />
        <p>MY PROFILE</p>
        <img src="/svg/decorRightRed.svg" className="deal-decor" />
      </div>

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
          />
        </div>

        <div>
          <label>NEW PASSWORD *</label>
          <input
            className={`${changeNameField ? "" : "pa-disabled"}`}
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>

        <div>
          <label>CONFIRM PASSWORD *</label>
          <input
            className={`${changeNameField ? "" : "pa-disabled"}`}
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>

        <div className="pa-btn">SAVE</div>
      </div>
    </div>
  );
};

export default Account;
