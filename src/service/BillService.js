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