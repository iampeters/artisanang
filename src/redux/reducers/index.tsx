import { combineReducers } from 'redux';
import { themeReducer } from './themeReducer';
import { loaderReducer, menuReducer } from './loaderReducer';
import { authReducer, userReducer, tokenReducer, loginReducer } from './userReducer';
import { artisanReducer } from './artisanReducer';
import { alertReducer } from './alertReducer';
import { fileReducer } from './fileReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  loading: loaderReducer,
  auth: authReducer,
  menu: menuReducer,
  user: userReducer,
  tokens: tokenReducer,
  login: loginReducer,
  artisan: artisanReducer,
  alert: alertReducer,
  file: fileReducer
});

export default rootReducer;
