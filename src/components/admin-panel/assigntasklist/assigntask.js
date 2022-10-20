import axios from 'axios';
import { useState, useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
export default () => {
    const [users, setUsers] = useState([]);
    const[loader,setLoader]=useState(false)
    const Navigate = useNavigate();
    useEffect(() => {
        loadUsers();
    }, []);
    const date = moment().format("YYYY-MM-DD");
    const loadUsers = async () => {
        let token = Cookie.load('token');
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        const result = await axios.get(`https://crm-09.herokuapp.com/employee/`, headers);
        setUsers(result.data.reverse())
        setLoader(true)
    }
    return (
        <>
            <div className="container-fluid main">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <h3>Assign Task</h3>
                                {loader ?  <div>
                                {
                                    users.map((user) => (
                                        <div className="employee-data" onClick={() => (Navigate(`/admin/assigntask/detail/${user._id}`))}>
                                            <div className="user-data mt-5">
                                                <div className="user-icon ">
                                                    <i className="fa fa-user" aria-hidden="true"></i>
                                                </div>
                                                <div className="user-details">
                                                    <h4>{user.name}</h4>
                                                    <h5>{user.email}</h5>
                                                </div>
                                            </div>
                                            <div className="left-arrow">
                                                <div className="fixed"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>
                                            </div>
                                        </div>
                                    ))}
                                    </div> :<div className='spin' style={{textAlign : "center"}}><Spinner animation="border" /></div>  }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}