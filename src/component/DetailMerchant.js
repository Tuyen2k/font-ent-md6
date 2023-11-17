import {Link, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {couponByIdMerchant} from "../service/CouponService";
import {findMerchantById} from "../service/MerchantService";
import {findOneProduct, getAllProductByIdMerchant, getAllProductByMerchant} from "../service/ProductService";
import Header from "../layout/Header";

function DetailMerchant() {
    let {id} = useParams();
    const [product, setProduct] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [merchant, setMerchant] = useState({})
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState([]);
    const [load, setLoad] = useState(false);
    const [totalOderMoney, setTotalOderMoney] = useState();
    const [totalMoney, setTotalMoney] = useState();
    const [coupon, setCoupon] = useState(1);
    const [shouldCallFindAll, setShouldCallFindAll] = useState(true);

    useEffect(() => {
        findMerchantById(id).then(data => {
            setMerchant(data)
            couponByIdMerchant(data.id_merchant).then(r => {
                setCoupons(r)
            })
            if (shouldCallFindAll) {
            getAllProductByIdMerchant(data.id_merchant).then(r => {
                setProducts(r)
            })
        }})
    }, [products, shouldCallFindAll])

    const displayModal = async (id_product) => {
        try {
            const data = await findOneProduct(id_product);
            setProduct(data);
            setMerchant(data.merchant);
            setTotalOderMoney(data.priceSale)
            const total = data.priceSale - coupon
            setTotalMoney(total)
            const coupon = await couponByIdMerchant(data.merchant.id_merchant)
            setCoupons(coupon)
            if (product) {
                setLoad(true);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };


    const addition = () => {
        let quantityInput = document.getElementById("quantity_p");
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue <= 19) {
            let newValue = currentValue + 1;
            quantityInput.value = newValue;
            let total = product.priceSale * newValue;
            setTotalOderMoney(total)
        } else {
            quantityInput.value = currentValue
            let total = product.priceSale * currentValue;
            setTotalOderMoney(total)
        }
    }
    const subtraction = () => {
        let quantityInput = document.getElementById("quantity_p");
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue >= 2) {
            let newValue = currentValue - 1;
            quantityInput.value = newValue;
            let total = product.priceSale * newValue;
            setTotalOderMoney(total)
        } else {
            quantityInput.value = currentValue
            let total = product.priceSale * currentValue;
            setTotalOderMoney(total)
        }
    }

    const handleQuantityChange = (event) => {
        let newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue) && newValue >= 1 && newValue <= 20) {
            setQuantity(newValue);
            let total = product.priceSale * newValue;
            setTotalOderMoney(total)
        }
    };

    const handleInputName = (e) => {
        setProducts([])
        const value = e.target.value.toLowerCase();
        if (value === "") {
            setShouldCallFindAll(true)
        } else {
            const filteredProducts = products.filter(product => {
                const productName = product.name.toLowerCase();
                return productName.includes(value);
            });
            setProducts(filteredProducts);
            setShouldCallFindAll(false)
        }
    }



    return (
        <>
            <Header/>
            <Link to={"/"}>
                <svg style={{color: 'black'}} xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                     fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </Link>
            <div style={{height: '400px'}} className="now-detail-restaurant clearfix">
                <div style={{marginRight: '700px',width: '600px',marginBottom: '30px'}} className="input-group rounded ">
                    <input onKeyUp={handleInputName} style={{marginLeft: '200px'}} type="search" className="form-control rounded"
                           placeholder="Search" aria-label="Search"
                           aria-describedby="search-addon"
                    />
                </div>
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
                                        <img className="w-100 h-75" src={merchant.image} alt="Image"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 pb-5">
                            <h2 className="font-weight-semi-bold">{merchant.name} - Shop Online</h2>
                            <div style={{marginTop: "15px"}} className="d-flex mb-3">
                                <div className="text-primary mr-2">
                                    <small style={{color: '#d1d124'}} className="fas fa-star"></small>
                                    <small style={{color: '#d1d124'}} className="fas fa-star"></small>
                                    <small style={{color: '#d1d124'}} className="fas fa-star"></small>
                                    <small style={{color: '#d1d124'}} className="fas fa-star-half-alt"></small>
                                    <small style={{color: '#d1d124'}} className="far fa-star"></small>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className="promotion">
                                    <span style={{fontSize: '19px'}}>  Phone : <span style={{
                                        fontWeight: 'bold',
                                        fontSize: '19px',
                                        marginTop: '3px'
                                    }}>{merchant.phone}</span></span>
                                </div>
                            </div>
                            <div className="d-flex mb-4">
                                <h6 style={{marginTop: '4px', fontSize: '19px'}}
                                    className="text-dark font-weight-medium mb-0 mr-3">Email : </h6>
                                <form>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <label style={{marginLeft: '5px', fontSize: '19px', fontWeight: 'bold'}}
                                               htmlFor="color-1"> {merchant.email}</label>
                                    </div>
                                </form>
                            </div>
                            <h6>
                                <div style={{fontSize: '19px'}} className="promotion">
                                    Address :
                                    <span> {merchant.addressShop?.address_detail}, {merchant.addressShop?.ward.name}, {merchant.addressShop?.district.name}, {merchant.addressShop?.city.name}</span>
                                </div>
                            </h6>
                            <div style={{fontSize: '19px', marginTop: '15px'}} className="d-flex mb-3">
                                Opening hour :
                                <div style={{marginRight: '5px', fontSize: '19px'}}>{merchant.open_time} </div>
                                <span style={{marginRight: '8px', fontSize: '19px'}}> ~ </span>
                                <div style={{marginRight: '5px', fontSize: '19px'}}> {merchant.close_time}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/*container*/}
            <section className="home-page">
            <main className="container">
                <section>
                    <div className="content">
                        <div className="list-view">
            {/*list sp*/}
            <section className="section-newsfeed">
                <div className="title with-action">
                    <h2>List Product</h2>
                </div>

                <div className="content">
                    <div className="list-view">
                        {products && products.map(item => (
                            <div className="list-item eatery-item-landing">
                                    <div className="img-lazy figure square">
                                        <div className="img"
                                             style={{backgroundImage: `url(${item.image})`, color: 'black'}}>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div style={{textAlign: 'center', marginTop: '8px', color: 'black'}}
                                             className="name mb-5">
                                            {item.name}
                                        </div>
                                        <div style={{color: 'black'}} className="name mb-5">
                                            Purchase: {item.view}
                                        </div>
                                        <div className="promotion">
                                            <i className="fa-solid fa-tag"></i>
                                            <span style={{color: 'black'}}>{item.priceSale} VND</span>
                                        </div>
                                    </div>
                                <div className="name mb-5">
                                    <button  data-bs-toggle="modal"
                                             data-bs-target="#show_product"
                                             className="container-fluid.modal-body"
                                             onClick={() => displayModal(item.id_product)}
                                             type="button" data-toggle="modal"
                                             data-target="#exampleModalLong" style={{
                                        backgroundColor: '#d78c8c',
                                        padding: '7px',
                                        borderRadius: '10px',
                                        width: '180px',
                                        border: 'none',
                                        position: 'absolute',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        marginTop: '20px'
                                    }}>
                                        <a style={{display: "block", color: 'white'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19"
                                                 height="19"
                                                 fill="currentColor" className="bi bi-cash-coin"
                                                 viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                      d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                                                <path
                                                    d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                                                <path
                                                    d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                                                <path
                                                    d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                                            </svg>
                                            Oder now</a>
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                    <a className="btn-view-all" href="">
                        See all <i className="fa-solid fa-angle-right fa-bounce fa-lg"></i>
                    </a>
                </div>
            </section>
            {/*end list sp*/}
                        </div>
                    </div>
                </section>
            </main>
        </section>


            {/*modal*/}
            <div className="modal fade" id="show_product" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content" style={{minHeight: '75vh', minWidth: '100vh'}}>
                        <div className="modal-header">
                            <h3 style={{marginLeft: '350px'}} className="modal-title" id="show_productLabel">ODER
                                NOW</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{height: '520px'}}>
                            <div style={{marginTop: '30px'}} className="now-detail-restaurant clearfix">
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
                                                        <img style={{width: '300px', height: '250px'}}
                                                             src={product.image} alt="Image"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-7 pb-5">
                                            <h3 className="font-weight-semi-bold">{product.name}</h3>
                                            {/*link dẫn tới merchant, cần có cả id merchant để lấy dữ liệu. */}
                                            <Link>{merchant.name} - Shop Online</Link>
                                            <div style={{marginTop: '8px'}} className="d-flex mb-3">
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
                                                <input id="price_sale" type="number" value={product.priceSale}
                                                       hidden="hidden"/>
                                                {product.priceSale}VND
                                            </h3>
                                            <div className="d-flex mb-3">
                                                <h5 className="text-dark font-weight-medium mb-0 mr-3">Category : </h5>
                                                {product.categories && product.categories.map(item => (
                                                    <form>
                                                        <div
                                                            className="custom-control custom-radio custom-control-inline">
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
                                                        backgroundColor: '#df8686'
                                                    }} type="text" className="form-control bg-secondary text-center"
                                                           id="quantity_p"
                                                           defaultValue={quantity}
                                                           onChange={handleQuantityChange}/>
                                                    <div style={{marginLeft: '10px'}} className="input-group-btn"
                                                         id="plus_div">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '10px'
                        }}>

                            <button style={{backgroundColor: 'white', border: "none"}}>
                                <span style={{marginLeft: '40px'}}> Coupon</span>
                                <div>
                                    <svg style={{marginLeft: '50px'}} xmlns="http://www.w3.org/2000/svg" width="45"
                                         height="45"
                                         fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                                        <path
                                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                                        <path
                                            d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                                    </svg>
                                </div>
                            </button>
                            <div>
                                <h4 style={{
                                    marginRight: '60px',
                                    marginBottom: 0,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    Total order money : <span style={{
                                    color: 'red',
                                    marginLeft: '5px',
                                    marginRight: '5px'
                                }}>{totalOderMoney}</span> VND
                                </h4>
                                <h4 style={{
                                    marginRight: '60px',
                                    marginBottom: 0,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    Discount: <span style={{color: 'red'}}></span> VND
                                </h4>
                                <h4 style={{
                                    marginRight: '60px',
                                    marginBottom: 0,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    Total money: <span style={{color: 'red'}}>{totalMoney}</span> VND
                                </h4>
                                <h6 style={{marginBottom: 0}}>thrifty: {} </h6>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button style={{width: '400px', height: '40px', backgroundColor: '#df8686', border: 'none', marginRight: '280px'}} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Pay now</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default DetailMerchant