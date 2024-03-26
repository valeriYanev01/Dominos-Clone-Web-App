import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <div className="homepage">
      <Navbar />

      <div className="header">
        <ul>
          <li>
            <img src="/images/banner_1.jpg" />
            <p>Text</p>
          </li>
          <li>
            <img src="/images/banner_2.jpg" />
            <p>Text</p>
          </li>
          <li>
            <img src="/images/banner_3.jpg" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
