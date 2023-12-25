

const isLoggedLocalStorage = localStorage.getItem('isLogged');
const token = localStorage.getItem('token');

const initState = {
    isLogged: (isLoggedLocalStorage !== null ? (isLoggedLocalStorage === 'true' && token!==null) : false)
}

const LoginReducer = (state = initState, action) => {

    switch(action.type){
        case "LOGIN":
           localStorage.setItem('isLogged',action.payload);
            state = {...state, isLogged: action.payload}
        break;
        default:
        break;
    }

    console.log('Users Reducers', state);
    return state;
}

export default LoginReducer;