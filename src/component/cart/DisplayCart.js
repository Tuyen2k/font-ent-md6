import React, {useEffect, useRef, useState} from "react";
import {deleteCartDetail, getListCart, updateQuantity} from "../../service/CartService";
import {Link} from "react-router-dom";


export default function DisplayCart() {

    const account = JSON.parse(localStorage.getItem("userInfo"))
    const [carts, setCart] = useState(undefined);
    const [list, setList] = useState([]);
    const [check, setCheck] = useState(false);
    const btn_modal = useRef()
    const [message, setMessage] = useState("");

    const findCartDetail = (id) => {
        let item;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id_cartDetail === id) {
                item = list[i]
                break
            }
        }
        return item;
    }
    const handleMinus = (id) => {
        let item = findCartDetail(id)
        if (item.quantity > 1) {
            let quantity = item.quantity - 1
            updateQuantity(id, quantity).then(res => {
                if (res === true) {
                    setMessage("Update success!!!")
                    btn_modal.current.click()
                    setCheck(!check)
                } else {
                    setMessage("An error occurred. Please check again")
                    btn_modal.current.click()
                }
            })
        } else {
            if (window.confirm("The quantity reaches 0, it will be removed from the cart")) {
                deleteCartDetail(id).then(res => {
                    if (res === true) {
                        setMessage("Update success!!!")
                        btn_modal.current.click()
                        setCheck(!check)
                    } else {
                        setMessage("An error occurred. Please check again")
                        btn_modal.current.click()
                    }
                })
            }
        }
    }

    const handlePlus = (id) => {
        let item = findCartDetail(id)
        if (item.quantity < 30) {
            let quantity = item.quantity + 1
            updateQuantity(id, quantity).then(res => {
                if (res === true) {
                    setMessage("Update success!!!")
                    btn_modal.current.click()
                    setCheck(!check)
                } else {
                    setMessage("An error occurred. Please check again")
                    btn_modal.current.click()
                }
            })
        }else {
            setMessage("If you want to order a quantity over 30, please contact the merchant!")
        }
    }
    const deleteCart = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteCartDetail(id).then(res => {
                if (res === true) {
                    setMessage("Delete success!!!")
                    btn_modal.current.click()
                    setCheck(!check)
                } else {
                    setMessage("An error occurred. Please check again")
                    btn_modal.current.click()
                }
            })
        }
    }


    useEffect(() => {
        console.log(account)
        getListCart(account.id).then(res => {
            if (res.length !== 0){
                setList(res)
                groupByMerchant(res)
            }
        })
    }, [check])

    function groupByMerchant(list) {
        let arr = []
        const a = {merchant: list[0].cart.merchant, list: [list[0]]};
        let count = 0
        arr.push(a)
        for (let i = 1; i < list.length; i++) {
            if (list[i].cart.merchant.id_merchant === arr[count].merchant.id_merchant) {
                arr[count].list.push(list[i])
            } else {
                arr.push({merchant: list[i].cart.merchant, list: [list[i]]})
                count++
            }
        }
        setCart(arr)
    }

    const handleAllOrder = () => {
        let checkboxAll = document.getElementById("checkbox-all");
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        if (checkboxAll.checked) {
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = true;
            });
        } else {
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = false;
            });
        }
    }
    const handleOrderByMerchant = (id_merchant) => {
        let checkboxAll = document.getElementById(`checkbox-${id_merchant}`);
        let checkboxes = document.querySelectorAll(`input[type="checkbox"][id="checkbox-${id_merchant}"]`);
        if (checkboxAll.checked) {
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = true;
            });
        } else {
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = false;
            });
        }
    }


    return (
        <>
            {carts !== undefined ? (
                <div className="container">
                    <h3>Cart</h3>
                    <section>
                        <div className="container">
                            <div className="title-cart">
                                <div className="header-item">
                                    <div className="row">
                                        <div className="col-1"><input onClick={handleAllOrder} className="input-checkbox"
                                                                      id="checkbox-all" type="checkbox"/></div>
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
                                                <div className="col-1"><input className="input-checkbox"
                                                                              onClick={() => handleOrderByMerchant(cart.merchant.id_merchant)}
                                                                              id={`checkbox-${cart.merchant.id_merchant}`}
                                                                              type="checkbox"/>
                                                </div>
                                                <div className="col-11">{cart.merchant.name}</div>
                                            </div>
                                        </div>
                                        <div className="item-list">
                                            {cart.list.map((item, count) => {
                                                return (
                                                    <div className="item-cart" key={count}>
                                                        <div className="row item">
                                                            <div className="col-1"><input className="input-checkbox"
                                                                                          type="checkbox"
                                                                                          id={`checkbox-${cart.merchant.id_merchant}`}/>
                                                            </div>
                                                            <div className="col-4 row">
                                                                <div className="col-4">
                                                                    <img className="img-cart"
                                                                         src={item.product.image}
                                                                         alt="image"/>
                                                                </div>
                                                                <div className="col-8 item-name">
                                                                    {item.product.name}
                                                                </div>
                                                            </div>
                                                            <div className="col-2"><strong><span
                                                                className="number">{item.price.toLocaleString()}</span> đ</strong>
                                                            </div>
                                                            <div className="col-2">
                                                                <div style={{display: "flex"}}>
                                                                    <button className="btn px-2"
                                                                            onClick={() => handleMinus(item.id_cartDetail)}>
                                                                        <i className="fas fa-minus"></i>
                                                                    </button>
                                                                    <input id="form1" min="0" name="quantity"
                                                                           value={item.quantity}
                                                                           type="number"
                                                                           className="form-control form-control-sm"/>
                                                                    <button className="btn px-2"
                                                                            onClick={() => handlePlus(item.id_cartDetail)}>
                                                                        <i className="fas fa-plus"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="col-2"><strong><span
                                                                className="number">{(item.price * item.quantity).toLocaleString()}</span> đ</strong>
                                                            </div>
                                                            <div className="col-1"
                                                                 onClick={() => deleteCart(item.id_cartDetail)}><i
                                                                className="fa-solid fa-trash fa-lg"
                                                                style={{color: "#ff0000"}}></i>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                    </div>

                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )
                    })}

                </div>
            ) : (
                <div className="container">
                    <h3 style={{textAlign : "center", marginTop: "100px"}}>Your cart is empty, let's go shopping</h3>
                </div>
            ) }

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