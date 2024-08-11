import "./Users.css";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Topbar from "../../topbar/TopBar";
import Sidebar from "../../sidebar/SideBarForAdmin";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

//Table of clients that recieved emails
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const columns = [
    { field: "user_id", headerName: "ID", width: 300 },
    // {
    //   field: "user",
    //   headerName: "User",
    //   width: 300,
    //   renderCell: (params) => {
    //     return (
    //       <div className="userListUser">
    //         {params.row.username}
    //       </div>
    //     );
    //   },
    // },
    { field: "email", headerName: "Email", width: 300 },
    { field: "isdone", headerName: "Status", width: 120 },
    { field: "email_date", headerName: "Email sending time", width: 400 },
  ];
  function parseCSV(csvString) {
    const data = csvString.split("\n").map((row) => row.split(","));
    return data;
  }

  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    //get clients data from csv file in the time we use google forms in the project (fix in the future)
    axios
      .get("http://localhost:3000/csvData", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        var compID = localStorage.getItem("CompanyID");
        const parsedCsvData = parseCSV(response.data);
        //update Status in users table when user filled the google form (fix in the future)
        axios
          .put("http://localhost:3000/updateUserStatus", {
            companyID: compID,
            csvData: parsedCsvData,
          })
          .then((res) => {
            setUpdateStatus(true);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
      });
  };

  useEffect(() => {
    const usersUpdate = () => {
      var companyID = localStorage.getItem("CompanyID");
      const token = localStorage.getItem("token");
      setIsLoading(true);
      //Get users data from database
      axios
        .get("http://localhost:3000/users", {
          params: { companyID },
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data.users.rows);
          //set users data into users
          setUsers(res.data.users.rows);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.data === "Users not found, emails were not sent")
            setErrorMessage(err.response.data);
          else navigate("/log-in");
        });
    };
    fetchUserData();
    usersUpdate();
  }, [updateStatus]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="userList">
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <DataGrid
            className="tableGrid"
            rows={users}
            disableSelectionOnClick
            columns={columns}
            loading={isLoading}
            getRowId={(row) => row.email}
            pageSize={13}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
