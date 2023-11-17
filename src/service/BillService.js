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

export function orderNow(product, id_account){
    return new Promise(require =>{
        require(
            require(
                axios.post(`http://localhost:8080/api/bill/order-now/${id_account}`,product).then(res=>{
                    console.log(res)
                    return true
                }).catch(Error =>{
                    return false
                })
            )
        )
    })
}