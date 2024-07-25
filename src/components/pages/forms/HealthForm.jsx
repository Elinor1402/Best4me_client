// import React from "react";
// import "../../../App.css";
// import "../sign/SignUp.css";
// import Button from "@material-ui/core/Button";
// import SendIcon from "@material-ui/icons/Send";
// import SaveIcon from "@mui/icons-material/Save";
// import ClientTopbar from "../../topbar/TopBarForClient";
// import axios from "axios";
// import bcrypt from "bcryptjs";
// import Navbar from "../../navbar/Navbar";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useEffect, useRef, useState } from "react";

// export default function HealthForm() {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const fetchQuestionData = (questionData) => {
//     if (questionData.answerType === 1) {
//       let typeQ = "text";
//       if (questionData.question === "Email") {
//         typeQ = "email";
//       }
//       // else if (questionData.question === "Password") {
//       //     typeQ = passwordShown ? "text" : "password";
//       // }
//       else if (questionData.question === "Year of establishment") {
//         typeQ = "number";
//       }
//       return (
//         <>
//           <label htmlFor={questionData.id}>
//             {questionData.question}
//             {/* {questionData.question === "Password" ?   <i onClick={togglePasswordVisiblity}>{passwordShown ?  <FaEye/>:<FaEyeSlash/>}</i>: ""} */}
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
//       // setFormData({ [questionData.question]: questionData.answers[0]});
//       return (
//         <>
//           <label htmlFor={questionData.id}>{questionData.question}</label>
//           <select
//             className="form-select"
//             aria-label="Default select example"
//             id={questionData.id}
//             name={questionData.question}
//             value={formData[questionData.question] || ""}
//             // defaultValue={questionData.answers[0]}
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
//     getHealthQuestions();
//   }, []);

//   const getHealthQuestions = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/second-questions?answerID=0"
//       );
//       const data = response.data;
//       console.log("Questions", data);
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
//       console.log("Form data", formData);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   function handleSubmit(Event) {
//     Event.preventDefault();
//     console.log("formData", formData);

//     navigate("/Personal", { state: { formData } });
//   }

//   return (
//     <>
//       <ClientTopbar />
//       <div className="register-container">
//         <h1 className="sign-up">Health Form</h1>
//         {/* {errorMessage && <div className="error">{errorMessage}</div>}  */}
//         <form onSubmit={handleSubmit}>
//           <div className="form">
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
//             <Button endIcon={<SaveIcon />} color="primary" variant="contained">
//               Save Answers
//             </Button>

//             <Button
//               type="submit"
//               endIcon={<SendIcon />}
//               color="primary"
//               variant="contained"
//             >
//               Submit
//             </Button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
