import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../context/OrderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPhone, faStairs } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../../../context/LoginContext";
import axios from "axios";
import { Invoice } from "../../../pages/checkout/Checkout";
import { v4 as uuid } from "uuid";
import "./DeliveryStep.css";

interface Props {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  floor: string;
  setFloor: React.Dispatch<React.SetStateAction<string>>;
  bell: string;
  setBell: React.Dispatch<React.SetStateAction<string>>;
  comments: string;
  setComments: React.Dispatch<React.SetStateAction<string>>;
  allInvoices: Invoice[];
  setAllInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  selectedInvoice: Invoice | null | undefined;
  setSelectedInvoice: React.Dispatch<React.SetStateAction<Invoice | null | undefined>>;
}

const DeliveryStep: React.FC<Props> = ({
  phoneNumber,
  setPhoneNumber,
  floor,
  setFloor,
  bell,
  setBell,
  comments,
  setComments,
  allInvoices,
  setAllInvoices,
  loading,
  setLoading,
  error,
  setError,
  selectedInvoice,
  setSelectedInvoice,
}) => {
  const [timeNowInMinutes, setTimeNowInMinutes] = useState(0);
  const [finalMinutesForDelivery, setFinalMinutesForDelivery] = useState(0);
  const [chosenDeliveryTimeInMinutes, setChosenDeliveryTimeInMinutes] = useState(0);
  const [showInvoices, setShowInvoices] = useState(false);
  const [showAddNewInvoiceMenu, setShowAddNewInvoiceMenu] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyActivity, setCompanyActivity] = useState("");
  const [companyVAT, setCompanyVAT] = useState("");
  const [companyOwner, setCompanyOwner] = useState("");
  const [editInvoice, setEditInvoice] = useState(false);

  const { orderTime, orderType } = useContext(OrderContext);
  const { emailLogin, token } = useContext(LoginContext);

  useEffect(() => {
    let hours = 0;
    let minutes = 0;

    if (orderTime) {
      if (orderTime === "NOW") {
        const now = new Date();

        now.setMinutes(now.getMinutes() + 20);

        hours = now.getHours();
        minutes = now.getMinutes();

        setChosenDeliveryTimeInMinutes(hours * 60 + minutes);
      } else {
        hours = parseInt(orderTime.split(":")[0]);
        minutes = parseInt(orderTime.split(":")[1]);

        setChosenDeliveryTimeInMinutes(hours * 60 + minutes);
      }
    }
  }, [chosenDeliveryTimeInMinutes, orderTime]);

  useEffect(() => {
    let hours = 0;
    let minutes = 0;

    const now = new Date();

    hours = now.getHours();
    minutes = now.getMinutes();

    setTimeNowInMinutes(hours * 60 + minutes);
  }, [timeNowInMinutes]);

  useEffect(() => {
    if (chosenDeliveryTimeInMinutes && timeNowInMinutes) {
      setFinalMinutesForDelivery(chosenDeliveryTimeInMinutes - timeNowInMinutes);
    }
  }, [chosenDeliveryTimeInMinutes, timeNowInMinutes, finalMinutesForDelivery]);

  const handleAddNewInvoice = async () => {
    setLoading(true);
    setError("");

    if (token && emailLogin) {
      try {
        const response = await axios.post(
          "https://dcback.vercel.app/api/users/add-invoice",
          { email: emailLogin, companyName, companyAddress, companyActivity, companyVAT, companyOwner },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.newInvoice) {
          const fetchAllInvoices = async () => {
            setLoading(true);

            try {
              const response = await axios.get("https://dcback.vercel.app/api/users/get-invoices", {
                headers: { Authorization: `Bearer ${token}` },
                params: { email: emailLogin },
              });

              setAllInvoices(response.data.invoices.invoices);
            } catch (err) {
              if (axios.isAxiosError(err)) {
                setError(err.response?.data.error);
              }
            } finally {
              setLoading(false);
            }
          };
          fetchAllInvoices();
        }

        setCompanyName("");
        setCompanyAddress("");
        setCompanyActivity("");
        setCompanyVAT("");
        setCompanyOwner("");
        setShowAddNewInvoiceMenu(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.error);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteInvoice = async (companyVAT: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.delete("https://dcback.vercel.app/api/users/delete-invoice", {
        headers: { Authorization: `Bearer ${token}` },
        params: { companyVAT, email: emailLogin },
      });

      if (response.data.invoice.modifiedCount === 1) {
        const response = await axios.get("https://dcback.vercel.app/api/users/get-invoices", {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: emailLogin },
        });

        setAllInvoices(response.data.invoices.invoices);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInvoice = async () => {
    setLoading(true);
    setError("");

    if (emailLogin && token) {
      try {
        const response = await axios.put(
          "https://dcback.vercel.app/api/users/update-invoice",
          {
            email: emailLogin,
            companyName: selectedInvoice?.companyName,
            companyAddress: selectedInvoice?.companyAddress,
            companyActivity: selectedInvoice?.companyActivity,
            companyVAT: `${selectedInvoice?.companyVAT}`,
            companyOwner: selectedInvoice?.companyOwner,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.invoice) {
          try {
            const response = await axios.get("https://dcback.vercel.app/api/users/get-invoices", {
              headers: { Authorization: `Bearer ${token}` },
              params: { email: emailLogin },
            });

            setAllInvoices(response.data.invoices.invoices);

            setSelectedInvoice(null);
            setShowAddNewInvoiceMenu(false);
            setEditInvoice(false);
          } catch (err) {
            if (axios.isAxiosError(err)) {
              setError(err.response?.data.error);
            }
          }
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.error);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="checkout-details-delivery">
      <span className="checkout-details-step">1</span>

      <p className="checkout-details-delivery-heading">DELIVERY DETAILS</p>

      <div className="checkout-dd-time">
        <img src="/svg/checkout/timer.svg" />
        <p className="checkout-dd-text">
          {orderType === "delivery" ? "Your order will be delivered in " : "Order order will be ready in "}
          <span className="checkout-dd-text-time">
            {finalMinutesForDelivery}
            <span className="checkout-dd-text-aps">'</span>
          </span>
        </p>
      </div>

      {orderType === "delivery" && (
        <div className="checkout-dd-address">
          <img src="/svg/checkout/place.svg" />
          <p>
            Your address:{" "}
            <span className="checkout-dd-address-details">
              {localStorage.getItem("user") &&
                localStorage.getItem("order-details") &&
                JSON.parse(localStorage.getItem("order-details") as string).addressLocation}{" "}
              {localStorage.getItem("user") &&
                localStorage.getItem("order-details") &&
                JSON.parse(localStorage.getItem("order-details") as string).addressName}
            </span>
          </p>
        </div>
      )}

      <div className="checkout-dd-phone-floor">
        <div className="checkout-dd-phone">
          <FontAwesomeIcon icon={faPhone} color="#0D6490" />
          <input
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            placeholder="Phone number"
          />
        </div>

        {orderType === "delivery" && (
          <div className="checkout-dd-floor">
            <FontAwesomeIcon icon={faStairs} color="#0D6490" />
            <input
              value={floor}
              onChange={(e) => {
                setFloor(e.target.value);
              }}
              placeholder="Floor"
            />
          </div>
        )}
      </div>

      {orderType === "delivery" && (
        <div className="checkout-dd-door">
          <FontAwesomeIcon icon={faBell} color="#0D6490" />
          <input
            value={bell}
            onChange={(e) => {
              setBell(e.target.value);
            }}
            placeholder="Door Bell"
          />
        </div>
      )}

      <div className="checkout-dd-comments">
        <textarea
          placeholder="Delivery comments (ex: Doorbell is not working please call upon arrival)"
          rows={2}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <div className="checkout-dd-invoice">
        <input
          type="checkbox"
          id="checkout-invoice"
          checked={showInvoices}
          onChange={() => {
            setShowInvoices(!showInvoices);
            setShowAddNewInvoiceMenu(false);
            setSelectedInvoice(null);
            setEditInvoice(false);
          }}
        />
        <label htmlFor="checkout-invoice">Invoice me</label>
      </div>

      {showInvoices && (
        <div>
          {allInvoices.map((invoice: Invoice) => (
            <div key={uuid()} className="checkout-single-invoice-container">
              <div onClick={() => setSelectedInvoice(invoice)}>
                <input type="radio" name="invoice" id={invoice.companyVAT} />
                <label htmlFor={invoice.companyVAT}>
                  {invoice.companyVAT}-{invoice.companyName}
                </label>
              </div>

              <div className="checkout-single-invoice-operations-container">
                <img
                  src="/svg/checkout/edit.svg"
                  className="checkout-single-invoice-edit"
                  onClick={() => {
                    setEditInvoice(!editInvoice);
                    setSelectedInvoice(invoice);
                    setShowAddNewInvoiceMenu(!showAddNewInvoiceMenu);
                    setError("");

                    if (showAddNewInvoiceMenu) {
                      setSelectedInvoice(invoice);
                      setEditInvoice(true);
                      setShowAddNewInvoiceMenu(true);
                      if (selectedInvoice?.companyVAT === invoice.companyVAT) {
                        setSelectedInvoice(null);
                        setEditInvoice(false);
                        setShowAddNewInvoiceMenu(false);
                      }
                    }
                  }}
                />
                <img
                  className="checkout-single-invoice-delete"
                  src="/svg/checkout/delete.svg"
                  onClick={() => handleDeleteInvoice(invoice.companyVAT)}
                />
              </div>
            </div>
          ))}

          {editInvoice ? (
            <div
              className="checkout-all-new-invoice-container"
              onClick={() => {
                setSelectedInvoice(null);
                setEditInvoice(false);
                setShowAddNewInvoiceMenu(!showAddNewInvoiceMenu);
              }}
            >
              {selectedInvoice?.companyName}-{selectedInvoice?.companyVAT}
            </div>
          ) : (
            <div
              onClick={() => {
                setShowAddNewInvoiceMenu(!showAddNewInvoiceMenu);
                setError("");
              }}
              className="checkout-all-new-invoice-container"
            >
              <p className="checkout-all-invoice-btn">New Invoice</p>
              <img className="checkout-all-invoice-btn-img" src="/svg/checkout/plus.svg" />
            </div>
          )}
        </div>
      )}

      {showAddNewInvoiceMenu && (
        <div className="checkout-new-edit-invoice">
          <div className="checkout-new-invoice-fields-container">
            <div className="checkout-new-invoice-field">
              <label htmlFor="company-name">Company Name</label>
              <input
                id="company-name"
                value={selectedInvoice ? selectedInvoice.companyName : companyName}
                onChange={(e) =>
                  selectedInvoice
                    ? setSelectedInvoice({ ...selectedInvoice, companyName: e.target.value })
                    : setCompanyName(e.target.value)
                }
              />
            </div>
            <div className="checkout-new-invoice-field">
              <label htmlFor="company-address">Company Address</label>
              <input
                id="company-address"
                value={selectedInvoice ? selectedInvoice.companyAddress : companyAddress}
                onChange={(e) =>
                  selectedInvoice
                    ? setSelectedInvoice({ ...selectedInvoice, companyAddress: e.target.value })
                    : setCompanyAddress(e.target.value)
                }
              />
            </div>
            <div className="checkout-new-invoice-field">
              <label htmlFor="company-activity">Company Activity</label>
              <input
                id="company-activity"
                value={selectedInvoice ? selectedInvoice.companyActivity : companyActivity}
                onChange={(e) =>
                  selectedInvoice
                    ? setSelectedInvoice({ ...selectedInvoice, companyActivity: e.target.value })
                    : setCompanyActivity(e.target.value)
                }
              />
            </div>
            <div className="checkout-new-invoice-field">
              <label htmlFor="company-vat">Company VAT</label>
              <input
                id="company-vat"
                value={selectedInvoice ? selectedInvoice.companyVAT : companyVAT}
                onChange={(e) => setCompanyVAT(e.target.value)}
              />
            </div>
            <div className="checkout-new-invoice-field">
              <label htmlFor="company-owner">Company Owner</label>
              <input
                id="company-owner"
                value={selectedInvoice ? selectedInvoice.companyOwner : companyOwner}
                onChange={(e) =>
                  selectedInvoice
                    ? setSelectedInvoice({ ...selectedInvoice, companyOwner: e.target.value })
                    : setCompanyOwner(e.target.value)
                }
              />
            </div>
          </div>

          <div className="checkout-new-invoice-btn-container">
            <button
              className={`checkout-new-invoice-btn ${loading ? "disabled" : ""}`}
              onClick={() => (selectedInvoice ? handleUpdateInvoice() : handleAddNewInvoice())}
              disabled={loading}
            >
              Save
            </button>
          </div>

          <p className="checkout-error">{error && error}</p>
        </div>
      )}
    </div>
  );
};

export default DeliveryStep;
