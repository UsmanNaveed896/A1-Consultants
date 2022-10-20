import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function UserAuth() {
    const Navigate = useNavigate();

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = tokenString;
        return userToken;
    }
    const [token, setToken] = useState(getToken());

    const saveToken = (token) => {
        console.log(token,"savetoken")
        localStorage.setItem('token',token)
        setToken(token);
        Navigate('/dashboard');
    }

    const logOut = () => {
        localStorage.removeItem('token');
    }

    const http = axios.create({
        baseURL: "https://crm-09.herokuapp.com/signin/admin",
        headers: {
            "Content-type": "application/JSON",
        }
    });
    const http2 = axios.create({
        baseURL: "https://crm-09.herokuapp.com/employee/add",
        headers: {
            "Content-type": "application/JSON",
        }

    });
    return {
        setToken: saveToken,
        getToken,
        token,
        http,
        logOut,
        http2
    }
}

