import { Button } from "antd";
import { FaPlane } from "react-icons/fa";
import "./FlightOption.css";
import moment from "moment"; // moment'i içe aktarın

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const FlightOption = ({ fly }) => {
  

  const scheduleTime = moment(fly.scheduleTime, "HH:mm:ss");
  const lastUpdatedAt = moment(fly.lastUpdatedAt, "HH:mm:ss");

  // İki zaman arasındaki farkı hesaplama
  const difference = moment.duration(lastUpdatedAt.diff(scheduleTime));

  // Farkı saat ve dakika olarak ayırma
  const hours = difference.hours();
  const minutes = difference.minutes();

  const [airline, setAirline] = useState(" ss")
  const [ICAO]=useState(fly.prefixICAO)

  useEffect(() => {
    const fetchAirline = async () => {
      const response = await fetch(`http://localhost:5000/api/flights/airlines/${ICAO}`, {
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
      setAirline(data.publicName);
    };
    fetchAirline();
  }, [ICAO]);

  const handleBookFlight = async () => {
    const updatedFlightData = {
      airline:  airline,
      flightNumber: fly.flightNumber,
      departureTime: moment(fly.scheduleTime, "HH:mm:ss").format("HH:mm"),
      arrivalTime: moment(fly.lastUpdatedAt, "HH:mm:ss").format("HH:mm"),
      departureAirport:
        fly.flightDirection === "D" ? "AMS" : fly.route.destinations[0],
      arrivalAirport:
        fly.flightDirection === "D" ? fly.route.destinations[0] : "AMS",
      price: "200",
    };
    try {
      const response = await fetch("http://localhost:5000/api/flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: await JSON.stringify(updatedFlightData), // flightData'yı JSON formatında gönder
      });

      if (!response.ok) {
        throw new Error("Ağ hatası: " + response.statusText); // Hata kontrolü
      }

      const data = await response.json(); // Yanıtı JSON formatında al
      console.log("Uçuş başarıyla kaydedildi:", data);
      // Kullanıcıya başarılı bir mesaj gösterebilirsiniz
    } catch (error) {
      console.error("Uçuş kaydedilirken hata oluştu:", error);
      // Hata mesajını kullanıcıya gösterebilirsiniz
    }
  };

  return (
    <div>
      <div className="flight-option" style={{ marginTop: "5px" }}>
        <div
          className="info"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "space-between",
            gap: 15,
            backgroundColor: "white",
            borderRadius: "10px",
            borderBottomLeftRadius: 0,
          }}
        >
          <p style={{ marginTop: "3%", paddingLeft: "2%" }}>
            {fly.flightDirection === "D" ? (
              <strong>Almanya - {fly.route.destinations}</strong>
            ) : (
              <strong>{fly.route.destinations}-Almanya</strong>
            )}
          </p>
          <div
            style={{
              width: "95%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "3%",
              marginRight: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ marginLeft: "0" }}>
                <FaPlane style={{ fontSize: "14px" }} /> Departure
              </p>
              <b style={{ fontSize: "20px" }}>
                {" "}
                {moment(fly.scheduleTime, "HH:mm:ss").format("HH:mm")}
              </b>
              <p style={{ marginLeft: "0" }}>
                Airport:{" "}
                <span style={{ textTransform: "uppercase" }}>
                  {fly.flightDirection === "D" ? "AMS" : fly.route.destinations}
                </span>
              </p>
            </div>
            <div>---------------------------------</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <p>{fly.flightName}</p>
              <p>{fly.prefixICAO}</p>
              <FaPlane style={{ fontSize: "20px" }} />
              <p>
                {" "}
                {hours}h {minutes}m
              </p>
            </div>
            <div>---------------------------------</div>
            <div>
              <p style={{ marginLeft: "0" }}>
                <FaPlane style={{ fontSize: "14px" }} /> Arrival
              </p>
              <b style={{ fontSize: "20px" }}>
                {" "}
                {moment(fly.lastUpdatedAt, "HH:mm:ss").format("HH:mm")}
              </b>
              <p style={{ marginLeft: "0" }}>
                Airport:{" "}
                <span style={{ textTransform: "uppercase" }}>
                  {fly.flightDirection === "D" ? fly.route.destinations : "AMS"}
                </span>
              </p>
            </div>
          </div>
          <div
            className="price-btn"
            style={{
              width: "97%",
              paddingLeft: "3%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="price" style={{ marginBottom: "20px" }}>
              <b style={{ fontSize: "20px", margin: "0", color: "#ae63b8" }}>
                Price: $200$
              </b>
              <p style={{ fontSize: "15px", color: "gray", margin: "5px" }}>
                Round Trip
              </p>
            </div>
            <Button
              className="custom-button"
              style={{
                width: "20%",
                height: "80px",
                fontSize: "15px",
                margin: "0",
              }}
              onClick={handleBookFlight}
            >
              Book Flight
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Button
          style={{
            width: "150px",
            height: "50px",
            marginTop: "-1px",
            backgroundColor: "white",
            opacity: "0.6",
            color: "#7000cc",
          }}
        >
          Check the details
        </Button>
      </div>
    </div>
  );
};

export default FlightOption;

FlightOption.propTypes = {
  fly: PropTypes.objct,
};
