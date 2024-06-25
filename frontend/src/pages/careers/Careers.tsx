import React, { useContext } from "react";
import axios from "axios";
import "./Careers.css";
import Navbar from "../../components/Navbar/Navbar";
import Heading from "../../components/Heading/Heading";
import Footer from "../../components/Footer/Footer";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { LoginContext } from "../../context/LoginContext";

const Careers: React.FC = () => {
  const { token } = useContext(LoginContext);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!executeRecaptcha) {
      console.log("Execute reCAPTCHA not available yet");
      return;
    }

    const recaptchaToken = await executeRecaptcha("apply");

    if (recaptchaToken) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/users/apply",
          {
            recaptchaToken: recaptchaToken,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const result = response.data;
        if (result.success) {
          console.log("reCAPTCHA verification successful");
        } else {
          console.log("reCAPTCHA verification failed", result["error-codes"]);
        }
      } catch (err) {
        console.log("Error verifying reCAPTCHA:", err);
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
              <div>
                <label>NAME *</label>
                <input type="text" required />
              </div>

              <div>
                <label>CITY *</label>
                <input type="text" required />

                <label>TELEPHONE NUMBER *</label>
                <input type="text" required />
              </div>

              <div>
                <div>
                  <label>DATE OF BIRTH *</label>
                  <input type="date" required />
                </div>

                <label>EMAIL</label>
                <input type="email" />
              </div>
            </div>

            <div>
              <p>I WOULD LIKE TO APPLY FOR: *</p>

              <input type="radio" name="job" value="Delivery Drivers" required />
              <label>Delivery Drivers</label>

              <input type="radio" name="job" value="Kitchen Staff" required />
              <label>Kitchen Staff</label>

              <input type="radio" name="job" value="Either One" required />
              <label>Either One</label>
            </div>

            <div>
              <div>
                <p>SEND US YOUR CV</p>
                <input type="file" accept=".doc, .docx, .pdf, .txt, .image/*" />
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
