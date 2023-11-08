import {useEffect, useState} from "react";
import axios from "axios";

export default function ProductList(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/products/1')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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
                                                     style={{backgroundImage: `url("https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg")`}}></div>
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
                                                <button className="mr-2">Sửa</button>
                                                <button>Xóa</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
