import '../../admin-panel/dashboard/dashboard.scss'
import { Link } from 'react-router-dom'

export default (props) => {
    return (
        <>
            <div className="container-fluid main">
                <div className="vertical-align-wrap ">
                    <div className="  vertical-align-middle">
                        <div className='auth-box  '>
                            <div className="content">
                                <h3>{props.Title}</h3>
                                <div className="employee-action mt-5">
                                <Link to="/pendinglist/">  <div className="emp-list">
                                     <div className="icon"><i class="fa fa-hourglass-half" aria-hidden="true"></i></div>
                                        <p>Pending Task</p>
                                    </div></Link> 
                                    <Link to="/completed/today">     <div className="add-emp">
                                        <div className="icon"><i class="fa fa-hourglass" aria-hidden="true"></i></div>
                                        <p>Completed Task</p>
                                    </div></Link> 
                                </div>
                                <div className="employee-action mt-5">
                                <Link to="/accepted/list/">      <div className="add-emp">
                                        <div className="icon"><i class="fa fa-check-square-o" aria-hidden="true"></i></div>
                                        <p>Accepted Task</p>
                                    </div></Link> 
                                    <Link to="/rejected/today">  <div className="emp-list">
                                        <div className="icon"><i class="fa fa-check-circle-o" aria-hidden="true"></i></div>
                                        <p>Rejected Task</p>
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