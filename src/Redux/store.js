import { createStore, combineReducers, applyMiddleware } from "redux";

//How They Work Together
//1. Dispatching an Action: When something happens in the app (like a user interaction), an action is dispatched.
//2. Handling in Reducers: The action is handled by a reducer, which computes a new state based on the action type and the current state.
//3. Updating the Store: The new state is stored in the Redux store, and any subscribed components are notified of the state change.

//The store in Redux is a central repository that holds the entire state of the application. It is an immutable object, meaning the state cannot be changed directly. Instead, state changes are triggered by dispatching actions, which are then processed by reducers.
import usersReducer from "./usersReducers";

const store = createStore(
  combineReducers({
    // sitesReducer,
    usersReducer,
  })
);

export default store;
