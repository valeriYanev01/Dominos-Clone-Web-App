import React from "react";
import "./DeleteAccount.css";

const DeleteAccount: React.FC = () => {
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
        <div className="dm-btn-cancel">Cancel</div>
        <div className="dm-btn-delete">Yes, Delete my account</div>
      </div>
    </div>
  );
};

export default DeleteAccount;
