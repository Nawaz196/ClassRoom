import React from "react";
import "./DateCard.css";



function DateCard({ month, date }) {
  const presentDate = new Date().getDate();
  const presentMonth = new Date().getMonth() + 1;
  

  return (
      <div className="card">
        <p
          className={
            presentMonth === month && date === presentDate
              ? "presentDay"
              : "normalDay"
          }
        >
          {date}
        </p>

        <div className="info">
          <p>2 Assignments</p>
          <p>3 Classes</p>
        </div>
      </div>
  );
}

export default DateCard;
