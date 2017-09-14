import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

// const attachNextPathNameToAction = store => next => action=>{
//   console.log(store.getState());
//   action.pathname = store.getState().router.nextPathName;
//   next(action);
// };

import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const preloadedState = preloadedState => createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk))
);

export default preloadedState;
