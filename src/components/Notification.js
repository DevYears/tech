import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { hideSnackbarNotification } from '../actions/NotificationActions';

export default function () {
  const {
    message, type, duration, open,
  } = useSelector(
    (state) => state.notification.snackbar,
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideSnackbarNotification());
  };

  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={duration} onClose={handleClose}>
      <MuiAlert severity={type}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
