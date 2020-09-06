export const SUCCESS_FETCH_USERS = 'SUCCESS_FETCH_USERS';
export const SUCCESS_FETCH_USER_BY_TERM = 'SUCCESS_FETCH_USER_BY_TERM';

const initialState = {
  users: [],
  usersByTerm: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH_USERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
