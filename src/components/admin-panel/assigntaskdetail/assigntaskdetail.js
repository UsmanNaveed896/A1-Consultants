import axios from 'axios'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import moment from 'moment';
import '../../admin-panel/employeedetail/employeedetail.scss'
export default () => {
    const Navigate = useNavigate()
    const [users, setUsers] = useState({})
    const params = useParams();
    const taskAuth = "pending";
    const addedDate = moment().format("YYYY-MM-DD");
    const addedMonth = moment().format("MM");
    const addedYear = moment().format("YYYY");
    const taskAssignTime = moment().format("h:mm A");
    const [priority, setPriority] = useState({
        priority: "",
        applyDisable: true,
        disable:true,
    })
    const [status, setStatus] = useState({
        task: "",
        taskAssignTime: taskAssignTime,
        taskAuth: taskAuth,
        addedDate: addedDate,
        addedMonth: addedMonth,
        addedYear: addedYear,
    })
    const oninputChange = (e) => {
        setStatus({ ...status, [e.target.value]: e.target.value })
    }
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
        const result = await axios.get(`https://crm-09.herokuapp.com/employee/${params.id}`, headers);
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
        let payLoad = {
            employeeId: users?._id,
            employeeName: users?.name,
            employeeEmail: users?.email,
            task: status.task,
            taskAssignTime: status.taskAssignTime,
            priority: priority.priority,
            taskAuth: status.taskAuth,
            addedDate: status.addedDate,
            addedMonth: status.addedMonth,
            addedYear: status.addedYear,
        }
        axios.post(`https://crm-09.herokuapp.com/task/add`, payLoad, headers).then((response) => {
            alert("You Have Succesfully Assigned Task")
            Navigate('/')
        })
    }
    return (
        <>
            <div className="container-fluid main">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <h3>Assign Task</h3>
                                <form>
                                    <div>
                                        <div className="form-group mt-5">
                                            <form >
                                                <p><label for="w3review">Assign Task to {users.name} </label></p>
                                                <textarea id="w3review" name="leavereason" rows="4" cols="50" placeholder='Please Enter Reason For Leave' onChange={(e) => {
                                                    setStatus({ task: e.target.value, taskAuth: taskAuth, taskAssignTime: taskAssignTime, addedDate: addedDate, addedMonth: addedMonth, addedYear: addedYear });
                                                    setPriority(st=>({
                                                        ...st,
                                                        disable:false
                                                    }))
                                                }}></textarea>
                                            </form>
                                        </div>
                                    </div>
                                </form>
                                <div className="assign-task mt-5">
                                    <div className="priorty-btn">
                                        <div className="High"><button className=" btn btn-danger High-btn" value={"high"} disabled={priority.disable || status.task ===""} onClick={(e) => { setPriority( st=>({
                                            ...st,priority:e.target.value,
                                            disable:true,
                                            applyDisable:false
                                        }) ) }}>High</button></div>
                                        <div className="low mt-5"><button className=" btn btn-danger low-btn" value={"low"} disabled={priority.disable || status.task ===""} onClick={(e) => { setPriority( st=>({
                                            ...st,priority:e.target.value,
                                            disable:true,
                                            applyDisable:false
                                        }) ) }}>Low</button></div>
                                        <div className="medium"><button className=" btn btn-danger medium-btn" value={"medium"} disabled={priority.disable || status.task ===""} onClick={(e) => { setPriority( st=>({
                                            ...st,priority:e.target.value,
                                            disable:true,
                                            applyDisable:false
                                        }) ) }}>Medium</button></div>
                                    </div>
                                </div>
                                <div className="action-btn">
                                    <div><button type="submit" className="btn btn-danger" disabled={priority.applyDisable || status.task ===""} onClick={(e) => setStatusApi(e)}>Apply</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}