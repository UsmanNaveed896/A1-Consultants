import axios from 'axios';
import { useState,useEffect } from 'react';
import {useParams,useNavigate} from 'react-router-dom';  
import './employeedetail.scss';
import Cookie from 'react-cookies'
export default (props)=>{
const[users,setUsers]=useState({})
const params=useParams();
const Navigate=useNavigate()
useEffect (()=>{
    let token = Cookie.load('token');
    let headers = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    axios.get(`https://crm-09.herokuapp.com/employee/${params.id}`, headers).then ((res)=>{
        setUsers(res.data)
    });
},[])   

const deleteUser=()=>{
    let token = Cookie.load('token');
    let headers = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
axios.delete(`https://crm-09.herokuapp.com/employee/delete/${params.id}`,headers)
Navigate('/listview')
setUsers()
 alert("User Deleted")
}
    return(
        <>
          <div className="container-fluid main">
       <div className='vertical-align-wrap '>
           <div className="  vertical-align-middle">
               <div className='auth-box mt-5 '>
                   <div className="content"> 
                       <h3>Employee Detail</h3>
                   <form>  
                        <div>
                       <div className="form-group mt-5">
                           <label className="labels">Name:{users.name}</label>
                       </div>
                       <div className="form-group mt-4">
                           <label className="labels">Email: {users.email}</label>
                       </div>
                       <div className="form-group mt-4">
                           <label className="labels">Password: {users.password}</label>
                       </div>
                       <div className="form-group mt-4">
                           <label className="labels">Address:{users.address}</label>
                       </div>
                       <div className="form-group mt-4">
                           <label className="labels">City:{users.city}</label>
                       </div>
                       <div className="form-group mt-4">
                           <label className="labels">State:{users.state}</label>
                       </div>
                       <div className="form-group mt-4">
                           <label className="labels">Mobile No: {users.phone}</label>
                       </div>
                       <div className="form-group mt-4">
                           <label className="labels">CNIC: {users.Cnic}</label>
                       </div>
                       <div className="form-group mt-4">
                           <label className="labels">Designation: {users.Designation}</label>
                       </div>
                       <div className="form-group mt-4">
                           <label className="labels">Role: {users.userType}</label>
                       </div>
                       </div>
                        
                   </form>
                   <div className="action-btn">
                   <div><button type="edit" className="btn btn-danger" onClick={()=>Navigate(`/editemployee/${params.id}`)}>Edit</button></div>
                   <div><button type="delete" className="btn btn-danger" onClick={()=>deleteUser(users.id)}>Delete</button></div>
                   </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
        </>
    )
};