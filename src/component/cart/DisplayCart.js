import {useEffect, useState} from "react";
import {getListCart} from "../../service/CartService";
import {useParams} from "react-router-dom";


export default function DisplayCart(){
    const [carts, setCart] = useState([]);
    const {id} = useParams();

    useEffect(()=>{
        getListCart(id).then(res =>{
            setCart(res)
            console.log(res)
        })
    },[])

    return(
        <>
        </>
    )
}