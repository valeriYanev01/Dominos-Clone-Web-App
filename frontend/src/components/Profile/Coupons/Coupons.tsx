import React, { useContext, useEffect, useState } from "react";
import "./Coupons.css";
import axios from "axios";
import { LoginContext } from "../../../context/LoginContext";
import Heading from "../../Heading/Heading";

type Coupons = {
  name: string;
  validity: number;
  used: boolean;
  usedDate: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type CouponCategories = "active" | "used" | "expired";

const Coupons: React.FC = () => {
  const [activeCoupons, setActiveCoupons] = useState<Coupons[]>([]);
  const [usedCoupons, setUsedCoupons] = useState<Coupons[]>([]);
  const [expiredCoupons, setExpiredCoupons] = useState<Coupons[]>([]);

  const [couponCategory, setCouponCategory] = useState<CouponCategories>("active");

  const { emailLogin, token } = useContext(LoginContext);

  useEffect(() => {
    if (token && emailLogin) {
      const fetchCoupons = async () => {
        const response = await axios.get("http://localhost:3000/api/users/get-coupons", {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: emailLogin },
        });

        setActiveCoupons([]);
        setUsedCoupons([]);
        setExpiredCoupons([]);

        response.data.coupons.coupons.map((coupon: Coupons) => {
          if (coupon.used === true) {
            setUsedCoupons((prevState) => [...prevState, coupon]);
          }

          if (new Date() > new Date(new Date().setDate(new Date().getDate() + coupon.validity))) {
            setExpiredCoupons((prevstate) => [...prevstate, coupon]);
          }

          if (
            coupon.used === false &&
            new Date() < new Date(new Date().setDate(new Date().getDate() + coupon.validity))
          ) {
            setActiveCoupons((prevState) => [...prevState, coupon]);
          }
        });
      };

      fetchCoupons();
    }
  }, [token, emailLogin]);

  return (
    <div className="profile-coupons">
      <div className="pc-navigation">
        <p onClick={() => setCouponCategory("active")}>YOUR REWARDED COUPONS</p>
        <p onClick={() => setCouponCategory("used")}>USED COUPONS</p>
        <p onClick={() => setCouponCategory("expired")}>EXPIRED COUPONS</p>
      </div>

      <div className="pc-body">
        {couponCategory === "active" ? (
          <>
            <Heading text={"YOUR REWARED COUPONS"} />
            <p className="pc-subheading">YOUR REWARED COUPONS</p>
            <div className="pc-coupon-container">
              {activeCoupons &&
                activeCoupons.map((coupon) => (
                  <div key={coupon._id} className="pc-coupon">
                    <p>{coupon.name}</p>
                    <p>
                      <span>Use before:</span>
                      {new Date(new Date().setDate(new Date().getDate() + coupon.validity)).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                ))}
            </div>
          </>
        ) : couponCategory === "used" ? (
          <>
            <Heading text={"USED COUPONS"} />
            <p className="pc-subheading">USED COUPONS</p>
            <div className="pc-coupon-container">
              {usedCoupons &&
                usedCoupons.map((coupon) => (
                  <div key={coupon._id} className="pc-coupon">
                    <p>{coupon.name}</p>
                    <p>
                      <span>Used on:</span> {new Date(coupon.usedDate).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                ))}
            </div>
          </>
        ) : couponCategory === "expired" ? (
          <>
            <Heading text={"EXPIRED COUPONS"} />
            <p className="pc-subheading">EXPIRED COUPONS</p>
            <div className="pc-coupon-container">
              {expiredCoupons &&
                expiredCoupons.map((coupon) => (
                  <div key={coupon._id} className="pc-coupon">
                    <p>{coupon.name}</p>
                    <p>
                      <span>Expired on:</span>
                      {new Date(new Date().setDate(new Date().getDate() + coupon.validity)).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Coupons;
