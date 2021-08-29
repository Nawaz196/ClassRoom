import React from "react";
import "../dateCard/DateCard.css";

const DaysCard = ({ day }) => {
  return (
      <div
        className="card"
        style={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>{day} </p>
      </div>
  );
};

export default DaysCard;
