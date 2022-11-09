import './attendancedetail.scss'
import '../employeedetail/employeedetail.scss'
import { useState, useEffect } from 'react'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
export default () => {
    const Navigate = useNavigate();
    const [userId, setUserId] = useState();
    const [employee, setEmployee] = useState([])
    const [loader, setLoader] = useState(false)
    const [status, setStatus] = useState({
        wstatus: "",
    })
    const [time, setTime] = useState({
        date: '',
    });
    useEffect(() => {
        setInterval(() => {
            setTime(st => ({
                ...st, date: moment().format(" MMMM Do, YYYY ")
            }))
        }, 1000);
    }, []);
    const postDate = moment().format("YYYY-MM-DD");
    useEffect(() => {
        let token = Cookie.load('token');
        let headers = {
            headers: {
                Authorization: 'Bearer' + token
            }
        }
        axios.get(`https://crm-09.herokuapp.com/attendance/dailyatt/?date=${postDate}`, employee, headers).then((res) => {
            setEmployee(res.data)
            setLoader(true)
        })
    }, []);

    const editAttendance = () => {
        let token = Cookie.load('token');
        let headers = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        let payLoad = {
            wstatus: status.wstatus,
        }
        axios.patch(`https://crm-09.herokuapp.com/attendance/leavestatus/${userId}`, payLoad, headers).then((response) => {
            setEmployee(response)
            alert(" Succesfully Updated")
            Navigate('/markattendance/')
        })
    }

    const deleteUser = () => {
        let token = Cookie.load('token');
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        axios.delete(`https://crm-09.herokuapp.com/attendance/delete/${userId}`, headers).then((res) => {
            let data = employee.filter(item => item._id !== userId)
            setEmployee(data);
        })
    }
    return (
        <>
            <div className="container-fluid main-attendance">
                <div className='vertical-align-wrap '>
                    <div className="container attendance-wrap">
                        <div className="today-head"> <h3>Today Attendance</h3></div>
                        <div className='auth-box '>
                            <div className="content">
                                <h3 >{time.date}</h3>
                                <div className="table-contents table-responsive mt-5">
                                    {loader ? <div>
                                        {employee.length === 0 ? <div className="alert-msg mt-4"><h5>No Records Today</h5><i class="fa fa-times" aria-hidden="true"></i></div> :
                                            employee.map((index) => (
                                                
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Employee</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Time</th>
                                                            <th scope="col">Edit</th>
                                                            <th scope="col">Delete</th>

                                                        </tr>
                                                    </thead>

                                                    <tbody>

                                                        <tr>
                                                            <td>{index.employeeId}</td>
                                                            <td>{index.employeeName}</td>
                                                            <td>{index.startdate}</td>
                                                            <td>{index.startTime}</td>
                                                            <td className=" return-add" data-toggle="modal" data-target="#myModal" onClick={() => setUserId(index._id)}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> </td>
                                                            <td className=" return-add" data-toggle="modal" data-target="#myModal1" onClick={() => setUserId(index._id)}> <i className="fa fa-trash" aria-hidden="true"></i></td>
                                                        </tr>


                                                    </tbody>

                                                </table>
                                            ))}</div> : <div className='spin' style={{ textAlign: "center", color: "white" }}><Spinner animation="border" /></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal */}

                <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="myModalLabel">Edit Attendance</h5>
                            </div>
                            <div className="modal-body ">
                                <form>
                                    <div className="form-group">
                                        <label for="exampleFormControlTextarea11">Status</label>
                                        <input type="text" className="form-control mt-2" id="exampleFormControlTextarea1" aria-describedby="emailHelp" placeholder="Enter Employee"
                                            onChange={(e) => { setStatus({ wstatus: e.target.value }) }} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="close-button"  style={{"color":"white"}} onClick={() => editAttendance()} >Edit</button>
                                <button type="button" className="close-button" style={{"color":"white"}} data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* MODAL ENDS */}
                {/* Modal */}

                <div className="modal fade" id="myModal1" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="myModalLabel">Delete Attendance</h5>
                            </div>
                            <div className="modal-body ">

                                <div className="form-group">
                                    <label for="exampleFormControlTextarea11">Are you sure You want to delete this Attendance?</label>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="close-button"  style={{"color":"white"}} data-dismiss="modal" onClick={() => { deleteUser() }}>Delete</button>
                                <button type="button" className="close-button"   style={{"color":"white"}}data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* MODAL ENDS */}
            </div>
        </>
    )
}