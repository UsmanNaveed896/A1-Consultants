import '../../admin-panel/dashboard/dashboard.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookie from 'react-cookies'
export default (props) => {
    const [userType, setUserType] = useState('')

    return (
        <>
            <div className="container-fluid main">
                <div className="vertical-align-wrap ">
                    <div className="  vertical-align-middle">
                        <div className='auth-box  '>
                            <div className="content">
                                <h3>{props.Title}</h3>
                                <div className="employee-action mt-5">
                                    <Link to="/adminapproveleaves/"> <div className="add-emp">
                                        <div className="icon"><i class="fa fa-calendar-check-o" aria-hidden="true"></i></div>
                                        <p>Approved Leaves</p>
                                    </div></Link>
                                    <Link to="/adminrejectedleaves"><div className="emp-list">
                                        <div className="icon"><i class="fa fa-calendar" aria-hidden="true"></i></div>
                                        <p>Rejected Leaves</p>
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