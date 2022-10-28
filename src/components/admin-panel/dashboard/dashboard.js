import '../dashboard/dashboard.scss'
import './responsive.scss'
import IMG1 from '../../../Assets/1.jpg'
import IMG2 from '../../../Assets/2.jpg'
import IMG3 from '../../../Assets/6.jpg'
import IMG4 from '../../../Assets/7.jpg'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookie from 'react-cookies'
export default () => {
    const [userType, setUserType] = useState('')
    useEffect(() => {
        const token = Cookie.load('user_Type')    //load is used to get cookie
        if (token !== undefined) {
            setUserType(token)
        }
    }, [])
    return (
        <>
            <div className="container-fluid main-dashboard">
                <div className="container dashboard">
                    <div className="vertical-align-dashboard">
                        <div className='dashboard-box '>
                            <div className="content">
                                <h3>Dashboard</h3>
                                <div className="employee-action mt-5">
                                    {userType === 'admin' && <Link to="/addemployee"> <div className="add-emp">
                                        <div className="icon"><i className="fa fa-user-plus" aria-hidden="true"></i></div>
                                        <p>Add Employee</p>
                                        <img className="image-dashboard"src={IMG1} alt="emp" />                                    
                                    </div></Link>}
                                    {userType === 'admin' && <Link to="/listview" ><div className="emp-list">
                                        <div className="icon"><i className="fa fa-users" aria-hidden="true"></i></div>
                                        <p>Employee List</p>
                                        <img className="image-dashboard"src={IMG3} alt="emp" /> 
                                    </div>
                                    </Link>}
                                </div>
                                {/* Show on Employee Side */}
                                <div className="employee-action mt-5">
                                    {userType === 'employee' && <Link to="/attendance/">  <div className="add-emp">
                                        <div className="icon"><i className="fa fa-calendar-check-o" aria-hidden="true"></i></div>
                                        <p>Employee Attendance</p>
                                        <img className="image-dashboard-two"src={IMG2} alt="emp" />  
                                    </div></Link>}
                                    {/* {Show on admin side} */}
                                    {userType === 'admin' && <Link to="/markattendance/">  <div className="add-emp">
                                        <div className="icon"><i className="fa fa-calendar-check-o" aria-hidden="true"></i></div>
                                        <p>Employee Attendance</p>
                                        <img className="image-dashboard-two"src={IMG2} alt="emp" />  
                                    </div></Link>}

                                    {userType === 'employee' && <Link to="/Tasksuser/">        <div className="emp-list">
                                        <div className="icon"><i className="fa fa-tasks" aria-hidden="true"></i></div>
                                        <p>Employee Task</p>
                                        <img className="image-dashboard"src={IMG4} alt="emp" /> 
                                    </div></Link>}
                                    {userType === 'admin' && <Link to="/Tasksadmin/">        <div className="emp-list ">
                                        <div className="icon"><i className="fa fa-tasks" aria-hidden="true"></i></div>
                                        <p>Employee Task</p>
                                        <img className="image-dashboard"src={IMG4} alt="emp" /> 
                                    </div></Link>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}