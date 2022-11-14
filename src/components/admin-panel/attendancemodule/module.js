import './module.scss'
import '../multipleusers/multipleuser.scss'
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import axios from 'axios';
export default () => {
    const [activeButton, setActiveButton] = useState(true)
    const [enabled, setEnabled] = useState(false)
    const Navigate = useNavigate();
    const [time, setTime] = useState({
        time: '',
        date: '',
        day: ''
    });
    const checkoutHandle = () => {
        let date = new Date()
        let hour = (date.getHours() < 12) ? date.getHours() : date.getHours() - 12;
        Navigate(`/checkout/`)
        if (hour >= 8 && hour <= 12) {
            alert("You Can Not CheckOut Before 12 AM")
        } else {
            Navigate(`/checkout/`)
        }
    }
    
    useEffect(() => {
        setInterval(() => {
            setTime(st => ({
                ...st, time: moment().format("  h:mm:ss A "),
                day: moment().format("dddd"),
                date: moment().format(" MMMM Do, YYYY ")
            }))
        }, 1000);

    }, [])
    const postdate = moment().format("YYYY-MM-DD");
    const month = moment().format("M");
    const year = moment().format("YYYY");
    const postTime = moment().format("h:mm A");
    const [status, setStatus] = useState({
        wstatus: "",
        startTime: postTime,
        employeeId: "",
        _id: "",
        startdate: postdate,
        month: month,
        year: year,
    })
    const setStatusApi = (e) => {
        e.preventDefault(e)
        let token = Cookie.load('token');
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        axios.post(`https://crm-09.herokuapp.com/attendance/add`, status, headers).then((response) => {
            alert("Attendance Succesfully Marked")
            Navigate('/')
            setActiveButton(true)
            setEnabled(true)
           
        })
    }
    return (
        <>
            <div className="container-fluid main-list">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <div className='leave-drop'>
                                    <div className="dropdown">
                                        <button className="dropbtn">Leave Status</button>
                                        <div className="dropdown-content">
                                            <a onClick={() => Navigate('/viewpendingleave/')}>Pending</a>
                                            <a onClick={() => Navigate('/viewapprovedleave/')}>Approved</a>
                                            <a onClick={() => Navigate('/viewrejectedleave/')}>Rejected</a>
                                        </div>
                                    </div>
                                    <div className="daily-attendance">
                                        <button className="attendance-btn mt-1" onClick={()=>{Navigate('/dailyattendance/list')}}> Daily Attendance</button>
                                    </div>
                                </div>
                                <div className="date mt-4">
                                    <div className="heading">
                                        <h5>Today Date</h5>
                                    </div>
                                    <div className="present-date">
                                        <h5><span id="current-date">{time.date}</span></h5>
                                    </div>
                                </div>
                                <div className="date">
                                    <div className="heading">
                                        <h5>Current Time</h5>
                                    </div>
                                    <div className="present-date">
                                        <h5><span id="current-time"> {time.time}</span></h5>
                                    </div>
                                </div>
                                <div className="main-head mt-4">
                                    <h3>MARK ATTENDANCE</h3>
                                </div>
                                <form>
                                    <div className="attendance-radio">
                                        <div className="form-radio mt-4">
                                            <div class="form-check">
                                                <input className="form-check-input" type="radio" name="st" id="flexRadioDefault1" value={"Present"} onChange={(e) => {
                                                    setStatus({ wstatus: e.target.value, startdate: postdate, startTime: postTime, month, year })
                                                    setActiveButton(false)
                                                }} />
                                                <label className="form-check-label" for="flexRadioDefault1">
                                                    Present
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="st" id="flexRadioDefault2" value={"Absent"} onChange={(e) => {
                                                    setStatus({ wstatus: e.target.value, startdate: postdate, startTime: postTime, month, year })
                                                    setActiveButton(false)
                                                }} />
                                                <label className="form-check-label" for="flexRadioDefault2">
                                                    Absent
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-radio mt-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="st" id="flexRadioDefault1" onClick={() => Navigate('/applyleave/')} value={"Leave"} />
                                                <label className="form-check-label" for="flexRadioDefault1">
                                                    Leave
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="st" id="flexRadioDefault2" value={"Holiday"} onChange={(e) => {
                                                    setStatus({ wstatus: e.target.value, startdate: postdate, startTime: postTime, month, year })
                                                    setActiveButton(false)
                                                }} />
                                                <label className="form-check-label" for="flexRadioDefault2">
                                                    Holiday
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="atndnce-btn">
                                        {enabled ? <button type="submit" className="btn btn-danger" disabled={true} onClick={setStatusApi}>Mark Attendance</button> :
                                            <button type="submit" className="btn btn-danger" disabled={activeButton} onClick={setStatusApi}>Mark Attendance</button>}
                                        <button type="edit" className="btn btn-danger" disabled={activeButton} onClick={() => checkoutHandle()} >CheckOut</button>
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