import {
  SUCCESS_FETCH_TASKS, CHANGE_FILTERS, SET_ROWS_PER_PAGE, SET_PAGE,
} from '../reducers/TasksReducer';
import { BASE_API_URL } from '../utils/config';
import jsonToUrlParams from '../utils/jsonToUrlParams';
import { showSnackbarNotification } from './NotificationActions';

export function fetchTasks() {
  return (dispatch, getState) => {
    const currentState = getState();
    const filters = jsonToUrlParams([
      ...currentState.tasks.filters,
      { name: 'limit', value: currentState.tasks.limit },
      { name: 'offset', value: currentState.tasks.offset },
    ]);

    const { accessBearerToken } = currentState.auth;
    fetch(`${BASE_API_URL}/api/v1/techtasks/technologistsvc/tasks/?${filters}`, {
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
            type: SUCCESS_FETCH_TASKS,
            payload: {
              tasks: json.result,
              paginator: {
                offset: json.paginator.offset,
                limit: json.paginator.limit,
                count: json.paginator.total_items_cnt,
              },
            },
          });
          if (json.result && json.result[0]) {
            dispatch(showSnackbarNotification('Данные успешно обновлены'));
          } else {
            dispatch(showSnackbarNotification('По вашему запросу ничего не найдено', 'warning'));
          }
        } else {
          console.error('Failed to fetch tasks', json);
          dispatch(showSnackbarNotification('Ошибка получения данных', 'error'));
        }
      })
      .catch((e) => console.error('Failed to fetch tasks', e));
  };
}

export function fetchTask(id) {
  return (dispatch, getState) => {
    const currentState = getState();
    const { accessBearerToken } = currentState.auth;
    fetch(`${BASE_API_URL}/api/v1/techtasks/technologistsvc/tasks/${id}`, {
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
          // dispatch({
          //   type: SUCCESS_FETCH_TASKS,
          //   payload: {
          //     tasks: json.result,
          //     paginator: {
          //       offset: json.paginator.offset,
          //       limit: json.paginator.limit,
          //       count: json.paginator.total_items_cnt,
          //     },
          //   },
          // });
        } else {
          console.error('Failed to fetch tasks', json);
          dispatch(showSnackbarNotification('Ошибка получения данных', 'error'));
        }
      })
      .catch((e) => {
        dispatch(showSnackbarNotification('Ошибка получения данных', 'error'));
        console.error('Failed to fetch tasks', e);
      });
  };
}

export const changeFilters = (filters) => ({
  type: CHANGE_FILTERS,
  payload: filters,
});

export const setRowsPerPage = (value) => ({
  type: SET_ROWS_PER_PAGE,
  payload: { rowsPerPage: value },
});

export const setPage = (value) => (dispatch, getState) => {
  dispatch({
    type: SET_PAGE,
    payload: {
      page: value,
      offset: value * getState().tasks.rowsPerPage,
      limit: getState().tasks.rowsPerPage,
    },
  });
};
