import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import MainLayout from "../layout/MainLayout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <MainLayout>
        <App />
      </MainLayout>
  </BrowserRouter>
);
