import React, { useState } from "react";
import "./UploadFiles.css";
import Sidebar from "../../sidebar/SideBarForAdmin";
import Topbar from "../../topbar/TopBarForAdmin";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function UploadFiles() {
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

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
    axios.post(url, formData, config).then((res) => {
      window.alert(res.data);
    });
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="summery">
          <div className="uploadContainer">
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
