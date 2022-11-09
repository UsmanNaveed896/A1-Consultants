import './acceptedtask.scss'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Cookie from 'react-cookies'
import moment from 'moment';
import '../../admin-panel/multipleusers/multipleuser.scss'
export default () => {
    const params=useParams()
    const [users, setUsers] = useState([]);
    const taskStartTime = moment().format("h:mm A");
    const date = moment().format("YYYY-MM-DD");
    const taskAuth="accepted"
    const[status,setStatus]=useState({
        taskAuth: taskAuth,
        taskStartTime:taskStartTime,
        taskStartdate:date,
        taskReject:"",
    })
    const Navigate = useNavigate();
    

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        let token = Cookie.load('token');
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        const result = await axios.get(`https://crm-09.herokuapp.com/task/tasksta?date=${date}&st=pending`, headers);
        setUsers(result.data)
    }
    const setStatusApi = (e) => {
        e.preventDefault(e)
        let token = Cookie.load('token');
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        axios.patch(`https://crm-09.herokuapp.com/task/edit/${params.id}`, status, headers).then((response) => {         
        alert("You Have Succesfully Accepted Task")
            Navigate('/')
           
        })
    }
    return (
        <>
            <div className="container-fluid main-list">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <div className="yesterday-task">
                                    <div><h4>Today Pending Task Detail</h4></div>
                                     <div className="action-btn">
                                    <button type="submit" className="btn btn-danger" onClick={()=>Navigate('/yesterdaytasks/')}>Yesterday Pending Task</button>
                                    </div>
                                </div>

                                {
                                    users.map((user) => (
                                        <form>
                                            <div className="form-group mt-5">
                                                <label className="labels">Employee Name : {user.employeeName}</label>

                                            </div>
                                            <div className="form-group mt-4">
                                                <label className="labels">Employee Email : {user.employeeEmail}</label>

                                            </div>
                                            <div className="form-group mt-4">
                                                <label className="labels">Task : {user.task}</label>

                                            </div>
                                            <div className="form-group mt-4">
                                                <label className="labels">Priority : <span className='high'>{user.priority}</span></label>

                                            </div>
                                            <div className="form-group mt-4">
                                                <label className="labels">Confirmation : <span className='accepted'>{user.taskAuth}</span></label>

                                            </div>
                                            <div className="form-group mt-4">
                                                <label className="labels">Task Assign Time : {user.taskAssignTime}</label>

                                            </div>
                                            <div className="form-group mt-4">
                                                <label className="labels">Status : <span className='inprogress'>{user.taskStatus}</span><i className="fa fa-pencil-square-o" aria-hidden="true" 
                                                onClick={()=>Navigate(`/taskstatus/${user._id}`)}></i></label>
                                            </div>
                                            <div className="form-group mt-4">
                                                <label className="labels">Task Assign Date : {user.addedDate}</label>
                                            </div>
                                            <div className="form-group mt-4">
                                                <div className="tasks">
                                                    <button className='accept-task' onClick={(e)=>{setStatus({taskAuth:taskAuth});setStatusApi(e)}}> Accept</button>
                                                    <button className='reject-task' onClick={() => Navigate(`/reasonreject/${params.id}`)} > Reject</button>
                                                </div>
                                            </div>
                                        </form>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}