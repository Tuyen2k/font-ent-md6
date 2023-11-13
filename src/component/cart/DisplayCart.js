import {useEffect, useState} from "react";
import {getListCart} from "../../service/CartService";
import {Link} from "react-router-dom";


export default function DisplayCart() {

    const account = JSON.parse(localStorage.getItem("account"))
    const [carts, setCart] = useState([]);

    const handleMinus=()=>{

    }

    const handlePlus=()=>{

    }


    useEffect(() => {
        getListCart(11).then(res => {
            setCart(res)
            console.log(res)
        })
    }, [])

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

            {carts.map((cart, index)=>{
                return(
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
                                                Bún đậu mắm tôm, kèm 1 chả, 1 nước, 1 cá cơm hai ba bốn năm sáu bayr
                                            </div>
                                        </div>
                                        <div className="col-2"><span>50.000đ</span></div>
                                        <div className="col-2">
                                            <div style={{display: "flex"}}>
                                                <button className="btn px-2"
                                                        onClick={handleMinus}>
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <input id="form1" min="0" name="quantity" value={cart.quantity}
                                                       type="number"
                                                       className="form-control form-control-sm"/>
                                                <button className="btn px-2"
                                                        onClick={handlePlus}>
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-2">50.000đ</div>
                                        <div className="col-1"><i className="fa-solid fa-trash fa-lg" style={{color: "#ff0000"}}></i></div>
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
        </>
    )
}