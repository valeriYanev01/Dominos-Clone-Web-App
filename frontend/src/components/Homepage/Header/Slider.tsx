import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.css";
import SliderInformation from "./SliderInformation";

const Slider = () => {
  const INTERVAL = 3000;

  return (
    <div className="af-height-100 af-max-width mx-auto">
      <Carousel controls={false} pause={"hover"}>
        <Carousel.Item interval={INTERVAL} className="img-container">
          <img className="d-block w-100 mh-100 header-img" src="/images/banner_1.jpg" alt="First slide" />
          <SliderInformation
            caption="SECOND PIZZA HALF PRICE!"
            valid="Carry-Out Special"
            desc="Buy one pizza and get the second one 50% OFF!"
          />
          <Carousel.Caption className="position-absolute"></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={INTERVAL} className="img-container">
          <img className="d-block w-100 mh-100 header-img" src="/images/banner_2.jpg" alt="Second slide" />

          <Carousel.Caption className="position-absolute"></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={INTERVAL} className="img-container">
          <img className="d-block w-100 mh-100 header-img" src="/images/banner_3.jpg" alt="Third slide" />
          <SliderInformation
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

export default Slider;
