import React, { useState } from "react";
import "./DialogBox.css"
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

const DialogBox = ({ isOpen }) => {
  const [open, setOpen] = useState(isOpen);
  const handleClose = () => {
    setOpen(false);
  };
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
            <tr>
              <td>11:00-12:00</td>
              <td>Maths</td>
              <td>D Sharma</td>
            </tr>
            <tr>
              <td>11:00-12:00</td>
              <td>Maths</td>
              <td>D Sharma</td>
            </tr>
            <tr>
              <td>11:00-12:00</td>
              <td>Maths</td>
              <td>D Sharma</td>
            </tr>
            <tr>
              <td>11:00-12:00</td>
              <td>Maths</td>
              <td>D Sharma</td>
            </tr>
            <tr>
              <td>11:00-12:00</td>
              <td>Maths</td>
              <td>D Sharma</td>
            </tr>
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
};

export default DialogBox;
