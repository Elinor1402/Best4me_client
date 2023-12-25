import React from 'react';
import Chart from "../../chart/Chart";
import Sidebar from "../../sidebar/SideBarForAdmin";
import Topbar from "../../topbar/TopBarForAdmin";
import { useNavigate  } from 'react-router-dom';
import { useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import "./Summery.css";
import { questionnaire1,
         questionnaire2,
         questionnaire3,
         questionnaire4,
         questionnaire5 } from "../../../dummyData";

 

export default function Home({ route }) {
 
  const isLogged = useSelector(state => state.usersReducer.isLogged);
  const dispatch=useDispatch();
 
 
  let navigate = useNavigate();

  useEffect(() =>{

    //for error that doesnt bother

    window.addEventListener('error', e => {
      //console.log(e);
        if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
          
            const resizeObserverErrDiv = document.getElementById(
                'webpack-dev-server-client-overlay-div'
            );
            const resizeObserverErr = document.getElementById(
                'webpack-dev-server-client-overlay'
            );
            if (resizeObserverErr) {
              //  resizeObserverErr.setAttribute('style', 'display: none');
             resizeObserverErr.remove();
            }
            if (resizeObserverErrDiv) {
              // resizeObserverErrDiv.setAttribute('style', 'display: none');
              resizeObserverErrDiv.remove();
            }
        }})

      const token = localStorage.getItem('token');
      
      axios.get('http://localhost:3000/admin',{
          headers: {
              Authorization: token,
          }
      }).then(res =>{
          console.log('get admin');
         
      }).catch(err =>{
          console.log('errrrrrrr');
          //console.log(err);
        // setisLogged(false);
       
         navigate('/log-in');
      })

  // cleanup this component
 
      
  },[isLogged,navigate]
  )

   let showAdminPage = false
        if (isLogged) {
          showAdminPage = true
        }

  return (
    <>
    
        <Topbar/>
        <div className="container">
            <Sidebar />

            {/* many error regarding charts */}
            <div className="summery">
            <Chart data={questionnaire1} title="Questionnaire 1" />
            <Chart data={questionnaire2} title="Questionnaire 2" />
            <Chart data={questionnaire3} title="Questionnaire 3" />
            <Chart data={questionnaire4} title="Questionnaire 4" />
            <Chart data={questionnaire5} title="Questionnaire 5" />
        </div>

    </div>
    
    

    </>
    
  );
}
