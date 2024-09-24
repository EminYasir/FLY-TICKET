import { FaCar, FaHotel, FaTripadvisor } from "react-icons/fa";
import "./SideMenu.css";

const SideMenu = () => {
  return (
    <div>
      <div className="menu-item" style={{ marginBottom: "20px" }}>
        <div className="banner">
          <div className="overlay"></div>
          <img
            src="https://www.istanbul-daily-city-tours.com/Resimler/TurResim/Untitled-212anasayfa.jpg"
            alt="Car Rentals"
          />
          <div className="content">
          <FaCar style={{ fontSize: "30px" }} />
            <p>CAR RENTALS</p>
          </div>
        </div>
      </div>
      <div className="menu-item" style={{ marginBottom: "20px" }}>
        <div className="banner">
          <div className="overlay"></div>
          <img
            src="https://digital.ihg.com/is/image/ihg/intercontinental-istanbul-9065446627-4x3"
            alt="Hotels"
          />
          <div className="content">
          <FaHotel style={{ fontSize: "30px" }} />
            <p>HOTELS</p>
          </div>
        </div>
      </div>
      <div className="menu-item" style={{ marginBottom: "20px" }}>
      <div className="banner">
          <div className="overlay"></div>
          <img
            src="https://blog.wakanow.com/wp-content/uploads/2018/01/travel.jpg"
            alt="TRAVEL PACKAGES"
          />
          <div className="content">
          <FaTripadvisor style={{ fontSize: "30px" }} />
            <p>TRAVEL PACKAGES</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
