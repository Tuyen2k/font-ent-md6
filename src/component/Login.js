import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {ErrorMessage, Field, Form, Formik} from "formik";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/accounts/login', {
                name: username,
                password: password
            });
            // Save account info to localStorage
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            setTimeout(() => {
                navigate('/');
            }, 6000)
            toast.success('Logged in successfully!', {position: "top-right", pauseOnHover: false});
        } catch (error) {
            toast.error('Incorrect user or password, try again!', {position: "top-right", pauseOnHover: false});
        }
    };

    return (
        <>
            <h5>Login Account</h5>

            <div style={{width: "500px", margin: 'auto'}}>
                <form>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="button" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </>
    )
}
export default Login;