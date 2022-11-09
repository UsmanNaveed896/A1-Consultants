import {useState } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import axios from 'axios';
import IMG1 from '../../../Assets/16.jpg'
import '../multipleusers/multipleuser.scss'
export default () => {
    const Navigate = useNavigate();
    const params=useParams();
    const [status, setStatus] = useState({
        wstatus: "",
        leavestatus:"",     
    })
const approveStatus="approved";
const rejectStatus="rejected";
 
const setStatusApi = (e) => {
        e.preventDefault(e)
        let token =  Cookie.load('token');
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        axios.patch(`https://crm-09.herokuapp.com/attendance/leavenworkstatus/${params.id}`, status, headers).then((response) => {
            console.log(response,"status")
                alert("Succesfully Send Response")
                Navigate(`/leavestatus/${params.id}`)
        })
    }
    return (
        <>
            <div className="container-fluid main-list">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">  
                           <div className='leave-img'> <img className='leave-image' src={IMG1} alt="leave" />   </div>          
                                <form>
                                    <div className="attendance-radio"> 
                                        <div className="form-radio mt-4">
                                            <div class="form-check">
                                                <input className="form-check-input" type="radio" name="st" id="flexRadioDefault1"  value={"leave"} onChange={(e)=>{setStatus({wstatus:e.target.value,leavestatus:approveStatus})}} />
                                                <label className="form-check-label" for="flexRadioDefault1">
                                                    Approve
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="st" id="flexRadioDefault2" value={"absent"} onChange={(e)=>{setStatus({wstatus:e.target.value,leavestatus:rejectStatus})}} />
                                                <label className="form-check-label" for="flexRadioDefault2">
                                                    Reject
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="atndnce-btn">
                                        <button type="submit" className="btn btn-danger" onClick={(e)=>setStatusApi(e)}>Send Response</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}