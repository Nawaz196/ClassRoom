import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import "./DateCard.css";
import DialogBox from "../dialogBox/DialogBox";

function DateCard({ month, date, isStudent, val }) {
  const presentDate = new Date().getDate();
  const presentMonth = new Date().getMonth() + 1;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    dialogOpen ? setDialogOpen(false) : setDialogOpen(true);
  };

  if (month === "" && date === "") {
    return <div className="emptyCard"></div>;
  } else if (date % 7 === val) {
    return (
      <div className="card sunday">
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <p
            className={
              presentMonth === month && date === presentDate
                ? "presentDay"
                : "normalDay"
            }
          >
            {date}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card" onClick={handleClick}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <p
            className={
              presentMonth === month && date === presentDate
                ? "presentDay"
                : "normalDay"
            }
          >
            {date}
          </p>
        </div>

        <div className="info">
          {isStudent && (
            <h5 style={{ color: "#ff8f00" }}>
              <BsPencil /> &nbsp;2 Assignments
            </h5>
          )}
          <h5 style={{ color: "green" }}>
            <SiGoogleclassroom /> &nbsp;6 Classes
          </h5>
        </div>
        {dialogOpen && (
          <DialogBox
            type={isStudent ? "student" : "teacher"}
            isOpen={dialogOpen}
          />
        )}
      </div>
    );
  }
}

export default DateCard;
