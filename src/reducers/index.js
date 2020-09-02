import { combineReducers } from 'redux';

import AutorizationReducer from './AutorizationReducer';
import TasksReducer from './TasksReducer';
import NotificationReducer from './NotificationReducer';

export default combineReducers({
  auth: AutorizationReducer,
  tasks: TasksReducer,
  notification: NotificationReducer,
});
