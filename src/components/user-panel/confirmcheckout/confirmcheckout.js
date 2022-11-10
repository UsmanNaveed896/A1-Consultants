import axios from 'axios'
import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';  
import Cookie from 'react-cookies'
import moment from 'moment';

export default ()=>{
const [users,setUsers]=useState([])
const Navigate=useNavigate();
const postcheckoutDate= moment().format("YYYY-MM-DD");
const postTime= moment().format("h:mm A");
const postdate= moment().format("YYYY-MM-DD");
const [checkOut,setCheckOut]=useState({
    checkoutDate:postcheckoutDate,
    checkoutTime:postTime,
    checkoutstatus:"done"
})
  useEffect(()=>{
    let token = Cookie.load('token');
    let userid=Cookie.load('userid');
    let headers = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    axios.get(`https://crm-09.herokuapp.com/attendance/empdaily/${userid}/${postdate}`, headers).then ((res)=>{
        setUsers(res.data)
    });
},[])
useEffect(()=>{
let token = Cookie.load('token');
let userid=Cookie.load('userid');
let headers = {
    headers: {
        Authorization: "Bearer " + token,
    }
}
axios.patch(`https://crm-09.herokuapp.com/attendance/edit/${userid}`,checkOut, headers).then ((res)=>{
    console.log(res,"confirm")
});
},[])
const checkOutDone=()=>{
    alert("Succesfully Checked Out")
    Navigate('/')
}
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
                         <label className="labels"> Checkout Date:{checkOut.checkoutDate}</label>
                     </div>
                     <div className="form-group mt-4">
                         <label className="labels"> Checkout Time: {checkOut.checkoutTime}</label>
                     </div>
                     </div>      
                 </form>
                 <div className="action-btn">
                 <div><button type="edit" className="btn btn-danger" onClick={()=>{checkOutDone()}}> Confirm Checkout <i class="fa fa-check-circle" aria-hidden="true"></i></button></div>
                 </div>
                 </div>
             </div>
         </div>
     </div>
 </div>
 </>
    )
}