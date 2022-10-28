import '../../admin-panel/dashboard/dashboard.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookie from 'react-cookies'
import IMG1 from '../../../Assets/17.jpg'
import IMG2 from '../../../Assets/11.jpg'
import IMG3 from '../../../Assets/18.jpg'
import IMG4 from '../../../Assets/19.jpg'
import IMG5 from '../../../Assets/15.jpg'
export default (props) => {
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
            <div className="container-fluid main-dashboard">
                <div className="container dashboard">
                    <div className=" vertical-align-dashboard">
                        <div className='dashboard-box  '>
                            <div className="content">
                                <h3>{props.Title}</h3>
                                <div className="employee-action mt-5">
                                {userType === 'admin' &&   <Link to="/admin/assigntask">  <div className="add-emp">
                                        <div className="icon"><i class="fa fa-calendar-check-o" aria-hidden="true"></i></div>
                                        <p>Assign Task</p>
                                        <img className="image-dashboard"src={IMG1} alt="emp" /> 
                                    </div></Link> }
                                   <Link to="/admin/pendingtasks">  <div className="emp-list">
                                        <div className="icon"><i class="fa fa-hourglass-half" aria-hidden="true"></i></div>
                                        <p>Pending Task</p>
                                        <img className="image-dashboard"src={IMG2} alt="emp" /> 
                                    </div></Link> 
                                </div>
                                <div className="employee-action mt-5">
                                <Link to="/admin/acceptedtasks">         <div className="add-emp">
                                        <div className="icon"><i class="fa fa-check-square-o" aria-hidden="true"></i></div>
                                        <p>Accepted Task</p>
                                        <img className="image-dashboard"src={IMG3} alt="emp" /> 
                                    </div></Link> 
                                    <Link to="/admin/rejectedtasks">        <div className="emp-list">
                                        <div className="icon"><i class="fa fa-check-circle-o" aria-hidden="true"></i></div>
                                        <p>Rejected Task</p>
                                        <img className="image-dashboard"src={IMG4} alt="emp" /> 
                                    </div></Link> 
                                </div>
                                <div className="employee-action mt-5">
                                <Link to="/admin/completedtasks"> <div className="add-emp">
                                        <div className="icon"><i class="fa fa-hourglass" aria-hidden="true"></i></div>
                                        <p>Completed Task</p>
                                        <img className="image-dashboard"src={IMG5} alt="emp" /> 
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