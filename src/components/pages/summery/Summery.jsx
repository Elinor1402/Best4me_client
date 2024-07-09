import React from "react";
import Charts from "../../chart/Chart";
import DataCSV from "../../chart/DataCSV";
import Sidebar from "../../sidebar/SideBarForAdmin";
import Topbar from "../../topbar/TopBarForAdmin";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Summery.css";

export default function Home() {
  const [csvData, setCsvData] = useState([]);

  const isLogged = useSelector((state) => state.usersReducer.isLogged);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //for error that doesnt bother

    // window.addEventListener('error', e => {
    //   //console.log(e);
    //     if (e.message === "ResizeObserver loop completed with undelivered notifications.") {

    //         const resizeObserverErrDiv = document.getElementById(
    //             'webpack-dev-server-client-overlay-div'
    //         );
    //         const resizeObserverErr = document.getElementById(
    //             'webpack-dev-server-client-overlay'
    //         );
    //         if (resizeObserverErr) {
    //           //  resizeObserverErr.setAttribute('style', 'display: none');
    //          resizeObserverErr.remove();
    //         }
    //         if (resizeObserverErrDiv) {
    //           // resizeObserverErrDiv.setAttribute('style', 'display: none');
    //           resizeObserverErrDiv.remove();
    //         }
    //     }})

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
