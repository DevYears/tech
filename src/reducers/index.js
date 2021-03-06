import { combineReducers } from 'redux';

import AutorizationReducer from './AutorizationReducer';
import TasksReducer from './TasksReducer';
import NotificationReducer from './NotificationReducer';
import DirectoryReducer from './DirectoryReducer';

export default combineReducers({
  auth: AutorizationReducer,
  tasks: TasksReducer,
  notification: NotificationReducer,
  directory: DirectoryReducer,
});
