import { Iterable } from 'immutable';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/auth';
import dataReducer from './reducers/data';
import rootSagas from './sagas';

/**
 * Since we're using Immutable to store state, we'll need to transform it into JS
 * so that we can properly use the logger.
 */
const recursivelyTransformToJS = (state) => {
  let newState = {};
  let pieceOfState;

  if (typeof state === 'object' && state !== null && Object.keys(state).length) {
    Object.keys(state).forEach((key) => {
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

let store;

export default () => {
  if (store) return store;

  const sagaMiddleware = createSagaMiddleware();

  const logger = createLogger({
    stateTransformer: recursivelyTransformToJS,
    actionTransformer: recursivelyTransformToJS,
  });

  store = createStore(
    combineReducers({ auth: authReducer, data: dataReducer }),
    applyMiddleware(logger, sagaMiddleware),
  );

  sagaMiddleware.run(rootSagas);
  return store;
};
