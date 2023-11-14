import {Link} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {loginUser} from "../service/AccountService";


export default function Header() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const btn_modal = useRef()

    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
    }, []);

    const isLoginDisabled = username.trim() === '' || password.trim() === '';
    const handleLogin = async () => {

        try {
            const response = await loginUser(username, password);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            toast.success('Logged in successfully!');
            setTimeout(() => {
                window.location.reload();

            }, 3000)
        } catch (error) {
            toast.error('Incorrect user or password, try again!');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        navigate('/');
    };
    return (
        <>
            <header>
                {/*Topbar*/}
                <nav className="info-navbar">
                    <section className="topbar-wrapper">
                        <div className="container">
                            <div className="row text-lg-left">
                                <div className="col-md-6 d-none d-lg-block">
                                    <div className="d-inline-flex align-items-center">
                                        <a className="text-dark" href="">FAQs</a>
                                        <span className="text-muted px-2">|</span>
                                        <a className="text-dark" href="">Help</a>
                                        <span className="text-muted px-2">|</span>
                                        <a className="text-dark" href="">Support</a>
                                    </div>
                                </div>
                                <div className="col-md-6 text-lg-right">
                                    <div className="d-inline-flex align-items-center">
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                        <a className="text-dark pl-2" href="">
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*End Topbar*/}
                </nav>
                <nav className="navbar">
                    {/*Navbar*/}
                    <div className="container">
                        {/*Logo*/}
                        <a href="" className="logo"
                           style={{backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/react-firebase-storage-f6ec9.appspot.com/o/file%2Flogo--web.png?alt=media&token=372f9a0c-25f3-4f56-9019-21ba8c8e607a")`}}></a>
                        {/*Menu-Nav*/}
                        <div className="user-nav-menu">

                            {/*City Select*/}
                            <div className="btn-nav-city-select">
                                Hà Nội
                                <i className="fa-solid fa-sort-down"></i>
                                <ul className="menu-nav-city-select">
                                    <li className="city-item">Hồ Chí Minh</li>
                                    <li className="city-item">Hải Phòng</li>
                                    <li className="city-item">Đà Nẵng</li>
                                </ul>
                            </div>
                            {/*End City Select*/}

                            {/*Menu Item*/}
                            <a href="" className="btn-nav-link">New Location</a>
                            <a href="" className="btn-nav-link">Hot Deals</a>
                            <a href="" className="btn-nav-link">Popular Brands</a>
                            <a href="" className="btn-nav-link">Nearby Location</a>
                            <a href="" className="btn-nav-link">Recently Order</a>
                            <a href="" className="btn-nav-link">Healthy Choices</a>
                            <a href="" className="btn-nav-link">Vegan Location</a>

                            {/*End Menu Item*/}
                            <div className="blank"></div>
                            {/*Login*/}
                            {user ? (
                                <div className="nav-item user-panel">
                                    <div className="btn-nav-city-select">
                                        {user.name}
                                        <i className="fa-solid fa-sort-down"></i>
                                        <ul className="menu-nav-city-select">
                                            <li className="city-item"><Link style={{color: "black"}}
                                                                            to={"merchant/register"}>Register
                                                Merchant</Link></li>
                                            <li className="city-item"><Link style={{color: "black"}}
                                                                            to={"merchant/update/24"}>Update
                                                Merchant</Link></li>
                                            {user && <li className="city-item" onClick={handleLogout}>Logout</li>}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className="nav-item user-panel">
                                    <div className="user-panel">
                                        {/*<a href={"/login"} className="btn bg-light-gray text-black btn-login">Login</a>*/}
                                        <a className="btn bg-light-gray text-black btn-login" ref={btn_modal}
                                           data-bs-toggle="modal"
                                           data-bs-target="#loginModal">Login</a>


                                    </div>
                                </div>

                            )}
                            {/*login modal*/}
                            <div className="modal fade bd-example-modal-lg" id="loginModal" tabIndex="-1"
                                 role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <ToastContainer position="top-right" autoClose={2000} pauseOnHover={false}
                                                style={{width: "400px"}}/>

                                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="myLargeModalLabel">Login account</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-5">
                                                        <div className="form-group row">
                                                            <label>Username:</label>
                                                            <input className="input-login-form" type="text" placeholder="Enter Password"
                                                                   name="user" value={username}
                                                                   onChange={(e) => setUsername(e.target.value)}/>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label>Password:</label>
                                                            <input className="input-login-form" type="password" placeholder="Enter Password"
                                                                   name="psw" value={password}
                                                                   onChange={(e) => setPassword(e.target.value)}/>
                                                        </div>
                                                        <div className="form-group row login-buttons">
                                                            <button type="button" className="btn btn-lg btn-primary" disabled={isLoginDisabled} onClick={handleLogin}>Login</button>
                                                        </div>
                                                        <div>
                                                            <p>New to our website? <a data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#registerModal" style={{color:"red"}}>Register now</a></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-7 justify-content-center"  style={{
                                                        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/react-firebase-storage-f6ec9.appspot.com/o/file%2FdoAnNgon.jpg?alt=media&token=e3c3377c-463d-481d-bb04-ba2d890e27b9')`,
                                                        backgroundSize: 'cover',
                                                        height:'300px'
                                                    }}>

                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End login modal*/}
                            {/*Register modal*/}
                            <div className="modal fade bd-example-modal-lg" id="registerModal" tabIndex="-1"
                                 role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <ToastContainer position="top-right" autoClose={2000} pauseOnHover={false}
                                                style={{width: "400px"}}/>

                                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="myLargeModalLabel">Register new account</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-5">
                                                        <div className="form-group row">
                                                            <label>Username:</label>
                                                            <input className="input-login-form" type="text" placeholder="Enter Password"
                                                                   name="user" value={username}
                                                                   onChange={(e) => setUsername(e.target.value)}/>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label>Password:</label>
                                                            <input className="input-login-form" type="password" placeholder="Enter Password"
                                                                   name="psw" value={password}
                                                                   onChange={(e) => setPassword(e.target.value)}/>
                                                        </div>
                                                        <div className="form-group row login-buttons">
                                                            <button type="button" className="btn btn-lg btn-primary" disabled={isLoginDisabled} onClick={handleLogin}>Login</button>
                                                        </div>
                                                        <div>
                                                            <p>New to our website? <a data-bs-dismiss="modal" style={{color:"red"}}>Register now</a></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-7 justify-content-center"  style={{
                                                        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/react-firebase-storage-f6ec9.appspot.com/o/file%2FdoAnNgon.jpg?alt=media&token=e3c3377c-463d-481d-bb04-ba2d890e27b9')`,
                                                        backgroundSize: 'cover',
                                                        height:'300px'
                                                    }}>

                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End register modal*/}
                            {/*End Navbar*/}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}