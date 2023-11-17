import {Link} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
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
                    toast.success('Register successfully!', {containerId: 'register'});
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

    const handleInputChangeImage = (e) => {
        const file = e.target.files[0]
        if (!file) {
            setMessage("Please choose image for the merchant!!!")
            btn_modal.current.click();
        }
        setImage(file)
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
            if (response.data.authorities[0].authority === "ROLE_MERCHANT"){
                const merchant = await findMerchantByAccount(response.data.id)
                localStorage.setItem("merchant", JSON.stringify(merchant))
            }
            setUser(response)
            toast.success('Logged in successfully!',{containerId:'login'});
            setExist(!isExist)
            setTimeout(() => {
                window.document.getElementById("modal-login-close").click();
            }, 3000)
        } catch (error) {
            toast.error('Incorrect user or password, try again!', {containerId:'login'});
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
        // navigate('/');
    };

    const notificationLogin=()=>{
        toast.error('Please log in!', {containerId : "page"});
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
                <ToastContainer enableMultiContainer containerId={"page"} position="top-right" autoClose={2000} pauseOnHover={false}
                                style={{width: "400px"}}/>
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
                            <div style={{width : "850px"}}>
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
                            <div style={{width : "200px"}}>
                                {user ? (
                                    <div className="nav-item user-panel">
                                        <div className="user-panel">
                                            <div className="btn-nav-city-select"><a>Welcome {user.username} !</a>
                                                <i className="fa-solid fa-sort-down"></i>
                                                <ul className="menu-nav-city-select" style={{width: "150px"}}>
                                                    <li className="city-item"><Link style={{color: "black"}}
                                                                                    to={"merchant/register"}>Register
                                                        Merchant</Link></li>
                                                    <li className="city-item"><Link style={{color: "black"}}
                                                                                    to={"merchant/update/2"}>Update
                                                        Merchant</Link></li>
                                                    <li className="city-item"><Link style={{color: "black"}}
                                                                                    to={"list"}>Detail Merchant</Link></li>
                                                    {user && <li className="city-item" onClick={handleLogout}>Logout</li>}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="nav-item user-panel">
                                        <div className="user-panel">
                                            {/*<a href={"/login"} className="btn bg-light-gray text-black btn-login">Login</a>*/}
                                            <a className="btn bg-light-gray text-black btn-login" id="modal-login-open"
                                               ref={btn_modal}
                                               data-bs-toggle="modal"
                                               data-bs-target="#loginModal" style={{marginRight: "10px"}}>Login</a>
                                            <a className="btn bg-light-gray text-black btn-login" ref={btn_modal}
                                               data-bs-toggle="modal"
                                               data-bs-target="#registerModal">Register</a>
                                        </div>
                                    </div>

                                )}
                            </div>
                            {/*End Navbar*/}
                            {/*login modal*/}
                            <div className="modal fade bd-example-modal-lg" id="loginModal" tabIndex="-1"
                                 role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <ToastContainer enableMultiContainer containerId="login" position="top-right"
                                                autoClose={2000} pauseOnHover={false}
                                                style={{width: "400px"}}/>

                                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="myLargeModalLabel">Login account</h5>
                                            <button type="button" id="modal-login-close" className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-5">
                                                        <div className="form-group row">
                                                            <label>Username:</label>
                                                            <input className="input-login-form" type="text"
                                                                   placeholder="Enter Password"
                                                                   name="user" value={username}
                                                                   onChange={(e) => setUsername(e.target.value)}/>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label>Password:</label>
                                                            <input className="input-login-form" type="password"
                                                                   placeholder="Enter Password"
                                                                   name="psw" value={password}
                                                                   onChange={(e) => setPassword(e.target.value)}/>
                                                        </div>
                                                        <div className="form-group row login-buttons">
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
                                                    <div className="col-7 justify-content-center" style={{
                                                        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/react-firebase-storage-f6ec9.appspot.com/o/file%2FdoAnNgon.jpg?alt=media&token=e3c3377c-463d-481d-bb04-ba2d890e27b9')`,
                                                        backgroundSize: 'cover',
                                                        height: '300px'
                                                    }}>

                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="user-nav-menu text-lg-right">*/}
                            {/*    <div className="nav-item user-panel">*/}
                            {/*        <div className="user-panel">*/}
                            {/*            <span className="btn bg-light-gray text-black btn-login">*/}
                            {/*                <Link style={{color: "black"}} to={"/merchant/register"}>Register Merchant</Link></span>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="btn-nav-city-select">*/}
                            {/*   Merchant*/}
                            {/*    <i className="fa-solid fa-sort-down"></i>*/}
                            {/*    <ul className="menu-nav-city-select">*/}
                            {/*        <li className="city-item"><Link style={{color : "black"}} to={"merchant/register"}>Register Merchant</Link></li>*/}
                            {/*        <li className="city-item"><Link style={{color : "black"}} to={"merchant/update/24"}>Update Merchant</Link></li>*/}
                            {/*        <li className="city-item"><Link style={{color : "black"}} to={"list"}>List</Link></li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
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
                                            <h5 className="modal-title" id="myLargeModalLabel">Register new account</h5>
                                            <button type="button" id="modal-register-close" className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <Formik initialValues={account} onSubmit={(e) => handleCreateAccount(e)}
                                                    validationSchema={schema}>
                                                <Form>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <label className="form-label">Account information</label>
                                                            <div className="mb-3">
                                                                <label className="form-label">Enter your account</label>
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
                                                                <div className="col-3">
                                                                    <label className="form-label">Your profile
                                                                        picture</label>
                                                                </div>
                                                                <div className="col-9">
                                                                    <input ref={inputFile} className="form-control"
                                                                           name="image" type="file" id="formFile"
                                                                           style={{display: 'none'}}
                                                                           onChange={(e) => handledInputFile(e.target.files[0])}/>

                                                                    {file === undefined ? (
                                                                        <div style={{
                                                                            backgroundColor: "#b3afb5",
                                                                            width: "512px",
                                                                            height: "293px",
                                                                            marginLeft: "20px"
                                                                        }}
                                                                             className="form-control">
                                                                            <img
                                                                                src="https://southernplasticsurgery.com.au/wp-content/uploads/2013/10/user-placeholder.png"
                                                                                style={{
                                                                                    marginLeft: "100px",
                                                                                    height: "278px"
                                                                                }} alt="placeholder"/>
                                                                        </div>
                                                                    ) : (
                                                                        <div style={{
                                                                            backgroundColor: "white",
                                                                            width: "512px",
                                                                            height: "293px",
                                                                            marginLeft: "20px"
                                                                        }}
                                                                             className="form-control">
                                                                            <div>
                                                                                <img className="image-input"
                                                                                     src={URL.createObjectURL(file)}
                                                                                     alt='image'/>
                                                                            </div>
                                                                        </div>)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <label className="form-label">Personal information</label>
                                                            <div className="mb-3">
                                                                <label className="form-label">Your name</label>
                                                                <Field type="text"
                                                                       className="form-control input-focus input-register-form"
                                                                       name="fullName"/>
                                                                <ErrorMessage className="error" name="fullName"
                                                                              component="div"/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Email Number</label>
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