import '../../admin-panel/dashboard/dashboard.scss'
import { Link } from 'react-router-dom'
import IMG2 from '../../../Assets/11.jpg'
import IMG3 from '../../../Assets/18.jpg'
import IMG4 from '../../../Assets/19.jpg'
import IMG5 from '../../../Assets/15.jpg'
export default (props) => {
    return (
        <>
            <div className="container-fluid main-dashboard">
                <div className="container dashboard ">
                    <div className="vertical-align-dashboard">
                        <div className='dashboard-box'>
                            <div className="content">
                                <h3>{props.Title}</h3>
                                <div className="employee-action mt-5">
                                <Link to="/pendinglist/">  <div className="emp-list">
                                     <div className="icon"><i class="fa fa-hourglass-half" aria-hidden="true"></i></div>
                                        <p>Pending Task</p>
                                        <img className="image-dashboard"src={IMG2} alt="emp" />
                                    </div></Link> 
                                    <Link to="/completed/today">     <div className="add-emp ">
                                        <div className="icon"><i class="fa fa-hourglass" aria-hidden="true"></i></div>
                                        <p>Completed Task</p>
                                        <img className="image-dashboard"src={IMG5} alt="emp" />
                                    </div></Link> 
                                </div>
                                <div className="employee-action mt-5">
                                <Link to="/accepted/list/">      <div className="add-emp ">
                                        <div className="icon"><i class="fa fa-check-square-o" aria-hidden="true"></i></div>
                                        <p>Accepted Task</p>
                                        <img className="image-dashboard"src={IMG3} alt="emp" />
                                    </div></Link> 
                                    <Link to="/rejected/today">  <div className="emp-list">
                                        <div className="icon"><i class="fa fa-check-circle-o" aria-hidden="true"></i></div>
                                        <p>Rejected Task</p>
                                        <img className="image-dashboard"src={IMG4} alt="emp" />
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