import { SUCCESS_GRANT_PASSWORD, FAIL_GRANT_PASSWORD, LOGOUT } from '../reducers/AutorizationReducer';
import { BASE_AUTH_URL } from '../utils/config';

const failGrantPassword = (errorMessage) => ({
  type: FAIL_GRANT_PASSWORD,
  payload: {
    authErrorMessage: errorMessage,
  },
});

export function fetchGrantPassword(username, password) {
  return (dispatch) => {
    fetch(`${BASE_AUTH_URL}/api/v1/jwt/grant`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.access_token && json.refresh_token) {
          dispatch({
            type: SUCCESS_GRANT_PASSWORD,
            payload: {
              accessBearerToken: json.access_token,
              refreshToken: json.refresh_token,
              auth: true,
              authErrorMessage: '',
            },
          });
        } else {
          console.error('Failed to fetch grant password', json, json.error.message);
          if (json.error && json.error.message) {
            dispatch(failGrantPassword(json.error.message));
          } else {
            dispatch(failGrantPassword('Ошибка выполнения запроса попробуйте еще раз.'));
          }
        }
      })
      .catch((e) => {
        console.error('Failed to fetch grant password', e);
        dispatch(failGrantPassword('Ошибка выполнения запроса попробуйте еще раз.'));
      });
  };
}

// export function fetchRefreshToken(state, dispatch) {

// }

export function logout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: {
        accessBearerToken: undefined,
        refreshToken: undefined,
        auth: false,
      },
    });
  };
}
