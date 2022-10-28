import '../../admin-panel/dashboard/dashboard.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import IMG1 from '../../../Assets/12.jpg'
import IMG2 from '../../../Assets/13.jpg'
export default (props) => {
    return (
        <>
            <div className="container-fluid main-dashboard">
            <div className="container dashboard">
                <div className="vertical-align-dashboard">
                        <div className='dashboard-box'>
                            <div className="content">
                                <h3>{props.Title}</h3>
                                <div className="employee-action mt-5">
                                    <Link to="/adminapproveleaves/"> <div className="add-emp">
                                        <div className="icon"><i class="fa fa-calendar-check-o" aria-hidden="true"></i></div>
                                        <p>Approved Leaves</p>
                                        <img className="image-dashboard"src={IMG1} alt="emp" />
                                    </div></Link>
                                    <Link to="/adminrejectedleaves"><div className="emp-list">
                                        <div className="icon"><i class="fa fa-calendar" aria-hidden="true"></i></div>
                                        <p>Rejected Leaves</p>
                                        <img className="image-dashboard"src={IMG1} alt="emp" />
                                    </div>
                                    </Link>
                                </div>

                            </div>
                        </div>
                </div>
                </div>
            </div>
        </>
    )
}