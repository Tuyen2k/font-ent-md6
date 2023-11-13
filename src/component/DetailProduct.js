import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    findAll,
    findOneProduct,
    getAllProductByIdMerchant,
    getProductById,
    MostPurchasedProducts
} from "../service/ProductService";
import BannerSlide from "./BannerSlide";
import {ProductByIdMerchant} from "../service/CouponService";

function DetailProduct() {
    let {id} = useParams();
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [everyoneLikes, setEveryoneLikes] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        findOneProduct(id).then(data => {
            setProduct(data)
        })
        getAllProductByIdMerchant(1).then(r => {
            //id ở trên dựa vào id merchant
            setProducts(r);
        });
        ProductByIdMerchant(1).then(r => {
            //id ở trên dựa vào id merchant
            setCoupons(r)
        })
        MostPurchasedProducts().then(r => {
            const limitedProducts = r.slice(0, 12);
            setEveryoneLikes([...limitedProducts]);
        })
    }, []);

    const displayModal = () => {
        setLoad(true)
    }


    return (
        <>

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
                                        <img className="w-100 h-100" src={product.image} alt="Image"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 pb-5">
                            <h3 className="font-weight-semi-bold">{product.name}</h3>
                            <div className="d-flex mb-3">
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
                                            <label style={{marginLeft: '5px'}} htmlFor="size-1"> {item.name}</label>
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
                                        <button style={{
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
                                    }} type="text" className="form-control bg-secondary text-center" id="quantity_p"
                                           value="1"/>
                                    <div style={{marginLeft: '10px'}} className="input-group-btn" id="plus_div">
                                        <button style={{
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
                                <button data-bs-toggle="modal"
                                        data-bs-target="#exampleModal" className="container-fluid.modal-body" onClick={displayModal}  type="button" data-toggle="modal" data-target="#exampleModalLong" style={{
                                    backgroundColor: '#df8686',
                                    padding: '10px',
                                    display: 'inline-block',
                                    borderRadius: '10px',
                                    width: '115px',
                                    border: 'none'
                                }}>
                                     <a style={{display: "block", color: 'white'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
                                             fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
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
                                <div style={{
                                    marginLeft: '10px',
                                    backgroundColor: '#df8686',
                                    padding: '10px',
                                    display: 'inline-block',
                                    borderRadius: '10px',
                                    width: '128px'
                                }}>
                                    <a href="#" style={{display: "block", color: 'white'}}>
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
                                        }} className="list-item eatery-item-landing">
                                            <div className="img-lazy figure square">
                                                <div className="img" style={{backgroundImage: `url(${item.image})`}}>
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
                                                <div className="img" style={{backgroundImage: `url(${item.image})`}}>
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
                                        }} className="list-item eatery-item-landing">
                                            <div className="img-lazy figure square">
                                                <div className="img" style={{backgroundImage: `url(${item.image})`}}>
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



            {/*modal*/}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content" style={{ minHeight: '75vh', minWidth: '100vh' }}>
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Choose a dish</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
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
                                                        <img className="w-100 h-100" src={product.image} alt="Image"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-7 pb-5">
                                            <h3 className="font-weight-semi-bold">{product.name}</h3>
                                            <div className="d-flex mb-3">
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
                                                            <label style={{marginLeft: '5px'}} htmlFor="size-1"> {item.name}</label>
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
                                                        <button style={{
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
                                                    }} type="text" className="form-control bg-secondary text-center" id="quantity_p"
                                                           value="1"/>
                                                    <div style={{marginLeft: '10px'}} className="input-group-btn" id="plus_div">
                                                        <button style={{
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
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>






        </>
    );
}

export default DetailProduct
