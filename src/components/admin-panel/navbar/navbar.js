import './navbar.scss'
import {Link,useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookie from 'react-cookies';

export default () =>{
    const [userType, setUserType] = useState('')
    useEffect(() => {
        const token = Cookie.load('user_Type')   //load is used to get cookie
        if (token !== undefined) {
            setUserType(token)
        }
    }, [])
    const userName=Cookie.load ('username')
    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
   }
   const closeMenu = () => {
       document.querySelector(".sidebar").classList.remove("open");
    }
const navigate=useNavigate();
const logoutUser=()=>{
    
    Cookie.remove("token", { maxAge: 15000, path: "/" });
        navigate('/login')
    
}
    return(
        <>
        <nav>
            <div className="container-fluid main">
                <div className="Navbar d-flex ">
                    <div className="dropdown-menu-a col-md-4">
                        <div className="brand d-flex mt-1">
                            <div className="mt-3"><h3>Menu</h3></div>
                            <div><button className="brand-button" onClick={openMenu}> &#9776; </button></div>
                        </div>
                        <div className="sidebar col-md-2">
                            
                            <div className="sidebar-options">
                                <div className="close-button">
                                <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                            </div>
                                <div className="signup-options">
                                    <ul>
                                        <li><h3>Welcome</h3></li>
                                        {userType === 'admin' ? <li><h5>Admin@gmail.com</h5></li> : <li><h5>{userName}</h5></li> }
                                        <Link to ="/"><li><i class="fa fa-sliders dropdown-icon" aria-hidden="true"></i>DASHBOARD</li></Link> 
                                        {userType === 'admin' &&  <Link to ="/listview">  <li><i class="fa fa-users dropdown-icon" aria-hidden="true"></i>EMPLOYEE LIST</li></Link>}
                                        <li onClick={()=>logoutUser()}><i class="fa fa-calendar dropdown-icon" aria-hidden="true"></i>LOG OUT</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
    )
}