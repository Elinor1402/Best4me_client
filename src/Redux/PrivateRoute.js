import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

 const PrivateRoute = ({children}) => {

    const isLogged = useSelector(state => state.usersReducer.isLogged);
        
            if (isLogged === true) {
                return children
            }
            return <Navigate to="/log-in" />
    
}
 export default PrivateRoute;
