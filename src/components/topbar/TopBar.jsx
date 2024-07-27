import React from "react";
import "../../App.css";
import "./TopBar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  ExitToApp,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../Redux/usersActions";

//this is the top bar for both clinet(simple user) and for admin
export default function Topbar() {
  let navigate = useNavigate();
  const isLogged = useSelector((state) => state.usersReducer.isLogged);
  const dispatch = useDispatch();
  //get userID from local storage to regonzie him.
  const userID = localStorage.getItem("userID");
  //use state so if we log out it will save the userID eventhough it was deleted from local storage
  const [userIDs, setUserID] = useState(userID);
  useEffect(() => {
    //if it was a user navigate to user login page, else navigate to admin login page
    if (userIDs) {
      if (!isLogged) navigate("/user-log-in");
    } else {
      if (!isLogged) navigate("/log-in");
    }
  }, [isLogged, userIDs]);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            {" "}
            {localStorage.getItem("userID") ? "Client" : "Admin"}
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer">
            <ExitToApp onClick={() => dispatch(logoutAction())} />
          </div>
        </div>
      </div>
    </div>
  );
}
