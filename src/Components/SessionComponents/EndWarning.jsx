import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EndWarning({open,setOpen,timeRemaining,studyDuration}) {

  const { hours, minutes, seconds } = studyDuration;

  const initialTimeInSeconds =
  parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

  const formatTime = (time) => {
    const pad = (num) => (num < 10 ? `0${num}` : num);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const timeStudied=initialTimeInSeconds-timeRemaining;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you Sure to skip this Session"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to skip this session, you have set the Target for this session for {formatTime(initialTimeInSeconds)} and ending it after 
            studying {formatTime(timeStudied)}
            timeRemaining:{formatTime(timeRemaining)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
