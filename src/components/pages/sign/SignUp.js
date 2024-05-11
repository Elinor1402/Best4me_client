import React from "react";
// import '../../../App.css';
 import './SignUp.css'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Navbar from "../../navbar/Navbar";
import { useNavigate  } from 'react-router-dom';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { useEffect,useRef,useState } from "react";
import {countryList} from './SignUpLists'

export default function Checking() {
    const [companyID, setCompanyID] = useState('');
    const [email, setEmail] =useState('');
    const [companyPassword, setCompanyPassword] = useState('');
    const [compName, setCompName] = useState('');
    const [domain, setDomain] = useState('');
    const [establishment, setEstablishment] = useState('');
    const [occupation, setOccupation] = useState('');
    const [location, setLocation] = useState('');
    const [size, setSize] = useState('');
    const [numOfCeo, setNumOfCeo] = useState('');
    const [numOfManagers, setNumOfManagers] = useState('');
    const [numOfEmployees, setNumOfEmployees] = useState('');
    const [systemUsed, setSystemUsed] = useState('');
    const [errorMessage, setErrorMessage]= useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const navigate = useNavigate();
   
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    
    function handleSubmit(Event) {
        Event.preventDefault();
        // if(companyID != '' && companyPassword != ''){
            if(companyPassword != '')
            {
                if(companyPassword.length<6)
                    setErrorMessage("Password must be at least 6 characters long");

                    else
                    {
                        var hashedPass;
                        hashedPass = bcrypt.hashSync(companyPassword,5, (err,hash)=>{
                          if(!err){
                            hashedPass = hash;
                          }
                        });
                        axios.post('http://localhost:3000/sign-up', {
                // companyID: companyID,
                email: email,
                companyPassword: hashedPass,
                compName: compName,
                domain: domain,
                establishment: establishment,
                occupation: occupation,
                location: location,
                size: size,
                numOfCeo: numOfCeo,
                numOfManagers: numOfManagers,
                numOfEmployees: numOfEmployees,
                systemUsed: systemUsed})
              .then(res =>{
                  console.log(res);
                    //if(res.status === 200){
                       // window.alert(res.data.message);
                        localStorage.setItem('CompanyID',res.data.message);
                        navigate("/final-signup");
                    //}
            }).catch(err =>{
                 setErrorMessage(err.response.data);
                
                //  console.log(errorMessage);
            });
                    }
            }
        }  
    // }
        return (
            <>
            <Navbar />
            <div className="register-container" >
                <h1 className="sign-up">SIGN UP</h1>
                {errorMessage && <div className="error">{errorMessage}</div>} 
                <form onSubmit={handleSubmit}>
                    <div className="form">
                    <div className="register-container-child">
                        {/* <div className="form-group">
                            <label for="company id">Company ID : </label>
                            <input
                                type="number" 
                                id="company id"
                                name="companyID" 
                                placeholder="Company id" 
                                value={companyID}
                                onChange={(e) => setCompanyID(e.target.value)}
                                required/>
                        </div> */}
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input
                                type="email" 
                                id="email"
                                name="email" placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="form-group">
                            <label for="password">Password 
                            {/* <div  className="show-password"> */}
                            <i onClick={togglePasswordVisiblity}>{passwordShown ?  <FaEye/>:<FaEyeSlash/>}</i>
                            {/* </div> */}
                            </label>
                           
                            <input
                               type={passwordShown ? "text" : "password"}
                               id="password"
                               name="companyPassword" 
                               placeholder="Password"
                               value={companyPassword}
                               onChange={(e) => setCompanyPassword(e.target.value)}
                               required minLength="6"/>
                        </div>
                     
                            <div className="form-group">
                            <label for="organization name">Organization's name</label>
                            <input 
                               type="text"
                               id="organization name"
                               name="compName" 
                               placeholder="Organization's name"
                               value={compName} 
                               onChange={(e) => setCompName(e.target.value)}
                               required/>
                        </div>
                        <div className="form-group">
                            <label for="organization domain">Organization's domain</label>
                            {/* <input type="text" 
                               id="organization domain"
                               name="domain" 
                               placeholder="Organization's domain"
                               value={domain} 
                               onChange={(e) => setDomain(e.target.value)}
                               required/> */}
                                <select class="form-select" aria-label="Default select example" value ={domain} defaultValue={"Health"} onChange={(e)=>setDomain(e.target.value)}>
                                {/* <option selected>Open this select menu</option> */}
                                <option value="Health" >Health</option>
                                <option value="Industry" >Industry</option>
                                <option value="Economy" >Economy</option>
                                <option value="High tech" >High tech</option>
                                <option value="Transport" >Transport</option>
                                <option value="Education" >Education</option>
                                </select  >
                        </div>
                        <div className="form-group">
                            <label for="Year of establishment">Year of establishment</label>
                            <input type="number"
                                id= "Year of establishment"
                               name="establishment" 
                               placeholder="Year of establishment of the company" 
                               value={establishment} 
                               onChange={(e) => setEstablishment(e.target.value)}
                               required/>

                        </div>
                        </div>
                        <div className="register-container-child">
                        {/* <div className="form-group">
                            <label for="occupation">The organization is local or global : </label>
                            <input type="text"
                                id="occupation"
                               name="occupation" 
                               placeholder="Local or Global" 
                               value={occupation} 
                               onChange={(e) => setOccupation(e.target.value)}
                               required/>
                        </div> */}
                        <div className="form-group">
                        <label for="occupation">The organization is local or global</label>
                        <select class="form-select" aria-label="Default select example" value ={occupation} defaultValue={"Local"} onChange={(e)=>setOccupation(e.target.value)}>
                        {/* <option selected>Open this select menu</option> */}
                
                        <option value="Local" >Local</option>
                        <option value="Global" >Global</option>
                        </select  >
                        
                        </div>
                        <div className="form-group">
                        <label htmlFor="location">Branch location</label>
                        <select className="form-select" aria-label="Default select example" value={location} onChange={(e) => setLocation(e.target.value)}>
                        {console.log("countries", countryList)}
                        {countryList.map(element => (
                            <option key={element} value={element}>{element}</option>
                        ))}
                        </select>

                        </div>
                        <div className="form-group">
                            <label for="organization size">Organization’s size</label>
                            <select class="form-select" aria-label="Default select example" value ={size} defaultValue={"Windows"} onChange={(e)=>setSize(e.target.value)}>
                            <option value="1-50">1-50</option>
                            <option value="51-200" >51-200</option>
                            <option value="200-500" >200-500</option>
                            <option value="501+" >501+</option>

                        </select  >

                        </div>
                        {/* not relevant maybe in the futher */}

                        {/* <div className="form-group">
                            <label for="num of ceo">Number of Deputy CEOs</label>
                            <input type="number" 
                                id= "num of ceo"
                               name="numOfCeo" 
                               placeholder="Number Deputy CEOs" 
                               value={numOfCeo} 
                               onChange={(e) => setNumOfCeo(e.target.value)} 
                               required min="1"/>
                        </div>
                        <div className="form-group">
                            <label for="amount of managers">Amount of managers</label>
                            <input type="number"
                                id="amount of managers"
                               name="numOfManagers"
                               placeholder="Amount of department heads&team leaders" 
                               value={numOfManagers} 
                               onChange={(e) => setNumOfManagers(e.target.value)} 
                               required min="1" />
                        </div>
                        <div className="form-group">
                            <label for="Amount of employees">Amount of regular employees</label>
                            <input type="number" 
                                id="Amount of employees"
                               name="numOfEmployees" 
                               placeholder="Amount of regular employees" 
                               value={numOfEmployees} 
                               onChange={(e) => setNumOfEmployees(e.target.value)} 
                               required min="1"/> */}
                        {/* </div> */}
                        {/* <div className="form-group">
                            <label for="organization system used">Organization’s operation system used</label>
                            <select class="form-select" aria-label="Default select example" value ={systemUsed} defaultValue={"Windows"} onChange={(e)=>setSystemUsed(e.target.value)}>
                            <option value="Windows" >Windows</option>
                            <option value="Linux" >Linux</option>
                            <option value="macOS" >macOS</option>
                        </select  >
                        </div> */}
                        </div>
                    </div>
                    <div className="btn" >
                    <Button type="submit" endIcon={<SendIcon />} color="primary" variant="contained">
                              Sign Up
                            </Button>
                    </div>
                </form>
                
            </div>
            </>
        );
}
