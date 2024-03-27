import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Deals.css";
import DealInformation from "./DealInformation";

const Deals = () => {
  return (
    <div className="af-height-100 af-max-width mx-auto">
      <Carousel controls={false}>
        <Carousel.Item interval={2000} className="img-container">
          <img className="d-block w-100 mh-100 header-img" src="/images/banner_1.jpg" alt="First slide" />
          <Carousel.Caption className="position-absolute"></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000} className="img-container">
          <img className="d-block w-100 mh-100 header-img" src="/images/banner_2.jpg" alt="Second slide" />
          <Carousel.Caption className="position-absolute"></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000000} className="img-container">
          <img className="d-block w-100 mh-100 header-img" src="/images/banner_3.jpg" alt="Third slide" />
          <DealInformation
            caption="Third pizza for 5.50BGN"
            valid="Valid for delivery and carry-out"
            desc="Order two pizzas and get a third one for only 5.50BGN, regardless of the size! If the pizzas are of different value you get the one of lowest value for 5.50BGN."
          />
          <Carousel.Caption className="position-absolute"></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Deals;
