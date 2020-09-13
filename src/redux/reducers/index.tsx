import { combineReducers } from 'redux';
import { themeReducer } from './themeReducer';
import { loaderReducer, menuReducer, navBarReducer, profileEditReducer, changePasswordReducer } from './loaderReducer';
import { authReducer, userReducer, tokenReducer, loginReducer, dashboardReducer } from './userReducer';
import { artisanReducer } from './artisanReducer';
import { alertReducer } from './alertReducer';
import { fileReducer } from './configReducer';
import { reviewReducer } from './reviewReducer';
import { categoryReducer } from './categoryReducer';
import { jobReducer, requestReducer } from './jobReducer';

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
  file: fileReducer,
  reviews: reviewReducer,
  navBar: navBarReducer,
  profileEditDrawer: profileEditReducer,
  changePasswordDrawer: changePasswordReducer,
  category: categoryReducer,
  dashboard: dashboardReducer,
  jobs: jobReducer,
  requests: requestReducer
});

export default rootReducer;
