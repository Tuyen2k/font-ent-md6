import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import {storage} from "../firebase/config";

export default function Register1() {
    const [isUpload, setIsUpload] = useState(false);
    const [account, setAccount] = useState({
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: {
            id: ""
        },
        image: ""

    });
    let [address, setAddress] = useState([]);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const handledImage = (e) => {
        const file = e.target.files[0]
        if (!file) return;
        setIsUpload(false)
        const storageRef = ref(storage, `files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed",
            () => {
            },
            (error) => {
                alert('error')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    let urlImage = downloadURL;
                    setImage(urlImage)
                    setIsUpload(true)
                })
            })
    }

    function createRegister(e) {
        let s = {...e, image: image}
        axios.post('http://localhost:8080/api/accounts/register', s).then(c => {
            alert(" success")
            navigate("/")
        })
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/address').then(c => {
            setAddress(c.data)
        })
    }, [])
    return (
        <>
            <div>
                <Formik initialValues={account}
                        onSubmit={(e) => createRegister(e)}>
                    <Form>
                        <label htmlFor={'name'}>Name</label>
                        <Field name ={'name'} id ={'name'}/>
                        <label htmlFor={'phone'}>Phone</label>
                        <Field name ={'phone'}  id ={'phone'}/>
                        <label htmlFor={'password'}>Password</label>
                        <Field name ={'password'} id ={'password'}/>
                        <label htmlFor={'confirmPassword'}>ConfirmPassword</label>
                        <Field name ={'confirmPassword'} id ={'confirmPassword'}/>
                        <input type={'file'} name={'image'} id="{'image'}"
                               onChange={(e) => handledImage(e)}/>
                        <label htmlFor={'address'}>Address</label>
                        <Field as={'select'} name={'address.id'} id={"address"}
                        >
                            <option >Address</option>
                            {address.map(item => (
                                <option value={item.id}>{item.name}</option>

                            ))}
                        </Field>
                        { isUpload &&
                            <button type={'submit'}>Register</button>
                        }
                    </Form>
                </Formik>
            </div>
        </>
    )

}