import '../../admin-panel/dashboard/dashboard.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookie from 'react-cookies'
import { useNavigate } from 'react-router-dom';
export default (props) => {
    const Navigate=useNavigate();
    const [userType, setUserType] = useState('')
    useEffect(() => {
        const token = Cookie.load('user_Type')    //load is used to get cookie
        console.log("olo", token !== undefined)
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
                                {userType === 'admin' &&   <Link to="/admin/assigntask">  <div className="add-emp">
                                        <div className="icon"><i class="fa fa-calendar-check-o" aria-hidden="true"></i></div>
                                        <p>Assign Task</p>
                                    </div></Link> }
                                   <Link to="/admin/pendingtasks">  <div className="emp-list">
                                        <div className="icon"><i class="fa fa-hourglass-half" aria-hidden="true"></i></div>
                                        <p>Pending Task</p>
                                    </div></Link> 
                                </div>
                                <div className="employee-action mt-5">
                                <Link to="/admin/acceptedtasks">         <div className="add-emp">
                                        <div className="icon"><i class="fa fa-check-square-o" aria-hidden="true"></i></div>
                                        <p>Accepted Task</p>
                                    </div></Link> 
                                    <Link to="/admin/rejectedtasks">        <div className="emp-list">
                                        <div className="icon"><i class="fa fa-check-circle-o" aria-hidden="true"></i></div>
                                        <p>Rejected Task</p>
                                    </div></Link> 
                                </div>
                                <div className="employee-action mt-5">
                                <Link to="/admin/completedtasks"> <div className="add-emp">
                                        <div className="icon"><i class="fa fa-hourglass" aria-hidden="true"></i></div>
                                        <p>Completed Task</p>
                                    </div></Link> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}