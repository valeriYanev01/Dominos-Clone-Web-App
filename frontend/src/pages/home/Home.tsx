import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/Homepage/Header/Slider";
import Deals from "../../components/Homepage/Deals/Deals";
import Gadgets from "../../components/Homepage/Gadgets/Gadgets";

const Home = () => {
  return (
    <div className="homepage">
      <Navbar />

      <div className="header">
        <Slider />
      </div>

      <Deals />

      <Gadgets />
    </div>
  );
};

export default Home;
