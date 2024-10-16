import { useState } from "react";
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

const AdminForm = () => {

    const [questionContent,setQuestionContent]= useState("");
    const [employeeLevel,setEmployeeLevel]= useState(0);
    const [matric,setMatric]= useState(0);
    const [levelAnswerDict, setLevelAnswerDict] = useState([
        "Senior Managment",
        "Junior Managment",
        "Tech Positions",
        "End Users"
    ]);
    return(

        <FormControl fullWidth margin="normal">
        <TextField
          type="text"
          label="Question Content"
          name="Question Content"
          value={questionContent || "Enter your question"}
          onChange= {(e) =>{setQuestionContent(e.target.value)}}
        //   InputProps={{
        //     endAdornment:
        //       questionData.question === "Password" ? (
        //         <IconButton onClick={togglePasswordVisiblity}>
        //           {passwordShown ? <FaEye /> : <FaEyeSlash />}
        //         </IconButton>
        //       ) : null,
        //   }}
          required
        />
         <InputLabel>Employee Level</InputLabel>
          <Select
            name="Employee Level"
            value={employeeLevel || "Select employee level"}
            onChange={(e) =>{setEmployeeLevel(e.target.value)}}
            required
            className="custom-select"
          >
            {levelAnswerDict.map((answer, index) => (
              <MenuItem key={index} value={answer} className="custom-menu-item">
                {answer}
              </MenuItem>
            ))}
          </Select>
      </FormControl>
    )
}
export default AdminForm;