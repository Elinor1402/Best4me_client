import "./Users.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../../dummyData";
// import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect,useState } from "react";
import Topbar from "../../topbar/TopBarForAdmin";
import Sidebar from "../../sidebar/SideBarForAdmin";
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
  const [data, setData] = useState(userRows);

  const [users,setUsers]=useState([]);
  const [isLoading,setIsLoading]=useState(false);

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
    {  field: "isdone",headerName: "Status", width: 120, },
    {  field: "email_date",headerName: "Email sending time", width: 400, },
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 160,
    // },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"/user/" + params.row.id}>
    //           <button className="userListEdit">Edit</button>
    //         </Link>
    //         <DeleteOutline
    //           className="userListDelete"
    //           onClick={() => handleDelete(params.row.id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  useEffect(()=>{
    const usersUpdate=()=>
     {
      var CompanyID= localStorage.getItem('CompanyID');
      setIsLoading(true);
      axios.get('http://localhost:3000/users',{params:{CompanyID}}).then(res =>{
          console.log(res.data.users.rows);
          setUsers(res.data.users.rows);
          setIsLoading(false);
        }).catch(err =>{
           console.log(err);
        });
     }
     usersUpdate();
 },[])



  return (
      <>
        <Topbar />
            <div className="container">
            <Sidebar />
            <div className="userList">
            <DataGrid className="tableGrid"
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
