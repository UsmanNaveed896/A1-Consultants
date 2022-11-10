import { useState, useEffect } from 'react'
import moment from 'moment';
import Cookie from 'react-cookies'
import axios from 'axios';
export default () => {
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
        axios.get(`https://crm-09.herokuapp.com/attendance/empdaily/${userId}/${yesterdaydate}`, headers).then((res) => {
            setUsers(res.data)
        });
    }, [])

    return (
        <>
            <div className="container-fluid main-list">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">

                        <div className="today-head" style={{'textAlign':'center'}}> <h3>{users.employeeName} Attendance Detail</h3></div>
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                        <div className="table-contents table-responsive mt-5">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Sart Date</th>
                                                        <th scope="col">Start Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                        <tr>
                                                        <td>{users.employeeName}</td>
                                                        <td>{users.wstatus}</td>
                                                        <td>{users.startdate}</td>
                                                        <td>{users.startTime}</td>   
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}