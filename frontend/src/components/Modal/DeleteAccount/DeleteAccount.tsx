import React, { useContext } from "react";
import "./DeleteAccount.css";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import { ModalContext } from "../../../context/ModalContext";

const DeleteAccount: React.FC = () => {
  const { emailLogin, setLoggedIn, token } = useContext(LoginContext);
  const { setModalType, setOpenModal } = useContext(ModalContext);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("https://dominos-clone-backend.vercel.app/api/users/account-delete", {
        headers: { Authorization: `Bearer ${token}` },
        params: { email: emailLogin },
      });

      setLoggedIn(false);
      setModalType("");
      setOpenModal(false);
      localStorage.removeItem("user");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  return (
    <div className="delete-modal">
      <div className="dm-warning">
        <p>!</p>
      </div>
      <p className="dm-text">
        Once you delete your account, there will be no-way to reinstate any of your profile information (your addresses,
        order history, won coupons, favorite orders etc.) Are you sure you wish to proceed?
      </p>
      <div className="dm-btn-container">
        <div
          className="dm-btn-cancel"
          onClick={() => {
            setModalType("");
            setOpenModal(false);
          }}
        >
          Cancel
        </div>
        <div className="dm-btn-delete" onClick={handleDeleteAccount}>
          Yes, Delete my account
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
