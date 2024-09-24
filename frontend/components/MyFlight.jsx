import { Card } from "antd";
import PropTypes from "prop-types";

const MyFlight = ({values}) => {
  return (
    <div>
      <div
        style={{
            backgroundColor:"#ffffff",
          width: "90%",
          margin: "5px auto",
          height: "150px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "10%", display: "flex", justifyItems: "center" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "70px", height: "70px" }}
              src="https://pbs.twimg.com/profile_images/1748210138765258752/RFih1MpD_400x400.png"
            />
          </div>
        </div>
        <div
          style={{
            width: "45%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", height: "60%" }}>
            <p style={{ fontSize: "25px ", margin: "auto 0" }}>
              {values.departureTime} - {values.arrivalTime}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "60%",
              height: "40%",
            }}
          >
            <div>
              <p style={{ fontSize: "16px ", margin: "auto 0" }}>
                {values.airline}
              </p>
              <a style={{ fontSize: "11px ", margin: "auto 0" }}>
                Fligth Details
              </a>
            </div>
            <div>
              <p style={{ fontSize: "16px ", margin: "auto 0" }}>NonStop</p>
              <p style={{ fontSize: "11px ", margin: "auto 0", color: "gray" }}>
                1h 32m
              </p>
            </div>
            <div>
              <p style={{ fontSize: "16px ", margin: "auto 0" }}>{values.arrivalAirport
              } to {values.departureAirport}</p>
              <p style={{ fontSize: "11px ", margin: "auto 0", color: "gray" }}>
                DL 1443
              </p>
            </div>
          </div>
        </div>
        <div
          style={{ width: "35%", margin: "auto", display: "flex", justifyContent:"end", gap: "10px" }}
        >
          <Card
            style={{
              height: "100px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>PRICE</p>
            <p> ${values.price}</p>
           
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyFlight;


MyFlight.propTypes = {
  values: PropTypes.objct,
};