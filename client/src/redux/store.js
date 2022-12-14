import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { roomsReducer } from './reducers/roomsReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    roomsReducer,
    alertsReducer,
    bookingsReducer,
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
