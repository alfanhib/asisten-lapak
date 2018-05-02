import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './routeReducers';

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const logger = createLogger({

})

const store = createStore(
  reducers,
  applyMiddleware(middleware, logger),
);

export default store;