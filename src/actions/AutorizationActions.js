import { SUCCESS_GRANT_PASSWORD } from '../reducers/AutorizationReducer'

const BASE_URL = 'https://accounts-dev.wow.app'

export function fetchGrantPassword (username, password) {
  return (dispatch, getState) => {
    fetch(`${BASE_URL}/api/v1/jwt/grant`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: "password",
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.access_token && json.refresh_token) {
          dispatch({type: SUCCESS_GRANT_PASSWORD, payload: {
            accessBearerToken: json.access_token,
            refreshToken: json.refresh_token
          }})
        }
        else {
          console.error('Failed to fetch grant password', json)
        }
      })
      .catch((e) => console.error('Failed to fetch grant password', e))
  }
}

export function fetchRefreshToken (state, dispatch) {
  
}