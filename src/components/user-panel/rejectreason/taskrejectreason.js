import axios from 'axios'
import { useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import moment from 'moment';
import '../../admin-panel/multipleusers/multipleuser.scss'
export default () => {
    const Navigate = useNavigate()
    const params=useParams();
    const [activeButton, setActiveButton] = useState(true)
    const taskAuth = "rejected"
    const taskStartdate = moment().format("YYYY-MM-DD");
    const taskStartTime = moment().format("h:mm A");
    
    const [status, setStatus] = useState({
        taskAuth:taskAuth,
        taskStartTime:taskStartTime,
        taskStartdate:taskStartdate,
        taskReject:"",
    })
    const setStatusApi = (e) => {
        e.preventDefault(e)
        let token = Cookie.load('token');
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        axios.patch(`https://crm-09.herokuapp.com/task/edit/${params.id}`, status, headers).then((response) => {
            alert("You Have Succesfully Send Reason")
            Navigate('/')
            setActiveButton(false)
        })
    }
    return (
        <>
            <div className="container-fluid main-list">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <h3>Reason</h3>
                                <form>
                                    <div>
                                        <div className="form-group mt-5">
                                            <form >
                                                <p><label>Please Write Reason For Rejecting Task</label></p>
                                                <textarea name="leavereason" rows="4" cols="50" placeholder='Please Enter Reason For Leave' onChange={(e) => {
                                                    setStatus({ taskAuth:taskAuth,taskStartTime:taskStartTime,taskStartdate:taskStartdate,taskReject: e.target.value,    })
                                                    setActiveButton(false)
                                                }}></textarea>
                                            </form>
                                        </div>
                                    </div>
                                </form>
                                <div className="action-btn">
                                    <div><button type="submit" className="btn btn-danger" disabled={activeButton} onClick={(e) => setStatusApi(e)}>Submit</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}