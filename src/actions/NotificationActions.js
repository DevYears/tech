import { SHOW_SNACKBAR_NOTIFICATION, HIDE_SNACKBAR_NOTIFICATION } from '../reducers/NotificationReducer';

// eslint-disable-next-line import/prefer-default-export
export function showSnackbarNotification(message = '', type = 'success', duration = 2000) {
  return (dispatch) => {
    dispatch({
      type: SHOW_SNACKBAR_NOTIFICATION,
      payload: {
        message,
        type,
        duration,
        open: true,
      },
    });
  };
}

export function hideSnackbarNotification() {
  return (dispatch) => {
    dispatch({
      type: HIDE_SNACKBAR_NOTIFICATION,
      payload: {
        open: false,
      },
    });
  };
}
