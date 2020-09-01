export const SUCCESS_FETCH_TASKS = 'SUCCESS_FETCH_TASKS';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH_TASKS:
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
}
