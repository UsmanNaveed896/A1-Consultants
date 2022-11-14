import '../../admin-panel/dashboard/dashboard.scss'
import IMG1 from '../../../Assets/2.jpg'
import IMG2 from '../../../Assets/8.jpg'
import IMG3 from '../../../Assets/9.jpg'
import IMG4 from '../../../Assets/10.jpg'
import IMG5 from '../../../Assets/11.jpg'
import IMG6 from '../../../Assets/12.jpg'
import IMG7 from '../../../Assets/13.jpg'
import IMG8 from '../../../Assets/14.jpg'
import IMG9 from '../../../Assets/15.jpg'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookie from 'react-cookies'
export default (props) => {
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
                <div className=" vertical-align-dashboard ">
                        <div className='dashboard-box  '>
                            <div className="content">
                                <h3>{props.Title}</h3>
                                <div className="employee-action mt-5">
                                    {userType === 'admin' && <Link to="/adminattendancedetail/"> <div className="add-emp">               {/*   sHOW on Admin side */}
                                        <div className="icon"><i class="fa fa-calendar-check-o" aria-hidden="true"></i></div>
                                        <p>Employee Attendance</p>
                                        <img className="image-dashboard-two"src={IMG1} alt="emp" /> 
                                    </div></Link>}
                                    {userType === 'admin' && <Link to="/attendancelistview"><div className="emp-list">                      {/*   sHOW on Admin side */}
                                        <div className="icon"><i class="fa fa-calendar" aria-hidden="true"></i></div>
                                        <p>Monthly Attendance</p>
                                        <img className="image-dashboard"src={IMG2} alt="emp" /> 
                                    </div>
                                    </Link>}
                                </div>
                                <div className="employee-action mt-5">                                                                              {/*   sHOW on Admin side */}
                                {userType === 'admin' &&  <Link to="/leaveslistview/"> <div className="emp-list">
                                        <div className="icon"><i class="fa fa-tasks" aria-hidden="true"></i></div>
                                        <p>Leaves Requests</p>
                                        <img className="image-dashboard"src={IMG4} alt="emp" />
                                        </div></Link>}

                                        {userType === 'admin' &&  <Link to="/leavestatusadmin/"> <div className="emp-list">
                                        <div className="icon"><i class="fa fa-bed" aria-hidden="true"></i></div>
                                        <p>Leaves Status</p>
                                        <img className="image-dashboard"src={IMG3} alt="emp" /> 
                                        </div></Link>}

                                    {userType === 'employee' && <div className="emp-list">
                                        <div className="icon"><i class="fa fa-hourglass-half" aria-hidden="true"></i></div>
                                        <p>Pending Task</p>
                                        <img className="image-dashboard"src={IMG5} alt="emp" /> 
                                    </div>}
                                </div>
                                <div className="employee-action mt-5">
                                    {userType === 'employee' && <div className="add-emp">
                                        <div className="icon"><i class="fa fa-check-square-o" aria-hidden="true"></i></div>
                                        <p>Accepted Task</p>
                                        <img className="image-dashboard"src={IMG6} alt="emp" /> 
                                    </div>}
                                    {userType === 'employee' && <div className="emp-list">
                                        <div className="icon"><i class="fa fa-check-circle-o" aria-hidden="true"></i></div>
                                        <p>Rejected Task</p>
                                        <img className="image-dashboard"src={IMG7} alt="emp" />
                                    </div>}
                                </div>
                                <div className="employee-action mt-5">
                                    {userType === 'employee' && <div className="add-emp">
                                        <div className="icon"><i class="fa fa-hourglass" aria-hidden="true"></i></div>
                                        <p>Completed Task</p>
                                        <img className="image-dashboard"src={IMG8} alt="emp" />
                                    </div>}
                                    {/* Show on Employee Side */}
                                    {userType === 'employee' && <div className="emp-list">
                                        <div className="icon"><i class="fa fa-tasks" aria-hidden="true"></i></div>
                                        <p>Tasks</p>
                                        <img className="image-dashboard"src={IMG9} alt="emp" />
                                    </div>}
                                </div>
                            </div>
                        </div>
                </div>
                </div>
            </div>
        </>
    )
}