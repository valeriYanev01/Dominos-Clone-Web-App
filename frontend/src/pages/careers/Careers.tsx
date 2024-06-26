import React, { useState } from "react";
import axios from "axios";
import "./Careers.css";
import Navbar from "../../components/Navbar/Navbar";
import Heading from "../../components/Heading/Heading";
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
  const [error, setError] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!executeRecaptcha) {
      setError("Execute reCAPTCHA not available yet");
      return;
    }

    const recaptchaToken = await executeRecaptcha("apply");

    if (recaptchaToken) {
      try {
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
              alert("Application successfully submitted!");
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
      }
    }
  };

  return (
    <div className="careers-page">
      <Navbar page="careers" />

      <div className="careers-container">
        <div className="careers-heading">
          <Heading text="JOB APPLICATION" />
        </div>

        <div className="careers-body">
          <p className="careers-body-text">
            Making and delivering a pizza in about 30 minutes is a big challenge. In order to help the people who work
            at Domino’s to develop their talent and reach their potential, we offer:
          </p>

          <ul>
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
              <div>
                <label>NAME *</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div>
                <label>CITY *</label>
                <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} />

                <label>TELEPHONE NUMBER *</label>
                <input type="text" required value={number} onChange={(e) => setNumber(e.target.value)} />
              </div>

              <div>
                <div>
                  <label>DATE OF BIRTH *</label>
                  <input type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                </div>

                <label>EMAIL</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <p>I WOULD LIKE TO APPLY FOR: *</p>

              <input
                type="radio"
                name="job"
                value="Delivery Drivers"
                required
                onChange={() => setPosition("Delivery Drivers")}
              />
              <label>Delivery Drivers</label>

              <input
                type="radio"
                name="job"
                value="Kitchen Staff"
                required
                onChange={() => setPosition("Kitchen Staff")}
              />
              <label>Kitchen Staff</label>

              <input type="radio" name="job" value="Either One" required onChange={() => setPosition("Either One")} />
              <label>Either One</label>
            </div>

            <div>
              <div>
                <p>SEND US YOUR CV</p>
                <input
                  type="file"
                  accept=".doc, .docx, .pdf, .txt, .image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) setCv(e.target.files[0]);
                  }}
                />
              </div>
            </div>

            <div>
              <div>
                <input type="checkbox" />
                <label>
                  By applying for a job at LN Solutions LTD I hereby confirm that I have read the Job Application Data
                  Collection and Recording Policy and I desire that the administrator company LN Solution Ltd collects
                  and processes the personal data that I submit by completing the form at www.dominos.bg/career as well
                  as the personal data that I have sent in the CV.
                </label>
              </div>
              <div>
                <input type="checkbox" />
                <label>
                  I confirm that I have read and I agree with the Statement of Consent for Personal Data Processing
                  Related to Job Applications
                </label>
              </div>
            </div>

            <p>All fields marked with ( *) are </p>

            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
