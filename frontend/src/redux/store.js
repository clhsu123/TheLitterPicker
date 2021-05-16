import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
// thunk is like a middleware
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    // Everything that comes from the breederReducer will be stored in the user object
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});

const store = createStore(reducers, initialState, 
    compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;