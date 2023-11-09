import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {deleteProduct} from "../service/ProductService";

export default function ProductList(props) {
    const [products, setProducts] = useState([]);
    const btn_modal = useRef()
    const [message, setMessage] = useState("")
    const [modalDelete, setModalDelete] = useState(false);
    const [indexDelete, setIndexDelete] = useState();

    useEffect(() => {
        axios.get('http://localhost:8080/api/products/1')
            .then(response => {
                setProducts(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleDeleteProduct = () => {
        deleteProduct(indexDelete).then( r => {
            if (r === true){
                setModalDelete(false)
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

    return (
        <>
            <div className="container">
                <section className="section-newsfeed">
                    <div className="content row">
                        <div className="col-4">a</div>
                        <div className="col-8">
                            {products.map((product, index) => (
                                <div className="list-item eatery-item-landing" key={index}>
                                    <div className="row">
                                        <div className="col-2">
                                            <div className="img-lazy figure square">
                                                <div className="img"
                                                     style={{backgroundImage: `url(${product.image})`}}></div>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <div className="content">
                                                <div className="name mb-5">
                                                    {product.name}
                                                </div>
                                                <div className="name mb-5">
                                                    {product.address}
                                                </div>
                                                <div className="promotion">
                                                    <i className="fa-solid fa-tag"></i>
                                                    <span>{product.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="d-flex justify-content-end">

                                                <button className="mr-2">Update</button>
                                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                        onClick={()=> displayModal(product.id_product)}>Delete</button>

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
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                                <button className="btn btn-danger"
                                                                        onClick={handleDeleteProduct}
                                                                        type="button">Confirm</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
