import {Link} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {loginUser, saveAccount} from "../service/AccountService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {upImageFirebase} from "../firebase/Upfirebase";
import {findCity, findDistrict, findMerchantByAccount, findWard} from "../service/MerchantService";
import 'react-toastify/dist/ReactToastify.css';

import * as yup from "yup";

export default function Header() {
    const [isExist, setExist] = useState(true)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const btn_modal = useRef()
    const [message, setMessage] = useState()
    const [image, setImage] = useState(undefined)
    const [city, setCity] = useState([])
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [address, setAddress] = useState({})
    const [color, setColor] = useState({borderColor: 'red', color: 'red', backgroundColor: 'white'});
    const inputFile = useRef()
    const [file, setFile] = useState(undefined)


    const [account, setAccount] = useState({
        name: '',
        fullName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        image: ''
    });
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
    }, [isExist]);

    const isLoginDisabled = username.trim() === '' || password.trim() === '';

    const handledClickInput = () => {
        inputFile.current.click();
    }
    const handledInputFile = (file) => {
        setFile(file);
    }
    const handleCreateAccount = (e) => {
        let imageTemp = "https://southernplasticsurgery.com.au/wp-content/uploads/2013/10/user-placeholder.png"
        if (image !== undefined) {
            upImageFirebase(image).then(r => {
                imageTemp = r.name
            })
        }
        let registerAccount = {...e, addressDelivery: address, image: imageTemp, role: {"id_role": 2}}
        saveAccount(registerAccount).then(r => {
                if (r === true) {
                    toast.success('Register successfully! Check your email to activate the account!', {containerId: 'register'});
                    setTimeout(() => {
                        window.document.getElementById("modal-register-close").click();
                        window.document.getElementById("modal-login-open").click();
                    }, 3000)
                } else {
                    toast.error('Something went wrong! Try again!', {containerId: 'register'});
                }
            }
        )
    }

    const handleInputChangeCity = (e) => {
        const fieldValue = e.target.value;
        findDistrict(fieldValue).then(r => {
            setDistrict(r)
            setAddress(x => {
                return {
                    ...x,
                    city: {
                        id_city: fieldValue
                    }
                };
            });
        }).catch(error => {
            setMessage("Error display District")
            btn_modal.current.click();
        })
    }
    const handleInputChangeDistrict = (e) => {
        const fieldValue = e.target.value;
        findWard(fieldValue).then(r => {
            setWard(r)
            setAddress(x => {
                return {
                    ...x,
                    district: {
                        id_district: fieldValue
                    }
                };
            });
        }).catch(error => {
            setMessage("Error display Ward")
            btn_modal.current.click();
        })
    }

    const handleInputChangeWard = (e) => {
        const fieldValue = e.target.value;
        setAddress(x => {
            return {
                ...x,
                ward: {
                    id_ward: fieldValue
                }
            };
        });
    }

    const schema = yup.object().shape({
        name: yup.string().required(),
        password: yup
            .string()
            .required()
            .matches(/^(?=.*[A-Z]).{8,20}$/, 'Password must have at least 8 characters, at most 20 characters, and at least one uppercase letter'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        phone: yup
            .string()
            .matches(/^0\d{9}$/, "Phone number must have 10 digits")
            .required(),
        email: yup.string().required().matches(/^[A-Za-z0-9._-]+@[A-Za-z]+\.[A-Za-z]{2,}$/, ("with @ and no special characters"))
    });
    const handleLogin = async () => {

        try {
            const response = await loginUser(username, password);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            if (response.data.authorities[0].authority === "ROLE_MERCHANT") {
                const merchant = await findMerchantByAccount(response.data.id)
                localStorage.setItem("merchant", JSON.stringify(merchant))
            }
            setUser(response)
            toast.success('Logged in successfully!', {containerId: 'login'});
            setExist(!isExist)
            setTimeout(() => {
                window.location.reload()
            }, 1700)
        } catch (error) {
            toast.error('Incorrect user or password, try again!', {containerId: 'login'});
        }
    }

    useEffect(() => {
        findCity().then(r => {
            setCity(r)
        }).catch(error => {
                setMessage("Error display City")
                btn_modal.current.click();
            }
        )
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('merchant');
        setUser(null);
        setUsername("")
        setPassword("")
        window.location.href = "/";
    };

    const notificationLogin = () => {
        toast.error('Please log in!', {containerId: "page"});
    }

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
                                        {user ? (
                                            <div className="dropdown">
                                                <a><img src={user.image} className="profile-picture"/> {user.username}</a>
                                                <div className="dropdown-menu">
                                                    <Link className="user-function" to="/">Profile</Link>
                                                    {localStorage.getItem("merchant") === null ? (
                                                        <Link className="user-function" to="/merchant/register">Register Merchant</Link>
                                                    ) : (
                                                        <Link className="user-function" to="/list">Detail Merchant</Link>
                                                    )}
                                                    {user && <a className="user-function" onClick={handleLogout}>Logout</a>}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="nav-item user-panel">
                                                <div className="user-panel">
                                                    {/*<a href={"/login"} className="btn bg-light-gray text-black btn-login">Login</a>*/}
                                                    <a className="text-dark" id="modal-login-open"
                                                       ref={btn_modal}
                                                       data-bs-toggle="modal"
                                                       data-bs-target="#loginModal"
                                                       style={{marginRight: "10px"}}>Login</a>
                                                    <a className="text-dark" ref={btn_modal}
                                                       data-bs-toggle="modal"
                                                       data-bs-target="#registerModal">Register</a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*End Topbar*/}
                </nav>
                <ToastContainer enableMultiContainer containerId={"page"} position="top-right" autoClose={2000}
                                pauseOnHover={false}
                                style={{width: "800px"}}/>
                <nav className="navbar">
                    {/*Navbar*/}
                    <div className="container">
                        {/*Logo*/}
                        <Link to="/" className="logo"
                              style={{backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/react-firebase-storage-f6ec9.appspot.com/o/file%2Flogo--web.png?alt=media&token=372f9a0c-25f3-4f56-9019-21ba8c8e607a")`}}></Link>
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
                            <div style={{width: "850px"}}>
                                <a href="" className="btn-nav-link">New Location</a>
                                <a href="" className="btn-nav-link">Hot Deals</a>
                                <a href="" className="btn-nav-link">Popular Brands</a>
                                <a href="" className="btn-nav-link">Nearby Location</a>
                                <a href="" className="btn-nav-link">Recently Order</a>
                                <a href="" className="btn-nav-link">Healthy Choices</a>
                                <a href="" className="btn-nav-link">Vegan Location</a>
                            </div>
                            {/*End Menu Item*/}
                            {/*Login*/}
                            <div style={{width: "100px"}}></div>
                            {/*End Navbar*/}
                            {/*login modal*/}
                            <div className="modal fade bd-example-modal-lg" id="loginModal" tabIndex="-1"
                                 role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <ToastContainer enableMultiContainer containerId="login" position="top-right"
                                                autoClose={1000} pauseOnHover={false}
                                                style={{width: "400px"}}/>

                                <div className="modal-dialog modal-dialog-login modal-dialog-centered modal-lg"
                                     role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="myLargeModalLabel">Login account</h5>
                                            <button type="button" id="modal-login-close" className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body" style={{marginBottom:"20px"}}>
                                            <form>
                                                <div className="row">
                                                    <div className="col-4" style={{paddingRight : "0px", marginLeft: "10px"}}>
                                                        <div className="form-group">
                                                            <label>Username</label>
                                                            <input className="input-login-form" type="text"
                                                                   placeholder="Enter Password"
                                                                   name="user" value={username}
                                                                   onChange={(e) => setUsername(e.target.value)}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Password</label>
                                                            <input className="input-login-form" type="password"
                                                                   placeholder="Enter Password"
                                                                   name="psw" value={password}
                                                                   onChange={(e) => setPassword(e.target.value)}/>
                                                        </div>
                                                        <div className="form-group login-buttons">
                                                            <button type="button" className="btn btn-lg btn-primary"
                                                                    disabled={isLoginDisabled}
                                                                    onClick={handleLogin}>Login
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <p>New to our website? <a data-bs-dismiss="modal"
                                                                                      data-bs-toggle="modal"
                                                                                      data-bs-target="#registerModal"
                                                                                      style={{color: "red"}}>Register
                                                                now</a></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-7" style={{position:"relative", marginLeft: "20px"}}>
                                                        <img
                                                            src="https://firebasestorage.googleapis.com/v0/b/react-firebase-storage-f6ec9.appspot.com/o/file%2FdoAnNgon.jpg?alt=media&token=e3c3377c-463d-481d-bb04-ba2d890e27b9"
                                                            alt="login"
                                                            style={{width: "480px", marginTop: "13px", position:"absolute"}}/>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-nav-menu">
                                {user ? (
                                    <Link to={"/cart/account"}><i className="fa-solid fa-cart-shopping fa-lg"
                                                                  style={{color: "#ff0000"}}></i></Link>
                                ) : (
                                    <span onClick={notificationLogin}><i className="fa-solid fa-cart-shopping fa-lg"
                                                                         style={{color: "#ff0000"}}></i></span>
                                )}
                            </div>
                            {/*End login modal*/}
                            {/*Register modal*/}
                            <div className="modal fade bd-example-modal-lg" id="registerModal" tabIndex="-1"
                                 role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <ToastContainer enableMultiContainer containerId="register" position="top-center"
                                                autoClose={2000} pauseOnHover={false}
                                                style={{width: "400px"}}/>

                                <div className="modal-dialog modal-dialog-register modal-dialog-centered modal-lg"
                                     role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <a href="" className="logo"
                                               style={{backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/react-firebase-storage-f6ec9.appspot.com/o/file%2Flogo--web.png?alt=media&token=372f9a0c-25f3-4f56-9019-21ba8c8e607a")`}}></a>
                                            <h5 className="modal-title" id="myLargeModalLabel"
                                                style={{marginLeft: "10px"}}>Register</h5>
                                            <button type="button" id="modal-register-close" className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body" style={{marginLeft: "20px"}}>
                                            <Formik initialValues={account} onSubmit={(e) => handleCreateAccount(e)}
                                                    validationSchema={schema}>
                                                <Form>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Username</label>
                                                                <Field type="text"
                                                                       className="form-control input-focus input-register-form"
                                                                       name="name"/>
                                                                <ErrorMessage className="error" name="name"
                                                                              component="div"/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Enter Password</label>
                                                                <Field type="password"
                                                                       className="form-control input-focus input-register-form"
                                                                       name="password"/>
                                                                <ErrorMessage className="error" name="password"
                                                                              component="div"/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Confirm Password</label>
                                                                <Field type="password"
                                                                       className="form-control input-focus input-register-form"
                                                                       name="confirmPassword"/>
                                                                <ErrorMessage className="error" name="confirmPassword"
                                                                              component="div"/>
                                                            </div>
                                                            <div className="mb-3" style={{display: "flex"}}
                                                                 onClick={handledClickInput}>
                                                                <div className="col-2">
                                                                    <label className="form-label">Avatar</label>
                                                                </div>
                                                                <div className="col-10">
                                                                    <input ref={inputFile} className="form-control"
                                                                           name="image" type="file" id="formFile"
                                                                           style={{display: 'none'}}
                                                                           onChange={(e) => handledInputFile(e.target.files[0])}/>

                                                                    {file === undefined ? (
                                                                        <div>
                                                                            <img
                                                                                src="https://southernplasticsurgery.com.au/wp-content/uploads/2013/10/user-placeholder.png"
                                                                                style={{
                                                                                    borderRadius: "50%",
                                                                                    height: "278px"
                                                                                }} alt="placeholder"/>
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <img className="image-input"
                                                                                 src={URL.createObjectURL(file)}
                                                                                 alt='image'
                                                                                 style={{
                                                                                     borderRadius: "50%",
                                                                                     width: "278px",
                                                                                     height: "278px"
                                                                                 }}/>
                                                                        </div>)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Your name</label>
                                                                <Field type="text"
                                                                       className="form-control input-focus input-register-form"
                                                                       name="fullName"/>
                                                                <ErrorMessage className="error" name="fullName"
                                                                              component="div"/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Email Address</label>
                                                                <Field type="text"
                                                                       className="form-control input-focus input-register-form"
                                                                       name="email"/>
                                                                <ErrorMessage className="error" name="email"
                                                                              component="div"/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Phone Number</label>
                                                                <Field type="text"
                                                                       className="form-control input-focus input-register-form"
                                                                       name="phone"/>
                                                                <ErrorMessage className="error" name="phone"
                                                                              component="div"/>
                                                            </div>
                                                            <div className="row"
                                                                 style={{marginLeft: "0px", marginRight: "0px"}}>
                                                                <div className="mb-3 col-6"
                                                                     style={{paddingLeft: "0px"}}>
                                                                    <label className="form-label"
                                                                           htmlFor="city">City</label>
                                                                    <select id="city" required
                                                                            onChange={handleInputChangeCity}
                                                                            className="form-select">
                                                                        <option>City</option>
                                                                        {city && city.map(item => (
                                                                            <option
                                                                                value={item.id_city}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="mb-3 col-6"
                                                                     style={{paddingRight: "0px"}}>
                                                                    <label className="form-label"
                                                                           htmlFor="district">District</label>
                                                                    <select required id="district"
                                                                            onChange={handleInputChangeDistrict}
                                                                            className="form-select">
                                                                        <option> District</option>
                                                                        {district && district.map(item => (
                                                                            <option
                                                                                value={item.id_district}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="row"
                                                                 style={{marginLeft: "0px", marginRight: "0px"}}>
                                                                <div className="mb-3 col-6"
                                                                     style={{paddingLeft: "0px"}}>
                                                                    <label className="form-label"
                                                                           htmlFor="ward">Ward</label>
                                                                    <select required onChange={handleInputChangeWard}
                                                                            id="ward"
                                                                            className="form-select">
                                                                        <option>Ward</option>
                                                                        {ward && ward.map(item => (
                                                                            <option
                                                                                value={item.id_ward}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="mb-3 col-6"
                                                                     style={{paddingRight: "0px"}}>
                                                                    <label className="form-label">Detail</label>
                                                                    <input
                                                                        className="form-control input-focus input-register-form"
                                                                        onChange={(e) => setAddress({
                                                                            ...address,
                                                                            address_detail: e.target.value
                                                                        })}/>
                                                                </div>
                                                            </div>
                                                            <div style={{marginTop: '50px', textAlign: 'center'}}>
                                                                <button style={{
                                                                    width: '300px',
                                                                    borderColor: color.borderColor,
                                                                    color: color.color,
                                                                    backgroundColor: color.backgroundColor
                                                                }}
                                                                        type="submit"
                                                                        className="btn btn-outline-success"
                                                                        onMouseOver={() => setColor({
                                                                            borderColor: 'white',
                                                                            color: 'white',
                                                                            backgroundColor: 'red'
                                                                        })}
                                                                        onMouseOut={() => setColor({
                                                                            borderColor: 'red',
                                                                            color: 'red',
                                                                            backgroundColor: 'white'
                                                                        })}>
                                                                    Register
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </Formik>
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