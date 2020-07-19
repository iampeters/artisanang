import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';
import loggerMiddleware from '../utils/middleware/logger';
import monitorReducersEnhancer from '../utils/enhancers/monitorReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['menu',],
  blacklist: []
};

export default function configureStore(preloadedState: any) {
	let middlewares = [];
	let composedEnhancers: any = [];
	if (process.env.NODE_ENV === 'development') {
		middlewares = [loggerMiddleware, thunkMiddleware];
	} else {
		middlewares = [thunkMiddleware];
	}

	const middlewareEnhancer = applyMiddleware(...middlewares);

	const enhancers: any = [middlewareEnhancer, monitorReducersEnhancer];

	if (process.env.NODE_ENV === 'development') {
    composedEnhancers = composeWithDevTools(...enhancers);
	} else {
    composedEnhancers = compose(...enhancers);
	}
	
	const persistedReducer = persistReducer(persistConfig, rootReducer);

	let store = createStore(persistedReducer, composedEnhancers);
  let persistor = persistStore(store);
	return {store, persistor};
}
