import "./GadgetsLinks.css";
import PizzaMeter from "./PizzaMeter";
import SingleGadgetLink from "./SingleGadgetLink";

const GadgetsLinks = () => {
  return (
    <>
      <div className="gadget">
        <SingleGadgetLink
          bgColor="#e31837"
          title="PIZZA TRACKER"
          description="Track your order using our unique real-time Pizza Tracker!"
          btnBg="#000"
          btnLink=""
          btnText="TRACK YOUR ORDER NOW!"
          btnColor="#fff"
        />
      </div>

      <div className="gadget">
        <SingleGadgetLink
          bgColor="#e31837"
          title="CAREERS"
          description="Please fill the application form"
          btnBg="#000"
          btnLink=""
          btnText="JOB APPLICATION"
          btnColor="#fff"
        />
      </div>

      <div className="gadget">
        <SingleGadgetLink
          bgColor="#006491"
          title="SUBSCRIBE NOW"
          description="Sign up on our newsletter and be the first to know of our hot deals!"
          btnBg="#FFF"
          btnLink=""
          btnText="SUBSCRIBE"
          btnColor="#0f74a8"
        />
      </div>

      <div>
        <PizzaMeter />
      </div>
    </>
  );
};

export default GadgetsLinks;
