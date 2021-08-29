import React,{useState} from "react";
import "./DateCard.css";
import DialogBox from "../dialogBox/DialogBox";

function DateCard({ month, date }) {
  const presentDate = new Date().getDate();
  const presentMonth = new Date().getMonth() + 1;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = (e) => {
     e.preventDefault();
     dialogOpen ? setDialogOpen(false) : setDialogOpen(true);
  }
  return (
      <div className="card" onClick={handleClick}>
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
        {dialogOpen && <DialogBox isOpen={dialogOpen}/>}
      </div>
  );
}

export default DateCard;
