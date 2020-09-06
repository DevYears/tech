import {
  SUCCESS_FETCH_USERS,
  SUCCESS_FETCH_USER_BY_TERM,
} from '../reducers/DirectoryReducer';
import { BASE_API_URL } from '../utils/config';

export function fetchUsers(ids) {
  return (dispatch, getState) => {
    const currentState = getState();

    const { accessBearerToken } = currentState.auth;
    fetch(`${BASE_API_URL}/api/v1/users/map`, {
      method: 'POST',
      headers: {
        'Accept-Language': 'ru',
        Authorization: `Bearer ${accessBearerToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && json.status === 'OK') {
          dispatch({
            type: SUCCESS_FETCH_USERS,
            payload: {
              users: json.items,
            },
          });
        } else {
          console.error('Failed to fetch users', json);
        }
      })
      .catch((e) => console.error('Failed to fetch users', e));
  };
}

export function fetchUserByTerm(term) {
  return (dispatch, getState) => {
    const currentState = getState();
    const preparedTerm = encodeURIComponent(term);
    const { accessBearerToken } = currentState.auth;
    fetch(`${BASE_API_URL}/api/v1/users/by_term/?term=${preparedTerm}`, {
      method: 'GET',
      headers: {
        'Accept-Language': 'ru',
        Authorization: `Bearer ${accessBearerToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && json.status === 'OK') {
          dispatch({
            type: SUCCESS_FETCH_USER_BY_TERM,
            payload: {
              users: json.items,
            },
          });
        }
      })
      .catch((e) => console.error('Failed to fetch user', e));
  };
}
