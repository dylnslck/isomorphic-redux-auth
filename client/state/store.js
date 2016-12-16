import { Iterable, Map } from 'immutable';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootSaga from './sagas';
import authReducer from './reducers/auth';

/**
 * Since we're using Immutable to store state, we'll need to transform it into JS
 * so that we can properly use the logger.
 */
const recursivelyTransformToJS = (state) => {
  const { keys } = Object;
  let newState = {};
  let pieceOfState;

  if (typeof state === 'object' && state !== null && keys(state).length) {
    keys(state).forEach((key) => {
      pieceOfState = state[key];

      if (Iterable.isIterable(pieceOfState)) {
        newState[key] = pieceOfState.toJS();

        /* eslint-disable no-underscore-dangle */
        newState[key]._immutable = true;
      } else {
        newState[key] = recursivelyTransformToJS(pieceOfState);
      }
    });
  } else {
    newState = state;
  }

  return newState;
};

const logger = createLogger({
  stateTransformer: recursivelyTransformToJS,
  actionTransformer: recursivelyTransformToJS,
});

export const emptyState = {
  auth: new Map(),
};

export const reducer = combineReducers({
  auth: authReducer,
});

export const initStore = (rootReducer, initialState, isServer) => {
  const sagaMiddleware = createSagaMiddleware();

  if (isServer && typeof window === 'undefined') {
    const store = createStore(rootReducer, initialState, applyMiddleware(logger));
    return store;
  }

  if (!window.store) {
    window.store = createStore(rootReducer, initialState, applyMiddleware(logger, sagaMiddleware));
  }

  sagaMiddleware.run(rootSaga);
  return window.store;
};
