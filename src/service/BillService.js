import axios from "axios";


export function addBill(cartDetail){
    return new Promise(require =>{
        require(
            axios.post("http://localhost:8080/api/bill/order",cartDetail).then(res=>{
                return true
            }).catch(Error =>{
                return false
            })
        )
    })
}
export function findAllOrdersByMerchant(id_merchant){
    return new Promise(require =>{
        require(
            axios.get(`http://localhost:8080/api/billDetail/${id_merchant}`).then(res=>{
                return res.data
            }).catch(Error =>{
                return []
            })
        )
    })
}

export function searchByNameAndPhone(id_merchant,value){
    return new Promise(require =>{
        require(
            axios.get(`http://localhost:8080/api/billDetail/search/${id_merchant}?name=${value}`).then(res=>{
                return res.data
            }).catch(Error =>{
                return undefined;
            })
        )
    })
}