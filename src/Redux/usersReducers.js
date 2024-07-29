//take the current state and an action as arguments and return a new state
const isLoggedLocalStorage = localStorage.getItem("isLogged");
const token = localStorage.getItem("token");

const initState = {
  isLogged:
    isLoggedLocalStorage !== null
      ? isLoggedLocalStorage === "true" && token !== null
      : false,
};

//when action in usersActions work it activated the LoginReducer, this function takes the payload from login/logout function in usersActions and change the state of isLogged according to it.
const LoginReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("isLogged", action.payload);
      state = { ...state, isLogged: action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default LoginReducer;
