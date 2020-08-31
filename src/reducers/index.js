import { combineReducers } from 'redux';

import AutorizationReducer from './AutorizationReducer'
import TasksReducer from './TasksReducer'

export default combineReducers({
  auth: AutorizationReducer,
  tasks: TasksReducer
});
