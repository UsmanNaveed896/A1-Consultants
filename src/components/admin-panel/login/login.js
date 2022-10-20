import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../employeedetail/employeedetail.scss';
import Cookie from 'react-cookies'

export default ()=>{
let Navigate=useNavigate();
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const[error,seterror]=useState()

const handleEmail=(e)=>{
    setEmail(e.target.value);
}
const handlePassword=(e)=>{
    setPassword(e.target.value)
}
useEffect(() => {
    const token = Cookie.load('token')    //load is used to get cookie
    if (token !== undefined) {
      Navigate('/')
    }
  }, [])
const usersStatus=(token,userType,userid,username)=>{ 
    const login = {
        token:token.token,
        user_type:userType,
        userid:userid,
        username:username
    }
Cookie.save('token',token,{maxAge:15000,path:'/'})
Cookie.save('user_Type',userType,{maxAge:15000,path:'/'})
Cookie.save('userid',userid,{maxAge:15000,path:'/'})
Cookie.save('username',username,{maxAge:15000,path:'/'})
}
const handleApiAdmin=(e)=>{
    e.preventDefault();
    if(email && password) {
        axios.post(`${process.env.REACT_APP_API_KEY}/signin/admin` ,{
            email:email,
            password:password,
            
        }).then((res)=>{      
            usersStatus(res.data.token,'admin')
            Navigate('/');
        }, reason => {
            console.error(reason);
            seterror('Invalid Email or Password')
        }
        )
    } else {
        alert("Please Fill Form")
    }
    }
const handleApiUser=(e)=>{
    e.preventDefault();
    if(email && password){
        axios.post(`${process.env.REACT_APP_API_KEY}/signin/` ,{
            email:email,
            password:password,
        }).then((res)=>{
            usersStatus(res.data.token,'employee',res.data.userid,res.data.username)
            Navigate('/');
        },reason =>{
            console.error(reason);
            seterror('Invalid Email or Password')
        }
        )
    }else{
        alert("Please Fill Form")
    }
} 

    return(
        <>
        <div className="container-fluid main">
        <div className='vertical-align-wrap '>
            <div className="  vertical-align-middle">
                <div className='auth-box mt-5 '>
                    <div className="content"> 
                    <h3>Login</h3>
                    <form>  
                        <div className="form-group mt-5">
                            <label className="labels">Email</label>
                            <input type="Email" className="form-control form-control-lg" placeholder="Enter your E-mail address" onChange={(e) =>handleEmail(e)} value={email}
                                name="Email" />
                        </div>
                        <div className="form-group mt-4">
                            <label className="labels">Password</label>
                            <input type="Password" className="form-control form-control-lg" placeholder="Enter Your Password" onChange={(e)=>handlePassword(e)} value={password}
                                name="Enter Your Password" />
                        </div>
                        {error ? <span>{error}</span> : ""}
                        <button type="submit" className="btn btn-danger" onClick={handleApiAdmin}>Login as Admin</button>
                        <button type="submit" className="btn btn-danger" onClick={handleApiUser}>Login as Employee</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}