
import FlightOption from "./FlightOption";
import PropTypes from "prop-types";

const FlightOptions = ({ searchValues,flights }) => {
  

 

  console.log(searchValues);
  return (
    <div style={{ display: "flex", marginBottom: "15px" }}>
      <div
        className="flight-options"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "15px",
          gap: 10,
          width: "75%",
        }}
      >
        {console.log(flights)}
        {flights?.flights?.map((fly)=>(
            <FlightOption fly={fly} key={fly._id}></FlightOption>
        ))}
        
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "15px",
          gap: 10,
          width: "25%",
        }}
      >
        <div
          style={{
            padding: "22px",
            backgroundColor: "#dac8da",
          }}
        >
          {/* Sort By Dropdown */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontWeight: "bold",
                marginBottom: "5px",
                display: "block",
              }}
            >
              Sort by:
            </label>
            <select
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            >
              <option value="Lowest Price">Lowest Price</option>
              <option value="Highest Price">Highest Price</option>
              <option value="Earliest Arrival">Earliest Arrival</option>
            </select>
          </div>

          {/* Arrival Time */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontWeight: "bold",
                marginBottom: "5px",
                display: "block",
              }}
            >
              Arrival Time
            </label>
            <div>
              <label>
                <input type="radio" value="morning" /> 5:00 AM - 11:59 AM
              </label>
            </div>
            <div>
              <label>
                <input type="radio" value="afternoon" /> 12:00 PM - 5:59 PM
              </label>
            </div>
          </div>

          {/* Stops */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontWeight: "bold",
                marginBottom: "5px",
                display: "block",
              }}
            >
              Stops
            </label>
            <div>
              <label>
                <input type="radio" value="nonstop" /> Nonstop $230
              </label>
            </div>
            <div>
              <label>
                <input type="radio" value="1stop" /> 1 Stop $230
              </label>
            </div>
            <div>
              <label>
                <input type="radio" value="2plus" /> 2+ Stops $230
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightOptions;

FlightOptions.propTypes = {
  searchValues: PropTypes.objct,
  flights:PropTypes.object
};
