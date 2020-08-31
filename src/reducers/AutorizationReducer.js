export const SUCCESS_GRANT_PASSWORD = 'SUCCESS_GRANT_PASSWORD'
export const FAIL_GRANT_PASSWORD = 'FAIL_GRANT_PASSWORD'
export const LOGOUT = 'LOGOUT'

const initialState = {
  auth: false
}

export default function (state=initialState, action) {
  switch (action.type) {
    case LOGOUT:
    case SUCCESS_GRANT_PASSWORD:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
