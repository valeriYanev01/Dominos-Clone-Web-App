import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Deals from "../../components/Homepage/Deals";

const Home = () => {
  return (
    <div className="homepage">
      <Navbar />

      <div className="header">
        <Deals />
      </div>
    </div>
  );
};

export default Home;
