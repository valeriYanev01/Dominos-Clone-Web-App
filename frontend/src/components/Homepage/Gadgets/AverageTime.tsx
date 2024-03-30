import "./AverageTime.css";

const AverageTime = () => {
  return (
    <div className="gadgets-average-time">
      <img src="/svg/homepage/live.svg" className="gadgets-live-svg" />
      <div className="gadgets-delivery-minutes-container">
        <img
          src="/svg/decorLeftRed.svg"
          className="deal-decor-left deal-decor"
          style={{ paddingLeft: "20px", width: "55px", height: "50px" }}
        />
        <span className="gadgets-delivery-text">
          The average delivery time <span className="gadgets-now-text">now</span> of our stores is:
        </span>
        <div>
          <span className="gadgets-delivery-number blue">2</span>
          <span className="gadgets-delivery-number red">0</span>
          <span className="gadgets-apostrophy">'</span>
        </div>
        <img
          src="/svg/decorRightRed.svg"
          className="deal-decor-right deal-decor"
          style={{ width: "55px", height: "50px", paddingRight: "20px" }}
        />
      </div>
    </div>
  );
};

export default AverageTime;
