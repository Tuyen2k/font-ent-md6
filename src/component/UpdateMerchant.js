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
import {useNavigate, useParams} from "react-router-dom";
import {
    findAllActivity,
    findCity,
    findDistrict,
    findMerchantById,
    findWard,
    saveMerchant, updateMerchant
} from "../service/MerchantService";
import {upImageFirebase} from "../firebase/Upfirebase";
import axios from "axios";

function UpdateMerchant() {
    let navigate = useNavigate();
    let { id } = useParams();
    const [load, setLoad] = useState(true)
    const [city, setCity] = useState([])
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [image, setImage] = useState(null)
    const [message, setMessage] = useState()
    const btn_modal = useRef()
    const [merchant, setMerchant] = useState({
        activity: {
            id_activity: ''
        },
        name: '',
        phone: '',
        email: '',
        open_time: '',
        close_time: '',
        image: ''
    })
    const [address, setAddress] = useState(undefined)
    const [activity, setActivity] = useState([])
    const [address_detail, setAddress_detail] = useState()

    useEffect(() => {
        //id này đợi có acc sẽ dùng acc để tìm
        findMerchantById(id).then(dataMerchant => {
            console.log(dataMerchant)
            setMerchant(dataMerchant)
            setAddress_detail(dataMerchant.addressShop.address_detail)
            findAllActivity().then(dataActivity => {
                setActivity(dataActivity)
            }).catch(()=>{
                setMessage("Error display Activity")
                btn_modal.current.click();
            })
            findCity().then(r => {
                setCity(r)
            })
            findDistrict(dataMerchant.addressShop.city.id_city).then(dataDistrict => {
                setDistrict(dataDistrict)
            })
            findWard(dataMerchant.addressShop.district.id_district).then(dataWard => {
               setWard(dataWard)
            })
        }).catch(e => {
            setMessage("There is no data on this merchant")
            btn_modal.current.click();
        })
    }, []);


    const handleUpdateMerchant = async (e) => {
        setLoad(false);
        try {
            let updatedImage = merchant.image;
            let updatedAddress = merchant.addressShop;
            if (image !== null) {
                const uploadedImage = await upImageFirebase(image);
                updatedImage = uploadedImage.name;
            }
            if (address !== undefined) {
                updatedAddress = address;
            }
            const registerMerchant = { ...e, addressShop: updatedAddress , image: updatedImage };
            updateMerchant(registerMerchant).then(r => {
                    setMessage("Update success!")
                    btn_modal.current.click();
                    setLoad(true)
                    navigate('/update')
                }
            ).catch(e => {
                    setMessage("Update error!")
                    btn_modal.current.click();
                    navigate('/update')
                }
            )
            // setMessage("Update success!");
        // } catch (error) {
        //     setMessage("Update error!");
        } finally {
            btn_modal.current.click();
            setLoad(true);
            navigate('/update');
        }
    }


    const handleInputChangeCity = (e) => {
        setAddress_detail(null)
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
            setWard([])
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
            setMessage("Please choose image for the newMerchant!!!")
            btn_modal.current.click();
        }
        setImage(file)
    }

    const schema = yup.object().shape({
        name: yup.string().required(),
        open_time: yup.string().required(),
        close_time: yup.string().required()
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
                                            <Formik initialValues={merchant} onSubmit={(e) => handleUpdateMerchant(e)}
                                                    validationSchema={schema} enableReinitialize={true} >
                                                <Form>
                                                    <div className="mb-3">
                                                        <label className="form-label">Name</label>
                                                        <Field className="form-control" name="name"/>
                                                        <ErrorMessage className="error" name="name" component="div"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Email</label>
                                                        <div className="form-control">{merchant.email}</div>
                                                    </div>

                                                    <div className="row" style={{marginLeft: "0px", marginRight: "0px"}}>
                                                        <div className="mb-3 col-6" style={{paddingLeft: "0px"}}>
                                                            <label className="form-label">Phone</label>
                                                            <div className="form-control">{merchant.phone}</div>
                                                        </div>
                                                        <div className="mb-3 col-6" style={{paddingRight: "0px"}}>
                                                            <label className="form-label">Activity</label>
                                                            <select className="form-select">
                                                                {activity && activity.map(item => (
                                                                    <option value={item.id_activity}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
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
                                                            <select onChange={handleInputChangeCity}
                                                                    className="form-select col-6">
                                                                {city && city.map(item => {
                                                                    if (item.id_city === merchant.addressShop.city.id_city){
                                                                        return(
                                                                            <option selected value={item.id_city}>{item.name}</option>
                                                                        )
                                                                    }else {
                                                                        return(
                                                                            <option value={item.id_city}>{item.name}</option>
                                                                        )
                                                                    }
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="mb-3 col-6" style={{paddingRight: "0px"}}>
                                                            <label className="form-label" htmlFor="ward">District</label>
                                                            <select onChange={handleInputChangeDistrict}
                                                                    className="form-select col-6">
                                                                {district && district.map(item => {
                                                                    if (item.id_district === merchant.addressShop.district.id_district){
                                                                        return(
                                                                            <option selected value={item.id_district}>{item.name}</option>
                                                                        )
                                                                    }else {
                                                                        return(
                                                                            <option value={item.id_district}>{item.name}</option>
                                                                        )
                                                                    }
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="row" style={{marginLeft: "0px", marginRight: "0px"}}>
                                                        <div className="mb-3 col-6" style={{paddingLeft: "0px"}}>
                                                            <label className="form-label" htmlFor="ward">Ward</label>
                                                            <select onChange={handleInputChangeWard} id="ward"
                                                                    className="form-select">
                                                                {/*<option>{merchant.addressShop.ward.name}</option>*/}
                                                                <option>Ward</option>
                                                                {ward && ward.map(item => {
                                                                    if (item.id_ward === merchant.addressShop.ward.id_ward){
                                                                        return(
                                                                            <option selected value={item.id_ward}>{item.name}</option>
                                                                        )
                                                                    }else {
                                                                        return(
                                                                            <option value={item.id_ward}>{item.name}</option>
                                                                        )
                                                                    }
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="mb-3 col-6" style={{paddingRight: "0px"}}>
                                                            <label className="form-label">Detail</label>
                                                            <input defaultValue={address_detail} className="form-control" onChange={(e) => setAddress({
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

export default UpdateMerchant;



