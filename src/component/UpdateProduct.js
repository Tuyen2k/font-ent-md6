import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getAllCategories} from "../service/CategoryService";
import {getProductById, saveProduct} from "../service/ProductService";
import * as yup from "yup";
import {upImageFirebase} from "../firebase/Upfirebase";


export default function UpdateProduct() {
    const [product, setProduct] = useState(undefined)
    const [load, setLoad] = useState(true)
    const [isExist, setExist] = useState(true)
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
            console.log(res)
            if (res !== undefined) {
                setProduct(res)
                setCategories(res.categories)
            } else {
                setExist(false)
                setMessage("Product not found!!!")
                btn_modal.current.click()
            }
        })
    }, [])


    async function handledUpdate(e) {
        if (categories === undefined || categories.length === 0) {
            setMessage("Please select category for the product!!!")
            btn_modal.current.click();
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
                if (response) {
                    setMessage("Update product success!!!")
                    btn_modal.current.click();          // onclick btn modal
                    setLoad(true)
                    setExist(false)
                } else {
                    setMessage("Action error occurred. Please check again!!!")
                    btn_modal.current.click();          // onclick btn modal
                    setLoad(true)
                }
            })
            console.log("create")
            console.log(product)
        } catch (Error) {
            setFile(undefined)
            setMessage("Action error occurred. Please check again!!!")
            btn_modal.current.click();          // onclick btn modal
            setLoad(true)
            setExist(false)
            console.log("up file" + Error)
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
            {load ? (
                    <div className="form-input">
                        <h1 className="title">Update Product</h1>
                        <Formik onSubmit={(e) => handledUpdate(e)}
                                initialValues={product}
                                validationSchema={schema}
                                enableReinitialize={true}>
                            <Form>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="name">Name</span>
                                    <Field type="text" className="form-control" name="name" placeholder="Enter name product"
                                           aria-describedby="name"/>
                                    <ErrorMessage name="name" component="span" className="error"/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="price">Price</span>
                                    <Field type="text" className="form-control" name="price"
                                           placeholder="Enter price product"
                                           aria-describedby="price"/>
                                    <ErrorMessage name="price" component="span" className="error"/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="timeMake">Time Make</span>
                                    <Field type="text" className="form-control" name="timeMake"
                                           placeholder="Enter time make product"
                                           aria-describedby="timeMake"/>
                                    <ErrorMessage name="timeMake" component="span" className="error"/>
                                </div>
                                <div style={{display: "flex"}} className="div-checkbox input-group mb-3 row ">
                                    <span className="input-group-text col-2" style={{height: "37.6px"}}>Categories</span>
                                    <div className="form-checkbox col-10">
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
                                <div className="mb-3" style={{display: "flex"}} onClick={handledClickInput}>
                                    <span className="input-group-text" style={{height: "37.6px"}}>Image Product</span>
                                    <input ref={inputFile} className="form-control" name="image" type="file" id="formFile"
                                           style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])}/>
                                    {file === undefined ? (
                                        <div style={{backgroundColor: "white", width: "325.6px", marginLeft: "20px"}}
                                             className="form-control">
                                            {product !== undefined && product.image !== "" ? (
                                                <div>
                                                    <img className="image-input" src={product.image}
                                                         alt='image'/>
                                                </div>
                                            ) : (
                                                <div className='image-input'
                                                     style={{backgroundImage: `url("https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png")`}}>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div style={{backgroundColor: "white", width: "325.6px", marginLeft: "20px"}}
                                             className="form-control">
                                            <div>
                                                <img className="image-input" src={URL.createObjectURL(file)}
                                                     alt='image'/>
                                            </div>
                                        </div>)}
                                </div>
                                <hr/>
                                <div className="div-button">
                                    <button className="btn btn-outline-primary" type={"submit"}>Save</button>
                                    <button className="btn btn-outline-primary" type={"button"}>Back Home</button>
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