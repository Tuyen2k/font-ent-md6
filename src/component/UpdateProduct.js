import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getAllCategories} from "../service/CategoryService";
import {getProductById, saveProduct} from "../service/ProductService";
import * as yup from "yup";
import {upImageFirebase} from "../firebase/Upfirebase";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {toast, ToastContainer} from "react-toastify";


export default function UpdateProduct() {
    const [product, setProduct] = useState(undefined)
    const [load, setLoad] = useState(true)
    const [isExist, setExist] = useState(true)
    const [check, setCheck] = useState(true)
    const [categoriesDB, setCategoriesDB] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const [file, setFile] = useState(undefined)
    const inputFile = useRef()
    const btn_modal = useRef()
    const [message, setMessage] = useState("")
    const {id} = useParams();


    useEffect(() => {
        getAllCategories().then(res => {
            setCategoriesDB([...res])
        })
    }, [])

    useEffect(() => {
        getProductById(id).then(res => {
            if (res !== undefined) {
                setProduct(res)
                setCategories(res.categories)
            } else {
                setExist(false)
                toast.error("Product not found!!!", {containerId:"update-product"})
                setTimeout(()=>{
                    navigate("/list")
                },3000)
            }
        })
    }, [check])


    async function handledUpdate(e) {
        if (categories === undefined || categories.length === 0) {
            toast.error("Please select category for the product!!!", {containerId:"update-product"})
            return
        }
        setLoad(false)
        let a = {id_merchant: 1}
        let product = {...e, categories: categories, merchant: a, priceSale: e.price * 0.95}
        try {
            if (file !== undefined) {
                let image = await upImageFirebase(file)
                product = {...product, image: image.name}
            }
            saveProduct(product).then(response => {
                if (response === true) {
                    setCheck(!check)
                    toast.success("Update product success!!!", {containerId:"update-product"})
                    setLoad(true)
                    setExist(false)
                } else {
                    toast.error("Action error occurred. Please check again!!!", {containerId:"update-product"})
                    setLoad(true)
                }
            })
        } catch (Error) {
            setFile(undefined)
            toast.error("Action error occurred. Please check again!!!", {containerId:"update-product"})
            setLoad(true)
            setExist(false)
        }
    }

    const handledClickInput = () => {
        inputFile.current.click();
    }

    const handledCategories = (id_category) => {
        if (categories.length !== 0) {
            let flag = true;
            for (let i = 0; i < categories.length; i++) {
                if (+categories[i].id_category === +id_category) {
                    categories.splice(i, 1)
                    flag = false
                }
            }
            if (flag) {
                categories.push({id_category: id_category})
            }
        } else {
            categories.push({id_category: id_category})
        }
        setCategories([...categories])
    }
    const schema = yup.object().shape({
        name: yup.string().required("Name is a data field that cannot be left blank."),
        price: yup.number().required("Price is a data field that cannot be left blank.").min(5000, "Price cannot be lower than 5000."),
        timeMake: yup.string().required("Time make is a data field that cannot be left blank.")
    })

    return (
        <>
            <Header/>
            <ToastContainer enableMultiContainer containerId={"update-product"} position="top-right" autoClose={2000} pauseOnHover={false}
                            style={{width: "400px"}}/>
            {load ? (
                    <div className="form-input">
                        <h2 className="title">Update</h2>
                        <hr/>
                        <Formik onSubmit={(e) => handledUpdate(e)}
                                initialValues={product}
                                validationSchema={schema}
                                enableReinitialize={true}>
                            <Form style={{marginLeft: "20px", marginRight: "20px"}}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="input-form-label mb-3">
                                            <label className="form-label" id="name">Name <span style={{color: "red"}}>(*)</span></label>
                                            <Field type="text" className="form-control" name="name" placeholder="Enter name product"
                                                   aria-describedby="name"/>
                                            <ErrorMessage name="name" component="span" className="error"/>
                                        </div>
                                        <div className="input-form-label mb-3">
                                            <label className="form-label" id="price">Price <span style={{color: "red"}}>(*)</span></label>
                                            <Field type="text" className="form-control" name="price"
                                                   placeholder="Enter price product"
                                                   aria-describedby="price"/>
                                            <ErrorMessage name="price" component="span" className="error"/>
                                        </div>
                                        <div className="input-form-label mb-3">
                                            <label className="form-label" id="timeMake">Time Make <span style={{color: "red"}}>(*)</span></label>
                                            <Field type="text" className="form-control" name="timeMake"
                                                   placeholder="Enter time make product"
                                                   aria-describedby="timeMake"/>
                                            <ErrorMessage name="timeMake" component="span" className="error"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-form-label mb-3" onClick={handledClickInput}>
                                            <label className="form-label">Image <span style={{color: "red"}}>(*)</span></label>
                                            <input ref={inputFile} name="image" type="file" id="form-file-create"
                                                   style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])}/>
                                            {file === undefined ? (
                                                <div style={{backgroundColor: "white", position: "relative", height: "264px"}}
                                                     className="form-control">
                                                    {product !== undefined && product.image !== "" ? (
                                                        <div>
                                                            <img className="image-input" src={product.image}
                                                                 alt='image'/>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <img className='image-input' alt="image"
                                                                 src={"https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png"}/>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div style={{backgroundColor: "white", position: "relative", height: "264px"}}
                                                     className="form-control">
                                                    <div>
                                                        <img className="image-input" src={URL.createObjectURL(file)}
                                                             alt='image'/>
                                                    </div>
                                                </div>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="input-form-label mb-3">
                                    <label className="form-label" id="description">Description</label>
                                    <Field as="textarea" className="form-control" style={{paddingLeft : "2px", height: "80px", resize: "none"}} name="description"
                                           placeholder="Enter description product"
                                           aria-describedby="description"/>
                                </div>
                                <div className="div-checkbox mb-3 row ">
                                    <label className="form-label" >Categories <span style={{color: "red"}}>(*)</span></label>
                                    <div className="form-checkbox">
                                        {categoriesDB.map((category, index = 0) => {
                                            let flag = false;
                                            for (const item of categories) {
                                                if (item.id_category === category.id_category) {
                                                    flag = true;
                                                }
                                            }
                                            if (flag) {
                                                flag = false
                                                return (
                                                    <div className="form-check" key={index}>
                                                        <input className="form-check-input" type="checkbox"
                                                               onChange={(e) => handledCategories(e.target.value)}
                                                               value={category.id_category} id={"categories" + index}
                                                               checked/>
                                                        <label className="form-check-label"
                                                               htmlFor={"categories" + index}>{category.name}</label>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className="form-check" key={index}>
                                                        <input className="form-check-input" type="checkbox"
                                                               onChange={(e) => handledCategories(e.target.value)}
                                                               value={category.id_category} id={"categories" + index}/>
                                                        <label className="form-check-label"
                                                               htmlFor={"categories" + index}>{category.name}</label>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                                <hr/>
                                <div className="div-button">
                                    <div className="row" style={{display: "flex"}}>
                                        <Link className="col-1" to={'/list'} style={{width: '50px', color : "black", paddingTop: "6px"}} type="submit">Back</Link>
                                        <div className={"col-10"}>
                                            <button style={{width: '150px', marginLeft: "45%"}} type="submit"
                                                    className="btn btn-outline-danger ">Update
                                            </button>
                                        </div>
                                        <div className="col-1"></div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                )
                : (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" style={{width: "4rem", height: "4rem", marginTop: "20vh", marginBottom:"20vh"}}
                             role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

            <Footer/>

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
                            {isExist ? (
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                            ):(
                                <button type="button" className="btn btn-secondary" onClick={() => navigate("/list")}
                                        data-bs-dismiss="modal">Close
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}