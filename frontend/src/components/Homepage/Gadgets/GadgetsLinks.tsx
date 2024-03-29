import "./GadgetsLinks.css";
import PizzaMeter from "./PizzaMeter";
import SingleGadgetLink from "./SingleGadgetLink";

const GadgetsLinks = () => {
  return (
    <>
      <div>
        <SingleGadgetLink
          bgColor="#e31837"
          title="PIZZA TRACKER"
          description="Track your order using our unique real-time Pizza Tracker!"
          btnBg="#000"
          btnLink=""
          btnText="TRACK YOUR ORDER NOW!"
        />
      </div>

      <div>
        <SingleGadgetLink
          bgColor="#e31837"
          title="Careers"
          description="Please fill the application form"
          btnBg="#000"
          btnLink=""
          btnText="JOB APPLICATION"
        />
      </div>

      <div>
        <SingleGadgetLink
          bgColor="#006491"
          title="SUBSCRIBE NOW"
          description="Sign up on our newsletter and be the first to know of our hot deals!"
          btnBg="#000"
          btnLink=""
          btnText="Subscribe"
        />
      </div>

      <div>
        <PizzaMeter />
      </div>
    </>
  );
};

export default GadgetsLinks;
