import React, { useState, useEffect } from "react";
import "./UploadFiles.css";
import Sidebar from "../../sidebar/SideBarForAdmin";
import Topbar from "../../topbar/TopBar";
import Button from "@material-ui/core/Button";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Upload file format csv/xlsx which contains client
export default function UploadFiles() {
  const [file, setFile] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/files", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("get admin");
      })
      .catch((err) => {
        navigate("/log-in");
      });

    // cleanup this component
  }, [file]);

  function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const url = "http://localhost:3000/uploadfile";
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("CompanyID", localStorage.getItem("CompanyID"));
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: token,
      },
    };
    axios
      .post(url, formData, config)
      .then((res) => {
        setIsSent(true);
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
      });
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="summery">
          <div className="uploadContainer form-group">
            {errorMessage && (
              <Alert severity="error" className="error">
                {errorMessage}
              </Alert>
            )}
            {isSent && (
              <Alert severity="success">Emails were send successfully</Alert>
            )}
            <form onSubmit={handleSubmit}>
              <input
                className="custom-file-input"
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleChange}
                required
              />
              <Button type="submit" color="primary" variant="contained">
                UPLOAD FILE
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
