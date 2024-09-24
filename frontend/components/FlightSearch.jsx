import "./FlightSearch.css";
import { Button, DatePicker, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { FaPlane } from "react-icons/fa";
import PropTypes from "prop-types";
import moment from "moment"; // moment'i içe aktarın

const FlightSearch = ({ setSearchValues ,setFlights}) => {
  const [flyType, setFlyType] = useState(true);
  const [flightDirection, setFlightDirection] = useState("D");
  const [destinations, setDestinations] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchAirlines = async () => {
      const response = await fetch(`${apiUrl}/api/destinations`, {
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
      setDestinations(data);
    };
    fetchAirlines();
  }, [apiUrl]);

  const fetchFlights = async ({
    flightDirection,
    scheduleDate,
    destination,
  }) => {
    console.log(flightDirection, scheduleDate, destination);
    try {
      const response = await fetch(
        `${apiUrl}/api/flights/flights?flightDirection=${flightDirection}&scheduleDate=${scheduleDate}&destination=${destination}`,
        {
          method: "GET",
          headers: {
            app_id: import.meta.env.YOUR_APP_ID,
            app_key: import.meta.env.YOUR_APP_KEY,
            ResourceVersion: "v4", // API versiyonu
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Uçuşlar:", data);
      setFlights(data);
      return data; // Alınan uçuş verisini geri döndür
    } catch (error) {
      console.error("Uçuşlar alınamadı:", error);
    }
  };

  const onFinish = (values) => {
    // flightDirection, scheduleDate ve destination değerlerini formdan al
    const { departure, arrival, departureDate } = values;
    const formattedDate = moment(departureDate).format("YYYY-MM-DD");

    const flightData = {
      flightDirection, // Tek yön mü, dönüş mü
      scheduleDate: formattedDate, // Kalkış tarihi
      destination: flightDirection === "D" ? arrival : departure, // Varış yeri
    };
    console.log(values);
    console.log(flightData);

    fetchFlights(flightData)
      .then((flights) => {
        console.log("Alınan Uçuşlar:", flights);
        setSearchValues(flightData); // İstediğiniz şekilde verileri frontend'de kullanabilirsiniz
      })
      .catch((error) => console.error("Uçuş fetch hatası:", error));
  };

  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "20px" }}>
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
              gap: 5,
            }}
          >
            <div style={{ fontSize: "20px", color: "black" }}>
              <FaPlane />
            </div>
            <h6 style={{ textTransform: "uppercase", fontSize: "15px" }}>
              Book your Flight
            </h6>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: 2,
            }}
          >
            <Button
              style={{
                borderBottomLeftRadius: "20px",
                borderTopLeftRadius: "20px",
                backgroundColor:
                  flightDirection === "D" ? "#6a5acd" : "#f0f0f0", // Tıklanan buton mavi olacak
                color: flightDirection === "D" ? "white" : "black",
              }}
              onClick={() => {
                setFlightDirection("D");
              }}
            >
              Departure
            </Button>
            <Button
              style={{
                borderBottomRightRadius: "20px",
                borderTopRightRadius: "20px",
                backgroundColor:
                  flightDirection === "A" ? "#6a5acd" : "#f0f0f0", // Tıklanan buton mavi olacak
                color: flightDirection === "A" ? "white" : "black",
              }}
              onClick={() => setFlightDirection("A")}
            >
              Arrival
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: 2,
            }}
          >
            <Button
              style={{
                borderBottomLeftRadius: "20px",
                borderTopLeftRadius: "20px",
              }}
              onClick={() => setFlyType(true)}
            >
              RoundTrip
            </Button>
            <Button
              style={{
                borderBottomRightRadius: "20px",
                borderTopRightRadius: "20px",
              }}
              onClick={() => setFlyType(false)}
            >
              One way
            </Button>
          </div>
        </div>

        <Form onFinish={onFinish}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 3,
                width: "50%",
              }}
            >
              <Form.Item
                name="departure"
                style={{ flex: 1 }}
                rules={[
                  { required: true, message: "Please select a destination" },
                ]}
              >
                {flightDirection === "D" ? (
                  <Select
                    style={{ margin: "0", height: "45px" }}
                    prefix={<FaPlane />}
                    showSearch
                    placeholder="Select a destination"
                    optionFilterProp="label"
                    options={[
                      {
                        value: "AMS",
                        label: "Amsterdam , AMS",
                      },
                    ]}
                  />
                ) : (
                  <Select
                    style={{ margin: "0", height: "45px" }}
                    prefix={<FaPlane />}
                    showSearch
                    placeholder="Select a destination"
                    optionFilterProp="label"
                    options={
                      Array.isArray(destinations.destinations)
                        ? destinations.destinations.map((destination) => ({
                            value: destination.iata,
                            label: destination.city
                              ? destination.city + " , " + destination.iata
                              : destination.country + " , " + destination.iata,
                          }))
                        : []
                    }
                  />
                )}
              </Form.Item>

              <Form.Item name="arrival" style={{ flex: 1 }}>
                {flightDirection === "A" ? (
                  <Select
                    style={{ margin: "0", height: "45px" }}
                    prefix={<FaPlane />}
                    showSearch
                    placeholder="Select a destination"
                    optionFilterProp="label"
                    options={[
                      {
                        value: "AMS",
                        label: "Amsterdam , AMS",
                      },
                    ]}
                  />
                ) : (
                  <Select
                    style={{ margin: "0", height: "45px" }}
                    prefix={<FaPlane />}
                    showSearch
                    placeholder="Select a destination"
                    optionFilterProp="label"
                    options={
                      Array.isArray(destinations.destinations)
                        ? destinations.destinations.map((destination) => ({
                            value: destination.iata,
                            label: destination.city
                              ? destination.city + " , " + destination.iata
                              : destination.country + " , " + destination.iata,
                          }))
                        : []
                    }
                  />
                )}
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                width: "40%",
              }}
            >
              <Form.Item
                name="departureDate"
                style={{ flex: 1 }}
                rules={[
                  { required: true, message: "Please select a departure date" },
                ]}
              ></Form.Item>
              <Form.Item
                name="departureDate"
                style={{ flex: 1 }}
                rules={[
                  { required: true, message: "Please select a departure date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              {flyType && (
                <Form.Item
                  name="returnDate"
                  style={{ flex: 1 }}
                  rules={[
                    { required: true, message: "Please select a return date" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              )}
            </div>
          </div>
          <div style={{ paddingTop: "15px" }}>
            <Button type="primary" htmlType="submit">
              Show Flights
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default FlightSearch;

FlightSearch.propTypes = {
  setSearchValues: PropTypes.func,
  setFlights:PropTypes.func
};
