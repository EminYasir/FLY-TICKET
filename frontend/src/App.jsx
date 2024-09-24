import { Route, Routes } from "react-router-dom";
import HomePages from "../pages/HomePages";
import MyFlightsPages from "../pages/MyFlightsPages";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePages />} />
      <Route path="/flights" element={<MyFlightsPages />} />
    </Routes>
  );
}

export default App;
