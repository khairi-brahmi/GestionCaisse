import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import routeReducer from './reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(
    routeReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;