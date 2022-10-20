import '../employeedetail/employeedetail.scss'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Cookie from 'react-cookies'
import axios from 'axios';
export default () => {
const Navigate = useNavigate()  
 const params = useParams();
 const [users, setUsers] = useState([])
    useEffect(() => {
        let token = Cookie.load('token')
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        axios.get(`https://crm-09.herokuapp.com/attendance/${params.id}`, headers).then((res) => {
            setUsers(res.data)
        });
    }, [])

    return (
        <>
            <div className="container-fluid main">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">

                        <div className="today-head"> <h3>{users.employeeName} Attendance Detail</h3></div>
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                        <div className="table-contents table-responsive mt-5">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Time</th>
                                                        <th scope="col">Checkout Date</th>
                                                        <th scope="col">Checkout Time</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    Object.keys(users).map((index)=>(
                                                        <tr>
                                                        <td>{users.employeeName}</td>
                                                        <td>{users.wstatus}</td>
                                                        <td>{users.startdate}</td>
                                                        <td>{users.startTime}</td>
                                                        <td>{users.checkoutDate}</td>
                                                        <td> {users.checkoutTime}</td>
                                                    </tr>
                                                    ))
                                                }
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