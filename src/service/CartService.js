import axios from "axios";

export function getListCart(id){
    return new Promise(resolve => {
        resolve(
            axios.get(`http://localhost:8080/api/carts/account/${id}`).then(res =>{
                return res.data
            }).catch(Error =>{
                return undefined
            })
        )
    })
}