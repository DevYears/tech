export const SUCCESS_GRANT_PASSWORD = 'SUCCESS_GRANT_PASSWORD'
export const FAIL_GRANT_PASSWORD = 'FAIL_GRANT_PASSWORD'

export default function (state = {}, action) {
  switch (action.type) {
    case SUCCESS_GRANT_PASSWORD:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
