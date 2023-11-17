import React, {useEffect, useRef, useState} from "react";
import {deleteCartDetail, getListCart, updateQuantity} from "../../service/CartService";
import {Link} from "react-router-dom";
import {addBill} from "../../service/BillService";
import Header from "../../layout/Header";


export default function DisplayCart() {

    const account = JSON.parse(localStorage.getItem("userInfo"))
    const [carts, setCart] = useState(undefined);
    const [list, setList] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isOrder, setIsOrder] = useState(false);
    const [check, setCheck] = useState(false);
    const btn_modal = useRef()
    const [message, setMessage] = useState("");
    const [total, setTotal] = useState(0)


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
                    console.log("Update success!!!")
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
                        console.log("Update success!!!")
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
                    console.log("Update success!!!")
                    setCheck(!check)
                } else {
                    setMessage("An error occurred. Please check again")
                    btn_modal.current.click()
                }
            })
        } else {
            setMessage("If you want to order a quantity over 30, please contact the merchant!")
            btn_modal.current.click()
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
        setCart(undefined)
        getListCart(account.id).then(res => {
            if (res.length !== 0) {
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
        console.log(arr)
        setCart(arr)
    }

    const handleAllOrder = () => {
        let checkboxAll = document.getElementById("checkbox-all");
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let totalAmount = 0
        if (checkboxAll.checked) {
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = true;
            });
        } else {
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = false;
            });
        }
        if (checkboxAll.checked) {
            for (let i = 0; i < list.length; i++) {
                let flag = false
                totalAmount += list[i].price * list[i].quantity
                for (let j = 0; j < orders.length; j++) {
                    if (list[i].id_cartDetail === orders[j].id_cartDetail) {
                        flag = true
                    }
                }
                if (!flag) {
                    orders.push(list[i])
                }
            }
            setOrders([...orders])
        } else {
            orders.splice(0, orders.length)
            setOrders([...orders])
            totalAmount = 0
        }
        setTotal(totalAmount)
        console.log(orders)
    }
    const handleOrderByMerchant = (id_merchant) => {
        let totalAmount = 0
        let arr = []
        let checkboxAll = document.getElementById("checkbox-all");
        let checkboxMerchant = document.getElementById(`checkbox-${id_merchant}`);
        let checkboxes = document.querySelectorAll(`input[type="checkbox"][id="checkbox-item-${id_merchant}"]`);
        if (checkboxMerchant.checked) {
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = true;
            });
        } else {
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = false;
            });
        }
        //xử lý list order
        for (let i = 0; i < list.length; i++) {
            if (id_merchant === list[i].cart.merchant.id_merchant) {
                totalAmount += list[i].price * list[i].quantity
                arr.push(list[i])
            }
        }
        if (checkboxMerchant.checked) {
            setTotal((prev) => (prev + totalAmount))
            for (let i = 0; i < arr.length; i++) {
                orders.push(arr[i])
                setOrders([...orders])
            }
        } else {
            setTotal(prev => (prev - totalAmount))
            for (let i = 0; i < orders.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j].id_cartDetail == orders[i].id_cartDetail) {
                        orders.splice(i, 1)
                        setOrders([...orders])
                    }
                }
            }
        }
        checkboxAll.checked = orders.length === list.length;
        console.log(orders)
    }
    const handleOrderCart = (id_merchant, id_cartDetail) => {
        let checkboxAll = document.getElementById("checkbox-all");
        let checkboxMerchant = document.getElementById(`checkbox-${id_merchant}`);
        let checkboxes = document.querySelectorAll(`input[type="checkbox"][id="checkbox-item-${id_merchant}"]`);
        let flag = true
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked === false) {
                flag = false
            }
        }
        if (!flag) {
            checkboxAll.checked = false
        }
        checkboxMerchant.checked = flag;

        let isExist = false
        let index = -1
        let item;
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].id_cartDetail == id_cartDetail) {
                isExist = true
                index = i
                item = orders[i]
            }
        }
        if (isExist) {
            setTotal((prev) => (prev - item.price * item.quantity))
            orders.splice(index, 1)
        } else {
            for (let i = 0; i < list.length; i++) {
                if (list[i].id_cartDetail == id_cartDetail) {
                    orders.push(list[i])
                    setTotal((prev) => (prev + list[i].price * list[i].quantity))
                }
            }
        }
        checkboxAll.checked = orders.length === list.length;
        setOrders([...orders])
        console.log(orders)
    }

    function handleAddBill() {
        addBill(orders).then(res => {
            if (res === true) {
                setIsOrder(false)
                setCheck(!check)
                setMessage("Order success. Waiting for merchant confirm!")
                btn_modal.current.click()
            } else {
                setMessage("An error occurred. Please check again!")
                btn_modal.current.click()
            }
        })
    }

    function handleCheckOrder() {
        if (orders.length !== 0) {
            setIsOrder(true)
        } else {
            setMessage("Please select the product to make payment!")
            btn_modal.current.click()
        }
    }


    return (
        <>
            <Header/>
            <div className="container">
                {carts !== undefined ? (
                    orders.length !== 0 && isOrder ? (
                        // order
                        <div className="container">
                            <h2>Bill</h2>
                            <section className="row" style={{margin: "10px"}}>
                                <div className="display-order col-6">
                                    <h3 className="title">Delivery address</h3>
                                    <div>
                                        <div className="input mb-3">
                                            <label htmlFor="name"><h4>Username</h4></label>
                                            <input type="text" className="form-control"
                                                   value={account.name} aria-label="Username"
                                                   aria-describedby="basic-addon1"/>
                                        </div>
                                        <div className="input mb-3">
                                            <label htmlFor="numberphone"><h4>Number Phone</h4></label>
                                            <input type="text" id="numberphone" className="form-control"
                                                   value={account.name} aria-label="Username"
                                                   aria-describedby="basic-addon1"/>
                                        </div>
                                        <div className="input mb-3 row" style={{width: "unset"}}>
                                            <div className="input mb-3 col-6">
                                                <label htmlFor="city"><h4>City</h4></label>
                                                <input type="text" id="city" className="form-control"
                                                       value={account.address.city.name} aria-label="Username"
                                                       aria-describedby="basic-addon1"/>
                                            </div>
                                            <div className="input mb-3 col-6">
                                                <label htmlFor="district"><h4>District</h4></label>
                                                <input type="text" id="district" className="form-control"
                                                       value={account.address.district.name} aria-label="Username"
                                                       aria-describedby="basic-addon1"/>
                                            </div>
                                        </div>
                                        <div className="input mb-3 row" style={{width: "unset"}}>
                                            <div className="input mb-3 col-6">
                                                <label htmlFor="ward"><h4>Ward</h4></label>
                                                <input type="text" id="ward" className="form-control"
                                                       value={account.address.ward.name} aria-label="Username"
                                                       aria-describedby="basic-addon1"/>
                                            </div>
                                            <div className="input mb-3 col-6">
                                                <label htmlFor="detail"><h4>Detail</h4></label>
                                                <input type="text" id="detail" className="form-control"
                                                       value={account.address.address_detail} aria-label="Username"
                                                       aria-describedby="basic-addon1"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="display-order col-6">
                                    <h3 className="title">Summary</h3>
                                    <div>
                                        <div className="row">
                                            <span className="text col-6"><h4>The number of products </h4></span>
                                            <span
                                                className="right number col-6"><h4><strong>{orders.length}</strong></h4></span>
                                        </div>
                                        <div className="row">
                                            <span className="text col-6"><h4>The total amount</h4> </span>
                                            <span
                                                className="right number col-6"><h4><strong>{total}</strong></h4></span>
                                        </div>
                                        <div className="row">
                                            <span className="text col-6"><h4>Discount code</h4> </span>
                                            <h4 className=" col-6"><select name="" id="">
                                                <option value="">Choice voucher coupon</option>
                                                <option value="">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                            </select></h4>

                                        </div>
                                        <div className="row">
                                            <span className="text col-6"><h4>Reduced amount</h4> </span>
                                            <span
                                                className="right number col-6"><h4><strong>{total}</strong></h4></span>
                                        </div>
                                        <div className="row">
                                            <span className="text col-6"><h4>Total payment amount</h4> </span>
                                            <span
                                                className="right number col-6"><h4><strong>{total}</strong></h4></span>
                                        </div>
                                        <div className="row">
                                            <div className="col-6"><h4>Payment methods</h4></div>
                                            <h4 className=" col-6">
                                                <select aria-label="Default select example">
                                                    <option>Choice payment method</option>
                                                    <option value="1">Payment on delivery</option>
                                                    <option value="2">Payment via e-wallet</option>
                                                </select>
                                            </h4>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-6" onClick={() => setIsOrder(false)}><h4
                                                style={{color: "rgb(220,53,69)", paddingTop: "10px"}}>Back cart</h4>
                                            </div>
                                            <div className="col-6" onClick={handleAddBill}>
                                                <button className="btn btn-outline-danger"><h4>Payment</h4></button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </div>
                        // end orders
                    ) : (
                        // cart
                        <div>
                            <h2>Cart</h2>
                            <section>
                                <div className="container">
                                    <div className="title-cart">
                                        <div className="header-item">
                                            <div className="row">
                                                <div className="col-1"><input onClick={handleAllOrder}
                                                                              className="input-checkbox"
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
                                                                    <div className="col-1"><input
                                                                        className="input-checkbox"
                                                                        type="checkbox"
                                                                        id={`checkbox-item-${cart.merchant.id_merchant}`}
                                                                        onClick={() => handleOrderCart(cart.merchant.id_merchant, item.id_cartDetail)}
                                                                    />
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
                                                                        className="number">{item.price.toLocaleString()}</span> VND</strong>
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
                                                                        className="number">{(item.price * item.quantity).toLocaleString()}</span> VND</strong>
                                                                    </div>
                                                                    <div className="col-1"
                                                                         onClick={() => deleteCart(item.id_cartDetail)}>
                                                                        <i
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
                            {/*end cart*/}

                            {/*total amount*/}
                            <section>
                                <div className="container">
                                    <div className="display-cart">
                                        <h5 className="mb-0"><Link to={"/"}
                                                                   className="text-body"><i
                                            className="fas fa-long-arrow-alt-left me-2"></i>Back
                                            Home</Link></h5>
                                        <div className="row">
                                            <div className="col-6"></div>
                                            <h4 className="col-4" style={{color: "red"}}>Total amount: <strong><span
                                                className="number">{total.toLocaleString()}</span></strong> VND</h4>
                                            <button className="btn btn-outline-danger col-2"
                                                    onClick={handleCheckOrder}>Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )
                ) : (
                    <div>
                        <h3 style={{textAlign: "center", marginTop: "100px"}}>Your cart is empty, let's go shopping</h3>
                        <Link to={"/"}>
                            <button className="btn-shopping btn btn-outline-danger"><h4>Go to shopping now</h4></button>
                        </Link>
                    </div>
                )}
            </div>
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