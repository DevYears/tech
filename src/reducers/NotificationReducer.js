export const SHOW_SNACKBAR_NOTIFICATION = 'SHOW_SNACKBAR_NOTIFICATION';
export const HIDE_SNACKBAR_NOTIFICATION = 'HIDE_SNACKBAR_NOTIFICATION';

const initialState = {
  snackbar: {
    open: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HIDE_SNACKBAR_NOTIFICATION:
    case SHOW_SNACKBAR_NOTIFICATION:
      return { ...state, snackbar: action.payload };
    default:
      return state;
  }
}
