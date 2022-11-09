import '../multipleusers/multipleuser.scss'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
export default () => {
    const [users, setUsers] = useState([]);
    const Navigate = useNavigate();
    const [loader,setLoader]=useState(false)
    let newUsers = users.filter(function(elem, pos) {
        return users.indexOf(elem) == pos;
});
    useEffect(() => {
        loadUsers();
    }, []);
    const postMonth=moment().format("MM");
    const postYear=moment().format("YYYY");
    const loadUsers = async () => {
        let token = Cookie.load('token')
        console.log(token, "nn")
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        axios.get(`https://crm-09.herokuapp.com/attendance/empstatus?mnth=${postMonth}&yr=${postYear}`, headers).then((res)=>{
            const uniqueItems = [...new Map(res.data.map((item) => [ item["employeeId"], item])).values()];
            setUsers(uniqueItems.reverse());
            setLoader(true);
        })
       
    }
    return (
        <>
            <div className="container-fluid main-list">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <h3>Leaves List</h3>
                          {loader ? <div>
                                {newUsers.length===0 ? <div className="alert-msg mt-4"><h5>No Leaves Today</h5><i class="fa fa-times" aria-hidden="true"></i></div> :
                                newUsers.map((user) => (
                                    <div className="employee-data" onClick={() => {
                                        Navigate(`/leavestatus/${user._id}`, {
                                            state: {
                                                user: "usman"
                                            }}
                                            )}}>
                                        <div className="user-data mt-5">
                                            <div className="user-icon ">
                                                <i className="fa fa-user" aria-hidden="true"></i>
                                            </div>
                                            <div className="user-details mt-2">
                                                <h4>{user.employeeName}</h4>
                                                <h4>{user.startdate}</h4>
                                            </div>
                                        </div>
                                        <div className="left-arrow">
                                            <div className="fixed"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>
                                        </div>
                                    </div>
                                ))}</div>:  <div className='spin' style={{textAlign : "center"}}><Spinner animation="border" /></div> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}