  
import { createStore, combineReducers, applyMiddleware } from 'redux'


// import sitesReducer from './reducers/sitesReducer';
import usersReducer from './usersReducers';

const store = createStore(
    combineReducers({
        // sitesReducer,
        usersReducer
    }))


export default store;