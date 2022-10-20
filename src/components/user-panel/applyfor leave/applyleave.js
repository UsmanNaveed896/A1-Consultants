import axios from 'axios'
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import moment from 'moment';

export default () => {
    const Navigate=useNavigate()
    const [activeButton,setActiveButton]=useState(true)
    const wstatus="leave";
    const appliedFor="leave"
    const leaveStatus="pending"
    const postdate= moment().format("YYYY-MM-DD");
    const month= moment().format("M");
    const year=moment().format("YYYY");
    const postTime=moment().format("h:mm A");
    const [status, setStatus] = useState({
        wstatus:wstatus,
        appliedFor:appliedFor,
        leavereason:"",
        startTime:postTime,
        startdate:postdate,
        month:month ,
        year:year,
        leavestatus:leaveStatus,      
    })
   
    const oninputChange=(e)=>{
        setStatus({...status , [e.target.value]:e.target.value })
    }
    const setStatusApi = (e) => {
        e.preventDefault(e)
        let token =  Cookie.load('token');
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        axios.post(`https://crm-09.herokuapp.com/attendance/add`, status, headers).then((response) => {
                alert("You Have Succesfully Applied For Leave")
                Navigate('/')
                setActiveButton(false)
               
        })
    }
    return (
        <>
            <div className="container-fluid main">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <h3>Apply For Leave</h3>
                                <form>
                                    <div>
                                        <div className="form-group mt-5">
                                            <form >
                                                <p><label for="w3review">Please Write Reason For Leave</label></p>
                                                <textarea id="w3review" name="leavereason" rows="4" cols="50" placeholder='Please Enter Reason For Leave'  onChange={(e)=>
                                                    {setStatus({leavereason:e.target.value,startdate:postdate, startTime:postTime,wstatus,appliedFor,leaveStatus,month,year})
                                                    setActiveButton(false)
                                                    }}></textarea>
                                            </form>
                                        </div>
                                    </div>
                                </form>
                                <div className="action-btn">
                                    <div><button type="submit" className="btn btn-danger" disabled={activeButton} onClick={(e)=>setStatusApi(e)}>Apply</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}