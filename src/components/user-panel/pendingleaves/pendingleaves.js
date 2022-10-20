import axios from 'axios'
import { useState,useEffect } from 'react';
import Cookie from 'react-cookies'
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
export default()=>{
    const [users,setUsers]=useState([{}])
    const[loader,setLoader]=useState(false)
    const postMonth=moment().format("MM");
    const postYear=moment().format("YYYY");
  useEffect(()=>{
    let token = Cookie.load('token');
    let userid=Cookie.load('userid')
    let headers = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    axios.get(`https://crm-09.herokuapp.com/attendance/emstatus/${userid}/pending?mnth=${postMonth}&yr=${postYear}`, headers).then ((res)=>{
        setUsers(res.data);
        setLoader(true)
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
                 {loader ?  <div>
                    {
                        users.length===0 ? <div className="alert-msg mt-4"><h5>No Records Today</h5><i class="fa fa-times" aria-hidden="true"></i></div> :
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
                    } </div> : <div className='spin' style={{textAlign : "center"}}><Spinner animation="border" /></div>  }   
                 </form>
                 </div>
             </div>
         </div>
     </div>
 </div>
 </>
    )
}