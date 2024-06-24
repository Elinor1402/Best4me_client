import React from "react";
// import '../../../App.css';
import './Login.css';
import Button from '@material-ui/core/Button';
import LoginIcon from '@material-ui/icons/AccountCircle';
// import {VisibilityIcon,VisibilityOffIcon} from '@mui/icons-material/Visibility';
import axios from 'axios';
import Navbar from "../../navbar/Navbar";
import { useNavigate  } from 'react-router-dom';
//import {} from "../../../Reducers/usersReducers';
import { useEffect,useRef,useState } from "react";
import { loginAction } from '../../../Redux/usersActions';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";

export default function LogInUser(){
    const [userID, setUserID] = useState('');
    const [userPassword, setuserPassword] = useState('');
    const [errorMessage, setErrorMessage]= useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();


  const isLogged = useSelector(state => state.usersReducer.isLogged);
  const dispatch=useDispatch();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  useEffect(() =>{
        
},[isLogged]
)

    function handleSubmit(Event) {
     console.log("submit");
       Event.preventDefault();
       
            axios.post('http://localhost:3000/user-log-in', {userID: userID, userPassword: userPassword}).then(res =>{
            localStorage.setItem('token', res.data.token);

            // localStorage.setItem('CompanyID',userID);
            // dispatch(loginAction());

            // //if(res.status === 200){
            //     console.log("try go to admin");
            //     navigate("/admin", {userID: userID}); // passing company id to admin page
            if (res.data.message=== "Health")
            {
                navigate("/Health");
            }
            else if (res.data.message=== "High tech")
            {
                navigate("/HiTech");
            }

            }).catch(err =>{
                setErrorMessage(err.response.data);
                 console.log(errorMessage);
            });
          
    }
        return (
            <>
            < Navbar />
            <div className="login-container">
                <h1 className="sign-in">Login User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form2">
                        <div className="form-group">
                        <label for="userID">User ID : </label>
                            <input type="text"
                                name="userID" 
                                placeholder="User ID" 
                                value={userID}
                                onChange={(e) => setUserID(e.target.value)}
                                required/>
                        </div>
                        {/* <i onClick={togglePasswordVisiblity}>{passwordShown ?  <FaEye/>:<FaEyeSlash/>}</i> */}
                        <div className="form-group">
                        <label for="userID">Password : </label>
                        <i onClick={togglePasswordVisiblity}>{passwordShown ?  <FaEye/>:<FaEyeSlash/>}</i>
                            <input type={passwordShown ? "text" : "password"}
                                name="userPassword" 
                                placeholder="Password" 
                                value={userPassword}
                                onChange={(e) => setuserPassword(e.target.value)}
                                required/>
                        </div>
                        {errorMessage && <div className="error">{errorMessage}</div>} 
                        <div className="loginbtn">
                            <button type="submit" class="btn btn-primary">Sign In</button> 
                        </div>
                    </div>
                </form>
            </div>
            </>
        );
}
