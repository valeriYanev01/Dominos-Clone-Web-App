import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/Homepage/Header/Slider";
import Deals from "../../components/Homepage/Deals/Deals";
import Gadgets from "../../components/Homepage/Gadgets/Gadgets";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="homepage">
      <Navbar />
      <Slider />
      <Deals />
      <Gadgets />
      <Footer />
    </div>
  );
};

export default Home;
