import "./DownloadApp.css";

const DownloadApp = () => {
  return (
    <div className="gadgets-download">
      <div className="gadgets-download-title-container">
        <img src="/svg/decorLeftWhite.svg" className="deal-decor" />
        <span className="gadgets-download-title">DOMINO'S PIZZA APP</span>
        <img src="/svg/decorRightWhite.svg" className="deal-decor" />
      </div>

      <div className="gadgets-download-desc-container">
        <span className="gadgets-download-desc">Order online using our FREE Domino’s app. Download now here!</span>
      </div>

      <div className="gadgets-download-platform-container">
        <img src="/svg/homepage/apple.svg" className="gadgets-download-platform" />
        <img src="/svg/homepage/android.svg" className="gadgets-download-platform" />
        <img src="/images/huawei_icon.png" className="gadgets-download-platform" />
      </div>

      <img src="/images/download_app.webp" className="gadgets-download-phone" />
    </div>
  );
};

export default DownloadApp;
