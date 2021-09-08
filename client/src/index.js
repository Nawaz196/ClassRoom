import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TimeTableContextProvider } from "./context/timeTable/timeTableContext";

ReactDOM.render(
  <React.StrictMode>
    <TimeTableContextProvider>
      <App />
    </TimeTableContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
