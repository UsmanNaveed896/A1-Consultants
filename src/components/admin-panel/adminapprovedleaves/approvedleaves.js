import axios from 'axios'
import { useState,useEffect } from 'react';
import {useNavigate,useParams} from 'react-router-dom';  
import Cookie from 'react-cookies'
import moment from 'moment';
import '../multipleusers/multipleuser.scss'
export default()=>{
    const params=useParams();
    const Navigate=useNavigate()
    const [users,setUsers]=useState([])
    const month=moment().format("MM");
    const year=moment().format("YYYY");
  useEffect(()=>{
    let token = Cookie.load('token');
    let userid=Cookie.load('userid')
    let headers = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    axios.get(`https://crm-09.herokuapp.com/attendance/leaveprm?mnth=${month}&yr=${year}`, headers).then ((res)=>{
     let data=res.data.filter(item => item._id === params.id )   
        setUsers(data)
    });
},[])
    return(
        <>
        <div className="container-fluid main-list">
     <div className='vertical-align-wrap '>
         <div className="  vertical-align-middle">
             <div className='auth-box mt-5 '>
                 <div className="content"> 
                     <h3>Leaves Status</h3>
                 <form>  
                    {
                       users.map((user)=>(
                            <div>
                            <div className="form-group mt-5">
                                <label className="labels">Name: {user.employeeName}</label>
                            </div>
                            <div className="form-group mt-4">
                                <label className="labels">Applied Date:{user.startdate}</label>
                            </div>
                            <div className="form-group mt-4">
                                <label className="labels"> Applied Time:{user.startTime}</label>
                            </div>
                            <div className="form-group mt-4">
                                <label className="labels"> Reason: {user.leavereason}</label>
                            </div>
                            <div className="form-group mt-4">
                                <label className="labels"> Status: <span className="status" style={{backgroundColor:'white' , color :'blue' ,borderRadius:'8px', padding:'5px'}}>{user.leavestatus}</span> 
                                </label>
                            </div>
                            </div> 
                     ))
                    }                       
                 </form>
                 </div>
             </div>
         </div>
     </div>
 </div>
 </>
    )
}