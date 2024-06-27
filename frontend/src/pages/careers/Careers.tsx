import React, { useState } from "react";
import axios from "axios";
import "./Careers.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Careers: React.FC = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [cvValue, setCvValue] = useState("");
  const [firstCheckboxChecked, setFirstCheckboxChecked] = useState(false);
  const [secondCheckboxChecked, setSecondCheckboxChecked] = useState(false);
  const [error, setError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [successfulApplied, setSuccessfullApplied] = useState(false);
  const [btnText, setBtnText] = useState("SUBMIT");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsApplying(true);
    setBtnText("SUBMITTING");

    if (!executeRecaptcha) {
      setError("Execute reCAPTCHA not available yet");
      return;
    }

    const recaptchaToken = await executeRecaptcha("apply");

    if (recaptchaToken) {
      try {
        setError("");

        const response = await axios.post("http://localhost:3000/api/users/verify-google-recaptcha-token", {
          recaptchaToken: recaptchaToken,
        });

        const result = response.data;

        if (result.success) {
          try {
            if (!cv) {
              setError("Please upload your CV");
              return;
            }
            setError("");

            const formData = new FormData();

            formData.append("cv", cv);
            formData.append("name", name);
            formData.append("city", city);
            formData.append("number", number);
            formData.append("birthDate", birthDate);
            formData.append("email", email);
            formData.append("position", position);

            const response = await axios.post("http://localhost:3000/api/users/apply", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            const result = response.data;

            if (result.success) {
              setName("");
              setCity("");
              setNumber("");
              setBirthDate("");
              setEmail("");
              setPosition("");
              setCv(null);
              setCvValue("");
              setFirstCheckboxChecked(false);
              setSecondCheckboxChecked(false);
              setError("");

              window.scrollTo(0, 0);

              setSuccessfullApplied(true);
              setBtnText("SUBMITTED ✔");
            } else {
              setError("Something went wrong.");
            }
          } catch (err) {
            if (axios.isAxiosError(err)) {
              setError(err.message);
            }
          }
        } else {
          setError(`reCAPTCHA verification failed", ${result["error-codes"]}`);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(`Error verifying reCAPTCHA:, ${err.message}`);
        }
      } finally {
        setIsApplying(false);
      }
    }
  };

  return (
    <div className="careers-page">
      <Navbar page="careers" />

      <div className="careers-container">
        <div className="careers-heading">
          <img className="deal-decor" src="/svg/decorLeftRed.svg" />
          <p>JOB APPLICATION</p>
          <img className="deal-decor" src="/svg/decorRightRed.svg" />
        </div>

        <div className="careers-body">
          <p className="careers-body-text">
            Making and delivering a pizza in about 30 minutes is a big challenge. In order to help the people who work
            at Domino’s to develop their talent and reach their potential, we offer:
          </p>

          <ul className="careers-body-benefits">
            <li>- Worldwide acknowledged training programs</li>
            <li>- Competitive remuneration</li>
            <li>- Flexible working schedule</li>
            <li>- Opportunity for a long-term career and growth in the company</li>
          </ul>

          <p className="careers-body-text">
            If you wish to be a part of our winning team, to represent Domino’s brand, to deliver security, good service
            and delicious food to our customers, please fill in the form below or send your CV to jobs@dominos.bg and we
            will invite you to an interview.
          </p>

          <form onSubmit={handleSubmit} className="careers-form">
            <div className="careers-jobs-container">
              <p>JOB OPPORTUNITIES</p>

              <div className="careers-jobs">
                <p>Delivery Drivers</p>
                <p>Insiders - Kitchen Staff</p>
              </div>
            </div>

            <div className="careers-personal-details">
              <p>PERSONAL DETAILS</p>
              <div className="careers-personal-details-field-single">
                <label htmlFor="careers-name">NAME *</label>
                <input id="careers-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="careers-personal-details-field-container">
                <div className="careers-personal-details-field">
                  <label htmlFor="city">CITY *</label>
                  <input id="city" type="text" required value={city} onChange={(e) => setCity(e.target.value)} />
                </div>

                <div className="careers-personal-details-field">
                  <label htmlFor="phone-number">TELEPHONE NUMBER *</label>
                  <input
                    id="phone-number"
                    type="text"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="careers-personal-details-field-container">
                <div className="careers-personal-details-field">
                  <label htmlFor="birth-date">DATE OF BIRTH *</label>
                  <input
                    id="birth-date"
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>

                <div className="careers-personal-details-field">
                  <label htmlFor="email">EMAIL</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="careers-positions-outer-container">
              <p className="careers-positions-text">I WOULD LIKE TO APPLY FOR: *</p>

              <div className="careers-positions-container">
                <div className="careers-positions">
                  <input
                    id="delivery"
                    type="radio"
                    name="job"
                    value="Delivery Drivers"
                    required
                    checked={position === "Delivery Drivers"}
                    onChange={() => setPosition("Delivery Drivers")}
                  />
                  <label htmlFor="delivery">Delivery Drivers</label>
                </div>

                <div className="careers-positions">
                  <input
                    id="kitchen"
                    type="radio"
                    name="job"
                    value="Kitchen Staff"
                    required
                    checked={position === "Kitchen Staff"}
                    onChange={() => setPosition("Kitchen Staff")}
                  />
                  <label htmlFor="kitchen">Kitchen Staff</label>
                </div>

                <div className="careers-positions">
                  <input
                    id="either"
                    type="radio"
                    name="job"
                    value="Either One"
                    required
                    checked={position === "Either One"}
                    onChange={() => setPosition("Either One")}
                  />
                  <label htmlFor="either">Either One</label>
                </div>
              </div>
            </div>

            <div className="careers-cv-conditions-container">
              <div className="careers-upload-cv">
                <p>SEND US YOUR CV *</p>
                <input
                  value={cvValue}
                  required
                  type="file"
                  accept=".doc, .docx, .pdf, .txt, .image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCvValue(e.target.value);
                      if (e.target.files[0].size > 1024 * 1024 * 2) {
                        e.target.value = "";
                        setCv(null);
                        setError("Uploading unsuccessful - file too big.");
                      } else {
                        setError("");
                        setCv(e.target.files[0]);
                      }
                    }
                  }}
                />
              </div>

              <div className="careers-conditions-container">
                <div className="careers-conditions">
                  <input
                    type="checkbox"
                    id="cond1"
                    onChange={() => setFirstCheckboxChecked(!firstCheckboxChecked)}
                    checked={firstCheckboxChecked}
                    required
                  />
                  <label htmlFor="cond1">
                    By applying for a job at LN Solutions LTD I hereby confirm that I have read the Job Application Data
                    Collection and Recording Policy and I desire that the administrator company LN Solution Ltd collects
                    and processes the personal data that I submit by completing the form at www.dominos.bg/career as
                    well as the personal data that I have sent in the CV.
                  </label>
                </div>

                <div className="careers-conditions">
                  <input
                    type="checkbox"
                    id="cond2"
                    onChange={() => setSecondCheckboxChecked(!secondCheckboxChecked)}
                    checked={secondCheckboxChecked}
                    required
                  />
                  <label htmlFor="cond2">
                    I confirm that I have read and I agree with the Statement of Consent for Personal Data Processing
                    Related to Job Applications
                  </label>
                </div>
              </div>
            </div>

            <p className="careers-required-fields-text">All fields marked with ( *) are </p>

            <div className="careers-btn-container">
              <button
                type="submit"
                className={`careers-btn ${isApplying || successfulApplied ? "careers-btn-disabled" : ""}`}
                disabled={isApplying || successfulApplied}
              >
                {btnText} <span className={`${isApplying ? "careers-btn-text-dot-animation" : ""}`}></span>
              </button>
            </div>

            {error && <p>{error}</p>}
            {successfulApplied && <div className="careers-success">Application Submitted!</div>}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
