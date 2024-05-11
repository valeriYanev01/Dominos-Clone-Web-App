import React, { useContext, useEffect, useState } from "react";
import "./Coupons.css";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";

type Coupons = {
  name: string;
  validity: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const Coupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupons[]>();

  const { emailLogin, token } = useContext(LoginContext);

  useEffect(() => {
    if (token) {
      const fetchCoupons = async () => {
        const response = await axios.get("http://localhost:3000/api/users/get-coupons", {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: emailLogin },
        });

        setCoupons(response.data.coupons.coupons);
        console.log(response.data.coupons);
        console.log(new Date(new Date().setDate(new Date().getDate() + 365)));
      };

      fetchCoupons();
    }
  }, [emailLogin, token]);

  return <div>{coupons && coupons.map((coupon) => <p key={coupon._id}>{coupon.name}</p>)}</div>;
};

export default Coupons;
