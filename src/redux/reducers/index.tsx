import { combineReducers } from 'redux';
import { themeReducer } from './themeReducer';
import { loaderReducer, menuReducer } from './loaderReducer';
import { authReducer } from './userReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  loader: loaderReducer,
  auth: authReducer,
  menu: menuReducer
});

export default rootReducer;
