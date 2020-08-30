import { combineReducers } from 'redux';

import AutorizationReducer from './AutorizationReducer'

export default combineReducers({
  auth: AutorizationReducer,
});
