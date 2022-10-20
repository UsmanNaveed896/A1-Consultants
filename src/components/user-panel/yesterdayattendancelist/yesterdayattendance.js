import axios from 'axios';
import { useState, useEffect,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import moment from "moment";
import Spinner from 'react-bootstrap/Spinner';
export default () => {
    const [users, setUsers] = useState([]);
    const[loader,setLoader]=useState(false);
 const Navigate=useNavigate();
    useEffect(() => {
        loadUsers();
    }, []);
    let yesterdaydate = moment().subtract(1, 'day').format("YYYY-MM-DD")
    const loadUsers = async () => {
        let token = Cookie.load('token')
        let userId= Cookie.load('userid')
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
          axios.get(`https://crm-09.herokuapp.com/attendance/empdaily/${userId}/${yesterdaydate}`, headers).then((res)=>{
         setUsers(res.data);
         setLoader(true)
        });
    }   
    return (
        <>
             <div className="container-fluid main">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <h3>Yesterday Attendance List</h3>
                                     <div className="employee-data" onClick={()=>{Navigate(`/yesterdatattendance/detail/${users._id}`)}}>
                                {Object.keys (users).length === 0 ?  <div className="alert-msg mt-4"><h5>No Records Today</h5><i class="fa fa-times" aria-hidden="true"></i></div> :     <div className="user-data mt-5">
                                       <div className="user-data mt-5">
                                       <div className="user-icon ">
                                             <i className="fa fa-user" aria-hidden="true"></i>
                                         </div>
                                         <div className="user-details mt-2">
                                             <h4>{users.employeeName}</h4>
                                         </div>
                                     </div>
                                    
                                     </div>}
                                 </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}