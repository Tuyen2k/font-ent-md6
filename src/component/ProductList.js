import {useEffect, useState} from "react";
import {getAllProductByMerchant} from "../service/ProductService";

export default function ProductList(props) {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        getAllProductByMerchant(props.id, searchInput)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchInput]);



    return (
        <>
            <div className="container">
                <section className="section-newsfeed">
                    <div className="content row">
                        <div className="col-4">

                            <div className="input-group rounded ">
                                <input type="search" className="form-control rounded"
                                       placeholder="Search" aria-label="Search"
                                       aria-describedby="search-addon" value={searchInput}
                                       onChange={(e) => setSearchInput(e.target.value)}
                                />
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
                                                    <button className="mr-3 btn btn-red">Update</button>
                                                    <button className="mx-2 btn btn-red">Delete</button>
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
        </>
    );
}