import { useState, useEffect } from 'react'
import moment from 'moment';
import Cookie from 'react-cookies'
import axios from 'axios';
import {useParams} from 'react-router-dom'; 
export default () => {
    const params=useParams();
 const [users, setUsers] = useState([])
 let yesterdaydate = moment().subtract(1, 'day').format("YYYY-MM-DD")
    useEffect(() => {
        let token = Cookie.load('token')
        let userId=Cookie.load('userid')
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        axios.get(`https://crm-09.herokuapp.com/attendance/dailyatt?date=${yesterdaydate}`, headers).then((res) => {
            setUsers(res.data)
        });
    }, [])

    return (
        <>
            <div className="container-fluid main-list">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle"> 
                        <div className='auth-box mt-5 '>
                            <div className="content">
                            {users.length === 0 ? <div className="alert-msg mt-4"><h5>No Records Today</h5><i class="fa fa-times" aria-hidden="true"></i></div> : 
                                 users.map((user)=> (
                            <div><div className="today-head" style={{'textAlign':'center'}}> <h3>Yesterday Attendance Detail</h3></div>
                                        <div className="table-contents table-responsive mt-5">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Sart Date</th>
                                                        <th scope="col">Start Time</th>
                                                        <th scope="col">CheckOut Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                        <tr>
                                                        <td>{user.employeeName}</td>
                                                        <td>{user.wstatus}</td>
                                                        <td>{user.startdate}</td>
                                                        <td>{user.startTime}</td>  
                                                        <td>{user.checkoutTime}</td>  
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div> 
                                        </div> ))}                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}