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

export default function LogIn(){
    const [companyID, setCompanyID] = useState('');
    const [companyPassword, setCompanyPassword] = useState('');
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
       
            axios.post('http://localhost:3000/log-in', {companyID: companyID, companyPassword: companyPassword}).then(res =>{
            localStorage.setItem('token', res.data.token);

            localStorage.setItem('CompanyID',companyID);
            dispatch(loginAction());

            //if(res.status === 200){
                console.log("try go to admin");
                navigate("/admin", {companyID: companyID}); // passing company id to admin page

            }).catch(err =>{
                setErrorMessage(err.response.data);
                 console.log(errorMessage);
            });
          
    }
        return (
            <>
            < Navbar />
            <div className="login-container">
                <h1 className="sign-in">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form2">
                        <div className="form-group">
                        <label for="companyID">Comany ID : </label>
                            <input type="text"
                                name="companyID" 
                                placeholder="Company ID" 
                                value={companyID}
                                onChange={(e) => setCompanyID(e.target.value)}
                                required/>
                        </div>
                        {/* <i onClick={togglePasswordVisiblity}>{passwordShown ?  <FaEye/>:<FaEyeSlash/>}</i> */}
                        <div className="form-group">
                        <label for="companyID">Password : </label>
                        <i onClick={togglePasswordVisiblity}>{passwordShown ?  <FaEye/>:<FaEyeSlash/>}</i>
                            <input type={passwordShown ? "text" : "password"}
                                name="companyPassword" 
                                placeholder="Password" 
                                value={companyPassword}
                                onChange={(e) => setCompanyPassword(e.target.value)}
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
