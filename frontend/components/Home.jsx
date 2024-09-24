import { FaPlane } from "react-icons/fa";
import FlightSearch from "./FlightSearch";
import "./Home.css";
import SideMenu from "./SideMenu";
import { useState } from "react";
import FlightOptions from "./FlightOptions";
const Home = () => {
  const [searchValues,setSearchValues] = useState({
    departure: "",
    departureTime: "",
    arrival: "",
    arrivalTime: "",
  });

  const [flights, setFlights] = useState([]);


  console.log(searchValues)
  return (
    <div
      className="container"
      style={{
        backgroundColor: "#d9a5e7",
        width: "90%",
        padding: "5%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "90%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "#dac8da",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "98%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0",
                  width: "35px",
                  height: "35px",
                  backgroundColor: "white",
                  borderRadius: "100px",
                }}
              >
                <FaPlane style={{ fontSize: "25px" }} />
              </div>
              <h2>PLANE SCAPE</h2>
            </div>
            <div style={{ gap: 20, display: "flex", alignItems: "center" }}>
              <div>
                <a>
                  <FaPlane style={{ fontSize: "15px" }} /> Deal
                </a>
              </div>
              <div>
                <a>
                  {" "}
                  <FaPlane style={{ fontSize: "15px" }} /> Discover
                </a>
              </div>
              <div>
                <a>
                  {" "}
                  <FaPlane style={{ fontSize: "15px" }} /> Joane Smitth
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <div className="main-content" style={{ width: "75%" }}>
              <div className="flight-search" style={{ marginBottom: "10px" }}>
                <FlightSearch setSearchValues={setSearchValues} setFlights={setFlights}></FlightSearch>
              </div>

              <FlightOptions searchValues={searchValues} flights={flights}></FlightOptions>
            </div>

            <div
              className="side-menu"
              style={{ width: "20%", marginLeft: "20px" }}
            >
              <SideMenu></SideMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
