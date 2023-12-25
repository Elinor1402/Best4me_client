import React from 'react';
import '../../App.css';
import "./TopBarForAdmin.css";
import { NotificationsNone, Language, Settings,  ExitToApp} from "@material-ui/icons";
import { useEffect,useRef,useReducer } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router'
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from '../../Redux/usersActions';


export default function Topbar() {

  let navigate = useNavigate();

  const isLogged = useSelector(state => state.usersReducer.isLogged);
  const dispatch=useDispatch();
  


    useEffect(() => {
      if(!isLogged)
      navigate('/log-in');
    }, [isLogged]); 
    

  return (
  
    <div className="topbar" >
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
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
          < ExitToApp onClick={()=>dispatch(logoutAction())}/> 
           
            </div>
        </div>
      </div>
    </div>
    
  );
}
