import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        const result = await axios.get(`https://crm-09.herokuapp.com/task/taskcomp?date=${date}`, headers);
        setUsers(result.data)
        setLoader(true)
    }
    return (
        <>
            <div className="container-fluid main">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <h3>Today Completed Task List</h3>
                                {loader ?  <div>   
                                {
                                    users.length===0 ? <div className="alert-msg mt-4"><h5>No Records Today</h5><i class="fa fa-times" aria-hidden="true"></i></div> :
                                    users.map((user) => (
                                        <div className="employee-data" onClick={() => (Navigate(`/completed/detail/${user._id}`))}>
                                            <div className="user-data mt-5">
                                                <div className="user-icon ">
                                                    <i className="fa fa-user" aria-hidden="true"></i>
                                                </div>
                                                <div className="user-details">
                                                    <h4>{user.employeeName}</h4>
                                                    <h5>{user.addedDate}</h5>
                                                </div>
                                            </div>
                                            <div className="left-arrow">
                                                <div className="fixed"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>
                                            </div>
                                        </div>
                                    ))
                                }</div> : <div className='spin' style={{textAlign : "center"}}><Spinner animation="border" /></div>  } 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}