import React, { useState } from 'react';
import {toast} from "react-toastify";
import axios from "axios";

function LoginModal() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/accounts/login', {
                name: username,
                password: password
            });
            // Save account info to localStorage
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            toast.success('Logged in successfully!', {position: "top-right", pauseOnHover: false});
        } catch (error) {
            toast.error('Incorrect user or password, try again!', {position: "top-right", pauseOnHover: false});
        }
    };

    return (
        <div className="user-panel">
            <button type="button" className="btn bg-light-gray text-black btn-login" data-toggle="modal" data-target="#loginModal">
                Login
            </button>
            <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Login</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;