import React from "react";
import Charts from "../../chart/Chart";
import DataCSV from "../../chart/DataCSV";
import Sidebar from "../../sidebar/SideBarForAdmin";
import Topbar from "../../topbar/TopBar";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../../../Redux/usersActions";
import axios from "axios";
import "./Summery.css";

export default function Home() {
  const [csvData, setCsvData] = useState([]);

  const isLogged = useSelector((state) => state.usersReducer.isLogged);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/admin", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("get admin");
      })
      .catch((err) => {
        console.log("errrrrrrr");
        navigate("/log-in");
      });

    // cleanup this component
  }, [isLogged, navigate]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="summery">
          <DataCSV setCsvData={setCsvData} />
          <Charts csvData={csvData} />
        </div>
      </div>
    </>
  );
}
