// import React from "react";
// import "./SignUp.css";
// import Button from "@material-ui/core/Button";
// import SendIcon from "@material-ui/icons/Send";
// import axios from "axios";
// import Navbar from "../../navbar/Navbar";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Alert from "@mui/material/Alert";
// import { useEffect, useState } from "react";

// //Sign up page for admin
// export default function Checking() {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [passwordShown, setPasswordShown] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   //get the questions from database
//   const getFirstQuestions = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/first-question");
//       const data = response.data;
//       setQuestions(data);

//       // Initialize formData with default values
//       const initialFormData = {};
//       data.forEach((question) => {
//         if (question.answerType === 2) {
//           initialFormData[question.question] =
//             question.answers[0]?.answer || "";
//         }
//       });
//       setFormData(initialFormData);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   const fetchQuestionData = (questionData) => {
//     if (questionData.answerType === 1) {
//       let typeQ = "text";
//       if (questionData.question === "Email") {
//         typeQ = "email";
//       } else if (questionData.question === "Password") {
//         typeQ = passwordShown ? "text" : "password";
//       } else if (questionData.question === "Year of establishment") {
//         typeQ = "number";
//       }
//       return (
//         <>
//           <label htmlFor={questionData.id}>
//             {questionData.question}
//             {questionData.question === "Password" ? (
//               <i onClick={togglePasswordVisiblity}>
//                 {passwordShown ? <FaEye /> : <FaEyeSlash />}
//               </i>
//             ) : (
//               ""
//             )}
//           </label>

//           <input
//             type={typeQ}
//             id={questionData.id}
//             name={questionData.question}
//             value={formData[questionData.question] || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </>
//       );
//     } else if (questionData.answerType === 2) {
//       return (
//         <>
//           <label htmlFor={questionData.id}>{questionData.question}</label>
//           <select
//             className="form-select"
//             aria-label="Default select example"
//             id={questionData.id}
//             name={questionData.question}
//             value={formData[questionData.question] || ""}
//             onChange={handleInputChange}
//           >
//             {questionData.answers.map((answer, index) => (
//               <option key={index} value={answer.answer}>
//                 {answer.answer}
//               </option>
//             ))}
//           </select>
//         </>
//       );
//     }
//   };

//   useEffect(() => {
//     // Fetch questions and answers when component mounts
//     getFirstQuestions();
//   }, []);

//   useEffect(() => {
//     // This will run whenever the `questions` state updates
//     console.log("Questions", questions);
//   }, [questions]);

//   const togglePasswordVisiblity = () => {
//     setPasswordShown(passwordShown ? false : true);
//   };

//   function handleSubmit(Event) {
//     Event.preventDefault();
//     console.log("formData", formData);
//     const currentYear = new Date().getFullYear();
//     if (formData["Password"].length < 6)
//       setErrorMessage("Password must be at least 6 characters long");
//     else if (
//       formData["Year of establishment"] < 1900 ||
//       formData["Year of establishment"] > currentYear
//     )
//       setErrorMessage("Year of establishment is invalid");
//     else {
//       console.log("new form data", formData);
//       axios
//         .post("http://localhost:3000/sign-up", { formData: formData })
//         .then((res) => {
//           localStorage.setItem("CompanyID", res.data.message);
//           navigate("/final-signup");
//         })
//         .catch((err) => {
//           setErrorMessage(err.response.data);
//         });
//     }
//   }
//   return (
//     <>
//       <Navbar />
//       <div className="register-container">
//         <h1 className="sign-up">SIGN UP</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="form">
//             {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
//             <div className="register-container-child">
//               {questions.length > 0 && (
//                 <div className="register-container-form">
//                   {questions.map((questionData, index) => {
//                     // Skip the first column and its header
//                     return (
//                       <div key={index} className="form-group">
//                         {fetchQuestionData(questionData)}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="btn">
//             <Button
//               type="submit"
//               endIcon={<SendIcon />}
//               color="primary"
//               variant="contained"
//             >
//               Sign Up
//             </Button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
  Container,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Navbar from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

// Sign up page for admin
export default function Checking() {
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getFirstQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/first-question");
      const data = response.data;
      setQuestions(data);

      const initialFormData = {};
      data.forEach((question) => {
        if (question.answerType === 2) {
          initialFormData[question.question] = "";
          // question.answers[0]?.answer || "";
        }
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchQuestionData = (questionData) => {
    if (questionData.answerType === 1) {
      let typeQ = "text";
      if (questionData.question === "Email") {
        typeQ = "email";
      } else if (questionData.question === "Password") {
        typeQ = passwordShown ? "text" : "password";
      } else if (questionData.question === "Year of establishment") {
        typeQ = "number";
      }
      return (
        <FormControl fullWidth margin="normal">
          <TextField
            type={typeQ}
            label={questionData.question}
            id={questionData.id}
            name={questionData.question}
            value={formData[questionData.question] || ""}
            onChange={handleInputChange}
            InputProps={{
              endAdornment:
                questionData.question === "Password" ? (
                  <IconButton onClick={togglePasswordVisiblity}>
                    {passwordShown ? <FaEye /> : <FaEyeSlash />}
                  </IconButton>
                ) : null,
            }}
            required
          />
        </FormControl>
      );
    } else if (questionData.answerType === 2) {
      return (
        <FormControl fullWidth margin="normal">
          <InputLabel>{questionData.question}</InputLabel>
          <Select
            id={questionData.id}
            name={questionData.question}
            value={formData[questionData.question] || ""}
            onChange={handleInputChange}
            required
          >

            {questionData.answers.map((answer, index) => (
              <MenuItem key={index} value={answer.answer}>
                {answer.answer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
  };

  useEffect(() => {
    getFirstQuestions();
  }, []);

  useEffect(() => {
    console.log("Questions", questions);
    console.log("Form Data", formData);
  }, [questions]);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentYear = new Date().getFullYear();
    if (formData["Password"].length < 6)
      setErrorMessage("Password must be at least 6 characters long");
    else if (
      formData["Year of establishment"] < 1900 ||
      formData["Year of establishment"] > currentYear
    )
      setErrorMessage("Year of establishment is invalid");
    else {
      axios
        .post("http://localhost:3000/sign-up", { formData: formData })
        .then((res) => {
          localStorage.setItem("CompanyID", res.data.message);
          navigate("/final-signup");
        })
        .catch((err) => {
          setErrorMessage(err.response.data);
        });
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box mt={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            SIGN UP
          </Typography>
          <form onSubmit={handleSubmit}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {questions.length > 0 &&
              questions.map((questionData, index) => (
                <div key={index}>{fetchQuestionData(questionData)}</div>
              ))}
            <Box mt={2}>
              <Button
                type="submit"
                endIcon={<SendIcon />}
                color="primary"
                variant="contained"
                fullWidth
              >
                Sign Up
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
