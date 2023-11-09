import BannerSlide from "./BannerSlide";
import {useEffect, useRef, useState} from "react";
import {findAll, searchByCategory} from "../service/ProductService";
import {getAllCategories} from "../service/CategoryService";
export default function Home(){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [shouldCallFindAll, setShouldCallFindAll] = useState(true);
    const btn_modal = useRef()
    const [message, setMessage] = useState("")
    const [nameProduct, setNameProduct] = useState("")

    useEffect(() => {
        if (shouldCallFindAll) {
            findAll().then(r => {
                console.log(r)
                setNameProduct("New Product")
                setProducts(r);
                setShouldCallFindAll(false);
            });
        }
        getAllCategories().then(category => {
            setCategories(category)
        })
    }, [products, shouldCallFindAll]);

    const handleInputName = (e) => {
        setProducts([])
        const value = e.target.value.toLowerCase();
        if (value === ""){
            setShouldCallFindAll(true)
        } {
            const filteredProducts = products.filter(product => {
                const productName = product.name.toLowerCase();
                return productName.includes(value);
            });
            setNameProduct("Product")
            setProducts(filteredProducts);
        }
    }

    const handleInputCategory = (id_category) => {
        console.log(id_category)
        searchByCategory(id_category).then(r => {
            if (r.length > 0){
                setNameProduct("Product")
                setProducts(r)
            } else {
                setMessage("There are no results on this category!!!")
                btn_modal.current.click();
            }
        })

    }
    return(
        <>
            {/*Home*/}
            <section className="home-page">
                <section className="top-banner loship" style={{backgroundImage:`url("https://loship.vn/dist/images/home-banner-18062021.jpg")`}}>
                    <h1>
                        <span>
                            Order Your Favorite
                            <br/>
                            <span className="banner-title-highlight">
                                With Freeshipping
                            </span>
                        </span>
                    </h1>
                    <div className="wrapper">
                        <div className="search-box">
                            <span className="btn bg-transparent text-blue btn-search btn-link">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input onKeyUp={handleInputName} type="text" className="search-box-input" placeholder="find the nearest location"/>
                        </div>
                    </div>
                </section>
                <section className="search-global-address">
                    <div className="search-global-address-content container">
                        Deliver to
                        <div className="address">
                            <i className="fa-solid fa-location-dot"></i>
                            <div className="content">Hà Nội</div>
                            <i className="fa-solid fa-angle-right fa-bounce fa-lg"></i>
                        </div>
                    </div>
                </section>

                {/*Container*/}
                <main className="container">
                    <section>
                        <div className="content">
                            <div className="list-view">
                                <BannerSlide/>
                                {/*caroseul*/}

                                {/*List category*/}
                                <section className="section-newsfeed">
                                    <div className="content-category">
                                        <div className="list-view">
                                            {categories && categories.map(item => (
                                            <div className="list-item category-item" >
                                                <div className="img-lazy figure square">
                                                    <div onClick={ () => handleInputCategory(item.id_category)} className="img" style={{backgroundImage : `url(${item.image})`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="metadata">
                                                        <b>{item.name}</b>
                                                    </div>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                                {/*End List Category*/}



                                {/*list sp*/}
                                <section className="section-newsfeed">
                                    <div className="title with-action">
                                        <h2>{nameProduct}</h2>
                                    </div>

                                    <div className="content">
                                        <div className="list-view">
                                            {products && products.map(item => (
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url(${item.image})`}}>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        {item.name}
                                                    </div>
                                                    <div className="name mb-5">
                                                       Lượt mua:  {item.view}
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>{item.priceSale} VND</span>
                                                    </div>
                                                </div>
                                            </a>
                                            ))}
                                        </div>
                                        <a className="btn-view-all" href="">
                                            See all <i className="fa-solid fa-angle-right fa-bounce fa-lg"></i>
                                        </a>
                                    </div>
                                    </section>
                                {/*end list sp*/}

                                {/*list merchant*/}
                                <section className="section-newsfeed">
                                    <div className="title with-action">
                                        <h2>New Restaurant</h2>
                                    </div>
                                    <div className="content">
                                        <div className="list-view">
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/bep-co-gu-quan-ba-dinh-ha-noi-1698291728237514591-eatery-avatar-1698767119?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        BẾP CÓ GU
                                                    </div>
                                                    <div className="name mb-5">
                                                        address
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/banh-my-tien-dat-quan-hai-ba-trung-ha-noi-1626492571915304108-eatery-avatar-1634906664?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        CƠM NGON 10 KHÓ CƠ SỞ 2 BÌNH THẠNH HỒ CHÍ MINH
                                                    </div>
                                                    <div className="name mb-5">
                                                        số 44 ngõ 123/324 Nguyễn Chí Thanh, Ba Đình, Hà Nội
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/com-hop-and-my-tron-seo-seo-quan-quan-ba-dinh-ha-noi-1656311621174026693-eatery-avatar-1656501784?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        BẾP CÓ GU
                                                    </div>
                                                    <div className="name mb-5">
                                                        address
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/bep-co-gu-quan-ba-dinh-ha-noi-1698291728237514591-eatery-avatar-1698767119?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        BẾP CÓ GU
                                                    </div>
                                                    <div className="name mb-5">
                                                        address
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/bep-co-gu-quan-ba-dinh-ha-noi-1698291728237514591-eatery-avatar-1698767119?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        BẾP CÓ GU
                                                    </div>
                                                    <div className="name mb-5">
                                                        address
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/bep-co-gu-quan-ba-dinh-ha-noi-1698291728237514591-eatery-avatar-1698767119?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        BẾP CÓ GU
                                                    </div>
                                                    <div className="name mb-5">
                                                        address
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/bep-co-gu-quan-ba-dinh-ha-noi-1698291728237514591-eatery-avatar-1698767119?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        BẾP CÓ GU
                                                    </div>
                                                    <div className="name mb-5">
                                                        address
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/bep-co-gu-quan-ba-dinh-ha-noi-1698291728237514591-eatery-avatar-1698767119?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        BẾP CÓ GU
                                                    </div>
                                                    <div className="name mb-5">
                                                        address
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/bep-co-gu-quan-ba-dinh-ha-noi-1698291728237514591-eatery-avatar-1698767119?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        BẾP CÓ GU
                                                    </div>
                                                    <div className="name mb-5">
                                                        address
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/bep-co-gu-quan-ba-dinh-ha-noi-1698291728237514591-eatery-avatar-1698767119?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        BẾP CÓ GU
                                                    </div>
                                                    <div className="name mb-5">
                                                        address
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/bep-co-gu-quan-ba-dinh-ha-noi-1698291728237514591-eatery-avatar-1698767119?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        BẾP CÓ GU
                                                    </div>
                                                    <div className="name mb-5">
                                                        address
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="list-item eatery-item-landing" href="">
                                                <div className="img-lazy figure square">
                                                    <div className="img" style={{backgroundImage : `url("https://tea-3.lozi.vn/v1/images/resized/bep-co-gu-quan-ba-dinh-ha-noi-1698291728237514591-eatery-avatar-1698767119?w=200&type=f")`}}></div>
                                                </div>
                                                <div className="content">
                                                    <div className="name mb-5">
                                                        BẾP CÓ GU
                                                    </div>
                                                    <div className="name mb-5">
                                                        address
                                                    </div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>10.000đ off</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <a className="btn-view-all" href="">
                                            See all <i className="fa-solid fa-angle-right fa-bounce fa-lg"></i>
                                        </a>
                                    </div>
                                </section>
                                {/*end list merchant*/}
                            </div>
                        </div>
                    </section>
                </main>
            </section>
            {/*End Home*/}

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