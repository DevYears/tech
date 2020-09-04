export const SUCCESS_FETCH_TASKS = 'SUCCESS_FETCH_TASKS';
export const SUCCESS_FETCH_TASK = 'SUCCESS_FETCH_TASK';
export const CHANGE_FILTERS = 'CHANGE_FILTERS';
export const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE';
export const SET_PAGE = 'SET_PAGE';

const initialState = {
  tasks: [],
  paginator: {
    count: 0,
  },
  filters: [],
  limit: 30,
  offset: 0,
  rowsPerPage: 30,
  page: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ROWS_PER_PAGE:
    case SET_PAGE:
    case SUCCESS_FETCH_TASK:
    case SUCCESS_FETCH_TASKS:
      return { ...state, ...action.payload };
    case CHANGE_FILTERS:
      return { ...state, filters: action.payload };
    default:
      return state;
  }
}
