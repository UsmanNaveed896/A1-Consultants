import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
import '../multipleusers/multipleuser.scss'
export default () => {
    const [users, setUsers] = useState([]);
    const[loader,setLoader]=useState(false)
 const Navigate=useNavigate();
    useEffect(() => {
        loadUsers();
    }, []);
    const month= moment().format("M");
    const year=moment().format("YYYY");
    const loadUsers = async () => {
        let token = Cookie.load('token');
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        axios.get(`https://crm-09.herokuapp.com/attendance/leaveprm?mnth=${month}&yr=${year}`, headers).then((res)=>{
            const uniqueItems = [...new Map(res.data.map((item) => [ item["employeeId"], item])).values()];
            setUsers(uniqueItems.reverse())
            setLoader(true)
        })
        
     
    }
    return (
        <>
            <div className="container-fluid main-list">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <h3>Approved Leave Lists</h3>
                  {loader ?  <div>
                           { users.length===0 ?  <div className="alert-msg"><h5>No Approved Leaves Today</h5><i class="fa fa-times" aria-hidden="true"></i></div> :
                             users.map((user)=>(
                                     <div className="employee-data" onClick={()=>{Navigate(`/adminapproveleavesdetail/${user._id}`)}}>
                                     <div className="user-data mt-5">
                                         <div className="user-icon ">
                                             <i className="fa fa-user" aria-hidden="true"></i>
                                         </div>
                                         <div className="user-details">
                                             <h4>{user.employeeName}</h4>
                                             <h5>{user.startdate}</h5>
                                         </div>
                                     </div>
                                     <div className="left-arrow">
                                         <div className="fixed"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>
                                     </div>
                                 </div>
                            ))} 
                            </div> : <div className='spin' style={{textAlign : "center"}}><Spinner animation="border" /></div>  }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}