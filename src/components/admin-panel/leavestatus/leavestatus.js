import axios from 'axios'
import { useState,useEffect } from 'react';
import {useNavigate,useParams} from 'react-router-dom';  
import Cookie from 'react-cookies'
import moment from 'moment';

export default()=>{
    const params=useParams();
    const Navigate=useNavigate()
    const [users,setUsers]=useState([])
    const postMonth=moment().format("MM");
    const postYear=moment().format("YYYY");
  useEffect(()=>{
    let token = Cookie.load('token');
    let headers = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    axios.get(`https://crm-09.herokuapp.com/attendance/empstatus?mnth=${postMonth}&yr=${postYear}`, headers).then ((res)=>{
        setUsers(res.data)
    });
},[])

    return(
        <>
        <div className="container-fluid main">
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
                                <i className="fa fa-pencil-square-o  edit-icon" aria-hidden="true" onClick={()=>{Navigate(`/leavereq/${user._id}`)}}></i></label>
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