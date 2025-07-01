import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./component/App";
import StarRating from "./component/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      defaultRate={3}
      starLength={5}
      color={"#ad1542"}
      removeNumberStars={true}
    /> */}
  </React.StrictMode>
);
