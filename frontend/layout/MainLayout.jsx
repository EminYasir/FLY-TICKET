import { Button } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const MainLayout = (props) => {

  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems:"center",
          minHeight:"60px",
          width: "100%",
          backgroundColor:"#dac8da"
        }}
      >
        <Button
          style={{ height:"55px", fontSize: "25px" }}
          onClick={() => {
            navigate(`/`);
          }}
        >
          Ana Sayfa
        </Button>
        <Button
          style={{ height:"55px", fontSize: "25px"}}
          onClick={() => {
            navigate(`/flights`);

          }}
        >
          Uçuşlarım
        </Button>
      </div>
      {props.children}
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node,
};
