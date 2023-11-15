import {Link, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {couponByIdMerchant, deleteCoupon} from "../service/CouponService";
import {deleteProduct} from "../service/ProductService";

function CouponList() {
    let {id} = useParams();
    const [coupons, setCoupons] = useState([])
    const [modalDelete, setModalDelete] = useState(false);
    const [indexDelete, setIndexDelete] = useState();
    const btn_modal = useRef()
    const [message, setMessage] = useState("")
    useEffect(() => {
        couponByIdMerchant(1).then(r => {
            setCoupons(r)
        })
    }, [coupons]);

    const displayModal = (id_product) => {
        setModalDelete(true)
        setIndexDelete(id_product)
    }

    const handleDeleteCoupon = () => {
        deleteCoupon(indexDelete).then( r => {
            if (r === true){
                couponByIdMerchant(1).then(r => {
                    setCoupons(r)
                    setModalDelete(false)
                    setMessage("Delete product success!!!")
                    btn_modal.current.click();
                })
            } else {
                setMessage("An error occurred!!!")
                btn_modal.current.click();
            }
        })
    }


    return(
        <>
            <Link to={"/list"}><svg style={{color: 'black'}} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        </Link>
    <section className="home-page">
        <section className="section-newsfeed">
            <main className="container">
                <section className="section-newsfeed">
                    <div className="title with-action">
                        <h2>List Coupon</h2>
                    </div>
                    <Link to={`/create_Coupon/${id}`} style={{fontSize: '20px',color: '#d78c8c'}}>Create</Link>
                    <div className="content">
                        <div className="list-view">

                            {coupons && coupons.map(item => (
                                <div className="list-item eatery-item-landing">
                                    <div className="img-lazy figure square">
                                        <div className="img" style={{backgroundImage: `url(${item.image})`}}>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div style={{textAlign: 'center'}} className="name mb-5">
                                            {item.name}
                                        </div>
                                        <p style={{textAlign: 'center'}}>Discount: {item.discountAmount ? item.discountAmount + "VND" : item.percentageDiscount + "%"}
                                        </p>
                                        <div style={{marginLeft: '50px'}} className="promotion">
                                            <p> Quantity: {item.quantity}</p>
                                        </div>
                                        <div style={{marginTop: '10px'}} className="name mb-5 d-flex justify-content-between align-items-center">
                                            <div className="d-inline-block">
                                                <Link to={`/update_Coupon/${item.id}`} style={{color: '#d78c8c'}} className="btn btn-sm text-dark p-0">
                                                    <svg style={{color: '#d78c8c'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                    </svg>
                                                    <span style={{color: '#d78c8c'}} className="ml-1">update</span>
                                                </Link>
                                            </div>

                                            <div className="d-inline-block">
                                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                        onClick={()=> displayModal(item.id)} style={{color: '#d78c8c'}} className="btn btn-sm text-dark p-0">
                                                    <svg style={{color: '#d78c8c'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                                    </svg>
                                                    <span style={{color: '#d78c8c'}}>delete</span>
                                                </button>

                                            </div>
                                        </div>

                                            {/*modal delete*/}
                                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                                                 data-bs-keyboard="false" tabIndex="10" aria-labelledby="staticBackdropLabel"
                                                 aria-hidden={modalDelete}>
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="staticBackdropLabel">Modal Delete</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            Are you sure?
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-info" data-bs-dismiss="modal">Cancel</button>
                                                            <button className="mx-2 btn btn-red" onClick={handleDeleteCoupon} type="button">Confirm</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        {/*end modal delete*/}

                                    </div>
                                </div>

                                // modal

                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </section>
    </section>


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
)
}
export default CouponList