import React, { useEffect, useState } from "react";
import "./Account.css";
import { useAuth0 } from "@auth0/auth0-react";

const Account: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [changeNameField, setChangeNameField] = useState(false);

  const { user } = useAuth0();

  useEffect(() => {
    if (user?.given_name && user.family_name) {
      setName(user.given_name);
      setSurname(user.family_name);
      setChangeNameField(false);
    } else {
      setChangeNameField(true);
    }
  }, [user]);

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
          <input className="pa-disabled" defaultValue={"valeri.t.yanev@gmail.com"} disabled={true} />
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
