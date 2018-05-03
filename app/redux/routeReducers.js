import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'

import navReducer from './nav';
import registerReducer from '../signUp/reducers/signUp'
import loginReducer from '../signIn/reducers/SignIn'

const appReducer = combineReducers({
  nav: navReducer,
  form: formReducer,
  loginReducer:loginReducer,
  registerReducer: registerReducer
});

export default appReducer;