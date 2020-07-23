import { combineReducers } from 'redux';
import { themeReducer } from './themeReducer';
import { loaderReducer, menuReducer } from './loaderReducer';
import { authReducer, userReducer, tokenReducer, loginReducer } from './userReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  loading: loaderReducer,
  auth: authReducer,
  menu: menuReducer,
  user: userReducer,
  tokens: tokenReducer,
  login: loginReducer,
});

export default rootReducer;
