import React, {useEffect, useRef, useState} from 'react';
import * as yup from 'yup';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol
}
    from 'mdb-react-ui-kit';
import formik, {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate, useParams} from "react-router-dom";
import {upImageFirebase} from "../firebase/Upfirebase";
import {saveCoupon} from "../service/CouponService";

function CreateCoupon() {
    const navigate = useNavigate()
    let {id} = useParams();
    const [load, setLoad] = useState(true)
    const [isExist, setExist] = useState(true)
    const [image, setImage] = useState()
    const [message, setMessage] = useState()
    const btn_modal = useRef()
    const [checkDiscount, setCheckDiscount] = useState(false);
    const [discountType, setDiscountType] = useState('amount');
    const [coupon, setCoupon] = useState({
        name: '',
        image: '',
        discountAmount: '',
        percentageDiscount: '',
        quantity: '',
        merchant: {
         // sau phải thay bằng id merchant gửi qua
            id_merchant: id
        }

    })
    const handleCreateCoupon = (e) => {
        setLoad(false)
        upImageFirebase(image).then(r => {
            let createCoupon = {...e, image: r.name}
            console.log(createCoupon)
            saveCoupon(createCoupon).then(r => {
                    if (r === true) {
                        setMessage("Create success!")
                        btn_modal.current.click();
                        setLoad(true)
                        setExist(false)
                    } else {
                        setMessage("Create error!")
                        btn_modal.current.click();
                    }
                }
            )
        })
    }
    const handleInputChangeImage = (e) => {
        const file = e.target.files[0]
        if (!file) {
            setMessage("Please choose image for the coupon!!!")
            btn_modal.current.click();
        }
        setImage(file)
    }

    const schema = yup.object().shape({
        name: yup.string().required().max(20),
        quantity: yup.number().required()
    });

    return (
        <>
            <Link to={"/list_coupon/1"}><svg style={{color: 'black'}} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            </Link>
            {load ? (
                    <MDBContainer className="my-4">
                        <MDBCard>
                            <MDBRow className='g-0'>

                                <MDBCol md='5'>
                                    <MDBCardImage style={{height: '552px'}}
                                                  src='https://ben.com.vn/tin-tuc/wp-content/uploads/2021/04/voucher-la-gi.jpg'
                                                  alt="register form" className='rounded-start w-100'/>
                                </MDBCol>

                                <MDBCol md='7'>
                                    <MDBCardBody className='d-flex flex-column'>

                                        <h5 className="fw-normal my-4 pb-3"
                                            style={{
                                                letterSpacing: '1px',
                                                fontWeight: 'bolder',
                                                textAlign: "center"
                                            }}>Create Coupon</h5>

                                        <div style={{width: "500px", margin: 'auto'}}>
                                            <Formik initialValues={coupon} onSubmit={(e) => handleCreateCoupon(e)}
                                                    validationSchema={schema}>
                                                <Form>
                                                    <div className="mb-3">
                                                        <label className="form-label">Name</label>
                                                        <Field className="form-control" name="name"/>
                                                        <ErrorMessage className="error" name="name" component="div"/>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Discount Type</label><br/>
                                                        <div className="form-check">
                                                            <input type="radio"
                                                                   id="discountTypeAmount"
                                                                   name="discountType"
                                                                   value="amount"
                                                                   className="form-check-input"
                                                                   checked={discountType === 'amount'}
                                                                   onChange={() => setDiscountType('amount')}
                                                            />
                                                            <label htmlFor="discountTypeAmount"
                                                                   className="form-check-label">Amount</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                type="radio"
                                                                id="discountTypePercentage"
                                                                name="discountType"
                                                                value="percentage"
                                                                className="form-check-input"
                                                                checked={discountType === 'percentage'}
                                                                onChange={() => setDiscountType('percentage')}
                                                            />
                                                            <label htmlFor="discountTypePercentage"
                                                                   className="form-check-label">Percentage</label>
                                                        </div>
                                                    </div>
                                                    {discountType === 'amount' && (
                                                        <div className="mb-3">
                                                            <label className="form-label">Discount Amount</label>
                                                            <Field min="1" type="number" className="form-control"
                                                                   name="discountAmount"/>
                                                        </div>
                                                    )}
                                                    {discountType === 'percentage' && (
                                                        <div className="mb-3">
                                                            <label className="form-label">Percentage Discount</label>
                                                            <Field min="1" max="100" type="number" className="form-control"
                                                                   name="percentageDiscount"/>
                                                        </div>
                                                    )}

                                                    <div className="mb-3">
                                                        <label className="form-label">Quantity</label>
                                                        <Field type="number" className="form-control" name="quantity"/>
                                                        <ErrorMessage className="error" name="quantity" component="div"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Image</label>
                                                        <input className="form-control" type="file"
                                                               onChange={(e) => handleInputChangeImage(e)}/>
                                                    </div>
                                                    <div style={{textAlign: 'center'}}>
                                                        <button style={{width: '500px', backgroundColor: '#d78c8c', color: 'white', border: 'none'}} type={"submit"}
                                                                className="btn btn-outline-success">Update
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
                            {isExist ? (
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                            ) : (
                                <button type="button" className="btn btn-secondary" onClick={() => navigate(`/list_coupon/${id}`)}
                                        data-bs-dismiss="modal">Close
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateCoupon