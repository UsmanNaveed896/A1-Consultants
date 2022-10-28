import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss'
import Cookie from 'react-cookies'

export default () => {
    let Navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, seterror] = useState()

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    useEffect(() => {
        const token = Cookie.load('token')    //load is used to get cookie
        if (token !== undefined) {
            Navigate('/login')
        }
    }, [])
    const usersStatus = (token, userType, userid, username) => {
        const login = {
            token: token.token,
            user_type: userType,
            userid: userid,
            username: username
        }
        Cookie.save('token', token, { maxAge: 600, path: '/' })
        Cookie.save('user_Type', userType, { maxAge: 600, path: '/' })
        Cookie.save('userid', userid, { maxAge: 600, path: '/' })
        Cookie.save('username', username, { maxAge: 600, path: '/' })
    }
    const handleApiAdmin = (e) => {
        e.preventDefault();
        if (email && password) {
            axios.post(`${process.env.REACT_APP_API_KEY}/signin/admin`, {
                email: email,
                password: password,

            }).then((res) => {
                usersStatus(res.data.token, 'admin')
                Navigate('/');
            }, reason => {
                console.error(reason);
                seterror('Invalid Email or Password')
            }
            )
        } else {
            alert("Please Fill Form")
        }
    }
    const handleApiUser = (e) => {
        e.preventDefault();
        if (email && password) {
            axios.post(`${process.env.REACT_APP_API_KEY}/signin/`, {
                email: email,
                password: password,
            }).then((res) => {
                usersStatus(res.data.token, 'employee', res.data.userid, res.data.username)
                Navigate('/');
            }, reason => {
                console.error(reason);
                seterror('Invalid Email or Password')
            }
            )
        } else {
            alert("Please Fill Form")
        }
    }
    return (
        <>
            <div className="container-fluid main-login">
                <div className='container main-login-container'>
                    <div className='align-wrap-center' style={{ "paddingTop": "10rem" }}>
                        <div className="  vertical-align-center pt-5">
                            <div className='login-box mt-5 '>
                                <div className="content-login">
                                    <h3>Login</h3>
                                    <form>
                                        <div className="form-group mt-5">
                                            <label className="labels">Email</label>
                                            <input type="Email" className="form-control form-control-lg mt-2" placeholder="Enter your E-mail address" onChange={(e) => handleEmail(e)} value={email}
                                                name="Email" />
                                        </div>
                                        <div className="form-group mt-4">
                                            <label className="labels">Password</label>
                                            <input type="Password" className="form-control form-control-lg mt-2" placeholder="Enter Your Password" onChange={(e) => handlePassword(e)} value={password}
                                                name="Enter Your Password" />
                                        </div>
                                        {error ? <span style={{ "color": "white" }}>{error}</span> : ""}
                                        <div className="login-buttons mt-5">
                                            <button type="submit" className="btn btn-primary login" onClick={handleApiAdmin}>Login as Admin</button>
                                            <button type="submit" className="btn btn-primary login" onClick={handleApiUser}>Login as Employee</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}