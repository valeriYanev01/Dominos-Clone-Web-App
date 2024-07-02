import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { v4 as uuid } from "uuid";
import "./Checkout.css";
import { products } from "../../data/products";
import { LoginContext } from "../../context/LoginContext";
import { ModalContext } from "../../context/ModalContext";
import { BasketItem, OrderContext } from "../../context/OrderContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faStairs, faBell } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

interface Invoice {
  companyActivity: string;
  companyAddress: string;
  companyName: string;
  companyOwner: string;
  companyVAT: string;
}

export const Checkout: React.FC = () => {
  const [chosenDeliveryTimeInMinutes, setChosenDeliveryTimeInMinutes] = useState(0);
  const [timeNowInMinutes, setTimeNowInMinutes] = useState(0);
  const [finalMinutesForDelivery, setFinalMinutesForDelivery] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [bell, setBell] = useState("");
  const [comments, setComments] = useState("");
  const [showInvoices, setShowInvoices] = useState(false);
  const [showAddNewInvoiceMenu, setShowAddNewInvoiceMenu] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyActivity, setCompanyActivity] = useState("");
  const [companyVAT, setCompanyVAT] = useState("");
  const [companyOwner, setCompanyOwner] = useState("");
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editInvoice, setEditInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>();

  const { loggedIn, dominosMorePoints, setDominosMorePoints, token, emailLogin } = useContext(LoginContext);
  const { setModalType, setOpenModal } = useContext(ModalContext);
  const { itemsInBasket, setItemsInBasket, orderTime } = useContext(OrderContext);

  useEffect(() => {
    let hours = 0;
    let minutes = 0;

    const now = new Date();

    hours = now.getHours();
    minutes = now.getMinutes();

    setTimeNowInMinutes(hours * 60 + minutes);
  }, [timeNowInMinutes]);

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
    if (chosenDeliveryTimeInMinutes && timeNowInMinutes) {
      setFinalMinutesForDelivery(chosenDeliveryTimeInMinutes - timeNowInMinutes);
    }
  }, [chosenDeliveryTimeInMinutes, timeNowInMinutes, finalMinutesForDelivery]);

  useEffect(() => {
    setError("");
    if (token && emailLogin) {
      const fetchAllInvoices = async () => {
        setLoading(true);
        try {
          const response = await axios.get("http://localhost:3000/api/users/get-invoices", {
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
  }, [emailLogin, token]);

  const items = products
    .map((product) => {
      if (
        product.name.includes("Shumensko 1L") ||
        product.name.includes("Hot Buffalo Wings") ||
        product.name.includes("Strippers") ||
        product.name.includes("Brown") ||
        product.name === "Coca-Cola"
      ) {
        return product;
      }
    })
    .filter((p) => p !== undefined);

  const handleAddToBasket = (name: string, price: string, type: string) => {
    if (loggedIn === false) {
      setModalType("login");
      setOpenModal(true);
    } else {
      setModalType("");
      setOpenModal(false);
      setItemsInBasket((prevState: BasketItem[]) => [
        ...prevState,
        { name: name, price: price, type: type, crust: "", quantity: 1, size: "", toppings: [] },
      ]);
    }
  };

  const handleAddNewInvoice = async () => {
    setLoading(true);
    setError("");

    if (token && emailLogin) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/users/add-invoice",
          { email: emailLogin, companyName, companyAddress, companyActivity, companyVAT, companyOwner },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.newInvoice) {
          const fetchAllInvoices = async () => {
            setLoading(true);

            try {
              const response = await axios.get("http://localhost:3000/api/users/get-invoices", {
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
      const response = await axios.delete("http://localhost:3000/api/users/delete-invoice", {
        headers: { Authorization: `Bearer ${token}` },
        params: { companyVAT, email: emailLogin },
      });

      if (response.data.invoice.modifiedCount === 1) {
        const response = await axios.get("http://localhost:3000/api/users/get-invoices", {
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
          "http://localhost:3000/api/users/update-invoice",
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
            const response = await axios.get("http://localhost:3000/api/users/get-invoices", {
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
    <div className="checkout-page">
      <Navbar page="checkout" />

      <div className="checkout-page-content-container">
        <div className="checkout-page-carousel-container">
          <p className="checkout-page-carousel-heading">HAVE YOU TRIED OUR...</p>

          {items.length === 5 && (
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={10}
              slidesPerView={4}
              autoplay={{ delay: 2000, disableOnInteraction: true }}
              loop={true}
              style={{ marginLeft: "20px" }}
              speed={2000}
            >
              {items.map((item) => (
                <SwiperSlide key={item?.name}>
                  <div className="checkout-page-carousel-item">
                    <img src={item?.img} className="checkout-page-carousel-image" alt={item?.name} />
                    <span>
                      <p>{item?.name}</p>
                      <p>{item?.price[0].medium?.toFixed(2)} BGN</p>
                    </span>
                    <span
                      className="checkout-page-carousel-add-to-basket"
                      onClick={() =>
                        handleAddToBasket(
                          item?.name as string,
                          item?.price[0].medium as unknown as string,
                          item?.type as string
                        )
                      }
                    >
                      <img src="/svg/addToBasket.svg" alt="Add to Basket" />
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className="checkout-pizza-meter">
          <div className="checkout-dominos-more-container">
            <img src="/images/dominos_more.png" className="checkout-dominos-more" />
          </div>

          <div className="checkout-pan-container">
            <img
              src={`${
                dominosMorePoints === 0
                  ? "/images/dominos_more_pan.png"
                  : dominosMorePoints === 1
                  ? "/images/dominos_more_pan_1.png"
                  : dominosMorePoints === 2
                  ? "/images/dominos_more_pan_2.png"
                  : dominosMorePoints === 3
                  ? "/images/dominos_more_pan_3.png"
                  : dominosMorePoints === 4
                  ? "/images/dominos_more_pan_4.png"
                  : dominosMorePoints === 5
                  ? "/images/dominos_more_pan_5.png"
                  : dominosMorePoints === 6
                  ? "/images/dominos_more_pan_6.png"
                  : ""
              }`}
              className="checkout-pan"
            />
          </div>

          <div className="checkout-dominos-more-points-container">
            <p className="checkout-pm-text">PIZZA METER</p>

            <p className="checkout-pm-points-digits">{dominosMorePoints > 0 && dominosMorePoints}0</p>
            <p className="checkout-pm-points-text">POINTS</p>
          </div>
        </div>

        <div className="checkout-details-container">
          <div className="checkout-details-delivery">
            <span className="checkout-details-step">1</span>

            <p className="checkout-details-delivery-heading">DELIVERY DETAILS</p>

            <div className="checkout-dd-time">
              <img src="/svg/checkout/timer.svg" />
              <p className="checkout-dd-text">
                Your order will be delivered in{" "}
                <span className="checkout-dd-text-time">
                  {finalMinutesForDelivery}
                  <span className="checkout-dd-text-aps">'</span>
                </span>
              </p>
            </div>

            <div className="checkout-dd-address">
              <img src="/svg/checkout/place.svg" />
              <p>
                Your address:{" "}
                <span className="checkout-dd-address-details">
                  {localStorage.getItem("user") &&
                    JSON.parse(localStorage.getItem("order-details") as string).addressLocation}{" "}
                  {localStorage.getItem("user") &&
                    JSON.parse(localStorage.getItem("order-details") as string).addressName}
                </span>
              </p>
            </div>

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
            </div>

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
                {allInvoices.map((invoice) => (
                  <div key={uuid()} className="checkout-single-invoice-container">
                    <div>
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

                <div
                  className="checkout-new-invoice-btn"
                  onClick={() => (selectedInvoice ? handleUpdateInvoice() : handleAddNewInvoice())}
                >
                  Save
                </div>

                <p className="checkout-error">{error && error}</p>
              </div>
            )}
          </div>
          <div className="checkout-details-payment">
            <span className="checkout-details-step">2</span>
          </div>
          <div className="checkout-details-order">
            <span className="checkout-details-step">3</span>

            {itemsInBasket.map((item) => (
              <p key={uuid()}>
                {item.deal ? item.desc : item.name} x {item.quantity}
              </p>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
