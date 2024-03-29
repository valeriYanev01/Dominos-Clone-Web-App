import AverageTime from "./AverageTime";
import DownloadApp from "./DownloadApp";
import "./Gadgets.css";
import GadgetsLinks from "./GadgetsLinks";

const Gadgets = () => {
  return (
    <div className="gadgets">
      <AverageTime />
      <GadgetsLinks />
      <DownloadApp />
    </div>
  );
};

export default Gadgets;
