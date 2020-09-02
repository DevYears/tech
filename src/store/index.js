import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';
import { loadState, saveState } from '../localStorage';
import { fetchRefreshToken } from '../actions/AutorizationActions';

const initialState = loadState();

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-undef
  composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
}

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
    ),
  ),
);

// Persist auth
store.subscribe(() => {
  const { accessBearerToken, refreshToken, auth } = store.getState().auth;
  saveState({
    auth: {
      accessBearerToken,
      refreshToken,
      auth,
    },
  });
});

setTimeout(() => store.dispatch(fetchRefreshToken()), 10000);

export default store;
