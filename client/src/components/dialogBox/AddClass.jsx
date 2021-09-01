import React, { useState } from "react";
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
  const presentTime = new Date().getHours().toString() + ":" + new Date().getMinutes().toString();
  const futureTime = (new Date().getHours()+1).toString() + ":" + new Date().getMinutes().toString();
  console.log(presentTime); 
  const [open, setOpen] = useState(false);
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState(presentTime);
  const [endTime, setEndTime] = useState(futureTime);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  console.log(endTime);

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
          <form action="">
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
            <input
              className="inputFields"
              type="text"
              value={subject}
              placeholder="Subject"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
            <h4>Timing</h4>
            <input
              className="inputFields"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
              type="time"
            />
            <input
              className="inputFields"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
              type="time"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Add Class
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddClass;
