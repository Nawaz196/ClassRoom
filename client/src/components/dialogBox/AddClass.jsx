import React, { useContext, useEffect, useState } from "react";
import "./DialogBox.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { BsPlusCircle } from "react-icons/bs";
import axios from "axios";
import { UserContext } from "../../App";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

// const [presentYear, setPresentYear] = useState(new Date().getFullYear())

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const AddClass = () => {
  const presentTime =
    new Date().getHours().toString() + ":" + new Date().getMinutes().toString();
  const futureTime =
    (new Date().getHours() + 1).toString() +
    ":" +
    new Date().getMinutes().toString();
  const [open, setOpen] = useState(false);
  const { state } = useContext(UserContext);
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState(presentTime);
  const [endTime, setEndTime] = useState(futureTime);
  const [isWeekly, setIsWeekly] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const addDay = () => {
    const item = {
      day: day,
      startTime: startTime,
      endTime: endTime,
    };
    setLectures([...lectures, item]);
    setDay("");
    setStartTime(presentTime);
    setEndTime(futureTime);
  };

  const uploadData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/weeklyclasses", {
        teacherId: state._id,
        subjectId: subject,
        lectures: lectures,
        branch: branch,
      });
      console.log(res);
      setLectures([]);
      setDay("");
      setBranch("");
      setSubject("");
      setStartTime(presentTime);
      setEndTime(futureTime);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAllSubjects = async () => {
      try {
        const res = await axios.get("/api/getallsubjects");
        console.log(res.data.subjects);
        setAllSubjects(res.data.subjects);
      } catch (err) {
        console.log(err);
      }
    };
    getAllSubjects();
  }, []);
  return (
    <div>
      <button onClick={handleOpen} className="addButton redbutton">
        Add Class
      </button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Schedule Lecture
        </DialogTitle>
        <DialogContent dividers>
          <form action="" className="addClassForm">
            <div>
              <label>Weekly Classes ?</label>
              <input
                type="checkbox"
                value={isWeekly}
                onChange={() => setIsWeekly(!isWeekly)}
              />
            </div>
            {isWeekly ? (
              <div>
                <h4>Weekly bitches</h4>
                {lectures.map((item) => {
                  return (
                    <p>
                      {item.day} - {item.startTime} - {item.endTime}
                    </p>
                  );
                })}
                <div className="day-time-classes">
                  <input
                    type="text"
                    className="day"
                    placeholder="Day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  />
                  <input
                    className="smallInputFields"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                    }}
                    type="time"
                  />
                  <input
                    className="smallInputFields"
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                    }}
                    type="time"
                  />
                  <BsPlusCircle className="icon" onClick={() => addDay()} />
                </div>
              </div>
            ) : (
              <div>
                <h4>No Weekly bitches</h4>
                <label>Date </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  className="smallInputFields"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                  type="time"
                />
                <input
                  className="smallInputFields"
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                  type="time"
                />
              </div>
            )}
            <select
              className="selectInputFields"
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
              }}
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="CE">CE</option>
              <option value="IT">IT</option>
            </select>
            {/* <input
              className="inputFields"
              type="text"
              value={subject}
              placeholder="Subject"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            /> */}
            <select
              className="selectInputFields"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            >
              <option value="">Select Subject</option>
              {allSubjects.map((subject) => (
                <option value={subject._id}>{subject.subjectName}</option>
              ))}
            </select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={uploadData}
            color="primary"
          >
            Add Class
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddClass;
