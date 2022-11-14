import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import moment from "moment"
import '../../admin-panel/multipleusers/multipleuser.scss'
export default () => {
    const [users, setUsers] = useState([]);
 const Navigate=useNavigate();

 const postDate=moment().format("YYYY-MM-DD");
    const loadUsers =  () => {
        let token = Cookie.load('token')
        let userId= Cookie.load('userid')
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
          axios.get(`https://crm-09.herokuapp.com/attendance/empdaily/${userId}/${postDate}`, headers).then((res)=>{
         setUsers(res.data)
        });
    }   
    useEffect(() => {
        loadUsers();
    }, []);
    return (
        <>
            <div className="container-fluid  main-list">
                <div className='vertical-align-wrap '>
                    <div className=" vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <div className="yesterday-attendance" style={{'display':'flex' , 'justifyContent': 'space-between'}}>
                                <div><h3>Daily Attendance List</h3></div>
                                <div><button  className="attendance-btn" style={{'backgroundColor': '#1e75c7', 'color':'white' ,'borderRadius': '5px' ,'padding':'10px', 'border':'#1e75c7'}} onClick={()=>{Navigate('/yesterdatattendance/list')}}>Yesterday Attendance</button></div>
                                </div>
                                     <div className="employee-data" onClick={()=>{Navigate(`/dailyattendance/detail/${users._id}`)}}>
                                     {Object.keys(users).length === 0 ? <div className="alert-msg mt-4"><h5>No Records Today</h5><i class="fa fa-times" aria-hidden="true"></i></div> : 
                                     <div className="user-data ">
                                         <div className="user-icon ">
                                             <i className="fa fa-user" aria-hidden="true"></i>
                                         </div>
                                       <div className="user-details mt-2">
                                             <h4>{users.employeeName}</h4>
                                         </div>
                                     </div>
                                     }
                                 </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}