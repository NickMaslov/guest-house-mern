import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { roomsReducer } from './reducers/roomsReducer';

const composeEnhancers = composeWithDevTools({});
const rootReducer = combineReducers({
    roomsReducer,
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
