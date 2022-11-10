import axios from 'axios'
import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';  
import Cookie from 'react-cookies'
import moment from 'moment';

export default()=>{
    const Navigate=useNavigate()
    const [users,setUsers]=useState([])
    const postdate= moment().format("YYYY-MM-DD");
  useEffect(()=>{
    let token = Cookie.load('token');
    let userid=Cookie.load('userid');
    let headers = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    axios.get(`https://crm-09.herokuapp.com/attendance/empdaily/${userid}/${postdate}`, headers).then ((res)=>{
        console.log(res,"ikl")
        setUsers(res.data)
    });
},[])

    return(
        <>
        <div className="container-fluid main-list">
     <div className='vertical-align-wrap '>
         <div className="  vertical-align-middle">
             <div className='auth-box mt-5 '>
                 <div className="content"> 
                     <h3>Employee Detail</h3>
                 <form>  
                      <div>
                     <div className="form-group mt-5">
                         <label className="labels">Attendance Date: {users.startdate}</label>
                     </div>
                     <div className="form-group mt-4">
                         <label className="labels">Attendance Time:{users.startTime}</label>
                     </div>
                     <div className="form-group mt-4">
                         <label className="labels"> Checkout Date:</label>
                     </div>
                     <div className="form-group mt-4">
                         <label className="labels"> Checkout Time:</label>
                     </div>
                     </div>      
                 </form>
                 <div className="action-btn">
                 <div><button type="edit" className="btn btn-danger" onClick={()=>Navigate('/confirmcheckout/')}>Proceed to Checkout</button></div>
                 </div>
                 </div>
             </div>
         </div>
     </div>
 </div>
 </>
    )
}