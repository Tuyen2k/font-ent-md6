import React, {useEffect, useRef, useState} from "react";
import {deleteCartDetail, getListCart, updateQuantity} from "../../service/CartService";
import {Link} from "react-router-dom";


export default function DisplayCart() {

    const account = JSON.parse(localStorage.getItem("account"))
    const [carts, setCart] = useState([]);
    const [check, setCheck] = useState(false);
    const btn_modal = useRef()
    const [message, setMessage] = useState("");

    const handleMinus = (id) => {
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].id_cartDetail === id) {
                if (carts[i].quantity > 1) {
                    let quantity = carts[i].quantity - 1
                    updateQuantity(id, quantity).then(res =>{
                        if (res === true){
                            setMessage("Update success!!!")
                            btn_modal.current.click()
                            setCheck(!check)
                        }else {
                            setMessage("An error occurred. Please check again")
                            btn_modal.current.click()
                        }
                    })
                }
            }
        }
    }

    const handlePlus = (id) => {
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].id_cartDetail == id) {
                if (carts[i].quantity < 20) {
                    let quantity = carts[i].quantity + 1
                    updateQuantity(id, quantity).then(res =>{
                        if (res === true){
                            setMessage("Update success!!!")
                            btn_modal.current.click()
                            setCheck(!check)
                        }else {
                            setMessage("An error occurred. Please check again")
                            btn_modal.current.click()
                        }
                    })
                }
            }
        }
    }
    const deleteCart = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteCartDetail(id).then(res => {
                if (res){
                    setMessage("Delete success!!!")
                    btn_modal.current.click()
                    setCheck(!check)
                }
                else {
                    setMessage("An error occurred. Please check again")
                    btn_modal.current.click()
                }
            })
        }
    }


    useEffect(() => {
        getListCart(11).then(res => {
            setCart(res)
            console.log(res)
        })
    }, [check])

    return (
        <>
            <h3>Cart</h3>
            <section>
                <div className="container">
                    <div className="title-cart">
                        <div className="header-item">
                            <div className="row">
                                <div className="col-1"><input className="input-checkbox" type="checkbox"/></div>
                                <div className="col-4">Product</div>
                                <div className="col-2">Price</div>
                                <div className="col-2">Quantity</div>
                                <div className="col-2">Amount</div>
                                <div className="col-1">Action</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {carts.map((cart, index) => {
                return (
                    <section key={index}>
                        <div className="container">
                            <div className="display-cart">
                                <div className="header-item">
                                    <div className="row">
                                        <div className="col-1"><input className="input-checkbox" type="checkbox"/></div>
                                        <div className="col-11">{cart.product.merchant.name}</div>
                                    </div>
                                </div>

                                <div className="item-cart">
                                    <div className="row item">
                                        <div className="col-1"><input className="input-checkbox" type="checkbox"/></div>
                                        <div className="col-4 row">
                                            <div className="col-4">
                                                <img className="img-cart"
                                                     src={cart.product.image}
                                                     alt="image"/>
                                            </div>
                                            <div className="col-8 item-name">
                                                {cart.product.name}
                                            </div>
                                        </div>
                                        <div className="col-2"><strong><span className="number">{cart.price.toLocaleString()}</span> đ</strong></div>
                                        <div className="col-2">
                                            <div style={{display: "flex"}}>
                                                <button className="btn px-2"
                                                        onClick={() => handleMinus(cart.id_cartDetail)}>
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <input id="form1" min="0" name="quantity" value={cart.quantity}
                                                       type="number"
                                                       className="form-control form-control-sm"/>
                                                <button className="btn px-2"
                                                        onClick={() => handlePlus(cart.id_cartDetail)}>
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-2"><strong><span className="number">{(cart.price*cart.quantity).toLocaleString()}</span> đ</strong></div>
                                        <div className="col-1" onClick={() => deleteCart(cart.id_cartDetail)}><i
                                            className="fa-solid fa-trash fa-lg" style={{color: "#ff0000"}}></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            })}


            <section>
                <div className="container">
                    <div className="footer-cart">
                        <h6 className="mb-0"><Link to={"/"}
                                                   className="text-body"><i
                            className="fas fa-long-arrow-alt-left me-2"></i>Back
                            Home</Link></h6>
                    </div>
                </div>
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