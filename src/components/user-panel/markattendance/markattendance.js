import '../../admin-panel/dashboard/dashboard.scss'
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
            <div className="container-fluid main">
                <div className="vertical-align-wrap ">
                    <div className="  vertical-align-middle">
                        <div className='auth-box  '>
                            <div className="content">
                                <h3>{props.Title}</h3>
                                <div className="employee-action mt-5">
                                    {userType === 'admin' && <Link to="/adminattendancedetail/:id"> <div className="add-emp">               {/*   sHOW on Admin side */}
                                        <div className="icon"><i class="fa fa-calendar-check-o" aria-hidden="true"></i></div>
                                        <p>Employee Attendance</p>
                                    </div></Link>}
                                    {userType === 'admin' && <Link to="/attendancelistview"><div className="emp-list">                      {/*   sHOW on Admin side */}
                                        <div className="icon"><i class="fa fa-calendar" aria-hidden="true"></i></div>
                                        <p>Monthly Attendance</p>
                                    </div>
                                    </Link>}
                                </div>
                                <div className="employee-action mt-5">                                                                              {/*   sHOW on Admin side */}
                                {userType === 'admin' &&  <Link to="/leaveslistview/"> <div className="emp-list">
                                        <div className="icon"><i class="fa fa-tasks" aria-hidden="true"></i></div>
                                        <p>Leaves Requests</p></div></Link>}

                                        {userType === 'admin' &&  <Link to="/leavestatusadmin/"> <div className="emp-list">
                                        <div className="icon"><i class="fa fa-bed" aria-hidden="true"></i></div>
                                        <p>Leaves Status</p></div></Link>}

                                    {userType === 'employee' && <div className="emp-list">
                                        <div className="icon"><i class="fa fa-hourglass-half" aria-hidden="true"></i></div>
                                        <p>Pending Task</p>
                                    </div>}
                                </div>
                                <div className="employee-action mt-5">
                                    {userType === 'employee' && <div className="add-emp">
                                        <div className="icon"><i class="fa fa-check-square-o" aria-hidden="true"></i></div>
                                        <p>Accepted Task</p>
                                    </div>}
                                    {userType === 'employee' && <div className="emp-list">
                                        <div className="icon"><i class="fa fa-check-circle-o" aria-hidden="true"></i></div>
                                        <p>Rejected Task</p>
                                    </div>}
                                </div>
                                <div className="employee-action mt-5">
                                    {userType === 'employee' && <div className="add-emp">
                                        <div className="icon"><i class="fa fa-hourglass" aria-hidden="true"></i></div>
                                        <p>Completed Task</p>
                                    </div>}
                                    {/* Show on Employee Side */}
                                    {userType === 'employee' && <div className="emp-list">
                                        <div className="icon"><i class="fa fa-tasks" aria-hidden="true"></i></div>
                                        <p>Tasks</p>
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