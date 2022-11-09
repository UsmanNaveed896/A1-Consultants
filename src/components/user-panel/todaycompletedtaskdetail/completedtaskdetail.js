import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import moment from 'moment';
import '../../admin-panel/multipleusers/multipleuser.scss'
export default () => {
    const [users, setUsers] = useState([]);
    const Navigate = useNavigate();
    const date = moment().format("YYYY-MM-DD");

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
        const result = await axios.get(`https://crm-09.herokuapp.com/task/taskcomp?date=${date}`, headers);
        setUsers(result.data)
    }

    return (
        <>
            <div className="container-fluid main-list">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <div className="yesterday-task">
                                    <div><h4>Today Completed Task Detail</h4></div>
                                     <div className="action-btn">
                                    <button type="submit" className="btn btn-danger" onClick={()=>Navigate('/completed/yesterday')}>Yesterday Completed Task</button>
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
                                                <label className="labels">Task Start Time : {user.taskStartTime}</label>

                                            </div>
                                            <div className="form-group mt-4">
                                                <label className="labels">Status : <span className='inprogress'>{user.taskStatus}</span> </label>
                                            </div>
                                            <div className="form-group mt-4">
                                                <label className="labels">Task Assign Date : {user.addedDate}</label>
                                            </div>
                                            <div className="form-group mt-4">
                                                <label className="labels">Task Accepted Date : {user.taskStartdate}</label>
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