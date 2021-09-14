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

const DialogBox = ({ isOpen, type, tt_day }) => {
  const [open, setOpen] = useState(isOpen);
  console.log(tt_day);
  const handleClose = () => {
    setOpen(false);
  };
  if (type === "student") {
    return (
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Your Day
          </DialogTitle>
          <DialogContent dividers>
            <h4>Time Table</h4>
            <table>
              <tr>
                <th>Time</th>
                <th>Subject</th>
                <th>Teacher</th>
              </tr>
              {tt_day.map((item) => {
                let subName = item.subjectId.subjectName;
                let teacherName = item.teacherId.name;

                let startTime = item.lectures[0].startTime;
                let endTime = item.lectures[0].endTime;
                //console.log(subName, teacherName, startTime, endTime);

                return (
                  <tr>
                    <td>
                      {startTime} - {endTime}
                    </td>
                    <td>{subName}</td>
                    <td>{teacherName}</td>
                  </tr>
                );
              })}
            </table>
            <h4>Assignments</h4>
            <ul>
              <li>Maths</li>
              <li>Science</li>
            </ul>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else if (type === "teacher") {
    return (
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Your Day
          </DialogTitle>
          <DialogContent dividers>
            <h4>Time Table</h4>
            <table>
              <tr>
                <th>Time</th>
                <th>Subject</th>
                <th>Branch</th>
              </tr>
              <tr>
                <td>11:00-12:00</td>
                <td>Maths I</td>
                <td>Mechanical</td>
              </tr>
              <tr>
                <td>12:00-1:00</td>
                <td>Maths II</td>
                <td>Civil</td>
              </tr>
              <tr></tr>
            </table>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Add Class
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

export default DialogBox;
