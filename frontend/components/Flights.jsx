import { Button } from "antd";
import "./Flights.css";
import { FaInfo, FaPlane, FaStar } from "react-icons/fa";
import MyFlight from "./MyFlight";
import { useEffect, useState } from "react";

const Flights = () => {
  const [myFlights, setMyFlights] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchAirline = async () => {
      const response = await fetch(`${apiUrl}/api/flights/`, {
        method: "GET",
        headers: {
          app_id: import.meta.env.YOUR_APP_ID,
          app_key: import.meta.env.YOUR_APP_KEY,
          ResourceVersion: "v4", // API versiyonu
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
  
      const data = await response.json();
      console.log(data);
      setMyFlights(data);
    };
    fetchAirline();
  }, [apiUrl]);

  console.log(myFlights)

  return (
    <div
      className="container"
      style={{
        backgroundColor: "#d9a5e7",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        minHeight:"100vh"
      }}
    >
      <div style={{ width: "90%",marginTop:"50px" }}>
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
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
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
              <h2 style={{ textTransform: "uppercase" }}>My Fligths</h2>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            width: "100%",
            height:"50px",
          }}
        >
          <div className="options" style={{display:"flex",gap:10,margin:"10px 25px"}}>
            <Button>Times</Button>
            <Button>Stops</Button>
            <Button>Airlines</Button>
            <Button>Airports</Button>
            <Button>Amenities</Button>
          </div>
          <div style={{ display: "flex", gap: 10 ,margin:"5px"}}>
            <div>
              <FaStar></FaStar>
            </div>
            <div>
              <FaStar></FaStar>
              <FaStar></FaStar>
            </div>
            <div>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
            </div>
            <div>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
            </div>
            <div>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "#dac8da",
            minHeight:"700px",
            marginBottom:"10px"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex",flexDirection:"column", gap: 5,marginTop:"10px",marginBottom:"50px",backgroundColor:"#cecccc", width:"100%", minHeight:"500px" }}>
              <div style={{width:"90%",display:"flex",justifyContent:"space-between",alignItems:"center",margin:"25px auto 0"}}>
                <div style={{fontSize:"18px", margin:"15px"}}>
                  Sort by:<b>Recomended</b>
                </div>
                <div>
                  <FaInfo></FaInfo> Avg Fare : <b>$225</b>
                </div>
              </div>
              {myFlights.map((values)=>(
                  <MyFlight values={values} key={values._id}/>
              ))}
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Flights;
