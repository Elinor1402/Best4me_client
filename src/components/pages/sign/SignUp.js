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
    
    const [email, setEmail] =useState('');
    const [companyPassword, setCompanyPassword] = useState('');
    const [compName, setCompName] = useState('');
    const [domain, setDomain] = useState('Health');
    const [establishment, setEstablishment] = useState('');
    const [loc_glob, setLocGlob] = useState('Local');
    const [location, setLocation] = useState('');
    const [size, setSize] = useState('1-50');
    const [errorMessage, setErrorMessage]= useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
   
    const getFirstQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/first-question');
            const data = response.data;
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const  fetchQuestionData=  (questionData) => {
    
        if(questionData.answerType ===1)
        {
            return ( 
           <>
            <label for={questionData.question}>{questionData.question} </label>
            <input type="Text"
            name={questionData.question}
            placeholder={questionData.questio}
            // value={companyID}
           onChange={(e) => setCompanyID(e.target.value)}
            required/>
            </>
            )
        }
        else if(questionData.answer_type ===2)
        {
            return ( 
                <>
                <label for={questionData.question}>{questionData.question}</label>
                <select class="form-select" aria-label="Default select example" value ={systemUsed}  onChange={(e)=>setSystemUsed(e.target.value)}>
               {questionData.answers.map((answer, index) => {
                return(
                    <option value={answer} >{answer}</option>
                )
                
               })}  
                </select  > 
                 </>
                 )
        
        
        }
       
    }

    useEffect(() => {
        // Fetch questions and answers when component mounts
        getFirstQuestions();
    }, []);

    useEffect(() => {
        // This will run whenever the `questions` state updates
        console.log('Questions', questions);
    }, [questions]);



    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    
    function handleSubmit(Event) {
        Event.preventDefault();
        console.log("Domain is :",domain);
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
                loc_glob: loc_glob,
                location: location,
                size: size
                })
              .then(res =>{
                 // console.log(res);
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
                                <select class="form-select" aria-label="Default select example" value ={domain} onChange={(e)=>setDomain(e.target.value)}>
                                <option value="Health" >Health</option>
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
                        <div className="form-group">
                        <label for="loc_glob">The organization is local or global</label>
                        <select class="form-select" aria-label="Default select example" value ={loc_glob} onChange={(e)=>setLocGlob(e.target.value)}>
                        <option value="Local" >Local</option>
                        <option value="Global" >Global</option>
                        </select  >
                        
                        </div>
                        <div className="form-group">
                        <label htmlFor="location">Branch location</label>
                        <select className="form-select" aria-label="Default select example" value={location} onChange={(e) => setLocation(e.target.value)}>
                        {/* //{console.log("countries", countryList)} */}
                        {countryList.map(element => (
                            <option key={element} value={element}>{element}</option>
                        ))}
                        </select>

                        </div>
                        <div className="form-group">
                            <label for="organization size">Organization’s size</label>
                            <select class="form-select" aria-label="Default select example" value ={size}  onChange={(e)=>setSize(e.target.value)}>
                            <option value="1-50">1-50</option>
                            <option value="51-200" >51-200</option>
                            <option value="200-500" >200-500</option>
                            <option value="501+" >501+</option>

                        </select  >

                        </div>
                    
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
