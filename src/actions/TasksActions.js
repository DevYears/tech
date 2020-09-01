import { SUCCESS_FETCH_TASKS } from '../reducers/TasksReducer';
import { BASE_API_URL } from '../utils/config';

// const prepareFilters = (filters) => `?${filters.id}`; ${preparedFilters}

// eslint-disable-next-line import/prefer-default-export
export function fetchTasks() {
  return (dispatch, getState) => {
    // const preparedFilters = prepareFilters(filters);
    const currentState = getState();
    const { accessBearerToken } = currentState.auth;
    fetch(`${BASE_API_URL}/api/v1/techtasks/technologistsvc/tasks/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessBearerToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && json.status === 'OK' && json.result[0]) {
          dispatch({ type: SUCCESS_FETCH_TASKS, payload: json.result });
        } else {
          console.error('Failed to fetch tasks', json);
        }
      })
      .catch((e) => console.error('Failed to fetch tasks', e));
  };
}
