import {getAllProductByMerchant} from "../service/ProductService";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {deleteProduct} from "../service/ProductService";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function ProductList(props) {
    const [products, setProducts] = useState([]);
    const [list, setList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const btn_modal = useRef()
    const [message, setMessage] = useState("")
    const [modalDelete, setModalDelete] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [indexDelete, setIndexDelete] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        getAllProductByMerchant(1, searchInput)
            .then((data) => {
                let arr = data.reverse();
                setProducts(arr);
                setList(arr)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchInput, isDelete]);


    const handleDeleteProduct = () => {
        deleteProduct(indexDelete).then(r => {
            if (r === true) {
                setModalDelete(false)
                setDelete(!isDelete)
                setMessage("Delete product success!!!")
                btn_modal.current.click();
            } else {
                setMessage("An error occurred!!!")
                btn_modal.current.click();
            }
        })
    }

    const displayModal = (id_product) => {
        setModalDelete(true)
        setIndexDelete(id_product)
    }

    const searchName = (e) => {
        let result = []
        for (const item of list) {
            if (item.name.toLowerCase().includes(e.toLowerCase())) {
                result.push(item)
            }
        }
        setProducts([...result])
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
            <div className="container">
                <section className="section-newsfeed">
                    <div className="content row">
                        <div className="col-4">
                            <div style={{marginTop: "30px"}} className="input-group rounded ">
                                <div className="input-group rounded ">
                                    <input type="search" className="form-control rounded"
                                           placeholder="Search" aria-label="Search"
                                           aria-describedby="search-addon" onKeyUp={(e) => searchName(e.target.value)}
                                    />
                                </div>
                                <span style={{marginTop: "30px", borderRadius: '8px'}} className="btn btn-info" >
                                            <Link style={{color: "black"}} to={"/product/create"}>Create </Link></span>
                                <span style={{marginTop: "30px", marginLeft: '20px', borderRadius: '8px', backgroundColor: '#df8686'}} className="btn btn-light">
                                            <Link style={{color: "black"}}
                                                  to={`/list_coupon/${1}`}>List coupon</Link></span>
                                <span style={{marginTop: "30px", marginLeft: '20px', borderRadius: '8px', backgroundColor: '#df8686'}} className="btn btn-light">
                                            <Link style={{color: "black"}}
                                                  to={`/oder_manager/${1}`}>Oder Manage</Link></span>
                            </div>
                        </div>
                        <div className="col-8">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <div
                                        className="list-item eatery-item-landing"
                                        key={index}
                                    >
                                        <div className="row">
                                            <div className="col-2">
                                                <div className="img-lazy figure square">
                                                    <div
                                                        className="img"
                                                        style={{
                                                            backgroundImage: `url(${product.image})`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="content">
                                                    <div className="name mb-5">{product.name}</div>
                                                    <div className="name mb-5">{product.address}</div>
                                                    <div className="promotion">
                                                        <i className="fa-solid fa-tag"></i>
                                                        <span>{product.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="d-flex justify-content-end">

                                                    <button className="mr-2 btn btn-warning"
                                                            onClick={() => navigate(`/product/update/${product.id_product}`)}>Update
                                                    </button>

                                                    <button type="button" className="mx-2 btn btn-primary"
                                                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                            onClick={() => displayModal(product.id_product)}>Delete
                                                    </button>

                                                    <div className="modal fade" id="staticBackdrop"
                                                         data-bs-backdrop="static"
                                                         data-bs-keyboard="false" tabIndex="10"
                                                         aria-labelledby="staticBackdropLabel"
                                                         aria-hidden={modalDelete}>
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title"
                                                                        id="staticBackdropLabel">Modal Delete</h5>
                                                                    <button type="button" className="btn-close"
                                                                            data-bs-dismiss="modal"
                                                                            aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    Are you sure?
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-info"
                                                                            data-bs-dismiss="modal">Cancel
                                                                    </button>
                                                                    <button className="mx-2 btn btn-primary"
                                                                            onClick={handleDeleteProduct}
                                                                            type="button">Confirm
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No search results found.</div>
                            )}
                        </div>
                    </div>
                </section>
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
    );
}
