import React, {useEffect, useRef, useState} from 'react';
import * as yup from 'yup';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {findCity, findDistrict, findWard, saveMerchant} from "../service/MerchantService";
import {upImageFirebase} from "../firebase/Upfirebase";

function FormRegister() {
    let navigate = useNavigate();
    const [load, setLoad] = useState(true)
    const [city, setCity] = useState([])
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [image, setImage] = useState()
    const [message, setMessage] = useState()
    const btn_modal = useRef()
    const [merchant, setMerchant] = useState({
        activity: {
            id_activity: 3
        },
        name: '',
        phone: '',
        email: '',
        open_time: '',
        close_time: '',
        image: ''
    });
    const [address, setAddress] = useState({})

    const handleCreateMerchant = (e) => {
        setLoad(false)
        upImageFirebase(image).then(r => {
            let registerMerchant = {...e, addressShop: address, image: r.name}
            console.log(registerMerchant)
            saveMerchant(registerMerchant).then(r => {
                if (r === true){
                    setMessage("Register success!")
                    btn_modal.current.click();
                    setLoad(true)
                    navigate('/register')

                }  else {
                    setMessage("Register error!")
                    btn_modal.current.click();
                    navigate('/register')
                }         }
            )
        })
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

    useEffect(() => {
        findCity().then(r => {
            setCity(r)
        }).catch(error => {
                setMessage("Error display City")
                btn_modal.current.click();
            }
        )
    }, []);

    const schema = yup.object().shape({
        name: yup.string().required(),
        phone: yup.string()
            .matches(/^0\d{9}$/, "Phone number must have 10 digits")
            .required(),
        email: yup.string().matches(/^[A-Za-z0-9._-]+@[A-Za-z]+\.[A-Za-z]{2,}$/, ("with @ and no special characters")),
        open_time: yup.string().required(),
        close_time: yup.string().required(),
        image: yup.string().required('Image is required'),
        city: yup.string().required('City is required'),
        district: yup.string().required('District is required'),
        ward: yup.string().required('Ward is required'),
        address_detail: yup.string().required('Address Detail is required')
    });

    return (
        <>
            {load ? (
                    <MDBContainer className="my-4">
                        <MDBCard>
                            <MDBRow className='g-0'>

                                <MDBCol md='5'>
                                    <MDBCardImage style={{height: '800px'}}
                                                  src='https://firebasestorage.googleapis.com/v0/b/react-firebase-storage-f6ec9.appspot.com/o/file%2FdoAnNgon.jpg?alt=media&token=e3c3377c-463d-481d-bb04-ba2d890e27b9'
                                                  alt="register form" className='rounded-start w-100'/>
                                </MDBCol>

                                <MDBCol md='7'>
                                    <MDBCardBody className='d-flex flex-column'>

                                        <h5 className="fw-normal my-4 pb-3"
                                            style={{
                                                letterSpacing: '1px',
                                                fontWeight: 'bolder',
                                                textAlign: "center"
                                            }}>Register Merchant</h5>

                                        <div style={{width: "500px", margin: 'auto'}}>
                                            <Formik initialValues={merchant} onSubmit={(e) => handleCreateMerchant(e)}
                                                    validationSchema={schema}>
                                                <Form>
                                                    <div className="mb-3">
                                                        <label className="form-label">Name</label>
                                                        <Field className="form-control" name="name"/>
                                                        <ErrorMessage className="error" name="name" component="div"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Phone</label>
                                                        <Field className="form-control" name="phone"/>
                                                        <ErrorMessage className="error" name="phone" component="div"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Email</label>
                                                        <Field type="email" className="form-control" name="email"/>
                                                        <ErrorMessage className="error" name="email" component="div"/>
                                                    </div>
                                                    <div className="row" style={{marginLeft: "0px", marginRight: "0px"}}>
                                                        <div className="mb-3 col-6" style={{paddingLeft: "0px"}}>
                                                            <label className="form-label">Open Time</label>
                                                            <Field type="time" className="form-control" name="open_time"/>
                                                            <ErrorMessage className="error" name="open_time"
                                                                          component="div"/>
                                                        </div>
                                                        <div className="mb-3 col-6" style={{paddingRight: "0px"}}>
                                                            <label className="form-label">Close Time</label>
                                                            <Field type="time" className="form-control" name="close_time"/>
                                                            <ErrorMessage className="error" name="close_time"
                                                                          component="div"/>
                                                        </div>
                                                    </div>
                                                    <div className="row" style={{marginLeft: "0px", marginRight: "0px"}}>
                                                        <div className="mb-3 col-6" style={{paddingLeft: "0px"}}>
                                                            <label className="form-label" htmlFor="ward">City</label>
                                                            <select required onChange={handleInputChangeCity}
                                                                    className="form-select col-6">
                                                                <option>City</option>
                                                                {city && city.map(item => (
                                                                    <option value={item.id_city}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="mb-3 col-6" style={{paddingRight: "0px"}}>
                                                            <label className="form-label" htmlFor="ward">District</label>
                                                            <select required onChange={handleInputChangeDistrict}
                                                                    className="form-select col-6">
                                                                <option> District</option>
                                                                {district && district.map(item => (
                                                                    <option value={item.id_district}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row" style={{marginLeft: "0px", marginRight: "0px"}}>
                                                        <div className="mb-3 col-6" style={{paddingLeft: "0px"}}>
                                                            <label className="form-label" htmlFor="ward">Ward</label>
                                                            <select required onChange={handleInputChangeWard} id="ward"
                                                                    className="form-select">
                                                                <option>Ward</option>
                                                                {ward && ward.map(item => (
                                                                    <option value={item.id_ward}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="mb-3 col-6" style={{paddingRight: "0px"}}>
                                                            <label className="form-label">Detail</label>
                                                            <input required className="form-control" onChange={(e) => setAddress({
                                                                ...address,
                                                                address_detail: e.target.value
                                                            })}/>
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Image</label>
                                                        <input className="form-control" type="file"
                                                               onChange={(e) => handleInputChangeImage(e)}/>
                                                    </div>
                                                    <div style={{textAlign: 'center'}}>
                                                        <button style={{width: '300px'}} type="submit"
                                                                className="btn btn-outline-success">Register
                                                        </button>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </div>

                                    </MDBCardBody>
                                </MDBCol>

                            </MDBRow>
                        </MDBCard>

                    </MDBContainer>
                )
                : (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" style={{width: "4rem", height: "4rem", marginTop: "40vh"}}
                             role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            {/*button modal*/}
            <button type="button" ref={btn_modal} className="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" style={{display: "none"}}>
            </button>

            {/*modal*/}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Notification</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <span>{message}</span>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormRegister;



