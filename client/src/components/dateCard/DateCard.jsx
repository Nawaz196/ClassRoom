import React, { useState, useContext, useEffect } from "react";
import { BsPencil } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import "./DateCard.css";
import DialogBox from "../dialogBox/DialogBox";

function DateCard({ month, date, isStudent, val, tt_day, p_day }) {
  const presentDate = new Date().getDate();
  const presentMonth = new Date().getMonth() + 1;
  const [dialogOpen, setDialogOpen] = useState(false);

  let r = 0;
  if (date !== "" && date % 7 !== val) {
    r = Number((p_day + (date - 1)) % 7);
    if (r === 0) r = 7;
    // console.log(r);
  }
  // console.log(r);

  //console.log(tt_day);

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
            <SiGoogleclassroom /> &nbsp;
            {tt_day[r - 1][0]?.length} Classes
            {/* {2} Classes */}
          </h5>
        </div>
        {dialogOpen && (
          <DialogBox
            type={isStudent ? "student" : "teacher"}
            isOpen={dialogOpen}
            tt_day={tt_day[r - 1][0]}
            // tt_day={2}
          />
        )}
      </div>
    );
  }
}

export default DateCard;
