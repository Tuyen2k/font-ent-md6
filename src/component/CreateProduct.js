import React, {useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {saveProduct} from "../service/ProductService";
import {getAllCategories} from "../service/CategoryService";
import {upImageFirebase} from "../firebase/Upfirebase";
import * as yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";


export default function CreateProduct() {
    const [file, setFile] = useState(undefined)
    const [load, setLoad] = useState(true)
    const [isExist, setExist] = useState(true)
    const inputFile = useRef()
    const btn_modal = useRef()
    const [message, setMessage] = useState("")
    const [categoriesDB, setCategoriesDB] = useState([])
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({
        name: "",
        price: "",
        image: "",
        timeMake: "",
        description: ""
    })
    const navigate = useNavigate()

    useEffect(() => {
        getAllCategories().then(res => {
            setCategoriesDB([...res])
        })
    }, [])

    const handledCreate = (e) => {
        if (file === undefined) {
            setMessage("Please choose image for the product!!!")
            btn_modal.current.click();
            return
        }
        if (categories === undefined || categories.length === 0) {
            setMessage("Please select category for the product!!!")
            btn_modal.current.click();
            return
        }
        setLoad(false)
        upImageFirebase(file).then(res => {
            let a = {id_merchant: 1}
            let product = {...e, image: res.name, categories: categories, merchant: a, priceSale: e.price * 0.95}
            saveProduct(product).then(response => {
                if (response) {
                    setMessage("Create product success!!!")
                    btn_modal.current.click();          // onclick btn modal
                    setLoad(true)
                    setExist(false)
                } else {
                    setMessage("Action error occurred. Please check again!!!")
                    btn_modal.current.click();          // onclick btn modal
                    setLoad(true)
                }
            })
        }).catch(Error => {
            setMessage("Action error occurred. Please check again!!!")
            btn_modal.current.click();          // onclick btn modal
            setLoad(true)
            console.log("up file" + Error)
        })
    }
    const handledClickInput = () => {
        inputFile.current.click();
    }
    const handledCategories = (id_category) => {
        if (categories.length !== 0) {
            let flag = true;
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].id_category === id_category) {
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

    const handledInputFile = (file) => {
        setFile(file);
    }

    const schema = yup.object().shape({
        name: yup.string().required("Name is a data field that cannot be left blank."),
        price: yup.number().required("Price is a data field that cannot be left blank.").min(5000, "Price cannot be lower than 5000."),
        timeMake: yup.string().required("Time make is a data field that cannot be left blank.")
    })


    return (
        <>
            <Header/>
            {load ? (
                    <div className="form-input">
                        <h2 className="title">Add new</h2>
                        <hr/>
                        <Formik onSubmit={(e) => handledCreate(e)}
                                initialValues={product} validationSchema={schema}>
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
                                            <input ref={inputFile} name="image" type="file" id="formFile"
                                                   style={{display: 'none'}} onChange={(e) => handledInputFile(e.target.files[0])}/>
                                            {file === undefined ? (
                                                <div style={{backgroundColor: "white", position: "relative", height: "264px"}}
                                                     className="form-control">
                                                    <div>
                                                        <img className='image-input' alt="image"
                                                             src={"https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png"}/>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div style={{backgroundColor: "white", width: "496px"}}
                                                     className="form-control">
                                                    <div>
                                                        <img className="image-input" src={URL.createObjectURL(file)}
                                                             alt='image'/>
                                                    </div>
                                                </div>)}
                                            {/*<ErrorMessage name="image" component="span" className="error"/>*/}
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
                                    <label className="form-label">Categories <span style={{color: "red"}}>(*)</span></label>
                                    <div className="form-checkbox">
                                        {categoriesDB.map((category, index = 0) => {
                                            return (
                                                <div className="form-check" key={index}>
                                                    <input className="form-check-input" type="checkbox"
                                                           onChange={(e) => handledCategories(e.target.value)}
                                                           value={category.id_category} id={"categories" + index}/>
                                                    <label className="form-check-label"
                                                           htmlFor={"categories" + index}>{category.name}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <hr/>
                                <div className="div-button">
                                    <div className="row" style={{display: "flex"}}>
                                        <Link className="col-1" to={'/list'} style={{width: '50px', color : "black", paddingTop: "6px"}} type="submit">Back</Link>
                                        <div className={"col-10"}>
                                            <button style={{width: '150px', marginLeft: "45%"}} type="submit"
                                                    className="btn btn-outline-danger ">Create
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
                        <div className="spinner-border" style={{width: "4rem", height: "4rem", marginTop: "40vh"}}
                             role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

            <Footer/>
            {/*{message !== "" && <Demo mess={message} test={true}/>}*/}

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