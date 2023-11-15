import {Link, useParams} from "react-router-dom";

import React, {useEffect, useRef, useState} from "react";
import {addToCart} from "../service/CartService";
import {findOneProduct, getAllProductByIdMerchant, MostPurchasedProducts} from "../service/ProductService";
import {couponByIdMerchant} from "../service/CouponService";

function DetailProduct() {
    let {id} = useParams();
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [everyoneLikes, setEveryoneLikes] = useState([]);
    const [load, setLoad] = useState(false);
    const [merchant, setMerchant] = useState({})
    const [quantity, setQuantity] = useState(1);
    const account = JSON.parse(localStorage.getItem("account"))
    const btn_modal = useRef()
    const [message, setMessage] = useState("");


    useEffect(() => {
        findOneProduct(id).then(data => {
            setProduct(data)
            setMerchant(data.merchant)
            getAllProductByIdMerchant(data.merchant.id_merchant).then(r => {
                let arr = r.reverse();
                setProducts(arr.slice(0, 6));
            });
            couponByIdMerchant(data.merchant.id_merchant).then(r => {
                setCoupons(r)
            })
        })
        MostPurchasedProducts().then(r => {
            const limitedProducts = r.slice(0, 12);
            setEveryoneLikes([...limitedProducts]);
        })
    }, []);

    const displayModal = () => {
        setLoad(true)
    }
    const handleQuantityChange = (event) => {
        let newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue) && newValue >= 1 && newValue <= 20) {
            setQuantity(newValue);
            console.log(quantity)
        }
    };
    const addition = () => {
        let quantityInput = document.getElementById("quantity_p");
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue <= 19) {
            let newValue = currentValue + 1;
            quantityInput.value = newValue;
        } else {
            quantityInput.value = currentValue
        }
    }
    const subtraction = () => {
        let quantityInput = document.getElementById("quantity_p");
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue >= 2) {
            let newValue = currentValue - 1;
            quantityInput.value = newValue;
        } else {
            quantityInput.value = currentValue
        }
    }

    const handleAddToCart = () => {
        let price = document.getElementById("price_sale").value
        let quantity = document.getElementById("quantity_p").value
        let cartDetail = {price: price, quantity: quantity, product: product}
        console.log(cartDetail)
        addToCart(11, cartDetail).then(res => {
            if (res === true) {
                setMessage("Add to cart success!!!")
                btn_modal.current.click()
            }
        })
    }



    return (
        <>
            <Link to={"/"}>
                <svg style={{color: 'black'}} xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                     fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </Link>

            <div className="now-detail-restaurant clearfix">
                <div className="container">
                    <div className="row px-xl-5">
                        <div className="col-lg-5 pb-5">
                            <div id="product-carousel" className="carousel slide" data-ride="carousel">
                                <div style={{
                                    width: '480px',
                                    height: '500px',
                                    position: 'relative',
                                    float: 'left'
                                }}>
                                    <div className="carousel-item active">
                                        <img className="w-100 h-100" src={product.image} alt="Image"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 pb-5">
                            <h2 className="font-weight-semi-bold">{product.name}</h2>
                            {/*link dẫn tới merchant, cần có cả id merchant để lấy dữ liệu. */}

                            <Link to={`/detail_merchant/${merchant.id_merchant}`}>{merchant.name} - Shop Online</Link>
                            <div style={{marginTop: "8px"}} className="d-flex mb-3">
                                <div className="text-primary mr-2">
                                    <small style={{color: '#d1d124'}} className="fas fa-star"></small>
                                    <small style={{color: '#d1d124'}} className="fas fa-star"></small>
                                    <small style={{color: '#d1d124'}} className="fas fa-star"></small>
                                    <small style={{color: '#d1d124'}} className="fas fa-star-half-alt"></small>
                                    <small style={{color: '#d1d124'}} className="far fa-star"></small>
                                </div>
                                <small className="pt-1">{product.view}</small>
                            </div>
                            <h3 className="font-weight-semi-bold mb-4">
                                <h3 style={{fontSize: "smaller"}} className="text-muted ml-2">
                                    <del>{product.price}VND</del>
                                </h3>
                            </h3>
                            <h3 className="font-weight-semi-bold mb-4">
                                <input id="price_sale" type="number" value={product.priceSale} hidden="hidden"/>
                                {product.priceSale}VND
                            </h3>
                            <div className="d-flex mb-3">
                                <h5 className="text-dark font-weight-medium mb-0 mr-3">Category : </h5>
                                {product.categories && product.categories.map(item => (
                                    <form>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <label style={{marginLeft: '5px'}}
                                                   htmlFor="size-1"> {item.name}</label>
                                        </div>
                                    </form>
                                ))}
                            </div>
                            <div className="d-flex mb-4">
                                <h5 className="text-dark font-weight-medium mb-0 mr-3">Purchase : </h5>
                                <form>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <label htmlFor="color-1">{product.purchase}</label>
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex mb-4">
                                <h5 className="text-dark font-weight-medium mb-0 mr-3">Time make : </h5>
                                <form>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <label htmlFor="color-1">{product.timeMake}</label>
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex align-items-center mb-4 pt-2">
                                <div className="input-group quantity mr-3" style={{width: '130px'}}>
                                    <div className="input-group-btn" id="minus_div">
                                        <button onClick={subtraction} style={{
                                            backgroundColor: '#df8686',
                                            padding: '10px',
                                            display: 'inline-block',
                                            borderRadius: '10px',
                                            width: '35px',
                                            border: 'none'
                                        }}>
                                            {/*tru*/}
                                            <i style={{color: "white"}} className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input style={{
                                        borderRadius: '8px',
                                        marginLeft: '10px',
                                        color: 'white',
                                        backgroundColor: '#df8686',
                                    }} type="text" className="form-control bg-secondary text-center"
                                           id="quantity_p"
                                           defaultValue={quantity}
                                           onChange={handleQuantityChange}/>
                                    <div style={{marginLeft: '10px'}} className="input-group-btn" id="plus_div">
                                        <button onClick={addition} style={{
                                            backgroundColor: '#df8686',
                                            padding: '10px',
                                            display: 'inline-block',
                                            borderRadius: '10px',
                                            width: '35px',
                                            border: 'none'
                                        }}>
                                            {/*cong*/}
                                            <i style={{color: "white"}} className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    marginLeft: '10px',
                                    backgroundColor: '#df8686',
                                    padding: '10px',
                                    display: 'inline-block',
                                    borderRadius: '10px',
                                    width: '128px'
                                }}>
                                    <a onClick={handleAddToCart} style={{display: "block", color: 'white'}}>
                                        <i className="fa fa-shopping-cart mr-1"></i> Add to card</a>
                                </div>
                            </div>
                            <div className="d-flex pt-2">
                                <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                                <div className="d-inline-flex">
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
                                        <i className="fab fa-pinterest"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*list sp*/}
            <section className="home-page">
                <section className="section-newsfeed">
                    <main className="container">
                        <section className="section-newsfeed">
                            <div className="title with-action">
                                <h2>List product</h2>
                            </div>
                            <div className="content">
                                <div className="list-view">
                                    {products && products.map(item => (
                                        <button onClick={() => {
                                            setProduct(item)
                                            setMerchant(item.merchant)
                                        }} className="list-item eatery-item-landing">
                                            <div className="img-lazy figure square">
                                                <div className="img"
                                                     style={{backgroundImage: `url(${item.image})`}}>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <div className="name mb-5">
                                                    {item.name}
                                                </div>
                                                <div className="name mb-5">
                                                    Purchase: {item.purchase}
                                                </div>
                                                <div className="promotion">
                                                    <i className="fa-solid fa-tag"></i>
                                                    <span>{item.priceSale} VND</span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <a className="btn-view-all" href="">
                                    See all <i className="fa-solid fa-angle-right fa-bounce fa-lg"></i>
                                </a>
                            </div>
                        </section>
                    </main>
                </section>
            </section>
            {/*end list sp*/}


            {/*list coupon*/}
            <section className="home-page">
                <section className="section-newsfeed">
                    <main className="container">
                        <section className="section-newsfeed">
                            <div className="title with-action">
                                <h2>List Coupon</h2>
                            </div>
                            <div className="content">
                                <div className="list-view">
                                    {coupons && coupons.map(item => (
                                        <button className="list-item eatery-item-landing">
                                            <div className="img-lazy figure square">
                                                <div className="img"
                                                     style={{backgroundImage: `url(${item.image})`}}>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <div className="name mb-5">
                                                    {item.name}
                                                </div>
                                                <p>Discount: {item.discountAmount ? item.discountAmount + "VND" : item.percentageDiscount + "%"}
                                                </p>
                                                <div className="promotion">
                                                    <h5>Quantity: {item.quantity}</h5>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <a className="btn-view-all" href="">
                                    See all <i className="fa-solid fa-angle-right fa-bounce fa-lg"></i>
                                </a>
                            </div>
                        </section>
                    </main>
                </section>
            </section>
            {/*end list coupon*/}


            {/*Everyone likes*/}
            <section className="home-page">
                <section className="section-newsfeed">
                    <main className="container">
                        <section className="section-newsfeed">
                            <div className="title with-action">
                                <h2>Everyone likes</h2>
                            </div>
                            <div className="content">
                                <div className="list-view">
                                    {everyoneLikes && everyoneLikes.map(item => (
                                        <button onClick={() => {
                                            setProduct(item)

                                            setMerchant(item.merchant)
                                        }} className="list-item eatery-item-landing">
                                            <div className="img-lazy figure square">
                                                <div className="img"
                                                     style={{backgroundImage: `url(${item.image})`}}>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <div className="name mb-5">
                                                    {item.name}
                                                </div>
                                                <div className="name mb-5">
                                                    Purchase: {item.purchase}
                                                </div>
                                                <div className="promotion">
                                                    <i className="fa-solid fa-tag"></i>
                                                    <span>{item.priceSale} VND</span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <a className="btn-view-all" href="">
                                    See all <i className="fa-solid fa-angle-right fa-bounce fa-lg"></i>
                                </a>
                            </div>
                        </section>
                    </main>
                </section>
            </section>
            {/*end list sp*/}

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

export default DetailProduct
