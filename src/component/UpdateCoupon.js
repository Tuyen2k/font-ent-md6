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
    MDBInput, MDBCardHeader, MDBCardFooter
}
    from 'mdb-react-ui-kit';
import formik, {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate, useParams} from "react-router-dom";
import {upImageFirebase} from "../firebase/Upfirebase";
import {findOneCoupon, editCoupon} from "../service/CouponService";
import Header from "../layout/Header";
import {toast, ToastContainer} from "react-toastify";

function UpdateCoupon() {
    const navigate = useNavigate()
    let {id} = useParams();
    const [load, setLoad] = useState(true)
    const [isExist, setExist] = useState(true)
    const [image, setImage] = useState(null)
    const [message, setMessage] = useState()
    const [merchant, setMerchant] = useState({id_merchant: null})
    const btn_modal = useRef()
    const [coupon, setCoupon] = useState({})
    const [file, setFile] = useState(undefined)
    const inputFile = useRef()
    useEffect(() => {
        findOneCoupon(id).then(r => {
            setCoupon(r)
            setMerchant(r.merchant)
        })
    }, []);

    const handleUpdateCoupon = async (e) => {
                let updateCoupon;
        setLoad(false);
        try {
            if (file != null) {
                const i = await upImageFirebase(file);
                updateCoupon = {...e, image: i.name};
                const r = await editCoupon(updateCoupon);
                if (r === true) {
                    toast.success("Update Success!", {containerId:"update-coupon"})

                } else {
                    toast.error("Update Unsuccessfully! Try again", {containerId:"update-coupon"})
                    btn_modal.current.click();
                }
            } else {
                const edit = await editCoupon(e);
                if (edit === true) {
                    toast.success("Update Success!", {containerId:"update-coupon"})
                    setTimeout(() => {
                    navigate(`/list_coupon/${merchant.id_merchant}`)},2500)

                } else {
                    toast.error("Update Unsuccessfully! Try again", {containerId:"update-coupon"})
                }
            }

        } catch (error) {
            console.error("Error uploading image:", error);
            setLoad(true);
        }
    }


    const handleInputChangeImage = (e) => {
        const file = e.target.files[0]
        if (!file) {
            setImage(coupon.image)
        }
        setImage(file)
    }
    const handledInputFile = (file) => {
        setFile(file);
    }
    const handledClickInput = () => {
        inputFile.current.click();
    }

    const schema = yup.object().shape({
        name: yup.string().required().max(20),
        quantity: yup.number().required()
    });

    return (
        <>
            <Header/>
            <ToastContainer enableMultiContainer containerId={"update-coupon"} position="top-right" autoClose={2000}
                            pauseOnHover={false}
                            style={{width: "400px"}}/>
            {load ? (
                    <MDBContainer className="my-4" style={{width: "1000px"}}>
                        <MDBCard>
                            <Formik initialValues={coupon} onSubmit={(e) => handleUpdateCoupon(e)}
                                    enableReinitialize={true}
                                    validationSchema={schema}>
                                <Form>
                                    <MDBCardHeader style={{backgroundColor: "white"}}>
                                        <h5
                                            style={{
                                                textAlign: "center", marginTop: "10px", marginBottom: "20px"
                                            }}>Update Coupon</h5>
                                    </MDBCardHeader>
                                    <MDBRow className='g-0'>

                                        <MDBCol md='5'>
                                            <div style={{display: "flex",paddingLeft: "40px"}}
                                                 onClick={handledClickInput}>
                                                <div>
                                                    <input ref={inputFile} className="form-control"
                                                           name="image" type="file" id="formFile"
                                                           style={{display: 'none'}}
                                                           onChange={(e) => setFile(e.target.files[0])}/>

                                                    {file === undefined && coupon.image !== ""? (
                                                        <div>
                                                            <img style={{width: "278px", height: "278px"}} className="image-input" src={coupon.image} alt="coupon-img"/>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <img style={{width: "278px", height: "278px"}} className='image-input' alt="image"
                                                                 src={URL.createObjectURL(file)}/>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </MDBCol>

                                        <MDBCol md='7'>
                                            <MDBCardBody className='d-flex flex-column'>
                                                <div style={{width: "500px", margin: 'auto'}}>
                                                    <div className="mb-3">
                                                        <label className="form-label">Name</label>
                                                        <Field className="form-control" name="name"/>
                                                        <ErrorMessage className="error" name="name" component="div"/>
                                                    </div>

                                                    {coupon.discountAmount && (
                                                        <div className="mb-3">
                                                            <label className="form-label">Discount Amount</label>
                                                            <Field min="1" type="number" className="form-control"
                                                                   name="discountAmount" required/>
                                                        </div>
                                                    )}
                                                    {coupon.percentageDiscount && (
                                                        <div className="mb-3">
                                                            <label className="form-label">Percentage Discount</label>
                                                            <Field min="1" max="100" type="number" className="form-control"
                                                                   name="percentageDiscount" required/>
                                                        </div>
                                                    )}
                                                    <div className="mb-3">
                                                        <label className="form-label">Quantity</label>
                                                        <Field type="number" className="form-control" name="quantity"/>
                                                        <ErrorMessage className="error" name="quantity" component="div"/>
                                                    </div>
                                                </div>

                                            </MDBCardBody>
                                        </MDBCol>

                                    </MDBRow>
                                    <MDBCardFooter style={{backgroundColor: "white"}}>
                                        <div className="row">
                                            <div className="col-3">
                                                <Link to={`/list_coupon/${merchant.id_merchant}`}
                                                      style={{color: "black", padding: "6px 0 0 0"}}
                                                      type="submit">
                                                    <img style={{height: "20px", width: "20px"}}
                                                         src="https://firebasestorage.googleapis.com/v0/b/project-md6-cg.appspot.com/o/back.png?alt=media&token=2c33e5a3-f355-4f82-b095-32b64ec48bd1"
                                                         alt=""/> Back</Link>
                                            </div>
                                            <div className="col-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <button style={{
                                                    width: '300px',
                                                }} type={"submit"}
                                                        className="btn btn-outline-danger">Update
                                                </button>
                                            </div>
                                            <div className="col-3"></div>
                                        </div>
                                    </MDBCardFooter>
                                </Form>
                            </Formik>

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
                                <button type="button" className="btn btn-secondary"
                                        onClick={() => navigate(`/list_coupon/${id}`)}
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

export default UpdateCoupon