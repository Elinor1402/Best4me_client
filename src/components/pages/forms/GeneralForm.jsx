import React from "react";
import "../../../App.css";
import "../sign/SignUp.css";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import SaveIcon from "@mui/icons-material/Save";
import Alert from "@mui/material/Alert";
import Topbar from "../../topbar/TopBar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

//Form the client gets after log in.
export default function GeneralForm() {
  //Contain array, each cell represents a "question" in the forms , "answerType" and "answers" to this question.
  const [questions, setQuestions] = useState([]);
  //An object which represents the client form data- all questions and what he answer, key:value pairs of questions and answer.
  const [formData, setFormData] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //style the fields of the answers of the questions we get from database.
  const fetchQuestionData = (questionData) => {
    if (questionData.answerType === 1) {
      let typeQ = "text";
      if (questionData.question === "Email") {
        typeQ = "email";
      } else if (questionData.question === "Year of establishment") {
        typeQ = "number";
      }
      return (
        <>
          <label htmlFor={questionData.id}>{questionData.question}</label>

          <input
            type={typeQ}
            id={questionData.id}
            name={questionData.question}
            value={formData[questionData.question] || ""}
            onChange={handleInputChange}
            required
          />
        </>
      );
    } else if (questionData.answerType === 2) {
      return (
        <>
          <label htmlFor={questionData.id}>{questionData.question}</label>
          <select
            className="form-select"
            aria-label="Default select example"
            id={questionData.id}
            name={questionData.question}
            value={formData[questionData.question] || ""}
            onChange={handleInputChange}
          >
            {questionData.answers.map((answer, index) => (
              <option key={index} value={answer.answer}>
                {answer.answer}
              </option>
            ))}
          </select>
        </>
      );
    }
  };

  useEffect(() => {
    // Fetch questions and answers use the company Organizations domain ,when component mounts
    getGeneralQuestions();
  }, []);

  const getGeneralQuestions = async () => {
    try {
      const infoForm = location.state.infoForm;
      const answerID = infoForm.answerID;
      const userID = localStorage.getItem("userID");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/second-questions`,
        {
          params: {
            answerID,
            userID,
          },
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;
      setQuestions(data);
      //get users answers
      const response2 = await axios.get(`http://localhost:3000/users-answers`, {
        params: {
          userID,
        },
        headers: {
          Authorization: token,
        },
      });
      setFormData(response2.data);

      // // Initialize formData with default values
      // const initialFormData = {};
      // data.forEach((question) => {
      //   if (question.answerType === 2) {
      //     initialFormData[question.question] =
      //       question.answers[0]?.answer || "";
      //   }
      // });
      // setFormData(initialFormData);

      console.log("Form data", formData);
    } catch (error) {
      console.error("Error fetching questions:", error);
      navigate("/user-log-in");
    }
  };

  function handleSubmit(Event) {
    Event.preventDefault();
    console.log("formData", formData);

    navigate("/Personal", { state: { formData } });
  }

  const saveGeneralQuestions = async () => {
    console.log("FormData,", formData);
    const userID = localStorage.getItem("userID");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/save-answers",
        {
          formData: formData, // Data to be sent in the request body
          userID: userID,
        },
        {
          headers: {
            Authorization: token, // Authorization header should include 'Bearer'
          },
        }
      );
      setIsSaved(true);
    } catch (error) {
      navigate("/user-log-in");
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="register-container">
        <h1 className="sign-up">
          {location.state ? location.state.infoForm.od : ""} Form
        </h1>
        {isSaved === true ? (
          <Alert severity="success">Your answers are saved.</Alert>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="register-container-child">
              {questions.length > 0 && (
                <div className="register-container-form">
                  {questions.map((questionData, index) => {
                    // Skip the first column and its header
                    return (
                      <div key={index} className="form-group">
                        {fetchQuestionData(questionData)}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="btn">
            <Button
              endIcon={<SaveIcon />}
              color="primary"
              variant="contained"
              onClick={saveGeneralQuestions}
            >
              Save Answers
            </Button>

            <Button
              type="submit"
              endIcon={<SendIcon />}
              color="primary"
              variant="contained"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
