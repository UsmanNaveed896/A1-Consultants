import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../employeedetail/employeedetail.scss'
import Cookie from 'react-cookies'
export default()=>{
const navigate =useNavigate();
const [user,setUser]=useState({
    userType:"",
    _id:"",
    name:"",
    password:"",
    email:"",
    phone:"",
    address:"",
    city:"",
    state:"",
    Cnic:"",
    Designation:"",
});
const oninputChange=(e)=>{
    setUser(st=>({
        ...st,
        [e.target.name]:e.target.value
    }))
};

const onSubmit=e=>{
e.preventDefault();
let token = Cookie.load('token');
let headers={
    headers: {
      Authorization: "Bearer " + token,
    }}
axios.post("https://crm-09.herokuapp.com/employee/add" ,user,headers).then ((res)=>{
    console.log(res);
    navigate('/listview')
})
}
const {userType,_id,name,password,email,phone,address,city,state,Cnic,Designation} =user;

    return(
        <>
        <div className="container-fluid main">
        <div className='vertical-align-wrap '>
            <div className="  vertical-align-middle">
                <div className='auth-box mt-5 '>
                    <div className="content"> 
                    <h3>Add Employee</h3>
                    <form onSubmit={e=> onSubmit(e)}>  
                        <div className="form-group mt-5">
                            <label className="labels">Email</label>
                            <input type="Email" className="form-control form-control-lg" placeholder="Enter your E-mail address" value={email} onChange={e => oninputChange(e)}
                                name="email" />
                        </div>
                        <div className="form-group mt-4">
                            <label className="labels">Password</label>
                            <input type="Password" className="form-control form-control-lg" placeholder="Enter Your Password" value={password} onChange={e => oninputChange(e)}
                                name="password" />
                        </div>
                        <div className="form-group mt-4">
                            <label className="labels">Full Name</label>
                            <input type="text" className="form-control form-control-lg" placeholder="Enter Your Full Name" value={name} onChange={e => oninputChange(e)}
                                name="name" />
                        </div>
                        <div className="form-group mt-4">
                            <label className="labels">Address</label>
                            <input type="text" className="form-control form-control-lg" placeholder="Enter Your Address"  value={address} onChange={e => oninputChange(e)}
                                name="address" />
                        </div>
                        <div className="form-group mt-4">
                            <label className="labels">City</label>
                            <input type="text" className="form-control form-control-lg" placeholder="Enter Your City"  value={city} onChange={e => oninputChange(e)}
                                name="city" />
                        </div>
                        <div className="form-group mt-4">
                            <label className="labels">State</label>
                            <input type="text" className="form-control form-control-lg" placeholder="Enter Your State"  value={state} onChange={e => oninputChange(e)}
                                name="state" />
                        </div>
                        <div className="form-group mt-4">
                            <label className="labels">Mobile No</label>
                            <input type="number" className="form-control form-control-lg" placeholder="Enter Your Mobile No" value={phone} onChange={e => oninputChange(e)}
                                name="phone" />
                        </div>
                        <div className="form-group mt-4">
                            <label className="labels">CNIC</label>
                            <input type="number" className="form-control form-control-lg" placeholder="Enter Your CNIC" value={Cnic} onChange={e => oninputChange(e)}
                                name="Cnic" />
                        </div>
                        <div className="form-group mt-4">
                            <label className="labels">Designation</label>
                            <input type="text" className="form-control form-control-lg" placeholder="Enter Your Designation" value={Designation} onChange={e => oninputChange(e)}
                                name="Designation" />
                        </div>
                        <div className="form-group mt-4">
                            <select class="selectpickeraddemployee mt-2" title="Some placeholder text..." name="userType" value={userType} onChange={e => oninputChange(e)} >
                                    <option data-hidden="true"  value="">Select Role</option>
                                    <option value={"employee"}>Employee</option>
                                    <option value={"admin"}>Admin</option>
                                </select>
                        </div>
                        <button type="submit" className="btn btn-danger">Add Employee</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}